import { NextResponse } from "next/server";

export async function POST(req: Request) {

    const MERCADO_PAGO_ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN;

    const body = await req.json();
    const { email, wanumber } = body

    console.log("Email", email);

    try {
        const response = await fetch("https://api.mercadopago.com/preapproval", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}`,
            },
            body: JSON.stringify({
                back_url: `https://youragencydev.com/succesfull-payment/?status=success&wanumber=${wanumber}`,
                payer_email: email,
                reason: "Suscripción mensual",
                auto_recurring: {
                    frequency: 1,
                    frequency_type: "months",
                    transaction_amount: 10.00,
                    currency_id: "ARS",
                },
                status: "authorized",
            }),
        });

        const data = await response.json();

        console.log("Data: ", data);

        if (!response.ok) {
            return NextResponse.json({ error: "Error al generar el enlace de pago" }, { status: 500 })
        }

        return NextResponse.json({ init_point: data.init_point, id: data.id }, {status: 200});

    } catch (error) {
        return NextResponse.json({ error: "Error al conectar con Mercado Pago" }, {status: 200});
    }
}
