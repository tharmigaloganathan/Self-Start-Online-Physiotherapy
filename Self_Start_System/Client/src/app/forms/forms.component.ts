import { Component, OnInit } from '@angular/core';
import { FormService} from "../form.service";
import { MatTableDataSource, MatSort } from '@angular/material';
import {setUpFormContainer} from "@angular/forms/src/directives/shared";
<<<<<<< HEAD
=======
import { ConfirmDeleteDialogBoxComponent } from "../confirm-delete-dialog-box/confirm-delete-dialog-box.component";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";
>>>>>>> 1845af1f8048bbadf79c8235d4cb616c1bc22ab0

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {

  allForms: any[];
  allStandardForms = [];
  displayedColumns = ['formName', 'description', 'actionsColumn'];
  formDataSource;

  constructor(private formService: FormService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getAllForms();
  }

  getAllForms(){
    console.log("getting all forms");
    this.formService.getAllForms().subscribe(
      data => {
        console.log("forms received! ",data),
        this.allForms = data.form,
        this.filterForStandard()
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

    let dialogRef = this.dialog.open(ConfirmDeleteDialogBoxComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.formService.deleteForm(form).subscribe(
          res => {
            this.getAllForms();
          },
          error => console.log(error)
        );
      }
    });
  }

  setUpDataSource = forms => {
    this.formDataSource = new MatTableDataSource(forms)
  };

  filterForStandard(){
    for(var i = 0; i < this.allForms.length; i++){
      console.log(i, this.allForms[i]);
      if(this.allForms[i].type == "Standard"){
        this.allStandardForms.push(this.allForms[i]);
      }
    }
    this.setUpDataSource(this.allStandardForms);
  }

  setUpDataSource = forms => {
    this.formDataSource = new MatTableDataSource(forms)
  };

  filterForStandard(){
    for(var i = 0; i < this.allForms.length; i++){
      console.log(i, this.allForms[i]);
      if(this.allForms[i].type == "Standard"){
        this.allStandardForms.push(this.allForms[i]);
      }
    }
    this.setUpDataSource(this.allStandardForms);
  }
}
