const getPilotos = (req, res) =>{

    res.json({
        ok:true,
        msg:'GET'
    })
}

const crearPiloto = (req,res)=>{
    res.json({
        ok:true,
        msg:'POST'
    })
}

const actualizaPiloto = (req, res)=>{
    res.json({
        ok:true,
        msg:'PUT'
    })
}

const delPiloto = (req, res )=>{
    res.json({
        ok:true,
        msg:'GET'
    })
}

module.exports = {
    getPilotos, crearPiloto, actualizaPiloto, delPiloto
}