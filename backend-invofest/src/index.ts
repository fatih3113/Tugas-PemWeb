import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import eventRoutes from "./Routes/eventRoute.js";
import categoryRoutes from "./Routes/categoryRoute.js";
import pembicaraRoutes from "./Routes/pembicaraRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Konfigurasi CORS menggunakan wildcard (*) agar aman diakses dari domain vercel manapun saat testing
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Selamat datang di API Invofest!");
});

// Menambahkan prefix /api agar serasi dengan pemanggilan di frontend
app.use("/api/events", eventRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/pembicara", pembicaraRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di port ${PORT}`);
});