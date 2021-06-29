const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const { User } = require('../../models');

const jwtAuthOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret'
};

passport.use(
  'jwt-auth',
  new JwtStrategy(
    jwtAuthOptions,
    async (jwt_payload, done) => {
      let user;

      try {
        user = await User.findOne({ where: { id: jwt_payload.sub } });
      } catch (error) {
        return done(error);
      }

      if (user) {
        return done(null, user);
      }

      return done(null, false);
    }
  )
);
