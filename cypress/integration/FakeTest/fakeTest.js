/// <reference types="Cypress" />
/// <references types="cypress-iframe" />
import 'cypress-iframe';

describe('My Second Test Site', () => {
  it('My first test case', () => {
    cy.intercept(
      {
        method: 'GET',
        url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',
      },
      {
        statusCode: 200,
        body: [
          {
            book_name: 'Mock book',
            isbn: 'SPY40',
            aisle: '2529857',
          },
        ],
      }
    ).as('getOneBook');
    cy.visit('https://rahulshettyacademy.com/angularAppdemo/');
    cy.get('button[class="btn btn-primary"]').click();
    cy.wait('@getOneBook').then(({ req, response }) => {
      cy.get('tr').should('have.length', response.body.length + 1);
    });
    cy.get('p').should('have.text', 'Oops only 1 Book available');
  });

  it('My first test case', () => {
    cy.intercept(
      'GET',
      'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',
      (req) => {
        req.url =
          'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra';
        req.continue((res) => {
          expect(res.statusCode).to.equal(404);
        });
      }
    ).as('getOneBook');
    cy.visit('https://rahulshettyacademy.com/angularAppdemo/');
    cy.get('button[class="btn btn-primary"]').click();
    cy.wait('@getOneBook').then(({ req, response }) => {
      cy.get('tr').should('have.length', 1);
    });
  });
});
