const con = require('../database/config');

const c = con.con;
/**
 * GET
 * /api/tipoCamion
 * @param {*} req 
 * @param {*} res 
 * @returns json tipoCamion
 */
const getTipoCamion = (req, res) => {
  try {
    c.query('call TransporteApp.sp_list_tipo_camion()', function (err, result) {
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

/**
 * 
 * @param { descripcion, idusr } req 
 * @param {} res 
 * @returns {Codigo:1,2 :mensaje: El tipo de transporte se creo correctamente., El usuario esta bloqueado}
 */

const crearTipoCamion = async (req, res) => {

  const { descripcion, idusr } = req.body;
  console.log('AAAAAA', descripcion, ' ', idusr);

  try {
    c.query('call TransporteApp.sp_ins_tipo_camion(?,?,@codigo, @mensaje)', [descripcion, idusr], function (err, result) {
      if (err) {
        res.status(400).json({
          ok: false,
          msn: 'Error al consultar la base de datos.'
        });
        console.log('ERRROR----->', err);
        return;
      } else {
        if (result[0][0].codigo === 2) {
          return res.status(203).json({
            codigo: result[0][0].codigo,
            mensaje: result[0][0].mensaje
          });
        }
        console.log('RESULT', result);
        res.status(200).json({
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
    })
  }
}

/**
 * 
 * @param {id, descripcion, estado, usr_crea} req 
 * @param {*} res 
 * @returns {Codigo:1,2 :mensaje: El tipo de transporte se creo correctamente., El usuario esta bloqueado}
 */
const updateTipoCamion = async (req, res) => {
  const { descripcion, estado, usr_crea } = req.body;
  const id = req.params.id;

  try {
    c.query('call TransporteApp.sp_update_tipo_camion(?,?,?,?,@codigo, @mensaje)', [id, descripcion, estado, usr_crea], function (err, result) {
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
    console.log('Errir CATCH ----> ', error);
    return res.status(402).json({
      ok: false,
      msn: error
    });
  }
}

const delTipoCamion = async (req, res) => {
  const id_ = req.params.id;
  try {
    c.query('call TransporteApp.sp_del_tipo_camion(?,@codigo,@mensaje)', [id_], function (err, result) {
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
  getTipoCamion, crearTipoCamion, updateTipoCamion, delTipoCamion
}