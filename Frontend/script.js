const API = "/api/cine";

async function cargarPeliculas() {
  try {
    const res = await fetch(`${API}/peliculas`);
    const peliculas = await res.json();
    const select = document.getElementById("pelicula");

    peliculas.forEach((p) => {
      const opt = document.createElement("option");
      opt.value = p.id;
      opt.textContent = `${p.titulo} (${p.genero}) - ₡${p.precio.toLocaleString()}`;
      select.appendChild(opt);
    });
  } catch (err) {
    alert("Error al cargar las películas. Asegúrate de que el servidor esté corriendo.");
  }
}

function formatearPrecio(colones) {
  return `₡${colones.toLocaleString()}`;
}

function formatearDuracion(minutos) {
  const h = Math.floor(minutos / 60);
  const m = minutos % 60;
  return h > 0 ? `${h}h ${m}m` : `${m} min`;
}

document.getElementById("btnCalcular").addEventListener("click", async () => {
  const peliculaId = document.getElementById("pelicula").value;
  const tipo = document.getElementById("tipo").value;
  const cantidad = document.getElementById("cantidad").value;

  if (!peliculaId) {
    alert("Selecciona una película.");
    return;
  }

  try {
    const res = await fetch(`${API}/calcular`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ peliculaId: Number(peliculaId), tipo, cantidad: Number(cantidad) }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    document.getElementById("rPelicula").textContent = data.pelicula;
    document.getElementById("rGenero").textContent = data.genero;
    document.getElementById("rDuracion").textContent = formatearDuracion(data.duracion);
    document.getElementById("rTipo").textContent = data.tipo;
    document.getElementById("rCantidad").textContent = data.cantidad;
    document.getElementById("rPrecioUnitario").textContent = formatearPrecio(data.precioUnitario);
    document.getElementById("rTotal").textContent = formatearPrecio(data.total);

    document.getElementById("resultado").classList.remove("hidden");
    document.getElementById("resultado").scrollIntoView({ behavior: "smooth" });
  } catch (err) {
    alert("Error de conexión con el servidor.");
  }
});

cargarPeliculas();
