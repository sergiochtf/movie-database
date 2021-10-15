<template>
  <v-bottom-navigation
    v-model="value"
    dark
    shift
    input-value
    :grow="$vuetify.breakpoint.mdAndUp"
  >
    <v-btn value="popular">
      <span>{{ $t('popular') }}</span>

      <v-icon>mdi-movie-filter</v-icon>
    </v-btn>

    <v-btn value="playing">
      <span>{{ $t('now-playing') }}</span>

      <v-icon>mdi-theater</v-icon>
    </v-btn>

    <v-btn value="search">
      <span>{{ $t('search') }}</span>

      <v-icon>mdi-movie-search</v-icon>
    </v-btn>

    <v-btn value="favorite">
      <span>{{ $t('favorite') }}</span>

      <v-icon>mdi-heart</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
const ON_CLICK = 'on-click'

export default {
  name: 'BottomBar',
  data() {
    return {
      value: 'search',
    }
  },

  watch: {
    value(newValue) {
      this.$emit(ON_CLICK, newValue)
    },
  },
}
</script>
