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

    it('Devo fazer o login sem sucesso, colocando e-mail inválido e senha com poucos caracteres', () => {
        cy.loginNew('aaaa', '123');
        // cy.get('[data-test="login-email"] > .MuiFormHelperText-root').should('be.visible').contains(/Digite/); //REGEX
        cy.get('[data-test="login-email"] > .MuiFormHelperText-root').should('be.visible').and('have.css', 'color', 'rgb(244, 67, 54)').and('contain', 'Digite um email válido');
        cy.get('[data-test="login-password"] > .MuiFormHelperText-root').should('be.visible').and('have.css', 'color', 'rgb(244, 67, 54)').and('contain', 'A senha deve conter no mínimo 6 caracteres');
    });

    it('Devo fazer o login sem sucesso, inserindo credenciais inválidas', () => {
        cy.loginNew('aaaa@hotmail.com', '1233456');

        cy.get('[data-test="alert"]').should('be.visible').and('contain', 'Credenciais inválidas');
    });
});