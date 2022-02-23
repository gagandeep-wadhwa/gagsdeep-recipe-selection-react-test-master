import React from 'react';

import { Row, Col } from '../../components/Grid';
import Flex from '../../components/Flex';
import Box from '../../components/Box';
import RecipeCard from './RecipeCard';
import PriceInfo from './PriceInfo';
import { parseRawPrice } from './price';
import useFetchHelloFreshBox from '../../hooks/useFetchHelloFreshBox';

const Recipes = () => {
  // This state stores the array of recipes with the changes performed by the customer.
  const [recipes, setRecipes] = React.useState([]);
  const { data, loading } = useFetchHelloFreshBox();

  // add/remove recipe, feel free to remove or rename these these variables and values.
  const handleAddRecipe = (recipeId) => {
    const { recipes: fetchedRecipes } = data;
    const updatedRecipes = recipes.map((el) =>
      el.id === recipeId ? Object.assign({}, el, { selected: el['selected'] + 1 }) : el
    );
    setRecipes(updatedRecipes);
  };
  const handleRemoveRecipe = (recipeId) => {
    const { recipes: fetchedRecipes } = data;
    const updatedRecipes = recipes.map((el) =>
      el.id === recipeId
        ? Object.assign({}, el, {
            selected: el['selected'] > 0 ? el['selected'] - 1 : el['selected'],
          })
        : el
    );
    setRecipes(updatedRecipes);
  };

  // min/max recipe boundaries, feel free to remove or rename these variables and values.
  const totalSelected = recipes.reduce((total, recipe) => (total += recipe.selected ?? 0), 0);

  const minRecipesSelected = totalSelected >= data.min ?? 0;
  const maxRecipesSelected = totalSelected > data.max;

  // price summary and total price, feel free to remove or rename these variables and values.
  const summary = recipes
    .filter(({ selected }) => selected > 0)
    .map(({ name, selected, extraCharge }) => ({
      name,
      count: selected,
      price: selected * (data.baseRecipePrice + extraCharge),
    }));

  const totalPrice = summary.reduce((total, { price }) => (total += price), 0);
  const shippingCharges = data.shippingCharges ?? 0;
  debugger;
  React.useEffect(() => {
    const { recipes: fetchedRecipes } = data;

    if (fetchedRecipes) {
      setRecipes(fetchedRecipes);
    }
  }, [setRecipes, data]);

  if (loading) {
    return null;
  }

  return (
    <>
      <Row>
        <Col sm={6}>
          <h3>{data.headline}</h3>
        </Col>
        <Col sm={6}>
          <Flex alignItems="center" justifyContent="flex-end">
            <Box textAlign="right" mr="xs">
              <h3>{parseRawPrice(totalPrice + shippingCharges)}</h3>
            </Box>
            <PriceInfo
              summary={summary}
              totalPrice={totalPrice}
              shippingCharges={shippingCharges}
            />
          </Flex>
        </Col>
      </Row>

      <Row>
        {recipes.map((recipe) => (
          <Col sm={12} md={6} xl={4} key={recipe.id}>
            <Box mb="md">
              <RecipeCard
                {...recipe}
                handleAddRecipe={handleAddRecipe}
                handleRemoveRecipe={handleRemoveRecipe}
                minRecipesSelected={minRecipesSelected}
                maxRecipesSelected={maxRecipesSelected}
              />
            </Box>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Recipes;
