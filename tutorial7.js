const fs = require('fs');

// Menuliskan string kedalam file 
// fs.writeFileSync('test.txt', 'Hello World');

// try {
//     fs.writeFileSync('data/test.txt', 'Hello World');
// } catch (error) {
//     console.log(error);    
// }

// fs.writeFile('data/test.txt', 'Hello World' , (error)=>{
//     console.log(error);    
// });

// console.log(fs.readFileSync('data/test.txt', 'utf-8'));

// fs.readFile('data/test.txt', 'utf-8', (err , data) => {
//     if (err){ throw err};
//     console.log(data);
// });

// Readline

const readLine = require('readline');
const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
})

// rl.question('masukan nama anda?' , (nama) =>{
//     rl.question('masukan notelp anda?' , (notelp) =>{
//         console.log(`terima kasih ${nama} dan bernomer telp ${notelp}`);
//         rl.close();
//     });
// });

rl.question('masukan nama anda: ' , (nama) =>{
    rl.question('masukan notelp anda: ' , (notelp) =>{

        arrayFile = [];
        fs.readFile('data/test.json', 'utf-8', (err , data) => {
            if (err){ throw err};
            arrayFile = JSON.parse(data);
            objectToPush = {
                nama: nama , notelp: notelp
            }
            
            arrayFile.push(objectToPush);
    
            fs.writeFileSync('data/test.json', JSON.stringify(arrayFile));

            console.log(`Terima Kasih ${nama}. Data anda sudah kami simpan`);
        });


        rl.close();
    });
});