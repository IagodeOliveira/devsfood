/// <reference types="cypress" />

describe('testing signUp page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should go to signUp page from login page', () => {
    cy.contains('span', 'Sign Up').click();
    cy.contains('span', 'Already have an Account?').should('be.visible');
  });
});
