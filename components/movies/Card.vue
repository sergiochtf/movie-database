<template>
  <v-card class="mx-auto" width="344" height="320">
    <v-img
      :src="$global.getImageUrl(movieSummary.poster_path)"
      height="200px"
      :content-class="!movieSummary.poster_path ? 'grey' : ''"
    ></v-img>

    <v-card-title class="">
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on">{{ title }}</span>
        </template>
        <span>{{ movieSummary.title }}</span>
      </v-tooltip>
    </v-card-title>

    <v-card-actions>
      <v-dialog v-model="dialog" persistent max-width="720">
        <template #activator="{ on }">
          <v-row class="mx-auto">
            <v-btn text v-on="on">
              {{ $t('explore') }}
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              icon
              :color="isFavorite ? 'red' : ''"
              @click="onClickFavorite"
            >
              <v-icon>mdi-heart</v-icon>
            </v-btn></v-row
          >
        </template>
        <v-card>
          <v-img
            :src="$global.getImageUrl(movie && movie.poster_path)"
            :aspect-ratio="16 / 9"
            :content-class="!movieSummary.poster_path ? 'grey' : ''"
          ></v-img>
          <v-card-title class="text-h5 pb-7">
            {{ movie && movie.title }}
          </v-card-title>
          <v-card-text class="px-10">
            <v-row>
              <v-col cols="12" md="6">
                <strong>{{ $t('original-title') }}:</strong>
                <span> {{ movie && movie.original_title }}</span>
              </v-col>
              <v-col cols="12" md="6">
                <strong>{{ $t('release-date') }}:</strong>
                <span> {{ movie && movie.release_date }}</span>
              </v-col>
              <v-col cols="12" md="6">
                <strong>{{ $t('status') }}:</strong>
                <span> {{ movie && movie.status }}</span>
              </v-col>

              <v-col cols="12" md="6">
                <strong>{{ $t('revenue') }}:</strong>
                <span> {{ formatMoney(movie && movie.revenue) }}</span>
              </v-col>

              <v-col cols="12" md="6">
                <strong>{{ $t('budget') }}:</strong>
                <span> {{ formatMoney(movie && movie.budget) }}</span>
              </v-col>

              <v-col cols="12" md="6">
                <strong>{{ $t('genres') }}:</strong>
                <span> {{ movie && genres }}</span>
              </v-col>

              <v-col cols="12" md="6">
                <strong>{{ $t('production-companies') }}:</strong>
                <span> {{ movie && productionCompanies }}</span>
              </v-col></v-row
            >
          </v-card-text>
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
import { FormatMoney } from 'format-money-js'
import { fetchVideoId } from '~/utils/api.js'

export default {
  name: 'Card',
  props: {
    movieSummary: {
      default: null,
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      dialog: false,
      movie: null,
    }
  },

  computed: {
    isFavorite() {
      let isMovieFavorite = false

      if (this.movieSummary) {
        isMovieFavorite = this.$store.getters['general/isFavorite'](
          this.movieSummary.id
        )
      }

      return isMovieFavorite
    },

    title() {
      let result = this.movieSummary.title

      if (this.movieSummary.title.length > 27) {
        result = this.movieSummary.title.substring(0, 24).concat('...')
      }

      return result
    },

    genres() {
      return this.extractNames(this.movie.genres)
    },

    productionCompanies() {
      return this.extractNames(this.movie.production_companies)
    },
  },

  watch: {
    async dialog(newValue) {
      if (newValue && !this.movie) {
        this.movie = await fetchVideoId(this.$axios, this.movieSummary.id)
      }
    },
  },

  methods: {
    onClickFavorite() {
      let operation = 'general/addToFavorite'

      if (this.isFavorite) {
        operation = 'general/removeFromFavorite'
      }

      this.$store.commit(operation, this.movieSummary)
    },

    formatMoney(moneyToFormat) {
      const fm = new FormatMoney({
        decimals: 0,
      })

      return fm.from(moneyToFormat, { symbol: '$' })
    },

    extractNames(elements) {
      let result = ''

      elements.forEach((element) => {
        result += `${element.name}, `
      })

      return result.slice(0, -2)
    },
  },
}
</script>
