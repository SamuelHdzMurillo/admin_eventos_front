# 🎯 Admin Eventos Frontend - CECyTE

Sistema de administración de eventos del Colegio de Estudios Científicos y Tecnológicos del Estado (CECyTE).

## 🚀 Características

- **Dashboard Administrativo** - Gestión completa de eventos, equipos y participantes
- **Interfaz Moderna** - Diseño responsive con Ant Design
- **Autenticación Segura** - Sistema de login con JWT
- **Gestión de Usuarios** - Roles y permisos configurables
- **Estadísticas en Tiempo Real** - Métricas y reportes del sistema
- **API RESTful** - Backend moderno y escalable

## 📁 Estructura del Proyecto

```
src/
├── 📁 components/          # Componentes reutilizables
│   ├── 🎨 ui/             # Componentes de UI básicos
│   ├── 📊 tables/         # Tablas del sistema
│   ├── 📝 forms/          # Formularios reutilizables
│   ├── 🏠 layout/         # Componentes de layout
│   └── 📊 dashboard/      # Componentes del dashboard
├── 🚀 features/            # Funcionalidades por dominio
│   ├── 🔐 auth/           # Autenticación
│   ├── 📅 eventos/        # Gestión de eventos
│   ├── 👥 usuarios/       # Gestión de usuarios
│   ├── 🏆 equipos/        # Gestión de equipos
│   ├── 🏨 hospedajes/     # Gestión de hospedajes
│   ├── 📍 lugares/        # Gestión de lugares
│   └── 🍽️ restaurantes/   # Gestión de restaurantes
├── 📄 pages/               # Páginas de la aplicación
├── 🎨 styles/              # Estilos CSS organizados
├── 🔧 services/            # Servicios de API
├── 🪝 hooks/               # Hooks personalizados
├── ⚙️ config/              # Configuración del sistema
└── 📦 shared/              # Código compartido
    ├── types/              # Tipos TypeScript
    ├── constants/          # Constantes del sistema
    └── utils/              # Utilidades
```

## 🛠️ Tecnologías

- **Frontend**: React 18 + TypeScript
- **UI Framework**: Ant Design
- **Build Tool**: Vite
- **Styling**: CSS Modules + Variables CSS
- **State Management**: React Context + Hooks
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Form Handling**: Ant Design Forms
- **Icons**: Ant Design Icons

## 🚀 Instalación

### Prerrequisitos

- Node.js 18+
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**

   ```bash
   git clone <repository-url>
   cd admin_eventos_front
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   # o
   yarn install
   ```

3. **Configurar variables de entorno**

   ```bash
   cp .env.example .env.local
   # Editar .env.local con tus configuraciones
   ```

4. **Ejecutar en desarrollo**

   ```bash
   npm run dev
   # o
   yarn dev
   ```

5. **Construir para producción**
   ```bash
   npm run build
   # o
   yarn build
   ```

## ⚙️ Configuración

### Variables de Entorno

```env
# API
VITE_API_URL=http://localhost:3000
VITE_API_VERSION=v1

# Desarrollo
VITE_ENABLE_MOCK_DATA=true
VITE_DEBUG_MODE=true
```

### Configuración de Rutas

El sistema incluye un archivo de configuración centralizado de rutas en `src/config/routes.ts` que define todas las rutas de la aplicación.

## 📚 Uso del Sistema

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

### Importar Configuración

```typescript
import { ROUTES, APP_CONFIG } from "@/config";
```

## 🎨 Sistema de Estilos

### Variables CSS

El sistema utiliza variables CSS personalizadas para mantener consistencia en el diseño:

```css
:root {
  --primary-color: #9e3652;
  --secondary-color: #f5f7fa;
  --spacing-md: 16px;
  --border-radius-md: 8px;
}
```

### Clases de Utilidad

```css
.text-center {
  text-align: center;
}
.mb-3 {
  margin-bottom: 16px;
}
.fade-in {
  animation: fadeIn 0.3s ease;
}
```

## 🔐 Autenticación

El sistema incluye un sistema de autenticación completo con:

- Login con email/contraseña
- Tokens JWT
- Refresh tokens automáticos
- Protección de rutas
- Roles y permisos

## 📊 Dashboard

El dashboard incluye:

- **Estadísticas Generales** - Métricas del sistema
- **Gestión de Equipos** - CRUD completo de equipos
- **Gestión de Usuarios** - Administración de usuarios
- **Gestión de Eventos** - Configuración de eventos
- **Reportes** - Generación de reportes

## 🧪 Testing

```bash
# Ejecutar tests
npm run test

# Ejecutar tests en modo watch
npm run test:watch

# Generar cobertura
npm run test:coverage
```

## 📦 Scripts Disponibles

```json
{
  "dev": "Iniciar servidor de desarrollo",
  "build": "Construir para producción",
  "preview": "Previsualizar build de producción",
  "lint": "Ejecutar ESLint",
  "lint:fix": "Corregir errores de ESLint",
  "type-check": "Verificar tipos TypeScript"
}
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Convenciones de Código

- **Archivos**: PascalCase para componentes, camelCase para utilidades
- **Carpetas**: camelCase
- **Componentes**: PascalCase
- **Hooks**: camelCase con prefijo `use`
- **Servicios**: camelCase con sufijo `Service`
- **Tipos**: PascalCase con prefijo descriptivo

## 🐛 Reportar Bugs

Si encuentras un bug, por favor:

1. Verifica que no haya sido reportado ya
2. Usa el template de bug report
3. Incluye pasos para reproducir
4. Adjunta logs y capturas de pantalla si es necesario

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Equipo

- **Desarrolladores**: Equipo de Desarrollo CECyTE
- **Diseñadores**: Equipo de Diseño CECyTE
- **Product Owner**: Administración CECyTE

## 📞 Contacto

- **Email**: info@cecyte.edu.mx
- **Sitio Web**: https://cecyte.edu.mx
- **Teléfono**: +52 55 1234 5678

---

**Desarrollado con ❤️ por el equipo de CECyTE**
