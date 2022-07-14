import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetcher, QueryKeys } from '../../queryClient';
import { Product } from '../../types';

const ProductDetail = () => {
  const { id } = useParams();
  const { data } = useQuery<Product>([QueryKeys.PRODUCTS, id], () =>
    fetcher({
      method: 'GET',
      path: `/products/${id}`,
    })
  );

  if (!data) return null;

  const {
    category,
    title,
    image,
    description,
    price,
    rating: { rate },
  } = data;

  return (
    <div className='product-detail'>
      <p className='product-detail__category'>{category}</p>
      <p className='product-detail__title'>{title}</p>
      <img className='product-detail__image' src={image} />
      <p className='product-detail__description'>{description}</p>
      <span className='product-detail__price'>${price}</span>
      <span className='product-detail__rating'>{rate}</span>
    </div>
  );
};

export default ProductDetail;
