import AuthForm from "@/components/AuthForm";
import Image from "next/image";

export default async function Home() {
	return (
		<main className="mvw-100 mw-100">
			<div className="mx-auto p-2 mb-2 d-flex justify-content-center">
				<Image
					src="/logo.svg"
					width={40}
					height={40}
					alt="Logo from fontawsome"
				/>
				<h1 className="text-primary h2 mt-2">Invetiq app</h1>
			</div>
			<AuthForm />
		</main>
	);
}
