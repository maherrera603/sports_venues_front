# Frontend – Sistema de Reservas de Canchas Comunitarias (Angular SSR)

Este frontend corresponde al proyecto académico **Sistema de reservas para canchas sintéticas en comunidades urbanas**, cuyo propósito principal es ofrecer una interfaz accesible, simple y transparente para que los usuarios puedan gestionar reservas en espacios deportivos comunitarios. La solución pretende mejorar la organización del uso de las canchas, reducir conflictos y promover la convivencia entre los habitantes del barrio.  
Fuente: Documento de formulación del proyecto. :contentReference[oaicite:0]{index=0}

---

## 📌 Contexto del Proyecto
En varias comunidades urbanas, las canchas sintéticas se han convertido en espacios de encuentro social, recreación y cohesión comunitaria. Sin embargo, la falta de un mecanismo claro y transparente para administrar las reservas provoca tensiones, favoritismos y uso desigual del espacio.  
El proyecto aborda este problema mediante el diseño de un **prototipo navegable** que permita validar con la comunidad una herramienta tecnológica útil, sencilla y adaptable.  
Fuente: Planteamiento del problema y alcance. :contentReference[oaicite:1]{index=1}

---

## 🎯 Objetivo del Frontend
El objetivo del frontend es brindar una interfaz amigable y responsiva que:

- Permita a los usuarios registrarse e iniciar sesión.
- Liste los espacios deportivos disponibles.
- Muestre horarios habilitados para reserva.
- Facilite la creación, modificación y eliminación de reservas.
- Brinde a los administradores acceso a funcionalidades de gestión.

El prototipo debe ser accesible desde dispositivos móviles y computadoras, cumpliendo con las necesidades identificadas durante el levantamiento de información.  
Fuente: Objetivos específicos y análisis de necesidades. :contentReference[oaicite:2]{index=2}

---

## 🧩 Tecnologías utilizadas
- **Angular SSR (Server-Side Rendering)**
- TypeScript  
- HTML / SCSS  
- RxJS

SSR se utiliza para mejorar la experiencia del usuario, optimizar tiempos de carga y mantener una estructura escalable para futuras versiones del sistema.

---

## 📐 Arquitectura General del Frontend
La interfaz está construida bajo los principios de:

- **Arquitectura basada en componentes**
- **Servicios para manejo de lógica y consumo de datos**
- **Modularización por funcionalidades**
- **Uso de formularios reactivos**
- **Rutas protegidas según rol del usuario (si aplica)**

El diseño prioriza accesibilidad, simplicidad y facilidad de uso, de acuerdo con los criterios definidos en el proyecto.  
Fuente: Alcance y criterios de aceptación. :contentReference[oaicite:3]{index=3}

---

## 📌 Requerimientos Funcionales del Frontend

Basados en la sección de requerimientos del documento. :contentReference[oaicite:4]{index=4}

### Para usuarios:
- Registro de usuario (RQF001)
- Inicio y cierre de sesión (RQF003, RQF004)
- Edición de perfil (RQF005, RQF006)
- Visualización de espacios deportivos habilitados
- Creación y gestión de reservas

### Para administradores:
- Gestión de espacios deportivos (crear, listar, editar, eliminar)
- Modificación y supervisión de reservas

---

## 🎨 Diseño de UX/UI
El frontend se desarrolló considerando:

- Navegación simple y clara  
- Interfaz accesible desde celulares básicos  
- Elementos de diseño coherentes con el prototipo elaborado en Figma  
- Flujo intuitivo para usuarios con poco dominio tecnológico  

Fuente: Matriz de riesgos (limitaciones tecnológicas). :contentReference[oaicite:5]{index=5}

---

## 📚 Metodología del Desarrollo
El proyecto se construyó utilizando **Scrum**, con:

- Sprints cortos  
- Reuniones de revisión y retroalimentación  
- Ajustes basados en pruebas con la comunidad  

Fuente: Metodología del documento del proyecto. :contentReference[oaicite:6]{index=6}

---


## Instalacion
### clonar repositorio
```bash
git clone https://github.com/maherrera603/sports_venues_front.git
```
### navegacion al proyecto
```bash
cd sports_venues_front.git
```

### configuracion del variables de entorno
```bash
copiar y pegar el archivo Envs.template.ts y renombrarlo a Envs.ts definir los valores retornados de las funciones
path-inicial: src/app/helpers/Envs.template.ts
path-final: src/app/helpers/Envs.ts
```

### instalacion de dependencias
```bash
npm install
``` 


## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.