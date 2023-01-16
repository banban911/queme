import { ApolloProvider } from "@apollo/client";
import { ConfigProvider, Layout } from "antd";
import { observer } from "mobx-react"; // Or "mobx-react".
import { useRoutes } from "react-router-dom";
import { client } from "./config/apolloClient";
import { routesConfig } from "./config/routes";
import CustomHeader from "../src/components/header/Header";
const App = () => {
  const routes = useRoutes(routesConfig);
  const { Header, Content } = Layout;
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
              backgroundColor: "#fff",
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

const ObserverApp = observer(App);

export default ObserverApp;
