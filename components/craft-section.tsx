import Image from 'next/image'

export function CraftSection() {
  return (
    <section id="taller" className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
        <div className="relative order-last aspect-[4/3] overflow-hidden md:order-first">
          <Image
            src="/images/workshop.png"
            alt="Artesano cosiendo una pieza de piel en el taller de HROJAS"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="max-w-lg">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.3em] text-accent">
            El taller
          </p>
          <h2 className="text-balance font-serif text-3xl font-semibold leading-tight md:text-4xl">
            Un oficio que no tiene prisa
          </h2>
          <p className="mt-6 text-pretty leading-relaxed text-primary-foreground/75">
            Fundada por Hernán Rojas, HROJAS mantiene un taller pequeño donde
            cada artesano firma sus piezas. No producimos en serie: seleccionamos
            la piel a mano, la trabajamos con herramientas tradicionales y
            cuidamos cada puntada.
          </p>
          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-primary-foreground/15 pt-8">
            <div>
              <dt className="font-serif text-3xl">25+</dt>
              <dd className="mt-1 text-xs uppercase tracking-wider text-primary-foreground/60">
                Años de oficio
              </dd>
            </div>
            <div>
              <dt className="font-serif text-3xl">100%</dt>
              <dd className="mt-1 text-xs uppercase tracking-wider text-primary-foreground/60">
                Hecho a mano
              </dd>
            </div>
            <div>
              <dt className="font-serif text-3xl">12</dt>
              <dd className="mt-1 text-xs uppercase tracking-wider text-primary-foreground/60">
                Artesanos
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
