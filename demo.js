let http = require("http")

function server_callback(req, res){
    //  获取请求的方法
    let method = req.method.toLowerCase()
    if(method === 'get'){
        res.writeHead(200, {'Content-type': 'text/html'})
        res.write('<h1>hello nodejs</h1>')
        res.end()
    }
    if(method === 'post'){
        //  接受表单信息
        if(contentType === 'application/x-www-form-urlencoded'){
            let data = ''
            req.on('data', function(chunck){
                data += chunck.toString()
            })
            req.on('end',function(){
                data = querystring.parse(data)
                res.writeHead(200, {'Content-type': 'application/json'})
                res.write(JSON.stringify(data))
                res.end()
            })
        }
        //  接受json信息
        if(contentType === 'application/json'){
            let data = ''
            req.on('data',function(chunck){
                data += chunck.toString()
            })
            req.on('end',function(){
                data = JSON.parse(data)
                res.writeHead(200, {'Content-type': 'application/json'})
                res.write(JSON.stringify(data))
                res.end()
            })
        }
    }
}

http.createServer(server_callback).listen(10000)