<template>
  <v-row no-gutters>
    <v-col v-for="movie in movies" :key="movie.id" class="pt-7">
      <card :movie-id="movie.id"></card>
    </v-col>
  </v-row>
</template>

<script>
import Card from '~/components/movies/Card.vue'
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
