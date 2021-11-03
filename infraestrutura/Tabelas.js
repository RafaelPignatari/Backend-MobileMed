class Tabelas
{
    init(conexao)
    {
        this.conexao = conexao
        this.criarAtendimentos()
    }

    criarAtendimentos()
    {
        const sql = 'USE "MobileMed";' +
        "if object_id('Atendimentos') is null BEGIN " +
        'CREATE TABLE Atendimentos (id INT NOT NULL IDENTITY(1,1),' +
        'nomePaciente VARCHAR(50) NOT NULL, idade int NOT NULL, descAtendimento TEXT, ' +
        'nomeMedico VARCHAR(50) NOT NULL,dataAtendimento DATETIME NOT NULL, ' +
        'dataCriacao DATETIME NOT NULL,  PRIMARY KEY(id)); END'

        this.conexao.query(sql, (erro) => 
        {
            if(erro)
                console.log(erro)
            else
                console.log('Tabela Atendimentos criada com sucesso!')
        })
    }
}

module.exports = new Tabelas