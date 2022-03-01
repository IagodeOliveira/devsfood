/// <reference types="cypress" />

describe('trying signUp page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should not login with wrong email', () => {
    cy.get('input[type="email"]').type('medinas@gmail.com');
    cy.get('input[type="password"]').type('1234567');
    cy.get('[type="submit"]').click();
    cy.url().should('eq', 'http://localhost:3000/login');
  });

  it('should login', () => {
    cy.get('input[type="email"]').type('medina@gmail.com');
    cy.get('input[type="password"]').type('1234567');
    cy.get('[type="submit"]').click();
    // cy.intercept('POST', 'http://localhost:3000/auth/login', {
    //   fixture: 'login.json',
    // });
    cy.intercept('POST', 'http://localhost:3000/auth/login', {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
        authToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR2FiaSBNZWRpbmEiLCJlbWFpbCI6Im1lZGluYUBnbWFpbC5jb20iLCJpYXQiOjE2NDU2NDUwODQsImV4cCI6MTY0NTY0ODY4NH0.oKERWxGzFWXl5aWmbmAN4ShiXPCSBUbhgvbozlEt7vY',
      },
      body: {
        email: 'medina@gmail.com',
      },
    });
    cy.contains('Select a Category').should('be.visible');
    // cy.visit('/orders');
  });
});
