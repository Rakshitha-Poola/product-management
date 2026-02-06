import { Router } from 'express'
import { getProductsController } from '../controllers/product.controller'
import { createProductController, searchProductsController } from '../controllers/product.controller'

const router = Router()

router.get('/products', getProductsController)
router.post('/products', createProductController)
router.get('/products/search', searchProductsController)


export default router
