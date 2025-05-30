const fs = require('fs');
const path = require('path');

function generateRandomNumber(digits) {
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomAmount(min = -100, max = 10000000) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateCSVLine(from, to, amount) {
    return `${from};${to};${amount}`;
}

function generateCSVLines(linesCount) {
    const lines = ['from;to;amount'];
    const entries = [];

    for (let i = 0; i < 2; i++) {
        const from = generateRandomNumber(13);
        const to = generateRandomNumber(13);
        const amount = generateRandomAmount(-100, -1);
        entries.push({ from, to, amount });
    }

    for (let i = 0; i < 3; i++) {
        const from = generateRandomNumber(13);
        const to = generateRandomNumber(13);
        const amount = generateRandomAmount(-100, 4999999);
        entries.push({ from, to, amount });
    }

    const dupFrom = generateRandomNumber(13);
    const dupTo = generateRandomNumber(13);
    const dupAmount = generateRandomAmount(-100, 10000000);
    const duplicatedEntry = { from: dupFrom, to: dupTo, amount: dupAmount };

    entries.push(duplicatedEntry);
    entries.push(duplicatedEntry);

    while (entries.length < linesCount) {
        const from = generateRandomNumber(13);
        const to = generateRandomNumber(13);
        const amount = generateRandomAmount(-100, 10000000);
        entries.push({ from, to, amount });
    }

    shuffleArray(entries);

    for (const entry of entries) {
        lines.push(generateCSVLine(entry.from, entry.to, entry.amount));
    }

    return lines.join('\n');
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const arg1 = process.argv[2];
const arg2 = process.argv[3];

let linesCount;
let outputFile;

if (!arg1) {
    linesCount = 100;
} else if (arg1.endsWith('.csv')) {
    linesCount = 100;
    outputFile = arg1;
} else {
    const parsed = parseInt(arg1, 10);
    if (isNaN(parsed)) {
        console.error('Por favor, forneça um número válido de linhas como argumento.');
        process.exit(1);
    }
    linesCount = parsed;
    if (arg2) {
        outputFile = arg2;
    }
}

if (linesCount < 7) {
    console.warn('Número de linhas ajustado para 7, para garantir as condições.');
    linesCount = 7;
}

const csvContent = generateCSVLines(linesCount);

if (outputFile) {
    const dir = path.join(__dirname, 'filesForTests');

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    const outputPath = path.join(dir, outputFile);

    fs.writeFile(outputPath, csvContent, 'utf8', (err) => {
        if (err) {
            console.error('Erro ao salvar o arquivo:', err);
            process.exit(1);
        } else {
            console.log(`Arquivo CSV salvo com sucesso em: ${outputPath}`);
        }
    });
} else {
    console.log(csvContent);
}
