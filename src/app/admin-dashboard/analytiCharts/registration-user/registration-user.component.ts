import { Component, OnInit } from '@angular/core';
import { CountRegistration } from '../../interfaces/CountRegistration';
import { ManagerService } from '../../service/manager/manager.service';

@Component({
  selector: 'app-registration-user',
  templateUrl: './registration-user.component.html',
  styleUrls: ['./registration-user.component.scss']
})
export class RegistrationUserComponent implements OnInit {
countRegistration !: CountRegistration;
date !: string ;
  constructor(private managerService : ManagerService) { }

  countReg(){
    this.managerService.userRegistration().subscribe(
      data => {
        this.countRegistration = data;
        console.log(this.countRegistration)
      }
      
    )
  }

  ngOnInit(): void {
    this.countReg()
  }
  perWeek(){
    this.date = 'week';
  }
  perMonth(){
    this.date = 'month';
    }
  perDay(){
    this.date = 'day';
    }

}
