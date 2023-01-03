import multer from "multer";


const almacenamiento = multer.diskStorage( {
  destination: ( req, file, cb ) => {
    cb( null, 'uploads' );
  },
  filename: ( req, file, cb ) => {
    cb( null, `${ Date.now() }-${ file.originalname }` );
  }
} );

const fileFilter = ( req, file, cb ) => {
  if ( file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' ) {
    cb( null, true );
  } else {
    cb( new Error( 'Formato de imagen no válido' ), false );
  }
};

const subida = multer( {
  storage: almacenamiento,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
} );




export default subida;
