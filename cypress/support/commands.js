// ***********************************************
// This example commands.js shows you how to
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
//
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

Cypress.Commands.add('cadastro', (nome, email, senha, confirmarSenha) => {
    cy.visit('/cadastrar');
    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').type(nome);
    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type(email);
    cy.get('[data-test="register-password"]').type(senha);
    cy.get('[data-test="register-password2"]').type(confirmarSenha);
    cy.get('[data-test="register-submit"]').click();
});

Cypress.Commands.add('login', (email, senha) => {
    cy.visit('/cadastrar');
    cy.get('[data-test="register-login"]').click();
    cy.get('[data-test="login-email"] > .MuiInputBase-root > .MuiInputBase-input').type(email);
    cy.get('[data-test="login-password"] > .MuiInputBase-root > .MuiInputBase-input').type(senha);
    cy.get('[data-test="login-submit"]').click();
});