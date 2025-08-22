import { config } from "../config/env";
import { authService } from "./auth";

export interface Participante {
  id: number;
  equipo_id: number;
  nombre_participante: string;
  rol_participante: string;
  talla_participante: string;
  telefono_participante: string;
  matricula_participante: string;
  correo_participante: string;
  plantel_participante: string;
  plantelcct: string;
  medicamentos: string;
  foto_credencial: string;
  semestre_participante: string;
  especialidad_participante: string;
  seguro_facultativo: boolean;
  tipo_sangre_participante: string;
  alergico: boolean;
  alergias: string | null;
  created_at: string;
  updated_at: string;
}

export interface Acompanante {
  id: number;
  equipo_id: number;
  nombre_acompanante: string;
  rol: string;
  puesto: string;
  talla: string;
  telefono: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface Receta {
  id: number;
  equipo_id: number;
  tipo_receta: string;
  descripcion: string;
  ingredientes: string;
  preparacion: string;
  observaciones: string;
  creado_por: string;
  fecha_creacion: string;
  created_at: string;
  updated_at: string;
}

export interface CedulaRegistro {
  id: number;
  equipo_id: number;
  participantes: string[];
  asesores: string[];
  estado: string;
  created_at: string;
  updated_at: string;
}

export interface Equipo {
  id: number;
  nombre_equipo: string;
  evento_id: number;
  entidad_federativa: string;
  estatus_del_equipo: string;
  nombre_anfitrion: string;
  telefono_anfitrion: string;
  correo_anfitrion: string;
  created_at: string;
  updated_at: string;
  evento?: Evento;
  participantes?: Participante[];
  acompanantes?: Acompanante[];
  recetas?: Receta[];
  cedulas_registro?: CedulaRegistro[];
}

export interface Evento {
  id: number;
  nombre_evento: string;
  inicio_evento: string;
  fin_evento: string;
  sede_evento: string;
  lim_de_participantes_evento: number;
  estatus_evento: string;
  created_at: string;
  updated_at: string;
  equipos: Equipo[];
}

interface ApiListResponse<T> {
  success: boolean;
  data: T[];
}

interface ApiItemResponse<T> {
  success: boolean;
  data: T;
}

export const eventosService = {
  async listEvents(): Promise<ApiListResponse<Evento>> {
    const response = await fetch(`${config.API_URL}/eventos`, {
      headers: {
        "Content-Type": "application/json",
        ...authService.getAuthHeader(),
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.message || "No se pudo cargar la lista de eventos");
    }
    return data as ApiListResponse<Evento>;
  },

  async getEventDetail(eventId: number): Promise<ApiItemResponse<Evento>> {
    const response = await fetch(`${config.API_URL}/eventos/${eventId}`, {
      headers: {
        "Content-Type": "application/json",
        ...authService.getAuthHeader(),
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        data?.message || "No se pudo cargar el detalle del evento"
      );
    }
    return data as ApiItemResponse<Evento>;
  },

  async updateEvent(
    eventId: number,
    eventData: Partial<Evento>
  ): Promise<ApiItemResponse<Evento>> {
    const response = await fetch(`${config.API_URL}/eventos/${eventId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...authService.getAuthHeader(),
      },
      body: JSON.stringify(eventData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.message || "No se pudo actualizar el evento");
    }
    return data as ApiItemResponse<Evento>;
  },

  // Métodos para equipos
  async listEquipos(): Promise<ApiListResponse<Equipo>> {
    const response = await fetch(`${config.API_URL}/equipos`, {
      headers: {
        "Content-Type": "application/json",
        ...authService.getAuthHeader(),
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.message || "No se pudo cargar la lista de equipos");
    }
    return data as ApiListResponse<Equipo>;
  },

  async getEquipoDetail(equipoId: number): Promise<ApiItemResponse<Equipo>> {
    const response = await fetch(`${config.API_URL}/equipos/${equipoId}`, {
      headers: {
        "Content-Type": "application/json",
        ...authService.getAuthHeader(),
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        data?.message || "No se pudo cargar el detalle del equipo"
      );
    }
    return data as ApiItemResponse<Equipo>;
  },

  async updateEquipo(
    equipoId: number,
    equipoData: Partial<Equipo>
  ): Promise<ApiItemResponse<Equipo>> {
    const response = await fetch(`${config.API_URL}/equipos/${equipoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...authService.getAuthHeader(),
      },
      body: JSON.stringify(equipoData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.message || "No se pudo actualizar el equipo");
    }
    return data as ApiItemResponse<Equipo>;
  },
};
