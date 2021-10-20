const connection=require('../conexion/conexion')
const cnn=connection();
const{render}=require('ejs')
const bcryptjs=require('bcryptjs');
const session = require('express-session');
const controller={};
controller.index=(req,res,next)=>{
    res.render('login')
    res.send("error en controlador")
}


controller.consultageneral=(req,res,next)=>{
    if(req.session.login){

   
    cnn.query('SELECT * FROM tbusuarios',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('usuarios',{datos:resbd});
        }
    }) 
}
else{
    res.redirect('/');
}
 }

controller.insertar=async(req,res,next)=>{
//console.log(req.body)
const d=req.body.UsuDoc;
const u=req.body.UsuNom;
const c=req.body.UsuClave;
const r=req.body.UsuRol;
const e=req.body.UsuEstado;
const i=req.body.UsuImagen;
const password=await bcryptjs.hash(c,8)

console.log(d,u);
cnn.query('INSERT INTO tbusuarios SET?',{UsuDoc:d,UsuNom:u,UsuClave:password,UsuRol:r,UsuEstado:e,UsuImagen:i},(err,resbd)=>{
    if(err){
        next(new Error(err))
    }
    else{
        //console.log(resbd);
        res.redirect('usuarios')
    }
});
}

controller.login=async(req,res,next)=>{
    const usu=await req.body.usuario;
    const cla=await req.body.password;
    cnn.query('SELECT * FROM tbusuarios WHERE UsuNom=?',[usu],async(err,results)=>{
        if(results!=0){
            console.log("aaaaaaaa")
        }
        if(err){
            next(new Error("Error de consulta login",err));
        }
        else if(results!=0 && await(bcryptjs.compare(cla,results[0].UsuClave))){
                 console.log("Datos correctosssss");
                 //res.redirect('usuarios');
                 rol=results[0].UsuRol;
                 uss=results[0].UsuNom;
                 dcc=results[0].UsuDoc;
                 req.session.login=true;
                 req.session.uss = results[0].UsuNom
                 req.session.dcc = results[0].UsuDoc
                 switch(rol){
                     case 'Cliente':
                        // res.redirect('vistacliente');
                         res.redirect('vistacliente')
                     break;

                     case 'Empleado':
                         res.redirect('vistaempleado');
                     break;

                     case 'Administrador':
                         //res.redirect('creditos')
                         res.redirect('vistaadmin')
                     break;
                 }
        }
        else{
                 console.log("Datos inorrectos");
                 res.redirect('/');

        }
    })
}

controller.cliente=(req,res,next)=>{
    console.log("En la vista del usuario")
    res.render('clientes')
    //res.render('vistacliente')
}

controller.vistaadmin=(req,res,next)=>{
    if(req.session.login){  
    console.log("En la vista del administrador")
    res.render('vistaadmin')
    //res.render('vistacliente')
    }
    else{
        res.redirect('/');
    }
}

controller.vistaempleado=(req,res,next)=>{
    if(req.session.login){  
    console.log("En la vista del empleado")
    res.render('vistaempleado')
    //res.render('vistacliente')
    }
    else{
        res.redirect('/');
    }
}

controller.vistacliente=(req,res,next)=>{
    if(req.session.login){
        cnn.query('SELECT * FROM tbclientes WHERE CliDoc="'+[dcc]+'"',(err,resbd)=>{
            if(err){
              next(new Error(err))  
              console.log("En la vista cliente")
             // res.render('vistacli')
            }
            else{
                console.log(resbd)
                res.render('vistacliente',{datos:resbd});
            }
        }) 
    }
    else{
        res.redirect('/');
    }
}


controller.actualizar=async(req,res,next)=>{
  const docx=req.body.dd;
  const usux=req.body.uu;
  const clax=req.body.cc;
  const rolx=req.body.rr;
  const estx=req.body.ee;
  const imgx=req.body.ii;
  const password=await bcryptjs.hash(clax,8)

  cnn.query('UPDATE tbusuarios set UsuNom="'+usux+'",UsuClave="'+password+'",UsuRol="'+rolx+'",UsuEstado="'+estx+'",UsuImagen="'+imgx+'" WHERE UsuDoc="'+docx+'"', async(err,respbb)=>{

    if(err){
        next(new Error(err));
    }
    else{
        console.log("Actualizado")
        res.redirect('usuarios')
    }
  })
}

controller.eliminar=(req,res,next)=>{
    const docm=req.body.dd;
  
    cnn.query('DELETE from tbusuarios WHERE UsuDoc="'+docm+'"', async(err,respbb)=>{
  
      if(err){
        next(new Error(err));
      }
      else{
        console.log("Eliminado")
        res.redirect('usuarios')
      }
    })
}

/*controller.consultageneralclientes*/

controller.consultageneralclientes=(req,res,next)=>{
    if(req.session.login){

   
    cnn.query('SELECT * FROM tbclientes',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('clientes',{datos:resbd});
        }
    }) 
}
else{
    res.redirect('/');
}
 }

 controller.insertarcli=(req,res,next)=>{
    //console.log(req.body)
    const d=req.body.CliDoc;
    const n=req.body.CliNom;
    const a=req.body.CliApe;
    const c=req.body.CliCorreo;
    const e=req.body.CliCelular;
    const s=req.body.CliSexo;
    const f=req.body.CliFechaNa;
    
    
    console.log(d,n);
    cnn.query('INSERT INTO tbclientes SET?',{CliDoc:d,CliNom:n,CliApe:a,CliCorreo:c,CliCelular:e,CliSexo:s,CliFechaNa:f},(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
            //console.log(resbd);
            res.redirect('clientes')
        }
    });
    }


controller.actualizarcli=(req,res,next)=>{
    const docx=req.body.dd;
    const nomx=req.body.nn;
    const apex=req.body.aa;
    const corx=req.body.cc;
    const celx=req.body.ee;
    const sexox=req.body.ss;
    const fecx=req.body.ff
      
    cnn.query('UPDATE tbclientes set CliNom="'+nomx+'",CliApe="'+apex+'",CliCorreo="'+corx+'",CliCelular="'+celx+'",CliSexo="'+sexox+'",CliFechaNa="'+fecx+'" WHERE CliDoc="'+docx+'"', async(err,respbb)=>{
      
        if(err){
            next(new Error(err));
        }
        else{
            console.log("Actualizado")
            res.redirect('clientes')
        }
    })
}

controller.eliminarcli=(req,res,next)=>{
    const docc=req.body.dd;
  console.log("primero",docc)
    cnn.query('DELETE from tbclientes WHERE CliDoc="'+docc+'"', async(err,respbb)=>{
  
      if(err){
        next(new Error(err));
        console.log("Adentro")
      }
      else{
        console.log("Eliminado")
        res.redirect('clientes')
      }
    })
}

/*consultageneralcreditos*/
controller.consultageneralcreditos=(req,res,next)=>{
    if(req.session.login){

   
    cnn.query('SELECT * FROM tbcreditos',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('creditos',{datos:resbd});
        }
    }) 
}
else{
    res.redirect('/');
}
 }

 
controller.insertarcre=(req,res,next)=>{
    //console.log(req.body)
    const c=req.body.CreCodigo;
    const d=req.body.CliDoc;
    const l=req.body.CreCodLinea;
    const m=req.body.CreMontoPrestado;
    const f=req.body.CreFechaAproba;
    const p=req.body.CrePlazo;    
    
    console.log(d,c);
    cnn.query('INSERT INTO tbcreditos SET?',{CreCodigo:c,CliDoc:d,CreCodLinea:l,CreMontoPrestado:m,CreFechaAproba:f,CrePlazo:p},(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
            //console.log(resbd);
            res.redirect('creditos')
        }
    });
}

controller.actualizarcre=(req,res,next)=>{
    const codx=req.body.cc;
    const docx=req.body.dd;
    const codlix=req.body.ll;
    const monx=req.body.mm;
    const feax=req.body.ff;
    const plax=req.body.pp;
      
    cnn.query('UPDATE tbcreditos set CreCodigo="'+codx+'",CreCodLinea="'+codlix+'",CreMontoPrestado="'+monx+'",CreFechaAproba="'+feax+'",CrePlazo="'+plax+'" WHERE CliDoc="'+docx+'"', async(err,respbb)=>{
      
        if(err){
            next(new Error(err));
        }
        else{
            console.log("Actualizado")
            res.redirect('creditos')
        }
    })
}

controller.eliminarcre=(req,res,next)=>{
    const codm=req.body.cc;
  console.log("aqui",codm)
    cnn.query('DELETE from tbcreditos WHERE CreCodigo="'+codm+'"',async(err,respbb)=>{
  
      if(err){
        next(new Error(err));
        console.log("entro")
      }
      else{
        console.log("Eliminado")
        res.redirect('creditos')
      }
    })
}

/*controller.consultagenerallineas=(req,res,next)=>{*/
controller.consultagenerallineas=(req,res,next)=>{
    if(req.session.login){
  
    cnn.query('SELECT * FROM tblineas',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('lineas',{datos:resbd});
        }
    }) 
}
else{
    res.redirect('/');
}
 }


 controller.insertarli=(req,res,next)=>{
    //console.log(req.body)
    const c=req.body.LinCod;
    const n=req.body.LinNom;
    const m=req.body.LinMontoMaxCredito;
    const p=req.body.LinPlazoMaxCred;   
    
    console.log(n,c);
    cnn.query('INSERT INTO tblineas SET?',{LinCod:c,LinNom:n,LinMontoMaxCredito:m,LinPlazoMaxCred:p},(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
            //console.log(resbd);
            res.redirect('lineas')
        }
    });
}

 controller.actualizarli=(req,res,next)=>{
    const codx=req.body.cc;
    const nomx=req.body.nn;
    const monx=req.body.mm;
    const plax=req.body.pp;
      
    cnn.query('UPDATE tblineas set LinNom="'+nomx+'",LinMontoMaxCredito="'+monx+'",LinPlazoMaxCred="'+plax+'" WHERE LinCod="'+codx+'"', async(err,respbb)=>{
      
        if(err){
            next(new Error(err));
        }
        else{
            console.log("Actualizado")
            res.redirect('lineas')
        }
    })
}

controller.eliminarli=(req,res,next)=>{
    const codv=req.body.cc;
  console.log("prueba",codv)
    cnn.query('DELETE from tblineas WHERE LinCod="'+codv+'"',async(err,respbb)=>{
  
      if(err){
        next(new Error(err));
        console.log("aqui")
      }
      else{
        console.log("Eliminado")
        res.redirect('lineas')
      }
    })
}

/* VISTA EMPLEADO */

controller.consultaclientesemple=(req,res,next)=>{
    if(req.session.login){

   
    cnn.query('SELECT * FROM tbclientes',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('clientesemple',{datos:resbd});
        }
    }) 
}
else{
    res.redirect('/');
}
 }

 controller.insertarcliemple=(req,res,next)=>{
    //console.log(req.body)
    const d=req.body.CliDoc;
    const n=req.body.CliNom;
    const a=req.body.CliApe;
    const c=req.body.CliCorreo;
    const e=req.body.CliCelular;
    const s=req.body.CliSexo;
    const f=req.body.CliFechaNa;
    
    
    console.log(d,n);
    cnn.query('INSERT INTO tbclientes SET?',{CliDoc:d,CliNom:n,CliApe:a,CliCorreo:c,CliCelular:e,CliSexo:s,CliFechaNa:f},(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
            //console.log(resbd);
            res.redirect('clientesemple')
        }
    });
    }

 controller.consultacreditosemple=(req,res,next)=>{
    if(req.session.login){

   
    cnn.query('SELECT * FROM tbcreditos',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('creditosemple',{datos:resbd});
        }
    }) 
}
else{
    res.redirect('/');
}
 }

 controller.insertarcreemple=(req,res,next)=>{
    //console.log(req.body)
    const c=req.body.CreCodigo;
    const d=req.body.CliDoc;
    const l=req.body.CreCodLinea;
    const m=req.body.CreMontoPrestado;
    const f=req.body.CreFechaAproba;
    const p=req.body.CrePlazo;    
    
    console.log(d,c);
    cnn.query('INSERT INTO tbcreditos SET?',{CreCodigo:c,CliDoc:d,CreCodLinea:l,CreMontoPrestado:m,CreFechaAproba:f,CrePlazo:p},(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
            //console.log(resbd);
            res.redirect('creditosemple')
        }
    });
} 

controller.consultalineasemple=(req,res,next)=>{
    if(req.session.login){

   
    cnn.query('SELECT * FROM tblineas',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('lineasemple',{datos:resbd});
        }
    }) 
}
else{
    res.redirect('/');
}
 }

 controller.insertarliemple=(req,res,next)=>{
    //console.log(req.body)
    const c=req.body.LinCod;
    const n=req.body.LinNom;
    const m=req.body.LinMontoMaxCredito;
    const p=req.body.LinPlazoMaxCred;   
    
    console.log(n,c);
    cnn.query('INSERT INTO tblineas SET?',{LinCod:c,LinNom:n,LinMontoMaxCredito:m,LinPlazoMaxCred:p},(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
            //console.log(resbd);
            res.redirect('lineasemple')
        }
    });
}

controller.consultacuentaemple=(req,res,next)=>{
    if(req.session.login){
    cnn.query('SELECT * FROM tbcuentas',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('cuentasemple',{datos:resbd});
        }
    }) 
}
else{
    res.redirect('/');
}
 }

controller.insertarcuen=(req,res,next)=>{
    //console.log(req.body)
    const c=req.body.CueCod;
    const d=req.body.CueCliDoc;
    const t=req.body.CueTipo;
    const s=req.body.CueSaldo;   
    
    console.log(c,d);
    cnn.query('INSERT INTO tbcuentas SET?',{CueCod:c,CueCliDoc:d,CueTipo:t,CueSaldo:s},(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
            //console.log(resbd);
            res.redirect('cuentasemple')
        }
    });
}

controller.eliminarcuen=(req,res,next)=>{
    const codv=req.body.cc;
  console.log("prueba",codv)
    cnn.query('DELETE from tbcuentas WHERE CueCod="'+codv+'"',async(err,respbb)=>{
  
      if(err){
        next(new Error(err));
        console.log("aqui")
      }
      else{
        console.log("Eliminado")
        res.redirect('cuentasemple')
      }
    })
}
/* CIERRE VISTA EMPLEADO*/

/* VISTA CLIENTE */
controller.consultacreditosclien=(req,res,next)=>{
    if(req.session.login){

   
    cnn.query('SELECT * FROM tbcreditos where CliDoc="'+[dcc]+'"',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('creditosclien',{datos:resbd});
        }
    }) 
}
else{
    res.redirect('/');
}
 }

controller.consultalineasclien=(req,res,next)=>{
    if(req.session.login){

   
    cnn.query('SELECT * FROM tblineas INNER JOIN tbcreditos on (LinCod=CreCodLinea) INNER JOIN tbusuarios on (UsuDoc=CliDoc) WHERE UsuNom ="'+[uss]+'" ',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('lineasclien',{datos:resbd});
        }
    }) 
}
else{
    res.redirect('/');
}
 }


 controller.consultausuariosclien=(req,res,next)=>{
    if(req.session.login){

   
    cnn.query('SELECT * FROM tbusuarios where UsuDoc="'+[dcc]+'"',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('usuariosclien',{datos:resbd});
        }
    }) 
}
else{
    res.redirect('/');
}
 }


 controller.actualizarusuclien=async(req,res,next)=>{
    const docx=req.body.dd;
    const usux=req.body.uu;
    const clax=req.body.cc;
    const password=await bcryptjs.hash(clax,8)
  
    cnn.query('UPDATE tbusuarios set UsuNom="'+usux+'",UsuClave="'+password+'" WHERE UsuDoc="'+docx+'"', async(err,respbb)=>{
  
      if(err){
          next(new Error(err));
      }
      else{
          console.log("Actualizado")
          res.redirect('/')
      }
    })
  }


  controller.consultacuentasclien=(req,res,next)=>{
    if(req.session.login){

   
    cnn.query('SELECT * FROM tbcuentas INNER JOIN tbusuarios on (UsuDoc=CueCliDoc) WHERE UsuNom ="'+[uss]+'"',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('cuentasclien',{datos:resbd});
        }
    }) 
}
else{
    res.redirect('/');
}
 }

 controller.vistaretirar=(req,res,next)=>{
    if(req.session.login){  
    console.log("En retirar.ejs")
    res.render('retirar')
    }
    else{
        res.redirect('/');
    }
}

controller.retirarcuentaclien=(req,res,next)=>{
    const a=req.body.CueSaldo;     
    const c=req.body.CueTipo;
    console.log(a);
    cnn.query('UPDATE tbcuentas SET CueSaldo= CueSaldo -"'+a+'" WHERE CueCliDoc="'+dcc+'" AND CueTipo="'+c+'"',async(err,respbb)=>{ 
    if(err){    
        next(new Error(err)); 
    }
    else{
        console.log(respbb);
        res.render('retirar',{Datos:respbb}); 
    }
    }); 
}

controller.vistaconsignar=(req,res,next)=>{
    if(req.session.login){  
    console.log("En consignar.ejs")
    res.render('consignar')
    }
    else{
        res.redirect('/');
    }
}

controller.consignarcuentaclien=(req,res,next)=>{
    //const d=req.body.CueCliDoc;
    const a=req.body.CueSaldo;     
    const c=req.body.CueTipo;
    console.log(a);
    cnn.query('UPDATE tbcuentas SET CueSaldo= CueSaldo +"'+a+'" WHERE CueCliDoc="'+dcc+'" AND CueTipo="'+c+'"',async(err,respbb)=>{ 
    if(err){    
        next(new Error(err));  
    }
    else{
        console.log(respbb);
        res.render('consignar',{Datos:respbb}); 
    }
    }); 
}

 controller.vistatransferir=(req,res,next)=>{
    if(req.session.login){  
    console.log("En trasferir.ejs")
    res.render('transferir')
    }
    else{
        res.redirect('/');
    }
}

controller.insertartransferir=async(req,res,next)=>{  
    const d=req.body.CueCliDoc;
    const a=req.body.CueSaldo;     
    const c=req.body.CueTipo;
    console.log(a);
    cnn.query('UPDATE tbcuentas SET CueSaldo= CueSaldo -"'+a+'" WHERE CueCliDoc="'+dcc+'" AND CueTipo="Ahorros"',async(err,respbb)=>{ 
    if(err){    
        next(new Error(err));  
    }
    else{
     
        console.log(respbb);
        res.render('transferir',{Datos:respbb}); 
    }
    });
    cnn.query('UPDATE tbcuentas SET CueSaldo= CueSaldo +"'+a+'" WHERE CueCliDoc="'+d+'" AND CueTipo="'+c+'"',async(err,respbb)=>{ 
        if(err){    
            next(new Error(err));  
        }
        else{
            console.log(respbb);
            res.render('transferir',{Datos:respbb}); 
        }
        });
     }
/* CIERRE VISTA CLIENTE*/



controller.principal=(req,res,next)=>{
    console.log("En index.ejs")
    res.render('index')
}

controller.inversiones=(req,res,next)=>{
    console.log("En inversiones.ejs")
    res.render('inversiones')   
}


controller.manejardinero=(req,res,next)=>{
    console.log("En manejardinero.ejs")
    res.render('manejardinero')
}


controller.preguntasfre=(req,res,next)=>{
    console.log("En preguntasfre.ejs")
    res.render('preguntasfre')
}


controller.seguridad=(req,res,next)=>{
    console.log("En seguridad.ejs")
    res.render('seguridad')
}




controller.cerrar=(req,res,next)=>{
    req.session.destroy(()=>{
        res.redirect('/');
    });
}

module.exports=controller;