const port = 3000

const express = require("express");
const app = express();

const db = require('./db')

const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: app,
    noCache: true, 
})

app.use(express.static("public"))
app.use(express.urlencoded({
    extended: true
}))

app.get('/', (req, res) => {

    db.all('SELECT * FROM ideas', function (err, rows) {
        if (err) {
            console.log(err)
            res.send('ERRO NO BANCO DE DADOS')
        }
        let reversedIdeas = [...rows].reverse()

        let lastIdeas = []

        for (let idea of reversedIdeas) {
            if (lastIdeas.length < 3) {
                lastIdeas.push(idea)
            }
        }

        return res.render("index.html", {
            ideas: lastIdeas
        })
    })
})

app.get('/ideias', (req, res) => {

    db.all('SELECT * FROM ideas', function (err, rows) {
        if (err) {
            console.log(err)
            res.send('ERRO NO BANCO DE DADOS')
        }

        const reversedIdeas = [...rows].reverse()
        res.render('ideias.html', { ideas: reversedIdeas})
    })
})

app.post("/", (req, res) => {
    const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES (?,?,?,?,?);`

    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link
    ]

    db.run(query, values, function (err) {
        if (err) {
            console.log(err)
            res.send('ERRO NO BANCO DE DADOS')
        }

        res.redirect("/ideias")
    })
})

app.listen(port, () => {
    console.log(`Server executing at port ${port}`)
}); 