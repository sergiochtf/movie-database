<template>
  <v-card class="mx-auto" max-width="344">
    <v-img :src="$global.getImageUrl(movie.poster_path)" height="200px"></v-img>

    <v-card-title>
      {{ movie.title }}
    </v-card-title>

    <v-card-subtitle>
      {{ movie.overview }}
    </v-card-subtitle>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text>
        {{ $t('explore') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Card',
  props: {
    movie: {
      default() {
        return { poster_path: '', title: '', overview: '' }
      },
      type: Object,
    },
  },

  computed: {
    overview() {
      let result = this.movie.overview

      if (this.movie.overview.length > 300) {
        result = this.movie.overview.str.substring(0, 297).concat('...')
      }

      return result
    },
  },
}
</script>
