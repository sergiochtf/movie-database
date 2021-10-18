import { URL_IMAGE } from '~/utils/constants/general.js'

const global = {
  getImageUrl(path = '') {
    return `${URL_IMAGE}${path}`
  },
}

export default ({ app }, inject) => {
  inject('global', global)
}
