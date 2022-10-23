const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const morgan = require('morgan');
const port = 8080
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const methodOverride = require('method-override');

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
app.use(methodOverride('_method'));

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
  
  app.post('/contact', async (req, res) => {
    const contacts = await contact.findOne({email: req.body.email});
    console.log(contacts)
    if(contacts){
      res.render('add-contact', {
        title: 'Contact',
        layout: 'layouts/main-layout',
        error: 'Email Sudah Digunakan!'
    });
    }else{
        contact.insertMany({
                nama: req.body.name,
                notelp: req.body.nohp,
                email: req.body.email
            }, (err , result)=>{
            req.flash('msg', `Thank you, contact on behalf of ${req.body.name} Success added`);
            res.redirect('/contact');
        }) ;
    }
});

// app.get('/contact/delete/:email', (req, res) => {
//     contact.deleteOne({email: req.params.email}, result =>{
//         req.flash('msgInfo', `Contact on behalf of ${req.params.email} Success deleted`);
//         res.redirect('/contact');
//     });

//   });

app.delete('/contact', (req,res) => {
    contact.deleteOne({email: req.body.email}, result =>{
        req.flash('msgInfo', `Contact on behalf of ${req.body.email} Success deleted`);
        res.redirect('/contact');
    });
});

app.get('/contact/edit/:email', async(req, res) => {

    const contacts = await contact.findOne({email: req.params.email});

    res.render('edit-contact', {
      title: 'Contact',
      layout: 'layouts/main-layout',
      contact: contacts,
      error: false
    });

  });

  app.put('/contact', async (req, res) => {

    contact.updateOne({_id: req.body._id},
        {
            nama: req.body.name, email: req.body.email, notelp: req.body.nohp
        }
        ).then(result => {
            req.flash('msgInfo', `Contact on behalf of ${req.body.name} Success edited`);
            res.redirect('/contact');
        })

  });

  app.get('/contact/add', (req, res) => {

    res.render('add-contact', {
        title: 'Contact',
        layout: 'layouts/main-layout',
        error: false
    });
  })

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
