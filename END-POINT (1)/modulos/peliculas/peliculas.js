//importación de los módulos
const conexion = require("../conexion/conexion.js");
const conn = conexion;

/**
 * Función para retornar la lista de peliculas de sakila
 * @param {*} req Listado de parámetros a recibir
 * @param {*} res Retorno de respuestas (de errores y exitosas)
 */
function listarTodasPeliculas(req, res){
    conn.query(
        "select * from sakila.film",
        (error, results) => {
            if(error){
                //arrojamos un estado 500 (error interno del servidor)
                return res.status(500).json({estado:false,mensaje:error});
            }else{
                //en caso de todo estar ok, arrojamos un estado 200 (exitoso)
                return res.status(200).json({estado: true,data:results});
            }
        }
    )
}

function verDetallePelicula(req, res){
    const {titulo} = req.body;
    if(!titulo){
        res.status(400).json({estado:false,mensaje:"Debes proporcionar el valor de la película (titulo)"});
    }else{//en dado caso de que el parámetro haya sido enviado correctamente
        //consultamos la base de datos
        const consulta = "select * from sakila.film where sakila.film.title = ?";
        conn.query(consulta,[titulo],(err, results) =>{
            if(err){
                res.status(500).json({estado:false,data: "Ocurrió un error"+err});
            }else{
                if(results.length>0){
                    res.status(200).json({estado:true,data: results});
                }else{
                    res.status(200).json({estado:true,data: "No hay datos"});
                }
            }
        });
    }
}


function eliminarPelicula(req, res){
    const {titulo} = req.body;
    if(!titulo){
        res.status(400).json({estado:false,mensaje:"Debes proporcionar el valor de la película (titulo)"});
    }else{//en dado caso de que el parámetro haya sido enviado correctamente
        //consultamos la base de datos
        const consulta = "select * from sakila.film where sakila.film.title = ?";
        conn.query(consulta,[titulo],(err, results) =>{
            if(err){
                res.status(500).json({estado:false,data: "Ocurrió un error"+err});
            }else{
                if(results.length>0){
                    res.status(200).json({estado:true,data: results});
                }else{
                    res.status(200).json({estado:true,data: "No hay datos"});
                }
            }
        });
    }
}


function consultaPeliculaAnnio(req, res){
    //parámetro que vamos a recibir por medio del cuerpo de la solicitud
    const {annio_p} = req.body;
    console.log(req.body);

    if(!annio_p){
        return res.status(400).json(
            {estado: false, mensaje:"debes proporcionar annio_p: number y no debe ser vacio"}
        );
    }
    //consulta para traer las peliculas de la base de datos con el parámetro annio_p
    const consultaSQL = "select * from sakila.film where release_year = ?";

    conn.query(consultaSQL, [annio_p],(err, results) => {
        if(err){
            res.status(500).json({
                estado: false,
                mensaje:"Ocurrió un error: "+err
            });
        }else{
            if(results.length > 0){
                res.status(200).json({estado: true,data: results});
            }else{
                res.status(200).json({estado: true,data: "No existen películas estrenadas este año"});
            }
        }
    });

}
function registrarPelicula(req, res) {
    const conexion = conn;


    const {film_id,title,description,release_year,language_id,rental_duration,rental_rate,length,replacement_cost,rating,special_features } = req.body;
    console.log(req.body);

    // validamos que los acmpos esten llenos 
    if (!film_id ||!title || !description || !release_year || !language_id||!rental_duration||!rental_rate||!length||!replacement_cost||!rating||!special_features) {
        return res.status(400).json({ estado: false, mensaje: "Todos los campos son obligatorios" });
    }

    // Consulta  de regisrrar pelicula
    const consultaSQL = `INSERT INTO sakila.film (
    film_id,
    title,
    description,
    release_year,
    language_id,
    rental_duration,
    rental_rate,
    length,
    replacement_cost,
    rating,
    special_features)
     VALUES (
     ?,
     ?,
     ?,
     ?,
     ?,
     ?,
     ?,
     ?,
     ?,
     ?,
     ?)`;

    conexion.query(consultaSQL, [film_id,title,description,release_year,language_id,rental_duration,rental_rate,length,replacement_cost,rating,special_features], (err, results) => {
        if (err) {
            return res.status(500).json({
                estado: false,
                mensaje: "Ocurrió un error: " + err
            });
        } else {
            return res.status(201).json({ estado: true, mensaje: "Pelicula exitosamente  registrada ", data: { id: results.film_id,title,description,release_year,language_id,rental_duration,rental_rate,length,replacement_cost,rating,special_features}});
        }
    });
}

//exportamos la funcion que desarrollamos
module.exports = {listarTodasPeliculas,consultaPeliculaAnnio,verDetallePelicula,registrarPelicula};