# Tasks App - Aplicación de Gestión de Tareas

Aplicación móvil desarrollada con Ionic + Angular para la gestión de tareas con funcionalidades de CRUD, filtrado, paginación y modo oscuro.

## 📋 Características Principales

- ✅ **Gestión completa de tareas** (Crear, Leer, Eliminar)
- 🔍 **Filtros dinámicos** (Todas, Pendientes, Completadas)
- 📄 **Paginación** (10 tareas por página)
- 🌓 **Dark Mode**
- 💾 **Modo Offline** con almacenamiento local
- ✨ **Validaciones de formularios** en tiempo real
- 🎨 **UI moderna** con Tailwind CSS
- 📱 **Diseño responsivo** y mobile-first

---

## 🚀 Pasos para Correr el Proyecto

### Prerrequisitos

- **Node.js** (v18 o superior)
- **npm** (v9 o superior)
- **Ionic CLI** (v7 o superior)

### Instalación

1. **Clonar o descargar el repositorio**
   ```bash
   cd TaskManager
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Instalar Ionic CLI globalmente** (si no lo tienes)
   ```bash
   npm install -g @ionic/cli
   ```

### Ejecución en Desarrollo

**Servidor de desarrollo web:**
```bash
ionic serve
```
o
```bash
npm start
```

La aplicación se abrirá automáticamente en `http://localhost:8100`

### Ejecución de Tests

```bash
npm test
```

---

## Decisiones Técnicas

### Arquitectura y Patrones

#### **1. Arquitectura de Servicios y Hooks**
- **Servicios centralizados**: `TasksService`, `StorageService`, `ThemeService` manejan toda la lógica de negocio
- **Hooks personalizados**: `UseTasksHook` centraliza el estado y lógica de tareas
- **Separación de responsabilidades**: Los componentes solo manejan UI y eventos, delegando la lógica a servicios

**Justificación**: Esta arquitectura permite reutilización de código, facilita testing y mantiene los componentes limpios.

#### **2. Gestión de Estado Local**
- Uso de **Ionic Storage** para persistencia
- Estado reactivo en el hook con propiedades públicas
- Sincronización entre API remota y almacenamiento local, en primera instancia se cargan los datos de la api se sincronizan en Ionic Storage y a partir de ahi trabajamos con el Ionic Storage

**Justificación**: Permite funcionamiento offline y mejora la experiencia de usuario con respuestas inmediatas.

#### **3. Sistema de Almacenamiento Dual**
```typescript
- tasks: Lista principal de tareas
- task_local_changes: Registro de cambios locales
```

**Justificación**: Permite sincronizar cambios locales con la API sin perder datos, ideal para modo offline.

### Diseño y UX

#### **4. Tailwind CSS + Ionic Components**
- Combinación de componentes nativos de Ionic con utilidades de Tailwind
- Variables CSS personalizadas para dark mode
- Diseño mobile-first

**Justificación**: Tailwind ofrece flexibilidad y rapidez en el desarrollo de UI, mientras que Ionic proporciona componentes optimizados para móviles.

#### **5. Dark Mode con Clase CSS**
- Sistema basado en clase `.dark` en el body
- Persistencia en storage local
- Inicialización temprana en AppComponent

**Justificación**: Mejor rendimiento que media queries y control total sobre el tema.

### Validaciones y UX

#### **6. Validaciones en Tiempo Real**
- Feedback visual inmediato (bordes rojos, mensajes)
- Contador de caracteres
- Botón submit deshabilitado si hay errores

**Justificación**: Mejora la experiencia del usuario al detectar errores antes del envío.

#### **7. Confirmación de Acciones Destructivas**
- AlertController para confirmación de eliminación
- Prevención de clicks accidentales con `stopPropagation`

**Justificación**: Evita pérdida accidental de datos.

### Performance

#### **8. Paginación del lado del cliente**
- 10 elementos por página
- Cálculo dinámico del total de páginas
- Navegación con botones anterior/siguiente

**Justificación**: Mejora el rendimiento al renderizar solo los elementos visibles.

#### **9. Lazy Loading de Módulos**
- Páginas cargadas bajo demanda mediante Angular routing
- Reducción del bundle inicial

**Justificación**: Mejora el tiempo de carga inicial de la aplicación.

---

## 📚 Librerías Utilizadas

### Core Framework
| Librería | Versión | Propósito |
|----------|---------|-----------|
| **@ionic/angular** | ^8.0.0 | Framework principal para desarrollo móvil híbrido |
| **@angular/core** | ^20.0.0 | Framework base de Angular |
| **@capacitor/core** | 8.0.2 | Acceso a APIs nativas del dispositivo |

### UI y Estilos
| Librería | Versión | Propósito |
|----------|---------|-----------|
| **tailwindcss** | ^3.4.19 | Framework CSS utility-first para estilos personalizados |
| **autoprefixer** | ^10.4.24 | Añade prefijos CSS automáticamente |
| **postcss** | ^8.5.6 | Procesamiento de CSS |
| **ionicons** | ^7.0.0 | Iconos oficiales de Ionic |

### Almacenamiento y HTTP
| Librería | Versión | Propósito |
|----------|---------|-----------|
| **@ionic/storage-angular** | ^4.0.0 | Persistencia de datos local (IndexedDB, LocalStorage) |
| **axios** | ^1.13.4 | Cliente HTTP para consumo de API REST |

### Capacitor Plugins
| Librería | Versión | Propósito |
|----------|---------|-----------|
| **@capacitor/app** | 8.0.0 | Gestión del ciclo de vida de la app |
| **@capacitor/keyboard** | 8.0.0 | Control del teclado virtual |

### Herramientas de Desarrollo
| Librería | Versión | Propósito |
|----------|---------|-----------|
| **@angular/cli** | ^20.0.0 | CLI de Angular para generación y builds |
| **@ionic/angular-toolkit** | ^12.0.0 | Herramientas de integración Ionic-Angular |
| **typescript** | ~5.9.0 | Lenguaje de programación principal |
| **eslint** | ^9.16.0 | Linter para código limpio y consistente |

### Testing
| Librería | Versión | Propósito |
|----------|---------|-----------|
| **jasmine-core** | ~5.1.0 | Framework de testing |
| **karma** | ~6.4.0 | Test runner |
| **karma-jasmine** | ~5.1.0 | Integración Jasmine-Karma |

---

## 📁 Estructura del Proyecto

```
tasks-app/
├── src/
│   ├── app/
│   │   ├── components/          # Componentes reutilizables
│   │   │   ├── card-skeleton/   # Skeleton loader
│   │   │   └── task-card/       # Tarjeta de tarea
│   │   ├── hooks/               # Custom hooks
│   │   │   └── use-tasks.hooks.ts
│   │   ├── models/              # Interfaces TypeScript
│   │   │   └── task.model.ts
│   │   ├── pages/               # Páginas de la aplicación
│   │   │   ├── task-create/     # Crear tarea
│   │   │   ├── task-detail/     # Detalle de tarea
│   │   │   └── tasks-list/      # Lista de tareas
│   │   └── services/            # Servicios
│   │       ├── storage.service.ts
│   │       ├── tasks.service.ts
│   │       └── theme.service.ts
│   ├── assets/                  # Recursos estáticos
│   ├── theme/                   # Variables de tema
│   └── environments/            # Configuración de entornos
├── tailwind.config.js           # Configuración Tailwind
├── angular.json                 # Configuración Angular
├── capacitor.config.ts          # Configuración Capacitor
└── package.json                 # Dependencias del proyecto
```

---

## 🎯 Funcionalidades Implementadas

### 1. Lista de Tareas
- ✅ Visualización de todas las tareas
- ✅ Filtrado por estado (Todas, Pendientes, Completadas)
- ✅ Paginación (10 por página)
- ✅ Contador de tareas pendientes
- ✅ Skeleton loaders durante carga

### 2. Crear Tarea
- ✅ Formulario con validaciones en tiempo real
- ✅ Campos: Título (requerido), Descripción (opcional), Fecha (opcional)
- ✅ Validaciones:
  - Título: 3-100 caracteres
  - Descripción: máx. 500 caracteres
- ✅ Contador de caracteres
- ✅ Feedback visual de errores
- ✅ Botón deshabilitado si hay errores

### 3. Detalle de Tarea
- ✅ Visualización completa de información
- ✅ Cambiar estado (Pendiente/Completado)
- ✅ Skeleton loader

### 4. Eliminar Tarea
- ✅ Botón de eliminación en cada tarjeta
- ✅ Confirmación antes de eliminar
- ✅ Eliminación del storage local

### 5. Dark Mode
- ✅ Toggle en header de lista
- ✅ Estilos adaptados en todas las vistas
- ✅ Transiciones suaves

### 6. Modo Offline
- ✅ Toggle para activar/desactivar
- ✅ Almacenamiento local con Ionic Storage
- ✅ Sincronización con API
- ✅ Persistencia de cambios locales

---

## 🔄 Flujo de Datos

```
API (jsonplaceholder) 
    ↓
TasksService (axios)
    ↓
StorageService (Ionic Storage)
    ↓
UseTasksHook (Estado)
    ↓
Components (UI)
```

---

## 🌐 API Utilizada

**JSONPlaceholder**: https://jsonplaceholder.typicode.com/todos

Endpoints consumidos:
- `GET /todos` - Lista de tareas
---

## 👨‍💻 Autor

Desarrollado como prueba técnica para demostrar habilidades en:
- Ionic Framework + Angular
- Gestión de estado y persistencia
- Integración con APIs REST
- Diseño de interfaces modernas
- Validaciones y UX

---

## 📝 Notas Adicionales

- La app funciona completamente offline después de la primera carga
- Los cambios locales persisten entre recargas
- Todas las validaciones funcionan en tiempo real
- La paginación se adapta dinámicamente al número de tareas

### Mejoras con más tiempo

- Opción para editar tareas
- Alertas de vencimiento de tareas
- Animaciones al eliminar o crear una tarea
- Persistencia del dark mode
- Login
- Almacenar tareas en BD
- Dashboard con resumen de tareas
- Categorización de tareas
- Mejoras en UI del loading


