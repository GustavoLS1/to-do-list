const fecha = document.querySelector("#fecha");
const lista = document.querySelector("#lista");
const input = document.querySelector("#input");
const botonEnter = document.querySelector("#enter");
const check = "fa-check-circle";
const uncheck = "fa-circle";
const lineThrough = "line-through";
let id;
let list;

//creacion de fecha

const FECHA = new Date();
fecha.innerHTML = FECHA.toLocaleDateString("es-MX", {
  weekday: "long",
  month: "short",
  day: "numeric",
});

//Funcion agregar tarea
function agregarTarea(tarea, id, realizado, eliminado) {
  if (eliminado) {
    return;
  }

  const REALIZADO = realizado ? check : uncheck;
  const LINE = realizado ? lineThrough : "";

  const elemento = `
                    <li id="elemento">
                    <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                    <p class="text ${LINE}">${tarea}</p>
                    <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
                    </li>
                    `;
  lista.insertAdjacentHTML("beforeend", elemento);
}

//funcion de tarea realizada

function tareaRealizada(element) {
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  element.parentNode.querySelector(".text").classList.toggle(lineThrough);
  list[element.id].realizado = list[element.id].realizado ? false : true;
}

//funcion eliminar tarea realizada
function tareaEliminada(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  list[element.id].eliminado = true;
}

botonEnter.addEventListener("click", () => {
  const tarea = input.value;
  if (tarea) {
    agregarTarea(tarea, id, false, false);
    list.push({
      nombre: tarea,
      id: id,
      realizado: false,
      eliminado: false,
    });
  }
  localStorage.setItem("TO-DO", JSON.stringify(list));
  input.value = "";
  id++;
  console.log(list);
});

document.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    const tarea = input.value;
    if (tarea) {
      agregarTarea(tarea, id, false, false);
      list.push({
        nombre: tarea,
        id: id,
        realizado: false,
        eliminado: false,
      });
    }
    localStorage.setItem("TO-DO", JSON.stringify(list));
    input.value = "";
    id++;
    console.log(list);
  }
});

lista.addEventListener("click", function (event) {
  const element = event.target;
  const elementData = element.attributes.data.value;
  if (elementData === "realizado") {
    tareaRealizada(element);
  } else if (elementData === "eliminado") {
    tareaEliminada(element);
  }
  localStorage.setItem("TO-DO", JSON.stringify(list));
});

//local storage getItem
let data = localStorage.getItem("TO-DO");
if (data) {
  list = JSON.parse(data);
  id = list.length;
  cargarLista(list);
} else {
  list = [];
  id = 0;
}

function cargarLista(DATA) {
  DATA.forEach(function (i) {
    agregarTarea(i.nombre, i.id, i.realizado, i.eliminado);
  });
}
