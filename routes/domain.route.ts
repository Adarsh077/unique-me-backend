import { Router } from 'express';

import { domainController } from '../controllers';

const router = Router();

/**
 * @openapi
 * /v1/domains:
 *  post:
 *    tags:
 *      - v1
 *    summary: Check if domains is available
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              domains:
 *                type: array
 *                items:
 *                  type: string
 *                description: List of domains to search for.
 *                example:
 *                  - "adarsh.com"
 *                  - "akshat.com"
 *                  - "taher.com"
 *                  - "jainam.com"
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
 *                  enum:
 *                    - success
 *                    - fail
 *                  example: success
 *                body:
 *                  type: object
 *                  properties:
 *                    domains:
 *                      type: object
 *                      properties:
 *                        available:
 *                          type: boolean
 *                          description: Whether or not the domain name is available
 *                        currency:
 *                          type: string
 *                          default: USD
 *                        domain:
 *                          type: string
 *                          description: Domain Name
 *                        period:
 *                          type: number
 *                          description: Number of years included in the price. Only returned if tld is offered
 *                        price:
 *                          type: number
 *                          description: Price of the domain excluding taxes or fees. Only returned if tld is offered
 *                      required:
 *                        - available
 *                        - domain
 *                    errors:
 *                      type: object
 *                      description: List of domains where error occured while Checking Availability
 *                      properties:
 *                        code:
 *                          type: string
 *                          description: Short identifier for the error, suitable for indicating the specific error within client code
 *                        domain:
 *                          type: string
 *                          description: Domain name
 *                        message:
 *                          type: string
 *                          description: Human-readable, English description of the error
 *                      required:
 *                        - code
 *                        - domain
 */
router.post('/', domainController.checkDomainsAvailability);

export default router;
