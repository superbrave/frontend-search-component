// https://docs.cypress.io/api/introduction/api.html

describe("Test the Search Detail page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Renders the search detail page blank", () => {
    cy.get(".search-detail-page .search-box.text-input").should(
      "have.attr",
      "placeholder",
      "Suche Sie nach Produkten, Symptomen oder stellen Sie eine Frage ..."
    );

    cy.get(".search-no-results").contains(
      "Suche Sie nach Produkten, Symptomen oder stellen Sie eine Frage ..."
    );
  });

  it("Shows results when you type a query", () => {
    cy.get(".search-detail-page .search-box.text-input").type("viagra");
    cy.get(".search-body")
      .find(".search-section__search-result")
      .should("have.length.of", 11);
  });

  it("Shows three filter options", () => {
    cy.get(".search-detail-page .search-box.text-input").type("viagra");
    cy.get(".search-body")
      .find(".search-facets .facet")
      .should("have.length.of", 3);
    cy.get(".search-body")
      .find(".search-facets .facet")
      .eq(0)
      .should("contain", "Packungsbeilage");
  });

  it("Filters the results", () => {
    // Set the search term to "viagra"
    cy.get(".search-detail-page .search-box.text-input").type("viagra");

    // Click on the filter
    cy.get(".search-body")
      .find(".search-facets .facet")
      .eq(0)
      .find("label")
      .click();

    // Check if there are 4 results
    cy.get(".search-body")
      .find(".search-section__search-result")
      .should("have.length.of", 4);

    // Click on the label again
    cy.get(".search-body")
      .find(".search-facets .facet")
      .eq(0)
      .find("label")
      .click();

    // Check if the results are 11
    cy.get(".search-body")
      .find(".search-section__search-result")
      .should("have.length.of", 11);
  });
});
