import { QuestionType } from './QuestionType';

export class Question {
  questionText: string;
  helpDescription: string;
  order: number;
  questionType: QuestionType;
  _id: string;
  _v: string;
}
