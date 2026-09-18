import { Clock3, Mail, MapPin } from "lucide-react";

const contactItems = [
  {
    icon: Mail,
    label: "Correo",
    value: "hola@mitienda.com",
    tone: "pixel-frame--wine",
  },
  {
    icon: MapPin,
    label: "Ubicacion",
    value: "Atencion en linea",
    tone: "pixel-frame--teal",
  },
  {
    icon: Clock3,
    label: "Horario",
    value: "Lunes a viernes, 9:00 a 18:00",
    tone: "pixel-frame--navy",
  },
];

function Contacto() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <section className="max-w-2xl">
        <p className="pixel-tag text-brand-cognac">Open channel / Support</p>
        <h1 className="theme-heading mt-3 font-display text-6xl tracking-[0.04em] sm:text-7xl">
          Contacto
        </h1>
        <p className="theme-muted mt-4 text-base leading-7">
          Escribenos si necesitas ayuda con tu compra, tallas o disponibilidad.
        </p>
      </section>
      <section
        className="mt-10 grid gap-5 sm:grid-cols-3"
        aria-label="Informacion de contacto"
      >
        {contactItems.map(({ icon: Icon, label, value, tone }) => (
          <div key={label} className={`pixel-frame ${tone}`}>
            <div className="pixel-frame-inner p-5 sm:p-6">
              <Icon
                className="text-brand-cognac"
                size={21}
                aria-hidden="true"
              />
              <p className="pixel-tag mt-5 text-brand-teal">{label}</p>
              <p className="theme-muted mt-2 break-words text-sm leading-6">
                {value}
              </p>
            </div>
          </div>
        ))}
      </section>
    </main>
	);
}

export default Contacto;
