import { gql } from 'apollo-server-express';
import cartSchema from './cart';
import productSchema from './product';

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

export default [linkSchema, productSchema, cartSchema];
