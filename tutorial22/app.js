const { MongoClient , ObjectID } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'Annas'


const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

client.connect((error, clinet)=>{
    if(error){
        return console.log('Failed Connection');
    }

    //Pilih Database
    const db = client.db(dbName);

    //Menambahkan satu data
    // db.collection('mahasiswa').insertOne({
    //     nama: "Joko",
    //     Alamat: "Bekasi"
    // },
    // (error , result) => {
    //     if(error){
    //         return console.log('Failed Add New Data.');
    //     }
    //     console.log(result);
    // });

    //Menambahkan banyak data
    // db.collection('mahasiswa').insertMany([{"nama":"Annas Ismail","email":"annas_ismail@yahoo.com","notelp":"087709232772"},{"nama":"Annas Ismail","email":"annasismailmuhammad@gmail.com","notelp":"081316694635"}],
    // (error , result) => {
    //     if(error){
    //         return console.log('Failed Add New Data.');
    //     }
    //     console.log(result);
    // });

    // db.collection('mahasiswa').find({ nama: 'joko' }).toArray((err , res)=>{
    //     console.log(res);
    // });

    // db.collection('mahasiswa').find({ _id: ObjectID('6352a16766537053d0333359')}).toArray((err , res)=>{
    //     console.log(res);
    // });

    // const updatePromise = db.collection('mahasiswa').updateOne(
    //     {
    //          _id: ObjectID('6352a16766537053d0333359')
    //     },
    //     {
    //         $set: {
    //             nama: 'maman'
    //         }
    //     });

    // const updatePromise = db.collection('mahasiswa').updateMany(
    //     {
    //          nama: 'Joko'
    //     },
    //     {
    //         $set: {
    //             nama: 'Joko 2'
    //         }
    //     });

    // updatePromise.then((res)=>{
    //     console.log(res);
    // }).catch((err)=>{
    //     console.log(err);
    // })

    // db.collection('mahasiswa').deleteOne(
    //     {
    //         _id: ObjectID('6352a16766537053d0333359')
    //     }).then((res)=>{
    //         console.log(res);
    //     }).catch((err)=>{
    //         console.log(err);
    //     });

    db.collection('mahasiswa').deleteMany(
        {
            nama: 'Joko 2'
        }).then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        });


    // console.log('Success Connection');
});

