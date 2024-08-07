//evento que se ejecuta cuando el documento fue cargado correctamente
document.addEventListener('DOMContentLoaded', function () {


    let btnEliminar = document.getElementById("btnEliminar");

    btnEliminar.onclick = function () {
        if (contadorSeleccionados == 0) {
            alert("No existen peliculas seleccionadas");
        }else{
            let confirmacion = confirm("Está seguro de eliminar estas "+contadorSeleccionados + " películas");
            if(confirmacion){
                //código para eliminar las películas
                //vamos a hacer un fetch  la función
            }
        }
    }



    //imprime la cantidad de peliculas al momento de cargar la página
    obtenerCantidadPeliculas().then(total => {
        let spanCantidadPeliculas = document.getElementById("spanCantidadPeliculas");
        spanCantidadPeliculas.innerText = total;
    });

    //contenedor principal
    var contenedorPeliculas = document.getElementById("contenedorPeliculas");
    console.log(contenedorPeliculas);
    let cabecera = new Headers();
    //El tipo de datos  procesar son json
    cabecera.append("Content-Type", "application/json");
    //estos son los parametros que debemos enviar al endpoint (deben ser exactamente igual)
    /*
    let parametrosPeticion = JSON.stringify({
        "cursoLectivo":2024,
        "codInstitucion":1478
    });
    */
    let confPeticion = {
        method: "POST",//Get, Put, Delete
        headers: cabecera
    }

    var contadorSeleccionados = 0;
    var peliculasEliminar = [];

    fetch("http://localhost:3000/listaPeliculas", confPeticion)
        .then((response) => response.json())
        .then((result) => {



            console.log(result);
            for (let i = 0; i < result.data.length; i++) {

                //creamos un checkbox
                var checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.name = "chkEliminar";
                checkbox.value = result.data[i].film_id;
                checkbox.classList.add("form-check-input");

                checkbox.onclick = function (e) {


                    if (e.target.checked == true) {
                        if (!EnColaEliminar(peliculasEliminar, e.target.value)) {
                            contadorSeleccionados++;
                            let textoEliminar = btnEliminar.innerText;
                            btnEliminar.innerText = "Eliminar " + contadorSeleccionados;
                            peliculasEliminar.push(e.target.value);
                        }
                    } else {

                        contadorSeleccionados--;
                        let textoEliminar = btnEliminar.innerText;
                        btnEliminar.innerText = "Eliminar " + contadorSeleccionados;
                        let nuevoArray = peliculasEliminar.filter(item => item !== e.target.value);
                        peliculasEliminar = nuevoArray;

                    }


                }

                var divPelicula = document.createElement("div");
                divPelicula.classList.add("peliculas");
                divPelicula.appendChild(checkbox);

                var imgPrincipal = document.createElement("img");
                imgPrincipal.src = "../img/film.svg";
                divPelicula.appendChild(imgPrincipal);
                imgPrincipal.classList.add("imgPrincipalLista");

                var tituloPelicula = document.createElement("h6");
                tituloPelicula.innerText = result.data[i].title;
                tituloPelicula.classList.add("cursor-mano");
                divPelicula.appendChild(tituloPelicula);
                //vamos a agregarle un identificador único para poder acceder a su valor
                tituloPelicula.setAttribute("id", "titulo" + i);
                //finalmente le vamos a agregar un evento al objeto creado dinámicamente
                tituloPelicula.onclick = function (e) {
                    var titulo = e.target.innerText;
                    enviarParametro(`http://localhost:5500/views/detallePelicula.html?titulo=${titulo}`);
                }


                var description = document.createElement("p");
                description.innerText = result.data[i].description.substring(0, 80);
                divPelicula.appendChild(description);
                description.style = "overflow: hidden;";

                var hr = document.createElement("hr");
                divPelicula.appendChild(hr);

                var img = document.createElement("img");
                img.src = "../img/price.svg";


                var labelPrecio = document.createElement("label");
                labelPrecio.innerText = " Precio: " + result.data[i].replacement_cost;
                labelPrecio.appendChild(img);
                labelPrecio.style = "text-decoration: underline;"
                divPelicula.appendChild(labelPrecio);


                contenedorPeliculas.appendChild(divPelicula);
            }
        })
        .catch((error) => console.log("Ocurrió un error: " + error));

});

function enviarParametro(url) {
    window.location.href = url;
}

function EnColaEliminar(ColaEliminar, buscar) {
    let estado = false;
    for (let i = 0; i < ColaEliminar.length; i++) {
        if (ColaEliminar[i] == buscar) {
            console.log("buscando");
            console.log("buscando: " + ColaEliminar[i]);
            estado = true;
            break;
        }
    }
    return estado;
}


async function obtenerCantidadPeliculas() {
    let cabecera = new Headers();
    // El tipo de datos a procesar es JSON
    cabecera.append("Content-Type", "application/json");

    let confPeticion = {
        method: "POST", // GET, PUT, DELETE
        headers: cabecera
    }

    try {
        let response = await fetch("http://localhost:3000/listaPeliculas", confPeticion);
        let result = await response.json();
        return result.data.length;
    } catch (error) {
        console.log("Ocurrió un error: " + error);
        return 0; // En caso de error, retornar 0 o algún valor predeterminado
    }
}

