// Mengambil argument

// console.log(process.argv[2]);


const yargs = require("yargs");
const { saveCOntact , listContact , detailContact , deleteContact } = require("./contacs");

// yargs.command('add' , 'nambah kontak',()=>{} ,(arg)=>{
//   console.log(arg.nama);}
// );

// console.log(yargs.argv);


yargs.command({
  command: 'add',
  describe: 'add New Contact',
  builder: {
    nama:{
      describe: 'Full Name',
      demandOption: true,
      type: 'string'
    },
    email:{
      describe: 'Email',
      demandOption: false,
      type: 'string'
    },
    noHP:{
      describe: 'Number Phone',
      demandOption: true,
      type: 'string'
    },
  },
  handler(arg){
    // const contact = {
    //   nama: arg.nama,
    //   email: arg.email,
    //   noHP: arg.noHP
    // }
    // console.log(contact);
    saveCOntact(arg.nama,arg.email,arg.noHP)
  },
}).demandCommand();

//Menampilkan seluruh isi kontak
yargs.command({
  command: 'list',
  describe: 'Menampilkan seluruh isi file JSON',
  builder: {
    nama:{
      describe: 'Full Name',
      demandOption: true,
      type: 'string'
    },
  },
  handler(){
    listContact();
  },
});

//Menampilkan seluruh isi detail kontak
yargs.command({
  command: 'detailContact',
  describe: 'Menampilkan detail sebuah kontak',
  handler(arg){
    detailContact(arg.nama);
  },
});

//Menampilkan seluruh isi delete detail kontak
yargs.command({
  command: 'delete',
  describe: 'Menghapus detail sebuah kontak',
  handler(arg){
    deleteContact(arg.nama);
  },
});

yargs.parse();
