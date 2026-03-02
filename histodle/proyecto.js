const diccionario = {
  REINO: "Un estado o territorio gobernado por un monarca.",
  REINA: "Figura monárquica que ha gobernado reinos como Isabel de Castilla.",
  MAYAS:
    "Civilización mesoamericana destacada por su astronomía y arquitectura.",
  CLARA:
    "Clara Campoamor luchó por el voto femenino en la España del siglo XX.",
  TROYA:
    "Ciudad legendaria de la Ilíada, escenario de la guerra entre griegos y troyanos.",
  FEUDO: "Territorio gobernado por un señor feudal en la Edad Media.",
  JUANA: "Juana I, reina de Castilla e hija de los Reyes Católicos.",
  LENIN: "Líder de la Revolución Rusa de 1917 y fundador del estado soviético.",
  VOTOS: "Elemento clave en la historia de las democracias modernas.",
  FUERO:
    "Conjunto de leyes locales en la España medieval sobre todo en Navarra, otorgadas por el rey.",
  SIGLO: "Periodo de 100 años en la historia de la humanidad",
  DAVID:
    "Profesor legendario de JavaScript recordado por los siglos de los siglos por sus Albañiles",
};

// Lista de palabras posibles
const palabras = Object.keys(diccionario);

// Elegir una palabra aleatoria
let palabra = palabras[Math.floor(Math.random() * palabras.length)];
let intentos = 0;
const maxIntentos = 6;
const historial = document.getElementById("historial");
const tablero = document.getElementById("tablero");
let partidasGanadas = parseInt(localStorage.getItem("partidasGanadas")) || 0;

//Tablero
for (let i = 0; i < maxIntentos * 5; i++) {
  const celda = document.createElement("div");
  celda.classList.add("celda");
  tablero.appendChild(celda);
}

// Función principal
function comprobar() {
  if (intentos >= maxIntentos) return;

  const entrada = document.getElementById("entrada");
  const intento = entrada.value.toUpperCase();
 // Comprobacion de que la palabra es de 5 letras
  if (intento.length !== 5) {
    alert("Por favor, escribe una palabra de 5 letras.");
    return;
  }
  if (intentos >= maxIntentos) return;

  const celdas = tablero.querySelectorAll(".celda");
  const filaInicio = intentos * 5;

  let resultado = "";

  for (let i = 0; i < 5; i++) {
    const celda = celdas[filaInicio + i];
    celda.textContent = intento[i];
   // Añadir colores 
    if (intento[i] === palabra[i]) {
      celda.classList.add("correcta");
    } else if (palabra.includes(intento[i])) {
      celda.classList.add("casi");
    } else {
      celda.classList.add("incorrecta");
    }
  }
 // Si coincides con la palabra has acertado
  if (intento === palabra) {
    historial.innerHTML += `<b>🎉 ¡Correcto! La palabra era ${palabra}</b><br>`;
    historial.innerHTML += `<i>📖 ${diccionario[palabra]}</i><br>`;
    entrada.disabled = true;
    partidasGanadas++;
    localStorage.setItem("partidasGanadas", partidasGanadas);
    mostrarVictorias();
    return;
  }

  intentos++;

  if (intentos === maxIntentos) {
    historial.innerHTML += `<b>😢 Has perdido. La palabra era ${palabra}</b><br>`;
    historial.innerHTML += `<i>📖 ${diccionario[palabra]}</i><br>`;
    entrada.disabled = true;
  }

  entrada.value = "";
}

function mostrarVictorias() {
  const victoriasDiv = document.getElementById("victorias");
  victoriasDiv.innerHTML = `🏆 Partidas ganadas: ${partidasGanadas}`;
}

const boton = document.getElementById("boton");
boton.addEventListener("click", comprobar);
// FUNCIÓN NUEVA PARA MEJORAR EL REINICIO 
function reiniciarJuego() {
  palabra = palabras[Math.floor(Math.random() * palabras.length)]; //COPIA DE ARRIBA 
  intentos = 0; //COPIA DE ARRIBA 
  historial.innerHTML = "<h3>Explicación histórica:</h3>";
  mensaje.textContent = "";
  document.getElementById("entrada").disabled = false;
  document.querySelectorAll(".celda").forEach((celda) => {
    celda.textContent = "";
    celda.className = "celda";
  });
}
//Boton reiniciar 
document.getElementById("reiniciar").addEventListener("click", reiniciarJuego);

mostrarVictorias();
