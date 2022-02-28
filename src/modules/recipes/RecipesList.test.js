import { render, screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Recipes from './RecipesList';

describe('RecipeList', () => {
  test('Verify RecipeList Items', async () => {
    render(<Recipes />);

    await wait(() => expect(screen.getByText('WEEK OF OCTOBER 12TH')).toBeInTheDocument());
    expect(screen.getByText('$66.92')).toBeInTheDocument();
    expect(screen.getByText('Chicken Sausage & Spinach Ravioli')).toBeInTheDocument();
    expect(screen.getByText('Bruschetta Zucchini Boats')).toBeInTheDocument();
    expect(screen.getByText('Squash & Caramelized Onion Flatbreads')).toBeInTheDocument();
  });
});
