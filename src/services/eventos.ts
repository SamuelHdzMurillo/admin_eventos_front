import { config } from "../config/env";
import { authService } from "./auth";

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
};
