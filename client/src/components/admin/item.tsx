import { SyntheticEvent } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import {
  DELETE_PRODUCT,
  MutableProduct,
  Product,
  UPDATE_PRODUCT,
} from '../../graphql/products';
import { graphqlFetcher, QueryKeys } from '../../queryClient';
import arrToObj from '../../util/arrToObj';

const AdminItem = ({
  id,
  imageUrl,
  price,
  title,
  description,
  createdAt,
  isEditing,
  startEdit,
  doneEdit,
}: Product & {
  isEditing: boolean;
  startEdit: () => void;
  doneEdit: () => void;
}) => {
  const queryClient = useQueryClient();
  const { mutate: updateProduct } = useMutation(
    ({ title, imageUrl, price, description }: MutableProduct) =>
      graphqlFetcher(UPDATE_PRODUCT, {
        id,
        title,
        imageUrl,
        price,
        description,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.PRODUCTS, {
          refetchInactive: true,
        });
        doneEdit();
      },
    }
  );

  const { mutate: deleteProduct } = useMutation(
    ({ id }: { id: string }) => graphqlFetcher(DELETE_PRODUCT, { id }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.PRODUCTS, {
          refetchInactive: true,
        });
        doneEdit();
      },
    }
  );

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = arrToObj([...new FormData(e.target as HTMLFormElement)]);
    formData.price = Number(formData.price);
    updateProduct(formData as MutableProduct);
  };

  const deleteItem = () => {
    deleteProduct({ id });
  };

  if (isEditing) {
    return (
      <li className='product-item'>
        <form onSubmit={handleSubmit}>
          <label>
            상품명:{' '}
            <input name='title' type='text' required defaultValue={title} />
          </label>
          <br />
          <label>
            이미지 URL:{' '}
            <input
              name='imageUrl'
              type='text'
              required
              defaultValue={imageUrl}
            />
          </label>
          <br />
          <label>
            상품가격:{' '}
            <input
              name='price'
              type='number'
              required
              min='1000'
              defaultValue={price}
            />
          </label>
          <br />
          <label>
            상세: <textarea name='description' defaultValue={description} />
          </label>
          <br />
          <button type='submit'>저장</button>
        </form>
      </li>
    );
  }

  return (
    <li className='product-item'>
      <Link to={`/products/${id}`}>
        <p className='product-item__title'>{title}</p>
        <img className='product-item__image' src={imageUrl} />
        <span className='product-item__price'>${price}</span>
      </Link>
      {!createdAt && <span>삭제 상품</span>}
      <button className='product-item__add-cart' onClick={startEdit}>
        수정
      </button>
      <button className='product-item__delete-cart' onClick={deleteItem}>
        삭제
      </button>
    </li>
  );
};

export default AdminItem;
