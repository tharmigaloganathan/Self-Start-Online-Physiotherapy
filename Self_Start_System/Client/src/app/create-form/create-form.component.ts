import { Component, OnInit } from '@angular/core';
import { FormService } from "../form.service";

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit {

  formID: string; //Holds the _id of the form currently viewed
  form: any; //Holds the form information of the form currently viewed
  formQuestions = []; // Holds all question objects belonging to this form
  allQuestions: any[]; //Holds all other question objects not belonging to this form
  selectedQuestion: any; //Necessary to focus the modal on the selected question
  newOption: string;

  questionTypeOptions = [
    {value: 'Short Answer', viewValue: 'Short Answer'},
    {value: 'Multiple Choice', viewValue: 'Multiple Choice'},
    {value: 'Range', viewValue: 'Range'},
  ]

  newQuestionText;
  newHelpDescription;
  newQuestionType;
  newAnswerChoices;
  newRange;

  constructor(private formService: FormService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    var form = {
      name: "Template",
      description: "Template",
      administrator: {},
      assessmentTests: [],
      questions: [],
    };
    this.form = form;
    console.log("form: ", form);

    this.formService.createForm(form).subscribe(
      res=> {console.log("create form response", res),
        this.formID = res.form._id;},
      error => {console.log(error)}
    );
  }

  deleteQuestion(selectedQuestion){
    this.formService.deleteQuestion(selectedQuestion._id).subscribe(
      res=> {console.log("response received: ", res),
        //reload all questions
        this.getAllQuestions();},
      error => {console.log(error)}
    );

  }

  selectQuestion(question){
    this.selectedQuestion = question;
  }

  editQuestion(selectedQuestion) {
    this.formService.editQuestion(selectedQuestion).subscribe(
      res => {
        console.log("response received: ", res),
          //reload all questions
          this.getAllQuestions();
      },
      error => {
        console.log(error)
      }
    )
  }

  addOption(option: string){
    console.log("this is the selected question", this.selectedQuestion);
    this.selectedQuestion.answerChoices.push(option);
    this.newOption = null;
  }

  addNewOption(option: string){
    this.newAnswerChoices.push(option);
    this.newOption = null;
  }

  deleteOption(option: string){
    for (let i = 0; i < this.selectedQuestion.answerChoices.length; i++){
      if(this.selectedQuestion.answerChoices[i] == option){
        this.selectedQuestion.answerChoices.splice(i, 1);
      }
    }
  }

  addQuestion(){
    console.log("tect:", this.newQuestionText);
    var question = {
      questionText: this.newQuestionText,
      helpDescription: this.newHelpDescription,
      questionType: this.newQuestionType,
      answerChoices: this.newAnswerChoices,
      range: this.newRange,
      form: this.formID
    };
    console.log("NEW QUESTION: ", question);

    this.formService.addQuestion(question).subscribe(
      res=> {console.log("new question ID: ", res.data.question._id),
        this.form.questions.push(res.question._id),
        //reload all questions
        this.getAllQuestions();},
      error => {console.log(error)}
    );
  }

  saveForm(){
    console.log("Nick this is the form you are saving:", this.form);
    this.form.administrator = {};
    this.formService.saveForm(this.form).subscribe(
      res => {
        console.log("response received: ", res)
      },
      error => {
        console.log(error)
      }
    )
  }

  newQuestion(){
    var question = {
      questionText: "Template",
      helpDescription: "Template",
      questionType: "Short Answer",
      answerChoices: [],
      range: "0",
      form: this.formID
    };
    console.log("formID: ", question.form);

    this.formService.addQuestion(question).subscribe(
      res=> {console.log("new question ID: ", res),
        this.form.questions.push(res.question._id),
        //reload all questions
        this.getAllQuestions();},
      error => {console.log(error)}
    );
  }

  getAllQuestions(){
    //Set to nothing so that it doesn't get double-populated
    this.formQuestions = [];
    this.allQuestions = [];
    console.log("getting all questions for this form");
    this.formService.getAllQuestions().subscribe(
      data => {
        console.log("questions retrieved!");
        let questions = data.question;
        this.allQuestions = data.question;

        console.log("form.Questions", this.form.questions);
        console.log("all Questions", this.allQuestions);
        //Places the formQuestion objects in order, splices it out of rest of questions
        for (let i = 0; i < this.form.questions.length; i++) {
          for (let j = 0; j < this.allQuestions.length; j++){
            if(this.form.questions[i] == questions[j]._id) {
              this.formQuestions.push(questions[j]);
              this.allQuestions.splice(j, 1);
            }
          }
        }
        console.log("formQuestions", this.formQuestions);
      },
      error => console.log(error)
    );
  }
}
