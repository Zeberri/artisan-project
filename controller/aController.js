 
    const mongoose = require('mongoose');
          bcrypt = require('bcryptjs'),
          multer = require('multer'),
          fs = require('fs'),
          path = require('path'),
          nodemailer = require('nodemailer'),
          Artisan = require('../models/artisan');
          
        
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // Use true for port 465, false for all other ports
            auth: {
                user: "raekenstar7@gmail.com", // sender gmail address
                pass: "mxgw gdcj vksj fpgo" // App password from gmail account
        },
        });
           
          
          

        const landingPage = (req, res) => {
            res.render("index");
        }

        const login = (req, res) => {
          res.render("login");
        }        

        const artisanRegistration = (req, res) => {
            res.render("registration");
        }

        const artisanRegistrationPost = (req, res) => {
            const{cn, phone, email, bn, cacStatus, job, staff, address, location, url, username, pass1, pass2} = req.body;

            let errors = [];

            if(!cn || !phone || !email || !bn || !cacStatus || !job || !staff || !address || !location || !url || !username || !pass1 || !pass2) {
                errors.push({msg:"Please ensure all fields are filled"})
            }
            if(pass1 !== pass2) {
                errors.push({msg:"Passwords do not match"});
            }
            if(pass1.length < 6) {
                errors.push({msg:"Passwords shold be at least 6 characters"});
            }

            if(errors.length > 0) {
                res.render("registration", {errors, cn, phone, email, bn, cacStatus, job, staff, address, location, url, username, pass1, pass2})
            } else {
                //WE DONT WANT TO HAVE 2 USERS WITH THE SAME EMAIL
                Artisan.findOne({email:email, username:username})
                .then((result) => {
                  if(result) {
                    errors.push({msg: "Username/Email already exists"});
                    res.render("registration", {errors, cn, phone, email, bn, cacStatus, job, staff, address, location, url, username, pass1, pass2})
                  } else {
                    //WE ENCRYPT OUR PASSWORD
                    bcrypt.hash(pass1, 10, (error, hash) => {
                      const newArtisan = new Artisan({
                        cn, phone, email, bn, cacStatus, job, staff, address, location, url, username, password:hash,
                      })
                      try{
                        newArtisan.save();
                        req.flash('message', 'Registration successful. You can now login');
                        res.redirect("/login")
                      }
                      catch(err){
                        req.flash('error_msg', "could not save into the Database");
                      }

                      let msg = "Dear " + cn + ", your registration with our company is now successful."
                                "Please be reminded that we take 10% of all your earnings." 
                                "Thank you";

                      const mailOptions = {
                        from: "raekenstar7@gmail.com",
                        to: email,
                        subject: "Registration successful",
                        text:msg,

                    }

                    transporter.sendMail(mailOptions, (error, info) => {
                      if(error) {
                          console.log(error);
                      } else {
                          console.log("Email sent: " + info.response)
                      }
                  });
                  
                    })
                  }
                })
                .catch((err) => {
                  res.send("There's a problem");
                  console.log(err);
                })
              }
        }


        const artisanLoginPost = (req, res) => {
          const{username, password} = req.body;
          Artisan.findOne({username:username})
          .then((result) => {
            if(!result) {
              req.flash('error_msg', "This username does not exist");
              res.redirect('/login');
            } else {
              bcrypt.compare(password, result.password, (err, isVerified) => {
                if(err) {
                  req.flash('error_msg', "Something is wrong" + err);
                  res.redirect('/login');
                }
                if(isVerified) {
                  req.session.artisan_id = result._id;
                  req.session.username = result.username;

                  //BELOW WE REDIRECT INTO THE DASHBOARD ROUTE
                  res.redirect('/dashboard')
                } else {
                  req.flash('error_msg', "Invalid Password");
                  res.redirect('/login')
                }
              })
            }
          })
          .catch((err) => {
            req.flash('error_msg', "There was a problem selecting form the DB");
            res.redirect('/login');
          })
      }

      const dashboard = (req, res) => {
        if(!req.session.artisan_id && !req.session.username) {
          res.redirect('/login');
        } else {
          const aid = req.session.artisan_id;
          const uname = req.session.username;

          res.render('dashboard', {aid, uname})
        }
      } 

      const logout = (req, res) => {
        if(!req.session.artisan_id && !req.session.username) {
            req.flash('error_msg', 'Please login to access app');
            res.redirect('/login');
          } else {
  
              req.session.destroy();
              res.redirect('/login');
          }
    }

      




        module.exports = ({landingPage, artisanRegistration, artisanRegistrationPost, login, artisanLoginPost, dashboard, logout})