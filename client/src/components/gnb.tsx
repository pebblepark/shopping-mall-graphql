import { Link } from 'react-router-dom';

const Gnb = () => {
  return (
    <nav className='gnb'>
      <ul>
        <li>
          <Link to='/'>홈</Link>
        </li>
        <li>
          <Link to='/products'>상품목록</Link>
        </li>
        <li>
          <Link to='/cart'>장바구니</Link>
        </li>
        <li>
          <Link to='/admin'>어드민</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Gnb;
