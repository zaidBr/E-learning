import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ManagerService } from 'src/app/admin-dashboard/service/manager/manager.service';
import { Chapter } from 'src/app/interface/Chapter';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-all-content',
  templateUrl: './all-content.component.html',
  styleUrls: ['./all-content.component.scss']
})
export class AllContentComponent implements OnInit {
  dataChapter$ !: Observable<Chapter> 
  vidPath = '';
  filePath ='';
  getVideo !:any
  dataChapter!:Chapter
  constructor(private managerService : ManagerService,private route :ActivatedRoute) { }
// getChapterData(id:any){
//     this.managerService.getDataChapter(Number(id)).subscribe(
//       data => {
//         this.dataChapter =data;
//         this.vidPath = `http://127.0.0.1:8000/file/video/${this.dataChapter.videos[0].url_video}`;
//         this.filePath = `http://127.0.0.1:8000/file/filePdf/${this.dataChapter.files[0].file_path}`;
//       }
//     )
// }

  ngOnInit(): void {
    this.dataChapter$ = this.route.parent?.paramMap.pipe(
      switchMap((params : ParamMap)=>{
         return this.managerService!.getDataChapter(Number(params.get('chapter')!))
      })
    )!;
  }
 

}
