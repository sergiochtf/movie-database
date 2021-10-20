import { URL_IMAGE } from '~/utils/constants/general.js'

/**
 * Global function to create the poster URL
 * @param {String} path Relative path of the poster
 * @returns {string} The poster URL
 */
export const global = {
  getImageUrl(path = '') {
    return `${URL_IMAGE}${path}`
  },
}

/**
 * Use the inject method to add the getImageUrl global function
 */
export default ({ app }, inject) => {
  inject('global', global)
}
