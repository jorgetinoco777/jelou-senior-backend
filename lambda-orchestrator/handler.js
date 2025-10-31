const serverless = require("serverless-http");
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json()); // Parses JSON data
app.use(bodyParser.urlencoded({ extended: true })); // Parses URL-encoded data

//const createHttpClient = require("./client-axios.js");
//const OrchestratorSchema = require("./validators.js");

// --- Configuración global ---
const CUSTOMERS_API = process.env.CUSTOMERS_API || "http://localhost:3001";
const ORDERS_API = process.env.CUSTOMERS_API || "http://localhost:3002";

const TIMEOUT = "10000";

app.use(express.json());

app.post("/orchestrator/create-and-confirm-order", async (req, res, next) => {
  const { customerId } = req.body;

  try {
    console.log("----- 1. Valid customer -----");

    // 1.1. Authentication: Get jwt token
    const { data: userAuthentication } = await axios.post(
      `${CUSTOMERS_API}/auth/login`,
      {
        email: "jelou@test.com",
        password: "jelou1234",
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    console.log("JWT: ", userAuthentication.jwt);

    // 1.2. Validate customer
    const { data: customer } = await axios.get(
      `${CUSTOMERS_API}/internal/customers/${customerId}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${userAuthentication.jwt}`,
        },
      }
    );
    console.log("Customer: ", customer);

    console.log("----- 2. Create order -----");
    const { data: currentOrder } = await axios.post(
      `${ORDERS_API}/orders`,
      {
        customer_id: 2,
        items: [
          {
            product_id: 1,
            qty: 10,
          },
        ],
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Order: ", currentOrder);

    return res.status(200).json({
      success: true,
      data: {
        customer,
        order: { ...currentOrder },
      },
    });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

exports.handler = serverless(app);
