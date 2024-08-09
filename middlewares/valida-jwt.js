const jsonwebtoken = require("jsonwebtoken");
const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next)=>{

    //leer el token
    const token = req.header('x-token');

    console.log('TOKEN --->', token);

    if(!token){
        return res.status(401).json({
            ok:false,
            msn:'No hay token en la validacion'
        })
    }
    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        console.log('ID---->', uid);
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msn:'Token incorrecto'
        })
    }

    next();
}

module.exports = {
    validarJWT
}
