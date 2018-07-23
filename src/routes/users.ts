import * as express from 'express';
import { localconfig } from '../utils';
const router = express.Router();
module.exports = router;

// Routes
router.get('/:handle', userProfile);

// Route definitions
function userProfile(req: express.Request, res: express.Response, next: express.NextFunction): void {
    const { handle } = req.params;
    res.render('profile', {
        title: 'Mark Settings',
        pageScript: 'settings',
        pageStyle: 'settings',
        environment: JSON.stringify(localconfig.getLocalConfig())
    });
}