// Itemform - Add a new item
"use client";

import { useState } from "react"; // Importing the `useState` hook to manage state.
import { useAuth } from "@/context/auth"; // Importing custom authentication context to get authentication details.
import ClientBootstrap from "@/app/ClientBootstrap"; // Custom Bootstrap initialization.
import { ItemCategory } from "@/data/categories"; // Importing item categories for the dropdown.

// Default export function for the `ItemForm` component.
// `onClose` is a function to close the modal, and `itemAdded` is a callback for when an item is successfully added.
export default function ItemForm({ onClose, itemAdded }) {
	const bootstrap = ClientBootstrap(); // Initializing the client Bootstrap.
	const { token, user } = useAuth(); // Extracting the `token` from the authentication context.

	// Defining state variables to hold the form input values.
	const [name, setName] = useState(""); // State to manage item name.
	const [description, setDescription] = useState(""); // State to manage item description.
	const [quantity, setQuantity] = useState(0); // State to manage item quantity.
	const [category, setCategory] = useState(""); // State to manage the selected item category.

	// Function to handle the form submission.
	const handleSubmit = async (e) => {
		e.preventDefault(); // Preventing default form submission behavior.

		// Check if the user is authenticated, if not, show an alert and stop the process.
		if (!token) {
			alert("You must be logged in to add new item");
			return;
		}

		// Sending a POST request to the API to create a new item.
		const response = await fetch("/api/items", {
			method: "POST", // Using POST request method to create a new item.
			headers: {
				"Content-type": "application/json", // Content-type header to specify JSON data.
				Authorization: `Bearer ${token}`, // Authorization header with the user's token.
			},
			body: JSON.stringify({
				name, // The name of the item.
				description, // The description of the item.
				quantity, // The quantity of the item.
				category, // The category of the item.
			}),
		});

		// If the response is successful (status code 200), handle the new item data.
		if (response.ok) {
			const newItem = await response.json(); // Parsing the newly added item from the response.
			alert("New item was added!"); // Show a success message.
			itemAdded(newItem); // Call the `itemAdded` function to update the item list in the parent component.
			onClose(); // Close the modal after the item is successfully added.
		} else {
			// If there is an error, handle the error and display an appropriate message.
			const error = await response.json();
			alert(error.message || "Something went wrong, try again"); // Show an error message if adding the item fails.
		}
	};

	//Return
	return (
		<div className="w-100">
			{/*Modal*/}
			<h4 class="modal-title h4 mb-2 text-center">Add item</h4>
			{/*Submit form for new item*/}
			<form className="modal-body" onSubmit={handleSubmit}>
				<label className="form-label">
					Name:
					<input
						type="text"
						value={name}
						placeholder="Ex. Peanuts"
						onChange={(e) => setName(e.target.value)}
						className="form-control mb-2"
						required
					/>
				</label>

				<label className="form-label">
					Description:
					<textarea
						value={description}
						placeholder="Ex. Roasted, salted nuts ready to eat"
						onChange={(e) => setDescription(e.target.value)}
						className="form-control mb-2"
						required
					/>
				</label>

				<label className="form-label">
					Quantity:
					<input
						type="number"
						value={quantity}
						onChange={(e) => setQuantity(Number(e.target.value))}
						min="0"
						place-holder=""
						className="form-control mb-2"
						required
					/>
				</label>

				<label className="form-label">
					Category:
					<select
						className="form-select"
						name="categories"
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						required
					>
						{/*Choose category from options*/}
						<option value="" disabled>
							Select a category
						</option>
						<option value={ItemCategory.VEGETABLES}>Vegetables</option>
						<option value={ItemCategory.FRUIT}>Fruit</option>
						<option value={ItemCategory.SNACKS}>Snacks</option>
						<option value={ItemCategory.BEVERAGES}>Beverages</option>
						<option value={ItemCategory.HOUSEHOLD}>Household</option>
					</select>
				</label>

				<div className="d-flex justify-content-between mt-4">
					<button type="submit" className="btn btn-success">
						Add Item
					</button>
					<button type="button" onClick={onClose} className="btn btn-danger">
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
}
