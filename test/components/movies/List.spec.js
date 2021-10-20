import { shallowMount } from '@vue/test-utils'
import List from '~/components/movies/List'

describe('List unit tests', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(List)
  })
  test('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
  })
})
