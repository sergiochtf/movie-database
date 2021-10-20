import { shallowMount } from '@vue/test-utils'
import Index from '~/pages/favorite/index'

describe('Index unit tests', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Index, {
      mocks: {
        $t: jest.fn(),
        $store: {
          state: {
            general: { favorites: [] },
          },
        },
      },
    })
  })
  test('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
  })
})
