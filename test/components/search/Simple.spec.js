import { shallowMount } from '@vue/test-utils'
import Simple from '~/components/search/Simple'

describe('Simple unit tests', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Simple, {
      mocks: {
        $t: jest.fn(),
      },
    })
  })
  test('is a Vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  test('Method textSearchChanged should emit the event "search-advanced"', () => {
    wrapper.vm.textSearch = 'Alien'
    wrapper.vm.textSearchChanged({ keyCode: 13 })
    expect(wrapper.vm.$emit('search-advanced'))
  })

  test('Method onClickSearch should emit the event "advanced-search-closed"', () => {
    wrapper.vm.textSearch = 'Alien'
    wrapper.vm.onClickSearch()
    expect(wrapper.vm.$emit('advanced-search-closed'))
  })

  test('Check watcher textSearch', async () => {
    const TEXT = 'Alien'
    wrapper.setData({ textSearch: TEXT })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$emit('search', TEXT))
  })
})
