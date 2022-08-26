import { Component, OnInit } from '@angular/core';
import { FacebookService, InitParams } from 'ngx-facebook-fb';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private facebookService: FacebookService) { }

  ngOnInit(): void {
    this.initFacebookService();
  }
  private initFacebookService(): void {
    const initParams: InitParams = { xfbml:true, version:"v3.2"};
    this.facebookService.init(initParams);
  }
}
