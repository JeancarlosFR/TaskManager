import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'app_theme';
  darkMode = false;
  private initPromise: Promise<void>;

  constructor(private storageService: StorageService) {
    this.initPromise = this.initTheme();
  }

  private async initTheme(): Promise<void> {
    const savedTheme = await this.storageService.get<boolean>(this.THEME_KEY);
    this.darkMode = savedTheme ?? false;
    this.applyTheme(this.darkMode);
  }

  async toggleTheme(isDark: boolean) {
    await this.initPromise;
    this.darkMode = isDark;
    this.applyTheme(isDark);
    await this.storageService.set(this.THEME_KEY, isDark);
  }

  private applyTheme(isDark: boolean) {
    document.body.classList.toggle('dark', isDark);
  }
}
