/// <reference types="Cypress" />
import 'cypress-iframe';

describe('My Second Test Site', () => {
  it('My first test case', () => {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
    // cy.get('#opentab')
    //   .invoke('prop', 'href')
    //   .then((href) => {
    //     cy.log(href);
    //   });
    cy.get('#opentab').then((el) => {
      const url = el.prop('href');
      cy.visit(url);
    });

  });
});
