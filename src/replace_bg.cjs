const fs = require('fs');
const path = require('path');

const dirPath = __dirname;

const bgRegexes = [
    /\bbg-\[\#020B1D\](?!\/)/g,
    /\bbg-\[\#F8F9FA\](?!\/)/g,
    /\bbg-white(?!\/)/g,
];

const textRegexes = [
    /\btext-\[\#020D21\]/g,
    /\btext-\[\#4B5563\]/g,
    /\btext-gray-\d{3}/g,
    /\btext-black/g,
];

const borderRegexes = [
    /\bborder-\[\#E5E7EB\]/g,
];

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.jsx')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk(dirPath);

files.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    bgRegexes.forEach(reg => {
        content = content.replace(reg, 'bg-transparent');
    });

    textRegexes.forEach(reg => {
        content = content.replace(reg, 'text-white');
    });

    borderRegexes.forEach(reg => {
        content = content.replace(reg, 'border-white/20');
    });

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
    }
});

console.log("Done");
