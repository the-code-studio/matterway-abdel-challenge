const puppeteer = require("puppeteer");
//import UserAgent from "user-agents";
//const userAgent = new UserAgent();
require("dotenv").config();
const resourcePath = "https://www.goodreads.com";

// open new page on chrome
const openNewPage = async (browser) => {
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  return page;
};

// open new website
const navigateTo = async (page, url) => {
  // page.setUserAgent(userAgent.toString());
  return await page.goto(url);
};

const getListOfBooks = async (page) => {
  await page.goto(`${resourcePath}/choiceawards/best-books-2020`, {
    waitUntil: "networkidle2",
  });
  await page.waitForNavigation();
  return await page.$$eval(".pollAnswer__bookLink > img", (options) =>
    options.map((option) => option.getAttribute("alt"))
  );
};

// Type on page
const typeOnPage = async (page, selector, textField) => {
  return await page.type(selector, textField);
};

//Extract results from page
const extractResult = async (page, selector) => {
  const selectedSelectors = await page.waitForSelector(selector);
  await page.evaluate((selectedSelectors) => {
    console.log(Array.from(document.querySelectorAll(resultsSelector)));
    return true;
  });
};

// sort function
const sortBooksBy = async (page) => {};

// click on link
const aClick = async (page, selector) => {
  return await page.click(selector);
};

// memorize page
const memorizePage = async (page, namePage) => {
  return await page.screenshot({ path: `${namePage}` });
};

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  const page = await browser.newPage();
  const books = await getListOfBooks(page);
  await page.on("load", () => {
    console.log(books);
  });

  //   const myPage = await openNewPage(browser);
  //   navigateTo(myPage, process.env.AMAZON_URL);
  // await page.goto("https://www.amazon.com");
  // await typeOnPage(page, process.env.SEARCH_SELECTOR, "book test Paperback");
  // await aClick(page, process.env.BUTTON_SEARCH_SELECTOR);
  // await extractResult(page, process.env.ITEM_TITLE_LINK_AMAZON);
  // await browser.close();
})();
