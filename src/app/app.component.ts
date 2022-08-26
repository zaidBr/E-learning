import { ChangeDetectorRef, Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from './admin-dashboard/service/loading.service';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'en');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,  AfterViewChecked {
  title = 'e-learning-front-end';
  loading !: boolean ;

  constructor(private loader: LoadingService, private cd : ChangeDetectorRef) {
  }
  
  
  
  ngOnInit(): void {
    
  }
  ngAfterViewChecked() {
    this.loader.loading$.subscribe(
      value => this.loading = value
    )
      this.cd.detectChanges()
    
    
  }

  

}
