import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import css from '@styled-system/css';

import Flex from '../../components/Flex';
import Box from '../../components/Box';
import Text from '../../components/Text';
import Button from '../../components/Button';
import IconMinusCircle from '../../icons/IconMinusCircle';
import IconPlusCircle from '../../icons/IconPlusCircle';
import { parseRawPrice } from './price';

const SelectionButton = styled.button`
  ${css({
    outline: 'none',
    color: 'white',
    padding: 'sm',
    cursor: 'pointer',
    backgroundColor: 'primary_600',
    border: 'none',
    ':hover:enabled': {
      backgroundColor: 'primary_700',
    },
    ':active:enabled': {
      backgroundColor: 'primary_800',
    },
  })}
  &:disabled {
    cursor: default;
    opacity: 0.5;
  }
`;

const RecipeCard = ({
  extraCharge,
  handleAddRecipe,
  handleRemoveRecipe,
  headline,
  id,
  image,
  maxRecipesSelected,
  minRecipesSelected,
  name,
  selected,
  selectionLimit,
  yields,
}) => (
  <Box
    borderWidth={selected ? 'md' : null}
    borderStyle={selected ? 'solid' : null}
    borderColor={selected ? 'primary_600' : null}
    m={selected ? '-2px' : null}
    borderRadius="md"
    boxShadow="lg">
    <Box borderRadius="2px 2px 0px 0px" paddingBottom="56.25%" overflow="hidden" height="0">
      <img src={image} alt={name} width="100%" />
    </Box>

    <Box p="xs" height="120px">
      <Text fontWeight="bold" fontFamily="primary" fontSize="md">
        {name}
      </Text>
      <Text fontWeight="regular" fontFamily="secondary" fontSize="sm">
        {headline}
      </Text>
    </Box>
    {selected ? (
      <SelectedRecipeFooter
        id={id}
        yields={yields}
        selected={selected}
        selectionLimit={selectionLimit}
        maxRecipesSelected={maxRecipesSelected}
        handleAddRecipe={handleAddRecipe}
        handleRemoveRecipe={handleRemoveRecipe}
      />
    ) : (
      <UnselectedRecipeFooter
        id={id}
        extraCharge={extraCharge}
        selected={selected}
        minRecipesSelected={minRecipesSelected}
        maxRecipesSelected={maxRecipesSelected}
        handleAddRecipe={handleAddRecipe}
        handleRemoveRecipe={handleRemoveRecipe}
      />
    )}
  </Box>
);

const SelectedRecipeFooter = ({
  id,
  selected,
  selectionLimit,
  yields,
  maxRecipesSelected,
  handleAddRecipe,
  handleRemoveRecipe,
}) => {
  const disabled = maxRecipesSelected || selected >= selectionLimit;
  return (
    <Flex backgroundColor="primary_600" justifyContent="space-between" alignItems="center">
      <SelectionButton onClick={() => handleRemoveRecipe(id)} title="Decrease quantity">
        <IconMinusCircle />
      </SelectionButton>
      <Box color="white">
        <Text textAlign="center" fontWeight="bold" fontFamily="secondary" fontSize="md">
          {selected} in your box
        </Text>
        <Text textAlign="center" fontFamily="secondary" fontSize="sm">
          ({selected * yields} servings)
        </Text>
      </Box>
      <SelectionButton
        onClick={() => handleAddRecipe(id)}
        title="Increase quantity"
        disabled={disabled}>
        <IconPlusCircle />
      </SelectionButton>
    </Flex>
  );
};

const UnselectedRecipeFooter = ({
  extraCharge,
  id,
  minRecipesSelected,
  maxRecipesSelected,
  handleAddRecipe,
}) => (
  <Flex p="xs">
    <Box flex="50%" alignSelf="center">
      {extraCharge ? <Text color="primary_600">+{parseRawPrice(extraCharge)}</Text> : null}
    </Box>
    <Box flex="50%">
      <Button
        onClick={() => handleAddRecipe(id)}
        variant="secondary"
        width="100%"
        p="0"
        disabled={maxRecipesSelected}>
        {minRecipesSelected ? 'Add extra meal' : 'Add'}
      </Button>
    </Box>
  </Flex>
);

export default RecipeCard;

RecipeCard.propTypes = {
  extraCharge: PropTypes.number,
  handleAddRecipe: PropTypes.func.isRequired,
  handleRemoveRecipe: PropTypes.func.isRequired,
  headline: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  maxRecipesSelected: PropTypes.bool.isRequired,
  minRecipesSelected: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  selected: PropTypes.number.isRequired,
  selectionLimit: PropTypes.number.isRequired,
  yields: PropTypes.number.isRequired,
};

SelectedRecipeFooter.propTypes = {
  id: PropTypes.string.isRequired,
  selected: PropTypes.number.isRequired,
  selectionLimit: PropTypes.number.isRequired,
  yields: PropTypes.number.isRequired,
  maxRecipesSelected: PropTypes.bool.isRequired,
  handleAddRecipe: PropTypes.func.isRequired,
  handleRemoveRecipe: PropTypes.func.isRequired,
};

UnselectedRecipeFooter.propTypes = {
  extraCharge: PropTypes.number,
  id: PropTypes.string.isRequired,
  minRecipesSelected: PropTypes.bool.isRequired,
  maxRecipesSelected: PropTypes.bool.isRequired,
  handleAddRecipe: PropTypes.func.isRequired,
};
