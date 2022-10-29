import { Request, Response } from 'express';
import { domainService } from '../services';
import { catchAsync } from '../utils';

export const checkDomainsAvailability = catchAsync(
  async (req: Request, res: Response) => {
    const { domains } = req.body;

    const response = await domainService.checkDomainsAvailability({
      domains,
    });

    res.send({
      status: 'success',
      body: response,
    });
  }
);
