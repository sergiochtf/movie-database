/**
 * Initialize the store
 */
export const state = () => ({
  favorites: [],
})

/**
 * Mutations of the Store
 */
export const mutations = {
  /**
   * Mutation to add movies in the store
   * @param {object} state Object with the variables of the store
   * @param {object} movie Object to add the store
   */
  addToFavorite(state, movie) {
    state.favorites.push(movie)
    localStorage.setItem('favorites', JSON.stringify(state.favorites))
  },
  /**
   * Mutation to remove movie from the store
   * @param {object} state Object with the variables of the store
   * @param {object} movie Object to remove of the store
   */
  removeFromFavorite(state, movie) {
    const removeIndex = state.favorites.findIndex(
      (item) => item.id === movie.id
    )
    state.favorites.splice(removeIndex, 1)
    localStorage.setItem('favorites', JSON.stringify(state.favorites))
  },

  /**
   * Mutation to initialize the store
   * @param {object} state Object with the variables of the store
   */
  loadFromLocalStorage(state) {
    const favorites = JSON.parse(localStorage.getItem('favorites'))
    state.favorites = favorites || []
  },
}

/**
 * Getters of the Store
 */
export const getters = {
  /**
   * Getter to know if a movie is or not favorite of the user
   * @param {object} state Object with the variables of the store
   * @returns if the movie is favorite of the user or not
   */
  isFavorite: (state) => (movieId) => {
    return state.favorites.findIndex((item) => item.id === movieId) > -1
  },
}
