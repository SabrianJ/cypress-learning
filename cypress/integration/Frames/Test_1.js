/// <reference types="Cypress" />
/// <references types="cypress-iframe" />
import 'cypress-iframe';

describe('My Second Test Site', () => {
  it('My first test case', () => {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
    cy.frameLoaded('#courses-iframe');
    cy.iframe().find("a[href*='mentorship']").eq(0).click();
    cy.wait(3000)
    cy.iframe().find('h1.pricing-title').should('have.length', 2);
  });
});
