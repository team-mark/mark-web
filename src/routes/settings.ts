import * as express from 'express';
import { localconfig } from '../utils';
const router = express.Router();
module.exports = router;

// Routes
router.get('/', index);

// Route definitions
function index(req: express.Request, res: express.Response, next: express.NextFunction): void {
    res.render('settings', {
        title: 'Mark Settings',
        pageScript: 'settings',
        pageStyle: 'settings',
        environment: JSON.stringify(localconfig.getLocalConfig())
    });
}