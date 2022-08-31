import http from "http";

http.createServer((req, res) => {
    if ((req.method === "GET") && (req.url === "/teste")){ //method é um metodo nativo em req
        res.write("GET /teste executado com sucesso");
    }else {
        res.write("Hello world!");
    }
    res.statusCode = 200;
    res.end() //encerrar requisição
}).listen(8080)