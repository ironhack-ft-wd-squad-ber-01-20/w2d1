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

function convertStrToMinutes(str) {
  // input str can be in these formats:
  // "2h 22min" | "2h" | "45min"
  const splitted = str.split(" ");

  let minConversion;

  if (splitted.length === 2) {
    // "2h 22min"
    let hours = parseInt(splitted[0]);
    let minutes = parseInt(splitted[1]);
    minConversion = hours * 60 + minutes;
  } else if (splitted[0].indexOf("h") !== -1) {
    // "2h"
    let hours = parseInt(splitted[0]);
    minConversion = hours * 60;
  } else if (splitted[0].indexOf("min") !== -1) {
    // "45min"
    let minutes = parseInt(splitted[0]);
    minConversion = minutes;
  }

  return minConversion;
}

function turnHoursToMinutes(movies) {
  return movies.map(function(movie) {
    const durationInMinutes = convertStrToMinutes(movie.duration);

    // return Object.assign({}, movie, { duration: durationInMinutes });

    // return { ...movie, duration: durationInMinutes };

    const newObj = {
      title: movie.title,
      year: movie.year,
      director: movie.director,
      genre: movie.genre,
      rate: movie.rate,
      duration: durationInMinutes // ✅
    };

    return newObj;

    // movie.duration = durationInMinutes; // ❌
    // return movie;
  });
}

// BONUS Iteration: Best yearly rate average - Best yearly rate average

function bestYearAvg(movies) {
  // 1- group the movies by year
  // 2- for each year, calculate the avg rate
  // 3- sort the years by their avg rate

  function getMoviesForYear(movies, year) {
    return movies.filter(function(movie) {
      return movie.year === year;
    });
  }

  if (movies.length === 0) {
    return null;
  }

  const movieYears = movies.map(function(movie) {
    return movie.year;
  });

  const uniqueMovieYears = movieYears.filter(function(year, index) {
    if (movieYears.indexOf(year) === index) {
      // this condition will only be true ONCE for every year in the array
      return true;
    }
  });

  const top = uniqueMovieYears.reduce(
    function(accumulator, currentYear) {
      const moviesForYear = getMoviesForYear(movies, currentYear); // retrieves an array with all the movies for the current year
      const rate = ratesAverage(moviesForYear); // calculates average rate for the movies for the current year

      if (rate === null || rate > accumulator.rate) {
        //   if the computed rate is greater than the rate that was previously stored: reassign accumulator.rate & accumulator.year

        accumulator.rate = rate;
        accumulator.year = currentYear;
      } else if (rate === accumulator.rate) {
        //   if the computed rate is equal to the rate that was previously stored: compare the year
        if (currentYear < accumulator.year) {
          accumulator.year = currentYear;
        }
      }

      return accumulator;
    },
    {
      year: null,
      rate: null
    }
  );

  return (
    "The best year was " + top.year + " with an average rate of " + top.rate
  );

  //   uniqueMovieYears.sort(function(yearA, yearB) {
  //     const moviesA = getMoviesForYear(movies, yearA);
  //     const moviesB = getMoviesForYear(movies, yearB);

  //     const avgA = ratesAverage(moviesA);
  //     const avgB = ratesAverage(moviesB);

  //     if (avgA === avgB) {
  //       return yearA - yearB;
  //     }
  //     return avgB - avgA;
  //   });

  //   const topYear = uniqueMovieYears[0];
  //   const topYearMovies = getMoviesForYear(movies, topYear);
  //   const topRate = ratesAverage(topYearMovies);

  //   return "The best year was " + topYear + " with an average rate of " + topRate;
}

/*

// extra bonus solutions:

function bestYearAvg(movies) {
  let movieYears = movies.map(function(movie, index) {
    return movie.year;
  });
  let individualMovieYears = movieYears.filter(function(year, index, years) {
    return years.indexOf(year) === index;
  });
  let moviesGroupedByYearWithAvg = [];
  for (year of individualMovieYears) {
    let moviesOfOneYear = movies.filter(function(movie) {
      if (movie.year === year) {
        return true;
      }
    });
    moviesGroupedByYearWithAvg.push({
      year: year,
      movies: moviesOfOneYear,
      averageRate: ratesAverage(moviesOfOneYear)
    });
  }
  moviesGroupedByYearWithAvg.sort(function(a, b) {
    if (a.averageRate === b.averageRate) {
      return a.year - b.year;
    }
    return b.averageRate - a.averageRate;
  });
  if (moviesGroupedByYearWithAvg.length === 0) {
    return null;
  }
  let answer = `The best year was ${moviesGroupedByYearWithAvg[0].year} with an average rate of ${moviesGroupedByYearWithAvg[0].averageRate}`;
  return answer;
}

function bestYearAvg(movies) {
  if (movies.length === 0) {
    return null;
  }
  let maxAvg = 0;
  let bestYear;
  movies.forEach(function(value) {
    let year = value.year;
    let avgPerYear = 0;
    let previousYear = 0;
    if (year !== previousYear) {
      const numOfMovies = movies.filter(function(value) {
        return value.year === year;
      });
      avgPerYear = ratesAverage(numOfMovies);
      if (avgPerYear > maxAvg) {
        maxAvg = avgPerYear;
        bestYear = year;
      }
      if (avgPerYear === maxAvg) {
        bestYear = year;
      }
    }
    previousYear = year;
  });
  return `The best year was ${bestYear} with an average rate of ${maxAvg}`;
}


function bestYearAvg(movies) {
  if (!movies.length) return null;

  const years = movies
    .reduce((acc, val) => {
      if (acc.indexOf(val.year) === -1) {
        acc.push(val.year);
      }
      return acc;
    }, [])
    .sort((a, b) => {
      return a - b;
    });

  const top = years.reduce(
    (acc, val) => {
      const moviesForYear = movies.filter(movie => movie.year === val);

      const avgForYear = ratesAverage(moviesForYear);

      if (avgForYear > acc.avg) {
        acc.year = val;
        acc.avg = avgForYear;
      }

      return acc;
    },
    {
      year: null,
      avg: null
    }
  );

  return (
    "The best year was " + top.year + " with an average rate of " + top.avg
  );
}

function bestYearAvg(movies) {
  if (!movies.length) return null;

  const top = movies.reduce(
    (acc, val) => {
      const avgForYear = ratesAverage(
        movies.filter(movie => movie.year === val.year)
      );

      if (
        avgForYear > acc.avg ||
        (avgForYear === acc.avg && val.year < acc.year)
      ) {
        acc.year = val.year;
        acc.avg = avgForYear;
      }
      return acc;
    },
    {
      avg: null,
      year: null
    }
  );

  return (
    "The best year was " + top.year + " with an average rate of " + top.avg
  );
}


*/
