import {
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    InMemoryCache,
} from "@apollo/client";
import {ConfigProvider, Layout} from "antd";
import {observer} from "mobx-react"; // Or "mobx-react".
import {useRoutes} from "react-router-dom";
import {routesConfig} from "./config/routes";
import CustomHeader from "../src/components/header/Header";
import {setContext} from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: "https://api.github.com/graphql",
});

const token = JSON.parse(localStorage.getItem("gh-token") as string);
const authLink = setContext((_, {headers}) => {
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

const App = () => {
    const routes = useRoutes(routesConfig);
    const {Header, Content} = Layout;
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
                            position: "sticky",
                            top: 0,
                            zIndex: 1,
                            width: "100%",
                        }}
                    >
                        <CustomHeader/>
                    </Header>
                    <Content
                        style={{
                            height: "calc(100vh - 64px)",
                            overflowY: "hidden",
                        }}
                    >
                        {routes}
                    </Content>
                </Layout>
            </ConfigProvider>
        </ApolloProvider>
    );
};

export default observer(App);
