import { shallowMount } from '@vue/test-utils'
import Index from '~/pages/popular/index'
import { fetchPopular } from '~/utils/api.js'

const MOVIES = [
  {
    id: 13,
  },
]

jest.mock('~/utils/api.js')
fetchPopular.mockImplementation(() => {
  return { results: MOVIES }
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

  test('Method onClickMore', async () => {
    await wrapper.vm.onClickMore()
    expect(wrapper.vm.movies).toStrictEqual(MOVIES)
  })

  test('check that "asyncData" checks fetchPopular', async () => {
    await wrapper.vm.$options.asyncData({})
    expect(fetchPopular).toHaveBeenCalled()
  })
})
