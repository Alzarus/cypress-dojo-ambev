describe('Funcionalidade: Login via api', () => {
    it('Deve efetuar o login via api com sucesso', () => {
        cy.fixture("usuario").then((user) => {
            cy.request({
                method: 'POST',
                url: '/api/auth',
                body: {
                    email: user.email,
                    password: user.senha
                }
            }).should(($response) => {
                expect($response.status).to.equal(200);
                expect($response.body).to.have.property('jwt');
                expect($response.duration).to.below(500);
                expect($response.duration).be.lessThan(500);
            });
        });
    });
});