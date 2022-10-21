const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const port = 3000
const morgan = require('morgan');
const { loadContact , addContact , setContact } = require('./utils/contacts');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));

// config flash
app.use(cookieParser('secret'));
app.use(session({
  cookie: {maxAge: 6000},
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.use(flash());

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
        contacts,
        msg: req.flash('msg'),
        msgInfo: req.flash('msgInfo'),
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
      req.flash('msg', `Thank you, contact on behalf of ${req.body.name} Success added`);
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

  app.get('/contact/delete/:email', (req, res) => {

    const contacts = loadContact();
    const contact = contacts.filter(data => data.email === req.params.email);
    const contactAfter = contacts.filter(data => data.email !== req.params.email);
    setContact(contactAfter);
    req.flash('msgInfo', `Contact on behalf of ${contact[0].nama} Success deleted`);
    res.redirect('/contact');

  });

  app.get('/contact/edit/:email', (req, res) => {

    const contacts = loadContact();
    const contact = contacts.find(data => data.email === req.params.email);

    res.render('edit-contact', {
      title: 'Contact',
      layout: 'layouts/main-layout',
      contact,
      error: false
    });

  });

  app.post('/contact/edit/:email', (req, res) => {

    let contacts = [];
    contacts = loadContact();
    const contact = []
    const objectToPush = {
      nama: req.body.name, email: req.body.email, notelp: req.body.nohp
    }

    contacts.map(data => {
      if(data => data.email === req.params.email){
        contact.push(objectToPush);
      }else{
        contact.push(data);
      }
    })

    setContact(contact);
    req.flash('msgInfo', `Contact on behalf of ${req.body.name} Success edited`);
    res.redirect('/contact');
  });

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
  });

app.use('/' ,(req , res)=> {
    res.status(404);
    res.send("<h1>Halaman Tidak Ada</h1>")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})