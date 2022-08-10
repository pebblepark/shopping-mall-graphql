import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { EXECUTE_PAY } from '../../graphql/payment';
import { graphqlFetcher } from '../../queryClient';
import { checkedCartState } from '../../recoils/cart';
import WillPay from '../willPay/willPay';
import PaymentModal from './modal';

type PayInfos = string[];

const Payment = () => {
  const navigate = useNavigate();
  const [checkedCartData, setCheckedCartData] =
    useRecoilState(checkedCartState);
  const [modalShown, toggleModal] = useState(false);

  const { mutate: executePay } = useMutation((ids: PayInfos) =>
    graphqlFetcher(EXECUTE_PAY, { ids })
  );

  const showModal = () => {
    toggleModal(true);
  };

  const proceed = () => {
    const payInfos = checkedCartData.map(({ id }) => id);
    executePay(payInfos, {
      onSuccess: () => {
        setCheckedCartData([]);
        alert('결제가 완료되었습니다.');
        navigate('/products', { replace: true });
      },
    });
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
