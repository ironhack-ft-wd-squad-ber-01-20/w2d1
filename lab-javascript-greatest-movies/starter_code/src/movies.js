/* eslint no-restricted-globals: 'off' */

// Iteration 1: Ordering by year - Order by year, ascending (in growing order)

function orderByYear(movies) {
  const sorted = movies.slice().sort(function(a, b) {
    if (a.year === b.year) {
      return a.title.localeCompare(b.title);
    }
    return a.year - b.year;
  });

  return sorted;
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct

function howManyMovies(movies) {
  const filtered = movies.filter(function(movie) {
    if (
      movie.director === "Steven Spielberg" &&
      movie.genre.includes("Drama")
    ) {
      return true;
    }
  });

  return filtered.length;

  /*
  const movieCount = movies.reduce(function(accumulator, currentMovie) {
    if (
      currentMovie.director === "Steven Spielberg" &&
      currentMovie.genre.indexOf("Drama") !== -1
    ) {
      return accumulator + 1;
    }
    return accumulator;
  }, 0);

  return movieCount;
  */
}

// Iteration 3: Alphabetic Order - Order by title and print the first 20 titles

function orderAlphabetically(movies) {
  const onlyTitles = movies.map(function(movie) {
    return movie.title;
  });
  const sortedAbc = onlyTitles.sort(function(a, b) {
    return a.localeCompare(b);
  });

  const first20 = sortedAbc.slice(0, 20);

  return first20;

  /*
    return movies.map(function(movie) {
        return movie.title
    }).sort(function(a, b) {
        return a.localeCompare(b)
    }).slice(0,20)
  */
}

// Iteration 4: All rates average - Get the average of all rates with 2 decimals

function ratesAverage(movies) {
  if (movies.length === 0) {
    return 0;
  }

  const totalRatings = movies.reduce(function(accumulator, currentMovie) {
    if (!currentMovie.rate) {
      return 0 + accumulator;
    }
    return currentMovie.rate + accumulator;
  }, 0);

  const avg = totalRatings / movies.length;
  //   return Math.round(avg * 100) / 100;

  const rounded = avg.toFixed(2);
  return parseFloat(rounded);
}

// Iteration 5: Drama movies - Get the average of Drama Movies

function dramaMoviesRate(movies) {
  const dramaMovies = movies.filter(function(movie) {
    if (movie.genre.indexOf("Drama") !== -1) {
      return true;
    }
  });

  const avg = ratesAverage(dramaMovies);
  return avg;
}

// Iteration 6: Time Format - Turn duration of the movies from hours to minutes

// BONUS Iteration: Best yearly rate average - Best yearly rate average
