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

export default {
  components: {
    'list-movies': List,
    'more-btn': MoreButton,
  },
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
    async onClickMore() {
      const responseMoreMovies = await fetchPopular(this.$axios, ++page)
      this.movies = this.movies.concat(responseMoreMovies.results)
      this.showMoreButton = responseMoreMovies.total_pages > page
    },
  },
}
</script>
