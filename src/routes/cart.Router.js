const express = require('express')


const { Router } = express;
const cartRouter = new Router();


// importamos la clase Container
const ContainerCart = require('../container/ContainerCart')

// Se instancia la clase contenedor
const ProductCart = new ContainerCart("./src/carrito.json")



// Endpoints
cartRouter.post('/', async (req, res) => {
    // logica
    try {
        const result = await ProductService.save(req.body)
        return res.status(200).redirect('/')
    } catch (error) {
        return res.status(500).json({ error: 'Error al insertar el registro' })
    }
})

cartRouter.delete('/:id', async (req, res) => {
    // logica
    try {
        return res.status(200).json(await ProductService.deleteById(req.params.id))
    } catch (error) {
        return res.status(500).json({ error: 'Error al eliminar el registro' })
    }
})

cartRouter.get('/:id/products', async (req, res) => {
    // logica
    try {
        return res.status(200).json(await ProductService.getById(req.params.id))
    } catch (error) {
        return res.status(500).json({ error: 'Error al consultar la data' })
    }
})


cartRouter.post('/:id/products', async (req, res) => {
    // logica

    res.json()
})


cartRouter.delete('/:id/products/:id_prod', async (req, res) => {
    // logica

    res.json()
})

module.exports = cartRouter