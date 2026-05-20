const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

async function check() {
  const pdfBytes = fs.readFileSync('public/ORDENE_DE_PRODUCCION.pdf');
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const form = pdfDoc.getForm();
  const fields = form.getFields();
  console.log('Number of fields:', fields.length);
  fields.forEach(f => console.log(f.getName(), f.constructor.name));
}

check();
