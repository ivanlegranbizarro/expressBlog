import { Schema, model } from "mongoose";

const ArticuloSchema = Schema( {
  titulo: { type: String, required: true },
  contenido: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
  imagen: { type: String },
} );


export default model( 'Articulo', ArticuloSchema );
