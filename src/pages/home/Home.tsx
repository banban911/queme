import {AppstoreOutlined, EnvironmentOutlined, GroupOutlined, UsergroupAddOutlined,} from "@ant-design/icons";
import {Avatar, Card, Space, Spin, Tabs, TabsProps} from "antd";
import {Col, Row} from "antd/es/grid";
import Typography from "antd/es/typography";
import React from "react";
import Repository from "../../components/repository";
import store from "../../store";
import Organization from "../../components/organization";
import {observer} from "mobx-react";
import Entrance from "../AccessToken";

const Home = () => {
    const {user, error, loading} = store
    const items: TabsProps["items"] = [
        {
            key: "1",
            label: (
                <span>
          <AppstoreOutlined/> Repository
        </span>
            ),
            children: <Repository/>,
        },
        {
            key: "2",
            label: (
                <span>
          <GroupOutlined/> Organization
        </span>
            ),
            children: <Organization/>,
        },
        {
            key: "3",
            label: "Acess Token",
            children: <Entrance/>,
        },
    ];
    return (
        <Spin spinning={loading}>
            <div style={{padding: '1rem'}}>
                <Row gutter={12}>
                    <Col span={6}>
                        <Card title="Profile" bordered={false} style={{width: 400}}>
                            {Object.keys(store.user).length !== 0 ? (
                                <div>
                                    <Avatar src={user.avatarUrl} draggable size='large'/>
                                    <Typography.Title>{user.name || 'real name'}</Typography.Title>
                                    <Typography>{user.login || 'username'}</Typography>

                                    <Typography.Paragraph>{user.bio}</Typography.Paragraph>
                                    <Space size={4}>
                                        <UsergroupAddOutlined/>
                                        <Space>
                                            {
                                                user?.followers && (
                                                    <Typography.Text>{user?.followers?.nodes?.length} follower{(user?.followers?.nodes || [])?.length > 1 && "s"} · {" "}</Typography.Text>
                                                )
                                            }
                                            {
                                                <Typography.Text>{user?.following?.length || 0} following</Typography.Text>
                                            }

                                        </Space>
                                    </Space>
                                    <br/>
                                    {
                                        user.location && <Space size={4}>
                                            <EnvironmentOutlined/>
                                            {user.location}
                                        </Space>
                                    }
                                </div>
                            ) : <div>User not found</div>}
                        </Card>

                    </Col>
                    <Col span={18}>
                        <Tabs defaultActiveKey='1' items={items}/>
                    </Col>
                </Row>
            </div>
        </Spin>

    );
};

export default observer(Home);
