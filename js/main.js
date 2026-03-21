// Array principal 
const gastos = JSON.parse(localStorage.getItem("gastos")) || [];

// Elementos del DOM
const form = document.getElementById("formGasto");
const lista = document.getElementById("listaGastos");
const totalSpan = document.getElementById("total");

// Función para agregar gasto 
function agregarGasto(nombre, monto) {
    gastos.push({
        nombre: nombre,
        monto: monto
    });

    localStorage.setItem("gastos", JSON.stringify(gastos));
}

// Función de procesamiento 
function calcularTotal() {
    let total = 0;

    for (let i = 0; i < gastos.length; i++) {
        total += gastos[i].monto;
    }

    return total;
}

// Función de salida
function renderizar() {
    lista.innerHTML = "";
    gastos.forEach((gasto, index) => {
    const li = document.createElement ("li");
  
    li.innerHTML = `
        ${gasto.nombre} - $${gasto.monto}
        <button>ELIMINAR</button>
      `;

    const boton = li.querySelector("button").addEventListener("click", () => {
        console.log("Eliminar índice", index);
        gastos.splice(index, 1);
        localStorage.setItem("gastos", JSON.stringify(gastos));
        renderizar();
    });

    lista.appendChild(li);
}),
    totalSpan.textContent = calcularTotal();
}

// Evento 
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const monto = Number(document.getElementById("monto").value);

    if (nombre !== "" && monto > 0) {
        agregarGasto(nombre, monto);
        renderizar();
        form.reset();
    }
});

// Render inicial 
renderizar();