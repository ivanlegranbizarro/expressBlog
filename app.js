import conexion from "./basedatos/conexion.js";
import express from "express";
import cors from "cors";
import routerArticulos from "./rutas/articulos.js";

conexion();

const app = express();

const port = 3000;


app.use( cors() );

app.use( express.json() );

app.use( express.urlencoded( { extended: true } ) );

app.use( '/api/articulos', routerArticulos );

app.listen( port, () => {
  console.log( `Servidor corriendo en http://localhost:${ port }` );
} );
