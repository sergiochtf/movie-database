<template>
  <v-app>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <bottom-bar @on-click="onClickBottomBar"></bottom-bar>
  </v-app>
</template>

<script>
import BottomBar from '~/components/layout/BottomBar'

export default {
  components: {
    'bottom-bar': BottomBar,
  },

  methods: {
    onClickBottomBar(clickedBtn) {},
  },
}
</script>
