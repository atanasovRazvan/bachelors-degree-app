import middle from './meters/middle.png';
import slightlyUnderpriced from './meters/slightly-underpriced.png';
import slightlyOverpriced from './meters/slightly-overpriced.png';
import underpriced from './meters/underpriced.png';
import overpriced from './meters/overpriced.png';

const meterSource = (price, priceEstimation) => {
  const slightDifference = priceEstimation / 10;
  const bigDifference = priceEstimation / 5;

  if (price > priceEstimation + bigDifference) {
    return overpriced;
  }
  if (price > priceEstimation + slightDifference) {
    return slightlyOverpriced;
  }
  if (price < priceEstimation - bigDifference) {
    return underpriced;
  }
  if (price < priceEstimation - slightDifference) {
    return slightlyUnderpriced;
  }
  return middle;
};
export default meterSource;
