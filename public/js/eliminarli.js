//funcion propia de jquery
$(document).ready(function(){

    $('.btneli').on('click',function(){
    
     let btn= $('.btneli').index(this);
     let cod=$('.cod').eq(btn);
    
     let c=cod.val();   

    alert(c);
    
$.ajax({
type:"POST",
url:'/eliminarli',
data:{
    cc:c
}
    
});
        
});
    
});