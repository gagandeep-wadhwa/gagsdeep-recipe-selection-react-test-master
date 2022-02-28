/* eslint-disable no-unused-expressions */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import PriceInfo from './PriceInfo';

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
    render(<PriceInfo summary={summary} shippingPrice={1000} totalPrice={1798} />);

    const priceSummaryBtn = screen.getByTestId('btn-price-summary');
    userEvent.click(priceSummaryBtn);
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('Shipping Charges')).toBeInTheDocument();

  });

});
