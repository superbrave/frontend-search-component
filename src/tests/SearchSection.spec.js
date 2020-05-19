import { mount } from '@vue/test-utils'
import SearchSection from '../components/SearchSection.vue'

describe('Test the flyout component', () => {
    const wrapper = mount(SearchSection, {
        propsData: {
            language: 'de',
            env: 'dev'
        }
    });

    test('if the vue instance exists', () => {
        expect(wrapper.isVueInstance()).toBe(true);
    });

    test('if the flyout opens after a search term is given', async () => {
        wrapper.find('.search-box__text-input').setValue('viagra');
        wrapper.find('.search-box__text-input').trigger('focus');

        await wrapper.vm.$nextTick()

        expect(wrapper.find('.results-flyout-wrapper').exists()).toBe(true)
    });
});