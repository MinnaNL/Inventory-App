//Authform - Login and registration
"use client"; // Enables client-side rendering in Next.js

import { useState } from "react"; // Import useState hook to manage state
import { useRouter } from "next/navigation"; // Import useRouter to handle navigation
import { useAuth } from "@/context/auth"; // Import the custom auth hook for authentication context
import ClientBootstrap from "@/app/ClientBootstrap"; // Import a custom bootstrap client

function AuthForm() {
	const bootstrap = ClientBootstrap(); // Initialize any custom Bootstrap functionality
	const router = useRouter(); // Initialize router for navigation
	const auth = useAuth(); // Get authentication context

	// Declare state variables to store input values and UI states
	const [email, setEmail] = useState(""); // Holds the email input
	const [password, setPassword] = useState(""); // Holds the password input
	const [name, setName] = useState(""); // Holds the name input (only required for registration)
	const [error, setError] = useState(""); // Holds error messages from API responses
	const [isLogin, setIsLogin] = useState(true); // Toggle between login and register mode

	// Function to handle form submission (for login or register)
	async function handleSubmit(e) {
		e.preventDefault(); // Prevent page refresh on form submission
		setError(""); // Clear previous error messages

		// Define the API URL based on whether it's login or register mode
		const url = isLogin ? "/api/auth/login" : "/api/auth/register";

		// Make a POST request to the authentication API (login or register)
		const response = await fetch(url, {
			method: "POST", // HTTP method
			headers: {
				"Content-Type": "application/json", // Inform the server that JSON is being sent
			},
			body: JSON.stringify({
				email, // Send email input
				password, // Send password input
				name: !name ? "" : name, // Send name only if it exists (for registration)
			}),
		});

		// Parse the API response
		const data = await response.json();

		// If the response is successful (e.g., 200 OK)
		if (response.ok) {
			localStorage.setItem("@library/token", data.token); // Store the authentication token locally
			auth.setToken(data.token); // Set the token in the authentication context
			router.push("/items"); // Redirect to the items page after successful login/register
			return;
		}

		// If there's an error, set the error state to display a message
		setError(data.message || "Something went wrong, try again");
	}

	//Return
	return (
		<div className="mt-5 min-vh-100 ">
			<form
				className="mt-5 authform bg-light shadow border rounded"
				onSubmit={handleSubmit}
			>
				<h2 className="h4 text-center">{isLogin ? "Login" : "Register"}</h2>
				<div className="mb-2 mt-4">
					<label className="form-label">Email</label>
					<input
						className="form-control mb-2"
						type="email"
						value={email}
						placeholder="minna@inventiq.com"
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						required
					/>
				</div>

				<div className="mb-2 mt-4">
					<label className="form-label">Password</label>
					<input
						className="form-control mb-2"
						type="password"
						value={password}
						placeholder="Enter password"
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						required
					/>
				</div>

				{!isLogin && (
					<div className="mb-2 mt-4">
						<label className="form-label">Name</label>
						<input
							className="form-control"
							type="text"
							value={name}
							placeholder="Minna"
							onChange={(e) => {
								setName(e.target.value);
							}}
							required
						/>
					</div>
				)}
					{/* Error alert*/}
				{error && <p className="alert alert-danger p-1">{error}</p>}

				<div className="d-flex justify-content-center align-items-center row mx-5 mt-4">
					<button type="submit" className="btn btn-primary w-50">
						{isLogin ? "Login" : "Register"}
					</button>
					<p className="text-center">or</p>
					<button
						type="button"
						className="btn btn-secondary w-50"
						onClick={(e) => {
							setIsLogin(!isLogin);
						}}
					>
						{/* Switch register and login*/}
						{isLogin ? "Register" : "Login"}
					</button>
				</div>
			</form>
		</div>
	);
}

export default AuthForm;
