<template>
  <v-row class="px-3" justify="center" align="center">
    <v-text-field
      v-model="textSearch"
      single-line
      :label="$t('search-simple')"
      clearable
      color="grey"
      @keydown="textSearchChanged"
    ></v-text-field>
    <v-btn icon @click="onClickSearch">
      <v-icon> mdi-magnify</v-icon>
    </v-btn>
  </v-row>
</template>

<script>
/**
 * Component to show the simple search options
 * @vue-data {String} [textSearch=''] The text used to search movies
 */
export default {
  name: 'Simple',

  data() {
    return {
      textSearch: '',
    }
  },

  watch: {
    /**
     * Watcher to manage the event to emit 'clear-movies' if the text length is 0 or 'search' if the text lenght is > 0
     */
    textSearch(newValue) {
      if (!newValue || (newValue && newValue.length === 0)) {
        this.$emit('clear-movies')
      }
    },
  },

  methods: {
    /**
     * Function to emit the event 'search' with the text to search
     * @param {KeyEvent} key Key pressed
     */
    textSearchChanged(key) {
      if (key.keyCode === 13 && this.textSearch) {
        this.$emit('search', this.textSearch)
      }
    },

    /**
     * Function to emit the event 'search' with the text to search
     */
    onClickSearch() {
      if (this.textSearch) {
        this.$emit('search', this.textSearch)
      }
    },
  },
}
</script>
