"use strict";

const bodyParser = require("body-parser");
const config = require("./config.js");
const express = require("express");
const app = express();

// Use the EJS template engine
app.set("view engine", "ejs");

const passport = require("passport");
const auth = require("./auth");
auth(passport);

app.use(bodyParser.json());

// Parse application/xwww-form-urlencoded request data.
app.use(bodyParser.urlencoded({ extended: true }));

// Set up passport and session handling.
app.use(passport.initialize());
app.use(passport.session());

app.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: config.scopes,
    failureFlash: true, // Display errors to the user.
    session: true
  }),
  (req, res) => {
    res.end("Success");
  }
);

// Callback receiver for the OAuth process after log in.
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    failureFlash: true,
    session: true
  }),
  (req, res) => {
    // User has logged in.
    logger.info("User has logged in.");
    res.redirect("/");
  }
);
