import { Component, OnInit } from '@angular/core';
import { Form } from "../models/Form";
import { FormService} from "../form.service";
import { DndModule } from "ng2-dnd";

@Component({
  selector: 'app-introduction-form',
  templateUrl: './manage-form.component.html',
  styleUrls: ['./manage-form.component.scss']
})
export class ManageFormComponent implements OnInit {

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

  newOrder;
  newQuestionText;
  newHelpDescription;
  newQuestionType;
  openEditModal;



  constructor(private formService: FormService) { }

  ngOnInit() {
    this.selectedQuestion = null;
    this.formID =  localStorage.getItem('edit_form_id');
    this.getForm();
    this.openEditModal = false;
  }

  getForm(){
    console.log("formID searched: ", this.formID);
    this.formService.getForm(this.formID).subscribe(
      data => {
        console.log("specific form received! ", data);
        this.form = data.form;
        this.getAllQuestions();
      },
      error => console.log(error)
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
    this.openEditModal = true;
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

  deleteOption(option: string){
    for (let i = 0; i < this.selectedQuestion.answerChoices.length; i++){
      if(this.selectedQuestion.answerChoices[i] == option){
        this.selectedQuestion.answerChoices.splice(i, 1);
      }
    }
  }

  addQuestion(){
    var question = {
      order: this.newOrder,
      questionText: this.newQuestionText,
      helpDescription: this.newHelpDescription,
      questionType: "5a81eee3734d1d0d42ead44f", //hard-coded to short answer
      form: "5a81cbf1734d1d0d42eaa9a9" //hard-coded to the introduction form for now
    };

    this.formService.addQuestion(question).subscribe(
      res=> {console.log("response received: ", res),
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
