'use strict';

const mongoose = require('mongoose');
const Fruit = require('./models/fruit');

mongoose.connect('mongodb://localhost:27017/ajaxsearch', { useNewUrlParser: true });

async function insert() {
    const apple = new Fruit({
        name: 'apple',
        date: Date.now()
    });

    await apple.save();

    const banana = new Fruit({
        name: 'banana',
        date: Date.now()
    });

    await banana.save();

    const avocado = new Fruit({
        name: 'avocado',
        date: Date.now()
    });

    await avocado.save();

    mongoose.disconnect();
}

insert();
