<template>
  <v-container grid-list-xs>
    <v-row class="mb-2">
      <h1>{{ $t('search') }}</h1>
    </v-row>

    <advanced-search
      v-if="advanced"
      :genres="genres"
      @search-advanced="searchAdvanced"
      @advanced-search-closed="advanced = false"
    ></advanced-search>
    <v-row v-else>
      <simple-search
        @clear-movies="clearMovies"
        @search="search"
      ></simple-search>
      <v-spacer></v-spacer>
      <v-btn outlined rounded @click="advanced = true">
        {{ $t('advanced-search') }}</v-btn
      >
    </v-row>

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

/**
 * Index page to do a simple or advanced search.
 * @vue-data {Array} [movies=[]] - List of movies to show
 * @vue-data {String} [textSearch='] - Text to be used on the search
 * @vue-data {Boolean} [advanced='] - Storage the status of the search simple/advanced
 * @vue-data {Boolean} [showMoreButton='] - Storage the status of the more button
 * @vue-data {Object} [filter='] - Object with the filter's values for the advanced search
 */
export default {
  components: {
    'list-movies': List,
    'more-btn': MoreButton,
    'simple-search': Simple,
    'advanced-search': Advanced,
  },

  /**
   * Fetch all the genres into the data
   * @param {Object} $axios Object with the methods to do the GET request
   */
  async asyncData({ $axios }) {
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
    /** Fetch data after clicking on More Button */
    async onClickMore() {
      const moviesLength = this.movies.length
      this.movies = this.movies.concat(
        await fetchSimpleSearch(this.$axios, this.textSearch, ++page)
      )

      if (moviesLength === this.movies.length) {
        this.showMoreButton = false
      }
    },

    /** Clear the movies objet and clear the search */
    clearMovies() {
      this.movies = []
      this.textSearch = ''
    },

    /**
     * To do a simple search using the text passed as param
     * @param {string} textSearch Text to search
     */
    async search(textSearch) {
      this.textSearch = textSearch.replace(' ', '+')
      if (textSearch.length >= 3) {
        page = 1
        this.movies = await fetchSimpleSearch(this.$axios, textSearch, page)
        this.movies.length > 0
          ? (this.showMoreButton = true)
          : (this.showMoreButton = false)
      }
    },

    /**
     * To do a simple search using the text passed as param
     * @param {object} filter Object with the params to do an advanced search
     */
    async searchAdvanced(filter) {
      page = 1
      this.filter = filter
      this.movies = []

      const response = await fetchAdvancedSearch(this.$axios, this.filter, page)
      this.movies = this.movies.concat(response.results)
      this.showMoreButton = response.total_pages > page
    },
  },
}
</script>
