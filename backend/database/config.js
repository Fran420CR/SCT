const oracledb = require('oracledb');

cns = {
    user: "SCTUNA",
    password: "SCTUNA",
    connectString: "localhost:1521/xe"
}

const dbConnection = async (sql, binds, autoCommit)=>{
    let cnn = await oracledb.getConnection(cns);
    let dbResponse = await cnn.execute(sql, binds, { autoCommit });
    cnn.release();
    return dbResponse;
};

module.exports ={
    dbConnection
};