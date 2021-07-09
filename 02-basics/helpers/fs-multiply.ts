import fs = require('fs');

const createFile = async (base: number, limit: number, log: boolean): Promise<string> => {
    try {
        let result = '';
        for (let i = 1; i <= limit; i++)
            result += `${base} x ${i} = ${base * i}\n`;

        if(log) 
        {
            console.log(`
            ---------------------------
            CREATE TEXT FILE (BASE %s)
            ---------------------------
            `, base);
            console.log(result);
        }

        const folder = './output'
        const fileName = `${folder}/01-result-${base}.txt`
        if(!fs.existsSync(folder)) fs.mkdirSync('./output');
        
        fs.writeFileSync(fileName, result);

        return fileName;
    } catch (error) {
        throw error;
    }
}

export {
    createFile
};