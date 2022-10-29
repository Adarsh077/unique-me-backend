import { Request, Response } from 'express';
import { socialMediaService } from '../services';
import { catchAsync } from '../utils';

export const checkInstagramAvailability = catchAsync(
  async (req: Request, res: Response) => {
    const { username } = req.body;

    const response = await socialMediaService.instagramAvailability({
      username,
    });

    res.send({
      status: 'success',
      body: response,
    });
  }
);

export const checkFacebookAvailability = catchAsync(
  async (req: Request, res: Response) => {
    const { username } = req.body;

    const response = await socialMediaService.facebookAvailability({
      username,
    });

    res.send({
      status: 'success',
      body: response,
    });
  }
);

export const checkRedditAvailability = catchAsync(
  async (req: Request, res: Response) => {
    const { username } = req.body;

    const response = await socialMediaService.redditAvailability({
      username,
    });

    res.send({
      status: 'success',
      body: response,
    });
  }
);

export const checkYoutubeAvailability = catchAsync(
  async (req: Request, res: Response) => {
    const { username } = req.body;

    const response = await socialMediaService.youtubeAvailability({
      username,
    });

    res.send({
      status: 'success',
      body: response,
    });
  }
);

export const checkTwitterAvailability = catchAsync(
  async (req: Request, res: Response) => {
    const { username } = req.body;

    const response = await socialMediaService.twitterAvailability({
      username,
    });

    res.send({
      status: 'success',
      body: response,
    });
  }
);

export const checkTwitchAvailability = catchAsync(
  async (req: Request, res: Response) => {
    const { username } = req.body;

    const response = await socialMediaService.twitchAvailability({
      username,
    });

    res.send({
      status: 'success',
      body: response,
    });
  }
);

export const checkGithubAvailability = catchAsync(
  async (req: Request, res: Response) => {
    const { username } = req.body;

    const response = await socialMediaService.githubAvailability({
      username,
    });

    res.send({
      status: 'success',
      body: response,
    });
  }
);
