const con = require('../database/config');
const c = con.con;

const getTipoAnticipo = (req, res) =>{
    try {
        c.query('call TransporteApp.sp_list_tipo_anticipo()', function (err, result) {
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
                  tipoAnticipo: result[0]
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

const creartTipoAnticipo = (req, res) =>{
    const { descripcion, aplica_manejo, tan_tipo, usuario_crea } = req.body;
    try {
        c.query('call TransporteApp.sp_ins_tip_anticipo(?,?,?,?,@codigo,@mensaje)', [ descripcion, aplica_manejo, tan_tipo, usuario_crea ], function (err, result) {
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

const acualizaTipoAnticipo = (req, res) =>{
    const { descripcion, aplica_manejo, tan_tipo,estado, usuario_crea  } = req.body;
    const id_ = req.params.id;
    try {
        c.query('call TransporteApp.sp_update_tipo_anticipo(?,?,?,?,?,?,@codigo,@mensaje)', [id_, descripcion, aplica_manejo, tan_tipo, estado, usuario_crea ], function (err, result) {
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

const delTipoAnticipo = (req, res) =>{
    const id_ = req.params.id;
    try {
      c.query('call TransporteApp.sp_del_tipo_anticipo(?,@codigo,@mensaje)', [id_], function (err, result) {
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
    getTipoAnticipo, creartTipoAnticipo, acualizaTipoAnticipo, delTipoAnticipo
}