import { useLazyQuery } from "@apollo/client";
import { Button, Input } from "antd";
import React, { useEffect } from "react";
import { GET_USER } from "../../graphql/user";
import store from "../../store";
const CustomHeader = () => {
  const [getUser, { loading, data, networkStatus }] = useLazyQuery(GET_USER);

    useEffect(() => {
      console.log('data', data)
      console.log('store', store)
    store.user = data?.user;
  }, [data]);

  const { Search } = Input;
  return (
    <>
      <Search
        placeholder="input search text"
        onSearch={(value: string) =>
          getUser({
            variables: {
              login: value,
            },
          })
        }
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

export default CustomHeader;
