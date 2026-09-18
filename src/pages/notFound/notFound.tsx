function NotFound() {
  return (
    <main className="mx-auto flex min-h-[32rem] w-full max-w-7xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
      <p className="retro-kicker text-brand-cognac">404 / Archive not found</p>
      <h1 className="theme-heading mt-3 font-display text-7xl tracking-[0.04em]">
        Pagina no encontrada
      </h1>
      <p className="theme-muted mt-4 max-w-md text-base leading-7">
        La direccion que buscas no forma parte de nuestra coleccion actual.
      </p>
    </main>
  );
}

export default NotFound;
