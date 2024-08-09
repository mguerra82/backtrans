const con = require('../database/config');

const c = con.con;

const getEmpleado = (req, res) =>{
    try {
        c.query('call TransporteApp.sp_list_empleado()', function (err, result) {
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
              usuario: result[0]
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

const crearEmpleado = (req, res) => {

    const { nombres, apellidos, fecha_ingreso, fecha_nacimiento, dpi, nit, direccion, email, usr_crea } = req.body;
    console.log(nombres, apellidos, fecha_ingreso, fecha_nacimiento, dpi, nit, direccion, email, usr_crea);
    try {
        c.query('call TransporteApp.sp_ins_empleado(?,?,?,?,?,?,?,?,?,@codigo,@mensaje)', [nombres, apellidos, fecha_ingreso, fecha_nacimiento, dpi, nit, direccion, email, usr_crea], function (err, result) {
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

const actualizaEmpleado = (req, res )=>{

    const { nombres, apellidos, fecha_ingreso, fecha_nacimiento, dpi, nit, direccion, email, estado, usr_crea } = req.body;
    const id_ = req.params.id;
    console.log(id_ ,nombres, apellidos, fecha_ingreso, fecha_nacimiento, dpi, nit, direccion,estado, email, usr_crea);

    try {
        c.query('call TransporteApp.sp_update_empleado(?,?,?,?,?,?,?,?,?,?,?,@codigo,@mensaje)', [id_,nombres, apellidos, fecha_ingreso, fecha_nacimiento, dpi, nit, direccion, email, estado, usr_crea], function (err, result) {
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

const delEmpleado = (req, res)=>{
    const id_ = req.params.id;
  try {
    c.query('call TransporteApp.sp_del_empleado(?,@codigo,@mensaje)', [id_], function (err, result) {
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
    getEmpleado, actualizaEmpleado, crearEmpleado, delEmpleado
}