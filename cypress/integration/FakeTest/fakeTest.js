/// <reference types="Cypress" />
/// <references types="cypress-iframe" />
import 'cypress-iframe';
import neatCsv from 'neat-csv';

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

  it('logged in into local storage', () => {
    cy.login().then(() => {
      cy.visit('https://rahulshettyacademy.com/client', {
        onBeforeLoad(win) {
          win.localStorage.setItem('token', Cypress.env('token'));
        },
      });
    });

    cy.get('.card-body button:last-of-type').eq(1).click({ force: true });
    cy.get('[routerlink*="cart"]').click();
    cy.contains('Checkout').click();
    cy.get('[placeholder*="Select Country"]').type('Indonesia');
    cy.get('.ta-results button').each(($el, index, list) => {
      if ($el.text().includes('Indonesia')) {
        cy.wrap($el).click();
      }
    });
    cy.get('.action__submit').click();
    cy.wait(4000);
    cy.get('.order-summary button').click();

    cy.readFile(Cypress.config("fileServerFolder") + "cypress\downloads\order-invoice_rahulshetty.csv").then(
      async (text) => {
        const csv = await neatCsv(text);
        cy.log(csv);
      }
    );
  });
});
