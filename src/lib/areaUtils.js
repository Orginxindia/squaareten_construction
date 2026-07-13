export const SQFT_PER_CENT = 435.56;

/**
 * Converts square feet (sqft) to cents, rounded to 2 decimal places.
 * @param {number|string} sqft 
 * @returns {string} Cent value formatted to 2 decimal places.
 */
export function convertSqftToCent(sqft) {
  if (sqft === undefined || sqft === null || isNaN(sqft) || Number(sqft) <= 0) {
    return '0.00';
  }
  return (Number(sqft) / SQFT_PER_CENT).toFixed(2);
}
