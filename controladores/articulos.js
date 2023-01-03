import Articulo from "../modelos/articulos.js";


const conseguirArticulos = async ( req, res ) => {
  const articulos = await Articulo.find( {} ).sort( { fecha: -1 } );
  res.status( 200 ).json( articulos );
};

const detalleArticulo = async ( req, res ) => {
  try {
    const { id } = req.params;
    const articulo = await Articulo.findById( id );
    res.status( 200 ).json( articulo );
  } catch ( error ) {
    res.status( 404 ).json( {
      message: "Artículo no encontrado"
    } );
  }
};

const crearArticulo = async ( req, res ) => {
  const articulo = new Articulo( req.body );
  await articulo.save();
  res.status( 201 ).json( articulo );

};

const borrarArticulo = async ( req, res ) => {
  try {
    const { id } = req.params;
    Articulo.findByIdAndDelete( id );
    res.status( 204 ).json( {
      message: "Artículo borrado"
    } );
  } catch ( error ) {
    res.status( 404 ).json( {
      message: "Artículo no encontrado"
    } );
  };
};

const actualizarArticulo = async ( req, res ) => {
  try {
    const { id } = req.params;
    const articulo = await Articulo.findByIdAndUpdate
      ( id, req
        .body, {
        new: true
      } );
    res.status( 200 ).json( articulo );
  } catch ( error ) {
    res.status( 404 ).json( {
      message: "Artículo no encontrado"
    } );

  }
};

const subirImagen = async ( req, res ) => {
  try {
    const { id } = req.params;
    const articulo = await Articulo
      .findById
      ( id );
    articulo.imagen = req.file.filename;
    await articulo.save();
    res.status( 200 ).json( articulo );
  } catch ( error ) {
    res.status( 404 ).json( {
      message: "Artículo no encontrado"
    } );
  }
};

const buscarArticuloPorParametro = async ( req, res ) => {
  try {
    const { busqueda } = req.params;
    const articulo = await Articulo.find( {
      $or: [ {
        titulo: {
          $regex: busqueda,
          $options: "i"
        }
      }, {
        descripcion: {
          $regex: busqueda,
          $options: "i"
        }
      } ]
    } ).sort( { fecha: -1 } );
    if ( articulo.length > 0 ) {
      res.status( 200 ).json( articulo );
    } else {
      res.status( 404 ).json( {
        message: "Artículo no encontrado"
      } );
    }
  } catch ( error ) {
    res.status( 500 ).json( {
      message: error.message
    } );
  }
};



const controladoresArticulos = {
  conseguirArticulos,
  detalleArticulo,
  crearArticulo,
  borrarArticulo,
  actualizarArticulo,
  subirImagen,
  buscarArticuloPorParametro
};


export default controladoresArticulos;
