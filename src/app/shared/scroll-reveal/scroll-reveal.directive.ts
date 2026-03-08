import { Directive, ElementRef, OnInit, OnDestroy } from '@angular/core';

@Directive({
    selector: '[appScrollReveal]',
    standalone: true,
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
    private observer!: IntersectionObserver;

    constructor(private el: ElementRef) { }

    ngOnInit() {
        const element = this.el.nativeElement as HTMLElement;
        element.classList.add('scroll-reveal');

        this.observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    element.classList.add('visible');
                    this.observer.unobserve(element);
                }
            },
            { threshold: 0.08 }
        );

        this.observer.observe(element);
    }

    ngOnDestroy() {
        this.observer?.disconnect();
    }
}
