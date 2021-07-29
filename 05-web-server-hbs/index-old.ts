require('module-alias/register')

const http = require('http');

const examplePlainText = (res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    
    res.write('HelloWorld');
    res.end();
}

const exampleJson = (res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });

    const employee = {
        id: 550104,
        name: 'Michael B'
    };

    res.write(JSON.stringify(employee));
    res.end();
}

const exampleCsv = (res) => {
    res.setHeader('Content-Disposition', 'attachment; filename="Employee list.csv"');
    res.writeHead(200, { 'Content-Type': 'application/csv' });

    res.write('id,Employee name\n');
    res.write('1,Michael B\n');
    res.write('2,Bryan A\n');
    res.write('3,Karina J\n');
    res.end();
}

http.createServer((req, res) => {
    exampleCsv(res);
}).listen(9988);