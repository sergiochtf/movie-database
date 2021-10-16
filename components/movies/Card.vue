<template>
  <v-card class="mx-auto" width="344" height="320">
    <v-img :src="$global.getImageUrl(movie.poster_path)" height="200px"></v-img>

    <v-card-title class="">
      {{ title }}
    </v-card-title>

    <v-card-actions>
      <v-dialog v-model="dialog" persistent max-width="720">
        <template #activator="{ on }">
          <v-row class="mx-auto">
            <v-btn text v-on="on">
              {{ $t('explore') }}
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon :color="isFavorite && 'red'" @click="onClickFavorite">
              <v-icon>mdi-heart</v-icon>
            </v-btn></v-row
          >
        </template>
        <v-card>
          <v-img
            :src="$global.getImageUrl(movie.poster_path)"
            :aspect-ratio="16 / 9"
          ></v-img>
          <v-card-title class="text-h5 pb-7">
            {{ movie.title }}
          </v-card-title>
          <v-card-text class="px-10">
            <v-row>
              <strong class="body-1">{{ $t('original-title') }}:</strong>
              <span class="body-1"> {{ movie.original_title }}</span>
            </v-row>
            <v-row>
              <strong class="body-1">{{ $t('release-date') }}:</strong>
              <span class="body-1"> {{ movie.release_date }}</span>
            </v-row></v-card-text
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="dialog = false">
              {{ $t('close') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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

  data() {
    return {
      dialog: false,
      favorite: false,
    }
  },

  computed: {
    isFavorite() {
      return this.favorite
    },

    title() {
      let result = this.movie.title

      if (this.movie.title.length > 27) {
        result = this.movie.title.substring(0, 24).concat('...')
      }

      return result
    },
  },

  methods: {
    onClickFavorite() {
      this.favorite = !this.favorite
      // add/remove to vuex
    },
  },
}
</script>
