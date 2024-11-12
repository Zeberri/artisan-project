
    const express = require('express');
        const router = express.Router();

        const {landingPage, artisanRegistration, artisanRegistrationPost, login, 
                artisanLoginPost, dashboard, logout} = require('../controller/aController');
        

        router.get('/', landingPage);
        router.get('/registration', artisanRegistration);
        router.post('/registration', artisanRegistrationPost);
        router.get('/login', login);
        router.post('/login', artisanLoginPost);
        router.get('/dashboard', dashboard),
        router.get('/logout', logout);
        

        module.exports = router;