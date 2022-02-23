import { render } from '@testing-library/react';
import React from 'react';
import RecipeCard from './RecipeCard';

const handleAddRecipe = jest.fn();
const handleRemoveRecipe = jest.fn();
const recipe = {
  id: '5f4d5d1028b37d30f71cd7ba',
  name: 'Black Bean & Poblano Quesadillas',
  slug: 'black-bean-quesadillas',
  headline: 'with Salsa Fresca & Lime Sour Cream',
  image:
    'https://img.hellofresh.com/c_fill,f_auto,fl_lossy,h_405,q_auto,w_720/hellofresh_s3/image/black-bean-quesadillas-a73d7c22.jpg',
  selected: 8,
  selectionLimit: 8,
  extraCharge: 0,
  yields: 2,
};
const minRecipesSelected = false;
const maxRecipesSelected = false;

test('Container Children Count', async () => {
  const { container } = render(
    <RecipeCard
      {...recipe}
      handleAddRecipe={handleAddRecipe}
      handleRemoveRecipe={handleRemoveRecipe}
      minRecipesSelected={minRecipesSelected}
      maxRecipesSelected={maxRecipesSelected}
    />
  );
  expect(container.children.length).toBe(1);
});

test('Recipe Name Available', async () => {
  const { getByText } = render(
    <RecipeCard
      {...recipe}
      handleAddRecipe={handleAddRecipe}
      handleRemoveRecipe={handleRemoveRecipe}
      minRecipesSelected={minRecipesSelected}
      maxRecipesSelected={true}
    />
  );
  expect(getByText('Black Bean & Poblano Quesadillas')).toBeDefined();
});
