<template>
  <v-card class="mx-auto" max-width="344" height="380">
    <v-img :src="$global.getImageUrl(movie.poster_path)" height="200px"></v-img>

    <v-card-title>
      {{ title }}
    </v-card-title>

    <v-card-subtitle>
      {{ overview }}
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
      default: () => ({
        poster_path: '',
        title: '',
        overview: '',
      }),
      type: Object,
    },
  },

  computed: {
    overview() {
      let result = this.movie.overview

      if (this.movie.overview.length > 100) {
        result = this.movie.overview.substring(0, 95).concat('...')
      }

      return result
    },

    title() {
      let result = this.movie.title

      if (this.movie.title.length > 27) {
        result = this.movie.title.substring(0, 24).concat('...')
      }

      return result
    },
  },
}
</script>
