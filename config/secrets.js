/**
 * IMPORTANT * IMPORTANT * IMPORTANT * IMPORTANT * IMPORTANT * IMPORTANT *
 *
 * You should never commit this file to a public repository on GitHub!
 * All public code on GitHub can be searched, that means anyone can see your
 * uploaded secrets.js file.
 *
 * I did it for your convenience using "throw away" credentials so that
 * all features could work out of the box.
 *
 * Untrack secrets.js before pushing your code to public GitHub repository:
 *
 * git rm --cached config/secrets.js
 *
 * If you have already commited this file to GitHub with your keys, then
 * refer to https://help.github.com/articles/remove-sensitive-data
*/

module.exports = {

  db: process.env.MONGOLAB_URI || process.env.MONGODB || 'mongodb://localhost:27017/test',

  sessionSecret: process.env.SESSION_SECRET || 'JdD89xSia',

  sendgrid: {
    user: process.env.SENDGRID_USER || 'bashmach',
    password: process.env.SENDGRID_PASSWORD
  },

  twitter: {
    consumerKey: process.env.TWITTER_KEY || 'EBRfXTPFBx7IuK0ZRqZzqY6Ek',
    consumerSecret: process.env.TWITTER_SECRET  || 'Njlwpq71GnOkIXDafD4ehTKIXzmV9ZeXrQQo4C7KDZ5ralQ2Xc',
    callbackURL: '/auth/twitter/callback',
    passReqToCallback: true
  },

  stripe: {
    secretKey: process.env.STRIPE_SKEY || 'sk_test_BQokikJOvBiI2HlWgH4olfQ2',
    publishableKey: process.env.STRIPE_PKEY || 'pk_test_6pRNASCoBOKtIshFeQd4XMUh'
  }
};
