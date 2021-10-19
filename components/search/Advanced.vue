<template>
  <v-row justify="center">
    <v-col cols="12" class="pb-0">
      <v-btn text @click="onClickClose">
        {{ $t('close') }}
        <v-icon left class="ml-1"> mdi-close </v-icon>
      </v-btn>
    </v-col>
    <v-col cols="12" md="4" class="px-6 pt-0"
      ><v-combobox
        v-model="selectGenres"
        hide-selected
        multiple
        small-chips
        :label="$t('genres')"
        :items="genres"
        item-text="name"
        item-value="id"
        color="grey"
      ></v-combobox
    ></v-col>
    <v-col cols="12" md="3" class="px-6 pt-0">
      <span>{{ $t('rating') }}</span>
      <v-slider
        v-model="rating"
        max="10"
        min="0"
        thumb-label
        color="grey darken-1"
        track-color="grey darken-1"
        thumb-color="grey darken-1"
      ></v-slider>
    </v-col>
    <v-col cols="12" md="5" class="px-6 pt-0">
      <v-row justify="end">
        <v-menu
          ref="menuReleaseDate"
          v-model="menuReleaseDate"
          :close-on-content-click="false"
          :return-value.sync="releaseDate"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template #activator="{ on }">
            <v-text-field
              :value="releaseDate"
              :label="$t('release-date')"
              readonly
              clearable
              @input="setReleaseDate"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="releaseDate"
            @input="setReleaseDate"
          ></v-date-picker>
        </v-menu>
        <v-btn text class="ma-2" @click="onClick">{{
          $t('search')
        }}</v-btn></v-row
      >
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Advanced',

  props: {
    genres: {
      default: () => [],
      required: true,
      type: Array,
    },
  },

  data() {
    return {
      selectGenres: null,
      menuReleaseDate: false,
      releaseDate: null,
      rating: 0,
    }
  },

  methods: {
    setReleaseDate(value) {
      this.$refs.menuReleaseDate.save(value)
      this.releaseDate = value || null
    },

    onClick() {
      const genresString = this.selectGenres
        ? this.selectGenres
            .map(function (genre) {
              return genre.id
            })
            .join(',')
        : null

      this.$emit('search-advanced', {
        rating: this.rating,
        releaseDate: this.releaseDate,
        genres: genresString,
      })
    },

    onClickClose() {
      this.$emit('advanced-search-closed')
    },
  },
}
</script>
