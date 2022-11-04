describe('Funcionalidade: Cadastrar perfil', () => {

    const perfil = {
        empresa: 'Ambev',
        site: 'https://www.ambev.com.br',
        localizacao: 'Salvador',
        skill: 'JavaScript, Python, Cypress, Java',
        github: 'https://github.com/alzarus',
        biografia: 'Olá, sou o Pedro Almeida',
    };

    beforeEach(() => {
        cy.fixture("usuario").then((data) => {
            cy.loginNew(data.email, data.senha);
            cy.get('[data-test="dashboard-welcome"]').should('contain', data.nome);
        })
        cy.visit('/criar-perfil');
    });

    it('Deve criar perfil com sucesso', () => {
        cy.get('#mui-component-select-status').click();
        cy.wait(5000);
        // cy.get('.MuiList-root').find('[data-value="Especialista em QA"]').click();
        // cy.contains('Especialista em QA').click();
        cy.get('.MuiList-root').contains('Especialista em QA').click();


        cy.get('[data-test="profile-company"] > .MuiInputBase-root > .MuiInputBase-input').type(perfil.empresa);
        cy.get('[data-test="profile-webSite"] > .MuiInputBase-root > .MuiInputBase-input').type(perfil.site);
        cy.get('[data-test="profile-location"] > .MuiInputBase-root > .MuiInputBase-input').type(perfil.localizacao);
        cy.get('[data-test="profile-skills"] > .MuiInputBase-root > .MuiInputBase-input').type(perfil.skill);
        cy.get('[data-test="profile-gitHub"] > .MuiInputBase-root > .MuiInputBase-input').type(perfil.github);
        cy.get('[data-test="profile-bio"] > .MuiInputBase-root').type(perfil.biografia);

        cy.get('[data-test="profile-submit"]').click();
        cy.get('[data-test="dashboard-editProfile"]').should('exist').and('be.visible');
    });

    it('Deve criar o perfil com sucesso, usando command', () => {
        cy.criarPerfil(perfil.empresa, perfil.site, perfil.localizacao, perfil.skill, perfil.github, perfil.biografia);
        cy.get('[data-test="dashboard-editProfile"]').should('exist').and('be.visible');
    });
});