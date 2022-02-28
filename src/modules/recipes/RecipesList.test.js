import { render, screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Recipes from './RecipesList';

describe('RecipeList', () => {
  test('Verify RecipeList Items', async () => {
    render(<Recipes />);
    await wait(() => expect(screen.getByText('WEEK OF OCTOBER 12TH')).toBeInTheDocument());

    expect(screen.getByText('Chicken Sausage & Spinach Ravioli')).toBeInTheDocument();
    expect(screen.getByText('Bruschetta Zucchini Boats')).toBeInTheDocument();
    expect(screen.getByText('Squash & Caramelized Onion Flatbreads')).toBeInTheDocument();
  });

  test('Verify RecipeList case2', async () => {
    render(<Recipes />);
    await wait(() => expect(screen.getByText('WEEK OF OCTOBER 12TH')).toBeInTheDocument());

    const priceSummaryBtn = screen.getByTestId('btn-price-summary');
    userEvent.click(priceSummaryBtn);
    expect(screen.getByText('Total')).toBeInTheDocument();
    
  });
});
