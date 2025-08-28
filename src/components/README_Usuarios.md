# Módulo de Gestión de Usuarios

## Descripción

El módulo de gestión de usuarios permite administrar los usuarios del sistema, incluyendo la creación, edición, eliminación y cambio de roles. Este módulo se conecta con la API de Laravel en la ruta `admin/users`.

## Características

### Funcionalidades Principales

- **Listar Usuarios**: Muestra todos los usuarios del sistema en una tabla paginada
- **Crear Usuario**: Permite crear nuevos usuarios con nombre, email, contraseña y rol
- **Editar Usuario**: Permite modificar la información de usuarios existentes
- **Eliminar Usuario**: Permite eliminar usuarios (con confirmación)
- **Cambiar Rol**: Permite cambiar el rol de un usuario entre 'admin' y 'usuario'
- **Ver Detalles**: Muestra información detallada de un usuario específico
- **Estadísticas**: Muestra estadísticas de usuarios (total, administradores, usuarios regulares)

### Roles de Usuario

- **Administrador**: Acceso completo al sistema
- **Usuario**: Acceso limitado según permisos

## Componentes

### UsuariosTable.tsx

Componente principal que maneja toda la lógica de gestión de usuarios.

**Props:**

- `isEmbedded?: boolean` - Indica si el componente está embebido en el dashboard

**Estados:**

- `usuarios`: Lista de usuarios
- `loading`: Estado de carga
- `stats`: Estadísticas de usuarios
- `createModalVisible`: Visibilidad del modal de creación
- `editModalVisible`: Visibilidad del modal de edición
- `viewModalVisible`: Visibilidad del modal de detalles
- `roleModalVisible`: Visibilidad del modal de cambio de rol

### Servicios

#### usuarios.ts

Servicio que maneja todas las operaciones con la API:

- `listUsuarios()`: Obtiene lista de usuarios
- `getUsuario(id)`: Obtiene un usuario específico
- `createUsuario(data)`: Crea un nuevo usuario
- `updateUsuario(id, data)`: Actualiza un usuario
- `deleteUsuario(id)`: Elimina un usuario
- `changeRole(id, role)`: Cambia el rol de un usuario
- `getStats()`: Obtiene estadísticas de usuarios

## Interfaz de Usuario

### Tabla de Usuarios

La tabla muestra:

- Avatar del usuario con color según rol
- Nombre y email
- Rol (con icono y color distintivo)
- Fecha de creación
- Acciones (ver, editar, cambiar rol, eliminar)

### Modales

1. **Modal de Creación**: Formulario para crear nuevos usuarios
2. **Modal de Edición**: Formulario para editar usuarios existentes
3. **Modal de Detalles**: Vista detallada de la información del usuario
4. **Modal de Cambio de Rol**: Selector para cambiar el rol del usuario

### Estadísticas

Tarjetas que muestran:

- Total de usuarios
- Número de administradores
- Número de usuarios regulares

## Integración con el Dashboard

El módulo está integrado en el dashboard principal:

1. **Menú Lateral**: Nueva opción "Usuarios" en el sidebar
2. **Breadcrumb**: Navegación contextual
3. **Contenido**: Sección dedicada para la gestión de usuarios

## Estilos

### UsuariosTable.css

Archivo de estilos que incluye:

- Diseño responsivo
- Animaciones y transiciones
- Colores y espaciado consistentes
- Estilos para modales y formularios

## Uso

### En el Dashboard

```tsx
import UsuariosTable from "../components/UsuariosTable";

// En el dashboard
{
  selectedKey === "usuarios" && (
    <div className="dashboard-content-wrapper">
      <UsuariosTable isEmbedded={true} />
    </div>
  );
}
```

### Como Componente Independiente

```tsx
import UsuariosTable from "../components/UsuariosTable";

function AdminPage() {
  return (
    <div>
      <UsuariosTable isEmbedded={false} />
    </div>
  );
}
```

## API Endpoints

El módulo utiliza los siguientes endpoints de la API de Laravel:

- `GET /admin/users` - Listar usuarios
- `GET /admin/users/{id}` - Obtener usuario específico
- `POST /admin/users` - Crear usuario
- `PUT /admin/users/{id}` - Actualizar usuario
- `DELETE /admin/users/{id}` - Eliminar usuario
- `PATCH /admin/users/{id}/role` - Cambiar rol
- `GET /admin/users/stats` - Obtener estadísticas

## Validaciones

### Frontend

- Nombre: Requerido, mínimo 2 caracteres
- Email: Requerido, formato válido
- Contraseña: Requerido para creación, mínimo 8 caracteres
- Rol: Requerido, valores válidos: 'admin' o 'usuario'

### Backend (Laravel)

- Validaciones adicionales en el controlador AdminController
- Verificación de permisos de administrador
- Prevención de auto-eliminación

## Seguridad

- Autenticación requerida para todas las operaciones
- Validación de permisos de administrador
- Confirmación para acciones destructivas
- Sanitización de datos de entrada

## Responsive Design

El módulo es completamente responsivo:

- Adaptación a diferentes tamaños de pantalla
- Menús colapsables en móviles
- Botones de acción optimizados para touch
- Tabla con scroll horizontal en pantallas pequeñas
