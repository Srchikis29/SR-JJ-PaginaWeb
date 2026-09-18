import { Clock3, Mail, MapPin } from "lucide-react";

const contactItems = [
    { icon: Mail, label: "Correo", value: "hola@mitienda.com" },
    { icon: MapPin, label: "Ubicacion", value: "Atencion en linea" },
    { icon: Clock3, label: "Horario", value: "Lunes a viernes, 9:00 a 18:00" },
];

function Contacto() {
    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
            <section className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-cognac">Estamos para ayudarte</p>
                <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight text-brand-navy sm:text-6xl">Contacto</h1>
                <p className="mt-4 text-base leading-7 text-brand-muted">Escribenos si necesitas ayuda con tu compra, tallas o disponibilidad.</p>
            </section>
            <section className="mt-10 grid gap-4 sm:grid-cols-3" aria-label="Informacion de contacto">
                {contactItems.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="border border-brand-gold/40 bg-brand-paper p-5 sm:p-6">
                        <Icon className="text-brand-cognac" size={21} aria-hidden="true" />
                        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-teal">{label}</p>
                        <p className="mt-2 break-words text-sm leading-6 text-brand-muted">{value}</p>
                    </div>
                ))}
            </section>
        </main>
    );
}

export default Contacto;
