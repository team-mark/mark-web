import { Router } from 'express';

const router: Router = Router();

const version = 'v0';

const feed = require(`./feed`);
const login = require('./login');
const signup = require('./signup');
// const users = require(`./users`);
// const account = require(`./account`);

router.use('/', feed);
router.use('/login', login);
router.use('/signup', signup);
// router.use('/users', users);
// router.use('/account', users);

module.exports = router;