import usuarios from '../../fixtures/usuarios.json'

describe('Funcionalidade: Login', () => {

    beforeEach(() => {
        cy.visit('/login');
    });

    it('Devo fazer o login com sucesso', () => {
        cy.get('[data-test="login-email"] > .MuiInputBase-root > .MuiInputBase-input').type('pedrocypress@dojo.com.br');
        cy.get('[data-test="login-password"] > .MuiInputBase-root > .MuiInputBase-input').type('123456');
        cy.get('[data-test="login-submit"]').click();

        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Pedro Curso Cypress');
    });

    it('Devo fazer o login com sucesso, usando fixture', () => {
        cy.fixture("usuario").then((user) => {
            cy.loginNew(user.email, user.senha);
            cy.get('[data-test="dashboard-welcome"]').should('contain', user.nome);
        });
    });

    it('Devo fazer o login com sucesso, usando importacao', () => {
        cy.loginNew(usuarios[0].email, usuarios[0].senha);
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo');
    });

});