import { check, validationResult } from "express-validator";

const useValidation = ( req, res, next ) => {
  try {
    validationResult( req ).throw();
    return next();
  } catch ( error ) {
    res.status( 403 ).send( error.array() );
  }
};

const articuloValidator = [
  check( "titulo", "El título es obligatorio y debe tener entre 5 y 50 caracteres" ).not().isEmpty().isLength( { min: 5, max: 50 } ),
  check( "contenido", "El contenido es obligatorio y debe tener entre 5 y 500 caracteres" ).not().isEmpty().isLength( { min: 5, max: 500 } ),
  check( "imagen", "La imagen debe ser una URL válida" ).optional().isURL(),
  useValidation
];

const actualizarArticuloValidator = [
  check( "titulo", "El título debe tener entre 5 y 50 caracteres" ).optional().isLength( { min: 5, max: 50 } ),
  check( "contenido", "El contenido debe tener entre 5 y 500 caracteres" ).optional().isLength( { min: 5, max: 500 } ),
  check( "imagen", "La imagen debe ser una URL válida" ).optional().isURL(),
  useValidation
];


export {
  articuloValidator,
  actualizarArticuloValidator
};
