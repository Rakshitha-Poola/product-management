// server/src/controllers/product.controller.ts

import { Request, Response } from 'express'
import { getProductsService } from '../services/product.service'
import { HttpStatus } from '../constants/app.constants'
import { createProductService, searchProductsService } from '../services/product.service'

export const getProductsController = async (req: Request,res: Response): Promise<void> => {
  const { cursor, limit } = req.query
  const result = await getProductsService(
    cursor as string | undefined,
    limit ? Number(limit) : undefined
  )

  res.status(HttpStatus.OK).json({
    data: result.data,
    pagination: {
      nextCursor: result.nextCursor,
      hasMore: result.hasMore,
    },
  })
}


export const createProductController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const product = await createProductService(req.body)
  res.status(HttpStatus.CREATED).json(product)
}

// SEARCH PRODUCTS
export const searchProductsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { q } = req.query

  const products = await searchProductsService(q as string)
  res.status(HttpStatus.OK).json(products)
}