import { Product } from "../models/Product.model";
import { PAGINATION_CONSTANTS } from "../constants/app.constants";
import { IPaginatedResponse } from "../types/pagination.types";
import { IProduct } from "../types/product.types";

export const getProductsService = async (
  cursor?: string,
  limit: number = PAGINATION_CONSTANTS.DEFAULT_LIMIT,
): Promise<IPaginatedResponse<IProduct>> => {
  const query = cursor ? { _id: { $gt: cursor } } : {};

  const products = await Product.find(query)
    .sort({ _id: 1 })
    .limit(limit + 1)
    .lean<IProduct[]>();

  const hasMore = products.length > limit;
  const data = hasMore ? products.slice(0, limit) : products;

  return {
    data,
    nextCursor: hasMore ? data[data.length - 1]._id : null,
    hasMore,
  };
};

export const createProductService = async (
  productData: Omit<IProduct, "_id" | "createdAt">,
): Promise<IProduct> => {
  const product = new Product(productData);
  const savedProduct = await product.save();

  return savedProduct.toObject() as IProduct;
};

export const searchProductsService = async (
  query: string,
): Promise<IProduct[]> => {
  const products = await Product.find({
    name: { $regex: query, $options: "i" },
  })
    .sort({ _id: 1 })
    .lean<IProduct[]>();

  return products;
};
