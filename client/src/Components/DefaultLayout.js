import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    HomeOutlined,
    CopyOutlined,
    UnorderedListOutlined,
    UserOutlined,
    ShoppingCartOutlined
} from '@ant-design/icons';
import { Avatar, Badge } from 'antd';
import { Button, Layout, Menu, theme } from 'antd';
import { Link, useNavigate } from 'react-router-dom'
const { Header, Sider, Content } = Layout;

const DefaultLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const nevigate = useNavigate()
    const cart = useSelector(state => state.Cart.cart)
    return (
        <Layout>

            <Sider trigger={null} collapsible collapsed={collapsed}>

                <div className="logo" />

                <h1 className=" text-4xl text-light font-wight-bold m-2">POS</h1>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={window.location.pathname}
                    style={{}}
                >
                    <Menu.Item key="/" icon={<HomeOutlined />}>
                        <Link to="/">Home</Link>
                    </Menu.Item>

                    <Menu.Item key="/cart" icon={<UserOutlined />}>
                        <Link to="/cart">Cart</Link>
                    </Menu.Item>

                    <Menu.Item key="/bills" icon={<CopyOutlined />}>
                        <Link to="/bills">Bills</Link>
                    </Menu.Item>
                    <Menu.Item key="/items" icon={<UnorderedListOutlined />}>
                        <Link to="/items">Items</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <Badge count={cart.length} offset={[-20, -5]} style={{ fontSize: '16px' }}>
                        <Avatar onClick={() => nevigate('/cart')} style={{ backgroundColor: 'white', color: 'black', fontSize: '46px' }} icon={<ShoppingCartOutlined />} />
                    </Badge>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};
export default DefaultLayout;