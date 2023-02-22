/// <reference types="Cypress" />
/// <references types="cypress-iframe" />
import 'cypress-iframe';
import HomePage from '../pageObjects/HomePage';
import ProductsPage from '../pageObjects/ProductsPage';

describe('My Second Test Site', () => {
  before(() => {
    cy.fixture('example').then(function (data) {
      this.data = data;
    });
  });

  it('My first test case', function () {
    let sum = 0;
    const homePage = new HomePage();
    const productPage = new ProductsPage();
    cy.visit(`${Cypress.env('url')}/angularpractice/`);
    homePage.getEditBox().type(this.data.name);
    homePage.getEditBox().should('have.attr', 'minLength', 2);
    homePage.getGender().select(this.data.gender);
    homePage.getTwoWayDataBinding().should('have.value', this.data.name);
    homePage.getEntrepreneaur().should('be.disabled');
    // cy.pause();
    homePage.getShopTab().click();
    this.data.productName.forEach((val) => {
      cy.selectProduct(val);
    });

    productPage.getCheckoutButton().click();
    cy.get('tr td:nth-child(4) strong')
      .each(($el, index, $list) => {
        const price = parseFloat($el.text().split('₹.')[1]);
        sum += price;
      })
      .then(() => cy.log(sum));
    cy.get('h3 > strong').then((element) => {
      const total = parseFloat(element.text().split('₹.')[1]);
      expect(total).to.be.equal(sum);
    });
    cy.contains('Checkout').click();
    cy.get('#country').type('Indonesia');
    cy.get('.suggestions > ul > li > a', { timeout: 8000 }).click();
    cy.get('#checkbox2').check({ force: true });
    cy.get('input[type="submit"').click();
    // cy.get('.alert').should(
    //   'have.text',
    //   'Success! Thank you! Your order will be delivered in next few weeks :-)'
    // );
    cy.get('.alert').then((element) => {
      expect(element.text().includes('Success')).to.be.true;
    });
  });
});
