const fs = require('fs');
const open = require('open');
const validator = require('validator');

const dirPath = './data';
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
}

const contactPath = './data/contacts.json';
if(!fs.existsSync(contactPath)){
    fs.writeFileSync(contactPath, '[]', 'utf-8');
}

const loadContact =()=>{
    const fileBuffer = fs.readFileSync(contactPath, 'utf-8');
    const contact = JSON.parse(fileBuffer);
    return contact;
}

const addContact = (params) => {
    const file = fs.readFileSync(contactPath, 'utf-8');
    const contacts = JSON.parse(file);
    const duplicate = contacts.find((contact)=> contact.nama === params.nama );

    //cek duplikat nama
    // if(duplicate){
    //     console.log('Nama Di Database sudah terdaftar');
    //     return false;
    // }

    //cek noHP di isi
    // if(!validator.isMobilePhone(data.notelp , 'id-ID')){
    //     console.log('nomor HP tidak valid.');
    //     return false;
    // }


    arrayFile = [];
    arrayFile = loadContact();
    objectToPush = {
        nama: params.name, email: params.email, notelp: params.nohp
    }
    arrayFile.push(objectToPush);
    setContact(arrayFile);
}

const setContact = (params) => {
    fs.writeFileSync(contactPath, JSON.stringify(params));
}

module.exports = { loadContact , addContact , setContact}