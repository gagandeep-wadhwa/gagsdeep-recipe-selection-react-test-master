/* eslint-disable no-unused-expressions */

import { render, screen } from '@testing-library/react';
import React from 'react';
import PriceSummary from './PriceSummary';

const summary = [
  { name: 'Chicken Sausage & Spinach Ravioli',
    price: 1798,
    count: 1 
  },
  {
    name: 'Gouda Vibes Burgers',
    price: 1298,
    count: 2,
  },
];

describe('Price Summary', () => {
  test('Verify summary information', () => {
    render(<PriceSummary summary={summary} shippingPrice={1000} totalPrice={1798} />);

    const chickenSausage = screen.getByTestId('name:Chicken Sausage & Spinach Ravioli');
    expect(chickenSausage).toHaveTextContent('Chicken Sausage & Spinach Ravioli');

    const chickenSausagePrice = screen.getByTestId('price:Chicken Sausage & Spinach Ravioli');
    expect(chickenSausagePrice).toHaveTextContent('$17.98');

    const goudaBurger = screen.getByTestId('name:Gouda Vibes Burgers');
    expect(goudaBurger).toHaveTextContent('Gouda Vibes Burgers');
    expect(screen.getByText('Gouda Vibes Burgers x 2')).toBeInTheDocument();

    const goudaBurgerPrice = screen.getByTestId('price:Gouda Vibes Burgers');
    expect(goudaBurgerPrice).toHaveTextContent('$12.98');
  });

  test('Verify Shipping Charges', () => {
    render(
      <PriceSummary summary={summary} shippingPrice={1298} totalPrice={5394} />
    );

    const shippingChargesName = screen.getByTestId('name:shippingPrice');
    expect(shippingChargesName).toHaveTextContent('Shipping Charges');

    const shippingCharges = screen.getByTestId('price:shippingPrice');
    expect(shippingCharges).toHaveTextContent('$12.98');


  });

  test('Verify Total Charges', () => {
    render(
      <PriceSummary summary={summary} shippingPrice={1298} totalPrice={5394} />
    );

    const totalChargesLabel = screen.getByTestId('name:total');   
    expect(totalChargesLabel).toHaveTextContent('Total')
    
    const totalChargesPrice = screen.getByTestId('price:total');
    expect(totalChargesPrice).toHaveTextContent('$66.92');
  });

});
