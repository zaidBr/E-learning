import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ManagerService } from 'src/app/admin-dashboard/service/manager/manager.service';
import { Chapter } from 'src/app/interface/Chapter';

@Component({
  selector: 'app-chapter-list',
  templateUrl: './chapter-list.component.html',
  styleUrls: ['./chapter-list.component.scss']
})
export class ChapterListComponent implements OnInit {
  chapters !: Chapter[];
  constructor(private route : ActivatedRoute, private managerService :ManagerService) { }
  
  ngOnInit(): void {
    const id = this.route.snapshot.parent?.paramMap.get('id');
  this.managerService.getChapter(Number(id)).subscribe(
    (data)=>{
      this.chapters = data
    }
  )
  }

}
