# Folio

Portafolio personal desarrollado en Angular 20, con Tailwind CSS y enfoque en componentes standalone. Incluye animaciones suaves, diseño responsive y secciones dinámicas para mostrar experiencia, habilidades, proyectos y contacto.

## Características principales

- **Angular 20** con componentes standalone y tipado estricto.
- **Tailwind CSS** para estilos utilitarios y diseño responsive.
- **Animaciones** de aparición en secciones clave usando Intersection Observer.
- **Secciones**: Hero, Sobre mí, Habilidades, Experiencia, Proyectos, Contacto.
- **Formulario de contacto** funcional vía [Formspree](https://formspree.io/).
- **Diseño moderno** y minimalista, optimizado para desktop y mobile.
- **Gestión de assets** (imágenes, fuentes, íconos SVG).
- **Buenas prácticas**: estructura modular, código limpio y mantenible.

## Scripts disponibles

| Comando         | Descripción                                 |
|-----------------|---------------------------------------------|
| `npm start`     | Inicia el servidor de desarrollo (`ng serve`)|
| `npm run build` | Compila el proyecto para producción         |
| `npm test`      | Ejecuta los tests unitarios con Karma       |

## Instalación y uso

1. Instala dependencias:
   ```bash
   npm install
   ```

2. Inicia el servidor de desarrollo:
   ```bash
   npm start
   ```
   Abre [http://localhost:4200](http://localhost:4200) en tu navegador.

3. Para construir el proyecto:
   ```bash
   npm run build
   ```

## Estructura del proyecto

- `src/app/components/hero`: Sección de bienvenida con efecto parallax y typewriter.
- `src/app/components/about`: Sobre mí, animación de aparición.
- `src/app/components/skills`: Nube de habilidades y tecnologías aprendiendo.
- `src/app/components/experience`: Línea de tiempo dinámica de experiencia laboral.
- `src/app/components/projects`: Tarjetas de proyectos destacados.
- `src/app/components/contact`: Formulario de contacto funcional.

## Personalización

- **Formulario de contacto**: Edita el endpoint de Formspree en `contact.component.html` para recibir mensajes en tu correo.
- **Animaciones**: Puedes ajustar la transición en los archivos `.scss` de cada sección.
- **Agregar proyectos/experiencia**: Modifica los arrays en los componentes correspondientes.

## Stack y dependencias

- Angular 20
- Tailwind CSS 3
- Lucide Angular Icons
- Simple Parallax JS (para efectos visuales)
- Formspree (envío de formularios)
- RxJS, SCSS, TypeScript

## Despliegue

El build de producción se genera en la carpeta `dist/`. Puedes desplegarlo en cualquier hosting estático (Vercel, Netlify, GitHub Pages, etc).

## Créditos

Desarrollado por [AlvaroPdev](https://github.com/AlvaroPdev).
