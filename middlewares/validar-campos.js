const { response } = require('express');
const { validationResult } = require('express-validator')

const validarCampos = (req, res = response, next )=>{
   
    const errores = validationResult ( req );
   
    const mensaje = errores.errors[0];
    
    if(!errores.isEmpty()){
        return res.status(400).json({
            codigo:7,
            mensaje:mensaje["msg"]
        })
    }
    next();
}

module.exports = {
    validarCampos
}