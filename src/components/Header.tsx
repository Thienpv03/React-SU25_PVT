import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import { UnorderedListOutlined, HomeOutlined, ShopFilled, UserOutlined, FileAddOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  
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
    label: 'Users',
    key: '/users',
    icon: <UserOutlined />,
  },
  
];

const App: React.FC = () => {
  const [current, setCurrent] = useState('/');
  const navigate = useNavigate(); 

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);

  
    if (e.key !== 'link') {
      navigate(e.key);
    }
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        backgroundColor: "#f0f2f5",
        borderBottom: "1px solid #e8e8e8",
        fontWeight: 500,
        fontSize: 16,
      }}
    />

  );
};

export default App;
