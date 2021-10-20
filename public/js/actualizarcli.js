//funcion propia de jquery
$(document).ready(function(){
    //alert("estos funciona?")

    $('.btnact').on('click',function(){
    
       let btn= $('.btnact').index(this);
       let doc=$('.doc').eq(btn);
       let nom=$('.nom').eq(btn);
       let ape=$('.ape').eq(btn);
       let cor=$('.cor').eq(btn);
       let cel=$('.cel').eq(btn);
       let sexo=$('.sexo').eq(btn);
       let fec=$('.fec').eq(btn);
    
       let d=doc.val();
       let n=nom.val();
       let a=ape.val();
       let c=cor.val();
       let e=cel.val();
       let s=sexo.val();
       let f=fec.val();
    
       alert(d+n+a+c+e+s+f);
    
    $.ajax({
    type:"POST",
    url:'/actualizarcli',
    data:{
        dd:d,nn:n,aa:a,cc:c,ee:e,ss:s,ff:f
    }
    
});
        
});
    
});