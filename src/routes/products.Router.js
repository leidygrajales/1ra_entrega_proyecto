const express = require('express')


const { Router } = express;
const productosRouter = new Router();


// importamos la clase Container
const ContainerArchivo = require('../container/Container.js')

// Se instancia la clase contenedor
const ProductService = new ContainerArchivo("./src/productos.json")


// funcion Error
function crearErrorNoEsAdmin(ruta, metodo) {
    const error = {
        error: -1,
    }
    if (ruta && metodo) {
        error.descripcion = `ruta '${ruta}' metodo '${metodo}' no autorizado`
    } else {
        error.descripcion = 'no autorizado'
    }
    return error
}

// Middleware para Administrador
const esAdmin = true

function soloAdmins(req, res, next) {
    if (!esAdmin) {
        res.json(crearErrorNoEsAdmin(req.url, req.method))
    } else {
        next()
    }
}


// Endpoints
productosRouter.get('/', async (req, res) => {
    // logica
    try {
        return res.status(200).json(await ProductService.getAll())
    } catch (error) {
        return res.status(500).json({ error: 'Error al consultar la data' })
    }

})
//    -->   /api/productos/5
productosRouter.get('/:id', async (req, res) => {
    // logica
    try {
        return res.status(200).json(await ProductService.getById(req.params.id))
    } catch (error) {
        return res.status(500).json({ error: 'Error al consultar la data' })
    }

})

// tiene permisos un admin
productosRouter.post('/', soloAdmins, async (req, res) => {
    // logica
    try {
        const result = await ProductService.save(req.body)
        return res.status(200).redirect('/')
    } catch (error) {
        return res.status(500).json({ error: 'Error al insertar el registro' })
    }

})

productosRouter.put('/:id', soloAdmins, async (req, res) => {
    // logica

    try {
        return res.status(200).json(await ProductService.updateById(req.params.id, req.body))
    } catch (error) {
        return res.status(500).json({ error: 'Error al actualizar el registro' })
    }
})

productosRouter.delete('/:id', soloAdmins, async (req, res) => {
    // logica
    try {
        return res.status(200).json(await ProductService.deleteById(req.params.id))
    } catch (error) {
        return res.status(500).json({ error: 'Error al eliminar el registro' })
    }

})


module.exports = productosRouter