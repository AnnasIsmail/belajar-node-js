
function printConsole(){
    console.log('node js ku');
}

const name = "Annas";

const identifier = {
    nama: 'Annas Ismail Muhammad',
    umur: 12,
    printIdentifier(){
        return `Halo nama saya ${this.nama} umur saya ${this.umur}`;
    }
}

class classIdentifier{
    constructor(){
        console.log('Ini Class Identifier')
    }
}

module.exports.printConsole = printConsole;
module.exports.name = name;
module.exports.identifier = identifier;
module.exports.classIdentifier = classIdentifier;
