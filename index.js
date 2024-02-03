/*
	This script is for to scrap a movie's title, rating and duration.
	Of course with this script you can get other parameters from the movie's page.

	Usage: you can use: yarn scrap:imdb <movie-name> or npm run scrap:imdb <movie-name>
	ex: yarn scrap godfather
*/
const puppeteer = require("puppeteer");

(async () => {
  const imdb = "https://www.imdb.com";
  const args = process.argv.slice(2);
  if (args.length < 1) {
    throw new Error("You should enter a movie name");
  }
  const movie = args.join(" ");

  // Open up the browser, { headless: false }
  const browser = await puppeteer.launch({ headless: false });

  // Create a new tab
  const page = await browser.newPage();

  // Tell browser the navigation is finished
  // when there are more than 2 network connections for at least half of a second
  await page.goto(imdb, { waitUntil: "networkidle2" });

  // Selectors
  const SEARCH_INPUT_CLASS = ".imdb-header-search__input";

  // Type movie into search bar
  await page.type(SEARCH_INPUT_CLASS, movie);

  // Wait for the selector to appear in page
  await page.waitForSelector(
    "#react-autowhatever-navSuggestionSearch--item-0 a"
  );

  // Take the first result's href
  const href = await page.evaluate(
    () =>
      document.querySelector(
        "#react-autowhatever-navSuggestionSearch--item-0 a"
      ).href
  );

  // Go to that url
  await page.goto(href, { waitUntil: "networkidle2" });

  // Run console code inside here, dom functions etc.
  const data = await page.evaluate(() => {
    const getText = (selector, all = false) => {
      if (all && document.querySelectorAll(selector)) {
        return Array.from(document.querySelectorAll(selector)).map(
          el => el.innerText
        );
      } else if (document.querySelector(selector)) {
        return document.querySelector(selector).innerText;
      }
      return "There is no value for this prop";
    };

    const title = getText("h1");
    const rating = getText(
      'div[data-testid="hero-rating-bar__aggregate-rating__score"]'
    );
    const duration = getText("li.ipc-inline-list__item", true)[6];
    const year = getText("li.ipc-inline-list__item", true)[4];

    return {
      title,
      rating,
      duration,
      year,
    };
  });

  console.log(data);

  await browser.close();
})();
