// Based on https://gist.github.com/e0ne/3156463
var http = require('http')

http.createServer(function(request, response){
    var request_options = {
        host: '104.24.112.177', // Thank you https://securitytrails.com/domain/typings.org/history
        port: 80,
        path: request.url,
        method: request.method,
        headers: {
            host: 'api.typings.org', // Spoof the host
        }
    }
    var proxy_request = http.request(request_options, function(proxy_response){
        proxy_response.pipe(response)
        response.writeHead(proxy_response.statusCode, proxy_response.headers)
    })
    request.pipe(proxy_request)
}).listen(process.env.PORT || 8015)