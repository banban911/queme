import {
  AppstoreOutlined,
  BuildOutlined,
  EnvironmentOutlined,
  GroupOutlined,
  StarOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Avatar, Space, Tabs, TabsProps } from "antd";
import { Col, Row } from "antd/es/grid";
import Image from "antd/es/image";
import Typography from "antd/es/typography";
import { useEffect, useState } from "react";
import store from "../../store";
import { OrganizationType } from "../../types/organization";
import { LanguageType } from "../../types/repository";

const Home = () => {
  const [user, setUser] = useState<any>({});
  useEffect(() => {
    store.user && setUser(store.user);
  }, []);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <span>
          <AppstoreOutlined /> Repository
        </span>
      ),
      children: (
        <Row>
          {user.repositories?.nodes?.map((repo: any, idx: number) => (
            <div key={idx}>
              <div>{repo.name}</div>
              <div>
                {repo?.languages?.nodes?.map((lang: LanguageType) => (
                  <div style={{ color: `${lang.color}` }}>{lang.name}</div>
                ))}
              </div>
            </div>
          ))}
        </Row>
      ),
    },
    {
      key: "2",
      label: (
        <span>
          <GroupOutlined /> Organization
        </span>
      ),
      children: (
        <Row>
          {user.organizations?.nodes?.map(
            (org: OrganizationType, idx: number) => (
              <div key={idx} className="cursor-pointer">
                <div>{org.name}</div>
                {user.avatarUrl && <Image src={org.avatarUrl} />}
              </div>
            )
          )}
        </Row>
      ),
    },
    // {
    //   key: "3",
    //   label: (
    //     <span>
    //       <StarOutlined /> Star
    //     </span>
    //   ),
    //   children: `Content of Tab Pane 3`,
    // },
    // {
    //   key: "4",
    //   label: (
    //     <span>
    //       <BuildOutlined /> Package
    //     </span>
    //   ),
    //   children: `Content of Tab Pane 3`,
    // },
  ];
  return (
    <>
      <Row>
        <Col span={6}>
          {!!store.user && (
            <div>
              <Avatar src={user.avatarUrl} draggable size="large" />
              <Typography>{user.name}</Typography>
              <Typography>{user.login}</Typography>

              <Typography>{user.bio}</Typography>
              <Space size={4}>
                <UsergroupAddOutlined />
                <Typography>
                  {user.location} follower{Number(user.location) > 1 && "s"} ·{" "}
                  {user.location} following
                </Typography>
              </Space>
              <br />
              <Space size={4}>
                <EnvironmentOutlined />
                {user.location}
              </Space>
            </div>
          )}
        </Col>
        <Col span={18}>
          <Tabs defaultActiveKey="1" items={items} />
        </Col>
      </Row>
    </>
  );
};

export default Home;
