describe('Teste de api', () => {

    const dojo = {
        aula: 'API',
        duracao: 3,
        professor: 'Renato',
    };

    it('Validar dojo', () => {
        expect(dojo.aula).to.equal('API');
        expect(dojo.duracao).to.equal(3);
        expect(dojo.professor).to.equal('Renato');
        expect(dojo.professor).to.contain("Renato");
    });

    var numero = [0, 2, 4, 6, 8, 10];

    it('Validar array', () => {
        expect(numero).to.have.lengthOf(6);
        expect(numero[1]).to.equal(2);

    });

    const alunos = [
        { usuario: 'William', cargo: 'QA' },
        { usuario: 'Jana', cargo: 'QA' }
    ]

    it('Validar alunos', () => {
        expect(alunos[0].usuario).to.equal('William');
        expect(alunos[1].cargo).to.equal('QA');
    });

});