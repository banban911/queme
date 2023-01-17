import {BranchesOutlined, StarOutlined} from "@ant-design/icons";
import {Avatar, Descriptions, Divider, Empty, Space, Tag, Tooltip, Typography,} from "antd";
import {observer} from "mobx-react";
import store from "../../store";
import {RepositoryNode} from "../../types/user";
import {getMainLang, kFormatter, updateTs} from "../../utils/format";

const Repository = () => {
  const { user } = store;
  const { repositories } = user;

  return (
    <>
      {Object.keys(user).length === 0 ? (
        <div style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Empty description={<Typography.Text>No repository found</Typography.Text>} />
        </div>
      ) : (
        <>
          {repositories &&
            repositories?.nodes?.map((repo: RepositoryNode, idx: number) => (
              <div key={idx}>
                <Descriptions
                  title={
                    <Tooltip title={repo?.url}>
                      <Space size={4} style={{ alignItems: "center" }}>
                        <BranchesOutlined />
                        <a href={repo?.url}>{repo?.nameWithOwner}</a>
                      </Space>
                    </Tooltip>
                  }
                  column={1}
                >
                  {repo?.description && (
                    <Descriptions.Item>{repo?.description}</Descriptions.Item>
                  )}
                  <Descriptions.Item>
                    <Space
                      style={{
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                    >
                      <Space size={[8, 16]} wrap style={{ maxWidth: "50%" }}>
                        {repo?.repositoryTopics &&
                          repo?.repositoryTopics?.nodes?.map((topic) => (
                            <Typography.Link href={topic.url}>
                              <Tag color="#ddf4ff" style={{ color: "#0969da" }}>
                                {topic.topic.name}
                              </Tag>
                            </Typography.Link>
                          ))}
                      </Space>

                      {
                        <Space size={4} style={{ alignItems: "center" }}>
                          <StarOutlined />
                          {Number(repo?.stargazerCount)
                            ? kFormatter(repo.stargazerCount)
                            : 0}
                        </Space>
                      }

                      {repo.languages && (
                        <Space size={4} style={{ alignItems: "center" }}>
                          <Avatar
                            size={12}
                            style={{
                              backgroundColor: `${
                                getMainLang(repo.languages)?.color
                              }`,
                            }}
                          />
                          <Typography>
                            {" "}
                            {getMainLang(repo.languages)?.name}{" "}
                          </Typography>
                        </Space>
                      )}

                      {repo?.updatedAt && (
                        <Typography>
                          {`Updated ${updateTs(repo?.updatedAt)}`}
                        </Typography>
                      )}
                    </Space>
                  </Descriptions.Item>
                </Descriptions>
                <Divider />
              </div>
            ))}
        </>
      )}
    </>
  );
};

export default observer(Repository);
