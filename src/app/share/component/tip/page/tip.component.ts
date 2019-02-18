import { Component, OnInit, Input } from '@angular/core';
import { TipOption } from '../model/tip.option';

@Component({
  selector: 'app-tip',
  templateUrl: './tip.component.html',
  styleUrls: ['./tip.component.scss']
})
export class TipComponent implements OnInit {
  @Input()
  config: TipOption;
  @Input()
  type:string;
  constructor() { }

  ngOnInit() {
  }

}
