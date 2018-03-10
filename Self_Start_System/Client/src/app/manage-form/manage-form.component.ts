import { Component, OnInit } from '@angular/core';
import { Form } from "../models/Form";
import { FormService} from "../form.service";
import { DndModule } from "ng2-dnd";
import { MatDialog, MatDialogRef } from "@angular/material";
import { EditQuestionDialogComponent } from "../edit-question-dialog/edit-question-dialog.component";

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

  newQuestionText;
  newHelpDescription;
  newQuestionType;
  newAnswerChoices;
  newRange;
  openEditModal;

  editQuestionDialogRef: MatDialogRef<EditQuestionDialogComponent>

  constructor(private formService: FormService,
              private dialog: MatDialog) { }

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
        console.log("what you are saving in form:", this.form);
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

  openEditQuestionDialog(question){
    this.selectQuestion(question);
    this.editQuestionDialogRef = this.dialog.open(EditQuestionDialogComponent, {
      width: '50vw',
      data: {
        question: this.selectedQuestion
      }
    });

    this.editQuestionDialogRef.afterClosed().subscribe(result => {
      this.selectedQuestion = result;
      this.editQuestion(this.selectedQuestion);
    });
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
    // var form = {
    //   _id: this.form._id,
    //   name: this.form.name,
    //   description: this.form.description,
    //   questions: this.form.questions,
    //   assessmentTests: this.form.assessmentTests,
    //   administrator: "5aa3575df36d280504b4fa38"
    // };
    for(let i = 0; i<this.formQuestions.length; i++){
      this.form.questions[i] = this.formQuestions[i]._id;
    }
    // this.form.questions = this.formQuestions;
    console.log("Nick this is the form you are saving:", this.form);
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
        this.getAllQuestions(),
        //need to then save form with the new ID in the questions list
        this.saveForm()},
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
