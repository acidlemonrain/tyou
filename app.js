const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const { faker } = require('@faker-js/faker')
const swaggerJsdoc = require("swagger-jsdoc"),
    swaggerUi = require("swagger-ui-express");
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
app.use(bodyParser.urlencoded({ extended: false }))
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

app.listen('80')