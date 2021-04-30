const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const https = require('https');
const auth = require('http-auth');
const port = 3000;
const { check, validationResult } = require('express-validator');




const router = express.Router();
const Registration = mongoose.model('Registration');
const basic = auth.basic({
    file: path.join(__dirname, '../users.htpasswd'),
});

router.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

router.get('/register', (req, res) => {
    res.render('register', { title: 'Registration form' });
    res.send(allTodos());
});

router.get('/thankyou', (req, res) => {
    res.render('thankyou', { title: 'Thank You Message' });
});

router.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact' });
});

router.get('/classes', (req, res) => {
    res.render('classes', { title: 'Classes' });
});

router.get('/registrants', basic.check((req, res) => {
    Registration.find()
    .then((registrations) => {
        res.render('registrants', { title: 'Listing registrations', registrations });
    })
    .catch((err) => {
        console.log(err);
        res.send('Sorry! Something went wrong.');
    });
}));

router.post('/', 
    [
        check('name')
        .isLength({ min: 1 })
        .withMessage('Please enter a name'),
        check('email')
        .isLength({ min: 1 })
        .withMessage('Please enter an email'),
    ],
    (req, res) => {
        //console.log(req.body);
        const errors = validationResult(req);
        if (errors.isEmpty()) {
          const registration = new Registration(req.body);
          registration.save()
            .then(() => {res.send('Thank you for your registration!');})
            .catch((err) => {
              console.log(err);
              res.send('Sorry! Something went wrong.');
            });
          } else {
            res.render('form', { 
                title: 'Registration form',
                errors: errors.array(),
                data: req.body,
             });
          }
    });

    function allTodos() {
        return [{
            id: 1,
            name: "Finished loading"
        }]
    }

module.exports = router;