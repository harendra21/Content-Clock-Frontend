import { Component } from '@angular/core';
import { ApiService } from './services/api.service'
import { MenuService as Menu } from './services/menu.service';
import { AuthService } from './auth/service/auth.service';
import { environment } from 'src/environments/environment';
import { initFlowbite } from 'flowbite';
import { ThemeService } from './services/theme.service';

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
  public avatar: string = ""
  public name: string = ""
  public email: string = ""
  public apiHost: string = environment.v1Api

  constructor(
    private apiService: ApiService,
    private menuService: Menu,
    private authService: AuthService,
    private themeService: ThemeService
  ) {
    this.isAuthenticated = false
  }

  ngOnInit() {
    initFlowbite();
    this.getMenuState()

    this.authService.isAuth$
      .subscribe((data: boolean) => {
        this.isAuthenticated = data
        if (data) {
          this.getMenuConnections()
          this.getUserInfo()
        }
      })
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
  get currentTheme(): 'light' | 'dark' {
    return this.themeService.getTheme();
  }

  getUserInfo() {
    this.apiService.getRequest(`/check-auth`).subscribe((res: any) => {
      if (res.status) {
        this.avatar = res.data.avatar_url
        this.name = res.data.name
        this.email = res.data.email
      }
    })
  }

  getMenuConnections() {

    this.menuService.getConnections()

    this.menuService.connections$.subscribe((data: any[]) => {
      this.connections = data
    })

  }

  getMenuState() {
    var menu = localStorage.getItem('menu')
    if (menu == '0') {
      this.isCollapsed = false
    } else {
      this.isCollapsed = true
    }

  }
  changeMenuState(isCollapsed: boolean) {
    if (isCollapsed) {
      localStorage.setItem('menu', '1')
    } else {
      localStorage.setItem('menu', '0')
    }
    this.isCollapsed = isCollapsed
  }

  logout() {
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
