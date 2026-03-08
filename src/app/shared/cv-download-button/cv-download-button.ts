import { Component, HostListener } from '@angular/core';

@Component({
    selector: 'app-cv-download-button',
    imports: [],
    templateUrl: './cv-download-button.html',
    styleUrl: './cv-download-button.css',
})
export class CvDownloadButton {
    modalOpen = false;
    closing = false;
    scrolled = false;

    @HostListener('window:scroll')
    onWindowScroll() {
        this.scrolled = window.scrollY > 80;
    }

    openModal() {
        this.closing = false;
        this.modalOpen = true;
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.closing = true;
        setTimeout(() => {
            this.modalOpen = false;
            this.closing = false;
            document.body.style.overflow = '';
        }, 200);
    }

    @HostListener('document:keydown.escape')
    onEscape() {
        this.closeModal();
    }
}
