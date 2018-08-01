import { Router } from 'express';
import * as express from 'express';

const router: Router = Router();

const version = 'v0';

const home = require('./home');
const login = require('./login');
const signup = require('./signup');
const settings = require('./settings');
const followers = require('./followers');
// const following = require('/following');
const users = require(`./users`);

router.use('/', home);
router.use('/login', login);
router.use('/signup', signup);
router.use('/settings', settings);
router.use('/followers', followers);
// router.use('/following', following);
router.use('/users', users);
// router.use('/account', users);

router.use('/*', (req: express.Request, res: express.Response) => {
    res.redirect('/');
});

module.exports = router;