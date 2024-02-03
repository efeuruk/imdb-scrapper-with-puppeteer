This script is for to scrap a movie's title, rating and duration.

Of course with this script you can get other parameters from the movie's page.

<b>Usage:</b> <code>yarn scrap:imdb --movie-name--</code> or <code>npm run scrap:imdb --movie-name--</code>

<b>Ex:</b> <code>yarn scrap:imdb godfather</code>

![Alt Text](https://media.giphy.com/media/E66HTrAiWQWxEXYko8/giphy.gif)

Now also added the support for writing to a file with <code>yarn scrap:imdb:write-to-a-file --movie-name</code>
This will generate a file called <code>movie.json</code> and you can delete this file with <code>yarn delete:movie-json</code>
