/// <reference types = "cypress"/>

const faker = require('faker-br');

describe('Funcionalidade: Cadastro', () => {

    beforeEach(() => {
        cy.visit('/cadastrar');
    });

    it('Cadastro com sucesso', () => {
        let nome = `${faker.name.firstName()} ${faker.name.lastName()}`;
        let email = faker.internet.email(nome);
        let senha = faker.internet.password();

        cy.cadastro(nome, email, senha, senha);

        cy.get('.large').should('contain', 'Dashboard');
        cy.contains(nome).should('exist');

    });

    it('Devo validar a mensagem quando cadastrar com e-mail já existente', () => {
        let nome = 'Augusto';
        let email = faker.internet.email(nome);
        let senha = 'qualquercoisa';
        let confirmarSenha = 'qualquercoisa';

        cy.cadastro(nome, email, senha, confirmarSenha);

        cy.get('[data-test="navbar-logout"] > .hide-sm').click();

        cy.cadastro(nome, email, senha, confirmarSenha);

        cy.get('[data-test="alert"]').should('have.text', 'Usuário já registrado');
        // cy.contains('Usuário já registrado').should('exist');
    });

    it('Devo validar as mensagens de campos obrigatórios', () => {
        cy.get('[data-test="register-submit"]').click();

        cy.get('[data-test="register-name"] > .MuiFormHelperText-root').should('have.text', 'Email é obrigatório');
        cy.get('[data-test="register-email"] > .MuiFormHelperText-root').should('have.text', 'Email é obrigatório');
        cy.get('[data-test="register-password"] > .MuiFormHelperText-root').should('have.text', 'Senha é obrigatória');
        cy.get('[data-test="register-password2"] > .MuiFormHelperText-root').should('have.text', 'Confirmar senha é obrigatória');

    });

    it('Realizar cadastro, realizar logout e realizar login através do hiperlink da página cadastro', () => {
        let nome = `${faker.name.firstName()} ${faker.name.lastName()}`;
        let email = faker.internet.email(nome);
        let senha = faker.internet.password();

        cy.cadastro(nome, email, senha, senha);

        cy.get('[data-test="navbar-logout"]').click();

        cy.login(email, senha);

        cy.get('.large').should('contain', 'Dashboard');
        cy.contains(nome).should('exist');

    });

});

// describe('Funcionalidade: Cadastro', () => {
//     context('Fluxos principais', () => { // Separar os contextos dos meus testes
//         it('', () => {

//         });
//     });

//     context('Fluxos alternativos', () => { // cenário de teste ou caso de teste ou história de teste

//     });
// });

/*
BDD
    Funcionalidade: Cadastro

    Cenário: Cadastro com sucesso
    Dado que eu esteja na tela de cadastro
    Quando eu preencher os campos obrigatórios
    Então deve direcionar para a dashboard

    Cenário: Cadastro com pessoa jurídica

    Cenário: Cadastro com e-mail inválido

HOOKS
    Before (antes de todos cs cenários)
    visit
    login
    input dados
    criar conexao de banco de dados

    Before each (antes de cada cenéario)

    After (depois de todos os cenários)
    Matar a conexão com o banco de dados

    After each (depois de cada cenário)
    gerar um screenshot - evidencia
*/

