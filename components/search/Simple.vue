<template>
  <v-row class="px-3" justify="center">
    <v-text-field
      v-model="textSearch"
      single-line
      :label="$t('search-simple')"
      clearable
      prepend-icon="mdi-magnify"
      color="grey"
    ></v-text-field>
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
      } else {
        this.$emit('search', newValue)
      }
    },
  },
}
</script>
