import { shallowMount } from '@vue/test-utils'
import Index from '~/pages/index'
import {
  fetchSimpleSearch,
  fetchAdvancedSearch,
  fetchGenres,
} from '~/utils/api.js'

const MOVIES = [
  {
    id: 13,
  },
]

jest.mock('~/utils/api.js')
fetchSimpleSearch.mockImplementation(() => {
  return [MOVIES, 1, 1]
})
fetchAdvancedSearch.mockImplementation(() => {
  return { results: MOVIES }
})
fetchGenres.mockImplementation(() => {
  return { genres: [] }
})

describe('Index unit tests', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Index, {
      mocks: {
        $t: jest.fn(),
      },
    })
  })
  test('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  test('Method clearMovies clear objets', () => {
    wrapper.vm.clearMovies()
    expect(wrapper.vm.movies).toStrictEqual([])
    expect(wrapper.vm.textSearch).toStrictEqual('')
    expect(wrapper.vm.showMoreButton).toStrictEqual(false)
  })

  test('Method search', async () => {
    await wrapper.vm.search('Alien')
    expect(wrapper.vm.movies).toStrictEqual(MOVIES)
  })

  test('Method fetchAdvancedSearch', async () => {
    await wrapper.vm.fetchAdvancedSearch()
    expect(wrapper.vm.movies).toStrictEqual(MOVIES)
  })

  test('Method searchAdvanced', async () => {
    wrapper.vm.fetchAdvancedSearch = jest.fn()
    await wrapper.vm.searchAdvanced()
    expect(wrapper.vm.fetchAdvancedSearch).toHaveBeenCalled()
  })

  test('check that "asyncData" checks fetchGenres', async () => {
    await wrapper.vm.$options.asyncData({})
    expect(fetchGenres).toHaveBeenCalled()
  })
})
