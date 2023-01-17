import {
    AppstoreOutlined,
    EnvironmentOutlined,
    GroupOutlined, QuestionCircleFilled,
    QuestionCircleOutlined, QuestionOutlined,
    UsergroupAddOutlined,
} from "@ant-design/icons";
import {Card, Col, FloatButton, Row, Space, Spin, Tabs, TabsProps, Tour, TourProps, Typography} from "antd";
import {observer} from "mobx-react";
import Organization from "../../components/organization";
import Repository from "../../components/repository";
import store from "../../store";
import Entrance from "../accessToken";
import {useRef, useState} from "react";

const Index = () => {
    const {user, loading} = store;
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const ref4 = useRef(null);
    const ref5 = useRef(null);

    const [open, setOpen] = useState(false);
    const steps: TourProps['steps'] = [
        {
            title: 'Access Token',
            description: 'Add token to start using APIs',
            placement: 'bottom',
            target: () => ref1.current,
        },
        {
            title: 'Repositories',
            description: 'See repositories',
            placement: 'left',
            target: () => ref3.current,
        },
        {
            title: 'Organization',
            description: 'Or organization it belongs to',
            placement: 'bottom',
            target: () => ref4.current,
        },
        {
            title: 'Profile',
            description: 'Profile detail information',
            placement: 'right',
            target: () => ref5.current,
        },

    ];
    const items: TabsProps["items"] = [
        {
            key: "1",
            label: (
                <span ref={ref3}>
          <AppstoreOutlined/> Repository
        </span>
            ),
            children: (
                <div

                    style={{
                        height: "calc(100vh - 64px - 5rem)",
                        overflowY: "scroll",
                    }}
                >
                    <Repository/>,
                </div>
            ),
        },
        {
            key: "2",
            label: (
                <span ref={ref4}>
          <GroupOutlined/> Organization
        </span>
            ),
            children: (
                <div
                    style={{
                        height: "calc(100vh - 64px - 5rem)",
                        overflowY: "scroll",
                    }}

                >
                    <Organization/>
                </div>
            ),
        },
        {
            key: "3",
            label: <div ref={ref1}>Acess Token</div>,
            children: <div><Entrance/></div>,
        },
    ];

    return (
        <Spin spinning={loading}>
            <div style={{padding: "1rem"}}>
                <Row gutter={12}>
                    <Col
                        xs={{span: 24}}
                        sm={{span: 12}}
                        lg={{span: 6}}
                        style={{padding: "0 1.5rem"}}
                    >
                        <Card
                            ref={ref5}
                            bordered={false}
                            style={{width: "100%"}}
                            cover={<img alt={store?.user?.login} src={user.avatarUrl}/>}
                        >
                            {Object.keys(store.user).length !== 0 ? (
                                <div>
                                    {/* <Avatar src={user.avatarUrl} draggable size="large" /> */}
                                    <Typography.Title>
                                        {user.name || "real name"}
                                    </Typography.Title>
                                    <Typography>{user.login || "username"}</Typography>

                                    <Typography.Paragraph>{user.bio}</Typography.Paragraph>
                                    <Space size={4}>
                                        <UsergroupAddOutlined/>
                                        <Space>
                                            {user?.followers && (
                                                <Typography.Text>
                                                    {user?.followers?.nodes?.length} follower
                                                    {(user?.followers?.nodes || [])?.length > 1 &&
                                                        "s"} ·{" "}
                                                </Typography.Text>
                                            )}
                                            {
                                                <Typography.Text>
                                                    {user?.following?.length || 0} following
                                                </Typography.Text>
                                            }
                                        </Space>
                                    </Space>
                                    <br/>
                                    {user.location && (
                                        <Space size={4}>
                                            <EnvironmentOutlined/>
                                            {user.location}
                                        </Space>
                                    )}
                                </div>
                            ) : (
                                <div>User not found</div>
                            )}
                        </Card>
                    </Col>
                    <Col xs={{span: 24}} sm={{span: 12}} lg={{span: 18}}
                    >
                        <Tabs defaultActiveKey="1" items={items}/>
                    </Col>
                </Row>
                <FloatButton icon={<QuestionOutlined/>} type='primary' onClick={() => setOpen(true)}/>
                <Tour open={open} onClose={() => setOpen(false)} steps={steps}/>
            </div>
        </Spin>
    );
};

export default observer(Index);
