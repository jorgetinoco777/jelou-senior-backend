const axios = require("axios");

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

  instance.interceptors.response.use(
    (response) => response,
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