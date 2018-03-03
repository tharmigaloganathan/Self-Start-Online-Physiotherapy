import { Component, OnInit } from '@angular/core';
import { Form } from "../models/Form";
import { Question } from "../models/Question";
import { FormService} from "../form.service";

@Component({
  selector: 'app-introduction-form',
  templateUrl: './introduction-form.component.html',
  styleUrls: ['./introduction-form.component.scss']
})
export class IntroductionFormComponent implements OnInit {

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
    this.getAllQuestions();
    this.openEditModal = false;
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
    console.log("getting all questions");
    this.formService.getAllQuestions().subscribe(
      data => {
        console.log("questions retrieved! ",data['exercise']);
        this.allQuestions = data.exercise;
      },
      error => console.log(error)
    );
  }
}
