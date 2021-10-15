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
}
</script>
