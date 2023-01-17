import { useLazyQuery } from "@apollo/client";
import { Button, Input } from "antd";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { GET_USER } from "../../graphql/user";
import store from "../../store";

const CustomHeader = () => {
  const [getUser, { error, loading, data, fetchMore }] = useLazyQuery(GET_USER);
  const handleSearch = (value: string) => {
    getUser({
      variables: {
        login: value,
        firstRepo: 100,
        cursor: null,
      },
    });
  };

  useEffect(() => {
    store.loading = loading;
    if (data?.user) {
      store.user = data?.user;
    } else {
      store.user = {};
    }
    if (error) {
      store.error = error;
    }
  }, [loading, data, error]);

  const { Search } = Input;
  return (
    <>
      <Search
        placeholder="Enter a github username"
        onSearch={(value: string) => handleSearch(value)}
        allowClear
        enterButton={
          <Button type="primary" loading={loading}>
            Find
          </Button>
        }
        style={{ width: 304 }}
      />
    </>
  );
};

export default observer(CustomHeader);
