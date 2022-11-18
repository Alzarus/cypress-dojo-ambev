///<reference types = "cypress"/>

describe('Funcionalidade: Ver dashboard utilizando mock', () => {
    beforeEach(() => {
        cy.fixture("usuario").then((user) => {
            cy.gerarToken(user.email, user.senha).then((tkn) => {
                Cypress.env('token', tkn);

                cy.log('Autenticar usuário');

                // cy.clearCookies();
                cy.clearCookie('jwt');

                cy.setCookie('jwt', Cypress.env('token'));
            });

            cy.visit('/dashboard');
        });
    });

    it('Deve validar os dados mockados em tela, utilizando intercept', () => {
        cy.fixture("perfilMockAuth").then((perfilMockAuth) => {
            cy.intercept('GET', '/api/auth', {
                statusCode: 200,
                body: perfilMockAuth,
                headers: `jwt=${Cypress.env('token')}`
            }).as('getMockDashboardAuth');
        });

        //utilizar para longas requests
        // cy.wait('@getMockDashboardAuth');

        cy.fixture("perfilMockMe").then((perfilMockMe) => {
            cy.intercept('GET', '/api/profile/me', {
                statusCode: 200,
                body: perfilMockMe
            }).as('getMockDashboardMe');
        });

        cy.reload();

        // cy.wait('@getMockDashboardMe');

        cy.get('.large').should('be.visible').and('have.text', 'Dashboard');

        //todo: continuar
    });
});