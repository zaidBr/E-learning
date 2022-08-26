import { ManagerService } from 'src/app/admin-dashboard/service/manager/manager.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Cours } from 'src/app/interface/Cours';
import { ApexChart, ApexNonAxisChartSeries, ApexPlotOptions } from 'ng-apexcharts';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { of } from 'rxjs';
export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions ;
};

@Component({
  selector: 'app-cours-details',
  templateUrl: './cours-details.component.html',
  styleUrls: ['./cours-details.component.scss']
})
export class CoursDetailsComponent implements OnInit {
  cours !:Cours;
  options: any;
  chartOptions!: Partial<ChartOptions> | any;
  header: any;
  rate =0;
  labelEv = '';
  form !: FormGroup;
  id : any;
  isSubmited =false;
  message = ''
  nbStudent = 0;
  statusPublic='Public';
  statusPrivate='Privé'

  constructor(
    private managerService: ManagerService,
    private route : ActivatedRoute,
    private formBuilder :FormBuilder,
    private router : Router
    ) { }

  showRateOfOne(){
    this.managerService.rateOneCours(Number(this.cours.id)).subscribe(
      (data:any)=>{
        console.log('this is data '+data[0].rate);
         this.rate= Number(data[0].rate);
         Number(data[0].rate) ? this.labelEv=`${data[0].nbPerson} Evaluateurs` : this.labelEv="Aucune Evaluation"
        this.chartOptions = {
          series: [this.rate],
          chart: {
            height: 300,
            type: "radialBar"
          },
          plotOptions: {
            radialBar: {
              hollow: {
                size: "70%",
  
              }
            }
          },
          labels: [this.labelEv]
        };
      }
    )
  }

    showForFormateur(){
      this.route.data.subscribe(data=>{
        console.log('this is events'+data.cours.calenderiers);
        this.cours = data.cours;
        this.options = {
          headerToolbar: {
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
          },
          events: data.cours.calenderiers,
          editable: true,
          selectable:true,
          selectMirror: true,
          dayMaxEvents: true
    };
      })
      

      
      
  }

  editVisibility(){
    this.managerService.MakeCoursVisible(this.id).subscribe(
      resp=>{
        this.message='success';
        console.log('ediiiiiiiiiiiiiiited')
      }
    )
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;

    this.showForFormateur();
    this.showRateOfOne();
    for (let group of this.cours.groups) {
      this.nbStudent += group.users.length;
      
    }




    this.form = this.formBuilder.group(
      {
        title:['',Validators.required],
        date:['',Validators.required],
      }
    );  
}
  coursManage(){
  if(this.cours.type== 'online'){
  this.router.navigate(['']);
  }
  this.router.navigate(['cours-manage', this.cours.id]);
  }

  onSubmit(){
    const data = this.form.value;
    this.isSubmited = true;
    if(this.form.valid){
      this.managerService.addCalendar(data.title,data.date,this.id).subscribe(
        (resp)=>{
          if(resp == 'added')
          this.message = 'success';
        },
        (err)=>{
          this.message ='error';
        }
      )
    }
  }
  close(){
    this.message = ''; 
  }

}
