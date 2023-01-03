import express from 'express';
import controladoresArticulos from '../controladores/articulos.js';
import { actualizarArticuloValidator, articuloValidator } from '../middlewares/articuloValidator.js';
import subida from '../middlewares/multerHelper.js';

const router = express.Router();

router.get( '/', controladoresArticulos.conseguirArticulos );

router.post( '/', articuloValidator, controladoresArticulos.crearArticulo );

router.get( '/:id', controladoresArticulos.detalleArticulo );

router.delete( '/:id', controladoresArticulos.borrarArticulo );

router.put( '/:id', actualizarArticuloValidator, controladoresArticulos.actualizarArticulo );

router.post( '/imagen/:id', subida.single( 'imagen' ), controladoresArticulos.subirImagen );

router.get( '/buscar/:busqueda', controladoresArticulos.buscarArticuloPorParametro );

export default router;
