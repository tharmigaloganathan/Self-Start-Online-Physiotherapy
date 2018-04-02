import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-visualize-treatment-dialog',
  templateUrl: './visualize-treatment-dialog.component.html',
  styleUrls: ['./visualize-treatment-dialog.component.scss']
})
export class VisualizeTreatmentDialogComponent implements OnInit {

  Highcharts = Highcharts; // required
  chartConstructor = 'chart'; // optional string, defaults to 'chart'
  chartOptions = {
    series: [{
      data: [1, 2, 3]
    }]
  }; // required
  //chartCallback = function (chart) { ... } // optional function, defaults to null
  updateFlag = false; // optional boolean
  oneToOneFlag = true; // optional boolean, defaults to false

  constructor() { }

  ngOnInit() {
  }

}
