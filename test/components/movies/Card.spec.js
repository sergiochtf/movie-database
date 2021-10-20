import { shallowMount } from '@vue/test-utils'
import Card from '~/components/movies/Card'
import { URL_IMAGE } from '~/utils/constants/general.js'
import { fetchVideoId } from '~/utils/api.js'

const ARRAY_DATA = [{ name: 1 }, { name: 2 }, { name: 3 }, { name: 4 }]
const OUTPUT_ARRAY_DATA = '1, 2, 3, 4'
const MOVIE = {
  id: 13,
}

jest.mock('~/utils/api.js')
fetchVideoId.mockImplementation(() => {
  return MOVIE
})

describe('Card unit tests', () => {
  let wrapper
  let isFavoriteValue = false

  beforeEach(() => {
    wrapper = shallowMount(Card, {
      propsData: {
        movieSummary: { title: 'title title title title title title title ' },
      },
      mocks: {
        $t: jest.fn(),
        $store: {
          getters: {
            'general/isFavorite': () => {
              return isFavoriteValue
            },
          },
        },
      },
    })
  })

  test('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  test('Computed title should be "title"', () => {
    expect(wrapper.vm.title).toStrictEqual('title title title title ...')
  })

  test('Computed isFavorite should be false', () => {
    expect(wrapper.vm.isFavorite).toBeFalsy()
  })

  test('Computed isFavorite should be true', () => {
    isFavoriteValue = true
    expect(wrapper.vm.isFavorite).toBeTruthy()
  })

  test('Method getImageUrl should be ""', () => {
    expect(wrapper.vm.getImageUrl('')).toStrictEqual(URL_IMAGE)
  })

  test('Method formatMoney should be $10.000', () => {
    expect(wrapper.vm.formatMoney(10000)).toStrictEqual('$10,000')
  })

  test('Method extractNames should be "1,2,3,4"', () => {
    expect(wrapper.vm.extractNames(ARRAY_DATA)).toStrictEqual(OUTPUT_ARRAY_DATA)
  })

  test('Method onClickFavorite remote from favorite the movie', () => {
    const vm = {
      $store: { commit: jest.fn() },
    }
    Card.methods.onClickFavorite.call(vm)
    expect(vm.$store.commit).toHaveBeenCalled()
  })

  test('Computed genres should be "1, 2, 3, 4"', () => {
    wrapper.vm.movie = { genres: ARRAY_DATA }
    expect(wrapper.vm.genres).toStrictEqual(OUTPUT_ARRAY_DATA)
  })

  test('Computed productionCompanies should be "1, 2, 3, 4"', () => {
    wrapper.vm.movie = { production_companies: ARRAY_DATA }
    expect(wrapper.vm.productionCompanies).toStrictEqual(OUTPUT_ARRAY_DATA)
  })

  test('Check watcher dialog', async () => {
    const VALUE = true
    wrapper.setData({ dialog: VALUE })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.movie).toStrictEqual(MOVIE)
  })
})
