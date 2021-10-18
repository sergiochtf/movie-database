export const state = () => ({
  favorites: [],
})

export const mutations = {
  addToFavorite(state, movie) {
    state.favorites.push(movie)
    localStorage.setItem('favorites', JSON.stringify(state.favorites))
  },
  removeFromFavorite(state, movie) {
    const removeIndex = state.favorites.findIndex(
      (item) => item.id === movie.id
    )
    state.favorites.splice(removeIndex, 1)
    localStorage.setItem('favorites', JSON.stringify(state.favorites))
  },

  loadFromLocalStorage(state) {
    const favorites = JSON.parse(localStorage.getItem('favorites'))
    state.favorites = favorites || []
  },
}

export const getters = {
  isFavorite: (state) => (movieId) => {
    return state.favorites.findIndex((item) => item.id === movieId) > -1
  },
}
