const APIKEY = '7c6382504b74bd6fe93e75507cee23b1'
const POPULAR = '/discover/movie?sort_by=popularity.desc'

export const fetchPopular = async function (axios, page) {
  return (await axios.$get(POPULAR.concat(`&api_key=${APIKEY}&page=${page}`)))
    .results
}
