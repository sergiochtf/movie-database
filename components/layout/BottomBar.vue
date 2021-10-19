<template>
  <v-bottom-navigation
    v-model="value"
    dark
    shift
    input-value
    :grow="$vuetify.breakpoint.mdAndUp"
    absolute
  >
    <v-btn value="search" to="/">
      <span>{{ $t('search') }}</span>

      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn value="popular" to="/popular">
      <span>{{ $t('popular') }}</span>

      <v-icon>mdi-movie-filter</v-icon>
    </v-btn>

    <v-btn value="playing" to="/playing">
      <span>{{ $t('playing') }}</span>

      <v-icon>mdi-theater</v-icon>
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
      value: this.$route.path.substring(1),
    }
  },
}
</script>
