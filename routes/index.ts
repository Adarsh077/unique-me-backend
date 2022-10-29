import { Router } from 'express';
import todoRoute from './todo.route';
import socialMediaRoute from './social_media.route';
import domainRoute from './domain.route';

const router = Router();

/**
 * This is an example of public 🔓 route where the authentication
 * is not required to call the endpoint.
 *
 * Example: Login/Register Routes
 */
// router.use('/public', require('./public.route'));

/**
 * Here is the middelware where the request authentication 🔐 is performed
 *
 * NOTE: All the protected routes should be written below this middleware
 */
// router.use((req,res, next) => {
//   // Authenticate request.
// })

/**
 * All the protected 🔒 Routes 👇
 */
router.use('/todo', todoRoute);
router.use('/social-media', socialMediaRoute);
router.use('/domains', domainRoute);

export default router;
