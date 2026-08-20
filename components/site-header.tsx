import Link from 'next/link'
import { Search, ShoppingBag, User } from 'lucide-react'

const navItems = [
  { label: 'Bolsos', href: '#productos' },
  { label: 'Carteras', href: '#productos' },
  { label: 'Accesorios', href: '#productos' },
  { label: 'Taller', href: '#taller' },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5">
        <nav className="hidden flex-1 items-center gap-7 text-sm text-muted-foreground md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          className="font-serif text-2xl font-semibold tracking-[0.2em] text-foreground md:flex-1 md:text-center"
        >
          HROJAS
        </Link>

        <div className="flex flex-1 items-center justify-end gap-4 text-foreground">
          <button aria-label="Buscar" className="transition-colors hover:text-accent">
            <Search className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <button aria-label="Mi cuenta" className="hidden transition-colors hover:text-accent sm:block">
            <User className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <button aria-label="Carrito" className="relative transition-colors hover:text-accent">
            <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-accent-foreground">
              0
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}
