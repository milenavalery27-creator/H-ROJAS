import Link from 'next/link'

const columns = [
  {
    title: 'Tienda',
    links: ['Bolsos', 'Carteras', 'Cinturones', 'Viaje', 'Ediciones limitadas'],
  },
  {
    title: 'Casa',
    links: ['El taller', 'Nuestra historia', 'Sostenibilidad', 'Cuidado de la piel'],
  },
  {
    title: 'Ayuda',
    links: ['Envíos y devoluciones', 'Garantía', 'Reparaciones', 'Contacto'],
  },
]

export function SiteFooter() {
  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <p className="font-serif text-2xl font-semibold tracking-[0.2em] text-foreground">
              HROJAS
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Marroquinería fina hecha a mano. Calle del Oficio 12, Madrid.
            </p>
          </div>
          {columns.map((column) => (
            <div key={column.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
                {column.title}
              </p>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} HROJAS. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link href="#" className="transition-colors hover:text-foreground">
              Privacidad
            </Link>
            <Link href="#" className="transition-colors hover:text-foreground">
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
