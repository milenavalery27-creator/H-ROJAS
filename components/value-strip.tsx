import { Hammer, Truck, ShieldCheck, Leaf } from 'lucide-react'

const values = [
  { icon: Hammer, title: 'Cosido a mano', text: 'Cada pieza, terminada por un solo artesano.' },
  { icon: Leaf, title: 'Curtido vegetal', text: 'Piel tratada con taninos naturales.' },
  { icon: ShieldCheck, title: 'Garantía de por vida', text: 'Reparamos lo que hacemos.' },
  { icon: Truck, title: 'Envío asegurado', text: 'Entrega gratuita en pedidos superiores a 150 €.' },
]

export function ValueStrip() {
  return (
    <section className="border-y border-border bg-secondary/60">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((value) => (
          <div key={value.title} className="flex items-start gap-3">
            <value.icon className="mt-0.5 h-6 w-6 shrink-0 text-accent" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-semibold text-foreground">{value.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{value.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
