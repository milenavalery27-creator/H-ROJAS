import { Button } from '@/components/ui/button'

export function Newsletter() {
  return (
    <section className="border-y border-border bg-secondary/60">
      <div className="mx-auto max-w-2xl px-5 py-16 text-center md:py-20">
        <h2 className="font-serif text-3xl font-semibold text-foreground">
          Únete al taller
        </h2>
        <p className="mx-auto mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
          Recibe lanzamientos, ediciones limitadas y consejos para cuidar tus
          piezas de piel. Sin ruido, solo lo esencial.
        </p>
        <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
          <label htmlFor="email" className="sr-only">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="tu@correo.com"
            className="h-12 flex-1 rounded-none border border-input bg-background px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-accent"
          />
          <Button
            type="submit"
            className="h-12 rounded-none bg-primary px-8 text-sm font-medium tracking-wide text-primary-foreground hover:bg-primary/90"
          >
            Suscribirme
          </Button>
        </form>
      </div>
    </section>
  )
}
