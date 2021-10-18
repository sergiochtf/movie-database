<template>
  <v-container grid-list-xs>
    <v-row align="center" justify="space-between">
      <h1>{{ $t('search') }}</h1>
      <v-spacer></v-spacer>
      <v-switch
        v-model="advanced"
        :label="$t('advanced')"
        color="grey"
      ></v-switch>
    </v-row>

    <advanced-search
      v-if="advanced"
      :genres="genres"
      @search-advanced="searchAdvanced"
    ></advanced-search>
    <simple-search
      v-else
      @clear-movies="clearMovies"
      @search="search"
    ></simple-search>

    <list-movies :movies="movies"></list-movies>
    <more-btn v-if="showMoreButton" @on-click-more="onClickMore"></more-btn>
  </v-container>
</template>
<script>
import {
  fetchGenres,
  fetchSimpleSearch,
  fetchAdvancedSearch,
} from '~/utils/api.js'
import List from '~/components/movies/List.vue'
import Simple from '~/components/search/Simple.vue'
import Advanced from '~/components/search/Advanced.vue'
import MoreButton from '~/components/layout/MoreButton.vue'

let page = 1

export default {
  components: {
    'list-movies': List,
    'more-btn': MoreButton,
    'simple-search': Simple,
    'advanced-search': Advanced,
  },

  async asyncData({ $axios, $config }) {
    const response = await fetchGenres($axios)
    return {
      genres: response.genres,
    }
  },

  data() {
    return {
      movies: [],
      textSearch: '',
      advanced: false,
      showMoreButton: false,
      filter: null,
    }
  },

  methods: {
    async onClickMore() {
      page++
      await this.loadData()
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

    async loadData() {
      const response = await fetchAdvancedSearch(this.$axios, this.filter, page)
      this.movies = this.movies.concat(response.results)
      this.showMoreButton = response.total_pages > page
    },

    async searchAdvanced(filter) {
      page = 1
      this.filter = filter
      this.movies = []

      await this.loadData()
    },
  },
}
</script>
