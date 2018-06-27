import * as express from 'express';
import { localconfig} from '../utils';
const router = express.Router();
module.exports = router;

// Routes
router.get('/', index);

// Route definitions
function index(req: express.Request, res: express.Response, next: express.NextFunction): void {
    res.render('home', {
        title: 'Feed',
        pageScript: 'home',
        pageStyle: 'home',
        environment: JSON.stringify(localconfig.getLocalConfig())
    });
}
