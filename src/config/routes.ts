// Configuración de rutas de la aplicación

export const ROUTES = {
  // Rutas públicas
  PUBLIC: {
    HOME: "/",
    LOGIN: "/login",
    CONTACTO: "/contacto",
    PROGRAMA: "/programa",
    QUE_VISITAR: "/que-visitar",
    DIRECTOR: "/director",
    RESTAURANTES: "/restaurantes",
    HOSPEDAJE: "/hospedaje",
  },

  // Rutas del dashboard (requieren autenticación)
  DASHBOARD: {
    ROOT: "/dashboard",
    EQUIPOS: "/dashboard/equipos",
    EQUIPO_DETALLE: "/dashboard/equipos/:id",
    EVENTOS: "/dashboard/eventos",
    USUARIOS: "/dashboard/usuarios",
    PARTICIPANTES: "/dashboard/participantes",
    HOSPEDAJES: "/dashboard/hospedajes",
    LUGARES: "/dashboard/lugares",
    RESTAURANTES: "/dashboard/restaurantes",
    ESTADISTICAS: "/dashboard/stats",
  },

  // Rutas de API
  API: {
    AUTH: {
      LOGIN: "/api/auth/login",
      LOGOUT: "/api/auth/logout",
      REFRESH: "/api/auth/refresh",
      ME: "/api/auth/me",
    },
    USUARIOS: {
      LIST: "/api/usuarios",
      CREATE: "/api/usuarios",
      UPDATE: "/api/usuarios/:id",
      DELETE: "/api/usuarios/:id",
      GET: "/api/usuarios/:id",
    },
    EQUIPOS: {
      LIST: "/api/equipos",
      CREATE: "/api/equipos",
      UPDATE: "/api/equipos/:id",
      DELETE: "/api/equipos/:id",
      GET: "/api/equipos/:id",
    },
    EVENTOS: {
      LIST: "/api/eventos",
      CREATE: "/api/eventos",
      UPDATE: "/api/eventos/:id",
      DELETE: "/api/eventos/:id",
      GET: "/api/eventos/:id",
    },
    HOSPEDAJES: {
      LIST: "/api/hospedajes",
      CREATE: "/api/hospedajes",
      UPDATE: "/api/hospedajes/:id",
      DELETE: "/api/hospedajes/:id",
      GET: "/api/hospedajes/:id",
    },
    LUGARES: {
      LIST: "/api/lugares",
      CREATE: "/api/lugares",
      UPDATE: "/api/lugares/:id",
      DELETE: "/api/lugares/:id",
      GET: "/api/lugares/:id",
    },
    RESTAURANTES: {
      LIST: "/api/restaurantes",
      CREATE: "/api/restaurantes",
      UPDATE: "/api/restaurantes/:id",
      DELETE: "/api/restaurantes/:id",
      GET: "/api/restaurantes/:id",
    },
  },
} as const;

// Tipos para las rutas
export type PublicRoute = (typeof ROUTES.PUBLIC)[keyof typeof ROUTES.PUBLIC];
export type DashboardRoute =
  (typeof ROUTES.DASHBOARD)[keyof typeof ROUTES.DASHBOARD];
export type ApiRoute = (typeof ROUTES.API)[keyof typeof ROUTES.API];

// Función para construir rutas con parámetros
export const buildRoute = (
  route: string,
  params: Record<string, string | number>
): string => {
  let builtRoute = route;

  Object.entries(params).forEach(([key, value]) => {
    builtRoute = builtRoute.replace(`:${key}`, String(value));
  });

  return builtRoute;
};

// Función para verificar si una ruta es del dashboard
export const isDashboardRoute = (pathname: string): boolean => {
  return pathname.startsWith("/dashboard");
};

// Función para verificar si una ruta es pública
export const isPublicRoute = (pathname: string): boolean => {
  return Object.values(ROUTES.PUBLIC).includes(pathname as PublicRoute);
};

// Función para obtener el título de la página basado en la ruta
export const getPageTitle = (pathname: string): string => {
  const routeTitles: Record<string, string> = {
    [ROUTES.PUBLIC.HOME]: "Inicio",
    [ROUTES.PUBLIC.LOGIN]: "Iniciar Sesión",
    [ROUTES.PUBLIC.CONTACTO]: "Contacto",
    [ROUTES.PUBLIC.PROGRAMA]: "Programa",
    [ROUTES.PUBLIC.QUE_VISITAR]: "Qué Visitar",
    [ROUTES.PUBLIC.DIRECTOR]: "Director",
    [ROUTES.PUBLIC.RESTAURANTES]: "Restaurantes",
    [ROUTES.PUBLIC.HOSPEDAJE]: "Hospedaje",
    [ROUTES.DASHBOARD.ROOT]: "Dashboard",
    [ROUTES.DASHBOARD.EQUIPOS]: "Equipos",
    [ROUTES.DASHBOARD.EVENTOS]: "Eventos",
    [ROUTES.DASHBOARD.USUARIOS]: "Usuarios",
    [ROUTES.DASHBOARD.PARTICIPANTES]: "Participantes",
    [ROUTES.DASHBOARD.HOSPEDAJES]: "Hospedajes",
    [ROUTES.DASHBOARD.LUGARES]: "Lugares",
    [ROUTES.DASHBOARD.RESTAURANTES]: "Restaurantes",
    [ROUTES.DASHBOARD.ESTADISTICAS]: "Estadísticas",
  };

  return routeTitles[pathname] || "Página no encontrada";
};
