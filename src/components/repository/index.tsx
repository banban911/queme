import store from "../../store";
import React, {useEffect} from 'react'
import {observer} from "mobx-react";
import {Avatar, Descriptions, Divider, Empty, Pagination, Space, Tag, Tooltip, Typography} from 'antd';
import {LanguageEdge, LanguageType, RepositoryNode} from "../../types/user";
import {BranchesOutlined, StarOutlined} from "@ant-design/icons";
import moment from "moment";
import {client} from "../../config/apolloClient";
import {GET_USER} from "../../graphql/user";

const Repository = () => {
    const {user} = store
    const {repositories} = user

    useEffect(() => {
        const refetchOnPageChange = async () => {
            await client.refetchQueries({
                include: [GET_USER],
            });
        }
        refetchOnPageChange()
        }
    , [store])

    const getMainLang = (langs: LanguageType) => {
        if (langs.edges && langs.nodes) {
            const sizeArray = langs.edges.map((lang: LanguageEdge) => {
                return lang.size
            }) as number[]
            const largestSize = Math.max(...sizeArray)
            const largestSizelangIdx = sizeArray.indexOf(largestSize)
            return langs.nodes[largestSizelangIdx]
        }

    }

    const updateTs = (ts: string) => {
        if (moment(new Date()).diff(moment(ts), 'days') < 2) {
            return moment(ts).fromNow()
        } else {
            return moment(ts).format('MM DD, YYYY')
        }
    }

    const kFormatter = (num: any) => {
        return num > 999 ? `${Math.sign(num) * Number(((num / 1000).toFixed(1)))}k` : Math.sign(num) * num
    }

    const handleChange = (page: number, pageSize: number) => {
        store.curPage = page
    }

    const handleChangePageSize = (current: number, size: number) => {
        store.repoPageSize = size

    }

    return (
        <>
            {Object.keys(user).length === 0 ? <Empty description='No repository found'/> :
                <>
                    {repositories && repositories?.nodes?.map((repo: RepositoryNode, idx: number) => (
                        <div key={idx}>
                            <Descriptions title={
                                (
                                    <Tooltip title={repo?.url}>
                                        <Space size={4} style={{alignItems: 'center'}}>
                                            <BranchesOutlined/>
                                            <a href={repo?.url}>{repo?.nameWithOwner}</a>
                                        </Space>
                                    </Tooltip>
                                )
                            }
                                          column={1}
                            >
                                {
                                    repo?.description && <Descriptions.Item>{repo?.description}</Descriptions.Item>
                                }
                                <Descriptions.Item>
                                    <Space style={{justifyContent: "space-around", alignItems: 'center'}}>
                                        <Space size={4}>
                                            {repo?.repositoryTopics &&
                                                repo?.repositoryTopics?.nodes?.map((topic) => (
                                                    <Typography.Link href={topic.url}>
                                                        <Tag color="#ddf4ff"
                                                             style={{color: '#0969da'}}>{topic.topic.name}</Tag>
                                                    </Typography.Link>
                                                ))
                                            }

                                        </Space>

                                        {
                                            <Space size={4} style={{alignItems: 'center'}}>
                                                <StarOutlined/>
                                                {Number(repo?.stargazerCount) ? kFormatter(repo.stargazerCount) : 0}
                                            </Space>
                                        }

                                        {repo.languages &&
                                            (
                                                <Space size={4} style={{alignItems: 'center'}}>
                                                    <Avatar size={12}
                                                            style={{backgroundColor: `${getMainLang(repo.languages)?.color}`}}/>
                                                    <Typography> {getMainLang(repo.languages)?.name} </Typography>
                                                </Space>
                                            )
                                        }

                                        {
                                            repo?.updatedAt && <Typography>
                                                {`Updated ${updateTs(repo?.updatedAt)}`}
                                            </Typography>
                                        }
                                    </Space>
                                </Descriptions.Item>
                            </Descriptions>
                            <Divider/>
                        </div>
                    ))} </>
            }
            {/*{repositories?.totalCount && <Pagination*/}
            {/*    defaultCurrent={store.curPage}*/}
            {/*    total={repositories?.totalCount}*/}
            {/*    hideOnSinglePage*/}
            {/*    pageSize={store.repoPageSize}*/}
            {/*    responsive*/}
            {/*    onShowSizeChange={(current, size) => handleChangePageSize(current, size)}*/}
            {/*    onChange={(page, pageSize) => handleChange(page, pageSize)}*/}
            {/*/>}*/}
        </>
    );
};

export default observer(Repository);
