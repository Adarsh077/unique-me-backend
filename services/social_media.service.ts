import {
  ISocialMediaAvailabilityArgs,
  ISocialMediaAvailabilityReturn,
} from '../interfaces';
import { AppError } from '../utils';
import PuppeteerService from './puppeteer.service';

export const instagramAvailability = async (
  data: ISocialMediaAvailabilityArgs
): Promise<ISocialMediaAvailabilityReturn> => {
  const { username } = data;

  const instagramTab = await PuppeteerService.openNewTab();

  await instagramTab.goto(`https://www.instagram.com/${username}`, {
    timeout: 0,
  });

  const h2 = await instagramTab.waitForSelector('h2');

  if (!h2) {
    instagramTab.browser().close();
    return { error: true };
  }

  const text: string = await h2.evaluate((ele: any) => ele.textContent);

  if (text.trim() === username) {
    instagramTab.browser().close();
    return { available: false, url: instagramTab.url() };
  }

  if (text.includes("Sorry, this page isn't available.")) {
    instagramTab.browser().close();
    return { available: true, url: null };
  }

  instagramTab.browser().close();
  return { error: true };
};

export const facebookAvailability = async (
  data: ISocialMediaAvailabilityArgs
): Promise<ISocialMediaAvailabilityReturn> => {
  const { username } = data;

  const facebookTab = await PuppeteerService.openNewTab();

  await facebookTab.goto(`https://www.facebook.com/${username}`, {
    timeout: 0,
  });

  await facebookTab.waitForSelector('h2');
  const h2 = await facebookTab.$$('h2');

  if (!h2) {
    facebookTab.browser().close();
    return { error: true };
  }

  if (h2.length === 1) {
    const text: string = await h2[0].evaluate((ele: any) => ele.textContent);

    if (text === "This page isn't available") {
      facebookTab.browser().close();
      return { available: true, url: null };
    }
  }

  facebookTab.browser().close();
  return { available: false, url: facebookTab.url() };
};

export const redditAvailability = async (
  data: ISocialMediaAvailabilityArgs
): Promise<ISocialMediaAvailabilityReturn> => {
  const { username } = data;

  const redditTab = await PuppeteerService.openNewTab();

  await redditTab.goto(`https://www.reddit.com/user/${username}`, {
    timeout: 0,
  });

  const body = await redditTab.waitForSelector('body');

  if (!body) {
    redditTab.browser().close();
    return { error: true };
  }

  const text: string = await body.evaluate((ele: any) => ele.textContent);

  if (text.includes('Sorry, nobody on Reddit goes by that name.')) {
    redditTab.browser().close();
    return { available: true, url: null };
  }

  redditTab.browser().close();
  return { available: false, url: redditTab.url() };
};

export const youtubeAvailability = async (
  data: ISocialMediaAvailabilityArgs
): Promise<ISocialMediaAvailabilityReturn> => {
  const { username } = data;

  const youtubeTab = await PuppeteerService.openNewTab();

  await youtubeTab.goto(`https://www.youtube.com/c/${username}`, {
    timeout: 0,
  });

  const iframe = await youtubeTab.waitForSelector('body iframe');

  if (!iframe) {
    youtubeTab.browser().close();
    return { error: true };
  }
  const src = await iframe.evaluate((ele) => ele.getAttribute('src'));

  if (!src) {
    youtubeTab.browser().close();
    return { error: true };
  }

  if (src.includes('/error?src')) {
    youtubeTab.browser().close();
    return { available: true, url: null };
  }

  youtubeTab.browser().close();
  return { available: false, url: youtubeTab.url() };
};

export const twitterAvailability = async (
  data: ISocialMediaAvailabilityArgs
): Promise<ISocialMediaAvailabilityReturn> => {
  const { username } = data;

  const twitterTab = await PuppeteerService.openNewTab();

  await twitterTab.goto(`https://twitter.com/${username}`, {
    waitUntil: 'networkidle2',
  });

  const body = await twitterTab.waitForSelector('body');

  if (!body) {
    twitterTab.browser().close();
    return { error: true };
  }

  const text: string = await body.evaluate((ele: any) => ele.textContent);

  if (text.includes(`@${username}`)) {
    twitterTab.browser().close();
    return { available: false, url: twitterTab.url() };
  }

  if (text.includes('Try searching for something else.')) {
    twitterTab.browser().close();
    return { available: true, url: null };
  }

  twitterTab.browser().close();
  return { error: true };
};

export const twitchAvailability = async (
  data: ISocialMediaAvailabilityArgs
): Promise<ISocialMediaAvailabilityReturn> => {
  const { username } = data;

  const twitterTab = await PuppeteerService.openNewTab();

  await twitterTab.goto(`https://www.twitch.tv/${username}`);

  const element = await Promise.race([
    twitterTab.waitForSelector('h1'),
    twitterTab.waitForSelector('[data-a-target="core-error-message"]'),
  ]);

  if (!element) {
    twitterTab.browser().close();
    return { error: true };
  }

  const text: string = (await (
    await element.getProperty('textContent')
  ).jsonValue()) as string;

  if (text.includes(`${username}`)) {
    twitterTab.browser().close();
    return { available: false, url: twitterTab.url() };
  }

  if (text.includes('that content is unavailable.')) {
    twitterTab.browser().close();
    return { available: true, url: null };
  }

  twitterTab.browser().close();
  return { error: true };
};

export const githubAvailability = async (
  data: ISocialMediaAvailabilityArgs
): Promise<ISocialMediaAvailabilityReturn> => {
  const { username } = data;

  if (username.includes('.')) {
    return { error: true };
  }

  const githubTab = await PuppeteerService.openNewTab();

  await githubTab.goto(`https://github.com/${username}`);

  const element = await Promise.race([
    githubTab.waitForSelector('img[alt~="404"]'),
    githubTab.waitForSelector('h1.vcard-names'),
  ]);

  if (!element) {
    githubTab.browser().close();
    return { error: true };
  }

  const text: string = (await (
    await element.getProperty('textContent')
  ).jsonValue()) as string;

  if (text.toLowerCase().includes(`${username}`)) {
    githubTab.browser().close();
    return { available: false, url: githubTab.url() };
  }

  githubTab.browser().close();
  return { available: true, url: null };
};
