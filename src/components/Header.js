"use client";
import { useState } from "react";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
//import UserGreeting from "users";
import Modal from "@/components/Modal";
import ItemForm from "@/components/ItemForm";
import Image from "next/image";
import ClientBootstrap from "@/app/ClientBootstrap";

function Header({ itemAdded }) {
	const bootstrap = ClientBootstrap(); // Initialize Bootstrap client for any required Bootstrap functionality
	const auth = useAuth(); // Access authentication context to get the current user's state and methods
	const router = useRouter(); //Access router to programmatically navigate between pages
	//const usergreeting = UserGreeting

	const [isModalOpen, setIsModalOpen] = useState(false); //

	// Function to log out the user
	const logoutUser = (e) => {
		e.preventDefault(); // Prevent the default action (e.g., page refresh)
		auth.logout(); // Call the logout method from the authentication context
		router.push("/"); // Redirect the user to the homepage after logging out
	};

	// Function to open the modal (sets `isModalOpen` to true)
	const modalOpen = () => setIsModalOpen(true);

	// Function to close the modal (sets `isModalOpen` to false)
	const modalClose = () => setIsModalOpen(false);

	//Return
	return (
		<header className="bg-light">			{/* Header*/}
			{/* User greeting if logged in (missing logic to function)*/}

						{/* {user ? (
						<p className="pg-primary text-center p-0 mb-0">
							Welcome to your inventory, {user.name}!
						</p>
					) : (
						<p className="darkblue text-center p-0 mb-0">
							Welcome to your inventory!
						</p>
					)} */}
			<div className="mx-auto px-5 d-flex justify-content-between bg-light shadow">
				<div className="d-flex align-items-center justify-content-center p-2 ps-5">
					<Image
						src="/logo.svg"
						width={40}
						height={40}
						alt="Logo from fontawsome"
					/>
					<h1 className="text-primary h2 mt-2">Invetiq app</h1>
					<div>
						<h2 className="h3 text-secondary text-center d-flex align-items-center justify-content p-2 px-5 mt-2">
							Items
						</h2>
					</div>
				</div>
				{/* Add item*/}
				<div className="d-flex align-items-center pe-5">
					{auth.token && (
						<button onClick={modalOpen} className="btn btn-primary me-3">
							Add Item
						</button>
					)}
					{/* Logout or Login*/}
					{auth.token ? (
						<Link href="/" onClick={logoutUser} className="btn btn-secondary">
							Logout
						</Link>
					) : (
						<Link href="/" className="btn btn-primary">
							Login
						</Link>
					)}
				</div>
			</div>
			<Modal isOpen={isModalOpen} onClose={modalClose}>
				<ItemForm onClose={modalClose} itemAdded={itemAdded} />
			</Modal>
		</header>
	);
}
export default Header;
