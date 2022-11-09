import puppeteer from 'puppeteer';

class PuppeteerService {
  private launchBrowser = async () => {
    return await puppeteer.launch({ headless: true });
  };

  /**
   * Opens a new tab in existing puppeteer browser.
   *
   * @returns Promise<puppeteer.Page>
   */
  public openNewTab = async (): Promise<puppeteer.Page> => {
    const browser = await this.launchBrowser();

    const page = await browser!.newPage();
    return page;
  };
}

export default new PuppeteerService();
