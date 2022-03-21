const puppeteer = require("puppeteer");
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
// const extractResult = async (page, selector) => {
//   const selectedSelectors = await page.waitForSelector(selector);
//   await page.evaluate((selectedSelectors) => {
//     return true;
//   });
// };

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

// get Random book
const GetRandomBook = (books) =>
  books[Math.floor(Math.random() * books.length)];

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  const page = await browser.newPage();
  const books = await getListOfBooks(page);
  const preferedBook = await GetRandomBook(books);
  await page.goto(process.env.AMAZON_URL);
  await typeOnPage(page, process.env.SEARCH_SELECTOR, preferedBook);
  await aClick(page, process.env.BUTTON_SEARCH_SELECTOR);
  await page.waitForNavigation();
  linkHandlers.length > 0
    ? await linkHandlers[0].click()
    : () => {
        throw new Error("This book Paperback version not found!");
      };
  await aClick(page, process.env.ADD_TO_CART_SELECTOR);

  // await browser.close();
})();
