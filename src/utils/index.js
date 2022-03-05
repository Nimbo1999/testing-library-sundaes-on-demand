export default class Utils {
    /**
     * Get a number value and convert it to a currency value.
     * @param {number} amount Amount to be converted
     * @returns {string}
     */
    static formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(amount);
    }
}
