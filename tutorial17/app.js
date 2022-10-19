const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const port = 3000
const morgan = require('morgan');
const { loadContact , addContact } = require('./utils/contacts');

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));

app.use((req, res, next)=> {
    console.log(`Time: ${Date.now()}`);
    next();
});

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Index',
        layout: 'layouts/main-layout'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about',
        layout: 'layouts/main-layout'
    });
  })

  app.get('/contact', (req, res) => {

    const contacts = loadContact();

    res.render('contact', {
        title: 'Contact',
        layout: 'layouts/main-layout',
        contacts
    });
  });

  app.post('/contact', (req, res) => {

    const contacts = loadContact();
    const duplicate = contacts.find(data => data.email === req.body.email);
    
    if(duplicate){
      res.render('add-contact', {
        title: 'Contact',
        layout: 'layouts/main-layout',
        error: 'Email Sudah Digunakan!'
    });
    }else{
      addContact(req.body);
      res.redirect('/contact');
    }
});

  app.get('/contact/add', (req, res) => {

    res.render('add-contact', {
        title: 'Contact',
        layout: 'layouts/main-layout',
        error: false
    });
  })

  app.get('/contact/:nama', (req, res) => {

    const contacts = loadContact();
    const contact = contacts.find(data => data.nama === req.params.nama);

    // if(contact === undefined){
    //     res.send("<h1>Nama Tidak Terdaftar</h1>");
    //     return false;
    // }

    res.render('detail-contact', {
        title: 'Contact',
        layout: 'layouts/main-layout',
        contact,
    });
  })

app.use('/' ,(req , res)=> {
    res.status(404);
    res.send("<h1>Halaman Tidak Ada</h1>")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})