# Dashboard Components

Esta carpeta contiene todos los componentes del dashboard organizados de manera modular y reutilizable.

## Estructura de Carpetas

```
dashboard/
├── layout/                    # Componentes de layout y navegación
│   ├── DashboardLayout.tsx    # Layout principal que orquesta todo
│   ├── DashboardSidebar.tsx   # Sidebar con menú de navegación
│   ├── DashboardHeader.tsx    # Header con título y controles
│   ├── DashboardContent.tsx   # Contenido principal del dashboard
│   ├── DashboardBreadcrumb.tsx # Navegación de breadcrumbs
│   └── DashboardMobileDrawer.tsx # Menú móvil
├── events/                    # Componentes relacionados con eventos
│   └── EventSelector.tsx      # Selector y gestión de eventos
├── participants/              # Componentes relacionados con participantes
│   └── ParticipantesTable.tsx # Tabla de gestión de participantes
├── stats/                     # Componentes de estadísticas
│   └── DashboardStats.tsx     # Estadísticas generales del dashboard
└── index.ts                   # Exportaciones centralizadas
```

## Componentes Principales

### Layout Components

- **DashboardLayout**: Componente principal que orquesta todo el layout del dashboard
- **DashboardSidebar**: Sidebar con menú de navegación y logo
- **DashboardHeader**: Header con título de página y controles de navegación
- **DashboardContent**: Contenido principal que renderiza las diferentes secciones
- **DashboardBreadcrumb**: Navegación de breadcrumbs para orientar al usuario
- **DashboardMobileDrawer**: Menú móvil para dispositivos pequeños

### Feature Components

- **EventSelector**: Gestión completa de eventos (selección, edición, detalle)
- **ParticipantesTable**: Tabla de participantes con funcionalidades CRUD
- **DashboardStats**: Estadísticas generales y detalladas del sistema

## Beneficios de la Refactorización

1. **Modularidad**: Cada componente tiene una responsabilidad específica
2. **Reutilización**: Los componentes pueden ser reutilizados en otras partes de la aplicación
3. **Mantenibilidad**: Es más fácil mantener y actualizar componentes pequeños
4. **Testabilidad**: Cada componente puede ser probado de manera independiente
5. **Organización**: Estructura clara y fácil de navegar

## Uso

```tsx
import { DashboardLayout } from '../components/dashboard';

// En el componente principal
<DashboardLayout
  collapsed={collapsed}
  selectedKey={selectedKey}
  // ... otras props
/>
```

## Convenciones de Nomenclatura

- Los componentes siguen el patrón PascalCase
- Los archivos tienen el mismo nombre que el componente
- Las interfaces de props incluyen el nombre del componente + "Props"
- Los componentes están organizados por funcionalidad en carpetas específicas

## Dependencias

Todos los componentes utilizan:
- **Ant Design** para la UI
- **React Hooks** para el estado y efectos
- **TypeScript** para tipado estático
- **React Router** para navegación
