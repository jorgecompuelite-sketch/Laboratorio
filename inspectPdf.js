import { PDFDocument } from 'pdf-lib';
import fs from 'fs';

async function run() {
  const bytes = fs.readFileSync('public/ORDENE_DE_PRODUCCION.pdf');
  const pdfDoc = await PDFDocument.load(bytes);
  const form = pdfDoc.getForm();
  const fields = form.getFields();
  
  console.log(`Found ${fields.length} form fields.`);
  fields.forEach(field => {
    const type = field.constructor.name;
    const name = field.getName();
    console.log(`${type}: ${name}`);
  });
}

run().catch(console.error);
