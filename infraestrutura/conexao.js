const sql = require('mssql')

const conexao =new sql.ConnectionPool({
    server: 'DESKTOP-S82QJ10',
    user: 'sa',
    password: '123456',

    options: {
        port: 1433,
        database: 'MobileMed',
        trustServerCertificate: true
    }
})

module.exports = conexao