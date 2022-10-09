// Mengambil argument

// console.log(process.argv[2]);


const yargs = require("yargs");
const { saveCOntact } = require("./contacs");

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
  }
});

yargs.parse();
