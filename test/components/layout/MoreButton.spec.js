import { shallowMount } from '@vue/test-utils'
import MoreButton from '~/components/layout/MoreButton'

describe('MoreButton unit tests', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(MoreButton, {
      mocks: {
        $t: jest.fn(),
      },
    })
  })
  test('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  test('onClick method emits event "on-click-more"', () => {
    wrapper.vm.onClick()
    expect(wrapper.vm.$emit('on-click-more'))
  })
})
