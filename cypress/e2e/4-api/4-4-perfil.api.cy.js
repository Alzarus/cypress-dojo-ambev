import user from '../../fixtures/usuario.json';

describe('Funcionalidade: Perfil via api', () => {
    let token;

    beforeEach(() => {
        cy.gerarToken(user.email, user.senha).then((tkn) => {
            token = tkn;
        });
    });

    it('[GET] - Deve consultar o perfil do usuário', () => {

        const options = {
            method: 'GET',
            url: '/api/profile/me',
            headers: {
                Cookie: token
            }
        };

        cy.request(options).then(($response) => {
            expect($response.status).to.equal(200);
            expect($response.body.githubusername).to.equal('https://github.com/alzarus');
            expect($response.body.skills[2]).to.equal('Cypress');
        });
    });

    it('[PUT] - Deve adicionar uma experiência profissional do usuário', () => {
        const options = {
            method: 'PUT',
            url: '/api/profile/experience',
            headers: {
                Cookie: token
            },
            body: {
                title: 'QA Especialist',
                company: 'Ambev',
                from: '2022-09-09'
            }
        };

        cy.request(options).then(($response) => {
            expect($response.status).to.equal(200);
            expect($response.body.experience[0].title).to.equal('QA Especialist');
            expect($response.body.experience[0].company).to.equal('Ambev');
        });

    });
});