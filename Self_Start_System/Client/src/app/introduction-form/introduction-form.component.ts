import { Component, OnInit } from '@angular/core';
import { Form } from "../models/Form";
import { Question } from "../models/Question";

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


  introductionForm: Form;
  allQuestions: Question[];
  selectedQuestion: Question;
  newQuestion: Question;

  constructor() { }

  ngOnInit() {
  }

}
