const fs = require("fs");

fs.unlink("movie.json", err => {
  if (err) {
    console.error(err);
  } else {
    console.log("File is deleted.");
  }
});
