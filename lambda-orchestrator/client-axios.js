import axios from "axios";

/**
 * Crea una instancia de cliente HTTP basada en Axios.
 *
 * @param {string} baseURL - URL base del servicio externo.
 * @param {number} [timeout=10000] - Tiempo máximo de espera (ms).
 * @param {object} [extraHeaders={}] - Cabeceras adicionales por defecto.
 * @returns {import('axios').AxiosInstance} Cliente HTTP configurado.
 */
export function createHttpClient(baseURL, timeout = 10000, extraHeaders = {}) {
  if (!baseURL) {
    throw new Error("createHttpClient: baseURL es obligatorio.");
  }

  const instance = axios.create({
    baseURL,
    timeout,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...extraHeaders,
    },
  });

  // 📡 Interceptor de respuesta
  instance.interceptors.response.use(
    (response) => response, // éxito
    (error) => {
      const normalizedError = new Error(
        error.response?.data?.message || error.message || "Upstream error"
      );
      normalizedError.status = error.response?.status || 500;
      normalizedError.data = error.response?.data || null;
      normalizedError.isAxiosError = true;
      return Promise.reject(normalizedError);
    }
  );

  instance.setHeaders = (headers) => {
    if (typeof headers !== "object") {
      throw new Error("setHeaders: headers must be an object");
    }
    Object.assign(instance.defaults.headers.common, headers);
  };

  return instance;
}