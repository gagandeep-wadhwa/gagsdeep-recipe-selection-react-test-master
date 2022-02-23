import { render } from '@testing-library/react';
import React from 'react';
import PriceSummary from './PriceSummary';

const summary = [{ name: 'Chicken Sausage & Spinach Ravioli', price: 1798, count: 1 }];

test('Check Price Summary', async () => {
  const { getByText } = render(
    <PriceSummary summary={summary} shippingCharges={1000} totalPrice={1798} />
  );
  const div = getByText('Chicken Sausage & Spinach Ravioli');
  expect(div).toBeDefined();
});

test('Check Total Renders', async () => {
  const totalPrice = '$10.00';
  const { queryByText } = render(
    <PriceSummary summary={summary} shippingCharges={1000} totalPrice={1798} />
  );
  expect(queryByText('Total')).toBeInTheDocument;
});

test('Check Shipping Price Value', async () => {
  const shippingCharges = '$20.00';
  const { queryByText } = render(
    <PriceSummary summary={summary} shippingCharges={1000} totalPrice={1798} />
  );
  expect(queryByText(shippingCharges)).toBeInTheDocument;
  //expect(div).not.toBeNull();
});

test('Check Recipe Price Value', async () => {
  const recipePrice = '$17.98';
  const { queryByText } = render(
    <PriceSummary summary={summary} shippingCharges={2000} totalPrice={1798} />
  );
  expect(queryByText(recipePrice)).toBeInTheDocument;
});

test('Check Total Price Value', async () => {
  const totalPriceIncludingShipping = '$27.98';
  const { queryByText } = render(
    <PriceSummary summary={summary} shippingCharges={1000} totalPrice={1798} />
  );
  expect(queryByText(totalPriceIncludingShipping)).toBeInTheDocument;
});
