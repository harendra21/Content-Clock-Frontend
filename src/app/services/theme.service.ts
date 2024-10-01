import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private readonly THEME_KEY = 'theme';

  constructor() {
    const theme = localStorage.getItem(this.THEME_KEY) || 'light';
    this.setTheme(theme);
  }

  setTheme(theme: string): void {
    localStorage.setItem(this.THEME_KEY, theme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }

  toggleTheme(): void {
    const currentTheme = localStorage.getItem(this.THEME_KEY) === 'dark' ? 'light' : 'dark';
    this.setTheme(currentTheme);
  }

  getTheme(): 'light' | 'dark' {
    return (localStorage.getItem(this.THEME_KEY) as 'light' | 'dark') || 'light';
  }
}
