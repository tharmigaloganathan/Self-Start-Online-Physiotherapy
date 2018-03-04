import { Component, OnInit } from '@angular/core';
import { Form } from "../models/Form";
import { FormService} from "../form.service";

@Component({
  selector: 'app-introduction-form',
  templateUrl: './manage-form.component.html',
  styleUrls: ['./manage-form.component.scss']
})
export class ManageFormComponent implements OnInit {

  formID: string;
  form: any;

  newOrder;
  newQuestionText;
  newHelpDescription;
  newQuestionType;
  openEditModal;


  introductionForm: Form;
  allQuestions: any[];
  selectedQuestion: null;

  constructor(private formService: FormService) { }

  ngOnInit() {
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
    console.log("getting all questions for this form");
    for(let i=0; i<this.form.questionOrder.length; i++){
      this.formService.getAllQuestions(this.form.questionOrder[i]).subscribe(
        data => {
          console.log("questions retrieved! ",data['question']);
          this.allQuestions = data.question;
        },
        error => console.log(error)
      );
    }
  }
}
