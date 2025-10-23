const express = require('express');
const router = express.Router();
const { ModelMethods } = require('./methods');

const modelMethods = new ModelMethods();

router.post('/', async (req, res) => {
    try {
        let result = await modelMethods.create(req.body);
        res.status(201).send(result);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
})

router.get('/', async (req, res) => {
    try {
        let result = await modelMethods.getAll();
        res.send(result);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});

router.get('/:id', async (req, res) => {
    try {
        let result = await modelMethods.getById(req.params.id);
        res.send(result);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});

router.get('/employerOffers/:userId', async (req, res) => {
    try {
        let result = await modelMethods.getEmployerOffers(req.params.userId);
        res.send(result);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});

router.get('/workerOffers/:userId', async (req, res) => {
    try {
        let result = await modelMethods.getWorkerOffers(req.params.userId);
        res.send(result);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});

router.put('/accept/:id', async (req, res) => {
    try {
        req.body.status = 'inProgress';
        let result = await modelMethods.update(req.params.id, req.body);
        res.send(result);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});

router.put('/reject/:id', async (req, res) => {
    try {
        req.body.status = 'rejected';
        let result = await modelMethods.update(req.params.id, req.body);
        res.send(result);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});

router.put('/finish/:id', async (req, res) => {
    try {
        let result = await modelMethods.completeWork(req.params.id, req.body);
        res.send(result);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});

router.put('/:id', async (req, res) => {
    try {
        let result = await modelMethods.update(req.params.id, req.body);
        res.send(result);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let result = await modelMethods.delete(req.params.id);
        res.send(result);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});

module.exports = {
    router
};