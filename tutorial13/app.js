const http = require('http');
const port = 3000;
const fs = require('fs');


const renderHTML = (path , res) => {
    fs.readFile(path, (err , data) => {
        if(err){
            res.writeHead(404);
            res.write('Error: File not Found');
        }else{
            res.write(data);
        }
        res.end();
    });
}

const server = http.createServer((req , res)=> {
    const url = req.url;
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    // if(url === '/'){
    //     renderHTML('./index.html' , res);
    // } else if(url === '/about') {
    //     renderHTML('./about.html' , res);
    // }

    switch (url) {
        case '/':
            renderHTML('./index.html' , res);
            break;
    
        case '/about':
            renderHTML('./about.html' , res);
            break;            

        default:
            renderHTML('./index.html' , res);
            break;
    }

});

server.listen(port, ()=> {
    console.log(`Server is Listening on port ${port}`);
});