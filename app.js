const express = require('express')
const app = express()
const { faker } = require('@faker-js/faker')

const getItem = () => {
    const post = {
        title: faker.animal.crocodilia(),
        avatar: faker.image.avatar(),
        vote: Math.ceil(Math.random() * 2000),
        image: faker.image.abstract(500, 700)
    }
    return post
}

function getList() {
    let m = []
    for (let i = 0; i < 5; i++) {
        m.push(getItem())
    }
    return m
}


app.get('/list', (req, res) => {
    res.json({
        data: getList()
    })
})

app.listen('80')