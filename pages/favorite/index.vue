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

/**
 * Page to show the favorite movies of the user
 * @vue-data {Array} [movies=this.$store.state.general.favorites] The favorite movies of the user storages in Vuex
 */
export default {
  components: {
    'list-movies': List,
  },

  data() {
    return { movies: this.$store.state.general.favorites }
  },
}
</script>
