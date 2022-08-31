const readLine = require('readline');
const fs = require('fs');

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
})

const saveCOntact =(nama, email, notelp)=>{
    
    // Membuat Folder Data
    const dirPath = './data';
    if(!fs.existsSync(dirPath)){
        fs.mkdirSync(dirPath);
    }
    
    //Membuat file contacts.json
    const contactPath = './data/contacts.json'
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

        console.log(`Terima Kasih ${nama}. Data anda sudah kami simpan`);
    });

    rl.close();
}

const pertanyaan = (pertanyaan) => {
    return new Promise((resolve , reject)=>{
        rl.question(pertanyaan , (nama) =>{
            resolve(nama)
        });
    });
}

module.exports = { saveCOntact , pertanyaan }