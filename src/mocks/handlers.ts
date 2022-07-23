import { graphql } from 'msw';
import { v4 as uuid } from 'uuid';
import { GET_CART, ADD_CART, CartType } from '../graphql/cart';
import GET_PRODUCTS, { GET_PRODUCT } from '../graphql/products';

const mockProducts = Array.from({ length: 30 }).map((_, i) => ({
  id: uuid(),
  imageUrl: `https://placeimg.com/200/150/${i + 1}`,
  price: 50000,
  title: `임시상품${i + 1}`,
  description: `임시상세내용${i + 1}`,
  createAt: new Date(1658414423252 + i * 1000 * 60 * 60 * 10).toString(),
}));

let cartData: { [key: string]: CartType } = (() => ({}))();

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
  graphql.query(GET_CART, (req, res, ctx) => {
    return res(ctx.data(cartData));
  }),
  graphql.mutation(ADD_CART, (req, res, ctx) => {
    const newData = { ...cartData };
    const { id } = req.variables;

    if (newData[id]) {
      newData[id] = {
        ...newData[id],
        amount: newData[id].amount + 1,
      };
    } else {
      const findProduct = mockProducts.find((item) => item.id === id);
      if (findProduct) {
        newData[id] = {
          ...findProduct,
          amount: 1,
        };
      }
    }
    cartData = newData;
    return res(ctx.data(newData));
  }),
];