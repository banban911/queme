import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from "@apollo/client";
import { ConfigProvider, Layout } from "antd";
import { observer } from "mobx-react"; // Or "mobx-react".
import { useRoutes } from "react-router-dom";
// import { client } from "./config/apolloClient";
import { routesConfig } from "./config/routes";
import CustomHeader from "../src/components/header/Header";
import {setContext} from "@apollo/client/link/context";
const App = () => {
  const routes = useRoutes(routesConfig);
  const { Header, Content } = Layout;

    const httpLink = createHttpLink({
        uri: "https://api.github.com/graphql",
    });

    const token = JSON.parse(localStorage.getItem('gh-token') as string);
    console.log('token trong context', token)
    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
            },
        };
    });

    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
    });

  return (
    <ApolloProvider client={client}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#2da44e",
          },
        }}
      >
        <Layout>
          <Header
            style={{
              backgroundColor: "#24292f",
              display: "flex",
              alignItems: "center",
            }}
          >
            <CustomHeader />
          </Header>
          <Content>{routes}</Content>
        </Layout>
      </ConfigProvider>
    </ApolloProvider>
  );
};

export default observer(App);
