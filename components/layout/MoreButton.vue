<template>
  <v-row no-gutters justify="center" class="pt-7">
    <v-btn large outlined rounded @click="onClick">{{ $t('more') }}</v-btn>
  </v-row>
</template>

<script>
export default {
  name: 'MoreButton',

  methods: {
    onClick() {
      this.$emit('on-click-more')
    },
  },
}
</script>
