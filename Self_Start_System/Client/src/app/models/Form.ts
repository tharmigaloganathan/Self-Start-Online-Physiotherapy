import { Question } from "./Question";

//NOTE: AssessmentTest and Administrator fields still need to be added
export class Form {
  name: string;
  description: string;
  questions: Question;
  _id: string;
  _v: string;
}
