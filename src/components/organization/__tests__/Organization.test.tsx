import React from "react";
import {render, screen} from "@testing-library/react";
import {client} from "../../../App";
import {ApolloProvider} from "@apollo/client";
import Organization from "../index";

describe(`Organization test`, () => {
    it(`Happy path`, () => {
        const {asFragment, container} = render(
            <ApolloProvider client={client}>
                <Organization />
            </ApolloProvider>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
