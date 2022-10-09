// const readLine = require('readline');
const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');
// const rl = readLine.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })

const contactPath = './data/contacts.json';
const loadContact =()=> {
    const file = fs.readFileSync(contactPath, 'utf-8');
    const contacts = JSON.parse(file);
    return contacts;
}

const saveCOntact =(nama, email, notelp)=>{
    const contacts = loadContact();
    
    //cek duplikat nama
    const duplicate = contacts.find((contact)=> contact.nama === nama );

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

const listContact =()=> {
    const contacts = loadContact();
    console.log(chalk.blue.inverse.bold('Daftar Contact: '));
    contacts.forEach((data , index)=>{
        console.log(`${index+1}. ${data.nama} - ${data.notelp}`)
    });
}

const detailContact =(nama)=> {
    const contacts = loadContact();

    if(!nama){
        console.log(chalk.red.bold('Mohon Mengisi argument Nama.'))
    }

    const getContact = contacts.find((get)=> get.nama.toLowerCase() === nama.toLowerCase());

    if(getContact){
        console.log(chalk.green.bold(`Name: ${getContact.nama}`))
        console.log(chalk.green.bold(`Email: ${getContact.email}`))
        console.log(chalk.green.bold(`No HP: ${getContact.notelp}`))
    }else{
        console.log(chalk.yellow.bold('Argument nama yang anda masukan tidak terdaftar di kontak.'))
    }

}

const deleteContact =(nama)=> {
    const contacts = loadContact();

    if(!nama){
        console.log(chalk.red.bold('Mohon Mengisi argument Nama.'));
        return false;
    }
    
    const getContact = contacts.find((get)=> get.nama.toLowerCase() === nama.toLowerCase());

    if(getContact){
        
        arrayFile = [];
        
        contacts.forEach((data , index)=> {
            if(data.nama.toLowerCase() !== nama.toLowerCase()){
                arrayFile.push(data);
            }
        })
            fs.writeFileSync(contactPath, JSON.stringify(arrayFile));
            console.log(chalk.yellow.bold(`Data bernama ${nama} berhasil dihapus`));

    }else{
        console.log(chalk.yellow.bold('Argument nama yang anda masukan tidak terdaftar di kontak.'));
    }
}

module.exports = { saveCOntact , listContact , detailContact , deleteContact }