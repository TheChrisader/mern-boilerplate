const passport = require("passport");
const { ExtractJwt } = require("passport-jwt");
const JWTStrategy = require("passport-jwt").Strategy;

const UserModel = require("../models/User.model");
const config = require("./config");

const JWT_SEC = { config };

const options = {};

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = JWT_SEC;

passport.use(
  new JWTStrategy(options, (jwt_payload, done) => {
    UserModel.findOne({ id: jwt_payload.sub }, (err, user) => {
      if (err) return done(err, false);
      if (user) return done(null, user);
      return done(null, false);
    });
  })
);
