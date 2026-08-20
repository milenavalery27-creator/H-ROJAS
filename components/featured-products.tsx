import Image from 'next/image'

const products = [
  {
    name: 'Bolso Tote Sena',
    category: 'Bolsos',
    price: '320 €',
    image: '/images/product-tote.png',
  },
  {
    name: 'Cartera Duero',
    category: 'Carteras',
    price: '95 €',
    image: '/images/product-wallet.png',
  },
  {
    name: 'Cinturón Tajo',
    category: 'Accesorios',
    price: '78 €',
    image: '/images/product-belt.png',
  },
  {
    name: 'Bolsa de viaje Ebro',
    category: 'Viaje',
    price: '480 €',
    image: '/images/product-weekender.png',
  },
]

export function FeaturedProducts() {
  return (
    <section id="productos" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.3em] text-accent">
            Colección
          </p>
          <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl">
            Los favoritos de la casa
          </h2>
        </div>
        <a
          href="#productos"
          className="hidden shrink-0 text-sm font-medium text-foreground underline-offset-4 hover:underline sm:block"
        >
          Ver todo
        </a>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <article key={product.name} className="group">
            <div className="relative aspect-[4/5] overflow-hidden bg-card">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="mt-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {product.category}
                </p>
                <h3 className="mt-1 font-medium text-foreground">{product.name}</h3>
              </div>
              <p className="font-serif text-lg text-foreground">{product.price}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
