# Estructura del Proyecto - Admin Eventos Frontend

## 📁 Organización de Carpetas

### 🎨 **src/components/**

Componentes reutilizables de la interfaz de usuario.

#### **ui/** - Componentes de UI básicos

- `buttons/` - Botones personalizados
- `inputs/` - Campos de entrada
- `cards/` - Tarjetas y contenedores
- `modals/` - Ventanas modales
- `layout/` - Componentes de layout (Navbar, Sidebar, etc.)

#### **tables/** - Tablas del sistema

- `EquiposTable.tsx` - Tabla de equipos
- `UsuariosTable.tsx` - Tabla de usuarios
- `ParticipantesTable.tsx` - Tabla de participantes

#### **forms/** - Formularios reutilizables

- Formularios de creación/edición

#### **dashboard/** - Componentes específicos del dashboard

- `layout/` - Layout del dashboard
- `events/` - Gestión de eventos
- `participants/` - Gestión de participantes
- `stats/` - Estadísticas del dashboard

#### **common/** - Componentes comunes

- Componentes compartidos entre diferentes módulos

### 🚀 **src/features/**

Funcionalidades organizadas por dominio de negocio.

- `auth/` - Autenticación y autorización
- `eventos/` - Gestión de eventos
- `usuarios/` - Gestión de usuarios
- `equipos/` - Gestión de equipos
- `hospedajes/` - Gestión de hospedajes
- `lugares/` - Gestión de lugares
- `restaurantes/` - Gestión de restaurantes

### 📄 **src/pages/**

Páginas principales de la aplicación.

- `Home.tsx` - Página de inicio
- `Login.tsx` - Página de login
- `Dashboard.tsx` - Dashboard principal
- `EquipoDetalle.tsx` - Detalle de equipo
- `Contacto.tsx` - Página de contacto
- `Programa.tsx` - Programa del evento
- `QueVisitar.tsx` - Lugares para visitar
- `Director.tsx` - Información del director
- `Restaurantes.tsx` - Lista de restaurantes
- `Hospedaje.tsx` - Información de hospedaje

### 🎨 **src/styles/**

Estilos CSS organizados por categoría.

- `components.css` - Estilos de componentes (archivo principal)
- `navbar.css` - Estilos del navbar
- `tables.css` - Estilos de tablas
- `dashboard.css` - Estilos del dashboard
- `pages.css` - Estilos de páginas

### 🔧 **src/services/**

Servicios de API y lógica de negocio.

- `auth.ts` - Servicios de autenticación
- `eventos.ts` - Servicios de eventos
- `usuarios.ts` - Servicios de usuarios

### 🪝 **src/hooks/**

Hooks personalizados de React.

- `auth/` - Hooks de autenticación
- `data/` - Hooks de datos
- `ui/` - Hooks de interfaz

### 🔄 **src/contexts/**

Contextos de React para estado global.

### ⚙️ **src/config/**

Configuración de la aplicación.

- `env.ts` - Variables de entorno

### 📦 **src/shared/**

Código compartido entre módulos.

#### **types/** - Tipos TypeScript

- Interfaces y tipos del sistema

#### **constants/** - Constantes

- Constantes del sistema

#### **utils/** - Utilidades

- Funciones de utilidad

## 🚀 **Cómo Usar**

### Importar Componentes

```typescript
// Importar desde el índice principal
import { Navbar, EquiposTable } from "@/components";

// Importar desde carpetas específicas
import { Navbar } from "@/components/ui/layout";
import { EquiposTable } from "@/components/tables";
```

### Importar Páginas

```typescript
import { Home, Login, Dashboard } from "@/pages";
```

### Importar Servicios

```typescript
import { authService, eventosService } from "@/services";
```

### Importar Hooks

```typescript
import { useAuth, useData } from "@/hooks";
```

### Importar Tipos

```typescript
import { User, Event, Team } from "@/shared/types";
```

### Importar Utilidades

```typescript
import { formatDate, isValidEmail } from "@/shared/utils";
```

### Importar Constantes

```typescript
import { USER_ROLES, EVENT_STATUS } from "@/shared/constants";
```

## 📝 **Convenciones de Nomenclatura**

- **Archivos**: PascalCase para componentes, camelCase para utilidades
- **Carpetas**: camelCase
- **Componentes**: PascalCase
- **Hooks**: camelCase con prefijo `use`
- **Servicios**: camelCase con sufijo `Service`
- **Tipos**: PascalCase con prefijo descriptivo

## 🔄 **Flujo de Desarrollo**

1. **Crear componente** en la carpeta apropiada
2. **Exportar** desde el archivo de índice correspondiente
3. **Importar** desde el índice principal o específico
4. **Documentar** cambios en este README

## 📚 **Recursos Adicionales**

- Ver `package.json` para dependencias
- Ver `tsconfig.json` para configuración de TypeScript
- Ver `vite.config.ts` para configuración de Vite
