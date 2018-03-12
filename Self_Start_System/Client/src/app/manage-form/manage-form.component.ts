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

  createForm(){
    var form = {
      name: "Template",
      description: "Template",
      administrator: "5aa3575df36d280504b4fa38",
      assessmentTests: [],
      questions: [],
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

  deleteQuestion(q){
    console.log("q:", q);
    //remove the formID from the question's forms list
    for(let i = 0; i < q.form.length; i++){
      if(q.form[i] == this.formID){
        q.form.splice(i, 1);
      }
    }
    this.formService.editQuestion(q).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error)
      }
    )
    //remove this question from both arrays
    for(let i = 0; i < this.formQuestions.length; i++){
      if(this.formQuestions[i]._id == q._id){
        this.formQuestions.splice(i, 1);
      }
    }
    for(let i = 0; i < this.form.questions.length; i++){
      if(this.form.questions[i] == q._id){
        this.form.questions.splice(i, 1);
      }
    }
    this.saveForm();
    this.getAllQuestions();
  }

  // //Code needs to be modified to remove ID from all forms that still have it
  // deleteQuestionPermanent(selectedQuestion){
  //   this.formService.deleteQuestion(selectedQuestion._id).subscribe(
  //     res=> {console.log("response received: ", res),
  //       //reload all questions
  //       this.getAllQuestions();},
  //     error => {console.log(error)}
  //   );
  //
  // }

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
          //reload all questions
          this.getAllQuestions();
      },
      error => {
        console.log(error)
      }
    )
  }


  saveForm(){
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
      form: [this.formID]
    };

    this.formService.addQuestion(question).subscribe(
      res=> {console.log("new question ID: ", res),
        this.form.questions.push(res.question._id),
        //reload all questions
        this.getAllQuestions(),
        //need to then save form with the new ID in the questions list
        this.saveForm();},
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
}
