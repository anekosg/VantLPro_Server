var http = require('http');
// const url = require('url');
var fs = require('fs');

var info =[
    { name:"banner-01",url:"http://127.0.0.1:8081/images/banner-01.png"},
    { name:"banner-02",url:"http://127.0.0.1:8081/images/banner-01.png"}
    ];
http.createServer(function (request, response) {
  
    response.setHeader('Content-Type','application/json;charset=utf-8');
    response.setHeader('Access-Control-Allow-Origin','*');
    response.setHeader('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
    
    if(request.url.indexOf('.png')>0){
        fs.readFile(request.url.substr(1),function(err,data){
            if(err){
                response.statusCode=404;
                response.setHeader('Content-Type', 'text/text;charset=UTF-8');
                response.end('失败');
            }else{
                response.setHeader('Content-Type', 'image/png');
                response.write(data);
                response.end();
            }
        });
    }else{
        response.write(JSON.stringify( info));
        response.end();
    }


}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');

