import {
  Directive,
  ElementRef,
  Inject,
  Input,
  NgZone,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appTilt]',
  standalone: true,
})
export class TiltDirective implements OnInit, OnDestroy {
  // Configuración interna con valores por defecto
  private _config = {
    max: 10, // Inclinación máxima en grados
    scale: 1.02, // Escala al pasar el cursor
    glare: true, // Activa o desactiva el efecto de reflejo
    'max-glare': 0.1, // Opacidad máxima del reflejo (de 0 a 1)
  };

  private isTouchDevice = false;
  private glareElement: HTMLElement | null = null;
  private glareWrapper: HTMLElement | null = null;

  // Usamos un setter para el Input para poder manejar el caso donde se usa sin valor
  @Input('appTilt')
  set tiltConfig(config: Partial<typeof this._config> | '' | undefined) {
    // Si se pasa un objeto de configuración, lo fusionamos con el default.
    // Si es un string vacío (cuando se usa <div appTilt>), no hacemos nada y se usan los defaults.
    if (config && typeof config === 'object') {
      this._config = { ...this._config, ...config };
    }
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private zone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Desactivamos el efecto en dispositivos táctiles, ya que se basa en `mousemove`.
      this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    if (this.isTouchDevice) {
      return;
    }

    if (this._config.glare) {
      this.prepareGlare();
    }
    // Ejecutar los listeners fuera de la zona de Angular para mejorar el rendimiento
    this.zone.runOutsideAngular(() => {
      this.el.nativeElement.addEventListener('mousemove', this.onMouseMove);
      this.el.nativeElement.addEventListener('mouseleave', this.onMouseLeave);
    });
  }

  ngOnDestroy() {
    if (this.isTouchDevice) {
      return;
    }
    // Es una buena práctica remover los listeners para prevenir fugas de memoria
    this.el.nativeElement.removeEventListener('mousemove', this.onMouseMove);
    this.el.nativeElement.removeEventListener('mouseleave', this.onMouseLeave);
  }

  private prepareGlare() {
    // El elemento anfitrión necesita un contexto de posicionamiento
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    this.renderer.setStyle(this.el.nativeElement, 'overflow', 'hidden');

    // Creamos el contenedor del reflejo
    this.glareWrapper = this.renderer.createElement('div');
    this.renderer.addClass(this.glareWrapper!, 'tilt-glare-wrapper');

    // Creamos el elemento del reflejo
    this.glareElement = this.renderer.createElement('div');
    this.renderer.addClass(this.glareElement!, 'tilt-glare');

    // Los añadimos al DOM
    this.renderer.appendChild(this.glareWrapper!, this.glareElement);
    this.renderer.appendChild(this.el.nativeElement, this.glareWrapper);

    // Aplicamos estilos al contenedor del reflejo
    this.renderer.setStyle(this.glareWrapper, 'position', 'absolute');
    this.renderer.setStyle(this.glareWrapper, 'top', '0');
    this.renderer.setStyle(this.glareWrapper, 'left', '0');
    this.renderer.setStyle(this.glareWrapper, 'width', '100%');
    this.renderer.setStyle(this.glareWrapper, 'height', '100%');
    this.renderer.setStyle(this.glareWrapper, 'overflow', 'hidden');
    this.renderer.setStyle(this.glareWrapper, 'pointer-events', 'none');
    this.renderer.setStyle(this.glareWrapper, 'border-radius', 'inherit');

    // Aplicamos estilos al reflejo
    this.renderer.setStyle(this.glareElement, 'position', 'absolute');
    this.renderer.setStyle(this.glareElement, 'top', '50%');
    this.renderer.setStyle(this.glareElement, 'left', '50%');
    this.renderer.setStyle(
      this.glareElement,
      'background-image',
      `radial-gradient(circle at 50% 50%, white, rgba(255, 255, 255, 0) 60%)`
    );
    const size =
      this.el.nativeElement.offsetWidth > this.el.nativeElement.offsetHeight
        ? this.el.nativeElement.offsetWidth * 2
        : this.el.nativeElement.offsetHeight * 2;
    this.renderer.setStyle(this.glareElement, 'width', `${size}px`);
    this.renderer.setStyle(this.glareElement, 'height', `${size}px`);
    this.renderer.setStyle(
      this.glareElement,
      'transform',
      'translate(-50%, -50%)'
    );
    this.renderer.setStyle(this.glareElement, 'opacity', '0');
    this.renderer.setStyle(
      this.glareElement,
      'transition',
      'opacity 0.3s ease-out'
    );
  }

  onMouseMove = (event: MouseEvent) => {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left; // Posición X dentro del elemento
    const y = event.clientY - rect.top;  // Posición Y dentro del elemento

    const { width, height } = rect;
    const rotateX = (-1 * this._config.max * (y - height / 2)) / (height / 2);
    const rotateY = (this._config.max * (x - width / 2)) / (width / 2);

    this.renderer.setStyle(
      this.el.nativeElement,
      'transform',
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${this._config.scale}, ${this._config.scale}, ${this._config.scale})`
    );

    // Mover el reflejo
    if (this.glareElement) {
      const glareX = (x / width) * 100;
      const glareY = (y / height) * 100;
      this.renderer.setStyle(
        this.glareElement,
        'transform',
        `translate(-50%, -50%) translate(${glareX}%, ${glareY}%)`
      );
      this.renderer.setStyle(this.glareElement, 'opacity', `${this._config['max-glare']}`);
    }
  }

  onMouseLeave = () => {
    // Reseteamos la transformación cuando el cursor sale del elemento
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'rotateX(0) rotateY(0) scale3d(1, 1, 1)');

    // Ocultar el reflejo
    if (this.glareElement) {
      this.renderer.setStyle(this.glareElement, 'opacity', '0');
    }
  }
}
