import { Product } from '../../graphql/products';
import ProductItem from './Item';

const ProductList = ({ list }: { list: Product[] }) => (
  <ul className='products'>
    {list.map((product) => (
      <ProductItem {...product} key={product.id} />
    ))}
  </ul>
);

export default ProductList;
