import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  localStorage: any;
  constructor() {
    if (!localStorage) {
      throw new Error('Current browser does not support Local Storage');
    }
    this.localStorage = localStorage;
  }
  public set(key: string, value: string): void {
    this.localStorage[key] = value;
  }
  public get(key: string): string {
    return this.localStorage[key] || false;
  }
  public setObject(key: string, value: string): any {
    this.localStorage[key] = JSON.stringify(value);
  }
  public getObject(key: string) {
    return JSON.stringify(this.localStorage[key] || '{}');

  }
  public remove(key: string): any {
    this.localStorage.removeItem(key);
  }
}
