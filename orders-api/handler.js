const serverless = require("serverless-http");
const express = require("express");
const app = express();

const orderServices = require("./services/order-services.js");

// Create
app.post("/products", (req, res, next) => {
  const message = orderServices.create();

  return res.status(200).json({
    message,
  });
});

// Update
app.patch("/products/:id", (req, res, next) => {
  return res.status(200).json({
    message: `Product: ${id}`,
  });
});

// Find
app.get("/products/:id", (req, res, next) => {
  return res.status(200).json({
    message: `Product: ${id}`,
  });
});

// Search
app.get("/products", (req, res, next) => {
  const { search, cursor, limit } = req.query;

  return res.status(200).json({
    message: `Customer search: ${search}, ${cursor}, ${limit}`,
  });
});

app.get("/hello", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

exports.handler = serverless(app);
