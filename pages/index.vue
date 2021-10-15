<template>
  <v-container grid-list-xs>
    <list-movies></list-movies>
  </v-container>
</template>

<script>
import List from '~/components/movies/List.vue'
export default {
  components: {
    'list-movies': List,
  },
}
</script>
