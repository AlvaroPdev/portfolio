import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
    readonly theme = signal<Theme>(this.getInitialTheme());

    constructor() {
        effect(() => this.applyTheme(this.theme()));

        window.matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', (e) => {
                if (!localStorage.getItem('theme')) {
                    this.theme.set(e.matches ? 'dark' : 'light');
                }
            });
    }

    toggle(): void {
        const next = this.theme() === 'dark' ? 'light' : 'dark';
        this.theme.set(next);
        localStorage.setItem('theme', next);
    }

    private getInitialTheme(): Theme {
        const stored = localStorage.getItem('theme') as Theme | null;
        if (stored === 'light' || stored === 'dark') return stored;
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }

    private applyTheme(theme: Theme): void {
        const html = document.documentElement;
        html.classList.toggle('light', theme === 'light');
        html.style.colorScheme = theme;

        document.querySelector('meta[name="theme-color"]')
            ?.setAttribute('content', theme === 'dark' ? '#09090b' : '#fafafa');
        document.querySelector('meta[name="color-scheme"]')
            ?.setAttribute('content', theme);
    }
}
