import { Component, OnInit } from '@angular/core';
import { LoadingIconService } from '../loading-icon.service';

@Component({
  selector: 'app-loading-icon',
  templateUrl: './loading-icon.component.html',
  styleUrls: ['./loading-icon.component.scss']
})
export class LoadingIconComponent implements OnInit {
  show: boolean;
  constructor(private loadingIconSvc: LoadingIconService) { }

  ngOnInit() {
    debugger;
    this.loadingIconSvc.getLoading().subscribe(res => {
      setTimeout(() => {
        this.show = res;
      })
    })
  }

}
