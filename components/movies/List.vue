<template>
  <v-row no-gutters>
    <v-col v-for="movie in movies" :key="movie.id" class="pt-7">
      <card :movie-summary="movie"></card>
    </v-col>
  </v-row>
</template>

<script>
import Card from '~/components/movies/Card.vue'

/**
 * Component to list the movie on the page
 * @vue-prop {Array} [movies=[]] - Movies' array to show
 */
export default {
  name: 'List',
  components: { card: Card },
  props: {
    movies: {
      default: () => [],
      type: Array,
    },
  },
}
</script>
