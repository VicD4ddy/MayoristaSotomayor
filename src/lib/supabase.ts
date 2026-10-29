import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) ||
  'https://adxgyekseydqrgsuzhqw.supabase.co';

export const SUPABASE_ANON_KEY =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkeGd5ZWtzZXlkcXJnc3V6aHF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwMzg2NDgsImV4cCI6MjA5MjYxNDY0OH0.igqpJM1xSH5bqxo5ejCjdDTYSb7-fDE9DUtdoL6-Xxg';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const WHOLESALE_SQL_MIGRATION = `-- ========================================================
-- MIGRACIÓN COMPLETA PARA EL SISTEMA MAYORISTA SOTOMAYOR
-- Ejecutar en el Editor SQL de:
-- https://supabase.com/dashboard/project/adxgyekseydqrgsuzhqw/sql
-- ========================================================

-- 1. Campos mayoristas en la tabla existente de productos (Compatible 100% con Cotizador Detal)
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS is_wholesale boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS wholesale_stock integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS wholesale_cost numeric(12,2) DEFAULT 0.00,
  ADD COLUMN IF NOT EXISTS wholesale_price numeric(12,2) DEFAULT 0.00,
  ADD COLUMN IF NOT EXISTS wholesale_min_stock integer DEFAULT 2;

CREATE INDEX IF NOT EXISTS idx_products_wholesale ON public.products(is_wholesale) WHERE is_wholesale = true;

-- 2. Tabla de Clientes y Aliados Mayoristas
CREATE TABLE IF NOT EXISTS public.wholesale_clients (
  id text PRIMARY KEY,
  rif text NOT NULL,
  name text NOT NULL,
  city text,
  address text,
  phone text,
  tier text,
  discount numeric(5,2) DEFAULT 0.00,
  credit_limit numeric(12,2) DEFAULT 0.00,
  credit_days integer DEFAULT 0,
  is_deleted boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 3. Tabla de Asesores Comerciales y Vendedores Mayoristas
CREATE TABLE IF NOT EXISTS public.wholesale_sellers (
  id text PRIMARY KEY,
  name text NOT NULL,
  cedula text,
  zone text,
  phone text,
  commission_rate numeric(5,2) DEFAULT 5.00,
  bonus_rate numeric(5,2) DEFAULT 1.50,
  avatar text,
  is_active boolean DEFAULT true,
  is_deleted boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 4. Tabla de Facturas, Notas de Entrega y Cotizaciones Mayoristas
CREATE TABLE IF NOT EXISTS public.wholesale_invoices (
  id text PRIMARY KEY,
  date text NOT NULL,
  due_date text,
  client_id text,
  client_name text NOT NULL,
  client_rif text NOT NULL,
  client_city text,
  client_phone text,
  client_address text,
  seller_id text,
  seller_name text,
  document_type text DEFAULT 'Factura',
  payment_condition text DEFAULT 'Contado',
  status text DEFAULT 'Pendiente',
  subtotal_usd numeric(12,2) DEFAULT 0.00,
  discount_usd numeric(12,2) DEFAULT 0.00,
  tax_usd numeric(12,2) DEFAULT 0.00,
  total_usd numeric(12,2) DEFAULT 0.00,
  amount_paid_usd numeric(12,2) DEFAULT 0.00,
  balance_pending_usd numeric(12,2) DEFAULT 0.00,
  commission_rate numeric(5,2) DEFAULT 5.00,
  commission_usd numeric(12,2) DEFAULT 0.00,
  items_count integer DEFAULT 0,
  lines jsonb DEFAULT '[]'::jsonb,
  payments jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 5. Tabla de Historial de Lotes de Ingreso de Mercancía
CREATE TABLE IF NOT EXISTS public.wholesale_receipts (
  id text PRIMARY KEY,
  date text NOT NULL,
  supplier text NOT NULL,
  invoice_ref text,
  total_units integer DEFAULT 0,
  total_cost_usd numeric(12,2) DEFAULT 0.00,
  received_by text,
  items jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- 6. Habilitar Seguridad RLS y Acceso Público
ALTER TABLE public.wholesale_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wholesale_sellers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wholesale_invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wholesale_receipts ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'wholesale_clients' AND policyname = 'Allow public wholesale_clients') THEN
    CREATE POLICY "Allow public wholesale_clients" ON public.wholesale_clients FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'wholesale_sellers' AND policyname = 'Allow public wholesale_sellers') THEN
    CREATE POLICY "Allow public wholesale_sellers" ON public.wholesale_sellers FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'wholesale_invoices' AND policyname = 'Allow public wholesale_invoices') THEN
    CREATE POLICY "Allow public wholesale_invoices" ON public.wholesale_invoices FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'wholesale_receipts' AND policyname = 'Allow public wholesale_receipts') THEN
    CREATE POLICY "Allow public wholesale_receipts" ON public.wholesale_receipts FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;
`;

export interface SupabaseProductRow {
  id: string;
  code: string;
  name: string;
  description?: string | null;
  category_id?: string | null;
  brand_id?: string | null;
  cost?: number | null;
  price_usd?: number | null;
  stock?: number | null;
  min_stock?: number | null;
  location?: string | null;
  fitment?: any;
  image_url?: string | null;
  image_urls?: string[] | null;
  is_active?: boolean | null;
  created_at?: string;
  updated_at?: string;
  // Campos Mayoristas (pueden estar en BD o ser calculados)
  is_wholesale?: boolean | null;
  wholesale_stock?: number | null;
  wholesale_cost?: number | null;
  wholesale_price?: number | null;
  wholesale_min_stock?: number | null;
  // Relaciones embebidas
  brands?: { id: string; name: string; logo_url?: string | null } | null;
  categories?: { id: string; name: string; section?: string | null } | null;
}

export interface WholesaleProduct {
  id: string;
  name: string;
  sku: string;
  description: string;
  category: string;
  categorySection?: string;
  supplier: string;
  supplierLogo?: string;
  supplierColor: string;
  location: string;
  imageUrl?: string;
  imageUrls?: string[];
  fitment?: any[];
  // Indicador y métricas mayoristas
  isWholesale: boolean;
  stock: number; // Stock mayorista para compatibilidad con vistas existentes
  wholesaleStock: number;
  cost: number; // Costo mayorista para compatibilidad
  wholesaleCost: number;
  price: number; // Precio mayorista para compatibilidad
  wholesalePrice: number;
  minStock: number;
  // Métricas detal de referencia provenientes del Cotizador
  retailStock: number;
  retailCost: number;
  retailPrice: number;
  isRetailActive: boolean;
  iconBg: string;
}

// Claves de color de acuerdo a la marca para diseño consistente
const BRAND_COLORS: Record<string, string> = {
  MOOG: 'border-blue-500 text-blue-700 bg-blue-50',
  'SEALED POWER': 'border-red-500 text-red-700 bg-red-50',
  ACDELCO: 'border-blue-600 text-blue-800 bg-blue-50',
  GM: 'border-cyan-600 text-cyan-800 bg-cyan-50',
  CHEVROLET: 'border-amber-500 text-amber-700 bg-amber-50',
  FORD: 'border-indigo-600 text-indigo-800 bg-indigo-50',
  NATIONAL: 'border-emerald-600 text-emerald-800 bg-emerald-50',
};

const LOCAL_STORAGE_WHOLESALE_OVERRIDES_KEY = 'sotomayor_wholesale_overrides';

// Obtener sobreescrituras locales en caso de que las columnas en SQL aún no se hayan ejecutado
function getLocalOverrides(): Record<string, Partial<WholesaleProduct>> {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_WHOLESALE_OVERRIDES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveLocalWholesaleOverride(id: string, override: Partial<WholesaleProduct>) {
  try {
    const current = getLocalOverrides();
    current[id] = { ...current[id], ...override };
    localStorage.setItem(LOCAL_STORAGE_WHOLESALE_OVERRIDES_KEY, JSON.stringify(current));
  } catch (e) {
    console.error('Error saving local override', e);
  }
}

// Deducción inteligente del sistema automotriz (Tren Delantero, Motor, etc.)
export function getProductSystem(product: { name?: string; category?: string; categorySection?: string }): string {
  const name = (product.name || '').toLowerCase();
  const cat = (product.category || '').toLowerCase();
  const sec = (product.categorySection || '').toLowerCase();

  // 1. Si ya tiene sección explícita válida que no sea el fallback genérico
  if (product.categorySection && product.categorySection.trim() !== '' && product.categorySection !== 'Distribución Motor') {
    return product.categorySection;
  }

  // 2. Tren Delantero y Dirección (ej. Muñones, Terminales, Mesetas, etc.)
  if (
    name.includes('muñon') ||
    name.includes('muñón') ||
    name.includes('munon') ||
    name.includes('terminal') ||
    name.includes('meseta') ||
    name.includes('rotula') ||
    name.includes('rótula') ||
    name.includes('buje') ||
    name.includes('barra estabilizadora') ||
    name.includes('bieleta') ||
    name.includes('brazo pitman') ||
    name.includes('brazo loco') ||
    name.includes('cajetin') ||
    name.includes('cajetín') ||
    name.includes('cremallera') ||
    cat.includes('tren delantero') ||
    cat.includes('dirección') ||
    cat.includes('direccion') ||
    sec.includes('tren')
  ) {
    return 'Tren Delantero';
  }

  // 3. Suspensión (Amortiguadores, Espirales, Copelas, Ballestas)
  if (
    name.includes('amortiguador') ||
    name.includes('espiral') ||
    name.includes('ballesta') ||
    name.includes('copela') ||
    name.includes('base amortiguador') ||
    cat.includes('suspensión') ||
    cat.includes('suspension')
  ) {
    return 'Suspensión';
  }

  // 4. Frenos
  if (
    name.includes('pastilla') ||
    name.includes('disco') ||
    name.includes('banda') ||
    name.includes('tambor') ||
    name.includes('caliper') ||
    name.includes('bombin freno') ||
    name.includes('bomba freno') ||
    name.includes('cilindro freno') ||
    cat.includes('freno')
  ) {
    return 'Frenos';
  }

  // 5. Rodamientos y Tracción
  if (
    name.includes('rodamiento') ||
    name.includes('mozo') ||
    name.includes('tripoide') ||
    name.includes('triceta') ||
    name.includes('cruceta') ||
    name.includes('cardan') ||
    name.includes('copa') ||
    cat.includes('rodamiento') ||
    cat.includes('tracción') ||
    cat.includes('traccion') ||
    cat.includes('transmisión') ||
    cat.includes('transmision')
  ) {
    return 'Rodamientos y Tracción';
  }

  // 6. Motor, Distribución y Enfriamiento
  if (
    name.includes('piston') ||
    name.includes('pistón') ||
    name.includes('anillo') ||
    name.includes('empacadura') ||
    name.includes('junta') ||
    name.includes('valvula') ||
    name.includes('válvula') ||
    name.includes('bomba agua') ||
    name.includes('bomba aceite') ||
    name.includes('correa') ||
    name.includes('tensor') ||
    name.includes('cadena') ||
    name.includes('taquete') ||
    name.includes('arbol de leva') ||
    name.includes('árbol de levas') ||
    name.includes('cigueñal') ||
    name.includes('cigüeñal') ||
    name.includes('biela') ||
    name.includes('estopera') ||
    name.includes('radiador') ||
    name.includes('termostato') ||
    cat.includes('motor') ||
    cat.includes('distribución') ||
    cat.includes('distribucion') ||
    cat.includes('enfriamiento') ||
    sec.includes('motor')
  ) {
    return 'Motor';
  }

  // 7. Eléctrico y Encendido
  if (
    name.includes('bujia') ||
    name.includes('bujía') ||
    name.includes('bobina') ||
    name.includes('alternador') ||
    name.includes('arranque') ||
    name.includes('sensor') ||
    name.includes('fusible') ||
    cat.includes('eléctrico') ||
    cat.includes('electrico')
  ) {
    return 'Eléctrico y Encendido';
  }

  // Si tiene categoría explícita
  if (product.category && product.category !== 'General') {
    return product.category;
  }

  return 'Tren Delantero';
}

// Transforma una fila de Supabase al modelo WholesaleProduct
export function mapSupabaseToWholesaleProduct(row: SupabaseProductRow): WholesaleProduct {
  const overrides = getLocalOverrides()[row.id] || {};

  const brandName = row.brands?.name || 'GENÉRICO';
  const categoryName = row.categories?.name || 'General';

  const retailCost = Number(row.cost ?? 0);
  const retailPrice = Number(row.price_usd ?? 0);
  const retailStock = Number(row.stock ?? 0);

  // Si existe en BD, usar el valor. Si no, aplicar heurística inteligente de precio al mayor
  const hasDbWholesaleFlag = row.is_wholesale !== undefined && row.is_wholesale !== null;
  const isWholesaleDefault = hasDbWholesaleFlag
    ? Boolean(row.is_wholesale)
    : retailStock > 0 || retailCost > 0;

  // Por defecto, costo mayorista = costo detal (o descuento de compra al mayor)
  const wholesaleCostDefault = row.wholesale_cost !== undefined && row.wholesale_cost !== null && row.wholesale_cost > 0
    ? Number(row.wholesale_cost)
    : retailCost > 0
    ? Number((retailCost * 0.95).toFixed(2)) // 5% menor que costo detal por volumen
    : 0;

  // Precio mayorista por defecto = ~15% a 20% de margen sobre costo al mayor (más competitivo que detal)
  const wholesalePriceDefault = row.wholesale_price !== undefined && row.wholesale_price !== null && row.wholesale_price > 0
    ? Number(row.wholesale_price)
    : wholesaleCostDefault > 0
    ? Number((wholesaleCostDefault * 1.25).toFixed(2))
    : retailPrice > 0
    ? Number((retailPrice * 0.82).toFixed(2))
    : 0;

  const wholesaleStockDefault = row.wholesale_stock !== undefined && row.wholesale_stock !== null
    ? Number(row.wholesale_stock)
    : 0; // El stock mayorista es un inventario totalmente independiente del stock detal

  const minStockDefault = Number(row.wholesale_min_stock ?? row.min_stock ?? 2);

  const isWholesale = hasDbWholesaleFlag ? isWholesaleDefault : (overrides.isWholesale !== undefined ? overrides.isWholesale : isWholesaleDefault);
  const wholesaleStock = row.wholesale_stock !== undefined && row.wholesale_stock !== null ? Number(row.wholesale_stock) : (overrides.wholesaleStock !== undefined ? overrides.wholesaleStock : wholesaleStockDefault);
  const wholesaleCost = row.wholesale_cost !== undefined && row.wholesale_cost !== null && Number(row.wholesale_cost) > 0 ? Number(row.wholesale_cost) : (overrides.wholesaleCost !== undefined ? overrides.wholesaleCost : wholesaleCostDefault);
  const wholesalePrice = row.wholesale_price !== undefined && row.wholesale_price !== null && Number(row.wholesale_price) > 0 ? Number(row.wholesale_price) : (overrides.wholesalePrice !== undefined ? overrides.wholesalePrice : wholesalePriceDefault);
  const minStock = overrides.minStock !== undefined ? overrides.minStock : minStockDefault;

  // Limpieza de ubicación: si no existe o dice "Almacén Principal Valencia", se deja vacía
  const cleanLocation = (row.location && !row.location.toLowerCase().includes('almacén principal')) ? row.location : '';

  return {
    id: row.id,
    sku: row.code || 'SIN-CODIGO',
    name: row.name || 'Repuesto Sin Nombre',
    description: row.description || '',
    category: categoryName,
    categorySection: row.categories?.section || undefined,
    supplier: brandName,
    supplierLogo: row.brands?.logo_url || undefined,
    supplierColor: BRAND_COLORS[brandName.toUpperCase()] || 'border-gray-300 text-gray-700 bg-gray-50',
    location: cleanLocation,
    imageUrl: row.image_url || undefined,
    imageUrls: row.image_urls || undefined,
    fitment: Array.isArray(row.fitment) ? row.fitment : [],
    isWholesale,
    stock: wholesaleStock,
    wholesaleStock,
    cost: wholesaleCost,
    wholesaleCost,
    price: wholesalePrice,
    wholesalePrice,
    minStock,
    retailStock,
    retailCost,
    retailPrice,
    isRetailActive: Boolean(row.is_active),
    iconBg: 'bg-orange-50 text-[#FF5C1B]',
  };
}

// ========================================================
// INTERFACES DEL SISTEMA MAYORISTA COMPATIBLES CON SUPABASE
// ========================================================
export interface WholesaleClient {
  id: string;
  name: string;
  rif: string;
  city: string;
  address?: string;
  phone?: string;
  email?: string;
  tier?: string;
  sellerId?: string;
  discount: number;
  creditLimit?: number;
  creditDays?: number;
  isDeleted?: boolean;
}

export interface WholesaleSeller {
  id: string;
  name: string;
  zone: string;
  commissionRate?: number;
  bonusRate: number;
  phone: string;
  avatar: string;
  cedula?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
}

export interface WholesalePaymentInstallment {
  id: string;
  date: string;
  amountUsd: number;
  amountVed: number;
  bcvRate: number;
  method: 'Divisas Efectivo' | 'Zelle' | 'Pago Móvil BCV' | 'Transferencia Bancaria';
  reference: string;
  notes?: string;
  registeredBy: string;
}

export interface WholesaleInvoiceLine {
  productId: string;
  name: string;
  sku: string;
  qty: number;
  price: number;
  isPendingWholesaleActivation?: boolean;
  assignedWholesaleCost?: number;
  initialWholesaleStock?: number;
}

export interface WholesaleInvoice {
  id: string;
  clientId?: string;
  date: string;
  dueDate?: string;
  clientName: string;
  clientRif: string;
  clientCity?: string;
  clientAddress?: string;
  clientPhone?: string;
  sellerId: string;
  sellerName: string;
  paymentCondition: string;
  documentType?: string;
  status: 'Cobrada' | 'Pendiente' | 'Parcial' | 'Vencida' | 'Borrador';
  subtotalUsd: number;
  discountUsd: number;
  taxUsd: number;
  totalUsd: number;
  amountPaidUsd?: number;
  balancePendingUsd?: number;
  payments?: WholesalePaymentInstallment[];
  commissionRate: number;
  commissionUsd: number;
  itemsCount: number;
  lines?: WholesaleInvoiceLine[];
}

export interface WholesaleReceiptItem {
  productId: string;
  sku: string;
  name: string;
  brand: string;
  brandLogo?: string;
  qtyToEnter: number;
  unitCost: number;
  newPrice: number;
}

export interface WholesaleReceipt {
  id: string;
  date: string;
  supplier: string;
  invoiceRef: string;
  totalUnits: number;
  totalCostUsd: number;
  receivedBy: string;
  items?: WholesaleReceiptItem[];
}

// ========================================================
// MAPEOS BIDIRECCIONALES (CamelCase Frontend <-> Snake_Case DB)
// ========================================================
export function mapDbToWholesaleClient(row: any): WholesaleClient {
  const sellerId = row.seller_id || (row.tier && row.tier.startsWith('vend-') ? row.tier : undefined);
  return {
    id: row.id,
    rif: row.rif || '',
    name: row.name || '',
    city: row.city || 'Valencia',
    address: row.address || '',
    phone: row.phone || '',
    tier: row.tier && !row.tier.startsWith('vend-') ? row.tier : undefined,
    sellerId: sellerId,
    discount: Number(row.discount ?? 0),
    creditLimit: row.credit_limit !== null ? Number(row.credit_limit) : undefined,
    creditDays: row.credit_days !== null ? Number(row.credit_days) : undefined,
    isDeleted: Boolean(row.is_deleted),
  };
}

export function mapWholesaleClientToDb(c: WholesaleClient): any {
  return {
    id: c.id,
    rif: c.rif,
    name: c.name,
    city: c.city,
    address: c.address || null,
    phone: c.phone || null,
    tier: c.sellerId || c.tier || null,
    discount: c.discount ?? 0,
    credit_limit: c.creditLimit ?? 0,
    credit_days: c.creditDays ?? 0,
    is_deleted: Boolean(c.isDeleted),
    updated_at: new Date().toISOString(),
  };
}

export function mapDbToWholesaleSeller(row: any): WholesaleSeller {
  return {
    id: row.id,
    name: row.name || '',
    cedula: row.cedula || undefined,
    zone: row.zone || '',
    phone: row.phone || '',
    commissionRate: row.commission_rate !== null ? Number(row.commission_rate) : 5,
    bonusRate: row.bonus_rate !== null ? Number(row.bonus_rate) : 1.5,
    avatar: row.avatar || 'VE',
    isActive: row.is_active !== false,
    isDeleted: Boolean(row.is_deleted),
    createdAt: row.created_at || undefined,
  };
}

export function mapWholesaleSellerToDb(s: WholesaleSeller): any {
  return {
    id: s.id,
    name: s.name,
    cedula: s.cedula || null,
    zone: s.zone || null,
    phone: s.phone || null,
    commission_rate: s.commissionRate ?? 5.0,
    bonus_rate: s.bonusRate ?? 1.5,
    avatar: s.avatar || 'VE',
    is_active: s.isActive !== false,
    is_deleted: Boolean(s.isDeleted),
    updated_at: new Date().toISOString(),
  };
}

export function mapDbToWholesaleInvoice(row: any): WholesaleInvoice {
  return {
    id: row.id,
    date: row.date,
    dueDate: row.due_date || undefined,
    clientId: row.client_id || undefined,
    clientName: row.client_name,
    clientRif: row.client_rif,
    clientCity: row.client_city || undefined,
    clientPhone: row.client_phone || undefined,
    clientAddress: row.client_address || undefined,
    sellerId: row.seller_id,
    sellerName: row.seller_name,
    documentType: row.document_type || 'Nota de Entrega Mayorista',
    paymentCondition: row.payment_condition || 'Contado',
    status: row.status as 'Cobrada' | 'Pendiente' | 'Parcial' | 'Vencida',
    subtotalUsd: Number(row.subtotal_usd ?? 0),
    discountUsd: Number(row.discount_usd ?? 0),
    taxUsd: Number(row.tax_usd ?? 0),
    totalUsd: Number(row.total_usd ?? 0),
    amountPaidUsd: Number(row.amount_paid_usd ?? 0),
    balancePendingUsd: Number(row.balance_pending_usd ?? 0),
    commissionRate: Number(row.commission_rate ?? 5),
    commissionUsd: Number(row.commission_usd ?? 0),
    itemsCount: Number(row.items_count ?? 0),
    lines: Array.isArray(row.lines) ? row.lines : [],
    payments: Array.isArray(row.payments) ? row.payments : [],
  };
}

export function mapWholesaleInvoiceToDb(inv: WholesaleInvoice): any {
  return {
    id: inv.id,
    date: inv.date,
    due_date: inv.dueDate || null,
    client_id: inv.clientId || null,
    client_name: inv.clientName,
    client_rif: inv.clientRif,
    client_city: inv.clientAddress || null,
    client_phone: inv.clientPhone || null,
    client_address: inv.clientAddress || null,
    seller_id: inv.sellerId,
    seller_name: inv.sellerName,
    document_type: inv.documentType || 'Nota de Entrega Mayorista',
    payment_condition: inv.paymentCondition || 'Contado',
    status: inv.status || 'Pendiente',
    subtotal_usd: inv.subtotalUsd,
    discount_usd: inv.discountUsd,
    tax_usd: inv.taxUsd,
    total_usd: inv.totalUsd,
    amount_paid_usd: inv.amountPaidUsd || 0,
    balance_pending_usd: inv.balancePendingUsd !== undefined ? inv.balancePendingUsd : inv.totalUsd,
    commission_rate: inv.commissionRate,
    commission_usd: inv.commissionUsd,
    items_count: inv.itemsCount,
    lines: inv.lines || [],
    payments: inv.payments || [],
    updated_at: new Date().toISOString(),
  };
}

export function mapDbToWholesaleReceipt(row: any): WholesaleReceipt {
  return {
    id: row.id,
    date: row.date,
    supplier: row.supplier,
    invoiceRef: row.invoice_ref || '',
    totalUnits: Number(row.total_units ?? 0),
    totalCostUsd: Number(row.total_cost_usd ?? 0),
    receivedBy: row.received_by || '',
    items: Array.isArray(row.items) ? row.items : [],
  };
}

export function mapWholesaleReceiptToDb(r: WholesaleReceipt): any {
  return {
    id: r.id,
    date: r.date,
    supplier: r.supplier,
    invoice_ref: r.invoiceRef || null,
    total_units: r.totalUnits,
    total_cost_usd: r.totalCostUsd,
    received_by: r.receivedBy || null,
    items: r.items || [],
  };
}

// ========================================================
// SERVICIOS CRUD DIRECTOS CON SUPABASE (OFFLINE-CAPABLE)
// ========================================================
export async function fetchWholesaleAll(): Promise<{
  clients: WholesaleClient[];
  sellers: WholesaleSeller[];
  invoices: WholesaleInvoice[];
  receipts: WholesaleReceipt[];
  isOnline: boolean;
}> {
  try {
    const [cRes, sRes, iRes, rRes] = await Promise.all([
      supabase.from('wholesale_clients').select('*').order('name', { ascending: true }),
      supabase.from('wholesale_sellers').select('*').order('name', { ascending: true }),
      supabase.from('wholesale_invoices').select('*').order('date', { ascending: false }),
      supabase.from('wholesale_receipts').select('*').order('date', { ascending: false }),
    ]);

    if (cRes.error || sRes.error || iRes.error || rRes.error) {
      console.warn('Error fetching wholesale tables:', {
        cErr: cRes.error?.message,
        sErr: sRes.error?.message,
        iErr: iRes.error?.message,
        rErr: rRes.error?.message,
      });
      return { clients: [], sellers: [], invoices: [], receipts: [], isOnline: false };
    }

    return {
      clients: (cRes.data || []).map(mapDbToWholesaleClient),
      sellers: (sRes.data || []).map(mapDbToWholesaleSeller),
      invoices: (iRes.data || []).map(mapDbToWholesaleInvoice),
      receipts: (rRes.data || []).map(mapDbToWholesaleReceipt),
      isOnline: true,
    };
  } catch (err) {
    console.warn('Network error in fetchWholesaleAll:', err);
    return { clients: [], sellers: [], invoices: [], receipts: [], isOnline: false };
  }
}

export async function upsertWholesaleClient(client: WholesaleClient): Promise<boolean> {
  try {
    const dbPayload = mapWholesaleClientToDb(client);
    const { error } = await supabase.from('wholesale_clients').upsert([dbPayload]);
    if (error) {
      console.warn('Supabase upsertWholesaleClient error:', error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.warn('Supabase upsertWholesaleClient exception:', e);
    return false;
  }
}

export async function softDeleteWholesaleClient(clientId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('wholesale_clients')
      .update({ is_deleted: true, updated_at: new Date().toISOString() })
      .eq('id', clientId);
    if (error) {
      console.warn('Supabase softDeleteWholesaleClient error:', error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.warn('Supabase softDeleteWholesaleClient exception:', e);
    return false;
  }
}

export async function upsertWholesaleSeller(seller: WholesaleSeller): Promise<boolean> {
  try {
    const dbPayload = mapWholesaleSellerToDb(seller);
    const { error } = await supabase.from('wholesale_sellers').upsert([dbPayload]);
    if (error) {
      console.warn('Supabase upsertWholesaleSeller error:', error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.warn('Supabase upsertWholesaleSeller exception:', e);
    return false;
  }
}

export async function toggleWholesaleSellerActive(sellerId: string, isActive: boolean): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('wholesale_sellers')
      .update({ is_active: isActive, updated_at: new Date().toISOString() })
      .eq('id', sellerId);
    if (error) {
      console.warn('Supabase toggleWholesaleSellerActive error:', error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.warn('Supabase toggleWholesaleSellerActive exception:', e);
    return false;
  }
}

export async function softDeleteWholesaleSeller(sellerId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('wholesale_sellers')
      .update({ is_deleted: true, is_active: false, updated_at: new Date().toISOString() })
      .eq('id', sellerId);
    if (error) {
      console.warn('Supabase softDeleteWholesaleSeller error:', error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.warn('Supabase softDeleteWholesaleSeller exception:', e);
    return false;
  }
}

export async function insertWholesaleInvoice(invoice: WholesaleInvoice): Promise<boolean> {
  try {
    const dbPayload = mapWholesaleInvoiceToDb(invoice);
    const { error } = await supabase.from('wholesale_invoices').upsert([dbPayload]);
    if (error) {
      console.warn('Supabase insertWholesaleInvoice error:', error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.warn('Supabase insertWholesaleInvoice exception:', e);
    return false;
  }
}

export async function updateWholesaleInvoicePayment(
  invoiceId: string,
  payments: WholesalePaymentInstallment[],
  amountPaidUsd: number,
  balancePendingUsd: number,
  status: string
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('wholesale_invoices')
      .update({
        payments,
        amount_paid_usd: amountPaidUsd,
        balance_pending_usd: balancePendingUsd,
        status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', invoiceId);
    if (error) {
      console.warn('Supabase updateWholesaleInvoicePayment error:', error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.warn('Supabase updateWholesaleInvoicePayment exception:', e);
    return false;
  }
}

export async function insertWholesaleReceipt(receipt: WholesaleReceipt): Promise<boolean> {
  try {
    const dbPayload = mapWholesaleReceiptToDb(receipt);
    const { error } = await supabase.from('wholesale_receipts').upsert([dbPayload]);
    if (error) {
      console.warn('Supabase insertWholesaleReceipt error:', error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.warn('Supabase insertWholesaleReceipt exception:', e);
    return false;
  }
}

export async function updateProductWholesale(
  productId: string,
  data: {
    is_wholesale?: boolean;
    wholesale_stock?: number;
    wholesale_cost?: number;
    wholesale_price?: number;
    wholesale_min_stock?: number;
  }
): Promise<boolean> {
  try {
    const { error } = await supabase.from('products').update(data).eq('id', productId);
    if (error) {
      console.warn('Supabase updateProductWholesale error:', error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.warn('Supabase updateProductWholesale exception:', e);
    return false;
  }
}

export async function deleteWholesaleInvoice(invoiceId: string): Promise<boolean> {
  try {
    const { error } = await supabase.from('wholesale_invoices').delete().eq('id', invoiceId);
    if (error) {
      console.warn('Supabase deleteWholesaleInvoice error:', error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.warn('Supabase deleteWholesaleInvoice exception:', e);
    return false;
  }
}

export async function insertNewProduct(data: {
  sku: string;
  name: string;
  category?: string;
  supplier?: string;
  cost: number;
  price: number;
  wholesaleStock: number;
}): Promise<WholesaleProduct | null> {
  try {
    const newId = `prod-${Date.now()}`;
    const dbPayload = {
      id: newId,
      code: data.sku,
      name: data.name,
      description: '',
      cost: data.cost,
      price_usd: data.price,
      stock: 0,
      min_stock: 2,
      is_active: true,
      is_wholesale: true,
      wholesale_stock: data.wholesaleStock,
      wholesale_cost: data.cost,
      wholesale_price: data.price,
      wholesale_min_stock: 2,
    };
    const { error } = await supabase.from('products').insert([dbPayload]);
    if (error) {
      console.warn('Supabase insertNewProduct error:', error.message);
      return null;
    }
    return {
      id: newId,
      sku: data.sku,
      name: data.name,
      description: '',
      category: data.category || 'Tren Delantero',
      supplier: data.supplier || 'GENÉRICO',
      supplierColor: 'border-orange-500 text-orange-600 bg-orange-50',
      stock: data.wholesaleStock,
      minStock: 2,
      cost: data.cost,
      price: data.price,
      location: '',
      iconBg: 'bg-orange-50 text-[#FF5C1B]',
      isWholesale: true,
      wholesaleStock: data.wholesaleStock,
      wholesaleCost: data.cost,
      wholesalePrice: data.price,
      retailStock: 0,
      retailCost: data.cost,
      retailPrice: data.price,
      isRetailActive: false,
    };
  } catch (e) {
    console.warn('Supabase insertNewProduct exception:', e);
    return null;
  }
}
