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


  introductionForm: Form;
  allQuestions: Question[];
  selectedQuestion: Question;

  constructor(private formService: FormService) { }

  ngOnInit() {
  }

  addQuestion(){
    var question = {
      order: this.newOrder,
      questionText: this.newQuestionText,
      helpDescription: this.newHelpDescription,
      questionType: this.newQuestionType
    };

    this.formService.addForm

  }

}
