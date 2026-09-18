function NotFound() {
    return (
    <main className="mx-auto flex min-h-[32rem] w-full max-w-7xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-cognac">404 / Archivo no encontrado</p>
        <h1 className="mt-3 font-display text-6xl font-semibold text-brand-navy">Página no encontrada</h1>
        <p className="mt-4 max-w-md text-base leading-7 text-brand-muted">La dirección que buscas no forma parte de nuestra colección actual.</p>
    </main>
    );
}

export default NotFound;
