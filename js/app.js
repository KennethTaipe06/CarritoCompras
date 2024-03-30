//variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let carrin = [];

function confirmacioEliminacion(id) {
    let ventanaModal = document.createElement("DIV");

    ventanaModal.innerHTML = `
    <li>
        <div>
        <h4>
        Esta seguro de que quiere eliminar el curso?
        </h4>
        <tr>
        <td>
        <td>
        <a href='#' class='borrar-curso' data-id='${id}'>Eliminar</a>
        <a href='#' class='borrar-curso' data-id='${id}'>Cancelar</a>
        </td>
        </td>
        <td>
        </td>
        </tr>
        </div>
    </li>`;

    carrito.appendChild(ventanaModal);
}

cargarEventListener();

function cargarEventListener() {
    //cuando agregas un curso
    listaCursos.addEventListener("click", agregarCurso);
    carrito.addEventListener("click", eliminarCurso);

    vaciarCarritoBtn.addEventListener("click", () => {
        carrin = [];
        limpiarHtml();
    });

    document.addEventListener('DOMContentLoaded', () => {
        carrin = JSON.parse(localStorage.getItem('carrin')) || []
        carritoHTML();
    })
}

function eliminarCurso(e) {
    console.log(e.target.classList);
    if (e.target.classList.contains("borrar-curso")) {
        const cursoId = e.target.getAttribute("data-id");

        carrin = carrin.filter((curso) => curso.id !== cursoId);

        console.log(carrin);
        carritoHTML();
    }
}

/* funciones */

function agregarCurso(event) {
    if (event.target.classList.contains("agregar-carrito")) {
        const cursoSeleccionado = event.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

//lee el contenido del html y extrae

function leerDatosCurso(curso) {
    const infoCurso = {
        img: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        autor: curso.querySelector("p").textContent,
        precioDescuento: curso.querySelector("span").innerText,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1,
    };

    const existe = carrin.some((curso) => curso.id === infoCurso.id);

    if (existe) {
        const cursos = carrin.map((curso) => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        });

        carrin = [...cursos];
    } else {
        carrin = [...carrin, infoCurso];
        console.log(carrin);
    }
    carritoHTML();
}

function carritoHTML() {
    limpiarHtml();

    carrin.forEach((curso) => {
        const { img, precioDescuento, titulo, cantidad, id } = curso;
        const row = document.createElement("tr");
        row.innerHTML = `
              <td>
                  <img src='${img}' width = '200px'>
              </td>

              <td>
                  ${precioDescuento}
              </td>

              <td>
              ${titulo}
              </td>

              <td>
              ${cantidad}
              </td>

              <td>
              <a href='#' class='borrar-curso' data-id='${id}'>x</a>
              </td>`;

        //agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
    sincronizarStorage();
}

function limpiarHtml() {
    /* contenedorCarrito.innerHTML = ''; */
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

function sincronizarStorage() {
    localStorage.setItem('carrin', JSON.stringify(carrin))
}