<template>
  <div>
    <v-row v-for="movie in movies" :key="movie.id">
      <card :movie="movie"></card>
    </v-row>
  </div>
</template>

<script>
import Card from '~/components/movies/Card.vue'
export default {
  name: 'List',
  components: { card: Card },
  props: {
    movies: {
      default: () => [
        {
          id: 550,
          title: 'Fight Club',
          overview:
            'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground "fight clubs" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.',

          poster_path: '/a26cQPRhJPX6GbWfQbvZdrrp9j9.jpg',
        },
      ],
      type: Array,
    },
  },
}
</script>
