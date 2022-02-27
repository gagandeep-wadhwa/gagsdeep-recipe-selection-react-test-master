import React from 'react';
import PropTypes from 'prop-types';
import Box from '../../components/Box';
import Flex from '../../components/Flex';
import Text from '../../components/Text';
import { parseRawPrice } from './price';

const Price = ({ name, price, fontWeight }) => (
  <Flex mb="xs" alignItems="center" justifyContent="space-between">
    <Text fontSize="md" fontWeight={fontWeight} lineHeight="md">
      {name}
    </Text>
    <Text fontSize="md" fontWeight={fontWeight} lineHeight="md">
      {parseRawPrice(price)}
    </Text>
  </Flex>
);

Price.defaultProps = {
  fontWeight: 'regular',
};

Price.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  fontWeight: PropTypes.string,
};

const titleStr = (name, count) => `${name} ${count > 1 ? `x ${count}` : ''}`;

// Create PriceSummary user interface
const PriceSummary = ({ summary, totalPrice, shippingPrice }) => {
  const total = totalPrice + shippingPrice;
  return (
    <Box width={['290px', '450px']} alignItems="center" p="sm">
      {summary.map(({ name, price, count }) => (
        <Price key={name} name={titleStr(name, count)} price={price} />
      ))}
      <Price name="Shipping Charges" price={shippingPrice} />
      <Box my="xs" borderTopStyle="solid" borderTopWidth="sm" borderTopColor="neutral_400" />
      <Price name="Total" price={total} fontWeight="bold" />
    </Box>
  );
};

PriceSummary.propTypes = {
  summary: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      count: PropTypes.number,
      price: PropTypes.number,
    })
  ).isRequired,
  totalPrice: PropTypes.number.isRequired,
  shippingPrice: PropTypes.number.isRequired,
};

export default PriceSummary;
