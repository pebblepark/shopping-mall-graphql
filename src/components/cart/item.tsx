import { CartType } from '../../graphql/cart';

const CartItem = ({ id, imageUrl, price, title, amount }: CartType) => {
  return (
    <li>
      <p>
        {title}: {amount}(${price * amount})
      </p>
      <img src={imageUrl} />
    </li>
  );
};

export default CartItem;
