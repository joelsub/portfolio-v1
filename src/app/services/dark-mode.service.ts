// dark-mode.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private _isDarkMode: boolean = true; // Dark Mode por defecto

  constructor() {
    this.applyDarkMode(this._isDarkMode); // Aplica dark mode al iniciar
  }

  get isDarkMode(): boolean {
    return this._isDarkMode;
  }

  toggleDarkMode(): void {
    this._isDarkMode = !this._isDarkMode;
    this.applyDarkMode(this._isDarkMode);
  }

  private applyDarkMode(turnOn: boolean): void {
    if (turnOn) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}
