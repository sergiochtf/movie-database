import { shallowMount } from '@vue/test-utils'
import BottomBar from '~/components/layout/BottomBar'

describe('BottomBar unit tests', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(BottomBar, {
      mocks: {
        $vuetify: {
          breakpoint: {
            mdAndUp: true,
          },
        },
        $t: jest.fn(),
        $route: { path: '/popular' },
      },
    })
  })

  test('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
  })
})
