import Footer from "@/app/components/Footer";
import PaymentHero from "@/app/components/PaymentHero";
import { Suspense } from "react";

export default function PaymentPage() {
	return (
		<>
			<Suspense fallback={<div>Loading payment details...</div>}>
				<PaymentHero />
			</Suspense>
			<Footer />
		</>
	)
}