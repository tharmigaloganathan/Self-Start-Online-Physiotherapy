import { Component, OnInit } from '@angular/core';
import { FormService} from "../form.service";

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {

  allForms: any[];

  constructor(private formService: FormService) { }

  ngOnInit() {
    this.getAllForms();
  }

  getAllForms(){
    console.log("getting all forms");
    this.formService.getAllForms().subscribe(
      data => {
        console.log("forms received! ",data);
        this.allForms = data.form;
      },
      error => console.log(error)
    );
  }

  storeFormID(id: string){
    console.log("FormID:", id);
    localStorage.setItem("edit_form_id", id);
  }

  newForm(){
    localStorage.setItem("edit_form_id", "empty");
  }

  deleteForm(form){
    this.formService.deleteForm(form).subscribe(
      res => {
        console.log(res),
          this.getAllForms()
      },
      error => console.log(error)
    );
  }
}
