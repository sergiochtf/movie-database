<template>
  <v-container grid-list-xs>
    <h1 class="pb-6">{{ $t('search') }}</h1>
    <simple-search @clear-movies="clearMovies"></simple-search>
    <list-movies :movies="movies"></list-movies>
    <more-btn
      v-if="movies && movies.length > 0"
      @on-click-more="onClickMore"
    ></more-btn>
    <span v-else class="title">{{ $t('not-found') }}</span>
  </v-container>
</template>
<script>
import { fetchSimpleSearch } from '~/utils/api.js'
import List from '~/components/movies/List.vue'
import MoreButton from '~/components/layout/MoreButton.vue'

let page = 1

export default {
  components: {
    'list-movies': List,
    'more-btn': MoreButton,
  },
  async asyncData({ $axios, $config }) {
    const movies = await fetchSimpleSearch($axios, page)
    return { movies }
  },

  data() {
    return { movies: [] }
  },

  methods: {
    async onClickMore() {
      const moreMovies = await fetchSimpleSearch(this.$axios, ++page)
      this.movies = this.movies.concat(moreMovies)
    },

    clearMovies() {
      this.movies = []
    },
  },
}
</script>
