import * as express from 'express';
import { localconfig } from '../utils';
const router = express.Router();
module.exports = router;

// Routes
router.get('/', index);

// Route definitions
function index(req: express.Request, res: express.Response, next: express.NextFunction): void {
    res.render('signup', {
        title: 'Mark Mobile Verification',
        pageScript: 'signup',
<<<<<<< HEAD
        pageStyle: 'signup'
=======
        pageStyle: 'signup',
        environment: JSON.stringify(localconfig.getLocalConfig())
>>>>>>> 005c52338acf8dd02e8e1722becdf9d9ab0a7249
    });
}