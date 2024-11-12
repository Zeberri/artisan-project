const mongoose = require('mongoose');
    Artisan = require('../models/artisan');

    const landingPage = (req, res) => {
        res.render("index");
    }

    const searchArtisanByJobByLocation = (req, res) => {
        const searchParam1 = req.body.searchParam1 || ''; 
        const searchParam2 = req.body.searchParam2 || ''; 
    
        Artisan.find({ $and: [{ job: searchParam1 }, { location: searchParam2 }] })
            .then((results) => {
                res.render('services', { results, searchParam1, searchParam2 });
            })
            .catch((err) => {
                res.redirect('/');
            });
    }
    

    




module.exports = ({landingPage, searchArtisanByJobByLocation, })