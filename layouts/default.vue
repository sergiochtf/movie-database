<template>
  <v-app>
    <v-main class="mb-12">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer fixed>
      <bottom-bar></bottom-bar>
    </v-footer>
  </v-app>
</template>

<script>
import BottomBar from '~/components/layout/BottomBar'
/**
 * Default Layout
 */
export default {
  components: {
    'bottom-bar': BottomBar,
  },

  /**
   * Created method - load the favorite list movies of the user from the store
   */
  created() {
    this.$store.commit('general/loadFromLocalStorage')
  },
}
</script>
