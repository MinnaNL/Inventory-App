import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/auth";
import ClientBootstrap from "./ClientBootstrap";

const inter = Inter({ subsets: ["latin"] });
const bootstrap = ClientBootstrap;

export const metadata = {
	title: "Minna Nordlund Inventiq",
	description: "Inventory app using Javascript, Next.js and React",
  //icons: "icon",

};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<script
					src="https://kit.fontawesome.com/7d4a336cd6.js"
					crossorigin="anonymous"
				></script>
			</head>
			<body className={inter.className}>
				<AuthProvider>{children}</AuthProvider>
			</body>
		</html>
	);
}
