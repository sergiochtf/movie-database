const APIKEY = '7c6382504b74bd6fe93e75507cee23b1'
const POPULAR = `/movie/popular?api_key=${APIKEY}`
const NOW_PLAYING = `/movie/now_playing?api_key=${APIKEY}`
const DISCOVER = `/discover/movie?api_key=${APIKEY}&sort_by=primary_release_date.desc`
const MOVIES = `/search/movie?api_key=${APIKEY}`
const VIDEO_ID = `/movie/<id>?api_key=${APIKEY}`
const GENRES = `/genre/movie/list?api_key=${APIKEY}`
const PERSONS = `/search/person?api_key=${APIKEY}`
const COMPANIES = `/search/company?api_key=${APIKEY}`

// Function to remove the elements repeated
const uniqByKeepLast = function (data, key) {
  return [...new Map(data.map((x) => [key(x), x])).values()]
}

/**
 * Function to do the GET request into the API
 * @param {function} axios The function to do the GET request
 * @param {string} query The query to execute getting the data
 * @returns {object} Object with the result of the GET response
 */
const fetchData = async function (axios, query) {
  return await axios.$get(query)
}

/**
 * Fetch the Most Popular Movies
 * @param {function} axios The function to do the GET request
 * @param {number} page Number of page for the pagination
 * @returns {object} the result of the GET response
 */
export const fetchPopular = async function (axios, page) {
  return await fetchData(axios, POPULAR.concat(`&page=${page}`))
}

/**
 * Fetch the Now Playing Movies
 * @param {function} axios The function to do the GET request
 * @param {number} page Number of page for the pagination
 * @returns {object} the result of the GET response
 */
export const fetchNowPlaying = async function (axios, page) {
  return await fetchData(axios, NOW_PLAYING.concat(`&page=${page}`))
}

/**
 * Fetch the Genres' list
 * @param {function} axios The function to do the GET request
 * @returns {object} the genres found
 */
export const fetchGenres = async function (axios) {
  return await fetchData(axios, GENRES)
}

/**
 * Fetch a movie by id
 * @param {function} axios The function to do the GET request
 * @param {number} id Id of the movie to search
 * @returns {object} the movie found
 */
export const fetchVideoId = async function (axios, id) {
  return await fetchData(
    axios,
    VIDEO_ID.replace('<id>', id).concat('&append_to_response=credits')
  )
}

/**
 * Fetch a simple search by title
 * @param {function} axios The function to do the GET request
 * @param {String} textSearch Text used to search movies
 * @param {Number} page Number of page to search
 * @returns array of movies
 */
export const fetchSimpleSearchByTitle = async function (
  axios,
  textSearch,
  page
) {
  // FIND BY TITLE
  return (
    await fetchData(
      axios,
      MOVIES.concat(`&page=${page}`).concat(`&query=${textSearch}`)
    )
  ).results
}

/**
 * Fetch a simple search by cast's id
 * @param {function} axios The function to do the GET request
 * @param {Number} id Cast id used to search movies
 * @param {Number} page Number of page to search
 * @returns array of movies
 */
export const fetchMoviesByPerson = async function (axios, id, page) {
  return await fetchData(
    axios,
    DISCOVER.concat(`&page=${page}`).concat(`&with_cast=${id}`)
  )
}

/**
 * Fetch a simple search by company's id
 * @param {function} axios The function to do the GET request
 * @param {Number} id Company id used to search movies
 * @param {Number} page Number of page to search
 * @returns array of movies
 */
export const fetchMoviesByCompany = async function (axios, id, page) {
  return await fetchData(
    axios,
    DISCOVER.concat(`&page=${page}`).concat(`&with_companies=${id}`)
  )
}

/**
 * Fetch the movies using a simple search
 * @param {function} axios The function to do the GET request
 * @param {String} textSearch Text used to search movies
 * @param {Number} page Number of page to search
 * @returns {object} the list of movies found
 */
export const fetchSimpleSearch = async function (axios, textSearch, page) {
  let response = []
  let castWithMoreMovies = 0
  const companyWithMoreMovies = 0

  const responseTitle = await fetchSimpleSearchByTitle(axios, textSearch, page)

  response = response.concat(responseTitle)

  // FIND BY CAST

  const responsePerson = (
    await fetchData(
      axios,
      PERSONS.concat(`&page=${page}`).concat(`&query=${textSearch}`)
    )
  ).results

  responsePerson.forEach(async (person) => {
    const responseMoviesByCast = await fetchMoviesByPerson(
      axios,
      person.id,
      page
    )

    if (
      responseMoviesByCast &&
      responseMoviesByCast.total_results > castWithMoreMovies
    ) {
      castWithMoreMovies = person.id
    }

    response = response.concat(responseMoviesByCast.results)
  })

  // FIND BY PRODUCTION COMPANY

  const responseCompany = (
    await fetchData(
      axios,
      COMPANIES.concat(`&page=${page}`).concat(`&query=${textSearch}`)
    )
  ).results

  responseCompany.forEach(async (company) => {
    const responseMoviesWithCompany = await fetchMoviesByCompany(
      axios,
      company.id,
      page
    )

    if (
      responseMoviesWithCompany &&
      responseMoviesWithCompany.total_results > companyWithMoreMovies
    ) {
      castWithMoreMovies = company.id
    }

    response = response.concat(responseMoviesWithCompany.results)
  })

  response = uniqByKeepLast(response, (movie) => movie.id)

  return [response, castWithMoreMovies, companyWithMoreMovies]
}

/**
 * Fetch the movies using an advanced search
 * @param {function} axios The function to do the GET request
 * @param {Object} filter Object used to search movies
 * @param {Number} page Number of page to search
 * @returns {object} the list of movies found
 */
export const fetchAdvancedSearch = async function (axios, filter, page) {
  let query = DISCOVER.concat(`&page=${page}`)

  if (filter.releaseDate) {
    query = query.concat(`&release_date.gte=${filter.releaseDate}`)
  }
  if (filter.genres) {
    query = query.concat(`&with_genres=${filter.genres}`)
  }
  if (filter.rating > 0) {
    query = query.concat(`&vote_average.gte=${filter.rating}`)
  }

  return await fetchData(axios, query)
}
