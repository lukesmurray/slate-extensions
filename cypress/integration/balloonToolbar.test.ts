/// <reference types="cypress" />

describe("Balloon Toolbar Renders", () => {
  it("should render", () => {
    cy.visit("http://localhost:3000");

    cy.get(`[data-testid=${"toolbarExample-editor"}]`).type("{selectall}");
    cy.get(`[data-testid=${"toolbarExample-content"}]`).should("be.visible");
    cy.get(`[data-testid=${"toolbarExample-editor"}]`).type("{rightarrow}");
    cy.get(`[data-testid=${"toolbarExample-content"}]`).should("not.exist");
  });
});
