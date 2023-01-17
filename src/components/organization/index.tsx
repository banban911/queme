import React from "react";
import store from "../../store";
import {Avatar, Empty, Space, Typography} from "antd";

const Organization = () => {
    const {organizations} = store.user;
    return (
        <>
            {!organizations?.nodes?.length ? (
                <div
                    style={{
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Empty description=
                               {<Typography.Text>No (public) organization included</Typography.Text>}
                    />
                </div>
            ) : (
                <>
                    {organizations?.nodes?.map((org) => (
                        <Space>
                            <Typography.Text>{org.name}</Typography.Text>
                            <Avatar src={org?.avatarUrl}/>
                        </Space>
                    ))}
                </>
            )}
        </>
    );
};

export default Organization;
