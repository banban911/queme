import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe(`App test`, () => {
  it(`Happy path`, () => {
    const {asFragment} = render(<App />);
    expect(asFragment()).toMatchSnapshot()
  })
});
