<template>
  <v-row class="px-3" justify="center">
    <v-text-field
      v-model="textSearch"
      single-line
      :label="$t('search-simple')"
      clearable
      prepend-icon="mdi-magnify"
    ></v-text-field>
  </v-row>
</template>

<script>
export default {
  name: 'Simple',

  data() {
    return {
      textSearch: '',
    }
  },

  watch: {
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
