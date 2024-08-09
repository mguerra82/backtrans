const con = require('../database/config');
const bcript = require('bcryptjs');

/**
 * Berbo: GET
 * /api/usuarios/
 * @param {*} req 
 * @param {*} res 
 */
const getUsuarios = async (req, res) => {

    try {
        await con.con.query(`call TransporteApp.sp_listar_usuarios(@codigo, @mensaje)`, function (err, result, fields) {
            if (err) {
                res.json({
                    ok: false,
                    statusCode: 404,
                    msn: err.message
                });
                console.log('ERRROR----->', err);
                return;
            } else {
                console.log('RESULT----->', result[0].codigo);
                res.json({
                    codigo: 1,
                    usuario: result[0]
                });
                return;
            }
        });
    } catch (error) {
        console.log('Errir CATCH ----> ', error);
        return res.status(402).json({
            ok: false,
            msn: error});
    }

}

/**
 * Berbo: POST
 * /api/usuarios/:id
 * @param {idper,usuario,pass,tk,email,rol,intentos  } req 
 * @param {*} res 
 * @returns {odigo:1,2 :mensaje: El usuario se creo correctamente, El usuario ya existe}
 */
const crearUsuarios = async (req, res) => {

    const { idper, usuario, pass, tk, email, rol, intentos } = req.body;
    const salt = bcript.genSaltSync(10);
    console.log('Hash de encriptacion de constraseña.. ', salt);
    const passw = bcript.hashSync(pass, salt);
    console.log('Password encriptado.... ', passw);

    try {
        con.con.query(`call TransporteApp.sp_insert_usuario(?,?,?,?,?,?,?,@codigo, @mensaje)`, [idper, usuario, passw, tk, email, rol, intentos], function (err, result, fields) {
            if (err) {
                res.status(400).json({
                    ok: false,
                    msn: 'Error al consultar la base de datos.'
                });
                console.log('ERRROR----->', err.sqlMessage);
                return;
            }
            if (result[0][0].codigo === 1) {
                return res.status(200).json({
                    codigo: result[0][0].codigo,
                    mensaje: result[0][0].mensaje
                });
            } else {
                res.status(201).json({
                    codigo: result[0][0].codigo,
                    mensaje: result[0][0].mensaje
                });
                return;
            }
        });
    } catch (error) {
        console.log('ERROR -----> ', error);
        return res.status(402).json({
            ok: false,
            msn: error
        })

    }

}
/**
 * Berbo: PUT
 * /api/usuarios/:id
 * @param {idper,usuario,pass,tk ,email,rol,intentos} req 
 * @param {id} 
 * @returns {odigo:1,2 :mensje: El usuario se actualizo correctamente, El usuario no existe}
 * 
 */
const actualizaUsuario = (req, res) => {

    const { idper, usuario, pass, tk, email, rol, intentos, estado } = req.body;

    const id = req.params.id;
    console.log('Actualiza Usuario ID --->', req.params.id);
    console.log('Actualiza Usuario --->', req.body.tk);
    console.log('PASSWORD --->', pass);
    const salt = bcript.genSaltSync(10);
    console.log('Hash de encriptacion de constraseña.. ', salt);
    const passw = bcript.hashSync(pass, salt);
    console.log('Password encriptado.... ', passw);
    try {
        con.con.query(`call TransporteApp.sp_update_usuario(?,?,?,?,?,?,?,?,?,@codigo, @mensaje)`, [id, idper, usuario, passw, tk, email, rol, intentos, estado], function (err, result, fields) {
            if (err) {
                res.status(400).json({
                    ok: false,
                    msn: 'Error al consultar la base de datos.'
                });
                console.log('ERRROR----->', err.sqlMessage);
                return;
            }
            if (result[0][0].codigo === 1) {
                return res.status(200).json({
                    codigo: result[0][0].codigo,
                    mensaje: result[0][0].mensaje
                });
            } else {
                res.json({
                    codigo: result[0][0].codigo,
                    mensaje: result[0][0].mensaje
                });
                return;
            }
        });
    } catch (error) {
        console.log('ERROR -----> ', error);
        return res.status(402).json({
            ok: false,
            msn: error});
    }
}
/**
 * /api/usuario/:id
 * @param {} req 
 * @param {id} res 
 * @returns {codigo:1,2 :mensje: El usuario se elimino correctamente, El usuario no existe}
 */
const deleteUsuario = (req, res) => {
    const id  = req.params.id;
    console.log('ID --->', req.params.id);
    try {
        con.con.query(`call TransporteApp.sp_eliminar_usuarios(?,@codigo, @mensaje)`, [id], function (err, result, fields) {
            if (err) {
                res.status(404).json({
                    ok: false,
                    msn: 'Error en el servidor de aplicacion.'
                });
                console.log('ERRROR----->', err.sqlMessage);
                return;
            }
            if (result[0][0].codigo === 1) {
                return res.status(200).json({
                    codigo: result[0][0].codigo,
                    mensaje: result[0][0].mensaje
                });
            } else {
                res.json({
                    codigo: result[0][0].codigo,
                    mensaje: result[0][0].mensaje
                });
                return;
            }
        });
    } catch (error) {
        console.log('ERROR --->',error);
        return res.status(404).json({
            codigo: result[0][0].codigo,
            mensaje: error
        });
        
    }

}
module.exports = {
    getUsuarios, crearUsuarios, actualizaUsuario, deleteUsuario
}