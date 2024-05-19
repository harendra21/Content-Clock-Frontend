import { Component } from '@angular/core';
import { ApiService } from './auth/service/api.service'
import { MenuService as Menu } from './services/menu.service';
import { AuthService } from './auth/service/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isCollapsed: boolean = true;
  public isAuthenticated: boolean = false;
  public connections: any[] = []
  private lgBreakpoint = environment.lgBreakpoint;

  constructor(
    private apiService: ApiService,
    private menuService: Menu,
    private authService: AuthService
  ){
    this.isAuthenticated = false
  }

  ngOnInit(){
    this.getMenuState()

    this.authService.isAuth$
    .subscribe((data: boolean) => {
      this.isAuthenticated = data
      if (data){
        this.getMenuConnections()
      }
    })
  }

  getMenuConnections(){

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
    this.authService.setAuthStatus(false)
    this.apiService.logOut()
  }

  onCollapsedChange(collapsed: boolean): void {
    this.changeMenuState(collapsed)
  }
  onMenuItemClick(): void {
    if (window.innerWidth <= this.lgBreakpoint) {
      this.changeMenuState(true)
    }
  }


}
