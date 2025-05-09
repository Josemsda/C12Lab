
// Seleccionar los elemento x id del DOM: ingresar-tarea, boton-agregar y lista-tareas
const ingresarTarea = document.getElementById("ingresar-tarea");
const botonAgregar = document.getElementById("boton-agregar");
const listaTarea = document.getElementById("lista-tareas");

// Obtener tareas del localStorage
function obtenerTareasLocalStorage() {
    return JSON.parse(localStorage.getItem("tareas"));
}

// Guardar tareas en localStorage
function guardarTareasLocalStorage(tareas) {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

// Renderizar la lista de tareas en el DOM
function mostrarTareas() { 
    listaTarea.innerHTML = "";
    const tareas = obtenerTareasLocalStorage();
    let estilo = ""

    tareas.forEach((tarea, index) => {
        if (tarea.completada == true) {
            estilo = "completada"
        }
        
        console.log(tarea.completada)
     let html = `<div class="tarea">
     <p class="texto-tarea ${estilo}">${tarea.texto}</p>
     ${index}
     <div class="botones-tarea">
       <button onclick = "completarTarea(${index})" class="btn_ok">✔️</button>
       <button onclick = "eliminarTarea(${index})" class="btn_eliminar">❌</button>
     </div>
   </div>`
   listaTarea.innerHTML += html 
    });
}


// Marcar la Tarea como completada
function completarTarea(index) {
    const tareas = obtenerTareasLocalStorage();
    tareas[index].completada = !tareas[index].completada;
    guardarTareasLocalStorage(tareas);
    mostrarTareas();
}

// Eliminar la Tarea correspondiente
function eliminarTarea(index) {
    const tareas = obtenerTareasLocalStorage();
    tareas.splice(index,1);
    guardarTareasLocalStorage(tareas);
    mostrarTareas();
}

// Crear una nueva Tarea
function nuevaTarea() {
    const texto = ingresarTarea.value.trim();
    if (texto === "") return;

    const tareas = obtenerTareasLocalStorage();
    tareas.push({texto: texto, completada: false});
    guardarTareasLocalStorage(tareas);
    ingresarTarea.value = "";
    mostrarTareas();
}

// Escuchar el boton Agregar y en el evento click llamar a nuevaTarea
botonAgregar.addEventListener("click", nuevaTarea);
// Escuchar el inputTarea y en el evento keypress con la tecla Enter
ingresarTarea.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        nuevaTarea();
    }
}); 
// llamar a nuevaTarea
nuevaTarea()
// Cargar tareas al iniciar con mostrarTareas
mostrarTareas()

