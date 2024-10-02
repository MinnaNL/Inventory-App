"use client";
import { useState } from "react";
import { useAuth } from "@/context/auth";
import { ItemCategory } from "@/data/categories";
import ClientBootstrap from "@/app/ClientBootstrap";

export default function EditItemForm({ item, onUpdate, onClose }) {
	const bootstrap = ClientBootstrap();
	const { token } = useAuth();
	const [name, setName] = useState(item.name);
	const [description, setDescription] = useState(item.description);
	const [quantity, setQuantity] = useState(item.quantity);
	const [category, setCategory] = useState(item.category);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!token) {
			alert("Please login to edit item");
			return;
		}

		const response = await fetch(`/api/items/${item.id}`, {
			method: "PUT",
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				name,
				description,
				quantity: Number(quantity),
				category,
			}),
		});

		if (response.ok) {
			const updatedItem = await response.json();
			onUpdate(updatedItem); // call parent function to update
			alert("Item was updated!");
		} else {
			const error = await response.json();
			alert(error.message || "Something went wrong, try again");
		}
	};

	return (
		<div class="w-100">
			<h4 class="modal-title h4 mb-2 text-center">Edit Item</h4>
			<form className="modal-body" onSubmit={handleSubmit}>
				<label for="name" className="form-label">
					Name:
					<input
						type="text"
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						class="form-control mb-2"
						required
					/>
				</label>

				<label for="description" className="form-label">
					Description:
					<textarea
						id="description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						class="form-control mb-2"
						required
					/>
				</label>

				<label for="quantity" className="form-label">
					Quantity:
					<input
						type="number"
						id="quantity"
						value={quantity}
						onChange={(e) => setQuantity(Number(e.target.value))}
						min="0"
						class="form-control mb-2"
						required
					/>
				</label>

				<label className="form-label">
					Category:
					<select
						className="form-select"
						name="categories" // Name attribute for the select
						value={category} // Bind to state
						onChange={(e) => setCategory(e.target.value)} // Update state on change
						required // Make it a required field
					>
						<option value="" disabled>
							Select a category
						</option>{" "}
						{/* Placeholder option */}
						<option value={ItemCategory.VEGETABLES}>Vegetables</option>
						<option value={ItemCategory.FRUIT}>Fruit</option>
						<option value={ItemCategory.SNACKS}>Snacks</option>
						<option value={ItemCategory.BEVERAGES}>Beverages</option>
						<option value={ItemCategory.HOUSEHOLD}>Household</option>
					</select>
				</label>
				<div class="d-flex justify-content-between mt-4">
					<button type="submit" class="btn btn-primary">
						Update Item
					</button>
					<button type="button" onClick={onClose} class="btn btn-danger">
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
}
