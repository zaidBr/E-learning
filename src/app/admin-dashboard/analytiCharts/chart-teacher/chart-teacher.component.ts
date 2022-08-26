import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Teacher } from '../../interfaces/Teacher';
import { ManagerService } from '../../service/manager/manager.service';

@Component({
  selector: 'app-chart-teacher',
  templateUrl: './chart-teacher.component.html',
  styleUrls: ['./chart-teacher.component.scss']
})
export class ChartTeacherComponent implements OnInit {
 mostTeachers !: Teacher[];
 chartDataReady =false;
 barChartOptions: ChartOptions = {
  responsive: true,
};
barChartLabels !: Label[] ;
barChartType: ChartType = 'bar';
lineChartColors: Color[] = [
  {
    borderColor: '#112B3C',
    backgroundColor: '#28a745',
    pointBackgroundColor:'green',

  },
];
barChartLegend = true;
barChartPlugins = [];
barChartData !: ChartDataSets[];
  constructor(private managerService : ManagerService) { }
  getMostTeachers(){
    this.managerService.mostRatingTeacher().subscribe(
      data =>{
        this.mostTeachers = data;
        this.barChartData = [
          {data : this.mostTeachers.map(mt=>mt.rate),label:'Etoile'}
        ];
        this.barChartLabels = this.mostTeachers.map(mt=> mt.name);
        this.chartDataReady = true;

      }
    )
  }

  ngOnInit(): void {
    this.getMostTeachers()
  }


}
