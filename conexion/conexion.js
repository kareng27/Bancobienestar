const mysql =require('mysql')
module.exports=()=>
mysql.createConnection({
    /*host:'localhost',
    user:'root',
    password: '',
    database:'dbbancok'*/
    host:'bfnhnm7qiw4wdftea9p2-mysql.services.clever-cloud.com',
    user:'uuecawabp2yrzz84',
    password: 'AjRfEoRSB4xgRF6X118x',
    database:'bfnhnm7qiw4wdftea9p2'
})