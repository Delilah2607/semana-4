//Importación de los paquetes
const express = require("express"); //para el manejo de las rutas
const http = require("http"); //procesamiento de peticiones http (web)
const mysql = require("mysql"); //módulo para gestionar la base de datos (consultas, etc)
const cors = require('cors');  //******************************************************* */

const {listarTodasPeliculas,consultaPeliculaAnnio,verDetallePelicula,registrarPelicula} = require("../modulos/peliculas/peliculas.js");


//Creación de una instancia de express
const app = express();

//vamos a indicarle al API que estará escuchando en el puerto 3000
const PORT = process.env.PORT || 3000;

//middleware para tener el acceso a las respuestas y peticiones del consumo
app.use(express.json());
app.use(cors({   //*************************************************************************** */
    origin: '*'
}));
app.use(express.urlencoded({extended:true}));


//empezamos a crear las rutas
app.get("/estado_api",(req, res) => {
    res.json(
        {
            estado: true,
            mensaje: "El servidor está online"
        }
    )
});

app.post("/listaPeliculas", (req, res) => {
    listarTodasPeliculas(req, res);
});

/**
 * @api {POST} /filtrarPeliculasAnnio Filtra películas por año
 * @apiName filtrarPeliculasAnnio
 * @apiGroup Peliculas
 * @apiDescription Filtra el listado de películas para mostrar por año
 * @apiParam {Number} annio_p Parámetro para buscar películas
 * 
 * @apiHeader {Number} PORT número de puerto en el que escucha el endpoint
 * 
 * @apiSuccess {Boolean} estado indica el estado de la operación
 * @apiSuccess {Object} data json con toda las películas filtradas
 * 
 * @apiError {Boolean} estado indica el estado de la operación
 * @apiError {String} mensaje texto que contiene el error
 * 
 * @apiParamExample
 *      {
 *          "annio_p" : 2004
 *      }
 * 
 * @apiSuccessExample {json}
 * {
    "estado": true,
    "data": [
        {
            "film_id": 1,
            "title": "ACADEMY DINOSAUR",
            "description": "A Epic Drama of a Feminist And a Mad Scientist who must Battle a Teacher in The Canadian Rockies",
            "release_year": 2006,
            "language_id": 1,
            "original_language_id": null,
            "rental_duration": 6,
            "rental_rate": "0.99",
            "length": 86,
            "replacement_cost": "20.99",
            "rating": "PG",
            "special_features": "Deleted Scenes,Behind the Scenes",
            "last_update": "2006-02-15T11:03:42.000Z"
        }
        ]
    }
 * 
 */
app.post("/filtrarPeliculasAnnio", (req, res)=>{
    consultaPeliculaAnnio(req, res);
});
app.post("/detallePelicula",(req, res)=>{
    verDetallePelicula(req,res);
});
app.post("/registrarPelicula",(req, res)=>{
    registrarPelicula(req,res);
});

//creamos el servidor
const server = http.createServer(app);
//le indicamos que estará escuchando en el puerto que definimos anteriormente
server.listen(PORT, () => { //Callback que se ejecuta cuando el puerto está listo
    console.log(`Servidor está escuchando en el puerto ${PORT}`);
});