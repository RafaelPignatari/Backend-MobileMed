const customExpress = require('./config/customExpress')
const conexao = require('./infraestrutura/conexao')
const Tabela = require('./infraestrutura/Tabelas')
const app = customExpress()

conexao.connect(erro =>
{
    if (erro) 
        console.log(erro)
    else
    {
        app.listen(3000, () => console.log('O servidor está rodando na porta 3000'))
        console.log('Conexão com o banco OK')
        Tabela.init(conexao)
    }
})