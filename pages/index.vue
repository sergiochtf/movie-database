<template>
  <v-container grid-list-xs>
    <h1 class="pb-6">{{ $t('search') }}</h1>
    <simple-search @clear-movies="clearMovies" @search="search"></simple-search>
    <list-movies :movies="movies"></list-movies>
    <more-btn
      v-if="movies && movies.length > 0"
      @on-click-more="onClickMore"
    ></more-btn>
  </v-container>
</template>
<script>
import { fetchSimpleSearch } from '~/utils/api.js'
import List from '~/components/movies/List.vue'
import Simple from '~/components/search/Simple.vue'
import MoreButton from '~/components/layout/MoreButton.vue'

let page = 1

export default {
  components: {
    'list-movies': List,
    'more-btn': MoreButton,
    'simple-search': Simple,
  },

  data() {
    return { movies: [], textSearch: '' }
  },

  methods: {
    async onClickMore() {
      const moreMovies = await fetchSimpleSearch(
        this.$axios,
        this.textSearch,
        ++page
      )
      this.movies = this.movies.concat(moreMovies)
    },

    clearMovies() {
      this.movies = []
      this.textSearch = ''
    },

    async search(textSearch) {
      this.textSearch = textSearch
      if (textSearch.length > 3) {
        page = 1
        this.movies = await fetchSimpleSearch(this.$axios, textSearch, page)
      }
    },
  },
}
</script>
