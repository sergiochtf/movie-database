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

export default {
  components: {
    'bottom-bar': BottomBar,
  },
}
</script>
