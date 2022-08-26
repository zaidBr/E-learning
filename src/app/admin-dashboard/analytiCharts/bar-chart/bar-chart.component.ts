import { map } from 'rxjs/operators';
import { ManagerService } from 'src/app/admin-dashboard/service/manager/manager.service';
import { Component, OnInit, AfterViewChecked, AfterViewInit } from '@angular/core';
import { Cours } from 'src/app/interface/Cours';
import { ChartDataSets, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { getCurrencySymbol } from '@angular/common';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
mostCourses !: Cours[];
chartDataReady =false;
 lineChartData !: ChartDataSets[];
 lineChartLabels : Label[] = [];

lineChartOptions = {
  responsive: true,
};
lineChartColors: Color[] = [
  {
    borderColor: '#112B3C',
    backgroundColor: '#208cff',
    pointBackgroundColor:'green',

  },
];
lineChartLegend = true;
lineChartPlugins = [];
lineChartType : ChartType = 'line';
  constructor(private managerService :ManagerService) { }

  
  mostRatingCourses(){
    this.managerService.mostRaitingCours().subscribe(
      data => {
        this.mostCourses = data;
        // console.log('dataaa : '+this.mostCourses.map(m=>m.name));
        this.lineChartData = [
          { data:  this.mostCourses.map(m =>Number(m.rate) ), label: 'Etoile' },
        ];
        this.lineChartLabels = this.mostCourses.map(m => m.nameF)
        this.chartDataReady = true;

      },
      err=>console.log(err)
    )
  }
  ngOnInit(): void {
    this.mostRatingCourses();
  }

}
