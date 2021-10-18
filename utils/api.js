const APIKEY = '7c6382504b74bd6fe93e75507cee23b1'
const POPULAR = `/movie/popular?api_key=${APIKEY}`
const NOW_PLAYING = `/movie/now_playing?api_key=${APIKEY}`
const SEARCH_SIMPLE = `/search/movie?api_key=${APIKEY}&query=<query>`
const VIDEO_ID = `/movie/<id>?api_key=${APIKEY}`

export const fetchPopular = async function (axios, page) {
  return (await axios.$get(POPULAR.concat(`&page=${page}`))).results
}

export const fetchVideoId = async function (axios, id) {
  return await axios.$get(VIDEO_ID.replace('<id>', id))
}

export const fetchNowPlaying = async function (axios, page) {
  const curr = new Date() // get current date
  const first = curr.getDate() - curr.getDay() // First day is the day of the month - the day of the week
  const last = first + 6 // last day is the first day + 6

  const from = new Date(curr.setDate(first)).toISOString().split('T')[0]
  const to = new Date(curr.setDate(last)).toISOString().split('T')[0]

  return (
    await axios.$get(
      NOW_PLAYING.concat(`&page=${page}`)
        .replace('<from>', from)
        .replace('<to>', to)
    )
  ).results
}

export const fetchSimpleSearch = async function (axios, textSearch, page) {
  return (
    await axios.$get(
      SEARCH_SIMPLE.concat(`&page=${page}`).replace('<query>', textSearch)
    )
  ).results
}
