# Prueba Técnica Angular - User Management System

Este proyecto es una prueba técnica desarrollada en **Angular 17** con diseño **responsive** utilizando **Angular Material Design**. La aplicación implementa un sistema de gestión de usuarios mediante un monorepo modularizado y orientado a buenas prácticas de desarrollo web.

---

## 🏛️ Arquitectura y Estructura

El repositorio está organizado bajo un enfoque **Monorepo (App + Lib)** para desacoplar la lógica de negocio y fomentar la reutilización de código:

- **Aplicación Principal (`dekraTechUITest`)**: Gestiona la navegación, internacionalización (i18n) y el enrutamiento principal con consumo de servicios compartidos.
- **Librería de Dominio (`user-management-lib`)**: Proyecto independiente ubicado en `projects/user-management-lib` que contiene toda la lógica relacionada con la gestión de usuarios (componentes, servicios, modelos, utilidades y pipes).

---

## 🚀 Características Principales

- **Lazy Loading**: Optimización de carga por rutas mediante `loadChildren` y `loadComponent` para modularizar la aplicación.
- **Formularios Reactivos**: Manejo de entradas con validaciones nativas y personalizadas.
- **Internacionalización (i18n)**: Configuración centralizada de `TranslateService` para la adaptación multiidioma.
- **Angular Material**: Componentes visuales responsivos como `MatTable`, `MatDialog`, `MatFormField`, `MatSelect`, entre otros.

---

## 💡 Desafíos Personales e Implementaciones

Como valor agregado al desarrollo de la prueba técnica, se integraron soluciones a medida:

- **Pipes Personalizados**: Implementación de `AgePipe` para el cálculo dinámico de edad en base a la fecha de nacimiento.
- **Validadores Personalizados**:
  - `noWhiteSpace`: Validación de campos vacíos o cadenas de solo espacios.
  - `maxDateToday`: Validación para restringir fechas futuras.
  - `isFieldOneEqualsFieldTwo`: Validador de coincidencia de campos (e.g., confirmación de contraseñas).
- **Pruebas Unitarias aisladas**: Cobertura de tests en componentes principales (`UserTableComponent`, `UserFormComponent`), servicios (`UserApiService`), pipes y clases utilitarias (`FormUtils`).

---

## 🧪 Ejecución de Tests Unitarios

Las suites de pruebas están separadas por proyecto gracias a sus configuraciones independientes de `tsconfig.spec.json`.

### **1. Testear la aplicación principal**

```bash
ng test
ng test user-management-lib
```
