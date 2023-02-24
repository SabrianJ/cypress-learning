const {
  Given,
  When,
  Then,
  Before,
} = require('@badeball/cypress-cucumber-preprocessor');
const HomePage = require('../../pageObjects/HomePage').default;
const ProductsPage = require('../../pageObjects/ProductsPage').default;

const homePage = new HomePage();
const productPage = new ProductsPage();
let name;
let gender;

Before(function () {
  cy.fixture('example').then(function (data) {
    this.data = data;
  });
});

Given('I open Ecommerce page', () => {
  cy.visit(`${Cypress.env('url')}/angularpractice/`);
});

When('I add items to Cart', function () {
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
});

When('Validate the total prices', () => {
  let sum = 0;
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
});

Then('select the country submit and verify thankyou', () => {
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

When('I fill the form details', function (dataTable) {
  // homePage.getEditBox().type(this.data.name);
  // homePage.getGender().select(this.data.gender);
  name = dataTable.rawTable[1][0];
  gender = dataTable.rawTable[1][1];
  homePage.getEditBox().type(name);
  homePage.getGender().select(gender);
});

Then('validate the form behaviour', function () {
  homePage.getEditBox().should('have.attr', 'minLength', 2);
  homePage.getTwoWayDataBinding().should('have.value', name);
  homePage.getEntrepreneaur().should('be.disabled');
});
Then('select the shop page', function () {
  homePage.getShopTab().click();
});
