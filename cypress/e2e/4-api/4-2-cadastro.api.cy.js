describe('Funcionalidade: Cadastro via api', () => {
    it('Deve fazer o cadastro com sucesso', () => {
        var email = `pedro${Math.floor(Math.random() * 10000)}@dojo.com.br`
        var senha = '123456';

        cy.request({
            method: 'POST',
            url: '/api/users',
            body: {
                "name": "Pedro",
                "email": email,
                "password": senha
            }
        }).then(($response) => {
            expect($response.status).to.equal(201);
            expect($response.body).to.have.property('jwt');
        });
    });
    
});