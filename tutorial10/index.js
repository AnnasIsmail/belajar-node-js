const { saveCOntact, pertanyaan } = require('./contacs');

const main = async () => {
    const nama = await pertanyaan('Masukan Nama Anda: ');
    const email = await pertanyaan('Masukan Email Anda: ');
    const notelp = await pertanyaan('Masukan Nomor Handphone Anda: ');

  saveCOntact(nama, email, notelp);
}

main();
