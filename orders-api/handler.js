const serverless = require("serverless-http");
const express = require("express");
const app = express();

// Products
// Create
app.post("/products", (req, res, next) => {
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

// Orders
// Create 
app.post("/orders", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

// Find by id
app.get("/orders/:id", (req, res, next) => {
  return res.status(200).json({
    message: `Order: ${id}`,
  });
});

// Search
app.get("/orders", (req, res, next) => {
  const { from, to, cursor, limit, status } = req.query;

  return res.status(200).json({
    message: `Order: ${ from }, ${ to }, ${ cursor }, ${ limit }, ${ status }`,
  });
});

// Order confirm
app.post("/orders/:id/confirm", (req, res, next) => {
  return res.status(200).json({
    message: `Order: ${id}`,
  });
});

// Order cancel
app.post("/orders/:id/cancel", (req, res, next) => {
  return res.status(200).json({
    message: `Order: ${id}`,
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

exports.handler = serverless(app);
