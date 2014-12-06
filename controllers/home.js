/**
 * GET /
 * Home page.
 */

exports.index = function(req, res) {
    console.log('ah?');
    
  res.render('home', {
    title: 'Home'
  });
};
