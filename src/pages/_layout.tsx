import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Gnb from '../components/gnb';

const Layout: React.FC = () => {
  return (
    <div>
      <Gnb />
      <Suspense fallback={'loading...'}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Layout;
