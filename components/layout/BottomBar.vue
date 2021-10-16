<template>
  <v-bottom-navigation
    v-model="value"
    dark
    shift
    input-value
    :grow="$vuetify.breakpoint.mdAndUp"
  >
    <v-btn value="popular" to="/popular">
      <span>{{ $t('popular') }}</span>

      <v-icon>mdi-movie-filter</v-icon>
    </v-btn>

    <v-btn value="playing" to="/playing">
      <span>{{ $t('now-playing') }}</span>

      <v-icon>mdi-theater</v-icon>
    </v-btn>

    <v-btn value="search" to="/search">
      <span>{{ $t('search') }}</span>

      <v-icon>mdi-movie-search</v-icon>
    </v-btn>

    <v-btn value="favorite" to="/favorite">
      <span>{{ $t('favorite') }}</span>

      <v-icon>mdi-heart</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: 'BottomBar',
  data() {
    return {
      value: 'search',
    }
  },
}
</script>
