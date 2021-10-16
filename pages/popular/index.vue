<template>
  <v-container grid-list-xs>
    <h1 class="pb-6">{{ $t('most-popular') }}</h1>
    <list-movies :movies="movies"></list-movies>
    <more-btn @on-click-more="onClickMore"></more-btn>
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
    const movies = await fetchPopular($axios, page)
    return { movies }
  },

  data() {
    return { movies: [] }
  },

  methods: {
    async onClickMore() {
      const moreMovies = await fetchPopular(this.$axios, ++page)
      this.movies = this.movies.concat(moreMovies)
    },
  },
}
</script>
