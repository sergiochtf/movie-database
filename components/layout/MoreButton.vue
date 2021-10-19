<template>
  <v-row no-gutters justify="center" class="pt-7">
    <v-btn large outlined rounded @click="onClick">{{ $t('more') }}</v-btn>
  </v-row>
</template>

<script>
/**
 * Component MoreButton to show the "Mor Button" on the bottom of the page to add more result on the page
 */
export default {
  name: 'MoreButton',

  methods: {
    /**
     * method to emit the event on-click-more after clicking on the button
     */
    onClick() {
      this.$emit('on-click-more')
    },
  },
}
</script>
