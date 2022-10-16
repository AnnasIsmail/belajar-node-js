const fs = require('fs');

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

const addContact = () => {
    
}

module.exports = { loadContact , addContact }