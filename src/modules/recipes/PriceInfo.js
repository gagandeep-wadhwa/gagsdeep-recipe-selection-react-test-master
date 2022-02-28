import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '../../components/IconButton';
import IconInfoCircle from '../../icons/IconInfoCircle';
import Tooltip, { TooltipContainer } from '../../components/Tooltip';
import PriceSummary from './PriceSummary';
import useOnClickOutside from '../../hooks/useOnClickOutside';

const PriceInfo = ({ summary, totalPrice, shippingPrice }) => {
  const ref = React.useRef();
  const [isTooltipOpen, setTooltipOpen] = React.useState(false);
  // Close on click outside of the tooltip
  useOnClickOutside(ref, () => setTooltipOpen(false));

  return (
    <TooltipContainer ref={ref}>
      <IconButton onClick={() => setTooltipOpen(!isTooltipOpen)} data-test="btn-price-summary">
        <IconInfoCircle size="20" />
      </IconButton>
      {isTooltipOpen ? (
        <Tooltip>
          <PriceSummary summary={summary} totalPrice={totalPrice} shippingPrice={shippingPrice} />
        </Tooltip>
      ) : null}
    </TooltipContainer>
  );
};

PriceInfo.propTypes = {
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

export default PriceInfo;
