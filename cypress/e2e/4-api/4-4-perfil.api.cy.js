import user from '../../fixtures/usuario.json';

// API:
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
        // const testSkillsArray = testSkills.split(','); // string to array
        const testStatus = perfil.cargo;
        const testSkills = perfil.skill;
        const testCompany = perfil.empresa;
        const testLocation = perfil.localizacao;
        const testWebsite = perfil.site;
        const testBio = perfil.biografia;
        const testGithub = perfil.github;

        const options = {
            method: 'POST',
            url: '/api/profile',
            headers: {
                Cookie: token
            },
            body: {
                status: testStatus,
                skills: testSkills,
                company: testCompany,
                location: testLocation,
                website: testWebsite,
                bio: testBio,
                githubusername: testGithub
            }
        };

        cy.request(options).then(($response) => {
            //health check
            expect($response.status).to.equal(200);
            expect($response.duration).to.be.below(500);
            expect($response.body.status).to.equal(testStatus);

            const skillsString = $response.body.skills.join(', '); //array to string
            expect(skillsString).to.equal(testSkills);

            //contrato
            expect($response.body).to.include.keys("bio", "company", "date", "education", "experience",
                "githubusername", "location", "skills", "social", "status", "user", "website");

            //aceitacao
            expect($response.body.company).to.equal(testCompany);
            expect($response.body.location).to.equal(testLocation);
            expect($response.body.website).to.equal(testWebsite);
            expect($response.body.bio).to.equal(testBio);
            expect($response.body.githubusername).to.equal(testGithub);

        });
    });

    it('[POST] - Deve retornar falha no cadastro de perfil de usuário por não fornecer dados obrigatórios', () => {
        const options = {
            method: 'POST',
            url: '/api/profile',
            failOnStatusCode: false,
            headers: {
                Cookie: token
            }
        };

        cy.request(options).then((res) => {
            //health check
            expect(res.status).to.equal(400);
            expect(res.duration).to.be.below(500);

            //contrato
            expect(res.body).to.include.keys("errors");

            //aceitacao
            res.body.errors.forEach(element => {
                // expect(element.msg).to.include('Status' || 'Skills');
                expect(element).to.have.keys("msg", "param", "location");
            });
        })
    });

    //todo: continuar
    it('[DELETE] - Deve realizar exclusão de experiência profissional', () => {
        const optionsGet = {
            method: 'GET',
            url: '/api/profile',

        }

        // health check - garantir que esta funcionando
        // contrato - garantir que o endpoint não teve seus atributos alterados
        // aceitação - garantir que o endpoint funciona ou apresenta os resultados de falha esperados
        // funcional - garantir que um conjunto de endpoints funcionam como na UI
        // https://conexaoqa.herokuapp.com/api-docs/#/


        const optionsDelete = {
            method: 'DELETE',
            url: `/api/profile/experience/${expId}`,
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

    it('[PUT] - Deve realizar inclusão de formação acadêmica', () => {
        const options = {
            method: 'PUT',
            url: '/api/profile/education',
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