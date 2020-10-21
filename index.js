/*
	This script is for to scrap a movie's title, rating and duration.
	Of course with this script you can get other parameters from the movie's page.

	Usage: you can use: yarn scrap:imdb <movie-name> or npm run scrap:imdb <movie-name>
	ex: yarn scrap godfather
*/
const puppeteer = require('puppeteer');

(async () => {
	const imdb = 'https://www.imdb.com';
	const args = process.argv.slice(2);
	if (args.length < 1) {
		throw new Error('You should enter a movie name');
	}
	const movie = args.join(' ');

	// Open up the browser, { headless: false }
	const browser = await puppeteer.launch({ headless: false });

	// Create a new tab
	const page = await browser.newPage();

	// Tell browser the navigation is finished
	// when there are more than 2 network connections for at least half of a second
	await page.goto(imdb, { waitUntil: 'networkidle2' });

	// Type movie into search bar
	await page.type('.imdb-header-search__input', movie);

	// Wait for the selector to appear in page
	await page.waitForSelector('#react-autowhatever-1--item-0 a');

	// Take the first result's href
	const href = await page.evaluate(
		() => document.querySelector('#react-autowhatever-1--item-0 a').href
	);

	// Go to that url
	await page.goto(href, { waitUntil: 'networkidle2' });

	// Run console code inside here, dom functions etc.
	const data = await page.evaluate(() => {
		const getText = (selector) => {
			if (document.querySelector(selector)) {
				return document.querySelector(selector).innerText;
			}
			return "There is no value for this prop";
		}

		const title = getText('div[class="title_wrapper"] > h1');
		const rating = getText('span[itemprop="ratingValue"]');
		const duration = getText('.titleBar time');

		return {
			title,
			rating,
			duration,
		};
	});

	console.log(data);

	await browser.close();
})();
