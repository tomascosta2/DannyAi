export default function Footer() {
	return (
		<footer className="py-4">
			<div className="max-w-[1200px] mx-auto px-4">
				<div className="flex md:flex-row flex-col justify-between items-center">
					<div>
						<a href="/">DannyAi</a>
					</div>
					<div className="flex md:flex-row flex-col md:text-start text-center gap-4 md:mt-0 mt-4">
						<a href="/" className="text-[#555] hover:text-[#01C52B] text-[12px] md:text-[14px]">Inicio</a>
						<a href="/termsandconditions" className="text-[#555] hover:text-[#01C52B] text-[12px] md:text-[14px]">Terminos y condiciones</a>
						<a href="/privacypolicy" className="text-[#555] hover:text-[#01C52B] text-[12px] md:text-[14px]">Politicas de privacidad</a>
					</div>
				</div>
			</div>
		</footer>
	)
}