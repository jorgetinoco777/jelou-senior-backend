import express from "express";
import cors from "cors";

// Services
import routes from "./routes/index.js";

const app = express();

const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/", routes);

// Default
app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

app.listen(PORT, () => console.log(`Listen to: ${PORT}`));
