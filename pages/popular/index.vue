<template>
  <v-container grid-list-xs>
    <h1 class="pb-6">{{ $t('most-popular') }}</h1>
    <list-movies :movies="movies"></list-movies>
    <more-btn v-if="showMoreButton" @on-click-more="onClickMore"></more-btn>
  </v-container>
</template>
<script>
import { fetchPopular } from '~/utils/api.js'
import List from '~/components/movies/List.vue'
import MoreButton from '~/components/layout/MoreButton.vue'

let page = 1

/**
 * Index page to show the Most Popular Movies
 * @vue-data {Array} [movies=[]] - List of movies to show
 * @vue-data {Boolean} [showMoreButton='] - Storage the status of the more button
 */
export default {
  components: {
    'list-movies': List,
    'more-btn': MoreButton,
  },

  /**
   * Fetch the Most Popular Movies
   * @param {Object} $axios Object with the methods to do the GET request
   */
  async asyncData({ $axios, $config }) {
    const response = await fetchPopular($axios, page)
    return {
      movies: response.results,
      showMoreButton: response.total_pages > page,
    }
  },

  data() {
    return { movies: [], showMoreButton: true }
  },

  methods: {
    /**
     * Fetch data after clicking on More Button
     */
    async onClickMore() {
      const responseMoreMovies = await fetchPopular(this.$axios, ++page)
      this.movies = this.movies.concat(responseMoreMovies.results)
      this.showMoreButton = responseMoreMovies.total_pages > page
    },
  },
}
</script>
