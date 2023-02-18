//cypress - Spec
describe('My First Test Site', () => {
  it('My first test case', () => {
    cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
    cy.get('.search-keyword').type('ca');
    cy.wait(2000);
    cy.get('.product:visible').should('have.length', 4);
  });
});

describe('My Second Test Site', () => {
  it('My first test case', () => {
    cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
    cy.get('.search-keyword').type('ca');
    cy.wait(2000);
    cy.get('.product:visible').should('have.length', 4);
    //Parent child chaining
    cy.get('.products').find('.product').should('have.length', 4);

    cy.get('.products').as('productLocator');

    // eq index of element
    //contains find string of text
    cy.get('@productLocator')
      .find('.product')
      .eq(1)
      .contains('ADD TO CART')
      .click();

    cy.get('.products')
      .find('.product')
      .each(($el, index, $list) => {
        const textVeg = $el.find('h4.product-name').text();
        if (textVeg.includes('Cashews')) {
          // $el.find('button').trigger('click');
          cy.wrap($el).find('button').click();
        }
      });

    cy.get('.brand').should('have.text', 'GREENKART');

    cy.get('.brand').then((logo) => {
      cy.log(logo.text());
    });

    cy.get('.cart-icon > img').click();
  });
});
