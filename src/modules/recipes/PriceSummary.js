import React from 'react';
import PropTypes from 'prop-types';
import Box from '../../components/Box';
import Flex from '../../components/Flex';
import Text from '../../components/Text';
import { parseRawPrice } from './price';

const titleStr = (name, count) => `${name} ${count > 1 ? `x ${count}` : ''}`;

const Price = ({ name, price, fontWeight, mb, testId }) => (
  <Flex mb={mb} alignItems="center" justifyContent="space-between">
    <Text fontSize="md" fontWeight={fontWeight} lineHeight="md" data-test={`name:${testId}`}>
      {name}
    </Text>
    <Text fontSize="md" fontWeight={fontWeight} lineHeight="md" data-test={`price:${testId}`}>
      {parseRawPrice(price)}
    </Text>
  </Flex>
);

// Create PriceSummary user interface
const PriceSummary = ({ summary, totalPrice, shippingPrice }) => {
  const total = totalPrice + shippingPrice;
  return (
    <Box width={['290px', '450px']} alignItems="center" p="sm">
      {summary.map(({ name, price, count }) => (
        <Price key={name} name={titleStr(name, count)} price={price} testId={name} />
      ))}
      <Price name="Shipping Charges" price={shippingPrice} testId="shippingPrice"/>
      <Box my="xs" borderTopStyle="solid" borderTopWidth="sm" borderTopColor="neutral_400" />
      <Price name="Total" price={total} fontWeight="bold" mb={null} testId="total"/>
    </Box>
  );
};

Price.defaultProps = {
  fontWeight: 'regular',
  mb: 'xs',
};

Price.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  fontWeight: PropTypes.string,
  mb: PropTypes.string,
  testId: PropTypes.string.isRequired
};

PriceSummary.propTypes = {
  summary: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  totalPrice: PropTypes.number.isRequired,
  shippingPrice: PropTypes.number.isRequired,
};

export default PriceSummary;
