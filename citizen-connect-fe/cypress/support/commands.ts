/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

declare global {
    namespace Cypress {
      interface Chainable {
        toLogin(): Chainable<void>;
        toReg(): Chainable<void>;
        userLogin(email: string, password: string): Chainable<void>;
        adminLogin(email: string, password: string): Chainable<void>;
      }
    }
  }
  
  Cypress.Commands.add('toLogin', (): void => {
    cy.visit('http://citizen-connect-fe.s3-website.eu-north-1.amazonaws.com/');
    cy.get('.buttons').contains('Login').click();
  });

  Cypress.Commands.add('toReg', (): void => {
    cy.visit('http://citizen-connect-fe.s3-website.eu-north-1.amazonaws.com/');
    cy.get('.buttons').contains('Register').click();
  });
  
  Cypress.Commands.add('userLogin', (email: string, password: string): void => {
    email = 'newuser@gmail.com'
    password = 'User1234'
    cy.visit('http://citizen-connect-fe.s3-website.eu-north-1.amazonaws.com/');
    cy.get('[data-cy="login-btn"]').click();
    cy.get('[data-cy="loginEmail"]').type(email);
    cy.get('[data-cy="loginPass"]').type(password);
    cy.get('button').contains('Login').click();
  });
  
  Cypress.Commands.add('adminLogin', (email: string, password: string): void => {
    email = 'isnabangala@gmail.com'
    password = 'Admin1234'
    cy.visit('http://citizen-connect-fe.s3-website.eu-north-1.amazonaws.com/');
    cy.get('[data-cy="login-btn"]').click();
    cy.get('[data-cy="loginEmail"]').type(email);
    cy.get('[data-cy="loginPass"]').type(password);
    cy.get('button').contains('Login').click();
  });
  
  export {};
  
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }