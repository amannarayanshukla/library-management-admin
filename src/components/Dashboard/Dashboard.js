import React, {Component} from "react";
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined,BookOutlined, UploadOutlined, VideoCameraOutlined } from '@ant-design/icons';


import CardList from "../CardList/CardList";
import IssuedBookList from "../IssuedBookLists/IssuedBookList";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

export default class Dashboard extends Component{

    state = {
        key : 1,
    };

    changeKey = (key) => (e) => {
        this.setState({key})
    };

    render() {
        return(
            <Layout>
                <Header className="header">
                    <div className="logo" />
                    <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1">Admin</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                        <Sider className="site-layout-background" width={200}>
                                <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
                                    <Menu.Item key="1" icon={<BookOutlined />} onClick={this.changeKey(1)}>
                                        All books
                                    </Menu.Item>
                                    <Menu.Item key="2" icon={<NotificationOutlined />} onClick={this.changeKey(2)}>
                                        Notification
                                    </Menu.Item>
                            </Menu>
                        </Sider>
                        <Content style={{ padding: '0 24px', minHeight: 280 }}>
                            {
                                this.state.key === 1 ?
                                    <CardList/>
                                :
                                    <IssuedBookList/>
                            }

                        </Content>
                    </Layout>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        )
    }
}
