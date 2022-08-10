import { SyntheticEvent } from 'react';
import { useRecoilValue } from 'recoil';
import { checkedCartState } from '../../recoils/cart';
import ItemData from '../cart/itemData';

const WillPay = ({
  handleSubmit,
  submitTitle,
}: {
  handleSubmit: (e: SyntheticEvent) => void;
  submitTitle: string;
}) => {
  const checkedItems = useRecoilValue(checkedCartState);
  const totalPrice = checkedItems.reduce(
    (res, { product: { price }, amount }) => {
      res += price * amount;
      return res;
    },
    0
  );

  return (
    <div className='cart-willpay'>
      <ul>
        {checkedItems.map(
          ({ product: { imageUrl, price, title }, amount, id }) => (
            <li key={id}>
              <ItemData imageUrl={imageUrl} price={price} title={title} />
              <p>수량: {amount}</p>
              <p>금액: {price * amount}</p>
            </li>
          )
        )}
      </ul>
      <p>총 예상금액: {totalPrice}</p>
      <button onClick={handleSubmit}>{submitTitle}</button>
    </div>
  );
};

export default WillPay;
