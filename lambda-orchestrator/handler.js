import { createHttpClient } from "./client-axios.js";
import { OrchestratorSchema } from "./validators.js";

// --- Configuración global ---
const {
  CUSTOMERS_API,
  ORDERS_API,
  JWT_TOKEN,
  DEFAULT_TIMEOUT_MS = "10000",
} = process.env;

if (!CUSTOMERS_API || !ORDERS_API || !JWT_TOKEN) {
  console.error("Error: review the environment variables");
  // No se lanza error para permitir despliegue en ambientes donde se inyectan dinámicamente.
}

// --- HTTP Clients configurados ---
const customersClient = createHttpClient(
  CUSTOMERS_API,
  parseInt(DEFAULT_TIMEOUT_MS, 10),
  {
    Authorization: `Bearer ${JWT_TOKEN}`,
  }
);

const ordersClient = createHttpClient(
  ORDERS_API,
  parseInt(DEFAULT_TIMEOUT_MS, 10)
);

// --- Main function ---
export async function createAndConfirm(event) {
  const correlationId = `${Date.now()}`;

  try {
    const body = parseBody(event);

    // 1️. Validar payload con Zod
    const parsed = OrchestratorSchema.parse(body);
    const correlationIdFinal = parsed.correlation_id || correlationId;

    // 2️. Validar existencia del cliente (API interna)
    const customer = await fetchCustomer(
      parsed.customer_id,
      correlationIdFinal
    );

    // 3️. Crear orden en el servicio de Orders
    const orderCreated = await createOrder(parsed, correlationIdFinal);

    // 4️. Confirmar orden (idempotente)
    const orderConfirmed = await confirmOrder(
      orderCreated.order_id,
      parsed.idempotency_key,
      correlationIdFinal,
      { order: orderCreated, customer }
    );

    // 5️. Consolidar respuesta
    return jsonResponse(201, {
      success: true,
      correlationId: correlationIdFinal,
      data: { customer, order: orderConfirmed },
    });
  } catch (err) {
    console.error("[ORCHESTRATOR ERROR]", err);
    return jsonResponse(err.statusCode || 500, {
      success: false,
      error: err.message || "Error interno del servidor",
    });
  }
}

// --- Funciones auxiliares organizadas ---
async function fetchCustomer(customerId, correlationId) {
  try {
    const response = await customersClient.get(
      `/internal/customers/${customerId}`
    );
    return response.data;
  } catch (err) {
    throw makeError(
      404,
      `No se encontró el cliente: ${err.status || err.message}`,
      correlationId,
      err.data
    );
  }
}

async function createOrder(parsed, correlationId) {
  try {
    const response = await ordersClient.post("/orders", {
      customer_id: parsed.customer_id,
      items: parsed.items,
    });
    return response.data;
  } catch (err) {
    throw makeError(
      400,
      `Error creando orden: ${err.status || err.message}`,
      correlationId,
      err.data
    );
  }
}

async function confirmOrder(orderId, idempotencyKey, correlationId, context) {
  try {
    const response = await ordersClient.post(
      `/orders/${orderId}/confirm`,
      null,
      {
        headers: { "x-idempotency-key": idempotencyKey },
      }
    );
    return response.data;
  } catch (err) {
    throw makeError(
      500,
      `Error confirming order: ${err.status || err.message}`,
      correlationId,
      err.data,
      context
    );
  }
}

// --- Utilidades comunes ---
function parseBody(event) {
  if (!event) throw new Error("Empty or undefined event");
  if (typeof event.body === "string") return JSON.parse(event.body);
  return event.body || {};
}

function makeError(
  statusCode,
  message,
  correlationId,
  upstream = null,
  extras = {}
) {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.correlationId = correlationId;
  error.upstream = upstream;
  Object.assign(error, extras);
  return error;
}

function jsonResponse(statusCode, payload) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload, null, 2),
  };
}
