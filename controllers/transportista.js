const con = require('../database/config');

const c = con.con;

const getTransportista = (req, res) =>{
    try {
        c.query('call TransporteApp.sp_list_transportista()', function (err, result) {
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
              transportista: result[0]
            });
            return;
          }
        });
      } catch (error) {
        console.log('ERROR catch --->', error);
        return res.status(402).json({
          ok: false,
          msn: error
        });
      }
}

const crearTransportista = (req, res) =>{
    const { nit, razon_social, nombres, apellidos, dpi, direccion, telefono, email, imp_tributario, usr_crea } = req.body;
    try {
        c.query('call TransporteApp.sp_ins_transportista(?,?,?,?,?,?,?,?,?,?,@codigo,@mensaje)', [nit, razon_social, nombres, apellidos, dpi, direccion, telefono, email, imp_tributario, usr_crea], function (err, result) {
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

const updateTransportista = (req, res) =>{
    const { nit, razon_social, nombres, apellidos, dpi, direccion, telefono, email,estado, imp_tributario, usr_crea } = req.body;
    const id_ = req.params.id;
    console.log('ID -->', id_);

    try {
        c.query('call TransporteApp.sp_update_transportista(?,?,?,?,?,?,?,?,?,?,?,?,@codigo,@mensaje)', [id_,  nit, razon_social, nombres, apellidos, dpi,direccion, telefono, email,estado, imp_tributario, usr_crea], function (err, result) {
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


const delTransportista = (req, res) =>{
    const id_ = req.params.id;
    console.log('ID -->', id_);

    try {
      c.query('call TransporteApp.sp_del_transportista(?,@codigo,@mensaje)', [id_], function (err, result) {
        if (err) {
          res.status(400).json({
            ok: false,
            msn: 'Error al consultar la base de datos.'
          });
          console.log('ERRROR----->', err.sqlMessage);
          return;
        }
        else {
           // console.log('RESULT DEL TRANSPORTISTA-->', result);
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
    getTransportista, updateTransportista, delTransportista,crearTransportista
}