/**
 * Calculate the rounded amount
 * @param value The value to round
 */

export function calculateRoundedAmount(value: number, toFixed = 2): number {
  return parseFloat(value.toFixed(toFixed))
}
