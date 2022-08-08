import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { checkedCartState } from '../../recoils/cart';
import WillPay from '../willPay/willPay';
import PaymentModal from './modal';

const Payment = () => {
  const navigate = useNavigate();
  const [checkedCartData, setCheckedCartData] =
    useRecoilState(checkedCartState);
  const [modalShown, toggleModal] = useState(false);

  const showModal = () => {
    toggleModal(true);
  };

  const proceed = () => {
    setCheckedCartData([]);
    navigate('/products', { replace: true });
  };

  const cancel = () => {
    toggleModal(false);
  };

  return (
    <div>
      <WillPay submitTitle='결제하기' handleSubmit={showModal} />
      <PaymentModal show={modalShown} proceed={proceed} cancel={cancel} />
    </div>
  );
};

export default Payment;
