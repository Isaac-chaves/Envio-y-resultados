import { Router } from "express";
import { listarPeliculas, calcularEntrada } from "../controller/cine.controller.js";

const router = Router();

router.get("/peliculas", listarPeliculas);
router.post("/calcular", calcularEntrada);

export default router;
