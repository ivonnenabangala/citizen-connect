/// <reference types="cypress"/> 
describe('It validates Login form', () => {
    beforeEach(() => {
        cy.toLogin()
    })
    it('Login button should be disabled initially', () => {
        cy.get('button[type="submit"]').should('be.disabled');
    });


    it('Validates if email is valid', () => {
        cy.get('form').should('be.visible');
        cy.get('input[formControlName="email"]').should('exist').type('email@gmail.com');
        cy.get('input[formControlName="password"]').should('exist').type('password');
        cy.get('button').contains('Login').should('not.be.disabled').click();
        cy.get('mat-spinner', { timeout: 10000 }).should('exist'); 
        cy.get('mat-spinner', { timeout: 10000 }).should('not.exist');
    });

    it('Validates if password is valid', () => {
        cy.get('form').should('be.visible');
        cy.get('input[formControlName="email"]').should('exist').type('newuser@gmail.com');
        cy.get('input[formControlName="password"]').should('exist').type('password');
        cy.get('button').contains('Login').should('not.be.disabled').click();
        cy.get('mat-spinner', { timeout: 10000 }).should('exist'); 
        cy.get('mat-spinner', { timeout: 10000 }).should('not.exist');
    })
})

describe('It Logs in admin and users', () => {
    beforeEach(() => {
        cy.toLogin()
    })
    it('Logs in users', () => {
        cy.get('form').should('be.visible');
        cy.get('input[formControlName="email"]').should('exist').type('newuser@gmail.com');
        cy.get('input[formControlName="password"]').should('exist').type('User1234');
        cy.get('button').contains('Login').should('not.be.disabled').click();
        cy.get('mat-spinner', { timeout: 10000 }).should('exist'); 
        cy.get('mat-spinner', { timeout: 10000 }).should('not.exist');
    });

    it('Logs in an admin', () => {
        cy.get('form').should('be.visible');
        cy.get('input[formControlName="email"]').should('exist').type('isnabangala@gmail.com');
        cy.get('input[formControlName="password"]').should('exist').type('Admin1234');
        cy.get('button').contains('Login').should('not.be.disabled').click();
        cy.get('mat-spinner', { timeout: 10000 }).should('exist'); 
        cy.get('mat-spinner', { timeout: 10000 }).should('not.exist');
    })
})

describe('It validates Registration form', () => {
    beforeEach(() => {
        cy.toReg()
    })
    it('Register button should be disabled initially', () => {
        cy.get('button[type="submit"]').should('be.disabled');
    });


    it('Creates a new user', () => {
        cy.get('form').should('be.visible');
        cy.get('input[formControlName="username"]').should('exist').type('Evans');
        cy.get('input[formControlName="email"]').should('exist').type('evannji99@gmail.com');
        cy.get('input[formControlName="password"]').should('exist').type('User1234');
        cy.get('button').contains('Register').should('not.be.disabled').click();
        cy.get('mat-spinner', { timeout: 10000 }).should('exist'); 
        cy.get('mat-spinner', { timeout: 10000 }).should('not.exist');
    });

})