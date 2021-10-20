import { shallowMount } from '@vue/test-utils'
import Card from '~/components/movies/Card'

describe('Card unit tests', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Card, {
      propsData: {
        movieSummary: {},
      },
    })
  })

  test('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  test('Computed title should be ""', () => {
    expect(wrapper.vm.title).toBeStrictEqual('')
  })
})
