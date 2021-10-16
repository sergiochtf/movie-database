<template>
  <v-container grid-list-xs>
    <h1 class="pb-6">{{ $t('favorite') }}</h1>
    <list-movies :movies="movies"></list-movies>
    <span v-if="movies && movies.length < 1" class="title">{{
      $t('not-found')
    }}</span>
  </v-container>
</template>
<script>
import List from '~/components/movies/List.vue'

export default {
  components: {
    'list-movies': List,
  },

  data() {
    return { movies: [] }
  },

  created() {
    this.movies = JSON.parse(localStorage.getItem('favorite'))
  },
}
</script>
