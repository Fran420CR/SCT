const jwt  = require("jsonwebtoken");

const generarJWT = ( cedula, nombre )=>{

    const payload = {cedula, nombre};

    return new Promise( (resolve, reject)=>{
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '12h'
        }, (err, token)=>{
    
            if(err){
                console.log(err);
                reject( err );
            }
    
            resolve( token );
        });
    });
};

module.exports = {
    generarJWT
}
