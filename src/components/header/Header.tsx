import {useLazyQuery} from "@apollo/client";
import {Button, Input} from "antd";
import React, {useEffect} from "react";
import {GET_USER} from "../../graphql/user";
import store from "../../store";
import {observer} from "mobx-react";

const CustomHeader = () => {
    const [getUser, {error, loading, data, refetch }] = useLazyQuery(GET_USER);

    useEffect(() => {
        if (loading) {
            store.loading = loading
        }
        if (data?.user) {
            store.user = data?.user;
        } else {
            store.user = {};
        }
        if (error) {
            store.error = error
        }
        setTimeout(() => {
            store.loading = false
        }, 500)
    }, [loading, data]);

    const {Search} = Input;
    return (
        <>
            <Search
                placeholder="input search text"
                onSearch={(value: string) =>
                    getUser({
                        variables: {
                            login: value,
                            limitRepo: store.repoPageSize,
                            offsetRepo: store.curPage * store.repoPageSize
                        },
                    })
                }
                allowClear
                enterButton={
                    <Button type="primary" loading={loading}>
                        Find
                    </Button>
                }
                style={{width: 304}}
            />
        </>
    );
};

export default observer(CustomHeader);
