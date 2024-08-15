const con = require('../database/config');

const c = con.con;

const getPoilizaDet =(req, res) =>{
    try {
        c.query('call TransporteApp.sp_list_proc_poliza_det()', function (err, result) {
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

const crearPoilizaDet =(req, res) =>{
    const { poliza, transportista, camion, piloto, tarifa, tipo, cant_bultos, cant_piezas, valor, peso_kilos, observaciones, det_tc, usuario_crea }  = req.body;

    try {
        c.query('call TransporteApp.sp_ins_proc_poliza_det(?,?,?,?,?,?,?,?,?,?,?,?,?,@codigo,@mensaje)', [poliza, transportista, camion, piloto, tarifa, tipo, cant_bultos, cant_piezas, valor, peso_kilos, observaciones, det_tc,usuario_crea ], function (err, result) {
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

const actualizaPoilizaDet =(req, res) =>{
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

const delPoilizaDet =(req, res) =>{
    res.json({
        ok:true,
        msn:'DEL'
    })
}

module.exports = {
    getPoilizaDet, crearPoilizaDet, actualizaPoilizaDet, delPoilizaDet
}