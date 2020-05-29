describe("Test the Search header", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Renders the search input field", () => {
    cy.get(".search-component .search-box.text-input").should(
      "have.attr",
      "placeholder",
      "Suche Sie nach Produkten, Symptomen oder stellen Sie eine Frage ..."
    );
  });

  it("Opens the flyout when a search query is typed", () => {
    cy.get(".search-component").find(".text-input").type("viagra");

    cy.get(".search-component .results-flyout-wrapper").should("exist");
    cy.wait(500);

    cy.get("h1:first-child").click();
    cy.wait(500);

    cy.get(".search-component .results-flyout-wrapper").should("not.exist");
  });
});
