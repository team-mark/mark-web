import { Router } from 'express';

const router: Router = Router();

const version = 'v0';

const feed = require(`./feed`);
// const users = require(`./users`);
// const account = require(`./account`);

router.use('/', feed);
// router.use('/users', users);
// router.use('/account', users);

module.exports = router;