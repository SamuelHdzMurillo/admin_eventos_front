import { config } from "../config/env";

function extractTokenFromResponse(
  data: any,
  response: Response
): string | null {
  const headerAuth =
    response.headers.get("Authorization") ||
    response.headers.get("authorization");
  const candidates = [
    data?.token,
    data?.access_token,
    data?.authorization,
    data?.bearer,
    data?.jwt,
    data?.data?.token,
    data?.data?.access_token,
    headerAuth,
  ].filter(Boolean);
  const first = candidates[0] as unknown;
  return typeof first === "string" ? (first as string) : null;
}

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
        // Guardar token en localStorage con prefijo Bearer
        const rawToken = extractTokenFromResponse(data, response);
        if (rawToken) {
          const bearerToken = rawToken.startsWith("Bearer ")
            ? rawToken
            : `Bearer ${rawToken}`;
          localStorage.setItem("auth_token", bearerToken);
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

  getAuthHeader() {
    const token = authService.getToken();
    return token ? { Authorization: token } : {};
  },

  isAuthenticated() {
    return !!this.getToken();
  },
};
