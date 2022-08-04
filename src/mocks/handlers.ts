import { graphql } from 'msw';
import { v4 as uuid } from 'uuid';
import {
  GET_CART,
  ADD_CART,
  CartType,
  UPDATE_CART,
  DELETE_CART,
} from '../graphql/cart';
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
    const newCartData = { ...cartData };
    const id = req.variables.id;

    const targetProduct = mockProducts.find((item) => item.id === id);
    if (!targetProduct) throw new Error('상품을 찾을 수 없습니다.');

    const newItem = {
      ...targetProduct,
      amount: (newCartData[id]?.amount || 0) + 1,
    };
    newCartData[id] = newItem;
    cartData = newCartData;

    return res(ctx.data(newItem));
  }),
  graphql.mutation(UPDATE_CART, (req, res, ctx) => {
    const newData = { ...cartData };
    const { id, amount } = req.variables;

    if (!newData[id]) {
      throw new Error('해당 아이템을 찾을 수 없습니다.');
    }
    const newItem = {
      ...newData[id],
      amount,
    };

    newData[id] = newItem;
    cartData = newData;
    return res(ctx.data(newItem));
  }),
  graphql.mutation(DELETE_CART, ({ variables: { id } }, res, ctx) => {
    const newData = { ...cartData };
    delete newData[id];
    cartData = newData;
    return res(ctx.data(id));
  }),
];
