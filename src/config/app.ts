// Configuración general de la aplicación

export const APP_CONFIG = {
  // Información básica de la aplicación
  APP_NAME: "Admin Eventos CECyTE",
  APP_VERSION: "1.0.0",
  APP_DESCRIPTION: "Sistema de administración de eventos del CECyTE",

  // Configuración de la empresa
  COMPANY: {
    NAME: "CECyTE",
    FULL_NAME: "Colegio de Estudios Científicos y Tecnológicos del Estado",
    LOGO: "/assets/logo_cecyte_chef_sin_fondo.png",
    WEBSITE: "https://cecyte.edu.mx",
    EMAIL: "info@cecyte.edu.mx",
    PHONE: "+52 55 1234 5678",
    ADDRESS: "Ciudad de México, México",
  },

  // Configuración de la API
  API: {
    BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:3000",
    TIMEOUT: 30000,
    RETRY_ATTEMPTS: 3,
    VERSION: "v1",
  },

  // Configuración de autenticación
  AUTH: {
    TOKEN_KEY: "cecyte_auth_token",
    REFRESH_TOKEN_KEY: "cecyte_refresh_token",
    TOKEN_EXPIRY: 3600, // 1 hora en segundos
    REFRESH_TOKEN_EXPIRY: 86400, // 24 horas en segundos
    LOGIN_REDIRECT: "/dashboard",
    LOGOUT_REDIRECT: "/login",
  },

  // Configuración de paginación
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
    MAX_PAGE_SIZE: 100,
  },

  // Configuración de archivos
  FILES: {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_TYPES: ["image/jpeg", "image/png", "image/gif", "application/pdf"],
    UPLOAD_PATH: "/uploads",
  },

  // Configuración de notificaciones
  NOTIFICATIONS: {
    AUTO_HIDE_DURATION: 5000, // 5 segundos
    MAX_NOTIFICATIONS: 5,
    POSITION: "top-right",
  },

  // Configuración de temas
  THEME: {
    PRIMARY_COLOR: "#9e3652",
    SECONDARY_COLOR: "#f5f7fa",
    SUCCESS_COLOR: "#52c41a",
    WARNING_COLOR: "#faad14",
    ERROR_COLOR: "#ff4d4f",
    INFO_COLOR: "#1890ff",
  },

  // Configuración de idioma
  LOCALE: {
    DEFAULT: "es-MX",
    SUPPORTED: ["es-MX", "en-US"],
    DATE_FORMAT: "DD/MM/YYYY",
    TIME_FORMAT: "HH:mm",
    CURRENCY: "MXN",
  },

  // Configuración de desarrollo
  DEVELOPMENT: {
    DEBUG_MODE: import.meta.env.DEV,
    LOG_LEVEL: import.meta.env.DEV ? "debug" : "error",
    ENABLE_MOCK_DATA: import.meta.env.VITE_ENABLE_MOCK_DATA === "true",
  },
} as const;

// Tipos para la configuración
export type AppConfig = typeof APP_CONFIG;
export type CompanyConfig = typeof APP_CONFIG.COMPANY;
export type ApiConfig = typeof APP_CONFIG.API;
export type AuthConfig = typeof APP_CONFIG.AUTH;

// Función para obtener configuración específica
export const getConfig = <K extends keyof AppConfig>(key: K): AppConfig[K] => {
  return APP_CONFIG[key];
};

// Función para obtener configuración anidada
export const getNestedConfig = <
  K extends keyof AppConfig,
  N extends keyof AppConfig[K]
>(
  section: K,
  key: N
): AppConfig[K][N] => {
  return APP_CONFIG[section][key];
};

// Función para verificar si estamos en modo desarrollo
export const isDevelopment = (): boolean => {
  return APP_CONFIG.DEVELOPMENT.DEBUG_MODE;
};

// Función para verificar si los datos mock están habilitados
export const isMockDataEnabled = (): boolean => {
  return APP_CONFIG.DEVELOPMENT.ENABLE_MOCK_DATA;
};

// Función para obtener la URL base de la API
export const getApiBaseUrl = (): string => {
  return APP_CONFIG.API.BASE_URL;
};

// Función para obtener la URL completa de la API
export const getApiUrl = (endpoint: string): string => {
  const baseUrl = getApiBaseUrl();
  const version = APP_CONFIG.API.VERSION;
  return `${baseUrl}/api/${version}${endpoint}`;
};
