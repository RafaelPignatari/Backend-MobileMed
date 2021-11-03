const conexao = require('../infraestrutura/conexao')
const moment = require('moment')
class Atendimento
{
    adiciona(atendimento, res)
    {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')
        const dataAtendimento = moment(atendimento.dataAtendimento, 'DD/MM/YYYY').format('YYYY-MM-DD')
        const dataEhValida = moment(dataAtendimento).isSameOrAfter(dataCriacao)
        const nomeEhValido = atendimento.nomePaciente.length >= 5

        const validacoes = 
        [
            {
                nome: 'dataAtendimento',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'nomePaciente',
                valido: nomeEhValido,
                mensagem: 'Nome deve ter pelo menos cinco caracteres'
            }
        ]
        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if (existemErros)
        {
            res.status(400).json(erros)
        }
        else
        {
            const sql = "USE MobileMed;INSERT INTO Atendimentos (nomePaciente, idade, descAtendimento, nomeMedico, dataAtendimento, dataCriacao) VALUES ('"+
            atendimento.nomePaciente +"', '" +atendimento.idade +"', '" +atendimento.descAtendimento +"', '" +
            atendimento.nomeMedico +"', '" +dataAtendimento +"', '" +dataCriacao +"')"
            console.log(sql)
            conexao.query(sql, (erro, resultados) =>
            {
                if(erro)
                    res.status(400).json(erro)
                else
                    res.status(201).json(atendimento)
            })
        }
        
    }

    lista(res)
    {
        const sql = 'USE MobileMed;SELECT * FROM Atendimentos'

        conexao.query(sql, (erro,resultados) =>
        {
            if(erro)
                res.status(400).json(erro)
            else
                res.status(200).json(resultados.recordsets[0])
        })
    }

    buscaPorId(id, res)
    {
        const sql = 'USE MobileMed; SELECT * FROM Atendimentos WHERE id = ' +id
        conexao.query(sql, (erro, resultados) =>
        {
            const atendimento = resultados.recordset[0]
            if(erro)
                res.status(400).json(erro)
            else
                res.status(200).json(atendimento)
        })
    }

    altera(id, valores, res){       
        var sql = 'USE MobileMed;UPDATE Atendimentos SET '
        if(valores.nomePaciente != undefined)
            sql += "nomePaciente = '" +valores.nomePaciente +"', "
        if(valores.idade != undefined)
            sql += "idade = '" +valores.idade +"', "
        if(valores.descAtendimento != undefined)
            sql += "descAtendimento = '" +valores.descAtendimento +"', "
        if(valores.nomeMedico != undefined)
            sql += "nomeMedico = '" +valores.nomeMedico +"', "
        if(valores.dataAtendimento != undefined)
        {
            valores.dataAtendimento = moment(valores.dataAtendimento, 'DD/MM/YYYY').format('YYYY-MM-DD')
            sql += "dataAtendimento = '" +valores.dataAtendimento +"' "
        }
        sql += 'WHERE id=' +id
        conexao.query(sql.toString(), (erro, resultados) =>
        {
            if(erro)
                res.status(400).json(erro)
            else
                res.status(200).json(valores)
        })
    }

    deleta(id, res)
    {
        const sql = 'USE MobileMed;DELETE FROM Atendimentos WHERE id = ' +id
        conexao.query(sql, (erro, resultados) =>
        {
            if(erro)
            {
                res.status(400).json(erro)
            }
            else
            {
                res.status(200).json({id}) //devolvemos o id, pois é mais útil para o cliente
            }
        })
    }
}

module.exports = new Atendimento