/// <reference types="Cypress" />

describe('My Second Test Site', () => {
  it('My first test case', () => {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
    cy.get('#product')
      .get('tbody')
      .get('tr td:nth-child(2)')
      .each(($el, index, list) => {
        if (
          $el.text() ===
          'Appium (Selenium) - Mobile Automation Testing from Scratch'
        ) {
          // cy.wrap($el).next().should('have.text', '30');
          cy.get('tr td:nth-child(3)').eq(index).should('have.text', '30');
        }
      });

    cy.get('.mouse-hover-content').invoke('show').should('be.visible');
    cy.contains('Top').click();
    // cy.contains('Top').click({ force: true });
    cy.url().should('include', 'top');
  });
});
