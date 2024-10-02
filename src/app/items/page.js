"use client";
import { useState, useEffect, useContext } from "react";
import { useAuth, AuthContext } from "@/context/auth";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import EditItemForm from "@/components/EditItemForm";
import ClientBootstrap from "../ClientBootstrap";
//import UserGreeting from "../users";

export default function ItemsPage() {
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [editingItemId, setEditingItemId] = useState(null);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const { token, user} = useAuth(); 
  ClientBootstrap();
	//UserGreeting ();

	// Fetch items from API
	useEffect(() => {
		const fetchItems = async () => {
			setLoading(true);

			try {
				const response = await fetch("/api/items"); // Fetch all items
				const data = await response.json();
				setItems(data);
			} catch (error) {
				console.error("Error fetching items:", error);
			}

			setLoading(false);
		};
		fetchItems();
	}, []);

	// Handle new item addition
	const handleItemAdded = (newItem) => {
		setItems((prevItems) => [newItem, ...prevItems]);
	};

	if (loading) {
		return <p>Loading...</p>;
	}

	// Delete an item
	const deleteItem = async (itemId) => {
		if (!token) return;
		const response = await fetch(`/api/items/${itemId}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (response.ok) {
			setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
			alert("Item was deleted");
		} else {
			alert("Failed to delete item");
		}
	};

	// Set the item to be updated
	const editItem = (itemId) => {
		setEditingItemId(itemId);
		setIsEditModalOpen(true);
	};

	// Handle form update
	const handleUpdateItem = (updatedItem) => {
		setItems((prevItems) =>
			prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
		);
		setIsEditModalOpen(false); // Close the form after update
	};
//Return
	return (
		<main>
			<div>
        {/*header with greeting (does not work)*/}
				<header>
					{user ? (
						<p className="darkblue text-center p-0 mb-0">
							Welcome to your inventory, {user.name}!
						</p>
					) : (
						<p className="darkblue text-center p-0 mb-0">
							Welcome to the inventory!
						</p>
					)}
				</header>

				<Header itemAdded={handleItemAdded} />
				<div className="container d-flex flex-column p-2 mt-3 justify-content-center">
					<ul className="list-group py-2 justify-content-center">
						{items.map((item) => (
							<li
								className="list-item my-2 px-4 shadow rounded border-bottom border-start border-secondary p-2 bg-light"
								key={item.id}
							>
								<h3 className="text-secondary fs-5 fw-medium fst-italic">{item.name}</h3>
								<p>Description:{item.description}</p>

								<p>Category: {item.category}</p>

								<span>Quantity: {item.quantity}</span>
								{token && (
									<div>
										<button
											className="btn btn-sm btn-primary me-2 my-1"
											onClick={() => editItem(item.id)}
										>
											Edit
										</button>
										<button
											className="btn btn-sm btn-danger"
											onClick={() => deleteItem(item.id)}
										>
											Delete
										</button>
									</div>
								)}
							</li>
						))}
					</ul>
				</div>

				<Modal
					isOpen={isEditModalOpen}
					onClose={() => setIsEditModalOpen(false)}
				>
					<EditItemForm
						item={items.find((item) => item.id === editingItemId)}
						onUpdate={handleUpdateItem}
						onClose={() => setIsEditModalOpen(false)}
					/>
				</Modal>
			</div>
		</main>
	);
}
