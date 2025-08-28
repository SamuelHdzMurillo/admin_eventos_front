import { config } from "../config/env";
import { authService } from "./auth";

export interface Usuario {
  id: number;
  name: string;
  email: string;
  role: "admin" | "usuario";
  created_at: string;
  updated_at: string;
}

export interface CreateUsuarioRequest {
  name: string;
  email: string;
  password: string;
  role: "admin" | "usuario";
}

export interface UpdateUsuarioRequest {
  name?: string;
  email?: string;
  password?: string;
  role?: "admin" | "usuario";
}

export interface UsuarioStats {
  total_users: number;
  admin_users: number;
  regular_users: number;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface ApiListResponse<T> {
  success: boolean;
  data: T[];
}

class UsuariosService {
  private baseUrl = `${config.API_URL}/admin/users`;

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = authService.getToken();

    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Error ${response.status}: ${response.statusText}`
      );
    }

    return response.json();
  }

  // Listar todos los usuarios
  async listUsuarios(): Promise<ApiListResponse<Usuario>> {
    return this.request<ApiListResponse<Usuario>>("");
  }

  // Obtener un usuario específico
  async getUsuario(id: number): Promise<ApiResponse<Usuario>> {
    return this.request<ApiResponse<Usuario>>(`/${id}`);
  }

  // Crear un nuevo usuario
  async createUsuario(
    data: CreateUsuarioRequest
  ): Promise<ApiResponse<Usuario>> {
    return this.request<ApiResponse<Usuario>>("", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Actualizar un usuario
  async updateUsuario(
    id: number,
    data: UpdateUsuarioRequest
  ): Promise<ApiResponse<Usuario>> {
    return this.request<ApiResponse<Usuario>>(`/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  // Eliminar un usuario
  async deleteUsuario(id: number): Promise<ApiResponse<{ message: string }>> {
    return this.request<ApiResponse<{ message: string }>>(`/${id}`, {
      method: "DELETE",
    });
  }

  // Cambiar rol de un usuario
  async changeRole(
    id: number,
    role: "admin" | "usuario"
  ): Promise<ApiResponse<Usuario>> {
    return this.request<ApiResponse<Usuario>>(`/${id}/role`, {
      method: "PATCH",
      body: JSON.stringify({ role }),
    });
  }

  // Obtener estadísticas de usuarios
  async getStats(): Promise<ApiResponse<UsuarioStats>> {
    return this.request<ApiResponse<UsuarioStats>>("/stats");
  }
}

export const usuariosService = new UsuariosService();
