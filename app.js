const express = require('express')
const app = express()
const cors = require('cors')
var bodyParser = require('body-parser')
const { faker } = require('@faker-js/faker')
const swaggerJsdoc = require("swagger-jsdoc"),
    swaggerUi = require("swagger-ui-express");
const { v4: uuidv4 } = require('uuid');
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "LogRocket Express API with Swagger",
            version: "0.1.0",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },

        },
        servers: [
            {
                url: "http://localhost",
            },
        ],
    },
    apis: ["./routes/books.js"],
};
const specs = swaggerJsdoc(options);
const cache = {

}
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
);

const getItem = () => {
    const post = {
        title: faker.animal.crocodilia(),
        avatar: faker.image.avatar(),
        vote: Math.ceil(Math.random() * 2000),
        image: faker.image.abstract(500, 700)
    }
    return post
}

function getList(num) {
    let m = []
    for (let i = 0; i < num; i++) {
        m.push(getItem())
    }
    return m
}


app.get('/list', (req, res) => {
    res.json({
        code: 200,
        message: 'success',
        data: getList(req?.query?.pageSize || 8)
    })
})

app.post('/mind', (req, res) => {
    console.log(req.body.data);
    const id = uuidv4()
    cache[id] = {
        data: req.body.data,
        time: Math.ceil(new Date() / 1000)
    }
    console.log(cache);
    res.json({
        id: id,
        cache: cache
    })
})
app.get('/mind', (req, res) => {
    res.json({
        data: cache[req.query.id],

    })
})

setInterval(() => {
    for (let prop in cache) {
        const time = cache[prop]['time']
        const delta = Math.ceil(new Date() / 1000) - time
        if (delta > 60 * 60 * 24 * 30) {
            cache[prop] = null
        }
    }
}, 1000 * 60 * 60 * 24);

app.listen('80')