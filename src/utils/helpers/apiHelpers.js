//src/app/utils/helpers > apiHelpers.js


// Function to validate item data
export function validateItemData(data) {
  let errors = {}; // Initialize an empty object to store validation errors

  // Check if the name field is provided, otherwise add error msg
  if (!data.name) {
    errors.name = "Name is required";
  }

  // Check if the description field is provided or add error msg
  if (!data.description) {
    errors.description = "Description is required";
  }

  // Check if the quantity field is provided or add error msg
  if (data.quantity === undefined || data.quantity === null) {
    errors.quantity = "Quantity is required"; 
  } 
  // Check if the quantity is valid (must be greater than or equal to 0), otherwise add error msg
  else if (data.quantity < 0) {
    errors.quantity = "Quantity must be more than 0";
  }

  // Check if the category field is provided or add error
  if (!data.category) {
    errors.category = "Category is required";
  }

  // Determine if any errors exist
  const hasErrors = Object.keys(errors).length > 0; // `true` if there are errors, `false` otherwise
  
  return [hasErrors, errors]; // Return whether there are errors and the error object
}

// Function to return a 404 response if an object is not found
export function object404Respsonse(response, model = "") {
  return response.json(
    {
      message: `${model} not found`,
    },
    {
      status: 404, // Set the HTTP status code to 404 (Not Found)
    }
  );
}

// Function to validate user data (for user registration or profile updates)
export async function validateUserData(data) {
  let errors = {}; // Initialize an empty object to store validation errors

  // Check if the name field is provided
  if (!data.name) {
    errors.name = "Name is required"; // Add an error message if name is missing
  }

  // Check if the email field is provided
  if (!data.email) {
    errors.email = "Email is required"; // Add an error message if email is missing
  }

  // Check if the password field is provided
  if (!data.password) {
    errors.password = "Password is required"; // Add an error message if password is missing
  }

  // Determine if any errors exist
  const hasErrors = Object.keys(errors).length > 0; // `true` if there are errors, `false` otherwise

  return { hasErrors, errors }; // Return whether there are errors and the error object
}
