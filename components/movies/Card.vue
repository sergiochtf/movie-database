<template>
  <v-card class="mx-auto" width="344" height="320">
    <v-img
      :src="$global.getImageUrl(movieSummary.poster_path)"
      height="200px"
      :content-class="!movieSummary.poster_path ? 'grey' : ''"
      :alt="movieSummary && movieSummary.title"
    ></v-img>

    <v-card-title class="">
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on">{{ title }}</span>
        </template>
        <span class="body-1">{{ movieSummary.title }}</span>
      </v-tooltip>
    </v-card-title>

    <v-card-actions>
      <v-dialog v-model="dialog" persistent max-width="550">
        <template #activator="{ on }">
          <v-row class="mx-auto">
            <v-btn text rounded v-on="on">
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
            :alt="movie && movie.title"
          ></v-img>
          <v-card-title class="text-h5 pb-7">
            {{ movie && movie.title }}
          </v-card-title>
          <v-card-text class="px-10">
            <v-row>
              <v-col cols="12" md="6">
                <v-col class="pa-0 ma-0">
                  <strong class="font-weight-bold body-1"
                    >{{ $t('original-title') }}:</strong
                  ></v-col
                ><v-col class="pa-0 ma-0">
                  <span class="body-1">
                    {{ movie && movie.original_title }}</span
                  ></v-col
                >
              </v-col>
              <v-col cols="12" md="6">
                <v-col class="pa-0 ma-0">
                  <strong class="font-weight-bold body-1"
                    >{{ $t('release-date') }}:</strong
                  > </v-col
                ><v-col class="pa-0 ma-0">
                  <span class="body-1">
                    {{ movie && movie.release_date }}</span
                  ></v-col
                >
              </v-col>
              <v-col cols="12" md="6">
                <v-col class="pa-0 ma-0">
                  <strong class="font-weight-bold body-1"
                    >{{ $t('status') }}:</strong
                  ></v-col
                ><v-col class="pa-0 ma-0">
                  <span class="body-1">
                    {{ movie && movie.status }}</span
                  ></v-col
                >
              </v-col>

              <v-col cols="12" md="6"
                ><v-col class="pa-0 ma-0">
                  <strong class="font-weight-bold body-1"
                    >{{ $t('revenue') }}:</strong
                  ></v-col
                ><v-col class="pa-0 ma-0">
                  <span class="body-1">
                    {{ formatMoney(movie && movie.revenue) }}</span
                  ></v-col
                >
              </v-col>

              <v-col cols="12" md="6"
                ><v-col class="pa-0 ma-0">
                  <strong class="font-weight-bold body-1"
                    >{{ $t('budget') }}:</strong
                  ></v-col
                ><v-col class="pa-0 ma-0">
                  <span class="body-1">
                    {{ formatMoney(movie && movie.budget) }}</span
                  ></v-col
                >
              </v-col>

              <v-col cols="12" md="6"
                ><v-col class="pa-0 ma-0">
                  <strong class="font-weight-bold body-1"
                    >{{ $t('genres') }}:</strong
                  ></v-col
                ><v-col class="pa-0 ma-0">
                  <span class="body-1"> {{ movie && genres }}</span></v-col
                >
              </v-col>

              <v-col cols="12" md="6"
                ><v-col class="pa-0 ma-0">
                  <strong class="font-weight-bold body-1"
                    >{{ $t('production-companies') }}:</strong
                  ></v-col
                ><v-col class="pa-0 ma-0">
                  <span class="body-1">
                    {{ movie && productionCompanies }}</span
                  ></v-col
                >
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

/**
 * Card component to show the movie info
 * @vue-prop {Object} [movieSummary=null] - Movie to show in the card in list view
 * @vue-data {Boolean} [dialog=false] - Showing or not the detail view of the movie
 * @vue-data {Object} [movie=null] - Movie to show in the card in detail view mode
 * @vue-computed {String} isFavorite Return if the movie is or not in the favorite list of the user
 * @vue-computed {String} title Return a short title if the title is too long
 * @vue-computed {String} genres Return all genres of the movie
 * @vue-computed {String} productionCompanies Return all the production companies of the movie
 */
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
      let result =
        this.movieSummary && this.movieSummary.title
          ? this.movieSummary.title
          : ''

      if (result.length > 27) {
        result = result.substring(0, 24).concat('...')
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
    /**
     * Watcher to know if it is necessary getting more info about the movie
     */
    async dialog(newValue) {
      if (newValue && !this.movie) {
        this.movie = await fetchVideoId(this.$axios, this.movieSummary.id)
      }
    },
  },

  methods: {
    /**
     * Method to add or remove to the favorite list of the user
     */
    onClickFavorite() {
      let operation = 'general/addToFavorite'

      if (this.isFavorite) {
        operation = 'general/removeFromFavorite'
      }

      this.$store.commit(operation, this.movieSummary)
    },

    /**
     * Method to format the money fields to Dollars
     */
    formatMoney(moneyToFormat) {
      const fm = new FormatMoney({
        decimals: 0,
      })

      return fm.from(moneyToFormat, { symbol: '$' })
    },

    /**
     * Generic method to extract in a string the field name of objects array
     */
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
