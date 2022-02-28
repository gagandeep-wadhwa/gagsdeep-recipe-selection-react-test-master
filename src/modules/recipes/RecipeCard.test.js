import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
  selected: 1,
  selectionLimit: 1,
  extraCharge: 1198,
  yields: 2,
};

describe('RecipeCard', () => {
  test('Verify recipe information', () => {
    render(
      <RecipeCard
        {...recipe}
        handleAddRecipe={handleAddRecipe}
        handleRemoveRecipe={handleRemoveRecipe}
        minRecipesSelected={true}
        maxRecipesSelected={true}
      />
    );
    expect(screen.getByText('Black Bean & Poblano Quesadillas')).toBeInTheDocument();
    expect(screen.getByText('with Salsa Fresca & Lime Sour Cream')).toBeInTheDocument();
    expect(screen.getByText('1 in your box')).toBeInTheDocument();
    expect(screen.getByText('(2 servings)')).toBeInTheDocument();
  });

  test('Verify extra charges', () => {
    render(
      <RecipeCard
        {...recipe}
        selected={0}
        handleAddRecipe={handleAddRecipe}
        handleRemoveRecipe={handleRemoveRecipe}
        minRecipesSelected={true}
        maxRecipesSelected={true}
      />
    );
    expect(screen.getByText('+$11.98')).toBeInTheDocument();
  });

  test('Verify when receipe not selected and minRecipesSelected = true', () => {
    render(
      <RecipeCard
        {...recipe}
        selected={0}
        handleAddRecipe={handleAddRecipe}
        handleRemoveRecipe={handleRemoveRecipe}
        minRecipesSelected={true}
        maxRecipesSelected={false}
      />
    );

    const addExtraMealBtn = screen.getByTestId('btn-add');
    expect(screen.getByText('Add extra meal')).toBeInTheDocument();
    expect(addExtraMealBtn).not.toBeDisabled();

    userEvent.click(addExtraMealBtn);
    expect(handleAddRecipe).toHaveBeenCalledWith(recipe.id);
  });

  test('Verify when receipe not selected and minRecipesSelected = false', () => {
    render(
      <RecipeCard
        {...recipe}
        selected={0}
        handleAddRecipe={handleAddRecipe}
        handleRemoveRecipe={handleRemoveRecipe}
        minRecipesSelected={false}
        maxRecipesSelected={false}
      />
    );

    const addExtraMealBtn = screen.getByTestId('btn-add');
    expect(screen.getByText('Add')).toBeInTheDocument();
    expect(addExtraMealBtn).not.toBeDisabled();

    userEvent.click(addExtraMealBtn);
    expect(handleAddRecipe).toHaveBeenCalledWith(recipe.id);
  });

  test('Verify when receipe not selected and minRecipesSelected = true and maxRecipesSelected = true', () => {
    render(
      <RecipeCard
        {...recipe}
        selected={0}
        handleAddRecipe={handleAddRecipe}
        handleRemoveRecipe={handleRemoveRecipe}
        minRecipesSelected={true}
        maxRecipesSelected={true}
      />
    );

    expect(screen.getByText('Add extra meal')).toBeInTheDocument();
    expect(screen.getByTestId('btn-add')).toBeDisabled();
  });

  test('Verify when receipe not selected and minRecipesSelected = true and maxRecipesSelected = false', () => {
    render(
      <RecipeCard
        {...recipe}
        selected={0}
        handleAddRecipe={handleAddRecipe}
        handleRemoveRecipe={handleRemoveRecipe}
        minRecipesSelected={true}
        maxRecipesSelected={false}
      />
    );

    const addExtraMealBtn = screen.getByTestId('btn-add');
    expect(screen.getByText('Add extra meal')).toBeInTheDocument();
    expect(addExtraMealBtn).not.toBeDisabled();

    userEvent.click(addExtraMealBtn);
    expect(handleAddRecipe).toHaveBeenCalledWith(recipe.id);
  });

  test('Verify when receipe selected and maxRecipesSelected = false', () => {
    render(
      <RecipeCard
        {...recipe}
        handleAddRecipe={handleAddRecipe}
        handleRemoveRecipe={handleRemoveRecipe}
        minRecipesSelected={true}
        maxRecipesSelected={false}
      />
    );

    const increaseBtn = screen.getByTestId('btn-increase-quantity');
    const decreaseBtn = screen.getByTestId('btn-decrease-quantity');
    expect(increaseBtn).toBeInTheDocument();
    expect(decreaseBtn).toBeInTheDocument();

    userEvent.click(increaseBtn);
    expect(handleAddRecipe).toHaveBeenCalledWith(recipe.id);
    userEvent.click(decreaseBtn);
    expect(handleRemoveRecipe).toHaveBeenCalledWith(recipe.id);
  });

  test('Verify when receipe selected and maxRecipesSelected = true', () => {
    render(
      <RecipeCard
        {...recipe}
        handleAddRecipe={handleAddRecipe}
        handleRemoveRecipe={handleRemoveRecipe}
        minRecipesSelected={true}
        maxRecipesSelected={true}
      />
    );

    const increaseBtn = screen.getByTestId('btn-increase-quantity');
    const decreaseBtn = screen.getByTestId('btn-decrease-quantity');
    expect(increaseBtn).toBeDisabled();
    expect(decreaseBtn).toBeInTheDocument();

    userEvent.click(decreaseBtn);
    expect(handleRemoveRecipe).toHaveBeenCalledWith(recipe.id);
  });
});
