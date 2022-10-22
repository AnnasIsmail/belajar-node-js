const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Annas',
 {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
});

//Menambah Satu data

// const contact1 = new contact({
//     nama: 'Annas',
//     notelp: '087786743617361',
//     email: 'annas@gmail.com'
// })

// contact1.save().then((result) => {
//     console.log(result);
// }).catch((err) => {
//     console.log(err);
// });