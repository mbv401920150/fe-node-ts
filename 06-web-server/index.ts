require('module-alias/register');
require('dotenv').config();

const PORT = process.env.PORT;

const express = require('express');
const app = express();
const hbs = require('hbs');

hbs.registerPartials(__dirname + '/views/partials');

// Allow to use any content in public folder
// The default address will be replaced by public/index.html (If exists)
//  app.get('/', () => {});
app.use(express.static('public'));
app.set('view engine', 'hbs');

app.get('/examplePlainText', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    res.write('HelloWorld');
    res.end();
});

app.get('/exampleJSON', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });

    const employee = {
        id: 550104,
        name: 'Michael B'
    };

    res.write(JSON.stringify(employee));
    res.end();
})

app.get('/exampleCSV', (req, res) => {
    res.setHeader('Content-Disposition', 'attachment; filename="Employee list.csv"');
    res.writeHead(200, { 'Content-Type': 'application/csv' });

    res.write('id,Employee name\n');
    res.write('1,Michael B\n');
    res.write('2,Bryan A\n');
    res.write('3,Karina J\n');
    res.end();
})

app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/public/index.html');

    // Render the views/home.hbs
    res.render('home', {
        name: 'Michael',
        templateTitle: 'Template home'
    });
});

app.get('/generic', (req, res) => {
    res.render('generic');
});

app.get('/elements', (req, res) => {
    res.render('elements');
});

app.get('*', (req, res) => {
    res.render('404');
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
})
