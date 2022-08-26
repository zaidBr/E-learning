import { ManagerService } from 'src/app/admin-dashboard/service/manager/manager.service';
import { Component, OnInit, ViewChild, AfterViewChecked, AfterViewInit, AfterContentChecked, AfterContentInit, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ChartComponent
} from "ng-apexcharts";
import { Rate } from 'src/app/interface/rate';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions ;
};
@Component({
  selector: 'app-radial-chart',
  templateUrl: './radial-chart.component.html',
  styleUrls: ['./radial-chart.component.scss']
})
export class RadialChartComponent implements OnInit{
  @ViewChild("chart") chart!: ChartComponent;
   chartOptions!: Partial<ChartOptions> | any;
   chartOptions2!: Partial<ChartOptions> | any;
   data : any;
  rate =0;
  constructor(private managerService: ManagerService) {
    this.currentRate();
   }
  currentRate(){
    this.managerService.cuurrentTeacherRating().subscribe(
      (data:any) =>{
        this.data=data;
        this.rate =Number(data[0][0].rate)
        // console.log(data[0][0].rate);
        this.chartOptions = {
          series: [this.rate],
          chart: {
            height: 200,
            type: "radialBar"
          },
          plotOptions: {
            radialBar: {
              hollow: {
                size: "70%",
  
              }
            }
          },
          labels: ["Evaluation"]
        };
        this.chartOptions2 = {
          series: [((data[1][0].nbCourses)/20)*100],
          chart: {
            height: 200,
            type: "radialBar"
          },
          plotOptions: {
            radialBar: {
              hollow: {
                size: "70%",
  
              }
            }
          },
          labels: ["Experience"]
        };
        
      }
    )
  }
  ngOnInit(): void {
    
  }


}
