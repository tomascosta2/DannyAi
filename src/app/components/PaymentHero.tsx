'use client';
import ExternalLink from './icons/ExternalLink';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation'

export default function PaymentHero() {
	const [email, setEmail] = useState('');

	const searchParams = useSearchParams()
  	const status = searchParams.get('status');
  	const wanumber = searchParams.get('wanumber'); // desde el chatbot mandar url con el parametro wanumber

	const getPaymentLink = async () => {
		if (!email.trim()) {
			alert("Por favor, ingresa tu email de MercadoPago.");
			return;
		}

		try {

			console.log("Email", { email })

			const response = await fetch("/api/generate-payment-link", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, wanumber }),
			})

			const data = await response.json()


			if (data.init_point) {
				window.location.href = data.init_point; // Redirigir al usuario al link de pago
			} else {
				console.error("Error en la suscripción", data.error);
			}
		} catch (error) {
			console.error("Error en la solicitud:", error);
		}
	};

	return (
		<section className="py-[100px] md:py-[130px] relative px-4 overflow-clip">
			<div className="absolute top-0 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
			<div className="relative">
				<h1 className="text-[24px] text-[#1a1a1a] md:text-[48px] font-semibold text-center mx-auto max-w-[900px] leading-[120%]">
					Estás a punto de empezar tu experiencia premium con Danny
				</h1>
				<p className="text-center max-w-[700px] mx-auto text-[14px] md:text-[16px] mt-4 text-[#1a1a1a]/80">
					Necesitamos tu email para habilitar la transacción. Luego, te llevaremos a MercadoPago para revisar y confirmar.
				</p>
				<div className="w-full sm:max-w-[409px] mx-auto gap-1 mt-12">
					<input
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						className="bg-white flex h-12 w-full rounded-xl border border-input border-black/30 bg-background px-4 py-6 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
						placeholder="Ingresa tu email de MercadoPago"
						name="email"
					/>
				</div>
				<div className="w-fit mx-auto flex gap-2 bg-[#E7E7E7] px-4 py-2 rounded-xl mt-4">
					<img alt="MercadoPago Logo" loading="lazy" width="19" height="13" decoding="async" data-nimg="1" className="w-[19px] md:w-[23px] h-auto" src="/images/logo-mp.svg" />
					<p className="text-black/70 text-[11px] md:text-xs">El email debe coincidir con el de tu cuenta</p>
				</div>
				<div className="relative w-full md:w-fit mx-auto mt-12">
					<img src="/images/danny.png" alt="DannyAi" className="absolute md:block hidden w-[60px] left-[-58px] top-[-16px] -rotate-[15deg]" />
					<button
						onClick={getPaymentLink}
						className="cursor-pointer flex items-center justify-center gap-2 relative w-full md:w-fit text-white font-normal py-4 px-14 rounded-sm mx-auto bg-purple-600 hover:bg-purple-700 transition"
					>
						Ir a pagar
						<ExternalLink />
					</button>
				</div>
			</div>
		</section>
	);
}
