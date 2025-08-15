import { config } from "../config/env";

interface LoginResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: any;
}

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await fetch(`${config.API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar token en localStorage
        if (data.token) {
          localStorage.setItem("auth_token", data.token);
        }
        return { success: true, ...data };
      } else {
        // Manejar diferentes tipos de errores
        let errorMessage = "Error en el login";

        if (response.status === 401) {
          errorMessage = "Contraseña incorrecta";
        } else if (response.status === 404) {
          errorMessage = "Usuario no encontrado";
        } else if (response.status === 400) {
          errorMessage = data.message || "Datos de entrada inválidos";
        } else if (data.message) {
          errorMessage = data.message;
        }

        return { success: false, message: errorMessage };
      }
    } catch (error) {
      console.error("Error en login:", error);
      return {
        success: false,
        message: "Error en el inicio de sesión",
      };
    }
  },

  logout() {
    localStorage.removeItem("auth_token");
  },

  getToken() {
    return localStorage.getItem("auth_token");
  },

  isAuthenticated() {
    return !!this.getToken();
  },
};
