// const readLine = require('readline');
const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');
// const rl = readLine.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })

const saveCOntact =(nama, email, notelp)=>{
    const contactPath = './data/contacts.json';
    const file = fs.readFileSync(contactPath, 'utf-8');
    const contacts = JSON.parse(file);
    const duplicate = contacts.find((contact)=> contact.nama === nama );

    //cek duplikat nama
    if(duplicate){
        console.log(chalk.red.bold('Nama Di Database sudah terdaftar'));
        return false;
    }

    //cek email di isi
    if(email){
        if(!validator.isEmail(email)){
            console.log('email tidak valid.');
            return false;
        }
    }

    //cek noHP di isi
    if(!validator.isMobilePhone(notelp , 'id-ID')){
        console.log('nomor HP tidak valid.');
        return false;
    }

    // Membuat Folder Data
    const dirPath = './data';
    if(!fs.existsSync(dirPath)){
        fs.mkdirSync(dirPath);
    }
    
    //Membuat file contacts.json
    if(!fs.existsSync(contactPath)){
        fs.writeFileSync(contactPath, '[]', 'utf-8');
    }

    arrayFile = [];
    fs.readFile(contactPath, 'utf-8', (err , data) => {
        if (err){ throw err};
        arrayFile = JSON.parse(data);
        objectToPush = {
            nama, email, notelp
        }
        
        arrayFile.push(objectToPush);

        fs.writeFileSync(contactPath, JSON.stringify(arrayFile));

        console.log(chalk.green.bold(`Terima Kasih ${nama}. Data anda sudah kami simpan`));
    });

}

const pertanyaan = (pertanyaan) => {
    return new Promise((resolve , reject)=>{
        rl.question(pertanyaan , (nama) =>{
            resolve(nama)
        });
    });
}

module.exports = { saveCOntact }