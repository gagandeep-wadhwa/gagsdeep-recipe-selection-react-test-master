import { parseRawPrice } from './price';

describe('price', () => {
  describe('parseRawPrice', () => {
    it('should return the raw price with the currency symbol and converted to decimals', () => {
      const price = 1000;
      let parsedPrice = parseRawPrice(price);
      expect(parsedPrice).toBe('$10.00');
     
      parsedPrice = parseRawPrice(11);
      expect(parsedPrice).toBe('$0.11');

      parsedPrice = parseRawPrice(1);
      expect(parsedPrice).toBe('$0.01');
    });
  });
});
