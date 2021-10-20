const express=require('express')
const rutas=express.Router();
const controller=require('../controlador/controller')

rutas.get('/',controller.index);

rutas.post('/login',controller.login);
rutas.get('/usuarios',controller.consultageneral);
rutas.get('/clientes',controller.consultageneralclientes);
rutas.get('/creditos',controller.consultageneralcreditos);
rutas.get('/lineas',controller.consultagenerallineas);
rutas.get('/vistaadmin',controller.vistaadmin);
rutas.get('/vistaempleado',controller.vistaempleado);
rutas.get('/vistacliente',controller.vistacliente);
rutas.get('/clientesemple',controller.consultaclientesemple)
rutas.get('/creditosemple',controller.consultacreditosemple)
rutas.get('/cuentasemple',controller.consultacuentaemple)
rutas.get('/lineasemple',controller.consultalineasemple)
rutas.get('/creditosclien',controller.consultacreditosclien)
rutas.get('/lineasclien',controller.consultalineasclien)
rutas.get('/usuariosclien',controller.consultausuariosclien)
rutas.get('/cuentasclien',controller.consultacuentasclien)
rutas.get('/retirar',controller.vistaretirar)
rutas.get('/consignar',controller.vistaconsignar)
rutas.get('/transferir',controller.vistatransferir)
rutas.post('/frmretirar',controller.retirarcuentaclien)
rutas.post('/frmconsignar',controller.consignarcuentaclien)
rutas.post('/frmtransferir',controller.insertartransferir)
rutas.post('/frminsertar',controller.insertar)
rutas.post('/frminsertarcli',controller.insertarcli)
rutas.post('/frminsertarcliemple',controller.insertarcliemple)
rutas.post('/frminsertarcre',controller.insertarcre)
rutas.post('/frminsertarcreemple',controller.insertarcreemple)
rutas.post('/frminsertarli',controller.insertarli)
rutas.post('/frminsertarliemple',controller.insertarliemple)
rutas.post('/frminsertarcuen',controller.insertarcuen)
rutas.get('/vistacliente',controller.cliente)

rutas.post('/actualizar',controller.actualizar)
rutas.post('/eliminar',controller.eliminar)
rutas.post('/actualizarcli',controller.actualizarcli)
rutas.post('/eliminarcli',controller.eliminarcli)
rutas.post('/actualizarcre',controller.actualizarcre)
rutas.post('/eliminarcre',controller.eliminarcre)
rutas.post('/actualizarli',controller.actualizarli)
rutas.post('/eliminarli',controller.eliminarli)
rutas.post('/actualizarusucli',controller.actualizarusuclien)
rutas.post('/eliminarcuen',controller.eliminarcuen)
rutas.get('/cerrar',controller.cerrar)


rutas.get('/index',controller.principal);
rutas.get('/inversiones',controller.inversiones);
rutas.get('/manejardinero',controller.manejardinero);
rutas.get('/preguntasfre',controller.preguntasfre);
rutas.get('/seguridad',controller.seguridad);

module.exports=rutas