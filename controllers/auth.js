const con = require('../database/config');
const { response } = require('express');
const bcript = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async(req, res = response)=>{

    const r_usuario = req.body.usuario;
    const r_password = req.body.password;

    console.log('RESPONSE ---->', r_usuario, ' ', r_password);
    /**
     * Consulta el usuario a la base de datas
     */
    try {
        con.con.query('SELECT id,intentos, estado, usuario, password FROM TransporteApp.usuarios where usuario = ? ', [r_usuario], async function (err, result) {
            if (err) {
                res.json({
                    ok: false,
                    statusCode: 400
                });
                console.log('ERROR --->', err.message);
                return;
            } else {
                const id_ = result[0].id;
                const intentos_ = result[0].intentos;
                console.log('ID y Intentos ', id_, ' ',intentos_)
                console.log('RESULT---->', result);
                /**
                 * Valida si existe el usuario
                 */
                if (!result[0]) {
                    res.status(200).json({
                        ok: true,
                        msg: 'Usuario o pasword no existen.'
                    });
                    return;
                } else {
                    /**
                     * Valida si el usuario esta bloqueado
                     */
                    if(result[0].estado === 'B'){
                        res.status(200).json({
                            ok: true,
                            msg: 'Usuario bloqueado.'
                        });
                        return;
                    }
                    const validaPassword = bcript.compareSync(r_password, result[0].password);
                    console.log('Validacion PASWORD ---> ', validaPassword);
                    if (!validaPassword) {
                            /**
                             * Valida si el los intentos son menores a 3 
                             * caso contrario incrementa + 1
                             */
                            if(intentos_ <= 3){
                                console.log('INTENTOS ELSE --->', intentos_);
                                con.con.query( 'update TransporteApp.usuarios set intentos = ? where id = ?', [intentos_+1,id_ ],function(err, result){
                                    if(err){
                                        return res.json({
                                             codigo: 5,
                                             msn: 'Error al actualizar el estado del usuario'
                                         });
                                     }  
                                })
                            }
                            /**
                             * valida que los intentos sean igual a 4 para bloquear el usuario.
                             */
                            if(intentos_ === 4){
                                    console.log('INTENTOS --->', intentos_);
                                    con.con.query('update TransporteApp.usuarios set estado = ? where id = ?',['B', id_], function(err, result)  {
                                        if(err){
                                           return res.json({
                                                codigo: 4,
                                                msn: 'Error al actualizar el estado del usuario'
                                            });
                                        }
                                     
                                        })
                                }
                        res.status(200).json({
                            ok: true,
                            msg: 'Contraseña invalida.'
                        });
                        return;
                    } else {
                        /**
                         * Si el usuario y contraseña son correctos, actualiza intentos = 0
                         */
                        con.con.query( 'update TransporteApp.usuarios set intentos = ? where id = ?', [0,id_ ],function(err, result){
                            if(err){
                                return res.json({
                                     codigo: 6,
                                     msn: 'Error al actualizar el estado del usuario'
                                 });
                             }  
                        })
                        console.log('Validacion PASWORD ---> ', validaPassword);
                        console.log('RETORNO ---> ', result[0].usuario, ' ', result[0].password);
                        const uid = result[0].id;
                        const token = await generarJWT(uid);
                        console.log('TOKEN ---->', token);
                        res.status(200).json({
                            ok: true,
                            tk: token,
                            usr:uid,
                            msg: 'Bienvenido al sistema.'
                        });
                        return;
                    }

                }
            }
        })

    } catch (error) {
        console.log('ERROR --->',error);
        res.status(500).json({
            ok:false,
            msg:'Conctacte al administrador'
        })
    }
}



module.exports={
    login
}