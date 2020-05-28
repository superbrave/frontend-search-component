import { mount } from "@vue/test-utils";
import SearchHeader from "./../../src/components/SearchHeader.vue";

describe("Test the flyout component", () => {
  const wrapper = mount(SearchHeader, {
    propsData: {
      language: "de",
      env: "dev",
    },
    data() {
      return {
        pageType: "flyout",
      };
    },
  });

  test("if the flyout opens after a search term is given", async () => {
    wrapper.find(".search-box .text-input").setValue("viagra");
    wrapper.find(".search-box .text-input").trigger("focus");

    expect(wrapper.find(".results-flyout-wrapper").exists()).toBe(true);
  });
});
