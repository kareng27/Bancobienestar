//funcion propia de jquery
$(document).ready(function(){

$('.btnact').on('click',function(){

   let btn= $('.btnact').index(this);
   let doc=$('.doc').eq(btn);
   let usu=$('.usu').eq(btn);
   let cla=$('.cla').eq(btn);
   let rol=$('.rol').eq(btn);
   let est=$('.est').eq(btn);
   let img=$('.img').eq(btn);

   let d=doc.val();
   let u=usu.val();
   let c=cla.val();
   let r=rol.val();
   let e=est.val();
   let i=img.val();

   alert(d+u+c+r+e+i);

$.ajax({
type:"POST",
url:'/actualizar',
data:{
    dd:d,uu:u,cc:c,rr:r,ee:e,ii:i
}

});
    
});

});