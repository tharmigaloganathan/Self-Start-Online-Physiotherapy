import { Component, OnInit } from '@angular/core';
import { RehabilitationPlanService } from '../rehabilitation-plan.service';
import { ExerciseService } from '../services/exercise.service';

@Component({
  selector: 'app-edit-rehabilitation-plan',
  templateUrl: './edit-rehabilitation-plan.component.html',
  styleUrls: ['./edit-rehabilitation-plan.component.scss'],
  providers: [ RehabilitationPlanService ]
})
export class EditRehabilitationPlanComponent implements OnInit {
    showSidebar = true;
    data: Object;
    rehabilitationplans = {};
    rehabilitationplan = {};
    allExercises = [];
    myExercises = [];
    deleteList = [];
    editID = localStorage.getItem('edit_rehabilitation_id');

  constructor(private rehabilitationplanService: RehabilitationPlanService, private exerciseService: ExerciseService) {
      console.log("ID", this.editID)
      this.getRehabilitationPlans();
  }

  ngOnInit() {
  }

  putRehabilitationPlan(name: String, description: String, authorName: String, goal: String, timeframe: String) {
      this.data = {
         name: name,
         authorName: authorName,
         description: description,
         goal: goal,
         timeFrameToComplete: timeframe,
         exercises: this.myExercises
     };

      console.log("data: ",this.data);
      this.rehabilitationplanService.updateRehabilitationPlan(this.data, this.editID).subscribe(res =>
          {
              console.log("RESULT",res);
          }
      );
  }

  addExercise(name: String) {
      console.log(this.allExercises);
      console.log(name);
      for(var i = 0; i < this.allExercises.length; i++) {
          if(this.allExercises[i].name == name) {
              this.myExercises.push(this.allExercises[i]);
              this.allExercises.splice(i,1);
              console.log(this.myExercises);
          }
      }
  }

  addToDeleteList(id: String) {
      this.deleteList.push(id);
  }

  // deleteExercises(id: any) {
  //     console.log(id);
  //     // for(var i = 0; i < this.myExercises.length; i++) {
  //     //     if(this.myExercises[i]._id == id) {
  //     //         this.myExercises.splice(i, 1);
  //     //     }
  //     // }
  // }

  deleteExercises() {
      for(var i = 0; i < this.deleteList.length; i++) {
          for(var j = 0; j < this.myExercises.length; j++) {
              if(this.myExercises[j]._id == this.deleteList[i]) {
                  this.allExercises.push(this.myExercises[j]);
                  this.myExercises.splice(j, 1);
              }
          }
      }
      this.deleteList = [];
      console.log(this.deleteList);
  }

  getRehabilitationPlans() {
      this.rehabilitationplanService.getRehabilitationPlans().subscribe(data =>
          {
              this.rehabilitationplans = data;
              console.log("REHABILITATION PLANS", this.rehabilitationplans);
              this.getExercises();
          }
      );
  }

  getExercises() {
      for(var i = 0; i < this.rehabilitationplans.rehabilitationPlan.length; i++) {
          if(this.rehabilitationplans.rehabilitationPlan[i]._id == localStorage.getItem('edit_rehabilitation_id')) {
              console.log("MATCH", this.rehabilitationplans.rehabilitationPlan[i]._id);
              this.rehabilitationplan = this.rehabilitationplans.rehabilitationPlan[i];
          }
      }

      console.log("getting all exercises");
      this.exerciseService.getAllExercises().subscribe(
        data => {
          console.log("exercises retrieved! ",data.exercises);
          let exercises = data.exercises;
          this.allExercises = data.exercises;

          for(var i = 0; i < exercises.length; i++) {
              for(var j = 0; j < this.rehabilitationplan.exercises.length; j++) {
                  if(exercises[i]._id == this.rehabilitationplan.exercises[j]) {
                    this.myExercises.push(exercises[i]);
                    this.allExercises.splice(i, 1);
                  }
              }
          }
          console.log("EXERCISES", this.myExercises);
        },
        error => console.log(error)
      );




  }

}
