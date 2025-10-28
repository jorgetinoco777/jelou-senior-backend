const serverless = require("serverless-http");
const express = require("express");
const app = express();

// Create
app.post("/customers", (req, res, next) => {
  return res.status(200).json({
    message: "Cliend created!",
  });
});

// Update
app.put("/customers/:id", (req, res, next) => {
  const id = req.params.id;
  
  return res.status(200).json({
    message: `Customer id: ${ id }`,
  });
});

// Delete
app.delete("/customers/:id", (req, res, next) => {
  const id = req.params.id;

  return res.status(200).json({
    message: `Customer id: ${ id }`,
  });
});

// Find by id
app.get("/customers/:id", (req, res, next) => {
  const id = req.params.id;

  return res.status(200).json({
    message: `Customer id: ${ id }`,
  });
});

// Search
app.get("/customers", (req, res, next) => {
  const { search, cursor, limit } = req.query;

  return res.status(200).json({
    message: `Customer search: ${ id }`,
  });
});

// 
app.get("/internal/customers/:id", (req, res, next) => {
  const id = req.params.id;

  return res.status(200).json({
    message: `Customer search: ${ id }`,
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

exports.handler = serverless(app);
