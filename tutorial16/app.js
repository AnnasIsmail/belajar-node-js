const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const port = 3000
const fs = require('fs');

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));

app.use((req, res, next)=> {
    console.log(`Time: ${Date.now()}`);
    next();
});

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
    res.render('about', {
        title: 'about',
        layout: 'layouts/main-layout'
    });
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