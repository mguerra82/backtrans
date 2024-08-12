const con = require('../database/config');

const c = con.con;

const getProducto = (req,res)=>{
    try {
        c.query('call TransporteApp.sp_list_producto()', function (err, result) {
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
              producto: result[0]
            });
            return;
          }
        });
      } catch (error) {
        return res.status(402).json({
          ok: false,
          msn: error
        });
      }

}

const crearProducto = (req,res)=>{

    const { nombre, unidad_medida, usuario_crea } = req.body;
    try {
        c.query('call TransporteApp.sp_ins_producto(?,?,?,@codigo,@mensaje)', [ nombre, unidad_medida, usuario_crea], function (err, result) {
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
        return res.status(402).json({
            ok: false,
            msn: error
        });
    }
    
}

const actualizaProducto = (req,res)=>{
    
    const { nombre, unidad_medida, usuario_crea } = req.body;
    const id_ = req.params.id;

    try {
        c.query('call TransporteApp.sp_update_producto(?,?,?,?,@codigo,@mensaje)', [id_, nombre, unidad_medida, usuario_crea], function (err, result) {
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
        return res.status(402).json({
            ok: false,
            msn: error
        });
    }
}

const delProducto = (req,res)=>{
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
    getProducto, crearProducto, actualizaProducto, delProducto
}