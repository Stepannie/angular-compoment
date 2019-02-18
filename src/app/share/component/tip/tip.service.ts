import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { TipOption } from './model/tip.option';
import { Observable } from 'rxjs';
import { TipComponent } from './page/tip.component';
import { compilePipeFromMetadata } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class TipService {

  constructor(private nzModal: NzModalService) { }

  // 确认提示框
  confirm(option: TipOption): Observable<any> {
    const confirm = this.nzModal.create({
      nzTitle: `${option.title}`,
      nzContent: TipComponent,
      nzWidth: 400,
      nzComponentParams: {
        config: option,
        type: 'confirm'
      },
      nzFooter: [{
        label: '确定',
        onClick: () => {
          confirm.destroy({ data: 'success' });
        }
      }]
    });
    return confirm.afterClose;
  }

  /**
   * 确认取消确定框
   */
  confirmCancel(option: TipOption): Observable<any> {
    const confirm = this.nzModal.create({
      nzTitle: option.title,
      nzContent: TipComponent,
      nzWidth: 400,
      nzComponentParams: {
        config: option,
        type: 'confirm'
      },
      nzFooter: [{
        label: '确认',
        onClick: () => {
          confirm.destroy({ data: 'success' });
        }
      },
      {
        label: '取消',
        onClick: () => {
          confirm.destroy({});
        }
      }]
    });
    return confirm.afterClose;
  }
   /**
   * 成功提示框
   */
  success(option: TipOption) {
    const success = this.nzModal.create({
      nzTitle: `${option.title}`,
      nzContent: TipComponent,
      nzWidth: 400,
      nzComponentParams: {
        config: option,
        type: 'success'
      },
      nzFooter: [{
        label: '确定',
        onClick: () => {
          success.destroy();
        }
      }]
    });
    // window.setTimeout(() => success.destroy(), 3000);
  }
  /**
 * 错误提示框
 */
  error(option: TipOption) {
    const error = this.nzModal.create({
      nzTitle: `${option.title}`,
      nzContent: TipComponent,
      nzWidth: 400,
      nzComponentParams: {
        config: option,
        type: 'error'
      },
      nzFooter: [{
        label: '确定',
        onClick: () => {
          error.destroy();
        }
      }]
    });
    // window.setTimeout(() => error.destroy(), 3000);
  }
}
