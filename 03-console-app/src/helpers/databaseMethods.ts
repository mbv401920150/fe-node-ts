import fs from 'fs'

const filePath = 'src/db/data.json';

const saveDb = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

const readDb = () => {
    if (!fs.existsSync(filePath))
        return [];

    const data = fs.readFileSync(filePath, { encoding: 'utf-8' });
    return JSON.parse(data);
}

export { saveDb, readDb }