const client = require('../oauth');
const express = require('express');
const router = express.Router();
const verify = async (req, res, next) => {
 if (req.cookies['user-key']) {
  try {
   const validity = client.checkValidity(req.cookies['user-key']);
   if (validity.expired) {
    const newKey = await client.refreshToken(req.cookies['user-key']);
    res.cookie('user-key', newKey);
   }
   next();
  } catch (err) {
   res.cookie('user-key', 'deleted', { maxAge: -1 });
   res.redirect('/');
  }
 } else res.redirect('/');
}

router.get('/', async (req, res) => {
 if (req.cookies['user-key']) {
  try {
   const keyValidity = client.checkValidity(req.cookies['user-key']);
   if (keyValidity.expired) {
    const newKey = await client.refreshToken(req.cookies['user-key']);
    res.cookie('user-key', newKey);
    res.redirect('/home');
   } else {
    res.redirect('/home');
   }
  } catch (err) {
   console.error(err);
   const { link, state } = client.auth;
   res.cookie('user-key', 'deleted', { maxAge: -1 });
   res.cookie('user-state', state);
   res.render('index', { title: 'Scratch For Discord', link });
  }
 } else {
  const { link, state } = client.auth;
  res.cookie('user-state', state);
  res.render('index', { title: 'Scratch For Discord', link });
 }
});

router.get('/profile', verify, async (req, res) => {
  const user = await client.users.fetch(req.cookies['user-key']);
  res.render('profile', { title: 'Profile- S4D', user });
});

router.get('/home', verify, async (req, res) => {
  const user = await client.users.fetch(req.cookies['user-key']);
  res.render('home', { title: 'Home - S4D', user });
});

router.get('/login', async (req, res) => {
 if (req.query.state && req.query.code && req.cookies['user-state']) {
  if (req.query.state === req.cookies['user-state']) {
   const userKey = await client.getAccess(req.query.code).catch(console.error);
   res.cookie('user-state', 'deleted', { maxAge: -1 });
   res.cookie('user-key', userKey);
   res.redirect('/');
  } else {
   res.send('States do not match. Nice try hackerman!');
  }
 } else {
  res.send('Invalid login request.');
 }
});

router.get('/logout', (req, res) => {
  res.cookie('user-key', 'deleted', { maxAge: -1 });
  res.redirect('/');
});

module.exports = router;