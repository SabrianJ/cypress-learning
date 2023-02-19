describe('My Second Test Site', () => {
  it('My first test case', () => {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/');

    //Checkbox
    cy.get('#checkBoxOption1').check();
    cy.get('#checkBoxOption1')
      .should('be.checked')
      .and('have.value', 'option1');
    cy.get('#checkBoxOption1').uncheck();
    cy.get('input[type="checkbox"]').check(['option2', 'option3']);

    //Static dropdown
    cy.get('select').select('option2').should('have.value', 'option2');

    //Dynamic dropdown
    cy.get('#autocomplete').type('Ind');
    cy.get('.ui-menu-item div').each(($el, index, list) => {
      const text = $el.text();
      if (text === 'Indonesia') {
        cy.wrap($el).click();
      }
    });
    cy.get('#autocomplete').should('have.value', 'Indonesia');

    cy.get('#displayed-text').should('be.visible');

    cy.get('#hide-textbox').click();

    cy.get('#displayed-text').should('not.be.visible');

    cy.get('input[value="radio2"]').check().should('be.checked');
  });
});
