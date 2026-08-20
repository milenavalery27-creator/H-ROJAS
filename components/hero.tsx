import Image from 'next/image'

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-2 md:py-20">
      <div className="max-w-xl">
        <p className="mb-5 text-xs font-medium uppercase tracking-[0.3em] text-accent">
          Marroquinería desde 1998
        </p>
        <h1 className="text-balance font-serif text-4xl font-semibold leading-tight text-foreground md:text-6xl">
          Piezas de piel que envejecen con elegancia.
        </h1>
        <p className="mt-6 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          En HROJAS cada bolso, cartera y cinturón se corta y se cose a mano con
          piel de curtido vegetal. Objetos sobrios, duraderos y pensados para
          acompañarte durante décadas.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#productos"
            className="inline-flex h-12 items-center bg-primary px-8 text-sm font-medium tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Ver colección
          </a>
          <a
            href="#taller"
            className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
          >
            Conoce el taller
          </a>
        </div>
      </div>

      <div className="relative aspect-[4/5] overflow-hidden bg-muted md:aspect-[5/6]">
        <Image
          src="/images/hero.png"
          alt="Colección de artículos de piel HROJAS sobre una superficie de piedra"
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    </section>
  )
}
