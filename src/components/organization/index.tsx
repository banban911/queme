import React from "react";
import store from "../../store";
import {Avatar, Empty, Space, Typography} from "antd";

const Organization = () => {
    const {organizations} = store.user
    return <>
            {
                organizations?.nodes?.length === 0
                    ? (
                        <Empty description='No organization included'/>
                    )
                    : (
                        <>
                            {organizations?.nodes?.map(org => (
                                <Space>
                                    <Typography.Text>{org.name}</Typography.Text>
                                    <Avatar src={org?.avatarUrl}/>
                                </Space>
                            ))}
                        </>
                    )
            }

    </>;
};

export default Organization;
