class HomePage {
  getEditBox() {
    return cy.get("form input[name='name']");
  }

  getTwoWayDataBinding() {
    return cy.get("h4 input[name='name']");
  }

  getGender() {
    return cy.get('select');
  }

  getEntrepreneaur() {
    return cy.get('#inlineRadio3');
  }
  getShopTab() {
    return cy.get(':nth-child(2) > .nav-link');
  }
}

export default HomePage;
