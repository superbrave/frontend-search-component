import { mount } from "@vue/test-utils";
import SearchDetail from "../../src/components/SearchDetail.vue";
import { viagraResultsMock } from "../../src/mocks/viagraResultsMock.js";

describe("Test the search detail page component", () => {
  const wrapper = mount(SearchDetail, {
    propsData: {
      language: "de",
      env: "dev",
    },
  });

  test("if the page loads without results", () => {
    expect(wrapper.vm.$data.searchState).toMatchObject({});
    expect(wrapper.find(".search-no-results").exists()).toBe(true);
    expect(wrapper.find(".search-body").exists()).toBe(false);
  });

  test("if the page loads with results and filters", async () => {
    // Set the search term
    wrapper.find(".search-box .text-input").setValue("viagra");
    wrapper.find(".search-button").trigger("submit");

    expect(wrapper.vm.$data.searchState).toBeDefined();

    wrapper.setData({
      searchState: viagraResultsMock,
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find(".search-body").exists()).toBe(true);
    expect(
      wrapper.find(".search-results-wrapper").findAll("li").length
    ).toEqual(wrapper.vm.$data.searchState.results.length);
    expect(wrapper.findAll(".facet").length).toBe(4);
  });
});
