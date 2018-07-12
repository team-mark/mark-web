import { Router } from 'express';

const router: Router = Router();

const version = 'v0';

const home = require('./home');
const login = require('./login');
const signup = require('./signup');
const settings = require('./settings');
const followers = require('./followers');
// const following = require('/following');
// const users = require(`./users`);
// const account = require(`./account`);

router.use('/', home);
router.use('/login', login);
router.use('/signup', signup);
router.use('/settings', settings);
router.use('/followers', followers);
// router.use('/following', following);
// router.use('/users', users);
// router.use('/account', users);

module.exports = router;