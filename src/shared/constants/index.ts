// Constantes del sistema

// Roles de usuario
export const USER_ROLES = {
  ADMIN: "admin",
  DIRECTOR: "director",
  PARTICIPANT: "participant",
  VIEWER: "viewer",
} as const;

// Estados de eventos
export const EVENT_STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
  ACTIVE: "active",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;

// Estados de equipos
export const TEAM_STATUS = {
  FORMING: "forming",
  ACTIVE: "active",
  COMPLETED: "completed",
  DISQUALIFIED: "disqualified",
} as const;

// Tipos de eventos
export const EVENT_TYPES = {
  COMPETITION: "competition",
  WORKSHOP: "workshop",
  CONFERENCE: "conference",
  EXHIBITION: "exhibition",
} as const;

// Configuración de paginación
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;

// Configuración de API
export const API_CONFIG = {
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
} as const;
