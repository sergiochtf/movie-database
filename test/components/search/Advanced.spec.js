import { shallowMount } from '@vue/test-utils'
import Advanced from '~/components/search/Advanced'

describe('Advanced unit tests', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Advanced, {
      propsData: {
        genres: ['Action', 'Comedy'],
      },
      mocks: {
        $t: jest.fn(),
      },
    })
    wrapper.vm.$refs.menuReleaseDate.save = jest.fn()
  })
  test('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  test('Method setReleaseDate should set the value of releaseDate', () => {
    const DATE = '2021-10-10'
    wrapper.vm.setReleaseDate(DATE)
    expect(wrapper.vm.releaseDate).toStrictEqual(DATE)
  })

  test('Method onClick should emit the event "search-advanced"', () => {
    wrapper.vm.selectGenres = ['Action', 'Comedy']
    wrapper.vm.onClick()
    expect(wrapper.vm.$emit('search-advanced'))
  })

  test('Method onClickClose should emit the event "advanced-search-closed"', () => {
    wrapper.vm.onClickClose()
    expect(wrapper.vm.$emit('advanced-search-closed'))
  })
})
