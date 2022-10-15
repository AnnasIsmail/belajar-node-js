const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');

app.set('view engine', 'ejs');

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

app.get('/', (req, res) => {
    // renderHTML('./index.html' , res);

    const dataSiswa = [
        {
            nama: 'Santo',
            kelas: 12
        },
        {
            nama: 'Wijaya',
            kelas: 12
        },
        {
            nama: 'Joko',
            kelas: 12
        },
    ]

    res.render('index', {nama : 'Annas Ismail' , title: 'Home', dataSiswa});
})

app.get('/about', (req, res) => {
    res.render('about');
  })

app.get('/json', (req, res) => {
    res.json({
        "nama": "joko",
        "alamat": "rumah"
    })
})

app.get('/product/:id/category/:idCat', (req , res)=>{
    res.send(`Product ID : ${req.params.id}, Category ID : ${req.params.idCat}`)
})

app.get('/product-search/:id', (req , res)=>{
    res.send(`Product ID : ${req.params.id}, Category Shoes : ${req.query.category}`)
})

app.use('/' ,(req , res)=> {
    res.status(404);
    res.send("<h1>Halaman Tidak Ada</h1>")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})