///<reference types = "cypress"/>

const expPage = require('../../support/pages/add-experiencia.page');

describe('Funcionalidade: Adicionar experiência, autenticação API', () => {
    beforeEach(() => {
        cy.fixture("usuario").then((user) => {
            cy.gerarToken(user.email, user.senha).then((tkn) => {
                Cypress.env('token', tkn);

                cy.log('Autenticar usuário');

                // cy.clearCookies();
                cy.clearCookie('jwt');

                cy.setCookie('jwt', Cypress.env('token'));
            });

            cy.visit('/adicionar-experiencia');
        });
    });

    it('Deve adicionar a experiencia com sucesso (Uso de Page Objects)', () => {
        expPage.addExperiencia('QA', 'Ambev', 'Salvador', '01/12/2020', '12/12/2021', 'Experiencia em QA');
        cy.get('[data-test="experience-delete"]').should('exist');
    });

    it('Deve adicionar a experiencia Atual com sucesso (Uso de Page Objects)', () => {
        expPage.addExperienciaAtual('QA', 'Via', 'Rio de Janeiro', '01/12/2021', 'Experiencia em QA');
        cy.get('[data-test="experience-delete"]').eq(1).should('exist');
    });

});