import user from '../../fixtures/usuario.json';

// API:
// •	Cadastro de perfil:
// o	cenário validar exclusão de experiência do usuário;
// o	cenário validar inclusão de formação acadêmica.
// Fiquem a vontade em tentar implementar outros tipos de cenário, vai ser bom para validar o conhecimento e praticar.

const perfil = {
    empresa: 'Ambev',
    cargo: 'Especialista em QA',
    site: 'https://www.ambev.com.br',
    localizacao: 'Salvador',
    skill: 'JavaScript, Python, Cypress, Java',
    github: 'https://github.com/alzarus',
    biografia: 'Olá, sou o Pedro Almeida',
};

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

    it('[POST] - Deve realizar cadastro de perfil do usuário', () => {
        const options = {
            method: 'POST',
            url: '/api/profile',
            headers: {
                Cookie: token
            },
            body: {
                company: perfil.empresa,
                status: 'Ambev',
                from: '2022-09-09'
            }
        };        
    });

    it('[PUT] - Deve realizar inclusão de formação acadêmica', () => {
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
    });

    it('[DELETE] - Deve realizar remoção de experiência profissional', () => {
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
    });
});