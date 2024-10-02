//src/app/data > categories
export class ItemCategory {
	// Define static category constants
	static VEGETABLES = "Vegetables";
	static FRUIT = "Fruit";
	static SNACKS = "Snacks";
	static BEVERAGES = "Beverages";
	static HOUSEHOLD = "Household";

	// Create an array of all the defined categories
	static categories = [
		this.VEGETABLES,
		this.FRUIT,
		this.SNACKS,
		this.BEVERAGES,
		this.HOUSEHOLD,
	];

	// Static method to check if a given category is valid (exists in the categories array)
	static isCategory(category = "") {
		return this.categories.includes(category);
	}
}
