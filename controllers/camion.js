const con = require('../database/config');
const c = con.con;

const getCamion = (req, res) => {
    try {
        c.query('call TransporteApp.sp_list_camion()', function (err, result) {
            if (err) {
                res.json({
                    ok: false,
                    statusCode: 404,
                    msn: err.message
                });
                console.log('ERRROR----->', err);
                return;
            } else {
                res.json({
                    codigo: 1,
                    camion: result[0]
                });
                return;
            }
        })
    } catch (error) {
        console.log('Error CATCH ----> ', error);
        return res.status(402).json({
            codigo: 7,
            msn: error
        });
    }
}

const crearCamion = (req, res) => {
    
    const { placa, ctipo, marca, modelo, color, descripcion, usr_crea } = req.body;

    try {
        c.query('call TransporteApp.sp_ins_camion(?,?,?,?,?,?,?,@codigo,@mensaje)', [placa, ctipo, marca, modelo, color, descripcion, usr_crea], function (err, result) {
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
                res.status(201).json({
                    codigo: result[0][0].codigo,
                    mensaje: result[0][0].mensaje
                });
                return;
            }
        });
    } catch (error) {
        console.log('Error CATCH ----> ', error);
        return res.status(402).json({
            codigo: 7,
            msn: error
        });
    }
}

const editCamion = (req, res) => {

    const { placa, ctipo, marca, modelo,estado, color, descripcion, usr_crea } = req.body;
    const id_ = req.params.id;
    try {
        c.query('call TransporteApp.sp_update_camion(?,?,?,?,?,?,?,?,?,@codigo, @mensaje)', [id_, placa, ctipo, marca, modelo, estado, color, descripcion, usr_crea],function(err, result){
            if (err) {
                res.json({
                  ok: false,
                  statusCode: 404,
                  msn: err.message
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
                res.status(201).json({
                  codigo: result[0][0].codigo,
                  mensaje: result[0][0].mensaje
                });
                return;
              }

        })
    } catch (error) {
        console.err('ERROR catch --->', error);
        return res.status(402).json({
          ok: false,
          msn: error
        });
    }
}

const delCamion = (req, res) => {

    const id_ = req.params.id;
    try {
      c.query('call TransporteApp.sp_del_camion(?,@codigo,@mensaje)', [id_], function (err, result) {
        if (err) {
          res.status(400).json({
            ok: false,
            msn: 'Error al consultar la base de datos.'
          });
          console.log('ERRROR----->', err.sqlMessage);
          return;
        }else {
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
          memsaje: error});
    }
}

module.exports = {
    getCamion, crearCamion, editCamion, delCamion
}