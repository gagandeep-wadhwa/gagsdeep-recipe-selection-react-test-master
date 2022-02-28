import { parseRawPrice } from './price';

describe('price', () => {
  describe('parseRawPrice', () => {
    it('should return the raw price with the currency symbol and converted to decimals', () => {
      const price = 1000;
      let parsedPrice = parseRawPrice(price);
      expect(parsedPrice).toBe('$10.00');
     
      parsedPrice = parseRawPrice(1159);
      expect(parsedPrice).toBe('$11.59');
    });
  });
});
