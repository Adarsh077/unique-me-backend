import { Router } from 'express';

import { socialMediaController } from '../controllers';

const router = Router();

/**
 * @openapi
 * /social-media/{platform}:
 *  post:
 *    tags:
 *      - v1
 *    summary: Check if username is available
 *    description: Check if username is available
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *                description: username to search for.
 *                example: adarsh_senghani
 *    parameters:
 *      - in: path
 *        name: platform
 *        required: true
 *        description: Name of the platform to perform search on
 *        schema:
 *          type: string
 *          enum: [ "instagram", "facebook", "reddit"]
 *    responses:
 *      200:
 *        description: Availablity Status
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: success
 *                body:
 *                  type: object
 *                  properties:
 *                    available:
 *                      type: boolean
 *                      description: Self explan...
 *                      example: false
 *                    url:
 *                      type: string
 *                      description: Link to existing social media handle
 *                      example: https://github.com/Adarsh077
 *                    error:
 *                      type: boolean
 *                      description: true is cannot check the availability for unknown reason.
 */
router
  .post('/instagram', socialMediaController.checkInstagramAvailability)
  .post('/facebook', socialMediaController.checkFacebookAvailability)
  .post('/reddit', socialMediaController.checkRedditAvailability)
  .post('/youtube', socialMediaController.checkYoutubeAvailability)
  .post('/twitter', socialMediaController.checkTwitterAvailability)
  .post('/twitch', socialMediaController.checkTwitchAvailability)
  .post('/github', socialMediaController.checkGithubAvailability);

export default router;
