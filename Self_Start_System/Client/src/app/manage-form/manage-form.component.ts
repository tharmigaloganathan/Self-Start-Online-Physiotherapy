import { Component, OnInit } from '@angular/core';
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

  editQuestionDialogRef: MatDialogRef<EditQuestionDialogComponent>

  constructor(private formService: FormService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.selectedQuestion = null;
    this.formID =  localStorage.getItem('edit_form_id');
    if(this.formID != "empty"){
      this.getForm();
    } else {
      this.createForm();
    }
  }

  //FORM RELATED
  //==================================
  createForm(){
    var form = {
      name: "Template",
      description: "Template",
      administrator: "5aa3575df36d280504b4fa38",
      assessmentTests: [],
      questions: [],
      type: "Standard"
    };
    this.form = form;
    console.log("form: ", form);

    this.formService.createForm(form).subscribe(
      res=> {console.log("new form", res),
        localStorage.setItem('edit_form_id', res.form._id),
        this.formID = res.form._id,
        this.getForm();},
      error => {console.log(error)}
    );
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

  saveForm(){
    //Loop below ensures the form question FK array is up to date and pushes the ID onto the array
    //Then it saves that new question with form's ID in it
    for(let i = 0; i<this.formQuestions.length; i++){
      this.form.questions[i] = this.formQuestions[i]._id;
      if(!this.formQuestions[i].form.includes(this.formID)){
        this.formQuestions[i].form.push(this.formID);
        this.formService.editQuestion(this.formQuestions[i]).subscribe(
          res => {
            console.log(res)
          },
          error => {
            console.log(error)
          }
        )
      }
    }
    //Remove all questions from the list that aren't supposed to be on it
    if(this.form.questions.length > this.formQuestions.length){
      this.form.questions.splice(this.formQuestions.length);
    }

    //This loop will ensure that all of the questions in allQuestions array do not have this form's ID
    //If they do, it will be resaved without the form ID
    for(let i = 0; i<this.allQuestions.length; i++){
      if(this.allQuestions[i].form.includes(this.formID)){
        let index = this.allQuestions[i].form.indexOf(this.formID);
        this.allQuestions[i].form.splice(index, 1);
        this.formService.editQuestion(this.allQuestions[i]).subscribe(
          res => {
            console.log(res)
          },
          error => {
            console.log(error)
          }
        )
      }
    }

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

  //===========================================
  //END OF FORM RELATED

  //QUESTION RELATED
  //===========================================

  newQuestion(){
    var question = {
      questionText: "Template",
      helpDescription: "Template",
      questionType: "Short Answer",
      answerChoices: [],
      range: "0",
      form: [this.formID],
      type: "Standard"
    };

    this.formService.addQuestion(question).subscribe(
      res=> {console.log("new question ID: ", res),
        this.form.questions.push(res.question._id),
        this.formQuestions.push(res.question),
        //reload all questions
        this.saveForm(),
        //need to then save form with the new ID in the questions list
        this.getAllQuestions();},
      error => {console.log(error)}
    );
  }

  getAllQuestions(){
    //Set to nothing so that it doesn't get double-populated
    this.formQuestions = [];
    this.allQuestions = [];
    this.formService.getAllQuestions().subscribe(
      data => {
        let questions = data.question;
        this.allQuestions = data.question;

        //Places the formQuestion objects in order, splices it out of rest of questions
        for (let i = 0; i < this.form.questions.length; i++) {
          for (let j = 0; j < this.allQuestions.length; j++){
            if(this.form.questions[i] == questions[j]._id) {
              this.formQuestions.push(questions[j]);
              this.allQuestions.splice(j, 1);
            }
          }
        }
      },
      error => console.log(error)
    );
  }

  //Can only be pressed if the question does not belong to one or more forms
  deleteQuestion(q){
    //remove this question from the array
    // for(let i = 0; i < this.allQuestions.length; i++){
    //   if(this.allQuestions[i]._id == q._id){
    //     this.allQuestions.splice(i, 1);
    //   }
    // }
    this.formService.deleteQuestion(q._id).subscribe(
      res => {
        console.log(res),
        this.saveForm(),
        this.getAllQuestions();
      },
      error => {
        console.log(error)
      }
    )
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
  }

  editQuestion(selectedQuestion) {
    this.formService.editQuestion(selectedQuestion).subscribe(
      res => {
          //First save the form in case there were changes to it
          this.saveForm(),
          //reload all questions
          this.getAllQuestions();
      },
      error => {
        console.log(error)
      }
    )
  }







}
