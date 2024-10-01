import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private connectionsSubject = new BehaviorSubject<any[]>([]); // You can change the type and initial value as needed
  public connections$ = this.connectionsSubject.asObservable();

  constructor(private apiService: ApiService) {}

  setData(value: any[]) {
    this.connectionsSubject.next(value);
  }

  getData(): any[] {
    return this.connectionsSubject.value;
  }

  getConnections() {
    this.apiService.getRequest(`/menu`).subscribe((res: any) => {
      if (res.status) {
        this.setData(res.data)
      }
    });
  }
}
