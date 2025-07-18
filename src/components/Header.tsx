import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // <- import
import { UnorderedListOutlined, HomeOutlined, ShopFilled } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: 'Home page',
    key: '/',
    icon: <HomeOutlined />,
  },
  {
    label: 'Products',
    key: '/products',
    icon: <ShopFilled />,
  },
  {
    label: 'Categories',
    key: '/categories',
    icon: <UnorderedListOutlined />,
  },
  {
    label: 'Brands',
    key: '/brands',
    icon: <UnorderedListOutlined />,
  },
  {
    key: 'link',
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        External Link
      </a>
    ),
  },
];

const App: React.FC = () => {
  const [current, setCurrent] = useState('/');
  const navigate = useNavigate();  // <-- khởi tạo navigate

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);

    // chuyển trang theo key menu
    if (e.key !== 'link') {  // tránh chuyển với external link
      navigate(e.key);
    }
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default App;
