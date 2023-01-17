import React from "react";
import {render, screen} from "@testing-library/react";
import {client} from "../../../App";
import {ApolloProvider} from "@apollo/client";
import Repository from "../index";

describe(`Repository test`, () => {
    it(`Happy path`, () => {
        const {asFragment, container} = render(
            <ApolloProvider client={client}>
                <Repository />
            </ApolloProvider>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
