<template>
  <v-row justify="center">
    <v-col cols="12" class="pb-0 ml-0 pl-0">
      <v-btn text rounded @click="onClickClose">
        <v-icon left class="mr-1"> mdi-close </v-icon>
        {{ $t('close') }}
      </v-btn>
    </v-col>
    <v-col cols="12" md="4" class="pt-0"
      ><v-combobox
        v-model="selectGenres"
        hide-selected
        multiple
        small-chips
        :label="$t('genres')"
        :items="genres"
        item-text="name"
        item-value="id"
        color="grey"
      ></v-combobox
    ></v-col>
    <v-col cols="12" md="3" class="pt-0">
      <span>{{ $t('rating') }}</span>
      <v-slider
        v-model="rating"
        max="10"
        min="0"
        thumb-label
        color="grey darken-1"
        track-color="grey darken-1"
        thumb-color="grey darken-1"
      ></v-slider>
    </v-col>
    <v-col cols="12" md="5" class="pl-7 pt-0">
      <v-row justify="end">
        <v-menu
          ref="menuReleaseDate"
          v-model="menuReleaseDate"
          :close-on-content-click="false"
          :return-value.sync="releaseDate"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template #activator="{ on }">
            <v-text-field
              :value="releaseDate"
              :label="$t('release-date')"
              readonly
              clearable
              @input="setReleaseDate"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="releaseDate"
            @input="setReleaseDate"
          ></v-date-picker>
        </v-menu>
        <v-btn outlined rounded class="ma-2 mr-0" @click="onClick">{{
          $t('search')
        }}</v-btn></v-row
      >
    </v-col>
  </v-row>
</template>

<script>
/**
 * Component to show the advanced search options
 * @vue-prop {Array} [genres=[]] The genres used to search movies
 * @vue-data {Array} [selectGenres=null] The genres selected
 * @vue-data {Boolean} [menuReleaseDate=false] Save the status of the dialog to select the date
 * @vue-data {String} [releaseDate=null] The date selected used to search movies
 * @vue-data {Number} [rating=0] The rating of the movies to search
 */
export default {
  name: 'Advanced',

  props: {
    genres: {
      default: () => [],
      required: true,
      type: Array,
    },
  },

  data() {
    return {
      selectGenres: null,
      menuReleaseDate: false,
      releaseDate: null,
      rating: 0,
    }
  },

  methods: {
    /**
     * Method to set in the variable releaseDate the date selected
     * @param {String} value Date selected to use in the search
     */
    setReleaseDate(value) {
      this.$refs.menuReleaseDate.save(value)
      this.releaseDate = value || null
    },

    /**
     * Method to emit the event 'search-advanced' with the genres selected
     * @returns {String} genres selected splitted by ,
     */
    onClick() {
      const genresString = this.selectGenres
        ? this.selectGenres
            .map(function (genre) {
              return genre.id
            })
            .join(',')
        : null

      this.$emit('search-advanced', {
        rating: this.rating,
        releaseDate: this.releaseDate,
        genres: genresString,
      })
    },

    /**
     * Method to emit the event 'advanced-search-closed' when the user closes the dialog
     */
    onClickClose() {
      this.$emit('advanced-search-closed')
    },
  },
}
</script>
