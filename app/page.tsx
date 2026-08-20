'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  BarChart3, Boxes, Building2, ChevronRight, CircleUserRound, ClipboardList,
  ImagePlus, LayoutDashboard, LogOut, MapPin, Menu, Package, Plus, Search,
  Settings, ShoppingCart, Store, Tags, Trash2, Users, X, CheckCircle2
} from 'lucide-react'

const seedProducts = [
  { id: '1', sku: 'HR-BOL-001', name: 'Bolso Ejecutivo', category: 'Bolsos', priceVillavicencio: 129000, priceOther: 139000, stock: 18, active: true, image: '/images/product-tote.png' },
  { id: '2', sku: 'HR-CAR-001', name: 'Cartera Clásica', category: 'Carteras', priceVillavicencio: 79000, priceOther: 85000, stock: 32, active: true, image: '/images/product-wallet.png' },
  { id: '3', sku: 'HR-CIN-001', name: 'Cinturón Cuero', category: 'Accesorios', priceVillavicencio: 59000, priceOther: 65000, stock: 24, active: true, image: '/images/product-belt.png' },
  { id: '4', sku: 'HR-VIA-001', name: 'Maletín de Viaje', category: 'Bolsos', priceVillavicencio: 179000, priceOther: 189000, stock: 9, active: true, image: '/images/product-weekender.png' },
]
const cities = ['Villavicencio', 'Bogotá', 'Acacías', 'Granada', 'Puerto López']
const categories = ['Bolsos', 'Carteras', 'Accesorios', 'Taller']

type Product = typeof seedProducts[number]
type OrderItem = { productId: string; qty: number; price: number }
type Order = { id: string; customer: string; phone: string; city: string; seller: string; items: OrderItem[]; total: number; status: string; createdAt: string }

export default function Home() {
  const [role, setRole] = useState<'admin' | 'seller'>('admin')
  const [section, setSection] = useState('dashboard')
  const [products, setProducts] = useState<Product[]>(seedProducts)
  const [orders, setOrders] = useState<Order[]>([])
  const [city, setCity] = useState('Villavicencio')
  const [sellerCart, setSellerCart] = useState<OrderItem[]>([])
  const [search, setSearch] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showProduct, setShowProduct] = useState(false)
  const [showOrder, setShowOrder] = useState(false)
  const [customer, setCustomer] = useState({ name: '', phone: '', notes: '' })
  const [newProduct, setNewProduct] = useState({ name: '', sku: '', category: 'Bolsos', priceVillavicencio: '', priceOther: '', stock: '' })

  useEffect(() => {
    const p = localStorage.getItem('hrojas_products'); const o = localStorage.getItem('hrojas_orders')
    if (p) setProducts(JSON.parse(p)); if (o) setOrders(JSON.parse(o))
  }, [])
  useEffect(() => localStorage.setItem('hrojas_products', JSON.stringify(products)), [products])
  useEffect(() => localStorage.setItem('hrojas_orders', JSON.stringify(orders)), [orders])

  const filteredProducts = useMemo(() => products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase())), [products, search])
  const cartTotal = sellerCart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const menu = role === 'admin'
    ? [['dashboard', 'Resumen', LayoutDashboard], ['products', 'Productos', Package], ['publications', 'Fotografías', ImagePlus], ['orders', 'Pedidos', ClipboardList], ['customers', 'Clientes', Users], ['inventory', 'Inventario', Boxes], ['sellers', 'Vendedoras', CircleUserRound], ['cities', 'Ciudades y precios', MapPin], ['reports', 'Reportes', BarChart3], ['settings', 'Configuración', Settings]]
    : [['catalog', 'Catálogo', Store], ['cart', 'Mi pedido', ShoppingCart], ['orders', 'Mis pedidos', ClipboardList]]

  function addToCart(p: Product) {
    const price = city === 'Villavicencio' ? p.priceVillavicencio : p.priceOther
    setSellerCart(c => { const found = c.find(x => x.productId === p.id); return found ? c.map(x => x.productId === p.id ? { ...x, qty: x.qty + 1 } : x) : [...c, { productId: p.id, qty: 1, price }] })
  }
  function createOrder() {
    if (!customer.name || sellerCart.length === 0) return
    const order: Order = { id: `HR-${Date.now().toString().slice(-7)}`, customer: customer.name, phone: customer.phone, city, seller: 'Vendedora', items: sellerCart, total: cartTotal, status: 'Pendiente', createdAt: new Date().toISOString() }
    setOrders(o => [order, ...o]); setSellerCart([]); setCustomer({ name: '', phone: '', notes: '' }); setShowOrder(false); setSection('orders')
  }
  function addProduct() {
    if (!newProduct.name || !newProduct.sku) return
    setProducts(p => [...p, { id: crypto.randomUUID(), sku: newProduct.sku, name: newProduct.name, category: newProduct.category, priceVillavicencio: Number(newProduct.priceVillavicencio) || 0, priceOther: Number(newProduct.priceOther) || 0, stock: Number(newProduct.stock) || 0, active: true, image: '/images/placeholder.jpg' }])
    setNewProduct({ name: '', sku: '', category: 'Bolsos', priceVillavicencio: '', priceOther: '', stock: '' }); setShowProduct(false)
  }

  return <div className="min-h-screen bg-[#f7f5f1] text-[#201c18]">
    <header className="sticky top-0 z-30 border-b border-[#ddd7ce] bg-white/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 lg:px-7">
        <div className="flex items-center gap-3"><button className="lg:hidden rounded-lg p-2 hover:bg-stone-100" onClick={() => setMobileOpen(!mobileOpen)}><Menu size={21}/></button><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2a241f] text-sm font-bold text-white">H</div><div><div className="font-serif text-xl font-bold tracking-wide">HROJAS</div><div className="hidden text-[10px] uppercase tracking-[.22em] text-stone-500 sm:block">Sistema de ventas</div></div></div>
        <div className="flex items-center gap-2"><button onClick={() => { setRole(role === 'admin' ? 'seller' : 'admin'); setSection(role === 'admin' ? 'catalog' : 'dashboard') }} className="rounded-full border border-stone-300 bg-white px-3 py-2 text-xs font-semibold">Cambiar a {role === 'admin' ? 'vendedora' : 'administración'}</button><div className="hidden h-9 w-9 items-center justify-center rounded-full bg-stone-100 sm:flex"><CircleUserRound size={18}/></div></div>
      </div>
    </header>
    <div className="flex">
      <aside className={`${mobileOpen ? 'fixed inset-y-16 left-0 z-20 block w-72 shadow-xl' : 'hidden'} lg:sticky lg:top-16 lg:block lg:h-[calc(100vh-4rem)] lg:w-64 shrink-0 border-r border-[#ddd7ce] bg-[#fbfaf8] p-3`}>
        <div className="mb-4 rounded-xl bg-[#eee9e2] p-3"><div className="text-[11px] uppercase tracking-widest text-stone-500">Sesión</div><div className="mt-1 font-semibold">{role === 'admin' ? 'Administración' : 'Vendedora'}</div></div>
        <nav className="space-y-1">{menu.map(([key,label,Icon]: any) => <button key={key} onClick={() => {setSection(key); setMobileOpen(false)}} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm ${section === key ? 'bg-[#2a241f] text-white' : 'text-stone-700 hover:bg-stone-100'}`}><Icon size={17}/><span>{label}</span></button>)}</nav>
        <div className="mt-auto hidden border-t border-stone-200 pt-4 lg:block"><button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-stone-500"><LogOut size={17}/>Cerrar sesión</button></div>
      </aside>
      <main className="min-w-0 flex-1 p-4 md:p-7">
        {role === 'seller' ? <SellerView section={section} city={city} setCity={setCity} products={filteredProducts} addToCart={addToCart} sellerCart={sellerCart} setSellerCart={setSellerCart} cartTotal={cartTotal} orders={orders} setShowOrder={setShowOrder} search={search} setSearch={setSearch} /> : <AdminView section={section} products={filteredProducts} orders={orders} search={search} setSearch={setSearch} setShowProduct={setShowProduct} setProducts={setProducts} />}
      </main>
    </div>
    {showProduct && <Modal title="Nuevo producto" onClose={() => setShowProduct(false)}><div className="grid gap-3 sm:grid-cols-2">{[['name','Nombre'],['sku','SKU'],['priceVillavicencio','Precio Villavicencio'],['priceOther','Precio otras ciudades'],['stock','Inventario']].map(([k,l]) => <label key={k} className="text-sm font-medium">{l}<input value={(newProduct as any)[k]} onChange={e => setNewProduct(v => ({...v,[k]:e.target.value}))} className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 outline-none focus:ring-2 focus:ring-stone-300" /></label>)}<label className="text-sm font-medium">Categoría<select value={newProduct.category} onChange={e => setNewProduct(v=>({...v,category:e.target.value}))} className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2.5">{categories.map(c=><option key={c}>{c}</option>)}</select></label></div><button onClick={addProduct} className="mt-5 w-full rounded-xl bg-[#2a241f] px-4 py-3 font-semibold text-white">Guardar producto</button></Modal>}
    {showOrder && <Modal title="Crear pedido" onClose={() => setShowOrder(false)}><div className="space-y-3"><label className="text-sm font-medium">Cliente<input value={customer.name} onChange={e=>setCustomer({...customer,name:e.target.value})} className="mt-1 w-full rounded-xl border px-3 py-2.5" /></label><label className="text-sm font-medium">Teléfono<input value={customer.phone} onChange={e=>setCustomer({...customer,phone:e.target.value})} className="mt-1 w-full rounded-xl border px-3 py-2.5" /></label><div className="rounded-xl bg-stone-50 p-3 text-sm">Ciudad: <b>{city}</b><div className="mt-2 font-bold">Total: ${cartTotal.toLocaleString('es-CO')}</div></div><button onClick={createOrder} className="w-full rounded-xl bg-[#2a241f] px-4 py-3 font-semibold text-white">Guardar pedido</button></div></Modal>}
  </div>
}

function AdminView({ section, products, orders, search, setSearch, setShowProduct, setProducts }: any) {
  const titles: any = { dashboard: ['Resumen', 'Control general de HROJAS'], products: ['Productos', 'Catálogo, precios y SKU'], publications: ['Fotografías', 'Publicaciones con hasta 6 productos'], orders: ['Pedidos', 'Seguimiento de ventas'], customers: ['Clientes', 'Clientes y su historial'], inventory: ['Inventario', 'Existencias por producto'], sellers: ['Vendedoras', 'Usuarios y permisos'], cities: ['Ciudades y precios', 'Reglas de precios por zona'], reports: ['Reportes', 'Indicadores del negocio'], settings: ['Configuración', 'Preferencias del sistema'] }
  const [title, subtitle] = titles[section] || titles.dashboard
  return <><PageTitle title={title} subtitle={subtitle}/>{section === 'dashboard' && <Dashboard products={products} orders={orders}/>} {section === 'products' && <><Toolbar search={search} setSearch={setSearch} button="Nuevo producto" onButton={()=>setShowProduct(true)}/><div className="overflow-hidden rounded-2xl border border-stone-200 bg-white"><div className="hidden grid-cols-[1fr_120px_150px_100px_100px_60px] gap-4 border-b p-4 text-xs font-bold uppercase tracking-wider text-stone-500 md:grid"><span>Producto</span><span>SKU</span><span>Precios</span><span>Stock</span><span>Estado</span><span/></div>{products.map((p:any)=><div key={p.id} className="grid gap-3 border-b p-4 last:border-0 md:grid-cols-[1fr_120px_150px_100px_100px_60px] md:items-center md:gap-4"><div className="flex items-center gap-3"><img src={p.image} className="h-12 w-12 rounded-xl object-cover"/><div><div className="font-semibold">{p.name}</div><div className="text-xs text-stone-500">{p.category}</div></div></div><div className="font-mono text-xs">{p.sku}</div><div className="text-sm">${p.priceVillavicencio.toLocaleString('es-CO')}<br/><span className="text-xs text-stone-500">$ {p.priceOther.toLocaleString('es-CO')} otras</span></div><div>{p.stock}</div><div><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">Activo</span></div><button onClick={()=>setProducts((ps:any[])=>ps.filter(x=>x.id!==p.id))} className="text-stone-400 hover:text-red-600"><Trash2 size={17}/></button></div>)}</div></>}{section === 'orders' && <Orders orders={orders}/>} {section === 'publications' && <Publications products={products}/>} {section === 'inventory' && <Inventory products={products}/>} {['customers','sellers','cities','reports','settings'].includes(section) && <Placeholder section={section}/>}</>
}

function SellerView({ section, city, setCity, products, addToCart, sellerCart, setSellerCart, cartTotal, orders, setShowOrder, search, setSearch }: any) { return <><PageTitle title={section==='catalog'?'Catálogo':section==='cart'?'Mi pedido':'Mis pedidos'} subtitle="Venta rápida desde celular"/>{section==='catalog' && <><div className="mb-5 rounded-2xl border bg-white p-4"><label className="text-xs font-bold uppercase tracking-wider text-stone-500">Ciudad de venta</label><div className="mt-2 flex gap-2"><select value={city} onChange={e=>setCity(e.target.value)} className="flex-1 rounded-xl border px-3 py-3 font-semibold">{cities.map(c=><option key={c}>{c}</option>)}</select><div className="flex items-center gap-2 rounded-xl bg-stone-100 px-3 text-xs text-stone-600"><MapPin size={15}/>Precio automático</div></div></div><Toolbar search={search} setSearch={setSearch}/><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{products.map((p:any)=><div key={p.id} className="overflow-hidden rounded-2xl border bg-white"><img src={p.image} className="h-52 w-full object-cover"/><div className="p-4"><div className="text-xs text-stone-500">{p.category} · {p.sku}</div><div className="mt-1 font-semibold">{p.name}</div><div className="mt-2 text-xl font-bold">${(city==='Villavicencio'?p.priceVillavicencio:p.priceOther).toLocaleString('es-CO')}</div><button onClick={()=>addToCart(p)} className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#2a241f] px-4 py-3 font-semibold text-white"><Plus size={17}/>Agregar</button></div></div>)}</div></>}{section==='cart' && <Cart sellerCart={sellerCart} products={products} setSellerCart={setSellerCart} total={cartTotal} onOrder={()=>setShowOrder(true)}/>} {section==='orders' && <Orders orders={orders}/>}</> }

function Dashboard({products,orders}:any){return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><Stat icon={Package} label="Productos activos" value={products.filter((p:any)=>p.active).length}/><Stat icon={ClipboardList} label="Pedidos" value={orders.length}/><Stat icon={Users} label="Clientes" value="0"/><Stat icon={Boxes} label="Unidades en stock" value={products.reduce((a:number,p:any)=>a+p.stock,0)}/><div className="md:col-span-2 xl:col-span-4 rounded-2xl border bg-white p-6"><div className="mb-4 flex items-center justify-between"><div><h2 className="font-semibold">Últimos pedidos</h2><p className="text-sm text-stone-500">Actividad reciente</p></div><ClipboardList className="text-stone-400"/></div>{orders.length===0?<Empty text="Todavía no hay pedidos"/>:orders.slice(0,5).map((o:any)=><div key={o.id} className="flex items-center justify-between border-t py-3 text-sm"><div><b>{o.id}</b><div className="text-stone-500">{o.customer} · {o.city}</div></div><b>${o.total.toLocaleString('es-CO')}</b></div>)}</div></div>}
function Orders({orders}:any){return <div className="space-y-3">{orders.length===0?<Empty text="No hay pedidos todavía"/>:orders.map((o:any)=><div key={o.id} className="rounded-2xl border bg-white p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><div className="font-bold">{o.id}</div><div className="text-sm text-stone-500">{o.customer} · {o.phone || 'Sin teléfono'} · {o.city}</div></div><span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">{o.status}</span></div><div className="mt-3 flex items-center justify-between border-t pt-3"><span className="text-sm text-stone-500">{o.items.length} producto(s)</span><b>${o.total.toLocaleString('es-CO')}</b></div></div>)}</div>}
function Cart({sellerCart,products,setSellerCart,total,onOrder}:any){return <div className="rounded-2xl border bg-white p-4">{sellerCart.length===0?<Empty text="Tu pedido está vacío"/>:<><div className="space-y-3">{sellerCart.map((i:any)=>{const p=products.find((x:any)=>x.id===i.productId); return <div key={i.productId} className="flex items-center justify-between gap-3 border-b pb-3"><div><b>{p?.name}</b><div className="text-xs text-stone-500">Cantidad: {i.qty}</div></div><div className="text-right"><b>${(i.price*i.qty).toLocaleString('es-CO')}</b><button onClick={()=>setSellerCart((c:any[])=>c.filter(x=>x.productId!==i.productId))} className="ml-3 text-red-500"><X size={16}/></button></div></div>})}</div><div className="mt-5 flex items-center justify-between text-lg"><b>Total</b><b>${total.toLocaleString('es-CO')}</b></div><button onClick={onOrder} className="mt-4 w-full rounded-xl bg-[#2a241f] px-4 py-3 font-semibold text-white">Continuar pedido</button></>}</div>}
function Publications({products}:any){return <div className="grid gap-4 md:grid-cols-2"><div className="rounded-2xl border bg-white p-5"><div className="mb-4 flex items-center justify-between"><div><h2 className="font-semibold">Nueva publicación</h2><p className="text-sm text-stone-500">Una foto puede relacionar hasta 6 productos.</p></div><ImagePlus/></div><div className="rounded-2xl border-2 border-dashed p-10 text-center text-stone-500"><ImagePlus className="mx-auto mb-2"/><p>Subir fotografía</p></div></div><div className="rounded-2xl border bg-white p-5"><h2 className="font-semibold">Productos disponibles</h2><div className="mt-3 space-y-2">{products.slice(0,6).map((p:any)=><div key={p.id} className="flex items-center justify-between rounded-xl bg-stone-50 p-3 text-sm"><span>{p.name}</span><span className="font-mono text-xs">{p.sku}</span></div>)}</div></div></div>}
function Inventory({products}:any){return <div className="grid gap-3 md:grid-cols-2">{products.map((p:any)=><div key={p.id} className="rounded-2xl border bg-white p-4"><div className="flex justify-between"><b>{p.name}</b><span className={p.stock<10?'text-red-600':'text-emerald-700'}>{p.stock} unidades</span></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-stone-100"><div className="h-full rounded-full bg-[#6b5a4a]" style={{width:`${Math.min(100,p.stock*4)}%`}}/></div></div>)}</div>}
function Placeholder({section}:any){const map:any={customers:['Clientes','Aquí quedará el historial de clientes y pedidos.'],sellers:['Vendedoras','Aquí se administrarán usuarios, permisos y ciudades autorizadas.'],cities:['Ciudades y precios','Configura grupos de precios sin exponer la lógica interna a las vendedoras.'],reports:['Reportes','Ventas por ciudad, vendedora, producto y período.'],settings:['Configuración','Preferencias y parámetros generales de HROJAS.']}; return <div className="rounded-2xl border bg-white p-8"><CheckCircle2 className="mb-4 text-emerald-600"/><h2 className="text-xl font-bold">{map[section][0]}</h2><p className="mt-2 text-stone-500">{map[section][1]}</p><div className="mt-6 rounded-xl bg-stone-50 p-4 text-sm text-stone-600">Módulo preparado dentro de la estructura de la aplicación.</div></div>}
function PageTitle({title,subtitle}:{title:string;subtitle:string}){return <div className="mb-7 flex items-end justify-between"><div><h1 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h1><p className="mt-1 text-sm text-stone-500">{subtitle}</p></div></div>}
function Toolbar({search,setSearch,button,onButton}:any){return <div className="mb-4 flex flex-col gap-3 sm:flex-row"><div className="flex flex-1 items-center gap-2 rounded-xl border bg-white px-3"><Search size={17} className="text-stone-400"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar producto o SKU..." className="w-full bg-transparent py-3 outline-none text-sm"/></div>{button&&<button onClick={onButton} className="flex items-center justify-center gap-2 rounded-xl bg-[#2a241f] px-4 py-3 text-sm font-semibold text-white"><Plus size={17}/>{button}</button>}</div>}
function Stat({icon:Icon,label,value}:any){return <div className="rounded-2xl border bg-white p-5"><div className="flex items-center justify-between"><div className="rounded-xl bg-stone-100 p-2.5"><Icon size={18}/></div><ChevronRight size={16} className="text-stone-300"/></div><div className="mt-5 text-2xl font-bold">{value}</div><div className="mt-1 text-sm text-stone-500">{label}</div></div>}
function Empty({text}:{text:string}){return <div className="rounded-xl bg-stone-50 p-8 text-center text-sm text-stone-500">{text}</div>}
function Modal({title,onClose,children}:{title:string;onClose:()=>void;children:React.ReactNode}){return <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-3 sm:items-center"><div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl"><div className="mb-5 flex items-center justify-between"><h2 className="text-lg font-bold">{title}</h2><button onClick={onClose} className="rounded-lg p-2 hover:bg-stone-100"><X size={18}/></button></div>{children}</div></div>}
