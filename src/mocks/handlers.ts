import { graphql } from 'msw';
import { v4 as uuid } from 'uuid';
import GET_PRODUCTS, { GET_PRODUCT } from '../graphql/products';

const mockProducts = Array.from({ length: 30 }).map((_, i) => ({
  id: uuid(),
  imageUrl: `https://placeimg.com/200/150/${i + 1}`,
  price: 50000,
  title: `임시상품${i + 1}`,
  description: `임시상세내용${i + 1}`,
  createAt: new Date(1658414423252 + i * 1000 * 60 * 60 * 10).toString(),
}));

export const handlers = [
  graphql.query(GET_PRODUCTS, (req, res, ctx) => {
    return res(
      ctx.data({
        products: mockProducts,
      })
    );
  }),
  graphql.query(GET_PRODUCT, (req, res, ctx) => {
    const { variables } = req;
    const findProduct = mockProducts.find((item) => item.id === variables.id);
    if (!findProduct) throw new Error('Cannot find product');
    return res(ctx.data(findProduct));
  }),
];
