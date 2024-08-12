const con = require('../database/config.js');

const c = con.con;

const getPilotos = (req, res) =>{

    try {
        c.query('call TransporteApp.sp_list_piloto()', function (err, result) {
          if (err) {
            res.json({
              ok: false,
              statusCode: 404,
              msn: err.message
            });
            console.log('ERRROR----->', err);
            return;
          }
          else {
            res.json({
              codigo: 1,
              piloto: result[0]
            });
            return;
          }
        });
      } catch (error) {
        console.err('ERROR catch --->', error);
        return res.status(402).json({
          ok: false,
          msn: error
        });
      }
}

const crearPiloto = (req,res)=>{
    const { id_trans, nombres, apellidos, fecha_nacimiento, dpi, licencia, fecha_vigencia, direccion, telefono, usr_crea } = req.body;
    try {
        c.query('call TransporteApp.sp_ins_piloto(?,?,?,?,?,?,?,?,?,?,@codigo,@mensaje)', [id_trans, nombres, apellidos, fecha_nacimiento, dpi, licencia, fecha_vigencia, direccion, telefono, usr_crea], function (err, result) {
            if (err) {
                res.status(400).json({
                    ok: false,
                    msn: 'Error al consultar la base de datos.'
                });
                console.log('ERRROR----->', err);
                return;
            } else {
                if (result[0][0].codigo === 1) {
                    return res.status(200).json({
                        codigo: result[0][0].codigo,
                        mensaje: result[0][0].mensaje
                    });
                }
                console.log('RESULT', result);
                res.status(203).json({
                    codigo: result[0][0].codigo,
                    mensaje: result[0][0].mensaje
                });
                return;
            }
        });

    } catch (error) {
        console.err('ERROR catch --->', error);
        return res.status(402).json({
            ok: false,
            msn: error
        });
    }
}

const actualizaPiloto = (req, res)=>{
    const { id_trans, nombres, apellidos, fecha_nacimiento, dpi, licencia, fecha_vigencia, direccion, telefono, estado, usr_crea } = req.body;
    const id_ = req.params.id;

    try {
        c.query('call TransporteApp.sp_update_piloto(?,?,?,?,?,?,?,?,?,?,?,?,@codigo,@mensaje)', [id_, id_trans, nombres, apellidos, fecha_nacimiento, dpi, licencia, fecha_vigencia, direccion, telefono,estado, usr_crea], function (err, result) {
           console.log('ERROOOORRR- --->',err);
           console.log('RESULT PILOTOS --->', result);
            if (err) {
                res.status(400).json({
                    ok: false,
                    msn: 'Error al consultar la base de datos.'
                });
                console.log('ERRROR----->', err);
                return;
            } else {
                console.log('RESULT PILOTOS --->', result);
                if (result[0][0].codigo === 1) {
                    return res.status(200).json({
                        codigo: result[0][0].codigo,
                        mensaje: result[0][0].mensaje
                    });
                }
                console.log('RESULT', result);
                res.status(203).json({
                    codigo: result[0][0].codigo,
                    mensaje: result[0][0].mensaje
                });
                return;
            }
        });

    } catch (error) {
        console.err('ERROR catch --->', error);
        return res.status(402).json({
            ok: false,
            msn: error
        });
    }
}

const delPiloto = (req, res )=>{
    const id_ = req.params.id;
    try {
      c.query('call TransporteApp.sp_del_producto(?,@codigo,@mensaje)', [id_], function (err, result) {
        if (err) {
          res.status(400).json({
            ok: false,
            msn: 'Error al consultar la base de datos.'
          });
          console.log('ERRROR----->', err.sqlMessage);
          return;
        }
        else {
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
        }
  
      })
    } catch (error) {
      console.log('ERROR -----> ', error);
      return res.status(402).json({
        codigo: 7,
        memsaje: error
      });
    }
}

module.exports = {
    getPilotos, crearPiloto, actualizaPiloto, delPiloto
}