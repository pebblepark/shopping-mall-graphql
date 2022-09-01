import { Product } from '../../graphql/products';

const ProductList = ({
  list,
  Item,
}: {
  list: { products: Product[] }[];
  Item: ({ id, imageUrl, price, title }: Product) => JSX.Element;
}) => (
  <ul className='products'>
    {list.map((page) =>
      page.products.map((product) => <Item {...product} key={product.id} />)
    )}
  </ul>
);

export default ProductList;
