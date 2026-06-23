const peliculas = [
  { id: 1, titulo: "Deadpool & Wolverine", genero: "Accion", duracion: 128, precio: 3500 },
  { id: 2, titulo: "Intensamente 2", genero: "Animacion", duracion: 96, precio: 3000 },
  { id: 3, titulo: "Oppenheimer", genero: "Drama", duracion: 180, precio: 4000 },
  { id: 4, titulo: "Barbie", genero: "Comedia", duracion: 114, precio: 3500 },
  { id: 5, titulo: "Dune: Parte Dos", genero: "Ciencia Ficcion", duracion: 166, precio: 4500 },
  { id: 6, titulo: "Spider-Man: Across the Spider-Verse", genero: "Animacion", duracion: 140, precio: 3800 },
];

const descuentos = {
  adulto: 1.0,
  nino: 0.5,
  tercera_edad: 0.7,
};

export function listarPeliculas(req, res) {
  res.json(peliculas);
}

export function calcularEntrada(req, res) {
  const { peliculaId, tipo, cantidad } = req.body;

  if (!peliculaId) {
    return res.status(400).json({ error: "El ID de la película es requerido" });
  }
  if (!tipo || !descuentos[tipo]) {
    return res.status(400).json({ error: "El tipo debe ser: adulto, nino o tercera_edad" });
  }
  if (!cantidad || isNaN(cantidad) || cantidad < 1) {
    return res.status(400).json({ error: "La cantidad debe ser un número mayor a 0" });
  }

  const pelicula = peliculas.find((p) => p.id === Number(peliculaId));
  if (!pelicula) {
    return res.status(404).json({ error: "Película no encontrada" });
  }

  const precioUnitario = Math.round(pelicula.precio * descuentos[tipo]);
  const total = precioUnitario * cantidad;

  const tipoLabel = { adulto: "Adulto", nino: "Niño", tercera_edad: "Tercera Edad" };

  res.json({
    pelicula: pelicula.titulo,
    genero: pelicula.genero,
    duracion: pelicula.duracion,
    tipo: tipoLabel[tipo],
    cantidad,
    precioUnitario,
    total,
  });
}
