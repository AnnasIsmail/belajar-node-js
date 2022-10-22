const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const morgan = require('morgan');
const port = 3000
const { loadContact , addContact , setContact } = require('./utils/contacts');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const contact = require('./model/contact');
require('./utils/db');


app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));

app.use(cookieParser('secret'));
app.use(session({
  cookie: {maxAge: 6000},
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));


app.use(flash());

app.listen(port, ()=> {
    console.log(`Success Running Node App`);
});

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Index',
        layout: 'layouts/main-layout'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about',
        layout: 'layouts/main-layout'
    });
  })

  app.get('/contact', async (req, res) => {

    const contacts = await contact.find();

    res.render('contact', {
        title: 'Contact',
        layout: 'layouts/main-layout',
        contacts,
        msg: req.flash('msg'),
        msgInfo: req.flash('msgInfo'),
    });
  });

  app.get('/contact/:nama', async (req, res) => {

    const contacts = await contact.findOne({nama: req.params.nama});
    // const contact = contacts.find(data => data.nama === req.params.nama);

    // if(contact === undefined){
    //     res.send("<h1>Nama Tidak Terdaftar</h1>");
    //     return false;
    // }

    res.render('detail-contact', {
        title: 'Contact',
        layout: 'layouts/main-layout',
        contact: contacts,
    });
  });
