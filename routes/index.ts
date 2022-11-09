import { Router } from 'express';
import socialMediaRoute from './social_media.route';
import domainRoute from './domain.route';

const router = Router();

router.use('/social-media', socialMediaRoute);
router.use('/domains', domainRoute);

export default router;
