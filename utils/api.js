const APIKEY = '7c6382504b74bd6fe93e75507cee23b1'
const POPULAR = `/movie/popular?api_key=${APIKEY}`
const NOW_PLAYING = `/movie/now_playing?api_key=${APIKEY}`
const DISCOVER = `/discover/movie?api_key=${APIKEY}`
const VIDEO_ID = `/movie/<id>?api_key=${APIKEY}`
const GENRES = `/genre/movie/list?api_key=${APIKEY}`

const fetchData = async function (axios, query) {
  return await axios.$get(query)
}

export const fetchPopular = async function (axios, page) {
  return await fetchData(axios, POPULAR.concat(`&page=${page}`), page)
}

export const fetchNowPlaying = async function (axios, page) {
  return await fetchData(axios, NOW_PLAYING.concat(`&page=${page}`), page)
}

export const fetchGenres = async function (axios) {
  return await fetchData(axios, GENRES)
}

export const fetchVideoId = async function (axios, id) {
  return await fetchData(axios, VIDEO_ID.replace('<id>', id))
}

export const fetchSimpleSearch = async function (axios, textSearch, page) {
  const responseTitle = await fetchData(
    axios,
    DISCOVER.concat('&query=<query>')
      .concat(`&page=${page}`)
      .replace('<query>', textSearch)
  )

  // const responseCast = await fetchData(axios)

  return responseTitle.results
}

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
