//funcion propia de jquery
$(document).ready(function(){

    $('.btnins').on('click',function(){
    
       let btn= $('.btnins').index(this);
       let doc=$('.UsuDoc').eq(btn);
       let usu=$('.UsuNom').eq(btn);
       let cla=$('.UsuClave').eq(btn);
       let rol=$('.UsuRol').eq(btn);
       let est=$('.UsuEstado').eq(btn);
       let img=$('.UsuImagen').eq(btn);
    
       let d=doc.val();
       let u=usu.val();
       let c=cla.val();
       let r=rol.val();
       let e=est.val();
       let i=img.val();
    
       alert(d+u+c+r+e+i);
    
    $.ajax({
    type:"POST",
    url:'/insertarusu',
    data:{
        dd:d,uu:u,cc:c,rr:r,ee:e,ii:i
    }
    
    });
        
    });
    
    });