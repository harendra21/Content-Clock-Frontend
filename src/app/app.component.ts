import { Component } from '@angular/core';
import { ApiService } from './auth/service/api.service'
import { MenuService as Menu } from './services/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isCollapsed: boolean = true;
  public isAuthenticated: boolean = false;
  public connections: any[] = []

  constructor(
    private apiService: ApiService,
    private menuService: Menu
  ){
    this.isAuthenticated = false
  }

  ngOnInit(){
    this.getMenuState()
    if(sessionStorage.getItem('isAuthenticated') == 'true'){
      this.isAuthenticated = true
      this.getMenuConnections()
    }
  }

  getMenuConnections(){
    // this.apiService.getRequest(`/menu`).subscribe((res: any) => {
    //   if (res.status) {
    //     this.connections = res.data
    //   }else{
    //     this.connections = []
    //   }
    // })

    this.menuService.getConnections()

    this.menuService.connections$.subscribe((data: any[]) => {
      this.connections = data
    })

  }

  getMenuState(){
   var menu = localStorage.getItem('menu')
   if(menu == '0'){
    this.isCollapsed = false
   }else{
    this.isCollapsed = true
   }

  }
  changeMenuState(isCollapsed: boolean){
    if (isCollapsed){
      localStorage.setItem('menu', '1')
    }else{
      localStorage.setItem('menu', '0')
    }
    this.isCollapsed = isCollapsed
  }

  logout(){
    this.apiService.logOut()
  }


}
