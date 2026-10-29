import React, { useState, useMemo, useEffect, useRef } from 'react';
import UseAnimations from 'react-useanimations';
import packageAnimation from 'react-useanimations/lib/package';
import fileTextAnimation from 'react-useanimations/lib/fileText';
import truckAnimation from 'react-useanimations/lib/truck';
import usersAnimation from 'react-useanimations/lib/users';
import shoppingBagAnimation from 'react-useanimations/lib/shoppingBag';
import plusToXAnimation from 'react-useanimations/lib/plusToX';
import searchToXAnimation from 'react-useanimations/lib/searchToX';
import notificationAnimation from 'react-useanimations/lib/notification';
import messageSquareAnimation from 'react-useanimations/lib/messageSquare';
import settingsAnimation from 'react-useanimations/lib/settings';
import visibilityAnimation from 'react-useanimations/lib/visibility';
import rotateCcwAnimation from 'react-useanimations/lib/rotateCcw';
import checkmarkAnimation from 'react-useanimations/lib/checkmark';
import trash2Animation from 'react-useanimations/lib/trash2';
import shoppingCartAnimation from 'react-useanimations/lib/shoppingCart';
import calendarAnimation from 'react-useanimations/lib/calendar';
import printerAnimation from 'react-useanimations/lib/printer';
import downloadAnimation from 'react-useanimations/lib/download';
import alertTriangleAnimation from 'react-useanimations/lib/alertTriangle';
import moreHorizontalAnimation from 'react-useanimations/lib/moreHorizontal';
import chevronDownAnimation from 'react-useanimations/lib/chevronDown';
import clipboardAnimation from 'react-useanimations/lib/clipboard';
import clockAnimation from 'react-useanimations/lib/clock';
import filterAnimation from 'react-useanimations/lib/filter';
import activityAnimation from 'react-useanimations/lib/activity';
import {
  ArrowUpDown,
  X,
  MessageCircle,
  Share2,
  Send,
  CheckCircle2,
  DollarSign,
  AlertCircle,
  Calendar,
  CreditCard,
  FileSpreadsheet,
  ExternalLink,
  Printer,
  History,
  FileText,
  Database,
  ToggleLeft,
  ToggleRight,
  Copy,
  Check,
  Layers,
  Store,
  RefreshCw,
  Sparkles,
  Boxes,
  Moon,
  Sun,
  Sliders,
  ShoppingCart,
  Plus,
  Bell,
  Download,
  Code2,
  FilePlus,
  AlertTriangle,
  Palette,
  ChevronDown,
  TrendingUp,
  Coins,
  Zap,
  Minus,
  BarChart2,
  PieChart,
  Award,
  ArrowUpRight,
  Percent,
  Wallet,
  Target,
  TrendingDown,
  Users,
  Search,
  Tag,
  CornerDownLeft,
  Trash2,
  BookOpen,
  HelpCircle,
  Compass,
  ChevronRight,
  ChevronLeft,
  Save,
  Clock
} from 'lucide-react';
import {
  supabase,
  mapSupabaseToWholesaleProduct,
  WHOLESALE_SQL_MIGRATION,
  saveLocalWholesaleOverride,
  SupabaseProductRow,
  getProductSystem,
  fetchWholesaleAll,
  upsertWholesaleClient,
  softDeleteWholesaleClient,
  upsertWholesaleSeller,
  toggleWholesaleSellerActive,
  softDeleteWholesaleSeller,
  insertWholesaleInvoice,
  updateWholesaleInvoicePayment,
  insertWholesaleReceipt,
  updateProductWholesale,
  deleteWholesaleInvoice,
  insertNewProduct,
} from './lib/supabase';

// ==========================================
// COMPONENTE ÍCONO DE WHATSAPP OFICIAL
// ==========================================
export const WhatsAppIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// ==========================================
// UTILIDADES DE ENVÍO POR WHATSAPP
// ==========================================
export const sendWhatsApp = (text: string, phone?: string) => {
  const cleanPhone = phone ? phone.replace(/[^0-9]/g, '') : '';
  const finalPhone = cleanPhone
    ? cleanPhone.startsWith('58')
      ? cleanPhone
      : `58${cleanPhone.replace(/^0/, '')}`
    : '';
  const url = finalPhone
    ? `https://api.whatsapp.com/send?phone=${finalPhone}&text=${encodeURIComponent(text)}`
    : `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
};


// ==========================================
// COMPONENTE ÍCONO DE BINANCE OFICIAL
// ==========================================
export const BinanceIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.5l3.85 3.85-2.02 2.02L12 6.54l-1.83 1.83-2.02-2.02L12 2.5zM4.15 10.35l2.02-2.02L8.19 10.35 6.17 12.37l-2.02-2.02zm15.7 0l-2.02-2.02-2.02 2.02 2.02 2.02 2.02-2.02zm-7.85 0l2.02-2.02 2.02 2.02-2.02 2.02-2.02-2.02zM12 14.16l3.85 3.85-2.02 2.02L12 18.2l-1.83 1.83-2.02-2.02L12 14.16zm-7.85-3.81l2.02 2.02-2.02 2.02-2.02-2.02 2.02-2.02zm15.7 0l2.02 2.02-2.02 2.02-2.02-2.02 2.02-2.02z" />
  </svg>
);

export const buildInvoiceWhatsAppText = (inv: Invoice, bcvRate: number, isQuote = false, rateLabel = "Tasa") => {
  const docTitle = isQuote ? 'COTIZACIÓN MAYORISTA' : (inv.documentType || 'NOTA DE ENTREGA / FACTURA');
  const itemsText = inv.lines && inv.lines.length > 0
    ? inv.lines.map(l => `• *${l.qty}x* ${l.name} (${l.sku}) → *$${(l.qty * l.price).toFixed(2)}*`).join('\n')
    : '• Repuestos al mayor según documento adjunto';

  const totalBs = (inv.totalUsd * bcvRate).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const pending = inv.balancePendingUsd !== undefined ? inv.balancePendingUsd : (inv.status === 'Cobrada' ? 0 : inv.totalUsd);
  const pendingBs = (pending * bcvRate).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return `🚗 *REPUESTOS SOTOMAYOR, C.A.*
*Distribución Mayorista de Autopartes*
📍 Av. Michelena, Valencia - Edo. Carabobo
RIF: J-07590371-4 | Telf: (0241) 832-9011
━━━━━━━━━━━━━━━━━━━━
📄 *${docTitle}:* ${inv.id}
📅 *Fecha:* ${inv.date} ${inv.dueDate ? `\n⏳ *Vence:* ${inv.dueDate}` : ''}
👤 *Cliente:* ${inv.clientName}
🆔 *RIF:* ${inv.clientRif}
💼 *Asesor Comercial:* ${inv.sellerName}
💳 *Condición:* ${inv.paymentCondition}

📦 *DETALLE DE REPUESTOS:*
${itemsText}

━━━━━━━━━━━━━━━━━━━━
💵 *Subtotal:* $${inv.subtotalUsd.toFixed(2)} USD
${inv.discountUsd > 0 ? `🏷️ *Descuento:* -$${inv.discountUsd.toFixed(2)} USD\n` : ''}${inv.taxUsd > 0 ? `🏛️ *IVA (16%):* +$${inv.taxUsd.toFixed(2)} USD\n` : ''}💰 *TOTAL A PAGAR:* *$${inv.totalUsd.toFixed(2)} USD*
🇻🇪 *Equivalente en Bolívares:* *Bs. ${totalBs}* (${rateLabel}: Bs. ${bcvRate.toFixed(2)})

${pending > 0 ? `⚠️ *SALDO PENDIENTE:* *$${pending.toFixed(2)} USD* (Bs. ${pendingBs})\n` : '✅ *ESTADO:* Pagado / Solvente\n'}
🏦 *DATOS BANCARIOS OFICIALES:*
• *Pago Móvil:* Banesco (0134) | RIF: J-07590371-4 | Telf: 0412-8329011
• *Zelle:* pagos@repuestossotomayor.com (Repuestos Sotomayor C.A.)
• *Transferencia:* Banesco Cta. Corriente 0134-0078-41-0781044455

_Por favor confirmar el pago enviando el comprobante de la transferencia o Pago Móvil._`;
};

export const buildDebtReminderWhatsAppText = (inv: Invoice, bcvRate: number, rateLabel = "Tasa") => {
  const pending = inv.balancePendingUsd !== undefined ? inv.balancePendingUsd : inv.totalUsd;
  const pendingBs = (pending * bcvRate).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const paid = inv.amountPaidUsd || 0;

  return `🚗 *REPUESTOS SOTOMAYOR, C.A.*
*Departamento de Administración y Cobranzas*
Valencia, Edo. Carabobo | RIF: J-07590371-4
━━━━━━━━━━━━━━━━━━━━
Estimado aliado comercial *${inv.clientName}*,

Esperamos se encuentre excelente. Le recordamos el estado actual de su cuenta por cobrar:

📄 *Documento:* ${inv.id}
📅 *Fecha de Emisión:* ${inv.date}
⏳ *Vencimiento:* ${inv.dueDate || 'Vencimiento Inmediato'}
💼 *Condición de Crédito:* ${inv.paymentCondition}

💰 *Monto Original:* $${inv.totalUsd.toFixed(2)} USD
✅ *Total Abonado a la fecha:* $${paid.toFixed(2)} USD
🔴 *SALDO PENDIENTE:* *$${pending.toFixed(2)} USD*
🇻🇪 *Equiv. Hoy:* *Bs. ${pendingBs}* (${rateLabel}: Bs. ${bcvRate.toFixed(2)})

🏦 *DATOS BANCARIOS PARA SU PAGO:*
• *Pago Móvil:* Banesco (0134) | RIF: J-07590371-4 | 0412-8329011
• *Zelle:* pagos@repuestossotomayor.com
• *Transferencia:* Banesco 0134-0078-41-0781044455

Agradecemos nos comparta el comprobante de su abono o pago para actualizar su estado de cuenta de inmediato.
_Atte. Cobranzas / Repuestos Sotomayor Valencia_`;
};

export const buildPaymentReceiptWhatsAppText = (inv: Invoice, payment: PaymentInstallment, bcvRate: number, rateLabel = "Tasa") => {
  const pending = inv.balancePendingUsd !== undefined ? inv.balancePendingUsd : 0;
  const pendingBs = (pending * bcvRate).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return `🚗 *REPUESTOS SOTOMAYOR, C.A.*
*RECIBO DE ABONO / COBRANZA*
━━━━━━━━━━━━━━━━━━━━
Comprobante N°: *${payment.id}*
📅 *Fecha:* ${payment.date}
👤 *Cliente:* ${inv.clientName}
📄 *Documento Asociado:* ${inv.id}

💵 *MONTO ABONADO:* *$${payment.amountUsd.toFixed(2)} USD*
🇻🇪 *Equiv. en Bolívares:* *Bs. ${payment.amountVed.toLocaleString('es-VE', { minimumFractionDigits: 2 })}* (Tasa: Bs. ${payment.bcvRate.toFixed(2)})
💳 *Forma de Pago:* ${payment.method}
🔖 *Referencia Bancaria:* ${payment.reference}
${payment.notes ? `📝 *Observaciones:* ${payment.notes}\n` : ''}
━━━━━━━━━━━━━━━━━━━━
${pending > 0 ? `⚠️ *SALDO RESTANTE:* $${pending.toFixed(2)} USD (Bs. ${pendingBs})` : '🎉 *ESTA FACTURA HA SIDO SALDADA EN SU TOTALIDAD*'}

_¡Agradecemos su puntual pago y confianza comercial!_`;
};

export const formatDateMMDDYYYY = (dateStr?: string): string => {
  if (!dateStr) return '';
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) return dateStr;
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[1]}/${parts[2]}/${parts[0]}`;
  }
  return dateStr;
};

export const formatInvoiceDisplayNumber = (id: string): string => {
  if (!id) return '00001';
  if (/^\d{5}$/.test(id)) return id;
  const digits = id.replace(/\D/g, '');
  if (digits.length >= 5) {
    return digits.slice(-5);
  }
  return digits ? digits.padStart(5, '0') : id.padStart(5, '0');
};

export const getDocumentTitle = (docType?: string): string => {
  if (!docType) return 'Nota De Entrega';
  const lower = docType.toLowerCase();
  if (lower.includes('cotización') || lower.includes('cotizacion')) {
    return 'Cotización Mayorista';
  }
  if (lower.includes('factura') || lower.includes('seniat') || lower.includes('fiscal')) {
    return 'Factura';
  }
  return 'Nota De Entrega';
};

// ==========================================
// TIPOS TYPESCRIPT
// ==========================================
export interface WholesaleProduct {
  id: string;
  name: string;
  sku: string;
  category: string;
  categorySection?: string;
  supplier: string;
  supplierLogo?: string;
  supplierColor: string;
  stock: number;
  minStock: number;
  cost: number;
  price: number;
  location: string;
  iconBg: string;
  description?: string;
  imageUrl?: string;
  imageUrls?: string[];
  fitment?: any[];
  // Campos Mayoristas y Detal (Cotizador)
  isWholesale?: boolean;
  wholesaleStock?: number;
  wholesaleCost?: number;
  wholesalePrice?: number;
  retailStock?: number;
  retailCost?: number;
  retailPrice?: number;
  isRetailActive?: boolean;
}
export type Product = WholesaleProduct;

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
export type Seller = WholesaleSeller;

export interface WholesaleClient {
  id: string;
  name: string;
  rif: string;
  city: string;
  address?: string;
  phone?: string;
  email?: string;
  tier?: string;
  discount: number;
  creditLimit?: number;
  creditDays?: number;
  isDeleted?: boolean;
}
export type Client = WholesaleClient;

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
export type InvoiceLine = WholesaleInvoiceLine;

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
export type PaymentInstallment = WholesalePaymentInstallment;

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
export type Invoice = WholesaleInvoice;

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
export type ReceiptItem = WholesaleReceiptItem;

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
export type Receipt = WholesaleReceipt;

export interface WholesaleStockHistoryItem {
  id: number | string;
  date: string;
  sku: string;
  product: string;
  type: string;
  qty: string | number;
  user: string;
}
export type StockHistoryItem = WholesaleStockHistoryItem;

// ==========================================
// DATOS INICIALES LIMPIOS (MODO PRODUCCIÓN)
// ==========================================
const INITIAL_PRODUCTS: Product[] = [];
const INITIAL_SELLERS: Seller[] = [];
const INITIAL_CLIENTS: Client[] = [];
const INITIAL_INVOICES: Invoice[] = [];
const INITIAL_RECEIPTS: Receipt[] = [];
const INITIAL_STOCK_HISTORY: StockHistoryItem[] = [];

// ==========================================
// MODAL: CONFIGURACIÓN DE REPUESTO MAYORISTA
// ==========================================
interface WholesaleConfigModalProps {
  product: Product;
  bcvRate: number;
  onClose: () => void;
  onSave: (
    id: string,
    updates: {
      isWholesale: boolean;
      wholesaleStock: number;
      wholesaleCost: number;
      wholesalePrice: number;
      minStock: number;
    }
  ) => void;
}

const WholesaleConfigModal: React.FC<WholesaleConfigModalProps> = ({
  product,
  bcvRate,
  onClose,
  onSave,
}) => {
  const [isWholesale, setIsWholesale] = useState<boolean>(product.isWholesale ?? false);
  const [wholesaleStock, setWholesaleStock] = useState<number>(product.wholesaleStock ?? product.stock ?? 0);
  const [wholesaleCost, setWholesaleCost] = useState<number>(product.wholesaleCost ?? product.cost ?? 0);
  const [wholesalePrice, setWholesalePrice] = useState<number>(product.wholesalePrice ?? product.price ?? 0);
  const [minStock, setMinStock] = useState<number>(product.minStock ?? 2);

  const profit = Math.max(0, wholesalePrice - wholesaleCost);
  const marginPercent =
    wholesalePrice > 0
      ? (((wholesalePrice - wholesaleCost) / wholesalePrice) * 100).toFixed(1)
      : '0.0';
  const priceBs = (wholesalePrice * bcvRate).toLocaleString('es-VE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const retailPrice = product.retailPrice ?? 0;
  const retailSavings = retailPrice > wholesalePrice ? retailPrice - wholesalePrice : 0;
  const retailSavingsPercent =
    retailPrice > 0 && retailSavings > 0
      ? ((retailSavings / retailPrice) * 100).toFixed(1)
      : null;

  return (
    <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-[#0E1422] rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-gray-200 dark:border-[#1E293B] text-gray-900 dark:text-slate-100 my-8">
        {/* Cabecera */}
        <div className="flex items-start justify-between pb-4 border-b border-gray-100 dark:border-[#1E293B]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-[#FF5C1B]/15 border border-orange-200 dark:border-[#FF5C1B]/30 flex items-center justify-center text-[#FF5C1B]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-gray-900 dark:text-white">
                Configuración de Repuesto Mayorista
              </h3>
              <p className="text-xs text-gray-500 dark:text-slate-400">
                Parámetros exclusivos para la venta, facturación y catálogo al mayor
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 dark:text-slate-400 hover:text-gray-600 dark:hover:text-white rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-[#161F33] cursor-pointer transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Ficha del Producto */}
        <div className="mt-4 p-3.5 bg-gray-50 dark:bg-[#161F33] rounded-xl border border-gray-200/80 dark:border-[#28354D] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-12 h-12 rounded-lg object-contain bg-white dark:bg-[#0E1422] border border-gray-200 dark:border-[#28354D] p-1 shrink-0"
              />
            ) : (
              <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-[#FF5C1B]/20 text-[#FF5C1B] font-bold flex items-center justify-center text-xs shrink-0">
                {product.supplier?.substring(0, 3).toUpperCase() || 'REP'}
              </div>
            )}
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-gray-200 dark:bg-[#0B0F17] text-gray-800 dark:text-orange-400 border border-transparent dark:border-[#28354D]">
                  {product.sku}
                </span>
                {product.supplierLogo ? (
                  <div
                    title={product.supplier}
                    className="w-16 h-6 rounded bg-white border border-gray-200 dark:border-[#28354D] p-0.5 flex items-center justify-center shadow-2xs shrink-0 cursor-default"
                  >
                    <img
                      src={product.supplierLogo}
                      alt={product.supplier}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = 'none';
                        const fallback = (e.currentTarget.nextElementSibling as HTMLElement);
                        if (fallback) fallback.style.display = 'inline-block';
                      }}
                    />
                    <span className="hidden text-[10px] font-bold text-gray-700">{product.supplier}</span>
                  </div>
                ) : (
                  <span
                    title={product.supplier}
                    className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded border ${
                      product.supplierColor || 'border-gray-300 dark:border-[#28354D] text-gray-700 dark:text-slate-300 bg-gray-100 dark:bg-[#0B0F17]'
                    }`}
                  >
                    <span>{product.supplier}</span>
                  </span>
                )}
              </div>
              <h4 className="font-bold text-xs text-gray-900 dark:text-white truncate mt-1">
                {product.name}
              </h4>
              <p className="text-[11px] text-gray-500 dark:text-slate-400 truncate">
                Sistema: <span className="font-medium text-gray-700 dark:text-slate-300">{getProductSystem(product)}</span>
                {product.location && !product.location.toLowerCase().includes('almacén principal') && (
                  <>
                    {' • '}Ubicación:{' '}
                    <span className="font-medium text-gray-700 dark:text-slate-300">{product.location}</span>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Referencia Detal del Cotizador */}
        <div className="mt-3.5 p-3 bg-blue-50/60 dark:bg-[#161F33] rounded-xl border border-blue-100 dark:border-[#28354D]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 flex items-center gap-1.5">
              <Store className="w-3.5 h-3.5" />
              Referencia Actual en Cotizador Sotomayor (Detal)
            </span>
            <span className="text-[10px] font-medium text-blue-600 dark:text-blue-300 bg-blue-100 dark:bg-blue-950 px-2 py-0.5 rounded border border-transparent dark:border-blue-800">
              Base de Datos Supabase
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-white/80 dark:bg-[#0E1422] p-2 rounded-lg border border-blue-100 dark:border-[#28354D]">
              <div className="text-[10px] text-gray-500 dark:text-slate-400 font-medium">Stock Detal</div>
              <div className="text-xs font-bold text-gray-800 dark:text-white">{product.retailStock ?? 0} uds</div>
            </div>
            <div className="bg-white/80 dark:bg-[#0E1422] p-2 rounded-lg border border-blue-100 dark:border-[#28354D]">
              <div className="text-[10px] text-gray-500 dark:text-slate-400 font-medium">Costo Detal</div>
              <div className="text-xs font-bold text-gray-800 dark:text-slate-200 font-mono">
                ${(product.retailCost ?? 0).toFixed(2)}
              </div>
            </div>
            <div className="bg-white/80 dark:bg-[#0E1422] p-2 rounded-lg border border-blue-100 dark:border-[#28354D]">
              <div className="text-[10px] text-gray-500 dark:text-slate-400 font-medium">Precio Detal (PVP)</div>
              <div className="text-xs font-bold text-blue-800 dark:text-blue-400 font-mono">
                ${(product.retailPrice ?? 0).toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* Switch Principal: Habilitar en Mayorista */}
        <div
          className={`mt-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${
            isWholesale
              ? 'border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/20'
              : 'border-gray-200 dark:border-[#28354D] bg-white dark:bg-[#161F33]'
          }`}
          onClick={() => setIsWholesale(!isWholesale)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsWholesale(!isWholesale);
                }}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  isWholesale ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                    isWholesale ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
              <div>
                <span
                  className={`text-xs font-bold ${
                    isWholesale ? 'text-emerald-700 dark:text-emerald-400' : 'text-gray-700 dark:text-slate-300'
                  }`}
                >
                  {isWholesale ? 'DISPONIBLE EN CANAL MAYORISTA' : 'NO DISPONIBLE EN MAYORISTA'}
                </span>
                <p className="text-[11px] text-gray-500 dark:text-slate-400">
                  {isWholesale
                    ? 'Este repuesto está activo para pedidos al mayor, cotizaciones y facturas mayoristas.'
                    : 'Repuesto exclusivo para el Cotizador detal. Oculto para clientes y vendedores mayoristas.'}
                </p>
              </div>
            </div>
            <span
              className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                isWholesale
                  ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800'
                  : 'bg-gray-100 dark:bg-[#0B0F17] text-gray-500 dark:text-slate-400 border border-gray-200 dark:border-[#28354D]'
              }`}
            >
              {isWholesale ? 'Habilitado' : 'Deshabilitado'}
            </span>
          </div>
        </div>

        {/* Inputs de Valores Mayoristas */}
        <div className="mt-4 grid grid-cols-2 gap-3.5 text-xs">
          {/* Stock Mayorista */}
          <div>
            <label className="block font-bold text-gray-700 dark:text-slate-300 mb-1">
              Stock Mayorista (Unidades)
            </label>
            <input
              type="number"
              min="0"
              value={wholesaleStock}
              onChange={(e) => setWholesaleStock(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full bg-white dark:bg-[#161F33] border border-gray-300 dark:border-[#28354D] rounded-lg px-3 py-2 font-mono font-bold text-gray-900 dark:text-white focus:outline-none focus:border-[#FF5C1B]"
            />
            <p className="text-[10px] text-gray-400 dark:text-slate-500 mt-1">
              Stock físico destinado exclusivamente a ventas al mayor.
            </p>
          </div>

          {/* Stock Mínimo Alerta */}
          <div>
            <label className="block font-bold text-gray-700 dark:text-slate-300 mb-1">
              Stock Mínimo (Alerta de Reorden)
            </label>
            <input
              type="number"
              min="0"
              value={minStock}
              onChange={(e) => setMinStock(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full bg-white dark:bg-[#161F33] border border-gray-300 dark:border-[#28354D] rounded-lg px-3 py-2 font-mono text-gray-900 dark:text-white focus:outline-none focus:border-[#FF5C1B]"
            />
            <p className="text-[10px] text-gray-400 dark:text-slate-500 mt-1">
              Umbral para notificar stock crítico al mayor.
            </p>
          </div>

          {/* Costo Real Mayorista */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold text-gray-700 dark:text-slate-300">Costo Real Mayorista ($ USD)</label>
              <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-gray-100 dark:bg-[#0B0F17] text-gray-800 dark:text-slate-300 border border-transparent dark:border-[#28354D]">
                ${wholesaleCost.toFixed(2)} USD
              </span>
            </div>
            <input
              type="number"
              step="0.01"
              min="0"
              value={wholesaleCost}
              onChange={(e) => setWholesaleCost(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full bg-white dark:bg-[#161F33] border border-gray-300 dark:border-[#28354D] rounded-lg px-3 py-2 font-mono font-bold text-gray-900 dark:text-white focus:outline-none focus:border-[#FF5C1B]"
            />
            <p className="text-[10px] text-gray-400 dark:text-slate-500 mt-1">
              Costo real de compra o importación para venta al mayor.
            </p>
          </div>

          {/* Precio Mayorista */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold text-gray-700 dark:text-slate-300">Precio Mayorista ($ USD)</label>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  parseFloat(marginPercent) >= 15
                    ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800'
                    : 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-400 border border-amber-300 dark:border-amber-800'
                }`}
              >
                Margen {marginPercent}%
              </span>
            </div>
            <input
              type="number"
              step="0.01"
              min="0"
              value={wholesalePrice}
              onChange={(e) => setWholesalePrice(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full bg-white dark:bg-[#161F33] border border-gray-300 dark:border-emerald-700/60 rounded-lg px-3 py-2 font-mono font-bold text-emerald-600 dark:text-emerald-400 focus:outline-none focus:border-emerald-600"
            />
            <p className="text-[10px] text-gray-400 dark:text-slate-500 mt-1">
              Equivalente BCV:{' '}
              <span className="font-mono font-bold text-gray-700 dark:text-slate-300">Bs. {priceBs}</span>
            </p>
          </div>
        </div>

        {/* Resumen de Margen y Ahorro */}
        <div className="mt-4 p-3 bg-gray-50 dark:bg-[#161F33] rounded-xl border border-gray-200 dark:border-[#28354D] text-xs flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-gray-500 dark:text-slate-400 font-medium">Ganancia Unitaria:</span>{' '}
            <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">+${profit.toFixed(2)} USD</span>
          </div>
          {retailSavingsPercent && (
            <div className="text-blue-700 dark:text-blue-400 font-medium">
              Ahorro vs Detal:{' '}
              <span className="font-bold font-mono">
                -${retailSavings.toFixed(2)} USD ({retailSavingsPercent}%)
              </span>
            </div>
          )}
        </div>

        {/* Botones de Acción */}
        <div className="flex items-center justify-end gap-2.5 mt-6 pt-4 border-t border-gray-100 dark:border-[#1E293B]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-gray-200 dark:border-[#28354D] text-gray-700 dark:text-slate-300 bg-white dark:bg-[#161F33] hover:bg-gray-50 dark:hover:bg-[#1E293B] font-bold cursor-pointer transition text-xs"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => {
              onSave(product.id, {
                isWholesale,
                wholesaleStock,
                wholesaleCost,
                wholesalePrice,
                minStock,
              });
            }}
            className="px-5 py-2 rounded-xl bg-[#FF5C1B] hover:bg-[#ff4600] text-white font-bold cursor-pointer transition text-xs shadow-md shadow-orange-500/20 flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Guardar Configuración Mayorista</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// MODAL: SCRIPT SQL DE MIGRACIÓN SUPABASE
// ==========================================
interface SqlMigrationModalProps {
  onClose: () => void;
  sqlCopied: boolean;
  onCopy: () => void;
}

const SqlMigrationModal: React.FC<SqlMigrationModalProps> = ({
  onClose,
  sqlCopied,
  onCopy,
}) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-[#0E1422] rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-gray-200 dark:border-[#1E293B] my-8 transition-colors">
        <div className="flex items-start justify-between pb-4 border-b border-gray-100 dark:border-[#1E293B]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-gray-900 dark:text-white">
                Script SQL de Migración para Supabase
              </h3>
              <p className="text-xs text-gray-500 dark:text-slate-400">
                Habilita los campos mayoristas en la tabla `products` de forma permanente
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-[#161F33] cursor-pointer transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 p-3.5 bg-emerald-50/70 dark:bg-emerald-950/40 rounded-xl border border-emerald-200/80 dark:border-emerald-800/60 text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
          <p className="font-bold flex items-center gap-1.5 mb-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            100% Compatible y Seguro para el Cotizador Detal
          </p>
          <p className="text-emerald-800 dark:text-emerald-300/90">
            Este script utiliza cláusulas <code>IF NOT EXISTS</code>. Agrega las columnas{' '}
            <code>is_wholesale</code>, <code>wholesale_stock</code>, <code>wholesale_cost</code>,{' '}
            <code>wholesale_price</code> y <code>wholesale_min_stock</code> sin alterar en absoluto ninguna cotización,
            repuesto, marca ni configuración previa de tu Cotizador.
          </p>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
              Código SQL (Ejecutar en Supabase SQL Editor)
            </span>
            <button
              onClick={onCopy}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                sqlCopied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-900 dark:bg-[#FF5C1B] hover:bg-black dark:hover:bg-[#ff4600] text-white shadow-xs'
              }`}
            >
              {sqlCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{sqlCopied ? '¡Copiado al Portapapeles!' : 'Copiar Script SQL'}</span>
            </button>
          </div>
          <pre className="p-4 bg-gray-900 dark:bg-[#090D14] text-gray-100 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed border border-gray-800 dark:border-[#1E293B] max-h-60 select-all">
            {WHOLESALE_SQL_MIGRATION}
          </pre>
        </div>

        <div className="mt-5 p-3.5 bg-gray-50 dark:bg-[#161F33]/60 rounded-xl border border-gray-200 dark:border-[#1E293B] text-xs text-gray-600 dark:text-slate-300 space-y-1">
          <p className="font-bold text-gray-800 dark:text-white">Pasos para ejecutarlo:</p>
          <ol className="list-decimal list-inside space-y-1 pl-1 text-gray-600 dark:text-slate-300">
            <li>Haz clic en el botón de abajo para abrir el Editor SQL de Supabase.</li>
            <li>Pega el código copiado en una nueva consulta (New query).</li>
            <li>
              Haz clic en <b>Run</b> (o presiona Ctrl + Enter).
            </li>
            <li>¡Listo! Tu base de datos quedará sincronizada para persistencia permanente en la nube.</li>
          </ol>
        </div>

        <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-gray-100 dark:border-[#1E293B]">
          <a
            href="https://supabase.com/dashboard/project/adxgyekseydqrgsuzhqw/sql"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-[#161F33] hover:bg-gray-200 dark:hover:bg-[#1e2a45] text-gray-800 dark:text-slate-200 font-bold text-xs flex items-center gap-2 transition cursor-pointer border border-transparent dark:border-[#1E293B]"
          >
            <span>Ir a Supabase SQL Editor</span>
            <ExternalLink className="w-3.5 h-3.5 text-gray-500 dark:text-slate-400" />
          </a>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gray-900 dark:bg-[#161F33] hover:bg-black dark:hover:bg-[#1e2a45] text-white font-bold cursor-pointer transition text-xs border border-transparent dark:border-[#1E293B]"
          >
            Entendido / Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};


function getStoredItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.warn(`Error reading localStorage key "${key}":`, e);
    return defaultValue;
  }
}

// ==========================================
// PURGA AUTOMÁTICA DE DEMO PARA PRODUCCIÓN
// ==========================================
(function purgeDemoLocalStorageForProduction() {
  try {
    const PROD_KEY = 'sotomayor_production_clean_v1';
    if (typeof window !== 'undefined' && !localStorage.getItem(PROD_KEY)) {
      const keysToPurge = [
        'sotomayor_wholesale_sellers',
        'sotomayor_sellers',
        'sotomayor_wholesale_clients',
        'sotomayor_clients',
        'sotomayor_wholesale_invoices',
        'sotomayor_invoices',
        'sotomayor_wholesale_receipts',
        'sotomayor_receipts',
        'sotomayor_wholesale_stock_history',
        'sotomayor_stock_history',
        'sotomayor_wholesale_products',
        'sotomayor_products'
      ];
      keysToPurge.forEach(k => localStorage.removeItem(k));
      localStorage.setItem(PROD_KEY, 'true');
    }
  } catch (e) {
    console.warn('Production clean migration notice:', e);
  }
})();

// Lector seguro con migración retroactiva automática para claves Wholesale
function getStoredWholesaleItem<T>(wholesaleKey: string, legacyKey: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(wholesaleKey);
    if (item) return JSON.parse(item);
    const legacyItem = localStorage.getItem(legacyKey);
    if (legacyItem) {
      try {
        const parsed = JSON.parse(legacyItem);
        localStorage.setItem(wholesaleKey, legacyItem);
        return parsed;
      } catch {
        return defaultValue;
      }
    }
    return defaultValue;
  } catch (e) {
    console.warn(`Error reading localStorage key "${wholesaleKey}":`, e);
    return defaultValue;
  }
}

// ==========================================
// TIPOS Y DEFINICIÓN DE LOS 6 TEMAS SOTOMAYOR
// ==========================================
export type ThemeId =
  | 'deep-cobalt'
  | 'emerald-stealth'
  | 'midnight-amber'
  | 'warm-stone'
  | 'nordic-ice'
  | 'pure-alabaster'
  | 'classic-obsidian';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  tagline: string;
  badge: string;
  isDark: boolean;
  emoji: string;
  colors: {
    canvas: string;
    surface: string;
    header: string;
    primary: string;
    accent: string;
    border: string;
    text: string;
  };
  features: string[];
}

export const SYSTEM_THEMES: ThemeConfig[] = [
  {
    id: 'deep-cobalt',
    name: 'Deep Cobalt & Tech Cyan',
    tagline: 'Distribución Tech & Matrix Azul Cibernético',
    badge: 'Cobalt Suite',
    isDark: true,
    emoji: '🌌',
    colors: {
      canvas: '#070B14',
      surface: '#0B1120',
      header: '#0F1B30',
      primary: '#06B6D4',
      accent: '#2563EB',
      border: '#1E3A8A',
      text: '#E2E8F0',
    },
    features: ['Rejilla telemétrica sutil', 'Resplandores cian neón', 'Fondo azul espacio profundo']
  },
  {
    id: 'emerald-stealth',
    name: 'Stealth Obsidian & Emerald Luxe',
    tagline: 'Negro Mate Terminal & Verde Esmeralda de Precisión',
    badge: 'Emerald Edition',
    isDark: true,
    emoji: '🍃',
    colors: {
      canvas: '#090A0D',
      surface: '#0D0F14',
      header: '#12151B',
      primary: '#10B981',
      accent: '#F59E0B',
      border: '#1E232E',
      text: '#F9FAFB',
    },
    features: ['Obsidiana mate táctica', 'Acentos verde esmeralda y oro', 'Contraste limpio para auditoría']
  },
  {
    id: 'midnight-amber',
    name: 'Industrial Charcoal & Midnight Amber',
    tagline: 'Grafito Titanio & Ámbar Industrial de Alto Contraste',
    badge: 'Amber Pro',
    isDark: true,
    emoji: '⚡',
    colors: {
      canvas: '#111317',
      surface: '#15181E',
      header: '#1A1E25',
      primary: '#F59E0B',
      accent: '#10B981',
      border: '#2A2F3A',
      text: '#F3F4F6',
    },
    features: ['Textura industrial micro-dot', 'Ámbar mecánico automotriz', 'Superficies grafito pulido']
  },
  {
    id: 'warm-stone',
    name: 'Industrial Warm Stone & Amber Gold',
    tagline: 'Piedra Cálida Taller & Acentos Ámbar Dorado',
    badge: 'Warm Stone',
    isDark: false,
    emoji: '🏛️',
    colors: {
      canvas: '#FAF4EE',
      surface: '#FFFFFF',
      header: '#FAF9F7',
      primary: '#D97706',
      accent: '#15803D',
      border: '#E5E0D8',
      text: '#1C1917',
    },
    features: ['Tonalidades de piedra y arcilla cálida', 'Baja fatiga visual para horas de oficina', 'Elegancia de catálogo editorial']
  },
  {
    id: 'nordic-ice',
    name: 'Corporate Nordic Ice & Deep Cobalt',
    tagline: 'Hielo Ártico Corporativo & Azul Cobalto Automotriz',
    badge: 'Nordic Edition',
    isDark: false,
    emoji: '❄️',
    colors: {
      canvas: '#E8F0F8',
      surface: '#FFFFFF',
      header: '#EDF4F9',
      primary: '#2563EB',
      accent: '#EA580C',
      border: '#CBD5E1',
      text: '#0F172A',
    },
    features: ['Blanco hielo ártico corporativo', 'Cobalto azul nítido para facturación', 'Contraste óptimo para impresión']
  },
  {
    id: 'pure-alabaster',
    name: 'Pure Clean Alabaster & Tangerine',
    tagline: 'Porcelana Lino Salvia & Mandarina Sotomayor',
    badge: 'Alabaster Sage',
    isDark: false,
    emoji: '🍊',
    colors: {
      canvas: '#EBF2EC',
      surface: '#F9FCF9',
      header: '#EEF4EE',
      primary: '#F97316',
      accent: '#10B981',
      border: '#D5E4D8',
      text: '#19251E',
    },
    features: ['Fondo lino salvia ultra descansado', 'Mandarina oficial Sotomayor', 'Bordes sutiles orgánicos']
  },
  {
    id: 'classic-obsidian',
    name: 'Sotomayor Obsidian Clásico',
    tagline: 'Negro Obsidiana & Naranja Oficial Sotomayor',
    badge: 'Master Sotomayor',
    isDark: true,
    emoji: '🔥',
    colors: {
      canvas: '#0B0F17',
      surface: '#0E1422',
      header: '#12192B',
      primary: '#FF5C1B',
      accent: '#10B981',
      border: '#1E293B',
      text: '#F1F5F9',
    },
    features: ['Esquema original insignia', 'Naranja vibrante Sotomayor', 'Bordes azul noche oscuros']
  }
];

function ThemeSelectorModal({
  isOpen,
  onClose,
  currentThemeId,
  onSelectTheme
}: {
  isOpen: boolean;
  onClose: () => void;
  currentThemeId: ThemeId;
  onSelectTheme: (id: ThemeId) => void;
}) {
  const [filter, setFilter] = useState<'all' | 'dark' | 'light'>('all');

  if (!isOpen) return null;

  const filteredThemes = SYSTEM_THEMES.filter(t => {
    if (filter === 'dark') return t.isDark;
    if (filter === 'light') return !t.isDark;
    return true;
  });

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#0E1422] rounded-3xl max-w-4xl w-full p-6 shadow-2xl border border-gray-200 dark:border-[#1E293B] text-xs flex flex-col max-h-[92vh] overflow-hidden">
        {/* Encabezado del Modal */}
        <div className="flex items-start justify-between pb-4 border-b border-gray-100 dark:border-[#1E293B] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-100 dark:bg-[#161F33] border border-orange-200 dark:border-[#28354D] flex items-center justify-center text-[#FF5C1B]">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-gray-900 dark:text-white flex items-center gap-2">
                Temas y Apariencia del Sistema
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-orange-100 dark:bg-[#161F33] text-[#FF5C1B] border border-orange-200 dark:border-[#28354D]">
                  6 Estilos
                </span>
              </h2>
              <p className="text-gray-500 dark:text-slate-400 text-xs mt-0.5">
                Selecciona entre los 6 esquemas visuales diseñados para Repuestos Sotomayor (3 oscuros y 3 claros).
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-[#161F33] cursor-pointer transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filtros de Tipo de Tema */}
        <div className="flex items-center justify-between py-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                filter === 'all'
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-2xs'
                  : 'bg-gray-100 dark:bg-[#161F33] text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-[#1E293B]'
              }`}
            >
              Todos los Temas ({SYSTEM_THEMES.length})
            </button>
            <button
              onClick={() => setFilter('dark')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                filter === 'dark'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-gray-100 dark:bg-[#161F33] text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-[#1E293B]'
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-amber-400" />
              <span>Modo Oscuro (4)</span>
            </button>
            <button
              onClick={() => setFilter('light')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                filter === 'light'
                  ? 'bg-amber-500 text-white shadow-2xs'
                  : 'bg-gray-100 dark:bg-[#161F33] text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-[#1E293B]'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>Modo Claro (3)</span>
            </button>
          </div>
          <span className="text-[11px] text-gray-400 dark:text-slate-500 hidden sm:inline">
            Clic en cualquier tarjeta para activar de inmediato
          </span>
        </div>

        {/* Rejilla de Tarjetas de Temas */}
        <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 py-1">
          {filteredThemes.map((t) => {
            const isActive = t.id === currentThemeId;
            return (
              <div
                key={t.id}
                onClick={() => onSelectTheme(t.id)}
                className={`rounded-2xl p-4 border transition-all cursor-pointer flex flex-col justify-between group relative ${
                  isActive
                    ? 'border-2 ring-2 ring-offset-2 dark:ring-offset-[#0B0F17] shadow-lg scale-[1.01]'
                    : 'border-gray-200 dark:border-[#1E293B] hover:border-gray-400 dark:hover:border-[#28354D] hover:shadow-md'
                }`}
                style={{
                  backgroundColor: t.isDark ? '#0D111A' : '#FAF8F5',
                  borderColor: isActive ? t.colors.primary : undefined,
                  boxShadow: isActive ? `0 0 20px -3px ${t.colors.primary}40` : undefined,
                }}
              >
                {/* Cabecera de la Tarjeta */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{t.emoji}</span>
                    <div className="flex items-center gap-1.5">
                      <span
                        className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md"
                        style={{
                          backgroundColor: `${t.colors.primary}20`,
                          color: t.colors.primary,
                          border: `1px solid ${t.colors.primary}40`
                        }}
                      >
                        {t.badge}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 text-gray-600 dark:text-slate-300 font-medium">
                        {t.isDark ? '🌙 Oscuro' : '☀️ Claro'}
                      </span>
                    </div>
                  </div>

                  <h3
                    className="font-bold text-sm tracking-tight mb-0.5"
                    style={{ color: t.isDark ? '#FFFFFF' : '#1C1917' }}
                  >
                    {t.name}
                  </h3>
                  <p
                    className="text-[11px] leading-tight mb-3 line-clamp-2"
                    style={{ color: t.isDark ? '#94A3B8' : '#64748B' }}
                  >
                    {t.tagline}
                  </p>

                  {/* Muestra visual de paleta de colores */}
                  <div
                    className="p-2 rounded-xl border mb-3 flex items-center justify-between"
                    style={{
                      backgroundColor: t.colors.canvas,
                      borderColor: t.colors.border
                    }}
                  >
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full border border-white/20 shadow-xs" style={{ backgroundColor: t.colors.canvas }} title="Fondo Canvas" />
                      <div className="w-5 h-5 rounded-full border border-white/20 shadow-xs" style={{ backgroundColor: t.colors.surface }} title="Superficie Tarjetas" />
                      <div className="w-5 h-5 rounded-full border border-white/20 shadow-xs" style={{ backgroundColor: t.colors.header }} title="Encabezado" />
                      <div className="w-5 h-5 rounded-full border border-white/20 shadow-xs" style={{ backgroundColor: t.colors.primary }} title="Color Primario" />
                      <div className="w-5 h-5 rounded-full border border-white/20 shadow-xs" style={{ backgroundColor: t.colors.accent }} title="Acento" />
                    </div>
                    <span className="text-[10px] font-mono font-bold" style={{ color: t.colors.primary }}>
                      {t.colors.primary}
                    </span>
                  </div>

                  {/* Características */}
                  <ul className="space-y-1 mb-3 text-[10px]" style={{ color: t.isDark ? '#8B9BB4' : '#57534E' }}>
                    {t.features.map((f, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: t.colors.primary }} />
                        <span className="truncate">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Botón de Selección */}
                <div className="pt-2 border-t border-black/5 dark:border-white/5">
                  {isActive ? (
                    <div
                      className="w-full py-1.5 rounded-xl font-bold text-center text-xs flex items-center justify-center gap-1.5 text-white"
                      style={{ backgroundColor: t.colors.primary }}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Tema Activo</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectTheme(t.id);
                      }}
                      className="w-full py-1.5 rounded-xl font-bold text-center text-xs transition border cursor-pointer hover:opacity-90"
                      style={{
                        backgroundColor: `${t.colors.primary}15`,
                        color: t.colors.primary,
                        borderColor: `${t.colors.primary}40`
                      }}
                    >
                      Activar este Tema
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pie del Modal */}
        <div className="pt-3 border-t border-gray-100 dark:border-[#1E293B] flex items-center justify-between shrink-0">
          <p className="text-[11px] text-gray-500 dark:text-slate-400">
            💾 Tu elección se guarda automáticamente en el navegador y persiste cada vez que abras el sistema.
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gray-900 hover:bg-black dark:bg-[#161F33] dark:hover:bg-[#1E293B] text-white font-bold cursor-pointer transition text-xs"
          >
            Listo
          </button>
        </div>
      </div>
    </div>
  );
}

// Pasos del Recorrido Guiado Interactivo en Vivo (Tour)
const TOUR_STEPS = [
  {
    title: '¡Bienvenido a Repuestos Sotomayor!',
    subtitle: 'Plataforma Mayorista Integral',
    description: 'Este recorrido guiado interactivo te mostrará paso a paso cada sección del sistema: Inventario, Facturación, Ingreso de Mercancía, Cobranzas (CxC), Comisiones y Clientes.',
    targetModule: null as null | 'inventory' | 'invoicing' | 'receiving' | 'cxc' | 'commissions' | 'analytics' | 'clients',
    badge: 'Inicio del Tour',
  },
  {
    title: 'Conmutador de Tasas y Multimoneda',
    subtitle: 'BCV Oficial, P2P Binance y Tasa Manual',
    description: 'En el encabezado superior puedes alternar entre la tasa oficial del Banco Central de Venezuela (BCV), la tasa de mercado P2P Binance o ingresar una tasa manual. Todo el sistema recalcula automáticamente en $ USD y Bolívares.',
    targetModule: null as null | 'inventory' | 'invoicing' | 'receiving' | 'cxc' | 'commissions' | 'analytics' | 'clients',
    badge: 'Moneda Dual',
  },
  {
    title: 'Módulo 1: Inventario y Stock Físico',
    subtitle: 'Catálogo Mayorista y Auditoría',
    description: 'Aquí visualizas todo el catálogo de repuestos con marcas reconocidas (Federal-Mogul, Cloyes, Sabó, etc.), alertas automáticas de stock mínimo, costos de adquisición y precios mayoristas.',
    targetModule: 'inventory' as const,
    badge: 'Stock Mayorista',
  },
  {
    title: 'Módulo 2: Constructor de Facturas y Cotizaciones',
    subtitle: 'Facturas, Notas de Entrega y Cotizaciones',
    description: 'Genera pedidos con cliente y vendedor asignados. Puedes emitir Facturas formales, Notas de Entrega o Cotizaciones, imprimir el comprobante oficial y enviar el estado de cuenta por WhatsApp con un solo clic.',
    targetModule: 'invoicing' as const,
    badge: 'Ventas y Emisión',
  },
  {
    title: 'Módulo 3: Ingreso de Mercancía y Lotes',
    subtitle: 'Recepción de Contenedores y Compras',
    description: 'Registra la llegada de compras nacionales o importadas. Asocia el proveedor y el packing list, actualiza los costos reales de adquisición y alimenta automáticamente las existencias del inventario.',
    targetModule: 'receiving' as const,
    badge: 'Compras y Almacén',
  },
  {
    title: 'Módulo 4: Cuentas por Cobrar (CxC) y Abonos',
    subtitle: 'Recuperación de Cartera de Clientes',
    description: 'Supervisa facturas a crédito pendientes y vencidas. Registra abonos parciales en Efectivo, Pago Móvil o Zelle, y envía notificaciones formales de cobro por WhatsApp con el saldo exacto en $ y Bs.',
    targetModule: 'cxc' as const,
    badge: 'Cobranza y Abonos',
  },
  {
    title: 'Módulo 5: Liquidación de Comisiones',
    subtitle: 'Control por Asesor y Ventas Concretadas',
    description: 'Calcula las comisiones de los vendedores basadas en cobranza efectiva. Consulta las ventas concretadas por cada vendedor, desglose de facturas y cortes para pago en dólares o bolívares.',
    targetModule: 'commissions' as const,
    badge: 'Fuerza de Ventas',
  },
  {
    title: 'Módulo 6: Directorio de Clientes Mayoristas',
    subtitle: 'Expediente Comercial y Blindaje Contable',
    description: 'Gestiona aliados comerciales, sus límites y días de crédito. Consulta su historial completo de facturas emitidas y aprovecha la protección que impide borrar clientes con deuda activa.',
    targetModule: 'clients' as const,
    badge: 'Aliados Comerciales',
  },
  {
    title: 'Módulo 7: Analítica, Tendencias y Temas',
    subtitle: 'Control Financiero y Personalización',
    description: 'Evalúa la rentabilidad bruta de tu negocio, productos de alta rotación y volumen histórico. También puedes personalizar la apariencia del sistema con 6 temas visuales exclusivos.',
    targetModule: 'analytics' as const,
    badge: 'Analítica Ejecutiva',
  },
];

export default function App() {
  // Navegación principal (incluye CxC, Comisiones, Analítica y Clientes)
  const [activeModule, setActiveModule] = useState<'inventory' | 'invoicing' | 'receiving' | 'cxc' | 'commissions' | 'analytics' | 'clients'>('inventory');
  const [sidebarHovered, setSidebarHovered] = useState(false);

  // Estados del Módulo de Analítica y Estadísticas
  const [analyticsTimeRange, setAnalyticsTimeRange] = useState<'today' | '7days' | 'month' | 'all'>('all');
  const [analyticsCurrency, setAnalyticsCurrency] = useState<'USD' | 'VED'>('USD');
  const [hoveredTrendIdx, setHoveredTrendIdx] = useState<number | null>(null);

  // Sistema Multitema Sotomayor (6 temas + 1 clásico)
  const [currentThemeId, setCurrentThemeId] = useState<ThemeId>(() => {
    try {
      const saved = localStorage.getItem('sotomayor_theme_id') as ThemeId;
      if (saved && SYSTEM_THEMES.some(t => t.id === saved)) {
        return saved;
      }
      const isDarkPref = localStorage.getItem('sotomayor_theme') !== 'light';
      return isDarkPref ? 'deep-cobalt' : 'nordic-ice';
    } catch {
      return 'deep-cobalt';
    }
  });

  const [themeModalOpen, setThemeModalOpen] = useState(false);

  const activeTheme = useMemo(() => {
    return SYSTEM_THEMES.find(t => t.id === currentThemeId) || SYSTEM_THEMES[0];
  }, [currentThemeId]);

  const isDarkMode = activeTheme.isDark;

  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', activeTheme.id);
      if (activeTheme.isDark) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
        localStorage.setItem('sotomayor_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        localStorage.setItem('sotomayor_theme', 'light');
      }
      localStorage.setItem('sotomayor_theme_id', activeTheme.id);
    } catch (e) {
      console.warn('Error syncing theme:', e);
    }
  }, [activeTheme]);

    // ============================================================
  // CONMUTADOR INTELIGENTE DE TASA CAMBIARIA (BINANCE P2P / BCV / MANUAL)
  // ============================================================
  const [rateMode, setRateMode] = useState<'binance' | 'bcv' | 'manual'>(() =>
    getStoredItem<'binance' | 'bcv' | 'manual'>('sotomayor_rate_mode', 'binance')
  );
  const [bcvOfficialRate, setBcvOfficialRate] = useState<number>(() =>
    getStoredItem('sotomayor_bcv_official_rate', 886.22)
  );
  const [binanceRate, setBinanceRate] = useState<number>(() =>
    getStoredItem('sotomayor_binance_rate', 1006.80)
  );
  const [binanceBidRate, setBinanceBidRate] = useState<number>(() =>
    getStoredItem('sotomayor_binance_bid_rate', 1007.00)
  );
  const [manualRate, setManualRate] = useState<number>(() =>
    getStoredItem('sotomayor_manual_rate', 1000.00)
  );
  const [manualInputVal, setManualInputVal] = useState<string>(() =>
    String(getStoredItem('sotomayor_manual_rate', 1000.00))
  );
  const [rateDropdownOpen, setRateDropdownOpen] = useState(false);
  const [rateLoading, setRateLoading] = useState(false);
  const [bcvLastUpdated, setBcvLastUpdated] = useState<string | null>(() =>
    getStoredItem('sotomayor_bcv_last_updated', 'Oficial DolarApi')
  );
  const [binanceLastUpdated, setBinanceLastUpdated] = useState<string | null>(() =>
    getStoredItem('sotomayor_binance_last_updated', 'P2P Binance')
  );

  // Tasa Activa Aplicada en todo el sistema (mantiene compatibilidad con bcvRate)
  const [bcvRate, setBcvRate] = useState<number>(() => {
    const savedMode = getStoredItem<'binance' | 'bcv' | 'manual'>('sotomayor_rate_mode', 'binance');
    if (savedMode === 'binance') return getStoredItem('sotomayor_binance_rate', 1006.80);
    if (savedMode === 'manual') return getStoredItem('sotomayor_manual_rate', 1000.00);
    return getStoredItem('sotomayor_bcv_official_rate', 886.22);
  });

  const activeRateLabel =
    rateMode === 'binance'
      ? 'Tasa Binance P2P USDT'
      : rateMode === 'bcv'
      ? 'Tasa Oficial BCV'
      : 'Tasa Manual';


  // Estados de Datos con persistencia en localStorage bajo convención Wholesale
  const [products, setProducts] = useState<WholesaleProduct[]>(() =>
    getStoredWholesaleItem('sotomayor_wholesale_products', 'sotomayor_products', INITIAL_PRODUCTS)
  );
  const [sellers, setSellers] = useState<WholesaleSeller[]>(() =>
    getStoredWholesaleItem('sotomayor_wholesale_sellers', 'sotomayor_sellers', INITIAL_SELLERS)
  );
  const [clients, setClients] = useState<WholesaleClient[]>(() =>
    getStoredWholesaleItem('sotomayor_wholesale_clients', 'sotomayor_clients', INITIAL_CLIENTS)
  );
  const [invoices, setInvoices] = useState<WholesaleInvoice[]>(() =>
    getStoredWholesaleItem('sotomayor_wholesale_invoices', 'sotomayor_invoices', INITIAL_INVOICES)
  );
  const [receipts, setReceipts] = useState<WholesaleReceipt[]>(() =>
    getStoredWholesaleItem('sotomayor_wholesale_receipts', 'sotomayor_receipts', INITIAL_RECEIPTS)
  );
  const [stockHistory, setStockHistory] = useState<WholesaleStockHistoryItem[]>(() =>
    getStoredWholesaleItem('sotomayor_wholesale_stock_history', 'sotomayor_stock_history', INITIAL_STOCK_HISTORY)
  );

  // Estados de Facturas en Espera (Borradores)
  const [drafts, setDrafts] = useState<WholesaleInvoice[]>(() =>
    getStoredWholesaleItem('sotomayor_wholesale_drafts', 'sotomayor_drafts', [])
  );
  const [activeDraftId, setActiveDraftId] = useState<string | null>(null);
  const [draftsModalOpen, setDraftsModalOpen] = useState(false);

  // Estados de Creación de Repuesto desde Facturador
  const [newProductFromInvoiceModalOpen, setNewProductFromInvoiceModalOpen] = useState(false);
  const [newProductInvoiceForm, setNewProductInvoiceForm] = useState({
    sku: '',
    name: '',
    category: 'Tren Delantero',
    supplier: 'GENÉRICO',
    cost: '',
    price: '',
    wholesaleStock: '10',
    quantityToInvoice: '1',
  });

  // Guardar en localStorage bajo convención Wholesale
  useEffect(() => { localStorage.setItem('sotomayor_rate_mode', JSON.stringify(rateMode)); }, [rateMode]);
  useEffect(() => { localStorage.setItem('sotomayor_bcv_official_rate', JSON.stringify(bcvOfficialRate)); }, [bcvOfficialRate]);
  useEffect(() => { localStorage.setItem('sotomayor_binance_rate', JSON.stringify(binanceRate)); }, [binanceRate]);
  useEffect(() => { localStorage.setItem('sotomayor_manual_rate', JSON.stringify(manualRate)); }, [manualRate]);
  useEffect(() => { localStorage.setItem('sotomayor_bcv_rate', JSON.stringify(bcvRate)); }, [bcvRate]);
  useEffect(() => {
    try {
      localStorage.setItem('sotomayor_wholesale_products', JSON.stringify(products));
    } catch (e) {
      console.warn('LocalStorage quota exceeded for sotomayor_wholesale_products (5000+ items), relying on in-memory state');
    }
  }, [products]);
  useEffect(() => { localStorage.setItem('sotomayor_wholesale_sellers', JSON.stringify(sellers)); }, [sellers]);
  useEffect(() => { localStorage.setItem('sotomayor_wholesale_clients', JSON.stringify(clients)); }, [clients]);
  useEffect(() => { localStorage.setItem('sotomayor_wholesale_invoices', JSON.stringify(invoices)); }, [invoices]);
  useEffect(() => { localStorage.setItem('sotomayor_wholesale_drafts', JSON.stringify(drafts)); }, [drafts]);
  useEffect(() => { localStorage.setItem('sotomayor_wholesale_receipts', JSON.stringify(receipts)); }, [receipts]);
  useEffect(() => { localStorage.setItem('sotomayor_wholesale_stock_history', JSON.stringify(stockHistory)); }, [stockHistory]);

    // Conmutador de modo de tasa
  const handleSelectRateMode = (mode: 'binance' | 'bcv' | 'manual', customVal?: number) => {
    setRateMode(mode);
    setRateDropdownOpen(false);
    if (mode === 'binance') {
      setBcvRate(binanceRate);
      showToast(`Tasa activa cambiada a Binance P2P: Bs. ${binanceRate.toFixed(2)}`);
    } else if (mode === 'bcv') {
      setBcvRate(bcvOfficialRate);
      showToast(`Tasa activa cambiada a BCV Oficial: Bs. ${bcvOfficialRate.toFixed(2)}`);
    } else if (mode === 'manual') {
      const val = customVal !== undefined ? customVal : (parseFloat(manualInputVal) || manualRate);
      setManualRate(val);
      setBcvRate(val);
      showToast(`Tasa activa fijada a Manual: Bs. ${val.toFixed(2)}`);
    }
  };

  // Sincronización en vivo con APIs oficiales (BCV Oficial y Binance P2P USDT)
  const fetchAllRates = async (showNotification = true) => {
    try {
      setRateLoading(true);
      const [bcvPromise, binancePromise] = await Promise.allSettled([
        // 1. Tasa Oficial BCV
        fetch('https://ve.dolarapi.com/v1/dolares/oficial').then(r => {
          if (!r.ok) throw new Error('Error al conectar con API BCV');
          return r.json();
        }),
        // 2. Binance P2P USDT (CriptoYa con fallback a dolarapi paralelo)
        fetch('https://criptoya.com/api/usdt/ves')
          .then(async r => {
            if (!r.ok) throw new Error('Error en CriptoYa');
            return r.json();
          })
          .catch(async () => {
            const fallback = await fetch('https://ve.dolarapi.com/v1/dolares/paralelo');
            if (!fallback.ok) throw new Error('Error en fallback');
            const d = await fallback.json();
            return {
              binancep2p: {
                ask: d.promedio,
                bid: d.promedio,
                time: Math.floor(Date.now() / 1000)
              }
            };
          })
      ]);

      let newBcv = bcvOfficialRate;
      let newBinance = binanceRate;
      const nowStr = new Date().toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' });

      if (bcvPromise.status === 'fulfilled' && bcvPromise.value?.promedio) {
        newBcv = Number(bcvPromise.value.promedio.toFixed(2));
        setBcvOfficialRate(newBcv);
        setBcvLastUpdated(nowStr);
        localStorage.setItem('sotomayor_bcv_last_updated', JSON.stringify(nowStr));
      }

      if (binancePromise.status === 'fulfilled' && binancePromise.value?.binancep2p?.ask) {
        newBinance = Number(binancePromise.value.binancep2p.ask.toFixed(2));
        setBinanceRate(newBinance);
        if (binancePromise.value.binancep2p.bid) {
          setBinanceBidRate(Number(binancePromise.value.binancep2p.bid.toFixed(2)));
        }
        setBinanceLastUpdated(nowStr);
        localStorage.setItem('sotomayor_binance_last_updated', JSON.stringify(nowStr));
      }

      // Sincronizar la tasa activa según el modo actual
      if (rateMode === 'binance') {
        setBcvRate(newBinance);
        if (showNotification) {
          showToast(`Binance P2P actualizado: Bs. ${newBinance.toFixed(2)} (Compra USDT)`);
        }
      } else if (rateMode === 'bcv') {
        setBcvRate(newBcv);
        if (showNotification) {
          showToast(`BCV Oficial actualizado: Bs. ${newBcv.toFixed(2)}`);
        }
      } else {
        if (showNotification) {
          showToast(`Tasas sincronizadas (Modo Manual: Bs. ${bcvRate.toFixed(2)})`);
        }
      }
    } catch (err) {
      console.warn('Error fetching exchange rates:', err);
      if (showNotification) {
        showToast('No se pudieron actualizar las tasas en vivo. Puedes fijar la tasa manualmente.');
      }
    } finally {
      setRateLoading(false);
    }
  };

  // Cargar tasas al iniciar
  useEffect(() => {
    fetchAllRates(false);
  }, []);

  // Estados del Módulo de Cuentas por Cobrar (CxC)
  const [cxcFilterStatus, setCxcFilterStatus] = useState<'todos' | 'vencidos' | 'por_vencer' | 'saldados'>('todos');
  const [cxcSearch, setCxcSearch] = useState('');
  const [paymentModalInvoice, setPaymentModalInvoice] = useState<Invoice | null>(null);
  const [paymentHistoryInvoice, setPaymentHistoryInvoice] = useState<Invoice | null>(null);
  const [paymentAmountUsd, setPaymentAmountUsd] = useState<number | string>('');
  const [paymentMethod, setPaymentMethod] = useState<'Divisas Efectivo' | 'Zelle' | 'Pago Móvil BCV' | 'Transferencia Bancaria'>('Divisas Efectivo');
  const [paymentReference, setPaymentReference] = useState('');
  const [paymentNotes, setPaymentNotes] = useState('');

  // Filtros de la tabla de Inventario
  const [activeCategoryTab, setActiveCategoryTab] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedSupplier, setSelectedSupplier] = useState('Todos');
  const [selectedStockLevel, setSelectedStockLevel] = useState('Todos');
  const [openActionRowId, setOpenActionRowId] = useState<string | null>(null);

  // Estados de Conexión a Base de Datos Supabase (CotizadorSotomayor)
  const [isLoadingSupabase, setIsLoadingSupabase] = useState(false);
  const [supabaseConnected, setSupabaseConnected] = useState(false);
  const [supabaseSyncStatus, setSupabaseSyncStatus] = useState<'online' | 'syncing' | 'offline'>('online');
  const [supabaseTotalCount, setSupabaseTotalCount] = useState<number>(5396);
  const [catalogFilterMode, setCatalogFilterMode] = useState<'wholesale' | 'all'>('wholesale');
  const [showSqlMigrationModal, setShowSqlMigrationModal] = useState(false);
  const [editingWholesaleProduct, setEditingWholesaleProduct] = useState<Product | null>(null);
  const [sqlCopied, setSqlCopied] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 25;

  const handleCopySql = () => {
    navigator.clipboard.writeText(WHOLESALE_SQL_MIGRATION);
    setSqlCopied(true);
    showToast('Script SQL copiado al portapapeles');
    setTimeout(() => setSqlCopied(false), 2500);
  };

  // Carga de Repuestos desde Supabase (CotizadorSotomayor) con paginación completa para 5000+ items
  const loadProductsFromSupabase = async (notify = false) => {
    setIsLoadingSupabase(true);
    try {
      const pageSize = 1000;
      // Primer lote con conteo exacto
      const { data: firstBatch, count, error } = await supabase
        .from('products')
        .select('*,brands(id,name,logo_url),categories(id,name,section)', { count: 'exact' })
        .order('name', { ascending: true })
        .range(0, pageSize - 1);

      if (error) {
        console.warn('Supabase fetch error, fallback to cache:', error);
        setSupabaseConnected(false);
        setSupabaseSyncStatus('offline');
        if (notify) showToast('No se pudo conectar con Supabase. Usando catálogo local.');
        return;
      }

      let allRows: SupabaseProductRow[] = (firstBatch as SupabaseProductRow[]) || [];
      const totalCount = count ?? allRows.length;
      if (count) setSupabaseTotalCount(count);

      // PostgREST/Supabase limita a 1000 registros por llamada. Descargamos el resto en paralelo:
      if (totalCount > pageSize) {
        const remainingPromises = [];
        for (let from = pageSize; from < totalCount; from += pageSize) {
          const to = Math.min(from + pageSize - 1, totalCount - 1);
          remainingPromises.push(
            supabase
              .from('products')
              .select('*,brands(id,name,logo_url),categories(id,name,section)')
              .order('name', { ascending: true })
              .range(from, to)
          );
        }

        const remainingResults = await Promise.all(remainingPromises);
        for (const res of remainingResults) {
          if (res.data) {
            allRows = allRows.concat(res.data as SupabaseProductRow[]);
          }
        }
      }

      if (allRows.length > 0) {
        const mapped = allRows.map(mapSupabaseToWholesaleProduct);
        setProducts(mapped);
        setSupabaseConnected(true);
        setSupabaseSyncStatus('online');
        try {
          localStorage.setItem('sotomayor_products', JSON.stringify(mapped));
        } catch {
          // Si el catálogo completo de 5,000+ repuestos supera la cuota de localStorage (~5MB),
          // se mantiene con alto rendimiento en la memoria RAM del navegador.
        }
        if (notify) showToast(`Sincronizados ${mapped.length.toLocaleString()} repuestos reales desde Supabase`);
      }
    } catch (err) {
      console.warn('Error fetching Supabase products:', err);
      setSupabaseConnected(false);
      setSupabaseSyncStatus('offline');
    } finally {
      setIsLoadingSupabase(false);
    }
  };

  // Carga de Datos Mayoristas (Clientes, Vendedores, Facturas, Lotes) desde Supabase
  const loadWholesaleDataFromSupabase = async (notify = false) => {
    setSupabaseSyncStatus('syncing');
    try {
      const { clients: dbClients, sellers: dbSellers, invoices: dbInvoices, receipts: dbReceipts, isOnline } = await fetchWholesaleAll();
      if (isOnline) {
        setSupabaseConnected(true);
        setSupabaseSyncStatus('online');

        // Alimentar el estado en vivo con los datos reales de Supabase
        if (dbClients) {
          setClients(dbClients);
        }
        if (dbSellers) {
          setSellers(dbSellers);
        }
        if (dbInvoices) {
          setInvoices(dbInvoices.filter(i => i.status !== 'Borrador'));
          setDrafts(dbInvoices.filter(i => i.status === 'Borrador'));
        }
        if (dbReceipts) {
          setReceipts(dbReceipts);
        }
        if (notify) showToast('Datos mayoristas sincronizados en vivo con Supabase');
      } else {
        setSupabaseSyncStatus('offline');
        if (notify) showToast('Modo local: no se pudo sincronizar con Supabase');
      }
    } catch (err) {
      console.warn('Error en loadWholesaleDataFromSupabase:', err);
      setSupabaseSyncStatus('offline');
    }
  };

  useEffect(() => {
    loadProductsFromSupabase(false);
    loadWholesaleDataFromSupabase(false);

    const handleOnline = () => {
      setSupabaseSyncStatus('syncing');
      showToast('🟢 Conexión a internet reestablecida. Sincronizando con Supabase...');
      loadWholesaleDataFromSupabase(true);
      loadProductsFromSupabase(false);
    };

    const handleOffline = () => {
      setSupabaseSyncStatus('offline');
      showToast('🔴 Sin conexión a internet. Los cambios se guardarán localmente.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Alternar el switch "Disponible en Mayorista"
  const handleToggleWholesale = async (product: Product, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const newStatus = !product.isWholesale;

    const updatedProducts = products.map(p => {
      if (p.id === product.id) {
        return {
          ...p,
          isWholesale: newStatus,
          wholesaleStock: p.wholesaleStock ?? p.stock,
          wholesaleCost: p.wholesaleCost ?? p.cost,
          wholesalePrice: p.wholesalePrice ?? p.price,
        };
      }
      return p;
    });

    setProducts(updatedProducts);
    saveLocalWholesaleOverride(product.id, { isWholesale: newStatus });
    try {
      localStorage.setItem('sotomayor_products', JSON.stringify(updatedProducts));
    } catch (e) {
      // quota fallback
    }

    showToast(newStatus ? `"${product.sku}" activado en Mayorista` : `"${product.sku}" desactivado de Mayorista`);

    setSupabaseSyncStatus('syncing');
    const ok = await updateProductWholesale(product.id, { is_wholesale: newStatus });
    setSupabaseSyncStatus(ok ? 'online' : 'offline');
  };

  // Guardar configuración completa desde el Modal de Mayorista
  const handleSaveWholesaleModal = async (
    id: string,
    updates: {
      isWholesale: boolean;
      wholesaleStock: number;
      wholesaleCost: number;
      wholesalePrice: number;
      minStock: number;
    }
  ) => {
    const updatedProducts = products.map(p => {
      if (p.id === id) {
        return {
          ...p,
          isWholesale: updates.isWholesale,
          wholesaleStock: updates.wholesaleStock,
          stock: updates.wholesaleStock,
          wholesaleCost: updates.wholesaleCost,
          cost: updates.wholesaleCost,
          wholesalePrice: updates.wholesalePrice,
          price: updates.wholesalePrice,
          minStock: updates.minStock,
        };
      }
      return p;
    });

    setProducts(updatedProducts);
    saveLocalWholesaleOverride(id, updates);
    try {
      localStorage.setItem('sotomayor_products', JSON.stringify(updatedProducts));
    } catch (e) {
      // quota fallback
    }
    setEditingWholesaleProduct(null);
    showToast('Configuración mayorista guardada con éxito');

    setSupabaseSyncStatus('syncing');
    const ok = await updateProductWholesale(id, {
      is_wholesale: updates.isWholesale,
      wholesale_stock: updates.wholesaleStock,
      wholesale_cost: updates.wholesaleCost,
      wholesale_price: updates.wholesalePrice,
      wholesale_min_stock: updates.minStock,
    });
    setSupabaseSyncStatus(ok ? 'online' : 'offline');
  };

  // Modales Rápidos desde el Menú Contextual de la Tabla
  const [stockModalProduct, setStockModalProduct] = useState<{ product: Product; mode: 'reorder' | 'audit' | 'history' } | null>(null);
  const [modalQtyInput, setModalQtyInput] = useState<number | string>(25);
  const [modalCostInput, setModalCostInput] = useState<number | string>(0);

  // Modal para crear nuevo cliente
  const [newClientModalOpen, setNewClientModalOpen] = useState(false);
  const [newClientForm, setNewClientForm] = useState({
    name: '',
    rif: '',
    city: 'Valencia',
    phone: '',
  });

  // Modal para crear y registrar nuevo vendedor
  const [newSellerModalOpen, setNewSellerModalOpen] = useState(false);
  const [newSellerForm, setNewSellerForm] = useState({
    name: '',
    zone: '',
    phone: '',
    cedula: '',
  });

  // Modal para confirmar eliminación de vendedor
  const [sellerToDelete, setSellerToDelete] = useState<Seller | null>(null);

  // Estados de gestión e historial de clientes
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
  const [clientBlockedWarning, setClientBlockedWarning] = useState<{ client: Client; count: number; totalBilled: number; pendingDebt: number } | null>(null);
  const [clientHistoryModal, setClientHistoryModal] = useState<Client | null>(null);

  // Estados para el visor de ventas concretadas por vendedor
  const [sellerSalesHistoryModal, setSellerSalesHistoryModal] = useState<Seller | null>(null);
  const [sellerSalesSearch, setSellerSalesSearch] = useState('');
  const [sellerSalesStatusFilter, setSellerSalesStatusFilter] = useState<'Todas' | 'Cobrada' | 'Pendiente'>('Todas');

  // Estados para el Tutorial y Recorrido Guiado en Vivo
  const [tutorialModalOpen, setTutorialModalOpen] = useState(false);
  const [tutorialActiveTab, setTutorialActiveTab] = useState<'inventory' | 'invoicing' | 'receiving' | 'cxc' | 'commissions' | 'clients' | 'analytics' | 'rates'>('inventory');
  const [isTourActive, setIsTourActive] = useState(false);
  const [tourStep, setTourStep] = useState(0);

  // Toast de notificación
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Estado del Constructor de Facturas Mayoristas
  const [selectedClientId, setSelectedClientId] = useState(INITIAL_CLIENTS[0]?.id || '');
  const [selectedSellerId, setSelectedSellerId] = useState(INITIAL_SELLERS[0]?.id || '');
  const [invoiceCommissionRate, setInvoiceCommissionRate] = useState<string | number>('');
  const [invoiceDispatchAddress, setInvoiceDispatchAddress] = useState('');
  const [paymentCondition, setPaymentCondition] = useState('Contado (Divisas / Zelle)');
  const [documentType, setDocumentType] = useState('Nota de Entrega Mayorista (Exenta)');

  // Mantener selección válida de cliente y vendedor al cargar o modificar registros
  useEffect(() => {
    const validClients = clients.filter(c => !c.isDeleted);
    if (validClients.length > 0 && (!selectedClientId || !validClients.some(c => c.id === selectedClientId))) {
      setSelectedClientId(validClients[0].id);
    }
  }, [clients, selectedClientId]);

  useEffect(() => {
    const validSellers = sellers.filter(s => !s.isDeleted && s.isActive !== false);
    if (validSellers.length > 0 && (!selectedSellerId || !validSellers.some(s => s.id === selectedSellerId))) {
      setSelectedSellerId(validSellers[0].id);
    }
  }, [sellers, selectedSellerId]);

  // Sincronizar dirección de despacho editable al cambiar cliente seleccionado
  useEffect(() => {
    const cl = clients.find(c => c.id === selectedClientId);
    if (cl) {
      setInvoiceDispatchAddress(cl.address || cl.city || 'Valencia, Edo. Carabobo');
    }
  }, [selectedClientId, clients]);
  const [invoiceCart, setInvoiceCart] = useState<InvoiceLine[]>([]);
  const [partSearchInvoice, setPartSearchInvoice] = useState('');
  const [previewInvoice, setPreviewInvoice] = useState<Invoice | null>(null);
  const [expressActivationModalProduct, setExpressActivationModalProduct] = useState<Product | null>(null);
  const [expressForm, setExpressForm] = useState({
    suggestedPrice: 0,
    billQty: 1,
    initialStock: 1,
  });

  // Estado del Módulo de Ingreso de Mercancía
  const [receiptSupplier, setReceiptSupplier] = useState('');
  const [receiptRef, setReceiptRef] = useState('');
  const [receiptItems, setReceiptItems] = useState<ReceiptItem[]>([]);

  // Estados para Ingreso Rápido de Mercancía (Buscador superior inteligente + Fila rápida inline)
  const [batchSearchQuery, setBatchSearchQuery] = useState('');
  const [batchSearchOpen, setBatchSearchOpen] = useState(false);
  const batchSearchContainerRef = useRef<HTMLDivElement>(null);

  const [quickRowSku, setQuickRowSku] = useState('');
  const [quickRowProduct, setQuickRowProduct] = useState<Product | null>(null);
  const [quickRowQty, setQuickRowQty] = useState<number>(10);
  const [quickRowCost, setQuickRowCost] = useState<number>(0);
  const [quickRowPrice, setQuickRowPrice] = useState<number>(0);
  const [quickRowDropdownOpen, setQuickRowDropdownOpen] = useState(false);
  const quickRowSkuInputRef = useRef<HTMLInputElement>(null);
  const quickRowQtyInputRef = useRef<HTMLInputElement>(null);
  const quickRowContainerRef = useRef<HTMLDivElement>(null);

  // Cerrar menús de autocompletado al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        batchSearchContainerRef.current &&
        !batchSearchContainerRef.current.contains(e.target as Node)
      ) {
        setBatchSearchOpen(false);
      }
      if (
        quickRowContainerRef.current &&
        !quickRowContainerRef.current.contains(e.target as Node)
      ) {
        setQuickRowDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const [newProductModalOpen, setNewProductModalOpen] = useState(false);
  const [newPartForm, setNewPartForm] = useState({
    name: '',
    sku: '',
    category: 'Tren Delantero',
    supplier: 'MOOG Chassis',
    stock: 30,
    minStock: 20,
    cost: 15.00,
    price: 26.00
  });

  // Filtro de Comisiones
  const [commissionFilterSeller, setCommissionFilterSeller] = useState('Todos');
  const [commissionFilterStatus, setCommissionFilterStatus] = useState('Todas');

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Atajo de teclado '/' para enfocar el buscador superior
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Cerrar menú contextual si se hace click fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (openActionRowId && !(e.target as HTMLElement).closest('.action-menu-container')) {
        setOpenActionRowId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openActionRowId]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };



  // Categorías de productos mayoristas dinámicas ordenadas: 1° Motor, 2° Tren Delantero, 3° Alfabético
  const wholesaleCategories = useMemo(() => {
    const wholesaleProds = products.filter(p => Boolean(p.isWholesale));
    const uniqueCats = Array.from(
      new Set(wholesaleProds.map(p => (p.category || '').trim()).filter(Boolean))
    );

    return uniqueCats.sort((a, b) => {
      const aLower = a.toLowerCase();
      const bLower = b.toLowerCase();

      const getRank = (cat: string) => {
        if (cat.includes('motor')) return 1;
        if (cat.includes('tren delantero')) return 2;
        return 3;
      };

      const rankA = getRank(aLower);
      const rankB = getRank(bLower);

      if (rankA !== rankB) return rankA - rankB;
      return a.localeCompare(b, 'es', { sensitivity: 'base' });
    });
  }, [products]);

  // Pestañas (pills) para la barra de navegación del catálogo mayorista
  const categoryTabs = useMemo(() => {
    return ['Todos', 'Stock Crítico', ...wholesaleCategories];
  }, [wholesaleCategories]);

  // Lista para el dropdown de categorías
  const categoriesList = useMemo(() => {
    return ['Todas', ...wholesaleCategories];
  }, [wholesaleCategories]);

  const suppliersList = useMemo(() => {
    const wholesaleProds = products.filter(p => Boolean(p.isWholesale));
    const list = Array.from(new Set(wholesaleProds.map(p => (p.supplier || '').trim()).filter(Boolean))).sort((a, b) =>
      a.localeCompare(b, 'es', { sensitivity: 'base' })
    );
    return ['Todos', ...list];
  }, [products]);

  // Resetear activeCategoryTab a 'Todos' si la categoría seleccionada ya no existe en el catálogo mayorista
  useEffect(() => {
    if (activeCategoryTab !== 'Todos' && activeCategoryTab !== 'Stock Crítico' && !wholesaleCategories.includes(activeCategoryTab)) {
      setActiveCategoryTab('Todos');
    }
  }, [wholesaleCategories, activeCategoryTab]);

  // Filtrado de productos para la tabla de inventario
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesWholesaleMode = catalogFilterMode === 'all' || p.isWholesale === true;

      const matchesTab =
        activeCategoryTab === 'Todos' ||
        (activeCategoryTab === 'Stock Crítico' && p.stock <= p.minStock) ||
        p.category.toLowerCase().includes(activeCategoryTab.toLowerCase());

      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.supplier.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCatDropdown = selectedCategory === 'Todas' || p.category === selectedCategory;
      const matchesSupDropdown = selectedSupplier === 'Todos' || p.supplier === selectedSupplier;

      let matchesStockLevel = true;
      if (selectedStockLevel === 'Alto') matchesStockLevel = p.stock > p.minStock;
      if (selectedStockLevel === 'Bajo') matchesStockLevel = p.stock > 0 && p.stock <= p.minStock;
      if (selectedStockLevel === 'Agotado') matchesStockLevel = p.stock === 0;

      return matchesWholesaleMode && matchesTab && matchesSearch && matchesCatDropdown && matchesSupDropdown && matchesStockLevel;
    });
  }, [products, catalogFilterMode, activeCategoryTab, searchQuery, selectedCategory, selectedSupplier, selectedStockLevel]);

  // Paginación del inventario
  const totalPages = Math.ceil(filteredProducts.length / pageSize) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, currentPage, pageSize]);

  // Resetear a página 1 al cambiar filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [catalogFilterMode, activeCategoryTab, searchQuery, selectedCategory, selectedSupplier, selectedStockLevel]);

  // Exportar Inventario Filtrado a CSV
  const handleExportCsv = () => {
    const isGeneralCatalog = catalogFilterMode === 'all';
    const headers = isGeneralCatalog
      ? [
          'SKU',
          'Repuesto',
          'Categoria',
          'Marca',
          'Canal Mayorista',
          'Stock Mayorista',
          'Stock Detal',
          'Costo Cotizador USD',
          'Precio Detal USD',
          'Precio Mayorista USD',
          'Precio Mayorista BCV'
        ]
      : [
          'SKU',
          'Repuesto',
          'Categoria',
          'Marca',
          'Canal Mayorista',
          'Stock Mayorista',
          'Costo Mayorista USD',
          'Precio Mayorista USD',
          'Precio Mayorista BCV'
        ];

    const rows = filteredProducts.map(p => {
      const baseRow = [
        `"${p.sku}"`,
        `"${p.name.replace(/"/g, '""')}"`,
        `"${p.category}"`,
        `"${p.supplier}"`,
        p.isWholesale ? 'Mayorista' : 'Solo Detal',
        p.wholesaleStock ?? p.stock,
      ];

      if (isGeneralCatalog) {
        return [
          ...baseRow,
          p.retailStock ?? 0,
          (p.retailCost ?? p.cost ?? 0).toFixed(2),
          (p.retailPrice ?? p.price ?? 0).toFixed(2),
          (p.wholesalePrice ?? p.price).toFixed(2),
          ((p.wholesalePrice ?? p.price) * bcvRate).toFixed(2)
        ];
      }

      return [
        ...baseRow,
        (p.wholesaleCost ?? p.cost).toFixed(2),
        (p.wholesalePrice ?? p.price).toFixed(2),
        ((p.wholesalePrice ?? p.price) * bcvRate).toFixed(2)
      ];
    });
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `inventario_mayorista_sotomayor_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Se exportaron ${filteredProducts.length} repuestos a CSV exitosamente`);
  };

  // Acción desde el modal contextual de Stock (Depósito Mayorista)
  const handleConfirmStockModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stockModalProduct) return;
    const { product, mode } = stockModalProduct;
    const qtyNum = Number(modalQtyInput) || 0;
    const currentWStock = product.wholesaleStock ?? product.stock ?? 0;
    const updatedStock = mode === 'reorder' ? currentWStock + qtyNum : Math.max(0, qtyNum);
    const updatedCost = Number(modalCostInput) > 0 ? Number(modalCostInput) : (product.wholesaleCost ?? product.cost);

    setProducts(prev =>
      prev.map(item => {
        if (item.id !== product.id) return item;
        return {
          ...item,
          wholesaleStock: updatedStock,
          stock: updatedStock,
          wholesaleCost: updatedCost,
          cost: updatedCost,
        };
      })
    );

    saveLocalWholesaleOverride(product.id, {
      wholesaleStock: updatedStock,
      wholesaleCost: updatedCost,
    });

    supabase
      .from('products')
      .update({
        wholesale_stock: updatedStock,
        wholesale_cost: updatedCost,
      })
      .eq('id', product.id)
      .then();

    setStockHistory(prev => [
      {
        id: Date.now(),
        date: '24 Oct 2026, Ahora',
        sku: product.sku,
        product: product.name,
        type: mode === 'reorder' ? 'Ingreso Mayorista' : 'Auditoría Stock Mayorista',
        qty: mode === 'reorder' ? `+${qtyNum} Mayor` : `${updatedStock - currentWStock >= 0 ? '+' : ''}${updatedStock - currentWStock} Mayor`,
        user: 'Admin Sotomayor'
      },
      ...prev
    ]);

    showToast(
      mode === 'reorder'
        ? `Se ingresaron +${qtyNum} und. al stock mayorista de ${product.sku}`
        : `Stock mayorista de ${product.sku} auditado a ${updatedStock} und.`
    );
    setStockModalProduct(null);
  };

  // Función para calcular Precio Sugerido Mayorista (Fórmula B: Costo Cotizador + 25%)
  const getFormulaBPrice = (product: Product): number => {
    const baseCost = (product.retailCost && product.retailCost > 0)
      ? product.retailCost
      : ((product.cost && product.cost > 0) ? product.cost : (product.price > 0 ? Number((product.price * 0.75).toFixed(2)) : 10));
    return Number((baseCost * 1.25).toFixed(2));
  };

  // Abrir Modal Express de Activación Mayorista
  const openExpressActivationModal = (product: Product) => {
    const suggested = getFormulaBPrice(product);
    setExpressForm({
      suggestedPrice: suggested,
      billQty: 1,
      initialStock: 1,
    });
    setExpressActivationModalProduct(product);
    setActiveModule('invoicing');
  };

  // Confirmar activación express e incluir en el carrito de la factura
  const handleConfirmExpressActivation = () => {
    if (!expressActivationModalProduct) return;
    const baseCost = (expressActivationModalProduct.retailCost && expressActivationModalProduct.retailCost > 0)
      ? expressActivationModalProduct.retailCost
      : ((expressActivationModalProduct.cost && expressActivationModalProduct.cost > 0) ? expressActivationModalProduct.cost : (expressActivationModalProduct.price > 0 ? Number((expressActivationModalProduct.price * 0.75).toFixed(2)) : 10));

    const finalPrice = Math.max(0.01, Number(expressForm.suggestedPrice) || 0.01);
    const finalQty = Math.max(1, Number(expressForm.billQty) || 1);
    const finalStock = Math.max(finalQty, Number(expressForm.initialStock) || finalQty);

    setInvoiceCart(prev => {
      const exists = prev.find(i => i.productId === expressActivationModalProduct.id);
      if (exists) {
        return prev.map(i =>
          i.productId === expressActivationModalProduct.id
            ? {
                ...i,
                qty: i.qty + finalQty,
                price: finalPrice,
                isPendingWholesaleActivation: true,
                assignedWholesaleCost: baseCost,
                initialWholesaleStock: (i.initialWholesaleStock ?? 0) + finalStock
              }
            : i
        );
      }
      return [
        ...prev,
        {
          productId: expressActivationModalProduct.id,
          name: expressActivationModalProduct.name,
          sku: expressActivationModalProduct.sku,
          qty: finalQty,
          price: finalPrice,
          isPendingWholesaleActivation: true,
          assignedWholesaleCost: baseCost,
          initialWholesaleStock: finalStock
        }
      ];
    });

    const sku = expressActivationModalProduct.sku;
    setExpressActivationModalProduct(null);
    setPartSearchInvoice('');
    showToast(`⚡ ${sku} incorporado a la factura. Se activará en mayorista al emitir.`);
  };

  // Agregar repuesto directamente a la factura en curso desde el menú contextual
  const handleSendToInvoice = (product: Product) => {
    if (!product.isWholesale) {
      openExpressActivationModal(product);
      return;
    }
    setInvoiceCart(prev => {
      const exists = prev.find(i => i.productId === product.id);
      if (exists) {
        return prev.map(i => (i.productId === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { productId: product.id, name: product.name, sku: product.sku, qty: 1, price: product.wholesalePrice ?? product.price }];
    });
    setOpenActionRowId(null);
    setActiveModule('invoicing');
    showToast(`${product.sku} agregado a la factura mayorista`);
  };

  // Crear un nuevo repuesto en el catálogo
  const handleCreateNewPart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPartForm.name || !newPartForm.sku) return;
    const created: Product = {
      id: `prod-${Date.now()}`,
      name: newPartForm.name,
      sku: newPartForm.sku.toUpperCase(),
      category: newPartForm.category,
      supplier: newPartForm.supplier,
      supplierColor: 'bg-orange-600',
      stock: Number(newPartForm.stock) || 0,
      minStock: Number(newPartForm.minStock) || 10,
      cost: Number(newPartForm.cost) || 0,
      price: Number(newPartForm.price) || 0,
      location: 'Pasillo Nuevo',
      iconBg: 'bg-orange-50'
    };
    setProducts(prev => [created, ...prev]);
    if (activeModule === 'receiving') {
      setReceiptItems(prev => [
        ...prev,
        {
          productId: created.id,
          sku: created.sku,
          name: created.name,
          brand: created.supplier,
          qtyToEnter: created.stock > 0 ? created.stock : 10,
          unitCost: created.cost,
          newPrice: created.price
        }
      ]);
      showToast(`Repuesto ${created.sku} registrado y añadido al lote`);
    } else {
      showToast(`Repuesto ${created.sku} registrado en el catálogo`);
    }
    setNewProductModalOpen(false);
    setNewPartForm({
      name: '',
      sku: '',
      category: 'Tren Delantero',
      supplier: 'MOOG Chassis',
      stock: 30,
      minStock: 20,
      cost: 15.00,
      price: 26.00
    });
  };

  // Crear un nuevo cliente
  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientForm.name || !newClientForm.rif) return;
    const createdClient: Client = {
      id: `cli-${Date.now()}`,
      name: newClientForm.name.trim(),
      rif: newClientForm.rif.toUpperCase().trim(),
      city: newClientForm.city.trim() || 'Valencia',
      phone: newClientForm.phone.trim() || '0414-0000000',
      discount: 0,
      isDeleted: false
    };
    setClients(prev => [createdClient, ...prev]);
    setNewClientModalOpen(false);
    setNewClientForm({
      name: '',
      rif: '',
      city: 'Valencia',
      phone: ''
    });

    setSupabaseSyncStatus('syncing');
    const ok = await upsertWholesaleClient(createdClient);
    if (ok) {
      setSupabaseSyncStatus('online');
      showToast(`Cliente ${createdClient.name} guardado en la nube de Supabase`);
    } else {
      setSupabaseSyncStatus('offline');
      showToast(`Cliente ${createdClient.name} guardado en almacenamiento local`);
    }
  };

  // Obtener iniciales para el avatar del vendedor
  const getAvatarInitials = (fullName: string) => {
    const parts = fullName.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return 'VE';
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  // Crear un nuevo vendedor
  const handleCreateSeller = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = newSellerForm.name.trim();
    if (!trimmedName || trimmedName.length < 3) {
      showToast('El nombre del vendedor debe tener al menos 3 caracteres');
      return;
    }

    // Validación 1: Nombre duplicado (insensible a mayúsculas/minúsculas)
    const nameExists = sellers.some(
      s => !s.isDeleted && s.name.trim().toLowerCase() === trimmedName.toLowerCase()
    );
    if (nameExists) {
      showToast(`Ya existe un vendedor registrado con el nombre "${trimmedName}"`);
      return;
    }

    // Validación 2: Teléfono duplicado
    const cleanPhone = newSellerForm.phone.replace(/\D/g, '');
    if (cleanPhone.length >= 7) {
      const phoneExists = sellers.some(s => !s.isDeleted && s.phone.replace(/\D/g, '') === cleanPhone);
      if (phoneExists) {
        showToast('Ya existe un asesor registrado con este número de teléfono');
        return;
      }
    }

    const newId = `vend-${Date.now()}`;
    const newSeller: Seller = {
      id: newId,
      name: trimmedName,
      zone: newSellerForm.zone.trim() || 'Valencia / General',
      phone: newSellerForm.phone.trim() || 'Sin teléfono',
      cedula: newSellerForm.cedula.trim() || undefined,
      bonusRate: 1.0,
      avatar: getAvatarInitials(trimmedName),
      isActive: true,
      isDeleted: false,
      createdAt: new Date().toISOString()
    };

    setSellers(prev => [...prev, newSeller]);
    setNewSellerModalOpen(false);
    setNewSellerForm({
      name: '',
      zone: '',
      phone: '',
      cedula: '',
    });

    setSupabaseSyncStatus('syncing');
    const ok = await upsertWholesaleSeller(newSeller);
    if (ok) {
      setSupabaseSyncStatus('online');
      showToast(`Asesor comercial ${newSeller.name} guardado en Supabase`);
    } else {
      setSupabaseSyncStatus('offline');
      showToast(`Asesor comercial ${newSeller.name} guardado en almacenamiento local`);
    }
  };

  // Alternar estado activo / inactivo de un vendedor (Soft inactivate)
  const handleToggleSellerActive = async (sellerId: string) => {
    const s = sellers.find(item => item.id === sellerId);
    if (!s) return;
    const nextState = s.isActive === false ? true : false;

    setSellers(prev =>
      prev.map(item => (item.id === sellerId ? { ...item, isActive: nextState } : item))
    );

    setSupabaseSyncStatus('syncing');
    const ok = await toggleWholesaleSellerActive(sellerId, nextState);
    if (ok) {
      setSupabaseSyncStatus('online');
      showToast(`Asesor ${s.name} ${nextState ? 'activado' : 'inactivado'} en Supabase`);
    } else {
      setSupabaseSyncStatus('offline');
      showToast(`Asesor ${s.name} ${nextState ? 'activado' : 'inactivado'} localmente`);
    }
  };

  // Solicitar eliminación de un vendedor con validaciones estrictas
  const handleRequestDeleteSeller = (seller: Seller) => {
    // Validación 1: Integridad contable estricta (no eliminar si tiene facturas asociadas)
    const hasInvoices = invoices.some(i => i.sellerId === seller.id);
    if (hasInvoices) {
      showToast('No se puede eliminar a este asesor porque tiene facturas históricas registradas. Puedes marcarlo como Inactivo para que no aparezca en nuevas ventas.');
      return;
    }

    // Validación 2: Límite mínimo de vendedores en el sistema (al menos 1)
    const remainingSellers = sellers.filter(s => !s.isDeleted && s.id !== seller.id);
    if (remainingSellers.length === 0) {
      showToast('Debe existir al menos 1 vendedor registrado en el sistema.');
      return;
    }

    // Abrir modal de confirmación
    setSellerToDelete(seller);
  };

  // Confirmar eliminación lógica (Soft-delete en memoria, LocalStorage y Supabase)
  const handleConfirmDeleteSeller = async () => {
    if (!sellerToDelete) return;
    const targetId = sellerToDelete.id;
    const targetName = sellerToDelete.name;

    // Actualizar estado en memoria
    setSellers(prev =>
      prev.map(s => (s.id === targetId ? { ...s, isDeleted: true, isActive: false } : s))
    );

    // Reasignar selector de factura si el asesor activo era este
    const nextSeller = sellers.find(s => !s.isDeleted && s.id !== targetId);
    if (selectedSellerId === targetId && nextSeller) {
      setSelectedSellerId(nextSeller.id);
    }
    setSellerToDelete(null);

    setSupabaseSyncStatus('syncing');
    const ok = await softDeleteWholesaleSeller(targetId);
    if (ok) {
      setSupabaseSyncStatus('online');
      showToast(`Asesor comercial ${targetName} eliminado correctamente en Supabase`);
    } else {
      setSupabaseSyncStatus('offline');
      showToast(`Asesor comercial ${targetName} eliminado localmente`);
    }
  };

  // Solicitar eliminación de un cliente con validaciones estrictas
  const handleRequestDeleteClient = (client: Client) => {
    // Buscar facturas asociadas a este cliente (por clientId, RIF o nombre)
    const clientInvoices = invoices.filter(inv =>
      inv.clientId === client.id ||
      inv.clientRif.toLowerCase().trim() === client.rif.toLowerCase().trim() ||
      inv.clientName.toLowerCase().trim() === client.name.toLowerCase().trim()
    );

    // Validación 1: Integridad contable estricta (no eliminar si tiene facturas emitidas)
    if (clientInvoices.length > 0) {
      const totalBilled = clientInvoices.reduce((acc, inv) => acc + (inv.totalUsd || 0), 0);
      const pendingDebt = clientInvoices.reduce((acc, inv) => {
        const p = inv.balancePendingUsd !== undefined ? inv.balancePendingUsd : (inv.status === 'Cobrada' ? 0 : inv.totalUsd);
        return acc + p;
      }, 0);

      setClientBlockedWarning({
        client,
        count: clientInvoices.length,
        totalBilled,
        pendingDebt
      });
      return;
    }

    // Validación 2: Límite mínimo de clientes en el sistema (al menos 1)
    const remainingClients = clients.filter(c => !c.isDeleted && c.id !== client.id);
    if (remainingClients.length === 0) {
      showToast('Debe existir al menos 1 cliente mayorista registrado en el sistema.');
      return;
    }

    // Abrir modal de confirmación para cliente sin facturas
    setClientToDelete(client);
  };

  // Confirmar eliminación lógica de cliente
  const handleConfirmDeleteClient = async () => {
    if (!clientToDelete) return;
    const targetId = clientToDelete.id;
    const targetName = clientToDelete.name;

    // Actualizar estado en memoria con borrado lógico (isDeleted: true)
    setClients(prev => prev.map(c => (c.id === targetId ? { ...c, isDeleted: true } : c)));

    // Reasignar selector de factura si el cliente activo era este
    const remaining = clients.filter(c => !c.isDeleted && c.id !== targetId);
    if (selectedClientId === targetId && remaining.length > 0) {
      setSelectedClientId(remaining[0].id);
    }

    setClientToDelete(null);

    setSupabaseSyncStatus('syncing');
    const ok = await softDeleteWholesaleClient(targetId);
    if (ok) {
      setSupabaseSyncStatus('online');
      showToast(`Cliente "${targetName}" marcado como inactivo en Supabase (historial contable protegido).`);
    } else {
      setSupabaseSyncStatus('offline');
      showToast(`Cliente "${targetName}" marcado como inactivo localmente.`);
    }
  };

  // Cálculos de la Factura Mayorista actual
  const activeClient = useMemo(
    () => clients.find(c => !c.isDeleted && c.id === selectedClientId) || clients.find(c => !c.isDeleted) || clients[0],
    [clients, selectedClientId]
  );
  const activeSeller = useMemo(
    () => sellers.find(s => !s.isDeleted && s.id === selectedSellerId) || sellers.find(s => !s.isDeleted) || sellers[0],
    [sellers, selectedSellerId]
  );

  const invoiceTotals = useMemo(() => {
    const subtotal = invoiceCart.reduce((acc, item) => acc + item.qty * item.price, 0);
    const discount = subtotal * ((activeClient?.discount || 0) / 100);
    const taxable = subtotal - discount;
    const tax = documentType.includes('IVA') ? taxable * 0.16 : 0;
    const totalUsd = taxable + tax;
    const totalBs = totalUsd * bcvRate;
    const parsedCommission = invoiceCommissionRate === '' ? 0 : Math.max(0, Math.min(20, Number(invoiceCommissionRate) || 0));
    const sellerCommissionUsd = subtotal * (parsedCommission / 100);
    return { subtotal, discount, taxable, tax, totalUsd, totalBs, sellerCommissionUsd };
  }, [invoiceCart, activeClient, documentType, bcvRate, invoiceCommissionRate]);

  // Facturas filtradas del módulo de Cuentas por Cobrar (CxC) con búsqueda profunda multivariable
  const cxcFilteredInvoices = useMemo(() => {
    return invoices.filter(inv => {
      const pend = inv.balancePendingUsd !== undefined ? inv.balancePendingUsd : (inv.status === 'Cobrada' ? 0 : inv.totalUsd);

      // Filtro de estado
      if (cxcFilterStatus === 'todos' && pend <= 0.009) return false;
      if (cxcFilterStatus === 'vencidos') {
        if (pend <= 0.009) return false;
        const isOverdue = inv.status === 'Vencida' || (inv.dueDate && new Date(inv.dueDate) < new Date('2026-10-24'));
        if (!isOverdue) return false;
      }
      if (cxcFilterStatus === 'por_vencer') {
        if (pend <= 0.009) return false;
        const isOverdue = inv.status === 'Vencida' || (inv.dueDate && new Date(inv.dueDate) < new Date('2026-10-24'));
        if (isOverdue) return false;
      }
      if (cxcFilterStatus === 'saldados' && pend > 0.009) return false;

      // Filtro de búsqueda profunda (Cliente, RIF, Doc, Vendedor, Condición, Dirección y Repuestos dentro de la factura)
      if (cxcSearch.trim() !== '') {
        const q = cxcSearch.toLowerCase().trim();
        const idMatch = inv.id.toLowerCase().includes(q);
        const shortIdMatch = formatInvoiceDisplayNumber(inv.id).toLowerCase().includes(q);
        const clientMatch = inv.clientName.toLowerCase().includes(q);
        const rifMatch = inv.clientRif.toLowerCase().includes(q);
        const sellerMatch = inv.sellerName.toLowerCase().includes(q);
        const conditionMatch = inv.paymentCondition.toLowerCase().includes(q);
        const addressMatch = (inv.clientAddress || '').toLowerCase().includes(q);
        const linesMatch = (inv.lines || []).some(line =>
          line.sku.toLowerCase().includes(q) ||
          line.name.toLowerCase().includes(q)
        );

        return idMatch || shortIdMatch || clientMatch || rifMatch || sellerMatch || conditionMatch || addressMatch || linesMatch;
      }
      return true;
    });
  }, [invoices, cxcFilterStatus, cxcSearch]);

  // Emitir Factura Mayorista
  const handleEmitInvoice = () => {
    if (invoiceCart.length === 0) return;

    if (invoiceCommissionRate === '' || invoiceCommissionRate === undefined) {
      showToast('Por favor, indica el % de comisión de la factura (o 0% si no aplica).');
      return;
    }

    const finalCommissionRate = Math.max(0, Math.min(20, Number(invoiceCommissionRate) || 0));

    if (finalCommissionRate === 0) {
      const confirmZero = window.confirm(
        `¿Deseas emitir esta factura con 0% de comisión para el asesor comercial ${activeSeller.name}?`
      );
      if (!confirmZero) return;
    }

    if (!activeClient) {
      showToast('Debes registrar o seleccionar al menos un cliente mayorista antes de emitir.');
      return;
    }
    if (!activeSeller) {
      showToast('Debes registrar o seleccionar al menos un asesor comercial antes de emitir.');
      return;
    }

    // Adoptar correlativo numérico de 5 dígitos continuo iniciando en 00001 (00001, 00002...)
    const numericInvoices = invoices
      .map(inv => {
        const clean = inv.id.replace(/\D/g, '');
        const num = parseInt(clean, 10);
        return isNaN(num) ? 0 : num;
      })
      .filter(n => n > 0);

    const highestNum = numericInvoices.length > 0 ? Math.max(...numericInvoices) : 0;
    const newInvoiceNumber = String(highestNum + 1).padStart(5, '0');
    const isPaidImmediately = !paymentCondition.toLowerCase().includes('crédito') && !paymentCondition.toLowerCase().includes('credito');

    const now = new Date();
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    let daysToAdd = 0;
    if (!isPaidImmediately) {
      const matchDays = paymentCondition.match(/(\d+)\s*(?:días|dias)/i);
      if (matchDays) {
        daysToAdd = parseInt(matchDays[1], 10);
      } else if (paymentCondition.includes('7')) {
        daysToAdd = 7;
      } else if (paymentCondition.includes('15')) {
        daysToAdd = 15;
      } else if (paymentCondition.includes('21')) {
        daysToAdd = 21;
      } else if (paymentCondition.includes('30')) {
        daysToAdd = 30;
      } else {
        daysToAdd = 15;
      }
    }

    const dueDateObj = new Date(now.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
    const dueDateStr = `${dueDateObj.getFullYear()}-${String(dueDateObj.getMonth() + 1).padStart(2, '0')}-${String(dueDateObj.getDate()).padStart(2, '0')}`;

    const initialPayments: PaymentInstallment[] = isPaidImmediately
      ? [
          {
            id: `ABN-${Date.now().toString().slice(-5)}`,
            date: todayStr,
            amountUsd: invoiceTotals.totalUsd,
            amountVed: invoiceTotals.totalBs,
            bcvRate,
            method: paymentCondition.includes('Zelle')
              ? 'Zelle'
              : paymentCondition.includes('Pago Móvil')
              ? 'Pago Móvil BCV'
              : 'Divisas Efectivo',
            reference: 'PAGO-CONTADO-INMEDIATO',
            notes: 'Cobro de contado recibido al despachar',
            registeredBy: activeSeller.name
          }
        ]
      : [];

    const newInvoiceObj: Invoice = {
      id: newInvoiceNumber,
      clientId: activeClient.id,
      date: todayStr,
      dueDate: dueDateStr,
      clientName: activeClient.name,
      clientRif: activeClient.rif,
      clientAddress: invoiceDispatchAddress.trim() || activeClient.address || activeClient.city || 'Valencia, Edo. Carabobo',
      clientPhone: activeClient.phone || '0414-0000000',
      sellerId: activeSeller.id,
      sellerName: activeSeller.name,
      paymentCondition,
      documentType,
      status: isPaidImmediately ? 'Cobrada' : 'Pendiente',
      subtotalUsd: invoiceTotals.subtotal,
      discountUsd: invoiceTotals.discount,
      taxUsd: invoiceTotals.tax,
      totalUsd: invoiceTotals.totalUsd,
      amountPaidUsd: isPaidImmediately ? invoiceTotals.totalUsd : 0,
      balancePendingUsd: isPaidImmediately ? 0 : invoiceTotals.totalUsd,
      payments: initialPayments,
      commissionRate: finalCommissionRate,
      commissionUsd: invoiceTotals.sellerCommissionUsd,
      itemsCount: invoiceCart.reduce((a, b) => a + b.qty, 0),
      lines: [...invoiceCart]
    };

    setProducts(prev =>
      prev.map(prod => {
        const cartLine = invoiceCart.find(l => l.productId === prod.id);
        if (!cartLine) return prod;

        if (cartLine.isPendingWholesaleActivation) {
          const initStock = cartLine.initialWholesaleStock ?? cartLine.qty;
          const remainingStock = Math.max(0, initStock - cartLine.qty);
          const newPrice = cartLine.price;
          const newCost = cartLine.assignedWholesaleCost ?? prod.retailCost ?? prod.cost;

          saveLocalWholesaleOverride(prod.id, {
            isWholesale: true,
            wholesaleStock: remainingStock,
            wholesalePrice: newPrice,
            wholesaleCost: newCost
          });

          supabase
            .from('products')
            .update({
              is_wholesale: true,
              wholesale_stock: remainingStock,
              wholesale_price: newPrice,
              wholesale_cost: newCost
            })
            .eq('id', prod.id)
            .then();

          return {
            ...prod,
            isWholesale: true,
            price: newPrice,
            wholesalePrice: newPrice,
            wholesaleCost: newCost,
            wholesaleStock: remainingStock,
            stock: remainingStock
          };
        }

        const currentWStock = prod.wholesaleStock ?? prod.stock ?? 0;
        const newWStock = Math.max(0, currentWStock - cartLine.qty);
        saveLocalWholesaleOverride(prod.id, { wholesaleStock: newWStock });
        supabase
          .from('products')
          .update({ wholesale_stock: newWStock })
          .eq('id', prod.id)
          .then();
        return {
          ...prod,
          wholesaleStock: newWStock,
          stock: newWStock,
        };
      })
    );

    invoiceCart.forEach(line => {
      setStockHistory(prev => [
        {
          id: Date.now() + Math.random(),
          date: '24 Oct 2026, Ahora',
          sku: line.sku,
          product: line.name,
          type: `Venta (${newInvoiceNumber})`,
          qty: `-${line.qty}`,
          user: activeSeller.name
        },
        ...prev
      ]);
    });

    setInvoices(prev => [newInvoiceObj, ...prev]);
    setPreviewInvoice(newInvoiceObj);
    setInvoiceCart([]);
    setInvoiceCommissionRate('');

    // Si provenía de un borrador / pedido en espera, eliminarlo
    if (activeDraftId) {
      deleteWholesaleInvoice(activeDraftId);
      setDrafts(prev => prev.filter(d => d.id !== activeDraftId));
      setActiveDraftId(null);
    }

    // Persistencia en Supabase de la factura emitida
    setSupabaseSyncStatus('syncing');
    insertWholesaleInvoice(newInvoiceObj).then(ok => {
      setSupabaseSyncStatus(ok ? 'online' : 'offline');
    });

    const activatedCount = invoiceCart.filter(l => l.isPendingWholesaleActivation).length;
    if (activatedCount > 0) {
      showToast(`Documento ${newInvoiceNumber} emitido y sincronizado. Se activaron ${activatedCount} repuesto(s) en inventario mayorista.`);
    } else {
      showToast(`Documento ${newInvoiceNumber} emitido y sincronizado con Supabase. Comisión asignada a ${activeSeller.name}`);
    }
  };

  // Guardar Factura como Borrador / Pedido en Espera (no descuenta inventario)
  const handleSaveDraft = () => {
    if (invoiceCart.length === 0) {
      showToast('Agrega al menos un repuesto a la factura para guardarla como borrador.');
      return;
    }

    const draftId = activeDraftId || `BORR-${Date.now().toString().slice(-6)}`;
    const now = new Date();
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    const draftObj: WholesaleInvoice = {
      id: draftId,
      clientId: activeClient?.id || '',
      date: todayStr,
      dueDate: todayStr,
      clientName: activeClient?.name || 'Cliente por definir',
      clientRif: activeClient?.rif || '',
      clientAddress: invoiceDispatchAddress.trim() || activeClient?.address || activeClient?.city || '',
      clientPhone: activeClient?.phone || '',
      sellerId: activeSeller?.id || '',
      sellerName: activeSeller?.name || '',
      paymentCondition: paymentCondition || 'Contado (Divisas / Zelle)',
      documentType: documentType || 'Nota de Entrega Mayorista (Exenta)',
      status: 'Borrador',
      subtotalUsd: invoiceTotals.subtotal,
      discountUsd: invoiceTotals.discount,
      taxUsd: invoiceTotals.tax,
      totalUsd: invoiceTotals.totalUsd,
      amountPaidUsd: 0,
      balancePendingUsd: invoiceTotals.totalUsd,
      payments: [],
      commissionRate: Number(invoiceCommissionRate) || 0,
      commissionUsd: invoiceTotals.sellerCommissionUsd,
      itemsCount: invoiceCart.reduce((a, b) => a + b.qty, 0),
      lines: [...invoiceCart]
    };

    setDrafts(prev => {
      const filtered = prev.filter(d => d.id !== draftId);
      return [draftObj, ...filtered];
    });
    setActiveDraftId(draftId);

    // Persistir en Supabase
    setSupabaseSyncStatus('syncing');
    insertWholesaleInvoice(draftObj).then(ok => {
      setSupabaseSyncStatus(ok ? 'online' : 'offline');
    });

    showToast(`💾 Pedido en espera guardado (${draftId}). Puedes continuarlo en cualquier momento.`);
  };

  // Reanudar / Cargar un Borrador en el Facturador
  const handleResumeDraft = (draft: WholesaleInvoice) => {
    if (draft.clientId) {
      const foundClient = clients.find(c => c.id === draft.clientId);
      if (foundClient) setSelectedClientId(foundClient.id);
    }
    if (draft.sellerId) {
      const foundSeller = sellers.find(s => s.id === draft.sellerId);
      if (foundSeller) setSelectedSellerId(foundSeller.id);
    }
    if (draft.paymentCondition) {
      setPaymentCondition(draft.paymentCondition);
    }
    if (draft.documentType) {
      setDocumentType(draft.documentType);
    }
    if (draft.clientAddress) {
      setInvoiceDispatchAddress(draft.clientAddress);
    }
    if (draft.commissionRate !== undefined) {
      setInvoiceCommissionRate(draft.commissionRate.toString());
    }
    if (draft.lines && draft.lines.length > 0) {
      setInvoiceCart([...draft.lines]);
    }
    setActiveDraftId(draft.id);
    setDraftsModalOpen(false);
    setActiveModule('invoicing');
    showToast(`📂 Pedido en espera ${draft.id} cargado en el facturador.`);
  };

  // Eliminar un Borrador
  const handleDeleteDraft = (draftId: string) => {
    const confirmDelete = window.confirm(`¿Deseas eliminar el borrador ${draftId}? Esta acción no se puede deshacer.`);
    if (!confirmDelete) return;

    setDrafts(prev => prev.filter(d => d.id !== draftId));
    if (activeDraftId === draftId) {
      setActiveDraftId(null);
    }
    deleteWholesaleInvoice(draftId);
    showToast(`Borrador ${draftId} eliminado.`);
  };

  // Abrir Modal de Creación de Repuesto desde Facturador
  const handleOpenCreatePartFromInvoice = (searchQuery: string) => {
    const trimmed = searchQuery.trim();
    const isLikelySku = trimmed.length <= 15 && !trimmed.includes(' ');
    setNewProductInvoiceForm({
      sku: isLikelySku ? trimmed.toUpperCase() : `REP-${Date.now().toString().slice(-5)}`,
      name: isLikelySku ? '' : trimmed,
      category: 'Tren Delantero',
      supplier: 'GENÉRICO',
      cost: '',
      price: '',
      wholesaleStock: '10',
      quantityToInvoice: '1',
    });
    setNewProductFromInvoiceModalOpen(true);
  };

  // Guardar Repuesto Nuevo e Insertar en Factura
  const handleSaveNewProductFromInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    const sku = newProductInvoiceForm.sku.trim().toUpperCase();
    const name = newProductInvoiceForm.name.trim();
    const cost = parseFloat(newProductInvoiceForm.cost) || 0;
    const price = parseFloat(newProductInvoiceForm.price) || 0;
    const stock = parseInt(newProductInvoiceForm.wholesaleStock, 10) || 0;
    const billQty = parseInt(newProductInvoiceForm.quantityToInvoice, 10) || 1;

    if (!sku) {
      showToast('Por favor, ingresa el código SKU del repuesto.');
      return;
    }
    if (!name) {
      showToast('Por favor, ingresa el nombre o descripción del repuesto.');
      return;
    }
    if (price <= 0) {
      showToast('Por favor, ingresa un precio de venta mayorista válido mayor a 0.');
      return;
    }
    if (stock < billQty) {
      showToast('El stock inicial no puede ser inferior a la cantidad a facturar.');
      return;
    }

    setSupabaseSyncStatus('syncing');
    const createdProduct = await insertNewProduct({
      sku,
      name,
      category: newProductInvoiceForm.category,
      supplier: newProductInvoiceForm.supplier,
      cost,
      price,
      wholesaleStock: stock,
    });

    const fallbackProduct: Product = createdProduct || {
      id: `prod-${Date.now()}`,
      sku,
      name,
      description: '',
      category: newProductInvoiceForm.category,
      supplier: newProductInvoiceForm.supplier,
      supplierColor: 'border-orange-500 text-orange-600 bg-orange-50',
      stock,
      minStock: 2,
      cost,
      price,
      location: '',
      iconBg: 'bg-orange-50 text-[#FF5C1B]',
      isWholesale: true,
      wholesaleStock: stock,
      wholesaleCost: cost,
      wholesalePrice: price,
      retailStock: 0,
      retailCost: cost,
      retailPrice: price,
      isRetailActive: false,
    };

    setProducts(prev => [fallbackProduct, ...prev]);

    // Añadir de inmediato a la factura
    setInvoiceCart(prev => {
      const exists = prev.find(i => i.productId === fallbackProduct.id);
      if (exists) {
        return prev.map(i => (i.productId === fallbackProduct.id ? { ...i, qty: i.qty + billQty } : i));
      }
      return [
        ...prev,
        {
          productId: fallbackProduct.id,
          name: fallbackProduct.name,
          sku: fallbackProduct.sku,
          qty: billQty,
          price: fallbackProduct.wholesalePrice ?? fallbackProduct.price,
        }
      ];
    });

    setPartSearchInvoice('');
    setNewProductFromInvoiceModalOpen(false);
    setSupabaseSyncStatus('online');
    showToast(`✓ Repuesto ${sku} creado en inventario y agregado a la factura (${billQty} und).`);
  };

  // Registrar Abono a Factura de Crédito en el Módulo CxC
  const handleRegisterPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentModalInvoice) return;

    const amountNum = parseFloat(String(paymentAmountUsd));
    const currentPending = paymentModalInvoice.balancePendingUsd !== undefined
      ? paymentModalInvoice.balancePendingUsd
      : (paymentModalInvoice.status === 'Cobrada' ? 0 : paymentModalInvoice.totalUsd);

    if (isNaN(amountNum) || amountNum <= 0) {
      showToast('Por favor ingresa un monto válido mayor a 0');
      return;
    }
    if (amountNum > currentPending + 0.05) {
      showToast(`El monto no puede ser mayor al saldo pendiente ($${currentPending.toFixed(2)})`);
      return;
    }

    const todayStr = '2026-10-24';
    const newPayment: PaymentInstallment = {
      id: `ABN-${Date.now().toString().slice(-5)}`,
      date: todayStr,
      amountUsd: amountNum,
      amountVed: Number((amountNum * bcvRate).toFixed(2)),
      bcvRate: Number(bcvRate.toFixed(2)),
      method: paymentMethod,
      reference: paymentReference || 'PAGO-REGISTRADO',
      notes: paymentNotes || 'Abono a cuenta',
      registeredBy: 'Administración Sotomayor'
    };

    const newAmountPaid = (paymentModalInvoice.amountPaidUsd || 0) + amountNum;
    const newBalancePending = Math.max(0, currentPending - amountNum);
    const isNowFullyPaid = newBalancePending < 0.01;

    const updatedInvoice: Invoice = {
      ...paymentModalInvoice,
      amountPaidUsd: newAmountPaid,
      balancePendingUsd: newBalancePending,
      status: isNowFullyPaid ? 'Cobrada' : 'Parcial',
      payments: [newPayment, ...(paymentModalInvoice.payments || [])]
    };

    setInvoices(prev =>
      prev.map(inv => (inv.id === paymentModalInvoice.id ? updatedInvoice : inv))
    );

    // Persistencia directa en Supabase del abono y nuevo saldo
    setSupabaseSyncStatus('syncing');
    updateWholesaleInvoicePayment(
      updatedInvoice.id,
      updatedInvoice.payments || [],
      updatedInvoice.amountPaidUsd || 0,
      updatedInvoice.balancePendingUsd || 0,
      updatedInvoice.status
    ).then(ok => {
      setSupabaseSyncStatus(ok ? 'online' : 'offline');
    });

    showToast(`Abono de $${amountNum.toFixed(2)} registrado y sincronizado en ${paymentModalInvoice.id}`);
    setPaymentModalInvoice(null);
    setPaymentAmountUsd('');
    setPaymentReference('');
    setPaymentNotes('');
    setPaymentHistoryInvoice(updatedInvoice);
  };

  // Coincidencias para el buscador superior inteligente de recepción
  const batchSearchResults = useMemo(() => {
    if (!batchSearchQuery.trim()) return [];
    const q = batchSearchQuery.toLowerCase();
    return products
      .filter(p =>
        p.sku.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q) ||
        (p.supplier && p.supplier.toLowerCase().includes(q))
      )
      .slice(0, 8);
  }, [products, batchSearchQuery]);

  // Coincidencias para la fila rápida inline en la tabla
  const quickRowResults = useMemo(() => {
    if (!quickRowSku.trim() || quickRowProduct) return [];
    const q = quickRowSku.toLowerCase();
    return products
      .filter(p =>
        p.sku.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q) ||
        (p.supplier && p.supplier.toLowerCase().includes(q))
      )
      .slice(0, 6);
  }, [products, quickRowSku, quickRowProduct]);

  // Abrir modal de creación de repuesto nuevo al vuelo cuando no existe en el catálogo
  const handleOpenCreatePartFromSearch = (queryText: string) => {
    const clean = queryText.trim();
    const isLikelySku = clean.length <= 15 && !clean.includes(' ');
    setNewPartForm(prev => ({
      ...prev,
      sku: isLikelySku ? clean.toUpperCase() : '',
      name: !isLikelySku ? clean : '',
      supplier: receiptSupplier || 'MOOG Chassis',
    }));
    setBatchSearchOpen(false);
    setQuickRowDropdownOpen(false);
    setNewProductModalOpen(true);
  };

  // Agregar repuesto al lote desde el buscador superior
  const handleAddFromTopSearch = (prod: Product) => {
    const isDuplicate = receiptItems.some(
      i => i.productId === prod.id || i.sku.toUpperCase() === prod.sku.toUpperCase()
    );
    if (isDuplicate) {
      showToast(`⚠️ El repuesto con SKU ${prod.sku} ya está en la lista de este lote.`);
      return;
    }

    const defaultCost = prod.wholesaleCost && prod.wholesaleCost > 0 ? prod.wholesaleCost : prod.cost;
    const defaultPrice = prod.wholesalePrice && prod.wholesalePrice > 0 ? prod.wholesalePrice : prod.price;

    setReceiptItems(prev => [
      ...prev,
      {
        productId: prod.id,
        sku: prod.sku,
        name: prod.name,
        brand: prod.supplier || 'GENÉRICO',
        brandLogo: prod.supplierLogo,
        qtyToEnter: 10,
        unitCost: defaultCost,
        newPrice: defaultPrice
      }
    ]);
    setBatchSearchQuery('');
    setBatchSearchOpen(false);
    showToast(`✅ ${prod.sku} agregado al lote de recepción`);
  };

  // Seleccionar repuesto en la fila rápida inline
  const handleSelectQuickRowProduct = (prod: Product) => {
    setQuickRowProduct(prod);
    setQuickRowSku(prod.sku);
    setQuickRowCost(prod.wholesaleCost && prod.wholesaleCost > 0 ? prod.wholesaleCost : prod.cost);
    setQuickRowPrice(prod.wholesalePrice && prod.wholesalePrice > 0 ? prod.wholesalePrice : prod.price);
    setQuickRowDropdownOpen(false);
    setTimeout(() => {
      quickRowQtyInputRef.current?.focus();
      quickRowQtyInputRef.current?.select();
    }, 50);
  };

  // Confirmar y agregar repuesto de la fila rápida al lote
  const handleCommitQuickRow = () => {
    let targetProd = quickRowProduct;
    if (!targetProd) {
      if (quickRowSku.trim()) {
        const exact = products.find(
          p => p.sku.toUpperCase() === quickRowSku.trim().toUpperCase()
        );
        if (exact) {
          targetProd = exact;
        } else if (quickRowResults.length > 0) {
          targetProd = quickRowResults[0];
        } else {
          showToast(`⚠️ Repuesto "${quickRowSku}" no encontrado en catálogo.`);
          return;
        }
      } else {
        showToast('⚠️ Ingresa el SKU o nombre del repuesto en la fila rápida.');
        return;
      }
    }

    // Validación de duplicado: no duplicar en el mismo lote
    const isDuplicate = receiptItems.some(
      i => i.productId === targetProd.id || i.sku.toUpperCase() === targetProd.sku.toUpperCase()
    );
    if (isDuplicate) {
      showToast(`⚠️ El repuesto con SKU ${targetProd.sku} ya está en la lista de este lote.`);
      return;
    }

    const finalCost = quickRowCost > 0 ? quickRowCost : (targetProd.wholesaleCost && targetProd.wholesaleCost > 0 ? targetProd.wholesaleCost : targetProd.cost);
    const finalPrice = quickRowPrice > 0 ? quickRowPrice : (targetProd.wholesalePrice && targetProd.wholesalePrice > 0 ? targetProd.wholesalePrice : targetProd.price);

    setReceiptItems(prev => [
      ...prev,
      {
        productId: targetProd.id,
        sku: targetProd.sku,
        name: targetProd.name,
        brand: targetProd.supplier || 'GENÉRICO',
        brandLogo: targetProd.supplierLogo,
        qtyToEnter: quickRowQty > 0 ? quickRowQty : 1,
        unitCost: finalCost,
        newPrice: finalPrice
      }
    ]);

    // Limpiar fila rápida y volver a enfocar SKU para flujo continuo
    setQuickRowSku('');
    setQuickRowProduct(null);
    setQuickRowQty(10);
    setQuickRowCost(0);
    setQuickRowPrice(0);
    setQuickRowDropdownOpen(false);
    showToast(`✅ ${targetProd.sku} añadido al lote`);
    setTimeout(() => {
      quickRowSkuInputRef.current?.focus();
    }, 50);
  };

  // Procesar Ingreso de Lote de Mercancía
  const handleProcessReceipt = () => {
    if (receiptItems.length === 0) {
      showToast('No hay repuestos en la lista de recepción');
      return;
    }

    const totalUnits = receiptItems.reduce((acc, item) => acc + item.qtyToEnter, 0);
    const totalCost = receiptItems.reduce((acc, item) => acc + item.qtyToEnter * item.unitCost, 0);

    const newRec: Receipt = {
      id: `REC-2026-09${receipts.length + 3}`,
      date: new Date().toISOString().split('T')[0],
      supplier: receiptSupplier,
      invoiceRef: receiptRef,
      totalUnits,
      totalCostUsd: totalCost,
      receivedBy: 'Almacén Central Valencia',
      items: receiptItems.map(item => ({ ...item }))
    };

    // A.3: Si cambian costos en el lote, NO se actualiza el costo ni precio en la ficha maestra del catálogo
    // Se alimenta el stock mayorista y se conserva el historial
    setProducts(prev =>
      prev.map(prod => {
        const item = receiptItems.find(r => r.productId === prod.id);
        if (!item) return prod;
        const currentWStock = prod.wholesaleStock ?? prod.stock ?? 0;
        const newWStock = currentWStock + item.qtyToEnter;

        saveLocalWholesaleOverride(prod.id, {
          wholesaleStock: newWStock,
        });

        supabase
          .from('products')
          .update({
            wholesale_stock: newWStock,
          })
          .eq('id', prod.id)
          .then();

        return {
          ...prod,
          wholesaleStock: newWStock,
          stock: newWStock,
        };
      })
    );

    // Registro detallado en el historial de inventario con marca y costos de adquisición
    receiptItems.forEach(item => {
      setStockHistory(prev => [
        {
          id: Date.now() + Math.random(),
          date: '26 Oct 2026, Ahora',
          sku: item.sku,
          product: `${item.name} (${item.brand})`,
          type: `Recepción Lote (${newRec.id}) - Costo Adq: $${item.unitCost.toFixed(2)} | P. Mayor Ref: $${item.newPrice.toFixed(2)}`,
          qty: `+${item.qtyToEnter}`,
          user: 'Almacén Valencia'
        },
        ...prev
      ]);
    });

    // Guardar en el historial mayorista persistente de compras
    try {
      const historyKey = 'sotomayor_wholesale_cost_history';
      const existingHistory = JSON.parse(localStorage.getItem(historyKey) || '[]');
      const newEntries = receiptItems.map(item => ({
        id: `HIST-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        productId: item.productId,
        sku: item.sku,
        name: item.name,
        brand: item.brand,
        brandLogo: item.brandLogo,
        receiptId: newRec.id,
        date: newRec.date,
        supplier: receiptSupplier,
        invoiceRef: receiptRef,
        qty: item.qtyToEnter,
        unitCost: item.unitCost,
        newPrice: item.newPrice,
      }));
      localStorage.setItem(historyKey, JSON.stringify([...newEntries, ...existingHistory]));
    } catch (err) {
      console.warn('Error saving wholesale cost history', err);
    }

    setReceipts(prev => [newRec, ...prev]);
    setReceiptItems([]);

    // Persistencia en Supabase
    setSupabaseSyncStatus('syncing');
    insertWholesaleReceipt(newRec).then(ok => {
      setSupabaseSyncStatus(ok ? 'online' : 'offline');
    });

    showToast(`Recepción ${newRec.id} procesada y guardada en Supabase (+${totalUnits} unidades sumadas al stock)`);
    setActiveModule('inventory');
  };

  // Renderizado de la barra e indicador de stock
  const renderStockStatus = (stock: number, minStock: number) => {
    if (stock === 0) {
      return (
        <div className="w-36">
          <div className="text-xs font-medium text-gray-500 mb-1.5">0 und • Agotado</div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden" />
        </div>
      );
    }

    const isLow = stock <= minStock;
    const percentage = Math.min(100, Math.max(15, Math.round((stock / (minStock * 3)) * 100)));

    return (
      <div className="w-36">
        <div className="text-xs font-medium text-gray-800 mb-1.5 flex items-center gap-1">
          <span>{stock} und</span>
          <span className="text-gray-400">•</span>
          <span className={isLow ? 'text-red-600 font-semibold' : 'text-emerald-700 font-medium'}>
            {isLow ? 'Bajo' : 'Alto'}
          </span>
        </div>
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              isLow ? 'bg-red-500' : 'bg-emerald-500'
            }`}
            style={{ width: `${isLow ? Math.min(35, percentage) : percentage}%` }}
          />
        </div>
      </div>
    );
  };

  const moduleTitles = {
    inventory: 'Inventario',
    invoicing: 'Facturación Mayorista',
    receiving: 'Ingreso de Mercancía',
    cxc: 'Cuentas por Cobrar (CxC)',
    commissions: 'Comisiones de Vendedores',
    analytics: 'Estadísticas y Analítica',
    clients: 'Clientes y Aliados'
  };

  const pendingInvoicesCount = useMemo(() => {
    return invoices.filter(inv => {
      const pending = inv.balancePendingUsd !== undefined ? inv.balancePendingUsd : (inv.status === 'Cobrada' ? 0 : inv.totalUsd);
      return pending > 0;
    }).length;
  }, [invoices]);

  // Paleta de Colores de Alto Contraste para Categorías
  const CATEGORY_COLORS = [
    '#FF5C1B', // Naranja Sotomayor
    '#3B82F6', // Azul Cobalto
    '#10B981', // Esmeralda
    '#8B5CF6', // Púrpura
    '#F59E0B', // Ámbar
    '#06B6D4', // Cyan
    '#EC4899', // Rosa
    '#64748B'  // Pizarra
  ];

  // Cálculo Ejecutivo para Estadísticas y Analítica de Negocio (BI)
  const analyticsData = useMemo(() => {
    const now = new Date();
    const todayStr = now.toISOString().slice(0, 10);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const currentMonthStr = todayStr.slice(0, 7);

    // Filtrar facturas según el rango seleccionado
    const filteredInvoices = invoices.filter(inv => {
      if (analyticsTimeRange === 'today') return inv.date === todayStr;
      if (analyticsTimeRange === '7days') return inv.date >= sevenDaysAgo;
      if (analyticsTimeRange === 'month') return inv.date.startsWith(currentMonthStr);
      return true; // 'all'
    });

    let totalBilledUsd = 0;
    let totalCostUsd = 0;
    let totalUnitsSold = 0;
    let totalCommissionsUsd = 0;
    let totalCollectedUsd = 0;
    let totalPendingUsd = 0;
    let totalOverdueUsd = 0;

    // Agrupación de productos por rotación y margen
    const productSalesMap = new Map<string, {
      sku: string;
      name: string;
      category: string;
      units: number;
      revenue: number;
      cost: number;
      profit: number;
    }>();

    // Agrupación de ventas por categoría
    const categorySalesMap = new Map<string, number>();

    // Agrupación por cliente
    const clientSalesMap = new Map<string, {
      name: string;
      rif: string;
      invoicesCount: number;
      totalUsd: number;
    }>();

    // Agrupación por asesor comercial
    const sellerSalesMap = new Map<string, {
      id: string;
      name: string;
      invoicesCount: number;
      totalUsd: number;
      commissionUsd: number;
      paidUsd: number;
      pendingUsd: number;
    }>();

    // Precargar vendedores registrados (excluyendo eliminados)
    sellers.filter(s => !s.isDeleted).forEach(s => {
      sellerSalesMap.set(s.id, {
        id: s.id,
        name: s.name,
        invoicesCount: 0,
        totalUsd: 0,
        commissionUsd: 0,
        paidUsd: 0,
        pendingUsd: 0
      });
    });

    filteredInvoices.forEach(inv => {
      const invTotal = inv.totalUsd || 0;
      totalBilledUsd += invTotal;
      totalCommissionsUsd += inv.commissionUsd || 0;

      const paid = inv.amountPaidUsd ?? (inv.status === 'Cobrada' ? invTotal : 0);
      const pending = inv.balancePendingUsd ?? (inv.status === 'Cobrada' ? 0 : invTotal);
      totalCollectedUsd += paid;
      totalPendingUsd += pending;
      if (inv.status === 'Vencida') {
        totalOverdueUsd += pending;
      }

      // Rendimiento del Asesor
      const sellerStats = sellerSalesMap.get(inv.sellerId) || {
        id: inv.sellerId,
        name: inv.sellerName || 'Vendedor',
        invoicesCount: 0,
        totalUsd: 0,
        commissionUsd: 0,
        paidUsd: 0,
        pendingUsd: 0
      };
      sellerStats.invoicesCount += 1;
      sellerStats.totalUsd += invTotal;
      sellerStats.commissionUsd += inv.commissionUsd || 0;
      sellerStats.paidUsd += paid;
      sellerStats.pendingUsd += pending;
      sellerSalesMap.set(inv.sellerId, sellerStats);

      // Cartera de Clientes
      const clientKey = inv.clientRif || inv.clientName;
      const clientStats = clientSalesMap.get(clientKey) || {
        name: inv.clientName,
        rif: inv.clientRif,
        invoicesCount: 0,
        totalUsd: 0
      };
      clientStats.invoicesCount += 1;
      clientStats.totalUsd += invTotal;
      clientSalesMap.set(clientKey, clientStats);

      // Líneas de Factura (Costo Real vs Venta por SKU)
      if (inv.lines && inv.lines.length > 0) {
        inv.lines.forEach(l => {
          totalUnitsSold += l.qty;
          const prod = products.find(p => p.id === l.productId || p.sku === l.sku);
          const unitCost = l.assignedWholesaleCost ?? prod?.wholesaleCost ?? prod?.retailCost ?? prod?.cost ?? (l.price * 0.75);
          const lineRevenue = l.qty * l.price;
          const lineCost = l.qty * unitCost;
          const lineProfit = lineRevenue - lineCost;

          totalCostUsd += lineCost;

          const pKey = l.sku || l.productId;
          const pStats = productSalesMap.get(pKey) || {
            sku: l.sku,
            name: l.name,
            category: prod?.category || 'Repuestos',
            units: 0,
            revenue: 0,
            cost: 0,
            profit: 0
          };
          pStats.units += l.qty;
          pStats.revenue += lineRevenue;
          pStats.cost += lineCost;
          pStats.profit += lineProfit;
          productSalesMap.set(pKey, pStats);

          const cat = prod?.category || 'General';
          categorySalesMap.set(cat, (categorySalesMap.get(cat) || 0) + lineRevenue);
        });
      } else {
        const estCost = invTotal * 0.75;
        totalCostUsd += estCost;
        totalUnitsSold += inv.itemsCount || 1;
        categorySalesMap.set('General', (categorySalesMap.get('General') || 0) + invTotal);
      }
    });

    const totalGrossProfitUsd = Math.max(0, totalBilledUsd - totalCostUsd);
    const grossMarginPct = totalBilledUsd > 0 ? (totalGrossProfitUsd / totalBilledUsd) * 100 : 0;
    const avgTicketUsd = filteredInvoices.length > 0 ? totalBilledUsd / filteredInvoices.length : 0;

    // Valoración del Almacén Mayorista a Costo vs Venta (Inventario Mayorista Activo)
    const wholesaleProds = products.filter(p => p.isWholesale);
    let inventoryValCost = 0;
    let inventoryValSale = 0;
    let totalWholesaleUnits = 0;

    wholesaleProds.forEach(p => {
      const stock = p.wholesaleStock ?? p.stock ?? 0;
      const cost = p.wholesaleCost ?? p.retailCost ?? p.cost ?? 0;
      const price = p.wholesalePrice ?? p.price ?? 0;
      inventoryValCost += stock * cost;
      inventoryValSale += stock * price;
      totalWholesaleUnits += stock;
    });

    // Top productos ordenados por volumen de rotación
    const topProducts = Array.from(productSalesMap.values())
      .sort((a, b) => b.units - a.units)
      .slice(0, 6);
    const maxUnitsSold = topProducts.length > 0 ? Math.max(...topProducts.map(p => p.units)) : 1;

    // Categorías ordenadas por monto facturado
    const categorySales = Array.from(categorySalesMap.entries())
      .map(([name, amount], index) => ({
        name,
        amount,
        percentage: totalBilledUsd > 0 ? (amount / totalBilledUsd) * 100 : 0,
        color: CATEGORY_COLORS[index % CATEGORY_COLORS.length]
      }))
      .sort((a, b) => b.amount - a.amount);

    // Vendedores ordenados por ventas generadas
    const sellersRanking = Array.from(sellerSalesMap.values())
      .sort((a, b) => b.totalUsd - a.totalUsd);
    const maxSellerSales = sellersRanking.length > 0 ? Math.max(...sellersRanking.map(s => s.totalUsd), 1) : 1;

    // Clientes de mayor volumen
    const topClients = Array.from(clientSalesMap.values())
      .sort((a, b) => b.totalUsd - a.totalUsd)
      .slice(0, 5);

    // Histórico diario de facturas
    const sortedInvoices = [...filteredInvoices].sort((a, b) => a.date.localeCompare(b.date));
    const dailyMap = new Map<string, number>();
    sortedInvoices.forEach(inv => {
      dailyMap.set(inv.date, (dailyMap.get(inv.date) || 0) + (inv.totalUsd || 0));
    });
    const dailyTrend = Array.from(dailyMap.entries()).map(([date, amount]) => ({
      date,
      amount,
      label: date.slice(5) // MM-DD
    }));
    const maxDailyAmount = dailyTrend.length > 0 ? Math.max(...dailyTrend.map(d => d.amount), 1) : 1;

    return {
      filteredInvoices,
      totalBilledUsd,
      totalBilledBs: totalBilledUsd * bcvRate,
      totalCostUsd,
      totalGrossProfitUsd,
      grossMarginPct,
      avgTicketUsd,
      totalUnitsSold,
      totalCommissionsUsd,
      totalCollectedUsd,
      totalPendingUsd,
      totalOverdueUsd,
      inventoryValCost,
      inventoryValSale,
      totalWholesaleUnits,
      wholesaleActiveCount: wholesaleProds.length,
      topProducts,
      maxUnitsSold,
      categorySales,
      sellersRanking,
      maxSellerSales,
      topClients,
      dailyTrend,
      maxDailyAmount
    };
  }, [invoices, products, sellers, analyticsTimeRange, bcvRate]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-gray-900 flex font-sans antialiased select-none">
      {/* NOTIFICACIÓN TOAST */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2.5 text-sm font-medium animate-bounce">
          <UseAnimations
            animation={checkmarkAnimation}
            size={20}
            strokeColor="#FF5C1B"
            interaction="loop"
          />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ============================================================
          SIDEBAR IZQUIERDO CON EXPANSIÓN INTELIGENTE EN HOVER
      ============================================================ */}
      <div className="w-16 shrink-0 relative z-30">
        <aside
          onMouseEnter={() => setSidebarHovered(true)}
          onMouseLeave={() => setSidebarHovered(false)}
          className={`fixed top-0 bottom-0 left-0 bg-white dark:bg-[#0E1422] border-r border-gray-200 dark:border-[#1E293B] flex flex-col justify-between py-4 z-40 transition-all duration-300 ease-in-out ${
            sidebarHovered ? 'w-64 px-3 shadow-2xl' : 'w-16 px-2 shadow-xs'
          }`}
        >
          <div className="flex flex-col gap-4 w-full">
            {/* Logo Repuestos Sotomayor */}
            <div
              onClick={() => setActiveModule('inventory')}
              className={`flex items-center gap-3 cursor-pointer group py-1 rounded-xl transition ${
                sidebarHovered ? 'px-2 hover:bg-gray-50 dark:hover:bg-[#161F33]' : 'justify-center'
              }`}
              title="Repuestos Sotomayor, C.A."
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gray-50 dark:bg-[#161F33] group-hover:bg-orange-50 dark:group-hover:bg-[#1f293d] border border-transparent dark:border-[#28354D] transition relative shrink-0">
                <div className="w-7 h-7 rounded-full border-[3px] border-[#FF5C1B] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-gray-900 dark:bg-white group-hover:scale-125 transition" />
                </div>
                <span className="absolute -bottom-0.5 right-1 w-2 h-2 rounded-full bg-gray-900 dark:bg-[#FF5C1B]" />
              </div>
              {sidebarHovered && (
                <div className="flex flex-col min-w-0 animate-fadeIn">
                  <span className="font-extrabold text-xs text-gray-900 dark:text-white tracking-tight leading-tight truncate">
                    Repuestos Sotomayor
                  </span>
                  <span className="text-[10px] text-gray-400 dark:text-slate-400 font-medium tracking-tight truncate">
                    Mayorista & Distribución
                  </span>
                </div>
              )}
            </div>

            {/* Botón Naranja de Acción Rápida: Iniciar Nueva Factura */}
            <UseAnimations
              animation={fileTextAnimation}
              size={18}
              strokeColor="#FFFFFF"
              interaction="hover-replay"
              render={(eventProps, animationProps) => (
                <button
                  {...eventProps}
                  onClick={(e) => {
                    eventProps.onClick?.(e);
                    setActiveModule('invoicing');
                  }}
                  title="Iniciar Nueva Factura"
                  className={`group h-10 rounded-xl bg-[#FF5C1B] hover:bg-[#ff4600] text-white flex items-center transition-all duration-200 shadow-md shadow-orange-500/20 transform active:scale-95 cursor-pointer ${
                    sidebarHovered ? 'w-full px-3 gap-2.5 justify-start' : 'w-10 mx-auto justify-center'
                  }`}
                >
                  <div className="shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-115">
                    <span {...animationProps} />
                  </div>
                  {sidebarHovered && (
                    <span className="text-xs font-bold whitespace-nowrap animate-fadeIn">
                      Nueva Factura
                    </span>
                  )}
                </button>
              )}
            />

            {/* Iconos de Navegación Animados */}
            <nav className="flex flex-col gap-1.5 w-full mt-1">
              {/* Inventario */}
              <UseAnimations
                animation={packageAnimation}
                size={22}
                strokeColor={activeModule === 'inventory' ? (isDarkMode ? '#FFFFFF' : '#111827') : (isDarkMode ? '#8B9BB4' : '#6B7280')}
                interaction="hover-replay"
                render={(eventProps, animationProps) => (
                  <button
                    {...eventProps}
                    onClick={(e) => {
                      eventProps.onClick?.(e);
                      setActiveModule('inventory');
                    }}
                    title="Inventario Mayorista"
                    className={`group w-full h-10 rounded-xl flex items-center transition cursor-pointer ${
                      sidebarHovered ? 'px-3 justify-between' : 'justify-center'
                    } ${
                      activeModule === 'inventory'
                        ? 'bg-gray-100 dark:bg-[#161F33] text-gray-900 dark:text-white border border-transparent dark:border-[#28354D] font-bold shadow-2xs'
                        : 'text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#161F33]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-115">
                        <span {...animationProps} />
                      </div>
                      {sidebarHovered && (
                        <span className="text-xs font-semibold truncate animate-fadeIn group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                          Inventario y Stock
                        </span>
                      )}
                    </div>
                    {sidebarHovered && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-gray-200 dark:bg-[#1E293B] text-gray-700 dark:text-slate-300 animate-fadeIn">
                        {products.length}
                      </span>
                    )}
                  </button>
                )}
              />

              {/* Facturación */}
              <UseAnimations
                animation={fileTextAnimation}
                size={22}
                strokeColor={activeModule === 'invoicing' ? (isDarkMode ? '#FFFFFF' : '#111827') : (isDarkMode ? '#8B9BB4' : '#6B7280')}
                interaction="hover-replay"
                render={(eventProps, animationProps) => (
                  <button
                    {...eventProps}
                    onClick={(e) => {
                      eventProps.onClick?.(e);
                      setActiveModule('invoicing');
                    }}
                    title="Emitir Facturas / Notas Mayoristas"
                    className={`group w-full h-10 rounded-xl flex items-center transition relative cursor-pointer ${
                      sidebarHovered ? 'px-3 justify-between' : 'justify-center'
                    } ${
                      activeModule === 'invoicing'
                        ? 'bg-gray-100 dark:bg-[#161F33] text-gray-900 dark:text-white border border-transparent dark:border-[#28354D] font-bold shadow-2xs'
                        : 'text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#161F33]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="shrink-0 relative flex items-center justify-center transition-transform duration-200 group-hover:scale-115">
                        <span {...animationProps} />
                        {!sidebarHovered && invoiceCart.length > 0 && (
                          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#FF5C1B]" />
                        )}
                      </div>
                      {sidebarHovered && (
                        <span className="text-xs font-semibold truncate animate-fadeIn group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                          Facturación Mayorista
                        </span>
                      )}
                    </div>
                    {sidebarHovered && invoiceCart.length > 0 && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950/60 text-[#FF5C1B] animate-fadeIn">
                        {invoiceCart.length} ítems
                      </span>
                    )}
                  </button>
                )}
              />

              {/* Recepción de Mercancía */}
              <UseAnimations
                animation={truckAnimation}
                size={22}
                strokeColor={activeModule === 'receiving' ? (isDarkMode ? '#FFFFFF' : '#111827') : (isDarkMode ? '#8B9BB4' : '#6B7280')}
                interaction="hover-replay"
                render={(eventProps, animationProps) => (
                  <button
                    {...eventProps}
                    onClick={(e) => {
                      eventProps.onClick?.(e);
                      setActiveModule('receiving');
                    }}
                    title="Ingreso de Mercancía / Compras"
                    className={`group w-full h-10 rounded-xl flex items-center transition cursor-pointer ${
                      sidebarHovered ? 'px-3 justify-start' : 'justify-center'
                    } ${
                      activeModule === 'receiving'
                        ? 'bg-gray-100 dark:bg-[#161F33] text-gray-900 dark:text-white border border-transparent dark:border-[#28354D] font-bold shadow-2xs'
                        : 'text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#161F33]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-115">
                        <span {...animationProps} />
                      </div>
                      {sidebarHovered && (
                        <span className="text-xs font-semibold truncate animate-fadeIn group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                          Recepción de Lotes
                        </span>
                      )}
                    </div>
                  </button>
                )}
              />

              {/* Cuentas por Cobrar (CxC) */}
              <UseAnimations
                animation={clipboardAnimation}
                size={22}
                strokeColor={activeModule === 'cxc' ? (isDarkMode ? '#FFFFFF' : '#111827') : (isDarkMode ? '#8B9BB4' : '#6B7280')}
                interaction="hover-replay"
                render={(eventProps, animationProps) => (
                  <button
                    {...eventProps}
                    onClick={(e) => {
                      eventProps.onClick?.(e);
                      setActiveModule('cxc');
                    }}
                    title="Cuentas por Cobrar & Abonos"
                    className={`group w-full h-10 rounded-xl flex items-center transition relative cursor-pointer ${
                      sidebarHovered ? 'px-3 justify-between' : 'justify-center'
                    } ${
                      activeModule === 'cxc'
                        ? 'bg-gray-100 dark:bg-[#161F33] text-gray-900 dark:text-white border border-transparent dark:border-[#28354D] font-bold shadow-2xs'
                        : 'text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#161F33]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="shrink-0 relative flex items-center justify-center transition-transform duration-200 group-hover:scale-115">
                        <span {...animationProps} />
                        {!sidebarHovered && pendingInvoicesCount > 0 && (
                          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        )}
                      </div>
                      {sidebarHovered && (
                        <span className="text-xs font-semibold truncate animate-fadeIn group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                          Cuentas por Cobrar
                        </span>
                      )}
                    </div>
                    {sidebarHovered && pendingInvoicesCount > 0 && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400 animate-fadeIn">
                        {pendingInvoicesCount} pend.
                      </span>
                    )}
                  </button>
                )}
              />

              {/* Comisiones */}
              <UseAnimations
                animation={usersAnimation}
                size={22}
                strokeColor={activeModule === 'commissions' ? (isDarkMode ? '#FFFFFF' : '#111827') : (isDarkMode ? '#8B9BB4' : '#6B7280')}
                interaction="hover-replay"
                render={(eventProps, animationProps) => (
                  <button
                    {...eventProps}
                    onClick={(e) => {
                      eventProps.onClick?.(e);
                      setActiveModule('commissions');
                    }}
                    title="Comisiones de Vendedores"
                    className={`group w-full h-10 rounded-xl flex items-center transition cursor-pointer ${
                      sidebarHovered ? 'px-3 justify-start' : 'justify-center'
                    } ${
                      activeModule === 'commissions'
                        ? 'bg-gray-100 dark:bg-[#161F33] text-gray-900 dark:text-white border border-transparent dark:border-[#28354D] font-bold shadow-2xs'
                        : 'text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#161F33]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-115">
                        <span {...animationProps} />
                      </div>
                      {sidebarHovered && (
                        <span className="text-xs font-semibold truncate animate-fadeIn group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                          Comisiones Vendedores
                        </span>
                      )}
                    </div>
                  </button>
                )}
              />

              {/* Estadísticas y Analítica */}
              <UseAnimations
                animation={activityAnimation}
                size={22}
                strokeColor={activeModule === 'analytics' ? (isDarkMode ? '#FFFFFF' : '#111827') : (isDarkMode ? '#8B9BB4' : '#6B7280')}
                interaction="hover-replay"
                render={(eventProps, animationProps) => (
                  <button
                    {...eventProps}
                    onClick={(e) => {
                      eventProps.onClick?.(e);
                      setActiveModule('analytics');
                    }}
                    title="Estadísticas y Analítica de Negocio"
                    className={`group w-full h-10 rounded-xl flex items-center transition cursor-pointer ${
                      sidebarHovered ? 'px-3 justify-start' : 'justify-center'
                    } ${
                      activeModule === 'analytics'
                        ? 'bg-gray-100 dark:bg-[#161F33] text-gray-900 dark:text-white border border-transparent dark:border-[#28354D] font-bold shadow-2xs'
                        : 'text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#161F33]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-115">
                        <span {...animationProps} />
                      </div>
                      {sidebarHovered && (
                        <span className="text-xs font-semibold truncate animate-fadeIn group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                          Estadísticas y Analítica
                        </span>
                      )}
                    </div>
                  </button>
                )}
              />

              {/* Clientes */}
              <UseAnimations
                animation={shoppingBagAnimation}
                size={22}
                strokeColor={activeModule === 'clients' ? (isDarkMode ? '#FFFFFF' : '#111827') : (isDarkMode ? '#8B9BB4' : '#6B7280')}
                interaction="hover-replay"
                render={(eventProps, animationProps) => (
                  <button
                    {...eventProps}
                    onClick={(e) => {
                      eventProps.onClick?.(e);
                      setActiveModule('clients');
                    }}
                    title="Cartera de Clientes Mayoristas"
                    className={`group w-full h-10 rounded-xl flex items-center transition cursor-pointer ${
                      sidebarHovered ? 'px-3 justify-between' : 'justify-center'
                    } ${
                      activeModule === 'clients'
                        ? 'bg-gray-100 dark:bg-[#161F33] text-gray-900 dark:text-white border border-transparent dark:border-[#28354D] font-bold shadow-2xs'
                        : 'text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#161F33]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-115">
                        <span {...animationProps} />
                      </div>
                      {sidebarHovered && (
                        <span className="text-xs font-semibold truncate animate-fadeIn group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                          Cartera de Clientes
                        </span>
                      )}
                    </div>
                    {sidebarHovered && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-[#1E293B] text-gray-600 dark:text-slate-300 animate-fadeIn">
                        {clients.length}
                      </span>
                    )}
                  </button>
                )}
              />
            </nav>
          </div>

          {/* Iconos y Opciones Inferiores */}
          <div className="flex flex-col gap-2 w-full pt-3 border-t border-gray-100 dark:border-[#1E293B]">
            {/* Botón para Abrir Selector de 6 Temas */}
            <button
              onClick={() => setThemeModalOpen(true)}
              title="Personalizar Tema (6 temas disponibles)"
              className={`group h-10 rounded-xl flex items-center transition cursor-pointer ${
                sidebarHovered ? 'w-full px-3 gap-2.5 justify-start' : 'w-10 mx-auto justify-center'
              } bg-gray-100 dark:bg-[#161F33] text-gray-700 dark:text-slate-200 hover:bg-gray-200 dark:hover:bg-[#1c2842] border border-gray-200 dark:border-[#28354D]`}
            >
              <div className="shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-115">
                <Palette className="w-4 h-4 text-[#FF5C1B]" />
              </div>
              {sidebarHovered && (
                <div className="flex items-center justify-between w-full min-w-0 animate-fadeIn">
                  <div className="flex flex-col text-left truncate">
                    <span className="text-xs font-semibold text-gray-700 dark:text-slate-200 truncate">
                      Temas del Sistema
                    </span>
                    <span className="text-[10px] text-gray-400 dark:text-slate-400 font-mono truncate">
                      {activeTheme.name}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gray-200 dark:bg-[#1E293B] text-gray-700 dark:text-[#FF5C1B]">
                    6
                  </span>
                </div>
              )}
            </button>

            {/* Selector Rápido de Modo Oscuro / Modo Claro */}
            <button
              onClick={() => {
                if (activeTheme.isDark) {
                  setCurrentThemeId('nordic-ice');
                  showToast('Cambiado a Modo Claro (Nordic Ice)');
                } else {
                  setCurrentThemeId('deep-cobalt');
                  showToast('Cambiado a Modo Oscuro (Deep Cobalt)');
                }
              }}
              title={isDarkMode ? 'Cambiar a Modo Claro (Nordic Ice)' : 'Cambiar a Modo Oscuro (Deep Cobalt)'}
              className={`group h-10 rounded-xl flex items-center transition cursor-pointer ${
                sidebarHovered ? 'w-full px-3 gap-2.5 justify-start' : 'w-10 mx-auto justify-center'
              } ${
                isDarkMode
                  ? 'bg-[#161F33] text-amber-400 border border-[#28354D] hover:bg-[#1c2842]'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
              }`}
            >
              <div className="shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-115">
                {isDarkMode ? (
                  <Moon className="w-4 h-4 text-amber-400 fill-amber-400/20" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-500" />
                )}
              </div>
              {sidebarHovered && (
                <div className="flex items-center justify-between w-full min-w-0 animate-fadeIn">
                  <span className="text-xs font-semibold text-gray-700 dark:text-slate-200 truncate">
                    {isDarkMode ? 'Modo Oscuro' : 'Modo Claro'}
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gray-200 dark:bg-[#1E293B] text-gray-700 dark:text-amber-400">
                    {isDarkMode ? 'ON' : 'OFF'}
                  </span>
                </div>
              )}
            </button>

            {/* Pie de Firma cuando está expandida */}
            {sidebarHovered && (
              <div className="mt-1 pt-2 border-t border-gray-100 dark:border-[#1E293B] px-2 text-[10px] text-gray-400 dark:text-slate-500 flex items-center justify-between animate-fadeIn">
                <span className="font-mono">J-07590371-4</span>
                <span>Valencia, VE</span>
              </div>
            )}
          </div>
        </aside>
      </div>


      {/* ============================================================
          CONTENEDOR PRINCIPAL DERECHO
      ============================================================ */}
      <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-[#0B0F17] transition-colors">
        {/* TOP HEADER BAR */}
        <header className="h-14 border-b border-gray-200 dark:border-[#1E293B] px-6 flex items-center justify-between gap-4 bg-white/95 dark:bg-[#0E1422]/95 backdrop-blur-md sticky top-0 z-20 transition-colors">
          {/* Breadcrumb Izquierdo */}
          <div className="flex items-center gap-2 text-sm">
            <div
              onClick={() => setActiveModule('inventory')}
              className="flex items-center gap-1.5 font-semibold text-gray-700 dark:text-slate-300 cursor-pointer hover:text-black dark:hover:text-white group"
            >
              <span>Repuestos Sotomayor, C.A.</span>
              <UseAnimations
                animation={chevronDownAnimation}
                size={16}
                strokeColor={isDarkMode ? '#8B9BB4' : '#9CA3AF'}
                interaction="hover"
              />
            </div>
            <span className="text-gray-300 dark:text-slate-600">/</span>
            <span className="font-bold text-gray-900 dark:text-[#FF5C1B]">{moduleTitles[activeModule]}</span>
          </div>

          {/* Buscador Central Estilo Comando Contextual */}
          <div className="flex-1 max-w-md mx-4">
            <div className="relative flex items-center">
              <div className="absolute left-3.5 pointer-events-none flex items-center">
                <UseAnimations
                  animation={searchToXAnimation}
                  size={16}
                  strokeColor={isDarkMode ? '#8B9BB4' : '#9CA3AF'}
                />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                value={activeModule === 'cxc' ? cxcSearch : searchQuery}
                onChange={(e) => {
                  const val = e.target.value;
                  if (activeModule === 'cxc') {
                    setCxcSearch(val);
                  } else {
                    setSearchQuery(val);
                    if (activeModule !== 'inventory') setActiveModule('inventory');
                  }
                }}
                placeholder={
                  activeModule === 'cxc'
                    ? "Buscar por cliente, RIF, N° factura, vendedor o repuesto en CxC..."
                    : "Buscar repuesto, OEM, marca, categoría..."
                }
                className="w-full bg-gray-100/90 dark:bg-[#161F33] hover:bg-gray-100 dark:hover:bg-[#1a253d] focus:bg-white dark:focus:bg-[#161F33] text-xs text-gray-800 dark:text-slate-200 placeholder-gray-400 dark:placeholder-slate-500 pl-9 pr-12 py-2 rounded-full border border-transparent dark:border-[#28354D] focus:border-[#FF5C1B] dark:focus:border-[#FF5C1B] focus:outline-none transition shadow-2xs"
              />
              <div className="absolute right-3 flex items-center gap-1.5">
                {(activeModule === 'cxc' ? cxcSearch : searchQuery) ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (activeModule === 'cxc') setCxcSearch('');
                      else setSearchQuery('');
                    }}
                    className="p-1 rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-white cursor-pointer"
                    title="Limpiar búsqueda"
                  >
                    <X size={12} />
                  </button>
                ) : (
                  <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-gray-400 dark:text-slate-400 bg-gray-200 dark:bg-[#1E293B] border border-gray-300 dark:border-[#28354D] rounded pointer-events-none">
                    /
                  </kbd>
                )}
              </div>
            </div>
          </div>

          {/* Acciones Derechas: Badge Supabase + Botón Tutorial + Tasa BCV + Notificaciones + Avatar */}
          <div className="flex items-center gap-3">
            {/* BADGE DE CONEXIÓN EN VIVO A SUPABASE */}
            <div
              onClick={() => loadWholesaleDataFromSupabase(true)}
              title={
                supabaseSyncStatus === 'online'
                  ? 'Base de datos Supabase conectada y en línea. Haz clic para refrescar.'
                  : supabaseSyncStatus === 'syncing'
                  ? 'Sincronizando operaciones con Supabase...'
                  : 'Modo local (sin conexión a Supabase). Haz clic para reintentar.'
              }
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition shadow-2xs cursor-pointer select-none ${
                supabaseSyncStatus === 'online'
                  ? 'bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/60'
                  : supabaseSyncStatus === 'syncing'
                  ? 'bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/60 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/60 animate-pulse'
                  : 'bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800/60'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  supabaseSyncStatus === 'online'
                    ? 'bg-emerald-500'
                    : supabaseSyncStatus === 'syncing'
                    ? 'bg-amber-500 animate-ping'
                    : 'bg-rose-500'
                }`}
              />
              <Database className="w-3.5 h-3.5" />
              <span className="hidden md:inline">
                {supabaseSyncStatus === 'online'
                  ? 'Supabase En Línea'
                  : supabaseSyncStatus === 'syncing'
                  ? 'Sincronizando...'
                  : 'Modo Local'}
              </span>
            </div>

            {/* BOTÓN DE TUTORIAL Y GUÍA DEL SISTEMA */}
            <button
              type="button"
              onClick={() => setTutorialModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 hover:bg-orange-100 dark:bg-orange-950/40 dark:hover:bg-orange-900/60 border border-orange-200 dark:border-orange-800/60 text-[#FF5C1B] hover:text-[#ff4600] text-xs font-bold transition shadow-2xs hover:shadow-xs cursor-pointer group"
              title="Abrir Tutorial y Guía Interactiva del Sistema"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#FF5C1B] group-hover:scale-110 transition-transform" />
              <span>Tutorial</span>
              <span className="hidden md:inline-block text-[10px] bg-orange-100 dark:bg-orange-900/60 text-[#FF5C1B] px-1.5 py-0.2 rounded-full font-mono">
                Guía
              </span>
            </button>

            {/* CONMUTADOR INTELIGENTE DE TASA CAMBIARIA (BINANCE P2P / BCV / MANUAL) */}
            <div className="relative">
              <div className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full border transition shadow-xs ${
                rateMode === 'binance'
                  ? 'bg-amber-50 dark:bg-[#1C180A] hover:bg-amber-100/70 dark:hover:bg-[#2A230F] border-amber-300 dark:border-amber-500/40'
                  : rateMode === 'bcv'
                  ? 'bg-emerald-50 dark:bg-[#0D241E] hover:bg-emerald-100/70 dark:hover:bg-[#102e26] border-emerald-300 dark:border-emerald-500/40'
                  : 'bg-orange-50 dark:bg-orange-950/40 hover:bg-orange-100/70 dark:hover:bg-orange-900/40 border-orange-300 dark:border-orange-500/40'
              }`}>
                <button
                  onClick={() => setRateDropdownOpen(!rateDropdownOpen)}
                  className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
                  title="Haz clic para cambiar entre Binance P2P, BCV o Tasa Manual"
                >
                  <span className={`w-2 h-2 rounded-full animate-pulse ${
                    rateMode === 'binance' ? 'bg-amber-500' : rateMode === 'bcv' ? 'bg-emerald-500' : 'bg-orange-500'
                  }`} />
                  
                  {rateMode === 'binance' && (
                    <span className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1">
                      <BinanceIcon className="w-3.5 h-3.5 text-amber-500" />
                      <span>P2P Binance: Bs. {bcvRate.toFixed(2)}</span>
                    </span>
                  )}
                  {rateMode === 'bcv' && (
                    <span className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1">
                      <span>🇻🇪 BCV: Bs. {bcvRate.toFixed(2)}</span>
                    </span>
                  )}
                  {rateMode === 'manual' && (
                    <span className="font-bold text-orange-900 dark:text-orange-300 flex items-center gap-1">
                      <span>✏️ Manual: Bs. {bcvRate.toFixed(2)}</span>
                    </span>
                  )}

                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 dark:text-slate-400 ml-0.5" />
                </button>

                <div className="h-3 w-px bg-gray-300 dark:bg-slate-700 mx-0.5" />

                <button
                  onClick={() => fetchAllRates(true)}
                  disabled={rateLoading}
                  title="Actualizar tasas en vivo (Binance P2P y BCV)"
                  className="text-gray-500 hover:text-amber-600 dark:text-slate-400 dark:hover:text-amber-300 cursor-pointer flex items-center p-0.5 transition"
                >
                  <div className={rateLoading ? 'animate-spin' : ''}>
                    <UseAnimations
                      animation={rotateCcwAnimation}
                      size={14}
                      strokeColor={rateLoading ? '#F59E0B' : (isDarkMode ? '#CBD5E1' : '#6B7280')}
                      interaction="hover-replay"
                    />
                  </div>
                </button>
              </div>

              {/* DROPDOWN FLOTANTE DEL CONMUTADOR */}
              {rateDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setRateDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-84 bg-white dark:bg-[#121929] border border-gray-200 dark:border-[#1E293B] rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100 dark:border-slate-800">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800 dark:text-white">
                        <DollarSign className="w-4 h-4 text-emerald-500" />
                        <span>Conmutador de Tasa ($/Bs.)</span>
                      </div>
                      <button
                        onClick={() => fetchAllRates(true)}
                        disabled={rateLoading}
                        className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                      >
                        <RefreshCw className={`w-3 h-3 ${rateLoading ? 'animate-spin' : ''}`} />
                        <span>Refrescar</span>
                      </button>
                    </div>

                    {/* Opción 1: Binance P2P USDT */}
                    <button
                      onClick={() => handleSelectRateMode('binance')}
                      className={`w-full text-left p-2.5 rounded-xl transition flex items-start justify-between mb-1.5 cursor-pointer border ${
                        rateMode === 'binance'
                          ? 'bg-amber-500/10 border-amber-500/40 text-amber-950 dark:text-amber-200'
                          : 'hover:bg-gray-50 dark:hover:bg-slate-800/60 border-transparent text-gray-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-500 mt-0.5">
                          <BinanceIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold">Binance P2P USDT</span>
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400">
                              Mercado
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-500 dark:text-slate-400 mt-0.5">
                            Promedio compra en tiempo real
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-500 dark:text-slate-400">
                            <span>Compra: <b>Bs. {binanceRate.toFixed(2)}</b></span>
                            {binanceBidRate > 0 && <span>• Venta: <b>Bs. {binanceBidRate.toFixed(2)}</b></span>}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-mono font-bold text-gray-900 dark:text-white block">
                          Bs. {binanceRate.toFixed(2)}
                        </span>
                        {rateMode === 'binance' && (
                          <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">✓ Activa</span>
                        )}
                      </div>
                    </button>

                    {/* Opción 2: BCV Oficial */}
                    <button
                      onClick={() => handleSelectRateMode('bcv')}
                      className={`w-full text-left p-2.5 rounded-xl transition flex items-start justify-between mb-1.5 cursor-pointer border ${
                        rateMode === 'bcv'
                          ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-950 dark:text-emerald-200'
                          : 'hover:bg-gray-50 dark:hover:bg-slate-800/60 border-transparent text-gray-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-500 mt-0.5 text-xs font-bold flex items-center justify-center w-7 h-7">
                          🇻🇪
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold">Tasa Oficial BCV</span>
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                              Fiscal
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-500 dark:text-slate-400 mt-0.5">
                            Banco Central de Venezuela
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-mono font-bold text-gray-900 dark:text-white block">
                          Bs. {bcvOfficialRate.toFixed(2)}
                        </span>
                        {rateMode === 'bcv' && (
                          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">✓ Activa</span>
                        )}
                      </div>
                    </button>

                    {/* Opción 3: Tasa Manual */}
                    <div className={`p-2.5 rounded-xl border transition ${
                      rateMode === 'manual'
                        ? 'bg-orange-500/10 border-orange-500/40'
                        : 'border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/40'
                    }`}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-gray-800 dark:text-slate-200 flex items-center gap-1.5">
                          <span>✏️ Tasa Personalizada</span>
                        </span>
                        {rateMode === 'manual' && (
                          <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400">✓ Activa</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          step="0.01"
                          value={manualInputVal}
                          onChange={(e) => setManualInputVal(e.target.value)}
                          placeholder="Ej. 1020.00"
                          className="flex-1 text-xs font-mono font-bold px-2.5 py-1 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-[#0E1422] text-gray-900 dark:text-white focus:outline-none focus:border-orange-500"
                        />
                        <button
                          onClick={() => handleSelectRateMode('manual', parseFloat(manualInputVal) || manualRate)}
                          className="px-3 py-1 text-xs font-bold rounded-lg bg-orange-600 hover:bg-orange-700 text-white cursor-pointer shadow-xs transition"
                        >
                          Aplicar
                        </button>
                      </div>
                    </div>

                    {/* Footer con Brecha Cambiaria */}
                    <div className="mt-2.5 pt-2 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-gray-400 dark:text-slate-400 px-1">
                      <span>
                        Brecha P2P vs BCV: <b className="text-amber-500">+{(((binanceRate - bcvOfficialRate) / bcvOfficialRate) * 100).toFixed(1)}%</b>
                      </span>
                      <span>{rateMode === 'binance' ? (binanceLastUpdated || 'P2P Binance') : (bcvLastUpdated || 'BCV Oficial')}</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() => {
                setActiveCategoryTab('Stock Crítico');
                setActiveModule('inventory');
              }}
              className="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#161F33] hover:bg-gray-200 dark:hover:bg-[#1e2a44] border border-transparent dark:border-[#28354D] flex items-center justify-center text-gray-500 dark:text-slate-300 relative transition cursor-pointer"
              title="Ver Alertas de Stock Bajo"
            >
              <Bell className="w-4 h-4 text-gray-600 dark:text-slate-300" />
              {products.some(p => p.stock <= p.minStock) && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF5C1B] rounded-full animate-pulse" />
              )}
            </button>
          </div>
        </header>

        {/* ============================================================
            MÓDULO 1: INVENTARIO
        ============================================================ */}
        {activeModule === 'inventory' && (
          <main className="flex-1 flex flex-col px-8 py-6 overflow-y-auto">
            {/* Cabecera del Módulo de Inventario */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-[#FF5C1B] flex items-center justify-center shadow-xs">
                  <Boxes className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
                    Catálogo e Inventario Mayorista
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-slate-400">
                    Control de existencias bicanal, precios al mayor en USD y equivalentes BCV
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setActiveModule('invoicing')}
                  className="px-4 py-2 rounded-xl border border-gray-200 dark:border-[#28354D] hover:bg-gray-50 dark:hover:bg-[#161F33] bg-white dark:bg-[#0E1422] text-xs font-bold text-gray-700 dark:text-slate-200 flex items-center gap-2 transition shadow-2xs cursor-pointer group"
                >
                  <FilePlus className="w-4 h-4 text-gray-500 dark:text-slate-400 group-hover:text-[#FF5C1B] transition-colors" />
                  <span>Nueva Factura</span>
                </button>

                <button
                  onClick={() => setActiveModule('receiving')}
                  className="bg-[#FF5C1B] hover:bg-[#ff4600] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md shadow-orange-500/20 transition cursor-pointer group"
                >
                  <Plus className="w-4 h-4" />
                  <span>Ingresar Mercancía</span>
                </button>
              </div>
            </div>

            {/* Selector de Canal: Solo Mayorista vs Catálogo General */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-1.5 p-1 bg-gray-100 dark:bg-[#0E1422] rounded-xl border border-transparent dark:border-[#1E293B] text-xs font-bold w-fit">
                <button
                  onClick={() => setCatalogFilterMode('wholesale')}
                  className={`px-3.5 py-2 rounded-lg flex items-center gap-2 transition cursor-pointer ${
                    catalogFilterMode === 'wholesale'
                      ? 'bg-[#FF5C1B] text-white shadow-md shadow-orange-500/20'
                      : 'text-gray-500 dark:text-slate-400 hover:text-gray-800 dark:hover:text-white'
                  }`}
                  title="Ver únicamente los repuestos marcados como disponibles en mayorista"
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>Disponibles en Mayorista</span>
                  <span className={`px-1.5 py-0.2 rounded-full font-mono text-[10px] ${
                    catalogFilterMode === 'wholesale' ? 'bg-black/25 text-white' : 'bg-gray-200 dark:bg-[#1E293B] text-gray-700 dark:text-slate-300'
                  }`}>
                    {products.filter(p => p.isWholesale).length.toLocaleString()}
                  </span>
                </button>

                <button
                  onClick={() => setCatalogFilterMode('all')}
                  className={`px-3.5 py-2 rounded-lg flex items-center gap-2 transition cursor-pointer ${
                    catalogFilterMode === 'all'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'text-gray-500 dark:text-slate-400 hover:text-gray-800 dark:hover:text-white'
                  }`}
                  title="Ver todos los repuestos del Cotizador para habilitar piezas al canal mayorista"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Catálogo General Sotomayor</span>
                  <span className={`px-1.5 py-0.2 rounded-full font-mono text-[10px] ${
                    catalogFilterMode === 'all' ? 'bg-black/25 text-white' : 'bg-gray-200 dark:bg-[#1E293B] text-gray-700 dark:text-slate-300'
                  }`}>
                    {products.length.toLocaleString()}
                  </span>
                </button>
              </div>
            </div>

            {/* Pills de Categorías con Stock Crítico destacado */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 text-xs">
              {categoryTabs.map(
                (tab) => {
                  const isActive = activeCategoryTab === tab;
                  const isCritical = tab === 'Stock Crítico';
                  const criticalCount = products.filter(p => (catalogFilterMode === 'all' || p.isWholesale) && p.stock <= p.minStock).length;

                  if (isCritical) {
                    return (
                      <button
                        key={tab}
                        onClick={() => setActiveCategoryTab(tab)}
                        className={`px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 border transition cursor-pointer shrink-0 ${
                          isActive
                            ? 'bg-red-500 text-white border-red-500 shadow-sm'
                            : 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/40 hover:bg-red-100 dark:hover:bg-red-900/40'
                        }`}
                      >
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Stock Crítico</span>
                        <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                          isActive ? 'bg-black/25 text-white' : 'bg-red-200/60 dark:bg-red-900/60 text-red-700 dark:text-red-300'
                        }`}>
                          {criticalCount}
                        </span>
                      </button>
                    );
                  }

                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveCategoryTab(tab)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer border shrink-0 ${
                        isActive
                          ? 'bg-gray-900 dark:bg-[#161F33] text-white border-gray-900 dark:border-[#28354D] shadow-xs'
                          : 'bg-white dark:bg-[#161F33]/40 text-gray-600 dark:text-slate-400 border-gray-200 dark:border-[#1E293B] hover:bg-gray-50 dark:hover:bg-[#161F33] hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      {tab}
                    </button>
                  );
                }
              )}
            </div>

            {/* Barra de Filtros Secundaria */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex flex-wrap items-center gap-2">
                {/* Filtro Marca */}
                <select
                  value={selectedSupplier}
                  onChange={(e) => setSelectedSupplier(e.target.value)}
                  className="text-xs border border-gray-200 dark:border-[#1E293B] rounded-xl px-3 py-1.5 bg-white dark:bg-[#0E1422] text-gray-700 dark:text-slate-300 font-medium hover:bg-gray-50 dark:hover:bg-[#161F33] focus:outline-none focus:border-orange-500 cursor-pointer shadow-2xs"
                >
                  {suppliersList.map(sup => (
                    <option key={sup} value={sup} className="bg-white dark:bg-[#0E1422] text-gray-900 dark:text-slate-200">
                      {sup === 'Todos' ? 'Marca: Todas las Marcas' : `Marca: ${sup}`}
                    </option>
                  ))}
                </select>

                {/* Filtro Nivel de Stock */}
                <select
                  value={selectedStockLevel}
                  onChange={(e) => setSelectedStockLevel(e.target.value)}
                  className="text-xs border border-gray-200 dark:border-[#1E293B] rounded-xl px-3 py-1.5 bg-white dark:bg-[#0E1422] text-gray-700 dark:text-slate-300 font-medium hover:bg-gray-50 dark:hover:bg-[#161F33] focus:outline-none focus:border-orange-500 cursor-pointer shadow-2xs"
                >
                  <option value="Todos" className="bg-white dark:bg-[#0E1422] text-gray-900 dark:text-slate-200">Nivel de Stock: Todos</option>
                  <option value="Alto" className="bg-white dark:bg-[#0E1422] text-gray-900 dark:text-slate-200">Nivel de Stock: Óptimo</option>
                  <option value="Bajo" className="bg-white dark:bg-[#0E1422] text-gray-900 dark:text-slate-200">Nivel de Stock: Bajo / Crítico</option>
                  <option value="Agotado" className="bg-white dark:bg-[#0E1422] text-gray-900 dark:text-slate-200">Nivel de Stock: Agotado</option>
                </select>

                {/* Filtro Categoría */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="text-xs border border-gray-200 dark:border-[#1E293B] rounded-xl px-3 py-1.5 bg-white dark:bg-[#0E1422] text-gray-700 dark:text-slate-300 font-medium hover:bg-gray-50 dark:hover:bg-[#161F33] focus:outline-none focus:border-orange-500 cursor-pointer shadow-2xs"
                >
                  {categoriesList.map(cat => (
                    <option key={cat} value={cat} className="bg-white dark:bg-[#0E1422] text-gray-900 dark:text-slate-200">
                      {cat === 'Todas' ? 'Categoría: Todas' : `Categoría: ${cat}`}
                    </option>
                  ))}
                </select>

                <span className="text-xs text-gray-500 dark:text-slate-400 font-medium ml-2">
                  Mostrando <b>{Math.min(filteredProducts.length, pageSize)}</b> de <b>{filteredProducts.length.toLocaleString()}</b> repuestos
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportCsv}
                  className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#0E1422] hover:bg-gray-50 dark:hover:bg-[#161F33] border border-gray-200 dark:border-[#1E293B] text-xs font-bold text-gray-700 dark:text-slate-200 flex items-center gap-2 transition cursor-pointer shadow-2xs group"
                >
                  <Download className="w-3.5 h-3.5 text-gray-500 dark:text-slate-400 group-hover:text-[#FF5C1B] transition-colors" />
                  <span>Exportar CSV</span>
                </button>
              </div>
            </div>

            {/* TABLA PRINCIPAL DE INVENTARIO */}
            <div className="border border-gray-200 dark:border-[#1E293B] rounded-2xl bg-white dark:bg-[#0E1422] shadow-sm overflow-hidden transition-colors">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-[#1E293B] bg-gray-50/70 dark:bg-[#12192B] text-[11px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                      <th className="py-3.5 pl-4 pr-3">
                        <div className="flex items-center gap-1.5">
                          <span>REPUESTO / DESCRIPCIÓN</span>
                          <ArrowUpDown className="w-3 h-3 text-gray-400" />
                        </div>
                      </th>
                      <th className="py-3.5 px-3">
                        <div className="flex items-center gap-1.5">
                          <span>SKU / OEM</span>
                          <ArrowUpDown className="w-3 h-3 text-gray-400" />
                        </div>
                      </th>
                      <th className="py-3.5 px-3">CATEGORÍA</th>
                      <th className="py-3.5 px-3">MARCA</th>
                      <th className="py-3.5 px-3 text-center" title="Habilitar o deshabilitar repuesto para el canal mayorista">
                        CANAL MAYORISTA
                      </th>
                      <th className="py-3.5 px-3">STOCK MAYORISTA</th>
                      {catalogFilterMode === 'all' ? (
                        <>
                          <th className="py-3.5 px-3">COSTO EN EL COTIZADOR</th>
                          <th className="py-3.5 px-3">PRECIO DE VENTA AL DETAL</th>
                        </>
                      ) : (
                        <th className="py-3.5 px-3">COSTO MAYORISTA</th>
                      )}
                      <th className="py-3.5 px-3 text-right">PRECIO MAYORISTA</th>
                      <th className="py-3.5 pl-2 pr-4 text-center">ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-[#1A2338] text-xs">
                    {isLoadingSupabase && products.length === 0 ? (
                      <tr>
                        <td colSpan={catalogFilterMode === 'all' ? 10 : 9} className="py-16 text-center text-gray-500 dark:text-slate-400">
                          <div className="flex flex-col items-center justify-center gap-3">
                            <div className="w-8 h-8 border-3 border-[#FF5C1B] border-t-transparent rounded-full animate-spin" />
                            <span className="font-semibold text-sm">Cargando catálogo oficial de repuestos desde Supabase...</span>
                          </div>
                        </td>
                      </tr>
                    ) : paginatedProducts.length === 0 ? (
                      <tr>
                        <td colSpan={catalogFilterMode === 'all' ? 10 : 9} className="py-12 text-center text-gray-400 dark:text-slate-500">
                          <p className="font-semibold text-sm">No se encontraron repuestos con los filtros aplicados</p>
                          <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">Prueba cambiando los términos de búsqueda o cambiando el selector a "Catálogo General".</p>
                        </td>
                      </tr>
                    ) : (
                      paginatedProducts.map((product) => {
                        const wStock = product.wholesaleStock ?? product.stock;
                        const wCost = product.wholesaleCost ?? product.cost;
                        const wPrice = product.wholesalePrice ?? product.price;

                        return (
                          <tr
                            key={product.id}
                            className="hover:bg-gray-50/80 dark:hover:bg-[#161F33]/80 transition group relative"
                          >
                            {/* Columna 1: Miniatura + Nombre */}
                            <td className="py-3 pl-4 pr-3">
                              <div className="flex items-center gap-3">
                                {product.imageUrl ? (
                                  <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-10 h-10 rounded-xl object-cover border border-gray-200 dark:border-[#28354D] shrink-0 bg-white dark:bg-[#161F33]"
                                    onError={(e) => {
                                      (e.target as HTMLElement).style.display = 'none';
                                    }}
                                  />
                                ) : (
                                  <div
                                    className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-[#161F33] border border-gray-200 dark:border-[#28354D] flex items-center justify-center shrink-0 text-gray-700 dark:text-orange-400 font-bold text-xs font-mono"
                                  >
                                    {product.sku.slice(0, 3)}
                                  </div>
                                )}
                                <div>
                                  <div className="font-bold text-gray-900 dark:text-white leading-snug">
                                    {product.name}
                                  </div>
                                  <div className="text-[11px] text-gray-400 dark:text-slate-400 mt-0.5 font-medium">
                                    <span>{getProductSystem(product)}</span>
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Columna 2: SKU */}
                            <td className="py-3 px-3 whitespace-nowrap">
                              <div className="font-mono font-bold text-xs text-gray-800 dark:text-orange-400">
                                {product.sku}
                              </div>
                            </td>

                            {/* Columna 3: Categoría */}
                            <td className="py-3 px-3 whitespace-nowrap">
                              <span className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-[#161F33] border border-transparent dark:border-[#28354D] text-gray-700 dark:text-slate-300 font-medium text-[11px]">
                                {product.category}
                              </span>
                            </td>

                            {/* Columna 4: Marca / Proveedor */}
                            <td className="py-3 px-3 whitespace-nowrap">
                              {product.supplierLogo ? (
                                <div
                                  title={product.supplier}
                                  className="w-16 h-7 rounded-md bg-white border border-gray-200 dark:border-[#28354D] p-1 flex items-center justify-center shadow-2xs hover:shadow-xs transition shrink-0 cursor-default"
                                >
                                  <img
                                    src={product.supplierLogo}
                                    alt={product.supplier}
                                    className="max-w-full max-h-full object-contain"
                                    onError={(e) => {
                                      (e.currentTarget as HTMLElement).style.display = 'none';
                                      const fallback = (e.currentTarget.nextElementSibling as HTMLElement);
                                      if (fallback) fallback.style.display = 'inline-block';
                                    }}
                                  />
                                  <span className="hidden text-[10px] font-bold text-gray-700 truncate">{product.supplier}</span>
                                </div>
                              ) : (
                                <div title={product.supplier} className="flex items-center gap-1.5 cursor-default">
                                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                                  <span className="text-gray-800 dark:text-slate-200 font-semibold text-xs">{product.supplier}</span>
                                </div>
                              )}
                            </td>

                            {/* Columna 5: SWITCH DISPONIBLE EN MAYORISTA */}
                            <td className="py-3 px-3 text-center whitespace-nowrap">
                              <button
                                onClick={(e) => handleToggleWholesale(product, e)}
                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border transition cursor-pointer shadow-2xs ${
                                  product.isWholesale
                                    ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60'
                                    : 'bg-gray-100 dark:bg-[#161F33] text-gray-500 dark:text-slate-400 border-gray-200 dark:border-[#28354D] hover:bg-gray-200/80 dark:hover:bg-[#1e2a44]'
                                }`}
                                title={product.isWholesale ? 'Habilitado en Mayorista (Clic para desactivar)' : 'Solo en Detal (Clic para habilitar al Mayor)'}
                              >
                                <span className={`w-2 h-2 rounded-full ${product.isWholesale ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400 dark:bg-slate-500'}`} />
                                <span>{product.isWholesale ? 'Mayorista' : 'Solo Detal'}</span>
                              </button>
                            </td>

                            {/* Columna 6: Stock Mayorista */}
                            <td className="py-3 px-3 whitespace-nowrap">
                              <div className="flex flex-col gap-0.5">
                                <div className="flex items-center gap-1.5">
                                  <Boxes className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                                  <span
                                    className={`font-mono font-bold text-xs ${
                                      wStock === 0
                                        ? 'text-red-500'
                                        : wStock <= product.minStock
                                        ? 'text-amber-500'
                                        : 'text-emerald-500'
                                    }`}
                                  >
                                    {wStock} unds. ({wStock === 0 ? 'Agotado' : wStock <= product.minStock ? 'Bajo' : 'Óptimo'})
                                  </span>
                                </div>
                                {catalogFilterMode === 'all' && (
                                  <div className="text-[10px] text-gray-400 dark:text-slate-400 pl-5">
                                    Detal: <b className="font-mono text-gray-600 dark:text-slate-300">{product.retailStock ?? 0}</b> unds.
                                  </div>
                                )}
                              </div>
                            </td>

                            {/* Columnas Dinámicas: Catálogo General vs Disponibles en Mayorista */}
                            {catalogFilterMode === 'all' ? (
                              <>
                                {/* Columna: Costo en el Cotizador */}
                                <td className="py-3 px-3 whitespace-nowrap">
                                  <span className="font-mono font-bold text-xs text-gray-900 dark:text-white">
                                    ${(product.retailCost ?? product.cost ?? 0).toFixed(2)}
                                  </span>
                                </td>

                                {/* Columna: Precio de Venta al Detal */}
                                <td className="py-3 px-3 whitespace-nowrap">
                                  <span className="font-mono font-bold text-xs text-emerald-600 dark:text-emerald-400">
                                    ${(product.retailPrice ?? product.price ?? 0).toFixed(2)}
                                  </span>
                                </td>
                              </>
                            ) : (
                              /* Columna: Costo Mayorista */
                              <td className="py-3 px-3 whitespace-nowrap">
                                <span className="font-mono font-bold text-xs text-gray-900 dark:text-white">
                                  ${wCost.toFixed(2)}
                                </span>
                              </td>
                            )}

                            {/* Columna 8: Precio Mayorista Dual con Comparativa Detal */}
                            <td className="py-3 px-3 text-right whitespace-nowrap">
                              <div className="font-black text-sm text-gray-900 dark:text-white">
                                ${wPrice.toFixed(2)}
                              </div>
                              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-medium">
                                Bs. {(wPrice * bcvRate).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </div>
                            </td>

                            {/* Columna 9: Acciones Rápidas */}
                            <td className="py-3 pl-2 pr-4 text-center whitespace-nowrap">
                              <div className="flex items-center justify-center gap-1.5">
                                {/* Configurar Mayorista */}
                                <button
                                  onClick={() => setEditingWholesaleProduct(product)}
                                  className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-[#161F33] hover:bg-orange-50 dark:hover:bg-[#1E293B] border border-gray-200 dark:border-[#28354D] text-gray-600 dark:text-slate-300 hover:text-[#FF5C1B] dark:hover:text-[#FF5C1B] flex items-center justify-center transition cursor-pointer"
                                  title="Configurar Precios, Stock y Parámetros Mayoristas"
                                >
                                  <Sliders className="w-3.5 h-3.5" />
                                </button>

                                {/* Agregar a Factura */}
                                <button
                                  onClick={() => handleSendToInvoice(product)}
                                  className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center transition cursor-pointer"
                                  title="Agregar a la Factura Mayorista"
                                >
                                  <ShoppingCart className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* BARRA DE PAGINACIÓN */}
              {filteredProducts.length > pageSize && (
                <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-t border-gray-200 dark:border-[#1E293B] bg-gray-50/70 dark:bg-[#12192B] text-xs text-gray-600 dark:text-slate-400">
                  <div className="font-medium">
                    Mostrando <b>{(currentPage - 1) * pageSize + 1}</b> a{' '}
                    <b>{Math.min(filteredProducts.length, currentPage * pageSize)}</b> de{' '}
                    <b>{filteredProducts.length.toLocaleString()}</b> repuestos sincronizados
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-[#28354D] bg-white dark:bg-[#161F33] font-semibold text-gray-800 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-[#1e2a44] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition shadow-2xs"
                    >
                      Anterior
                    </button>
                    <span className="px-2 font-bold text-gray-800 dark:text-white">
                      Página {currentPage} de {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-[#28354D] bg-white dark:bg-[#161F33] font-semibold text-gray-800 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-[#1e2a44] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition shadow-2xs"
                    >
                      Siguiente
                    </button>
                  </div>
                </div>
              )}
            </div>
          </main>
        )}

        {/* ============================================================
            MÓDULO 2: EMISIÓN DE FACTURAS MAYORISTAS Y PEDIDOS
        ============================================================ */}
        {activeModule === 'invoicing' && (
          <main className="flex-1 px-8 py-6 overflow-y-auto bg-[#F8F9FA] dark:bg-[#0B0F17] transition-colors">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Facturación y Despacho Mayorista
                </h1>
                <p className="text-xs text-gray-500 dark:text-slate-400">
                  Emite facturas o notas de entrega, descuenta del inventario y asigna la comisión al vendedor automáticamente.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setDraftsModalOpen(true)}
                  className="px-3.5 py-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-xs font-semibold text-amber-600 dark:text-amber-400 cursor-pointer flex items-center gap-1.5 transition"
                  title="Ver facturas en espera y borradores guardados"
                >
                  <FileText className="w-4 h-4 text-amber-500" />
                  <span>📂 Pedidos en Espera ({drafts.length})</span>
                </button>
                <button
                  onClick={() => setActiveModule('commissions')}
                  className="px-3.5 py-2 rounded-lg bg-white dark:bg-[#0E1422] border border-gray-200 dark:border-[#1E293B] text-xs font-semibold text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-[#161F33] cursor-pointer flex items-center gap-1.5 transition"
                >
                  <UseAnimations
                    animation={activityAnimation}
                    size={16}
                    strokeColor={isDarkMode ? '#8B9BB4' : '#4B5563'}
                    interaction="hover-replay"
                  />
                  <span>Ver Corte de Comisiones</span>
                </button>
              </div>
            </div>

            {activeDraftId && (
              <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                  <span>Modo Borrador Activo: estás editando el pedido en espera <strong className="font-mono bg-amber-200/60 dark:bg-amber-900/60 px-1.5 py-0.5 rounded">{activeDraftId}</strong></span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveDraftId(null);
                    setInvoiceCart([]);
                    setInvoiceCommissionRate('');
                    showToast('Facturador restablecido. Creando nueva factura desde cero.');
                  }}
                  className="px-2.5 py-1 text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-100 hover:bg-amber-200 dark:bg-amber-900/40 dark:hover:bg-amber-900/70 rounded-lg cursor-pointer transition"
                >
                  ✕ Descartar y crear factura nueva
                </button>
              </div>
            )}

            {clients.filter(c => !c.isDeleted).length === 0 || sellers.filter(s => !s.isDeleted && s.isActive !== false).length === 0 ? (
              <div className="bg-white dark:bg-[#0E1422] p-8 rounded-2xl border border-dashed border-gray-300 dark:border-[#28354D] text-center max-w-lg mx-auto my-8 shadow-2xs">
                <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-[#FF5C1B] flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-gray-900 dark:text-white mb-1">
                  Preparación para Facturación Mayorista
                </h3>
                <p className="text-xs text-gray-500 dark:text-slate-400 mb-6 max-w-md mx-auto">
                  Para emitir tu primera factura o nota de entrega en producción, registra al menos un cliente mayorista y un asesor comercial en el sistema.
                </p>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  {clients.filter(c => !c.isDeleted).length === 0 && (
                    <button
                      type="button"
                      onClick={() => setNewClientModalOpen(true)}
                      className="px-4 py-2 rounded-xl bg-[#FF5C1B] hover:bg-[#ff4600] text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-xs transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Registrar Primer Cliente</span>
                    </button>
                  )}
                  {sellers.filter(s => !s.isDeleted && s.isActive !== false).length === 0 && (
                    <button
                      type="button"
                      onClick={() => setNewSellerModalOpen(true)}
                      className="px-4 py-2 rounded-xl bg-gray-900 dark:bg-[#161F33] hover:bg-black dark:hover:bg-[#1e2a44] text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-xs transition border border-gray-200 dark:border-[#28354D]"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Registrar Primer Vendedor</span>
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Panel Izquierdo: Datos del Cliente, Vendedor y Líneas de Factura */}
                <div className="lg:col-span-2 space-y-5">
                {/* Tarjeta de Cabecera de Factura */}
                <div className="bg-white dark:bg-[#0E1422] p-5 rounded-xl border border-gray-200 dark:border-[#1E293B] shadow-2xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="lg:col-span-2">
                    <label className="block text-[11px] font-semibold text-gray-500 dark:text-slate-400 uppercase mb-1">
                      Cliente Mayorista
                    </label>
                    <select
                      value={selectedClientId}
                      onChange={(e) => setSelectedClientId(e.target.value)}
                      className="w-full border border-gray-200 dark:border-[#28354D] rounded-lg px-3 py-2 text-xs font-semibold text-gray-800 dark:text-white bg-gray-50/50 dark:bg-[#161F33] focus:outline-none focus:border-[#FF5C1B] cursor-pointer"
                    >
                      {clients.map(c => (
                        <option key={c.id} value={c.id} className="dark:bg-[#0E1422] dark:text-white">
                          {c.name} ({c.rif})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[11px] font-semibold text-gray-500 dark:text-slate-400 uppercase">
                        Vendedor Asignado
                      </label>
                      <button
                        type="button"
                        onClick={() => setNewSellerModalOpen(true)}
                        className="text-[10px] font-bold text-[#FF5C1B] hover:underline cursor-pointer"
                        title="Registrar nuevo asesor comercial"
                      >
                        + Nuevo
                      </button>
                    </div>
                    <select
                      value={selectedSellerId}
                      onChange={(e) => setSelectedSellerId(e.target.value)}
                      className="w-full border border-gray-200 dark:border-[#28354D] rounded-lg px-3 py-2 text-xs font-semibold text-gray-800 dark:text-white bg-gray-50/50 dark:bg-[#161F33] focus:outline-none focus:border-[#FF5C1B] cursor-pointer"
                    >
                      {sellers.filter(s => !s.isDeleted && (s.isActive !== false || s.id === selectedSellerId)).map(s => (
                        <option key={s.id} value={s.id} className="dark:bg-[#0E1422] dark:text-white">
                          {s.name} ({s.zone}) {s.isActive === false ? '(Inactivo)' : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 dark:text-slate-400 uppercase mb-1">
                      % Com. Factura
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        max="20"
                        step="0.5"
                        placeholder="0.0"
                        value={invoiceCommissionRate}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === '') {
                            setInvoiceCommissionRate('');
                            return;
                          }
                          const num = parseFloat(val);
                          if (isNaN(num)) {
                            setInvoiceCommissionRate('');
                          } else {
                            setInvoiceCommissionRate(Math.min(20, Math.max(0, num)));
                          }
                        }}
                        className="w-full border border-gray-200 dark:border-[#28354D] rounded-lg pl-3 pr-7 py-2 text-xs font-bold text-gray-900 dark:text-white bg-white dark:bg-[#161F33] focus:outline-none focus:border-[#FF5C1B]"
                      />
                      <span className="absolute right-2.5 top-2 text-xs font-bold text-gray-400">%</span>
                    </div>
                    <span className="block mt-1 text-[9px] text-gray-400 dark:text-slate-500 leading-tight">
                      Comisión asignada únicamente para esta factura
                    </span>
                  </div>

                  <div className="lg:col-span-3">
                    <label className="block text-[11px] font-semibold text-gray-500 dark:text-slate-400 uppercase mb-1">
                      Condición de Pago
                    </label>
                    <select
                      value={paymentCondition}
                      onChange={(e) => setPaymentCondition(e.target.value)}
                      className="w-full border border-gray-200 dark:border-[#28354D] rounded-lg px-3 py-2 text-xs font-medium text-gray-700 dark:text-white bg-white dark:bg-[#161F33] cursor-pointer"
                    >
                      <option className="dark:bg-[#0E1422]">Contado (Divisas / Zelle)</option>
                      <option className="dark:bg-[#0E1422]">Pago Móvil / Transferencia (BCV)</option>
                      <option className="dark:bg-[#0E1422]">Crédito 15 Días</option>
                      <option className="dark:bg-[#0E1422]">Crédito 21 Días</option>
                      <option className="dark:bg-[#0E1422]">Crédito 30 Días</option>
                    </select>
                  </div>

                  <div className="lg:col-span-2">
                    <label className="block text-[11px] font-semibold text-gray-500 dark:text-slate-400 uppercase mb-1">
                      Tipo de Documento
                    </label>
                    <select
                      value={documentType}
                      onChange={(e) => setDocumentType(e.target.value)}
                      className="w-full border border-gray-200 dark:border-[#28354D] rounded-lg px-3 py-2 text-xs font-medium text-gray-700 dark:text-white bg-white dark:bg-[#161F33] cursor-pointer"
                    >
                      <option className="dark:bg-[#0E1422]">Nota de Entrega Mayorista (Exenta)</option>
                      <option className="dark:bg-[#0E1422]">Cotización Mayorista Formal</option>
                      <option className="dark:bg-[#0E1422]">Factura Fiscal SENIAT (+16% IVA)</option>
                    </select>
                  </div>

                  {/* Dirección de Despacho / Entrega (Editable con Ciudad Asignada) */}
                  <div className="lg:col-span-5 pt-1 border-t border-gray-100 dark:border-[#1E293B]">
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[11px] font-semibold text-gray-500 dark:text-slate-400 uppercase">
                        Dirección de Despacho / Entrega
                      </label>
                      <span className="text-[10px] text-gray-400 dark:text-slate-500">
                        Ciudad asignada: <strong className="text-gray-700 dark:text-slate-300">{activeClient.city || 'Valencia, Edo. Carabobo'}</strong>
                      </span>
                    </div>
                    <input
                      type="text"
                      placeholder="Ej: Av. Bolívar Norte, Sector La Alegría, Galpón 4, Valencia, Edo. Carabobo"
                      value={invoiceDispatchAddress}
                      onChange={(e) => setInvoiceDispatchAddress(e.target.value)}
                      className="w-full border border-gray-200 dark:border-[#28354D] rounded-lg px-3 py-2 text-xs font-medium text-gray-800 dark:text-white bg-white dark:bg-[#161F33] focus:outline-none focus:border-[#FF5C1B]"
                    />
                  </div>
                </div>

                {/* Buscador para agregar repuestos a la factura */}
                <div className="bg-white dark:bg-[#0E1422] p-5 rounded-xl border border-gray-200 dark:border-[#1E293B] shadow-2xs">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">
                      Agregar Repuestos al Documento
                    </h3>
                  </div>

                  <div className="relative mb-4 flex items-center">
                    <div className="absolute left-3 pointer-events-none flex items-center">
                      <UseAnimations
                        animation={searchToXAnimation}
                        size={16}
                        strokeColor={isDarkMode ? '#8B9BB4' : '#9CA3AF'}
                      />
                    </div>
                    <input
                      type="text"
                      value={partSearchInvoice}
                      onChange={(e) => setPartSearchInvoice(e.target.value)}
                      placeholder="Escribe el nombre o SKU para añadir a la factura (ej. Kit, Mozo, TRW, MOOG)..."
                      className="w-full pl-9 pr-4 py-2 text-xs border border-gray-200 dark:border-[#28354D] rounded-lg focus:outline-none focus:border-[#FF5C1B] bg-white dark:bg-[#161F33] text-gray-900 dark:text-white"
                    />
                  </div>

                  {partSearchInvoice.trim() !== '' && (() => {
                    const filteredProducts = products.filter(
                      p =>
                        p.name.toLowerCase().includes(partSearchInvoice.toLowerCase()) ||
                        p.sku.toLowerCase().includes(partSearchInvoice.toLowerCase())
                    );

                    return (
                      <div className="mb-4 border border-gray-200 dark:border-[#28354D] rounded-xl overflow-hidden bg-gray-50/50 dark:bg-[#12192B] shadow-sm">
                        <div className="max-h-52 overflow-y-auto divide-y divide-gray-100 dark:divide-[#1E293B]">
                          {filteredProducts.length > 0 ? (
                            filteredProducts.map(prod => {
                              const isWholesale = Boolean(prod.isWholesale);
                              const wStock = prod.wholesaleStock ?? prod.stock ?? 0;
                              const hasWholesaleStock = wStock > 0;
                              const formulaBPrice = getFormulaBPrice(prod);
                              const displayPrice = isWholesale ? (prod.wholesalePrice ?? prod.price) : formulaBPrice;

                              return (
                                <div
                                  key={prod.id}
                                  className="px-3 py-2.5 flex items-center justify-between text-xs hover:bg-white dark:hover:bg-[#161F33] transition"
                                >
                                  <div>
                                    <span className="font-mono font-bold text-[#FF5C1B] mr-2">
                                      {prod.sku}
                                    </span>
                                    <span className="text-gray-700 dark:text-slate-200 font-medium">{prod.name}</span>
                                    {isWholesale ? (
                                      hasWholesaleStock ? (
                                        <span className="ml-2 text-[11px] font-bold text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/40">
                                          Mayor: {wStock} und
                                        </span>
                                      ) : (
                                        <span className="ml-2 text-[11px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800/40">
                                          Mayor: 0 und
                                        </span>
                                      )
                                    ) : (
                                      <span className="ml-2 text-[11px] font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/60 px-2 py-0.5 rounded border border-slate-300 dark:border-slate-700">
                                        No en Mayorista
                                      </span>
                                    )}
                                    <span className="ml-1.5 text-[10px] text-gray-500 dark:text-slate-400">
                                      (Detal: {prod.retailStock ?? 0})
                                    </span>
                                  </div>
                                  {isWholesale ? (
                                    <button
                                      onClick={() => {
                                        handleSendToInvoice(prod);
                                        setPartSearchInvoice('');
                                      }}
                                      className="px-2.5 py-1 rounded bg-[#FF5C1B] hover:bg-[#ff4600] text-white font-semibold text-[11px] cursor-pointer flex items-center gap-1 group shadow-xs transition"
                                    >
                                      <UseAnimations
                                        animation={plusToXAnimation}
                                        size={12}
                                        strokeColor="#FFFFFF"
                                        interaction="hover-replay"
                                      />
                                      <span>Añadir (${displayPrice.toFixed(2)})</span>
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => openExpressActivationModal(prod)}
                                      className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-600 text-white font-semibold text-[11px] cursor-pointer flex items-center gap-1.5 group shadow-xs transition"
                                      title="No está en el catálogo mayorista. Clic para activar e incorporar a la factura."
                                    >
                                      <Zap size={12} className="text-white fill-white" />
                                      <span>+ Activar y Añadir (${displayPrice.toFixed(2)})</span>
                                    </button>
                                  )}
                                </div>
                              );
                            })
                          ) : (
                            <div className="p-3 text-center text-xs text-gray-500 dark:text-slate-400">
                              No se encontraron repuestos con "{partSearchInvoice}"
                            </div>
                          )}
                        </div>

                        {/* Opción rápida: Crear repuesto nuevo directamente y añadir a la factura */}
                        <div className="p-2.5 bg-orange-50/70 dark:bg-orange-950/20 border-t border-orange-100 dark:border-orange-900/40 flex items-center justify-between gap-3">
                          <span className="text-[11px] text-gray-600 dark:text-slate-300">
                            ¿El repuesto no existe en el catálogo?
                          </span>
                          <button
                            type="button"
                            onClick={() => handleOpenCreatePartFromInvoice(partSearchInvoice)}
                            className="px-3 py-1.5 rounded-lg bg-[#FF5C1B] hover:bg-[#ff4600] text-white font-bold text-[11px] cursor-pointer flex items-center gap-1.5 shadow-xs transition"
                          >
                            <Plus size={13} />
                            <span>+ Crear Repuesto Nuevo y Añadir a la Factura</span>
                          </button>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Tabla de Ítems en la Factura */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-[#1E293B] text-[11px] text-gray-400 dark:text-slate-400 uppercase">
                          <th className="py-2">Código SKU</th>
                          <th className="py-2">Descripción del Repuesto</th>
                          <th className="py-2 text-center">Cant.</th>
                          <th className="py-2 text-right">Precio Unit.</th>
                          <th className="py-2 text-right">Subtotal</th>
                          <th className="py-2 text-right"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-[#1E293B]">
                        {invoiceCart.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="py-6 text-center text-gray-400 dark:text-slate-500 italic">
                              El carrito de la factura está vacío. Agrega repuestos usando el buscador superior o desde el inventario.
                            </td>
                          </tr>
                        ) : (
                          invoiceCart.map((item, idx) => (
                            <tr key={item.productId} className="hover:bg-gray-50/50 dark:hover:bg-[#161F33]/40">
                              <td className="py-3 font-mono font-semibold text-[#FF5C1B]">
                                {item.sku}
                              </td>
                              <td className="py-3 font-medium text-gray-900 dark:text-slate-200">
                                <span>{item.name}</span>
                                {item.isPendingWholesaleActivation && (
                                  <span className="ml-2 inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-200 dark:border-amber-800/40">
                                    <Zap size={10} className="fill-amber-500 text-amber-500" />
                                    Se activará al emitir
                                  </span>
                                )}
                              </td>
                              <td className="py-3 text-center">
                                <input
                                  type="number"
                                  min="1"
                                  value={item.qty}
                                  onChange={(e) => {
                                    const val = Math.max(1, parseInt(e.target.value) || 1);
                                    setInvoiceCart(prev =>
                                      prev.map((line, i) => (i === idx ? { ...line, qty: val } : line))
                                    );
                                  }}
                                  className="w-16 text-center border border-gray-200 dark:border-[#28354D] rounded py-1 font-semibold bg-white dark:bg-[#161F33] text-gray-900 dark:text-white"
                                />
                              </td>
                              <td className="py-3 text-right font-medium text-gray-700 dark:text-slate-300">
                                ${item.price.toFixed(2)}
                              </td>
                              <td className="py-3 text-right font-bold text-gray-900 dark:text-white">
                                ${(item.qty * item.price).toFixed(2)}
                              </td>
                              <td className="py-3 text-right">
                                <button
                                  onClick={() =>
                                    setInvoiceCart(prev => prev.filter((_, i) => i !== idx))
                                  }
                                  className="text-gray-400 hover:text-red-600 p-1 cursor-pointer flex items-center justify-end transition"
                                  title="Quitar ítem"
                                >
                                  <UseAnimations
                                    animation={trash2Animation}
                                    size={18}
                                    strokeColor={isDarkMode ? '#8B9BB4' : '#9CA3AF'}
                                    interaction="hover-replay"
                                  />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Panel Derecho: Liquidación, Totales Bimoneda y Comisión del Vendedor */}
              <div className="space-y-4">
                <div className="bg-white dark:bg-[#0E1422] p-5 rounded-xl border border-gray-200 dark:border-[#1E293B] shadow-2xs space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-100 dark:border-[#1E293B] pb-3">
                    <span className="text-xs font-bold uppercase text-gray-400 dark:text-slate-400">
                      Resumen del Documento
                    </span>
                    <span className="text-xs font-mono font-semibold text-[#FF5C1B]">
                      Tasa BCV: {bcvRate.toFixed(2)}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-gray-600 dark:text-slate-400">
                      <span>Subtotal Bruto:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">${invoiceTotals.subtotal.toFixed(2)}</span>
                    </div>
                    {invoiceTotals.discount > 0 && (
                      <div className="flex justify-between text-emerald-700 dark:text-emerald-400">
                        <span>Descuento Cliente ({activeClient?.discount || 0}%):</span>
                        <span className="font-semibold">-${invoiceTotals.discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-gray-600 dark:text-slate-400">
                      <span>IVA ({documentType.includes('IVA') ? '16%' : '0%'}):</span>
                      <span className="font-semibold text-gray-900 dark:text-white">${invoiceTotals.tax.toFixed(2)}</span>
                    </div>

                    <div className="pt-3 border-t border-gray-200 dark:border-[#1E293B] flex justify-between items-baseline">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">Total a Pagar ($):</span>
                      <span className="text-2xl font-extrabold text-gray-900 dark:text-white">
                        ${invoiceTotals.totalUsd.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center bg-gray-50 dark:bg-[#12192B] p-2.5 rounded-lg border border-gray-200/60 dark:border-[#1E293B]">
                      <span className="text-gray-500 dark:text-slate-400 font-medium">Equivalente en Bolívares:</span>
                      <span className="font-bold text-gray-800 dark:text-emerald-400 text-sm">
                        Bs. {invoiceTotals.totalBs.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>

                  {/* Tarjeta Informativa de Comisión del Vendedor */}
                  <div className="bg-orange-50/70 dark:bg-[#161F33] border border-orange-200/80 dark:border-[#FF5C1B]/30 rounded-lg p-3 text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-orange-950 dark:text-white">
                      <span>Comisión Vendedor ({activeSeller?.name})</span>
                      <span className="text-[#FF5C1B] font-mono">{invoiceCommissionRate}%</span>
                    </div>
                    <div className="flex justify-between text-orange-800 dark:text-slate-300">
                      <span>Monto acreditado por esta venta:</span>
                      <span className="font-bold text-[#FF5C1B]">
                        +${invoiceTotals.sellerCommissionUsd.toFixed(2)} (Bs. {(invoiceTotals.sellerCommissionUsd * bcvRate).toFixed(2)})
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleSaveDraft}
                      disabled={invoiceCart.length === 0}
                      className="w-1/2 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white py-3 rounded-xl font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
                      title="Guardar como borrador para continuar después. No descuenta stock."
                    >
                      <Save size={15} />
                      <span>{activeDraftId ? 'Actualizar' : 'Borrador'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleEmitInvoice}
                      disabled={invoiceCart.length === 0}
                      className="w-1/2 bg-[#FF5C1B] hover:bg-[#ff4600] disabled:opacity-40 text-white py-3 rounded-xl font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer group"
                    >
                      <UseAnimations
                        animation={checkmarkAnimation}
                        size={18}
                        strokeColor="#FFFFFF"
                        interaction="hover-replay"
                      />
                      <span>Emitir Factura</span>
                    </button>
                  </div>
                </div>

                {/* Historial reciente de facturas emitidas */}
                <div className="bg-white dark:bg-[#0E1422] p-4 rounded-xl border border-gray-200 dark:border-[#1E293B] shadow-2xs">
                  <h4 className="text-xs font-bold uppercase text-gray-400 dark:text-slate-400 mb-3">
                    Últimas Facturas Emitidas
                  </h4>
                  <div className="space-y-2.5">
                    {invoices.slice(0, 4).map(inv => (
                      <div
                        key={inv.id}
                        onClick={() => setPreviewInvoice(inv)}
                        className="p-2.5 rounded-lg border border-gray-100 dark:border-[#1E293B] hover:bg-gray-50 dark:hover:bg-[#161F33] flex items-center justify-between text-xs cursor-pointer transition group"
                      >
                        <div className="flex items-center gap-2">
                          <UseAnimations
                            animation={fileTextAnimation}
                            size={16}
                            strokeColor={isDarkMode ? '#8B9BB4' : '#9CA3AF'}
                            interaction="hover"
                          />
                          <div>
                            <div className="font-bold text-gray-900 dark:text-white">{inv.id}</div>
                            <div className="text-[11px] text-gray-500 dark:text-slate-400 truncate max-w-[150px]">
                              {inv.clientName}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-900 dark:text-white">${inv.totalUsd.toFixed(2)}</div>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                              inv.status === 'Cobrada'
                                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                                : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400'
                            }`}
                          >
                            {inv.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            )}
          </main>
        )}

        {/* ============================================================
            MÓDULO 3: RECEPCIÓN E INGRESO DE MERCANCÍA
        ============================================================ */}
        {activeModule === 'receiving' && (
          <main className="flex-1 px-8 py-6 overflow-y-auto bg-[#F8F9FA] dark:bg-[#0B0F17] transition-colors">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Ingreso de Mercancía y Compras a Proveedores
                </h1>
                <p className="text-xs text-gray-500 dark:text-slate-400">
                  Registra la llegada de contenedores o lotes nacionales, actualiza los costos reales de adquisición y alimenta el stock automáticamente.
                </p>
              </div>
              <button
                onClick={handleProcessReceipt}
                className="bg-[#FF5C1B] hover:bg-[#ff4600] text-white px-4 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 shadow-xs cursor-pointer group transition"
              >
                <UseAnimations
                  animation={downloadAnimation}
                  size={18}
                  strokeColor="#FFFFFF"
                  interaction="hover-replay"
                />
                <span>Aprobar e Ingresar Lote al Inventario</span>
              </button>
            </div>

            <div className="bg-white dark:bg-[#0E1422] p-6 rounded-2xl border border-gray-200 dark:border-[#1E293B] shadow-2xs mb-6 min-h-[520px] flex flex-col justify-between">
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 dark:text-slate-300 uppercase mb-1.5">
                      Proveedor / Fabricante
                    </label>
                    <input
                      type="text"
                      value={receiptSupplier}
                      onChange={(e) => setReceiptSupplier(e.target.value)}
                      className="w-full border border-gray-200 dark:border-[#28354D] rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-800 dark:text-white bg-white dark:bg-[#161F33] focus:outline-none focus:border-[#FF5C1B] transition shadow-2xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 dark:text-slate-300 uppercase mb-1.5">
                      Nro. Factura de Compra / Packing List
                    </label>
                    <input
                      type="text"
                      value={receiptRef}
                      onChange={(e) => setReceiptRef(e.target.value)}
                      className="w-full border border-gray-200 dark:border-[#28354D] rounded-xl px-3.5 py-2.5 text-sm font-mono text-gray-800 dark:text-white bg-white dark:bg-[#161F33] focus:outline-none focus:border-[#FF5C1B] transition shadow-2xs"
                    />
                  </div>
                  <div className="relative" ref={batchSearchContainerRef}>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold text-gray-600 dark:text-slate-300 uppercase">
                        Buscar y Añadir Repuesto al Lote
                      </label>
                      <span className="text-[11px] text-[#FF5C1B] font-semibold flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        Búsqueda Rápida
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Escribe SKU, nombre o marca (ej. CLO, pastilla, MOOG)..."
                        value={batchSearchQuery}
                        onChange={(e) => {
                          setBatchSearchQuery(e.target.value);
                          setBatchSearchOpen(true);
                        }}
                        onFocus={() => {
                          if (batchSearchQuery.trim()) setBatchSearchOpen(true);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            if (batchSearchResults.length > 0) {
                              handleAddFromTopSearch(batchSearchResults[0]);
                            } else if (batchSearchQuery.trim()) {
                              handleOpenCreatePartFromSearch(batchSearchQuery);
                            }
                          } else if (e.key === 'Escape') {
                            setBatchSearchOpen(false);
                          }
                        }}
                        className="w-full border border-gray-200 dark:border-[#28354D] rounded-xl pl-9 pr-7 py-2.5 text-sm text-gray-800 dark:text-white bg-white dark:bg-[#161F33] focus:outline-none focus:border-[#FF5C1B] transition shadow-2xs"
                      />
                      <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3 pointer-events-none" />
                      {batchSearchQuery && (
                        <button
                          type="button"
                          onClick={() => {
                            setBatchSearchQuery('');
                            setBatchSearchOpen(false);
                          }}
                          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-white text-xs cursor-pointer"
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    {/* Dropdown de resultados predictivos */}
                    {batchSearchOpen && batchSearchQuery.trim() && (
                      <div className="absolute left-0 right-0 top-full mt-1.5 bg-white dark:bg-[#0E1422] border border-gray-200 dark:border-[#28354D] rounded-xl shadow-2xl z-50 overflow-hidden divide-y divide-gray-100 dark:divide-[#1E293B] max-h-80 overflow-y-auto">
                        {batchSearchResults.length > 0 ? (
                          <>
                            <div className="px-3 py-1.5 bg-gray-50 dark:bg-[#12192B] text-[10px] font-bold text-gray-400 uppercase flex items-center justify-between">
                              <span>Coincidencias en Catálogo ({batchSearchResults.length})</span>
                              <span className="font-normal lowercase text-gray-400">Clic o [Enter] para añadir</span>
                            </div>
                            {batchSearchResults.map(prod => {
                              const isAlready = receiptItems.some(i => i.productId === prod.id || i.sku.toUpperCase() === prod.sku.toUpperCase());
                              return (
                                <div
                                  key={prod.id}
                                  onClick={() => handleAddFromTopSearch(prod)}
                                  className={`p-3 flex items-center justify-between gap-3 cursor-pointer transition ${isAlready ? 'bg-orange-50/50 dark:bg-[#1A2234]/50 opacity-80' : 'hover:bg-orange-50/60 dark:hover:bg-[#161F33]'}`}
                                >
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2 mb-0.5">
                                      <span className="font-mono font-bold text-xs text-[#FF5C1B]">{prod.sku}</span>
                                      {prod.supplierLogo ? (
                                        <div
                                          title={prod.supplier}
                                          className="w-14 h-5 rounded bg-white border border-gray-200 dark:border-[#28354D] p-0.5 flex items-center justify-center shadow-2xs shrink-0"
                                        >
                                          <img
                                            src={prod.supplierLogo}
                                            alt={prod.supplier}
                                            className="max-w-full max-h-full object-contain"
                                            onError={(e) => {
                                              (e.currentTarget as HTMLElement).style.display = 'none';
                                              const fallback = (e.currentTarget.nextElementSibling as HTMLElement);
                                              if (fallback) fallback.style.display = 'inline-block';
                                            }}
                                          />
                                          <span className="hidden text-[9px] font-bold text-gray-700">{prod.supplier}</span>
                                        </div>
                                      ) : (
                                        <span
                                          title={prod.supplier}
                                          className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold border border-gray-200 dark:border-[#28354D] bg-gray-100 dark:bg-[#161F33] text-gray-700 dark:text-slate-300"
                                        >
                                          <Tag className="w-2.5 h-2.5 text-[#FF5C1B]" />
                                          <span>{prod.supplier || 'GENÉRICO'}</span>
                                        </span>
                                      )}
                                      {isAlready && (
                                        <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-1.5 py-0.2 rounded">
                                          Ya en lote
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-xs font-semibold text-gray-900 dark:text-slate-100 truncate">
                                      {prod.name}
                                    </p>
                                  </div>
                                  <div className="text-right shrink-0">
                                    <span className="text-[11px] text-gray-400 block">Stock: {prod.wholesaleStock ?? prod.stock ?? 0}</span>
                                    <span className="text-xs font-bold text-gray-800 dark:text-white">
                                      Costo: ${(prod.wholesaleCost > 0 ? prod.wholesaleCost : prod.cost).toFixed(2)}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </>
                        ) : (
                          <div className="p-4 text-center">
                            <p className="text-xs text-gray-500 dark:text-slate-400 mb-2">
                              No se encontró ningún repuesto para "{batchSearchQuery}"
                            </p>
                            <button
                              type="button"
                              onClick={() => handleOpenCreatePartFromSearch(batchSearchQuery)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FF5C1B] hover:bg-[#ff4600] text-white text-xs font-bold rounded-lg cursor-pointer transition shadow-xs"
                            >
                              <Plus className="w-4 h-4" />
                              <span>Crear repuesto "{batchSearchQuery.toUpperCase()}" en el catálogo</span>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="overflow-x-auto flex-1 min-h-[300px]">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-[#1E293B] text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider bg-gray-50/80 dark:bg-[#12192B]">
                        <th className="py-3 px-4">SKU</th>
                        <th className="py-3 px-4">Repuesto</th>
                        <th className="py-3 px-4">Marca / Fabricante</th>
                        <th className="py-3 px-4 text-center">Cantidad que Entra</th>
                        <th className="py-3 px-4 text-right">Costo Unit. ($)</th>
                        <th className="py-3 px-4 text-right">Subtotal Lote ($)</th>
                        <th className="py-3 px-4 text-right">Precio Mayor ($)</th>
                        <th className="py-3 px-4 text-right">Acción</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-[#1E293B]">
                      {/* FILA DE ENTRADA RÁPIDA CONTINUA */}
                      <tr className="bg-orange-50/50 dark:bg-[#161F33]/90 border-b-2 border-orange-400 dark:border-orange-500/40 transition">
                        <td className="py-3.5 px-4 relative">
                          <div className="relative" ref={quickRowContainerRef}>
                            <input
                              ref={quickRowSkuInputRef}
                              type="text"
                              placeholder="SKU o Nombre... [Enter]"
                              value={quickRowSku}
                              onChange={(e) => {
                                setQuickRowSku(e.target.value);
                                setQuickRowDropdownOpen(true);
                                if (quickRowProduct && e.target.value !== quickRowProduct.sku) {
                                  setQuickRowProduct(null);
                                }
                              }}
                              onFocus={() => {
                                if (quickRowSku.trim() && !quickRowProduct) setQuickRowDropdownOpen(true);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  if (quickRowProduct) {
                                    quickRowQtyInputRef.current?.focus();
                                    quickRowQtyInputRef.current?.select();
                                  } else if (quickRowResults.length > 0) {
                                    handleSelectQuickRowProduct(quickRowResults[0]);
                                  } else if (quickRowSku.trim()) {
                                    handleOpenCreatePartFromSearch(quickRowSku);
                                  }
                                } else if (e.key === 'Escape') {
                                  setQuickRowDropdownOpen(false);
                                }
                              }}
                              className="w-full min-w-[140px] border border-orange-400 dark:border-orange-500/50 rounded-lg px-3 py-2 text-sm font-mono font-bold text-gray-900 dark:text-white bg-white dark:bg-[#0E1422] focus:outline-none focus:ring-2 focus:ring-[#FF5C1B]/50 transition shadow-2xs"
                            />
                            {/* Dropdown flotante predictivo para la fila rápida */}
                            {quickRowDropdownOpen && quickRowSku.trim() && !quickRowProduct && (
                              <div className="absolute left-0 top-full mt-1.5 w-96 bg-white dark:bg-[#0E1422] border border-gray-200 dark:border-[#28354D] rounded-xl shadow-2xl z-50 overflow-hidden text-xs divide-y divide-gray-100 dark:divide-[#1E293B]">
                                {quickRowResults.length > 0 ? (
                                  quickRowResults.map(p => (
                                    <div
                                      key={p.id}
                                      onClick={() => handleSelectQuickRowProduct(p)}
                                      className="p-3 hover:bg-orange-50 dark:hover:bg-[#161F33] cursor-pointer transition flex items-center justify-between gap-3"
                                    >
                                      <div className="min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                          <span className="font-mono font-bold text-sm text-[#FF5C1B]">{p.sku}</span>
                                          {p.supplierLogo ? (
                                            <div
                                              title={p.supplier}
                                              className="w-14 h-5 rounded bg-white border border-gray-200 dark:border-[#28354D] p-0.5 flex items-center justify-center shadow-2xs shrink-0"
                                            >
                                              <img
                                                src={p.supplierLogo}
                                                alt={p.supplier}
                                                className="max-w-full max-h-full object-contain"
                                                onError={(e) => {
                                                  (e.currentTarget as HTMLElement).style.display = 'none';
                                                  const fallback = (e.currentTarget.nextElementSibling as HTMLElement);
                                                  if (fallback) fallback.style.display = 'inline-block';
                                                }}
                                              />
                                              <span className="hidden text-[9px] font-bold text-gray-700">{p.supplier}</span>
                                            </div>
                                          ) : (
                                            <span
                                              title={p.supplier}
                                              className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[10px] font-semibold bg-gray-100 dark:bg-[#161F33] text-gray-700 dark:text-slate-300"
                                            >
                                              <span>{p.supplier}</span>
                                            </span>
                                          )}
                                        </div>
                                        <p className="truncate text-gray-800 dark:text-slate-200 text-xs font-semibold">{p.name}</p>
                                      </div>
                                      <div className="text-right shrink-0">
                                        <span className="text-[10px] text-gray-400 block">Stock: {p.wholesaleStock ?? p.stock ?? 0}</span>
                                        <span className="font-bold text-emerald-600 dark:text-emerald-400 text-xs">
                                          ${(p.wholesaleCost > 0 ? p.wholesaleCost : p.cost).toFixed(2)}
                                        </span>
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <div className="p-3.5 text-center">
                                    <p className="text-gray-500 dark:text-slate-400 text-xs mb-2">
                                      No existe el repuesto "{quickRowSku}"
                                    </p>
                                    <button
                                      type="button"
                                      onClick={() => handleOpenCreatePartFromSearch(quickRowSku)}
                                      className="w-full bg-[#FF5C1B] hover:bg-[#ff4600] text-white py-2 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition shadow-xs"
                                    >
                                      <Plus className="w-3.5 h-3.5" />
                                      <span>Crear Repuesto Nuevo</span>
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-medium text-gray-900 dark:text-slate-200">
                          {quickRowProduct ? (
                            <div className="flex items-center justify-between gap-1">
                              <span className="truncate max-w-[320px] text-sm font-semibold">{quickRowProduct.name}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  setQuickRowProduct(null);
                                  setQuickRowSku('');
                                  quickRowSkuInputRef.current?.focus();
                                }}
                                className="text-gray-400 hover:text-red-500 cursor-pointer text-xs p-1"
                                title="Limpiar selección"
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <span className="text-gray-400 dark:text-slate-500 italic text-xs">
                              {quickRowSku ? 'Selecciona coincidencia arriba...' : '⚡ Digita SKU o nombre continuo'}
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          {quickRowProduct ? (
                            quickRowProduct.supplierLogo ? (
                              <div
                                title={quickRowProduct.supplier || 'GENÉRICO'}
                                className="w-18 h-8 rounded-lg bg-white border border-gray-200 dark:border-[#28354D] p-1 flex items-center justify-center shadow-2xs hover:shadow-xs transition shrink-0 cursor-default"
                              >
                                <img
                                  src={quickRowProduct.supplierLogo}
                                  alt={quickRowProduct.supplier || 'Marca'}
                                  className="max-w-full max-h-full object-contain"
                                  onError={(e) => {
                                    (e.currentTarget as HTMLElement).style.display = 'none';
                                    const fallback = (e.currentTarget.nextElementSibling as HTMLElement);
                                    if (fallback) fallback.style.display = 'inline-block';
                                  }}
                                />
                                <span className="hidden text-[10px] font-bold text-gray-700 truncate">{quickRowProduct.supplier || 'GENÉRICO'}</span>
                              </div>
                            ) : (
                              <span
                                title={quickRowProduct.supplier || 'GENÉRICO'}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold border border-gray-200 dark:border-[#28354D] bg-white dark:bg-[#0E1422] text-gray-800 dark:text-slate-200 shadow-2xs cursor-default"
                              >
                                <Tag className="w-3.5 h-3.5 text-[#FF5C1B] shrink-0" />
                                <span className="truncate max-w-[100px]">{quickRowProduct.supplier || 'GENÉRICO'}</span>
                              </span>
                            )
                          ) : (
                            <span className="text-gray-400 dark:text-slate-500 text-xs">—</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <input
                            ref={quickRowQtyInputRef}
                            type="number"
                            min="1"
                            value={quickRowQty}
                            onChange={(e) => setQuickRowQty(Math.max(1, parseInt(e.target.value) || 1))}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleCommitQuickRow();
                              }
                            }}
                            className="w-24 text-center border border-gray-200 dark:border-[#28354D] rounded-lg py-2 text-sm font-bold text-emerald-700 dark:text-emerald-400 bg-white dark:bg-[#0E1422] focus:outline-none focus:ring-2 focus:ring-[#FF5C1B] transition shadow-2xs"
                          />
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <input
                            type="number"
                            step="0.1"
                            value={quickRowCost}
                            onChange={(e) => setQuickRowCost(parseFloat(e.target.value) || 0)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleCommitQuickRow();
                              }
                            }}
                            className="w-28 text-right border border-gray-200 dark:border-[#28354D] rounded-lg px-3 py-2 text-sm font-medium bg-white dark:bg-[#0E1422] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF5C1B] transition shadow-2xs"
                          />
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <span className="font-mono font-bold text-sm text-gray-900 dark:text-white">
                            ${(quickRowQty * quickRowCost).toFixed(2)}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <input
                            type="number"
                            step="0.5"
                            value={quickRowPrice}
                            onChange={(e) => setQuickRowPrice(parseFloat(e.target.value) || 0)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleCommitQuickRow();
                              }
                            }}
                            className="w-28 text-right border border-gray-200 dark:border-[#28354D] rounded-lg px-3 py-2 text-sm font-bold text-gray-900 dark:text-white bg-white dark:bg-[#0E1422] focus:outline-none focus:ring-2 focus:ring-[#FF5C1B] transition shadow-2xs"
                          />
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            type="button"
                            onClick={handleCommitQuickRow}
                            className="bg-[#FF5C1B] hover:bg-[#ff4600] text-white px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 ml-auto cursor-pointer transition shadow-xs"
                            title="Añadir repuesto al lote [Enter]"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Añadir</span>
                          </button>
                        </td>
                      </tr>

                      {receiptItems.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="py-12 text-center text-gray-400 dark:text-slate-500 italic">
                            <div className="flex flex-col items-center justify-center gap-2">
                              <Boxes className="w-8 h-8 text-gray-300 dark:text-slate-600" />
                              <span className="font-medium text-sm text-gray-600 dark:text-slate-400">
                                No hay repuestos en este lote todavía
                              </span>
                              <span className="text-xs text-gray-400 dark:text-slate-500">
                                Usa la fila rápida superior o el buscador de repuestos para añadir ítems al lote de entrada.
                              </span>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        receiptItems.map((item, idx) => (
                          <tr key={`${item.productId}-${idx}`} className="hover:bg-gray-50/70 dark:hover:bg-[#161F33]/50 transition">
                            <td className="py-3.5 px-4 font-mono font-bold text-sm text-[#FF5C1B]">{item.sku}</td>
                            <td className="py-3.5 px-4 font-semibold text-sm text-gray-900 dark:text-slate-100">{item.name}</td>
                            <td className="py-3.5 px-4">
                              {item.brandLogo ? (
                                <div
                                  title={item.brand || 'GENÉRICO'}
                                  className="w-18 h-8 rounded-lg bg-white border border-gray-200 dark:border-[#28354D] p-1 flex items-center justify-center shadow-2xs hover:shadow-xs transition shrink-0 cursor-default"
                                >
                                  <img
                                    src={item.brandLogo}
                                    alt={item.brand || 'Marca'}
                                    className="max-w-full max-h-full object-contain"
                                    onError={(e) => {
                                      (e.currentTarget as HTMLElement).style.display = 'none';
                                      const fallback = (e.currentTarget.nextElementSibling as HTMLElement);
                                      if (fallback) fallback.style.display = 'inline-block';
                                    }}
                                  />
                                  <span className="hidden text-[10px] font-bold text-gray-700 truncate">{item.brand || 'GENÉRICO'}</span>
                                </div>
                              ) : (
                                <span
                                  title={item.brand || 'GENÉRICO'}
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold border border-gray-200 dark:border-[#28354D] bg-white dark:bg-[#161F33] text-gray-800 dark:text-slate-200 shadow-2xs cursor-default"
                                >
                                  <Tag className="w-3.5 h-3.5 text-[#FF5C1B] shrink-0" />
                                  <span className="truncate max-w-[110px]">{item.brand || 'GENÉRICO'}</span>
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              <input
                                type="number"
                                min="1"
                                value={item.qtyToEnter}
                                onChange={(e) => {
                                  const val = parseInt(e.target.value) || 0;
                                  setReceiptItems(prev =>
                                    prev.map((r, i) => (i === idx ? { ...r, qtyToEnter: val } : r))
                                  );
                                }}
                                className="w-24 text-center border border-gray-200 dark:border-[#28354D] rounded-lg py-2 text-sm font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/40 focus:outline-none focus:ring-2 focus:ring-[#FF5C1B] transition shadow-2xs"
                              />
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <input
                                type="number"
                                step="0.1"
                                value={item.unitCost}
                                onChange={(e) => {
                                  const val = parseFloat(e.target.value) || 0;
                                  setReceiptItems(prev =>
                                    prev.map((r, i) => (i === idx ? { ...r, unitCost: val } : r))
                                  );
                                }}
                                className="w-28 text-right border border-gray-200 dark:border-[#28354D] rounded-lg px-3 py-2 text-sm font-medium bg-white dark:bg-[#161F33] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF5C1B] transition shadow-2xs"
                              />
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <span className="font-mono font-bold text-sm text-gray-900 dark:text-white">
                                ${(item.qtyToEnter * item.unitCost).toFixed(2)}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <input
                                type="number"
                                step="0.5"
                                value={item.newPrice}
                                onChange={(e) => {
                                  const val = parseFloat(e.target.value) || 0;
                                  setReceiptItems(prev =>
                                    prev.map((r, i) => (i === idx ? { ...r, newPrice: val } : r))
                                  );
                                }}
                                className="w-28 text-right border border-gray-200 dark:border-[#28354D] rounded-lg px-3 py-2 text-sm font-bold text-gray-900 dark:text-white bg-white dark:bg-[#161F33] focus:outline-none focus:ring-2 focus:ring-[#FF5C1B] transition shadow-2xs"
                              />
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                onClick={() =>
                                  setReceiptItems(prev => prev.filter((_, i) => i !== idx))
                                }
                                className="text-gray-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition cursor-pointer"
                                title="Quitar repuesto de la lista"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Barra de Totales y Resumen del Lote Actual */}
              <div className="pt-4 mt-4 border-t border-gray-100 dark:border-[#1E293B] flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-4">
                  <span className="text-gray-500 dark:text-slate-400">
                    Renglones en Lote: <strong className="text-gray-900 dark:text-white font-mono text-sm">{receiptItems.length}</strong>
                  </span>
                  <span className="text-gray-300 dark:text-[#28354D]">|</span>
                  <span className="text-gray-500 dark:text-slate-400">
                    Total Unidades: <strong className="text-emerald-600 dark:text-emerald-400 font-mono text-sm">+{receiptItems.reduce((acc, i) => acc + i.qtyToEnter, 0)} und</strong>
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  <div>
                    <span className="text-gray-400 dark:text-slate-500 block text-[11px] text-right">Inversión Total del Lote:</span>
                    <span className="font-mono font-bold text-base text-gray-900 dark:text-white">
                      ${receiptItems.reduce((acc, i) => acc + (i.qtyToEnter * i.unitCost), 0).toFixed(2)} USD
                    </span>
                    <span className="text-[11px] text-gray-400 dark:text-slate-500 font-mono ml-2">
                      (Bs. {(receiptItems.reduce((acc, i) => acc + (i.qtyToEnter * i.unitCost), 0) * bcvRate).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Historial de Recepciones Anteriores */}
            <div className="bg-white dark:bg-[#0E1422] p-5 rounded-xl border border-gray-200 dark:border-[#1E293B] shadow-2xs">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold uppercase text-gray-500 dark:text-slate-400 flex items-center gap-2">
                  <History className="w-4 h-4 text-[#FF5C1B]" />
                  <span>Historial de Lotes Ingresados en Almacén</span>
                </h3>
                <span className="text-[11px] font-semibold text-gray-400 dark:text-slate-500">
                  {receipts.length} {receipts.length === 1 ? 'lote registrado' : 'lotes registrados'}
                </span>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-[#1E293B] text-xs max-h-56 overflow-y-auto pr-1">
                {receipts.length === 0 ? (
                  <div className="py-8 text-center text-gray-400 dark:text-slate-500">
                    <Boxes className="w-7 h-7 mx-auto mb-2 text-gray-300 dark:text-slate-600" />
                    <p className="font-medium text-xs text-gray-600 dark:text-slate-400">
                      No hay lotes de repuestos ingresados.
                    </p>
                    <p className="text-[11px] text-gray-400 dark:text-slate-500 mt-0.5">
                      Los lotes recibidos mediante el formulario superior quedarán archivados aquí.
                    </p>
                  </div>
                ) : (
                  receipts.map(r => (
                  <div key={r.id} className="py-3 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-gray-900 dark:text-white mr-2">{r.id}</span>
                      <span className="text-gray-600 dark:text-slate-300 font-medium">{r.supplier}</span>
                      <span className="ml-2 text-gray-400 dark:text-slate-500 font-mono">({r.invoiceRef})</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                        +{r.totalUnits} unidades
                      </span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        Costo Total: ${r.totalCostUsd.toFixed(2)}
                      </span>
                      <span className="text-gray-400 dark:text-slate-500">{r.date}</span>
                    </div>
                  </div>
                )))}
              </div>
            </div>
          </main>
        )}

        {/* ============================================================
            MÓDULO DE CUENTAS POR COBRAR (CxC) Y GESTIÓN DE ABONOS
        ============================================================ */}
        {activeModule === 'cxc' && (
          <main className="flex-1 px-8 py-6 overflow-y-auto bg-[#F8F9FA] dark:bg-[#0B0F17] transition-colors">
            {/* Encabezado */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    Cuentas por Cobrar (CxC) & Abonos
                  </h1>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${rateMode === 'binance' ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-800' : rateMode === 'bcv' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800' : 'bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-400 border-orange-300 dark:border-orange-800'}`}>
                    {activeRateLabel}: Bs. {bcvRate.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                  Gestión integral de créditos mayoristas, registro de pagos parciales en divisas o bolívares, estados de cuenta y cobranza directa por WhatsApp.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => fetchAllRates(true)}
                  disabled={rateLoading}
                  className="bg-white dark:bg-[#0E1422] border border-gray-200 dark:border-[#1E293B] hover:bg-gray-50 dark:hover:bg-[#161F33] text-gray-700 dark:text-slate-300 px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs group transition"
                >
                  <div className={rateLoading ? 'animate-spin' : ''}>
                    <UseAnimations
                      animation={rotateCcwAnimation}
                      size={15}
                      strokeColor={isDarkMode ? '#8B9BB4' : '#4B5563'}
                      interaction="hover-replay"
                    />
                  </div>
                  <span>{rateLoading ? 'Sincronizando...' : `Actualizar ${activeRateLabel}`}</span>
                </button>

                <button
                  onClick={() => {
                    const pendingList = invoices.filter(i => (i.balancePendingUsd || 0) > 0);
                    const totalPending = pendingList.reduce((acc, i) => acc + (i.balancePendingUsd || 0), 0);
                    showToast(`Reporte CxC: ${pendingList.length} facturas por cobrar ($${totalPending.toFixed(2)} USD)`);
                  }}
                  className="bg-gray-900 dark:bg-[#161F33] hover:bg-black dark:hover:bg-[#1e2a44] text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs border border-transparent dark:border-[#28354D] group transition"
                >
                  <UseAnimations
                    animation={clipboardAnimation}
                    size={16}
                    strokeColor="#FFFFFF"
                    interaction="hover-replay"
                  />
                  <span>Resumen de Cobranzas</span>
                </button>
              </div>
            </div>

            {/* Tarjetas KPI de Cobranza */}
            {(() => {
              const invoicesWithPending = invoices.filter(i => {
                const pend = i.balancePendingUsd !== undefined ? i.balancePendingUsd : (i.status === 'Cobrada' ? 0 : i.totalUsd);
                return pend > 0.009;
              });

              const totalPendingUsd = invoicesWithPending.reduce((acc, i) => {
                return acc + (i.balancePendingUsd !== undefined ? i.balancePendingUsd : i.totalUsd);
              }, 0);

              const overdueInvoices = invoicesWithPending.filter(i => {
                if (i.status === 'Vencida') return true;
                if (!i.dueDate) return false;
                return new Date(i.dueDate) < new Date('2026-10-24');
              });

              const overdueUsd = overdueInvoices.reduce((acc, i) => {
                return acc + (i.balancePendingUsd !== undefined ? i.balancePendingUsd : i.totalUsd);
              }, 0);

              const totalPaidUsd = invoices.reduce((acc, i) => {
                return acc + (i.amountPaidUsd || 0);
              }, 0);

              const uniqueClientsWithDebt = new Set(invoicesWithPending.map(i => i.clientRif)).size;

              return (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {/* Total Por Cobrar */}
                  <div className="bg-white dark:bg-[#0E1422] p-4 rounded-xl border border-gray-200 dark:border-[#1E293B] shadow-2xs">
                    <div className="flex items-center justify-between text-gray-500 dark:text-slate-400 mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider">Total por Cobrar</span>
                      <span className="p-1.5 rounded-lg bg-orange-50 dark:bg-orange-950/50 text-[#FF5C1B]">
                        <DollarSign className="w-4 h-4" />
                      </span>
                    </div>
                    <div className="text-2xl font-black text-gray-900 dark:text-white">
                      ${totalPendingUsd.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-slate-400 mt-1 font-mono">
                      Bs. {(totalPendingUsd * bcvRate).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className="text-[11px] text-gray-400 dark:text-slate-500 mt-2 pt-2 border-t border-gray-100 dark:border-[#1E293B]">
                      {invoicesWithPending.length} facturas con saldo activo
                    </div>
                  </div>

                  {/* Facturas Vencidas (Alerta Roja) */}
                  <div className="bg-white dark:bg-[#0E1422] p-4 rounded-xl border border-red-200 dark:border-red-900/40 shadow-2xs bg-gradient-to-br from-white to-red-50/30 dark:from-[#0E1422] dark:to-red-950/20">
                    <div className="flex items-center justify-between text-red-600 dark:text-red-400 mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider">Cartera Vencida</span>
                      <span className="p-1.5 rounded-lg bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400">
                        <AlertCircle className="w-4 h-4" />
                      </span>
                    </div>
                    <div className="text-2xl font-black text-red-600 dark:text-red-400">
                      ${overdueUsd.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className="text-xs text-red-500 dark:text-red-400/80 mt-1 font-mono">
                      Bs. {(overdueUsd * bcvRate).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className="text-[11px] text-red-700 dark:text-red-400 font-semibold mt-2 pt-2 border-t border-red-100 dark:border-red-900/30 flex items-center gap-1">
                      <span>⚠️ {overdueInvoices.length} facturas requieren cobro urgente</span>
                    </div>
                  </div>

                  {/* Cobrado / Recaudado */}
                  <div className="bg-white dark:bg-[#0E1422] p-4 rounded-xl border border-gray-200 dark:border-[#1E293B] shadow-2xs">
                    <div className="flex items-center justify-between text-gray-500 dark:text-slate-400 mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider">Total Cobrado</span>
                      <span className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                      </span>
                    </div>
                    <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400">
                      ${totalPaidUsd.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-slate-400 mt-1 font-mono">
                      Bs. {(totalPaidUsd * bcvRate).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className="text-[11px] text-gray-400 dark:text-slate-500 mt-2 pt-2 border-t border-gray-100 dark:border-[#1E293B]">
                      Cobrado de contado y por abonos
                    </div>
                  </div>

                  {/* Clientes en Crédito */}
                  <div className="bg-white dark:bg-[#0E1422] p-4 rounded-xl border border-gray-200 dark:border-[#1E293B] shadow-2xs">
                    <div className="flex items-center justify-between text-gray-500 dark:text-slate-400 mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider">Clientes con Saldo</span>
                      <span className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                        <CreditCard className="w-4 h-4" />
                      </span>
                    </div>
                    <div className="text-2xl font-black text-gray-900 dark:text-white">
                      {uniqueClientsWithDebt}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                      Deudores activos en cartera
                    </div>
                    <div className="text-[11px] text-gray-400 dark:text-slate-500 mt-2 pt-2 border-t border-gray-100 dark:border-[#1E293B]">
                      Límite de crédito monitoreado
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Barra de Filtros y Búsqueda */}
            <div className="bg-white dark:bg-[#0E1422] p-4 rounded-xl border border-gray-200 dark:border-[#1E293B] shadow-2xs mb-4 flex flex-wrap items-center justify-between gap-3">
              {/* Pestañas de Filtro */}
              <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-[#161F33] p-1 rounded-xl text-xs">
                <button
                  onClick={() => setCxcFilterStatus('todos')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                    cxcFilterStatus === 'todos' ? 'bg-white dark:bg-[#0E1422] text-gray-900 dark:text-white shadow-2xs border border-transparent dark:border-[#28354D]' : 'text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  Todas con Saldo
                </button>
                <button
                  onClick={() => setCxcFilterStatus('vencidos')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer flex items-center gap-1 ${
                    cxcFilterStatus === 'vencidos' ? 'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-400 shadow-2xs border border-transparent dark:border-red-900/40' : 'text-gray-500 dark:text-slate-400 hover:text-red-700 dark:hover:text-red-400'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span>Vencidas</span>
                </button>
                <button
                  onClick={() => setCxcFilterStatus('por_vencer')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                    cxcFilterStatus === 'por_vencer' ? 'bg-white dark:bg-[#0E1422] text-gray-900 dark:text-white shadow-2xs border border-transparent dark:border-[#28354D]' : 'text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  Por Vencer
                </button>
                <button
                  onClick={() => setCxcFilterStatus('saldados')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                    cxcFilterStatus === 'saldados' ? 'bg-white dark:bg-[#0E1422] text-gray-900 dark:text-white shadow-2xs border border-transparent dark:border-[#28354D]' : 'text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  Historial Saldadas
                </button>
              </div>

              {/* Buscador en CxC */}
              <div className="relative min-w-[280px] sm:min-w-[340px]">
                <div className="absolute left-3 top-2.5 pointer-events-none flex items-center text-gray-400 dark:text-slate-400">
                  <UseAnimations
                    animation={searchToXAnimation}
                    size={14}
                    strokeColor={isDarkMode ? '#8B9BB4' : '#9CA3AF'}
                  />
                </div>
                <input
                  type="text"
                  value={cxcSearch}
                  onChange={(e) => setCxcSearch(e.target.value)}
                  placeholder="Buscar por cliente, RIF, N° factura, vendedor o repuesto..."
                  className="w-full pl-8 pr-28 py-1.5 text-xs border border-gray-200 dark:border-[#28354D] rounded-lg focus:outline-none focus:border-[#FF5C1B] bg-gray-50 dark:bg-[#161F33] text-gray-900 dark:text-white focus:bg-white dark:focus:bg-[#161F33] transition"
                />
                <div className="absolute right-2.5 top-1.5 flex items-center gap-1.5">
                  {cxcSearch ? (
                    <button
                      type="button"
                      onClick={() => setCxcSearch('')}
                      className="p-1 text-gray-400 hover:text-gray-700 dark:hover:text-white rounded-full transition cursor-pointer"
                      title="Limpiar búsqueda"
                    >
                      <X size={12} />
                    </button>
                  ) : (
                    <span className="text-[10px] text-gray-400 dark:text-slate-500 font-mono select-none px-1 py-0.2 rounded border border-gray-200 dark:border-[#28354D] bg-white/50 dark:bg-[#1E293B]/50">
                      /
                    </span>
                  )}
                  {cxcSearch.trim() !== '' && (
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800/50 whitespace-nowrap">
                      {cxcFilteredInvoices.length} {cxcFilteredInvoices.length === 1 ? 'coincidencia' : 'coincidencias'}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* TABLA PRINCIPAL DE CUENTAS POR COBRAR */}
            <div className="bg-white dark:bg-[#0E1422] rounded-xl border border-gray-200 dark:border-[#1E293B] shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-[#1E293B] bg-gray-50/70 dark:bg-[#12192B] text-[11px] font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                      <th className="py-3 px-4">Documento</th>
                      <th className="py-3 px-3">Cliente Mayorista</th>
                      <th className="py-3 px-3">Vendedor</th>
                      <th className="py-3 px-3">Condición / Vencimiento</th>
                      <th className="py-3 px-3 text-right">Total Factura</th>
                      <th className="py-3 px-3 text-right">Abonado ($)</th>
                      <th className="py-3 px-3 text-right">Saldo Pendiente</th>
                      <th className="py-3 px-3 text-center">Estado</th>
                      <th className="py-3 pr-4 pl-2 text-right">Acciones de Cobranza</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-[#1E293B]">
                    {cxcFilteredInvoices.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="py-12 text-center text-gray-400 dark:text-slate-500">
                          {cxcSearch.trim() !== '' ? (
                            <div className="flex flex-col items-center justify-center gap-2 max-w-md mx-auto">
                              <Search className="w-8 h-8 text-amber-500/80" />
                              <span className="font-semibold text-gray-800 dark:text-slate-200 text-sm">
                                No se encontraron facturas ni abonos para "{cxcSearch}"
                              </span>
                              <span className="text-xs text-gray-500 dark:text-slate-400 text-center">
                                No hay resultados que coincidan por cliente, RIF, N° de factura, vendedor, repuesto o dirección.
                              </span>
                              <button
                                type="button"
                                onClick={() => setCxcSearch('')}
                                className="mt-2 px-3 py-1.5 bg-[#FF5C1B] hover:bg-[#ff4600] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                              >
                                <X size={13} />
                                <span>Limpiar búsqueda</span>
                              </button>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center gap-2">
                              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                              <span className="font-medium text-gray-600 dark:text-slate-300">
                                No hay cuentas por cobrar pendientes.
                              </span>
                              <span className="text-xs text-gray-400 dark:text-slate-500">
                                Las ventas a crédito aparecerán aquí automáticamente.
                              </span>
                            </div>
                          )}
                        </td>
                      </tr>
                    ) : (
                      cxcFilteredInvoices.map(inv => {
                        const pendingUsd = inv.balancePendingUsd !== undefined ? inv.balancePendingUsd : (inv.status === 'Cobrada' ? 0 : inv.totalUsd);
                        const paidUsd = inv.amountPaidUsd || 0;
                        const percentagePaid = inv.totalUsd > 0 ? Math.min(100, Math.round((paidUsd / inv.totalUsd) * 100)) : 100;
                        const isOverdue = pendingUsd > 0 && (inv.status === 'Vencida' || (inv.dueDate && new Date(inv.dueDate) < new Date('2026-10-24')));
                        const matchedLine = cxcSearch.trim() !== ''
                          ? (inv.lines || []).find(l =>
                              l.sku.toLowerCase().includes(cxcSearch.toLowerCase().trim()) ||
                              l.name.toLowerCase().includes(cxcSearch.toLowerCase().trim())
                            )
                          : null;

                        return (
                          <tr key={inv.id} className="hover:bg-gray-50/70 dark:hover:bg-[#161F33]/40 transition group">
                            {/* Documento */}
                            <td className="py-3 px-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => setPreviewInvoice(inv)}
                                  className="font-bold text-[#FF5C1B] hover:underline font-mono text-left cursor-pointer flex items-center gap-1"
                                >
                                  <span>{inv.id}</span>
                                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition" />
                                </button>
                                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-gray-100 dark:bg-[#161F33] text-gray-600 dark:text-slate-400 border border-gray-200 dark:border-[#28354D]" title="Correlativo corto">
                                  N° {formatInvoiceDisplayNumber(inv.id)}
                                </span>
                              </div>
                              <div className="text-[11px] text-gray-400 dark:text-slate-500 mt-0.5">
                                Emisión: {inv.date}
                              </div>
                            </td>

                            {/* Cliente */}
                            <td className="py-3 px-3">
                              <div className="font-bold text-gray-900 dark:text-white">{inv.clientName}</div>
                              <div className="text-[11px] text-gray-500 dark:text-slate-400 font-mono">
                                RIF: {inv.clientRif} • {inv.clientPhone || '0414-0000000'}
                              </div>
                              {matchedLine && (
                                <div className="mt-1 inline-flex items-center gap-1 text-[10px] text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-900/50">
                                  <span className="font-medium">Repuesto coincidente:</span>
                                  <strong className="truncate max-w-[200px]" title={matchedLine.name}>
                                    {matchedLine.name} ({matchedLine.sku})
                                  </strong>
                                </div>
                              )}
                            </td>

                            {/* Vendedor */}
                            <td className="py-3 px-3 whitespace-nowrap">
                              <div className="text-gray-800 dark:text-slate-200 font-medium">{inv.sellerName}</div>
                              <div className="text-[11px] text-gray-400 dark:text-slate-500">
                                Com: {inv.commissionRate}%
                              </div>
                            </td>

                            {/* Condición / Vencimiento */}
                            <td className="py-3 px-3 whitespace-nowrap">
                              <span className="block font-medium text-gray-700 dark:text-slate-300">
                                {inv.paymentCondition}
                              </span>
                              {inv.dueDate && (
                                <span
                                  className={`inline-flex items-center gap-1 text-[11px] font-semibold mt-0.5 ${
                                    isOverdue ? 'text-red-600 dark:text-red-400' : 'text-gray-400 dark:text-slate-500'
                                  }`}
                                >
                                  {isOverdue && <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />}
                                  <span>Vence: {inv.dueDate}</span>
                                </span>
                              )}
                            </td>

                            {/* Total Factura */}
                            <td className="py-3 px-3 text-right whitespace-nowrap font-bold text-gray-900 dark:text-white">
                              ${inv.totalUsd.toFixed(2)}
                            </td>

                            {/* Total Abonado */}
                            <td className="py-3 px-3 text-right whitespace-nowrap">
                              <div className="font-semibold text-emerald-700 dark:text-emerald-400">
                                ${paidUsd.toFixed(2)}
                              </div>
                              <div className="w-20 ml-auto bg-gray-200 dark:bg-[#1E293B] h-1.5 rounded-full mt-1 overflow-hidden">
                                <div
                                  className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                                  style={{ width: `${percentagePaid}%` }}
                                />
                              </div>
                              <div className="text-[10px] text-gray-400 dark:text-slate-500 mt-0.5">
                                {percentagePaid}% cubierto
                              </div>
                            </td>

                            {/* Saldo Pendiente */}
                            <td className="py-3 px-3 text-right whitespace-nowrap">
                              <div className={`font-extrabold text-sm ${pendingUsd > 0 ? (isOverdue ? 'text-red-600 dark:text-red-400' : 'text-[#FF5C1B]') : 'text-gray-400 dark:text-slate-500'}`}>
                                ${pendingUsd.toFixed(2)}
                              </div>
                              <div className="text-[10px] text-gray-400 dark:text-slate-500 font-mono">
                                Bs. {(pendingUsd * bcvRate).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </div>
                            </td>

                            {/* Estado Badge */}
                            <td className="py-3 px-3 text-center whitespace-nowrap">
                              <span
                                className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                                  pendingUsd <= 0.009
                                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                                    : isOverdue
                                    ? 'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/40'
                                    : paidUsd > 0
                                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400'
                                    : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400'
                                }`}
                              >
                                {pendingUsd <= 0.009
                                  ? 'Saldada'
                                  : isOverdue
                                  ? 'Vencida'
                                  : paidUsd > 0
                                  ? 'Abono Parcial'
                                  : 'Pendiente'}
                              </span>
                            </td>

                            {/* Acciones */}
                            <td className="py-3 pr-4 pl-2 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1.5">
                                {/* Botón Registrar Abono */}
                                {pendingUsd > 0 && (
                                  <button
                                    onClick={() => {
                                      setPaymentModalInvoice(inv);
                                      setPaymentAmountUsd(pendingUsd.toFixed(2));
                                      setPaymentMethod('Divisas Efectivo');
                                      setPaymentReference('');
                                      setPaymentNotes('');
                                    }}
                                    className="px-2.5 py-1.5 bg-[#FF5C1B] hover:bg-[#ff4600] text-white rounded-lg font-bold text-xs flex items-center gap-1 cursor-pointer transition shadow-2xs"
                                    title="Registrar Abono o Pago"
                                  >
                                    <DollarSign className="w-3.5 h-3.5" />
                                    <span>Abonar</span>
                                  </button>
                                )}

                                {/* Botón Historial de Pagos */}
                                <button
                                  onClick={() => setPaymentHistoryInvoice(inv)}
                                  className="p-1.5 rounded-lg border border-gray-200 dark:border-[#28354D] text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-[#161F33] cursor-pointer transition"
                                  title="Ver historial de abonos"
                                >
                                  <History className="w-3.5 h-3.5" />
                                </button>

                                {/* Botón Enviar Cobranza por WhatsApp */}
                                <button
                                  onClick={() => {
                                    const text = buildDebtReminderWhatsAppText(inv, bcvRate, activeRateLabel);
                                    sendWhatsApp(text, inv.clientPhone);
                                    showToast(`Recordatorio de cobro enviado a ${inv.clientName}`);
                                  }}
                                  className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer transition shadow-2xs"
                                  title="Enviar recordatorio formal por WhatsApp"
                                >
                                  <WhatsAppIcon className="w-3.5 h-3.5" />
                                </button>

                                {/* Botón Ver Factura */}
                                <button
                                  onClick={() => setPreviewInvoice(inv)}
                                  className="p-1.5 rounded-lg border border-gray-200 dark:border-[#28354D] text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-[#161F33] cursor-pointer transition"
                                  title="Ver documento / Imprimir"
                                >
                                  <Printer className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        )}

        {/* ============================================================
            MÓDULO 4: CÁLCULO DE COMISIONES DE VENDEDORES
        ============================================================ */}
        {activeModule === 'commissions' && (
          <main className="flex-1 px-8 py-6 overflow-y-auto bg-[#F8F9FA] dark:bg-[#0B0F17] transition-colors">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Liquidación y Cálculo de Comisiones de Vendedores
                </h1>
                <p className="text-xs text-gray-500 dark:text-slate-400">
                  Control automático de comisiones por ventas mayoristas cobradas y pendientes en USD ($) y Bolívares (BCV).
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setNewSellerModalOpen(true)}
                  className="bg-[#FF5C1B] hover:bg-[#ff4600] text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs group transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nuevo Vendedor</span>
                </button>
                <button
                  onClick={() => showToast('Reporte de corte de comisiones exportado correctamente')}
                  className="bg-gray-900 dark:bg-[#161F33] hover:bg-black dark:hover:bg-[#1e2a44] text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-xs border border-transparent dark:border-[#28354D] group transition"
                >
                  <UseAnimations
                    animation={activityAnimation}
                    size={18}
                    strokeColor="#FF5C1B"
                    interaction="hover-replay"
                  />
                  <span>Liquidar / Exportar Corte</span>
                </button>
              </div>
            </div>

            {/* Tarjetas de Resumen por Vendedor */}
            {sellers.filter(s => !s.isDeleted).length === 0 ? (
              <div className="bg-white dark:bg-[#0E1422] p-8 rounded-2xl border border-dashed border-gray-300 dark:border-[#28354D] text-center max-w-md mx-auto mb-6 shadow-2xs">
                <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-[#FF5C1B] flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-1">
                  Sin Asesores Registrados en Supabase
                </h3>
                <p className="text-xs text-gray-500 dark:text-slate-400 mb-4">
                  Registra el primer asesor comercial para liquidar comisiones y asociar ventas mayoristas.
                </p>
                <button
                  type="button"
                  onClick={() => setNewSellerModalOpen(true)}
                  className="px-4 py-2 rounded-lg bg-[#FF5C1B] hover:bg-[#ff4600] text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Nuevo Asesor Comercial</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {sellers.filter(s => !s.isDeleted).map(seller => {
                const sellerInvoices = invoices.filter(i => i.sellerId === seller.id);
                const totalSales = sellerInvoices.reduce((acc, i) => acc + i.totalUsd, 0);
                const paidCommissions = sellerInvoices
                  .filter(i => i.status === 'Cobrada')
                  .reduce((acc, i) => acc + i.commissionUsd, 0);
                const pendingCommissions = sellerInvoices
                  .filter(i => i.status !== 'Cobrada')
                  .reduce((acc, i) => acc + i.commissionUsd, 0);

                return (
                  <div
                    key={seller.id}
                    className={`bg-white dark:bg-[#0E1422] p-4 rounded-xl border shadow-2xs flex flex-col justify-between transition ${
                      seller.isActive === false
                        ? 'opacity-70 border-dashed border-gray-300 dark:border-gray-700'
                        : 'border-gray-200 dark:border-[#1E293B]'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-full bg-orange-100 dark:bg-orange-950/60 text-[#FF5C1B] font-bold text-xs flex items-center justify-center shrink-0">
                            {seller.avatar}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h3 className="text-xs font-bold text-gray-900 dark:text-white">{seller.name}</h3>
                              {seller.cedula && (
                                <span className="text-[10px] text-gray-400 font-mono">({seller.cedula})</span>
                              )}
                            </div>
                            <p className="text-[11px] text-gray-400 dark:text-slate-500">{seller.zone}</p>
                          </div>
                        </div>

                        {/* Controles: Toggle Activo / Inactivo y Botón Eliminar */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleToggleSellerActive(seller.id)}
                            title={seller.isActive !== false ? 'Clic para inactivar asesor' : 'Clic para activar asesor'}
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition cursor-pointer border ${
                              seller.isActive !== false
                                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40 hover:bg-emerald-100'
                                : 'bg-gray-100 dark:bg-[#1E293B] text-gray-500 dark:text-slate-400 border-gray-200 dark:border-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {seller.isActive !== false ? '✓ Activo' : '✕ Inactivo'}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleRequestDeleteSeller(seller)}
                            title="Eliminar asesor comercial"
                            className="p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1.5 text-xs border-t border-gray-100 dark:border-[#1E293B] pt-3">
                        <div className="flex justify-between text-gray-500 dark:text-slate-400">
                          <span>Ventas Concretadas:</span>
                          <span className="font-semibold text-gray-800 dark:text-white font-mono">
                            ${totalSales.toFixed(2)}
                            <span className="text-[11px] text-gray-400 dark:text-slate-500 ml-1 font-sans">
                              ({sellerInvoices.length} {sellerInvoices.length === 1 ? 'venta' : 'ventas'})
                            </span>
                          </span>
                        </div>
                        <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-semibold">
                          <span>Comisión Liquidable:</span>
                          <span className="font-mono">${paidCommissions.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-amber-600 dark:text-amber-400 text-[11px]">
                          <span>En facturas a crédito:</span>
                          <span className="font-mono">${pendingCommissions.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-gray-100 dark:border-[#1E293B] flex flex-col gap-2">
                      <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-slate-400">
                        <span>Equiv. Liquidable BCV:</span>
                        <span className="font-bold text-gray-800 dark:text-emerald-400 font-mono">
                          Bs. {(paidCommissions * bcvRate).toFixed(2)}
                        </span>
                      </div>

                      {/* Botón Ver Ventas Concretadas */}
                      <button
                        type="button"
                        onClick={() => {
                          setSellerSalesHistoryModal(seller);
                          setSellerSalesSearch('');
                          setSellerSalesStatusFilter('Todas');
                        }}
                        className="w-full py-1.5 px-3 rounded-lg bg-gray-50 hover:bg-orange-50 dark:bg-[#161F33] dark:hover:bg-orange-950/40 border border-gray-200 dark:border-[#28354D] hover:border-orange-300 dark:hover:border-orange-800/60 text-gray-700 hover:text-[#FF5C1B] dark:text-slate-200 dark:hover:text-[#FF5C1B] text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer group"
                        title={`Ver todas las ventas concretadas por ${seller.name}`}
                      >
                        <TrendingUp className="w-3.5 h-3.5 text-[#FF5C1B] group-hover:scale-110 transition-transform" />
                        <span>Ver Ventas Concretadas ({sellerInvoices.length})</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            )}

            {/* Tabla Detallada de Facturas y Comisiones Generadas */}
            <div className="bg-white dark:bg-[#0E1422] rounded-xl border border-gray-200 dark:border-[#1E293B] shadow-2xs overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-[#1E293B] flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-xs font-bold uppercase text-gray-500 dark:text-slate-400">
                  Desglose de Comisiones por Factura Emitida
                </h3>
                <div className="flex items-center gap-2">
                  <select
                    value={commissionFilterSeller}
                    onChange={(e) => setCommissionFilterSeller(e.target.value)}
                    className="text-xs border border-gray-200 dark:border-[#28354D] bg-white dark:bg-[#161F33] text-gray-800 dark:text-white rounded-lg px-2.5 py-1.5 cursor-pointer"
                  >
                    <option value="Todos" className="dark:bg-[#0E1422]">Todos los Vendedores</option>
                    {sellers.filter(s => !s.isDeleted).map(s => (
                      <option key={s.id} value={s.id} className="dark:bg-[#0E1422]">{s.name}</option>
                    ))}
                  </select>

                  <select
                    value={commissionFilterStatus}
                    onChange={(e) => setCommissionFilterStatus(e.target.value)}
                    className="text-xs border border-gray-200 dark:border-[#28354D] bg-white dark:bg-[#161F33] text-gray-800 dark:text-white rounded-lg px-2.5 py-1.5 cursor-pointer"
                  >
                    <option value="Todas" className="dark:bg-[#0E1422]">Todos los Estados</option>
                    <option value="Cobrada" className="dark:bg-[#0E1422]">Cobradas (Liquidables)</option>
                    <option value="Pendiente" className="dark:bg-[#0E1422]">Pendientes de Cobro</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-[#1E293B] bg-gray-50 dark:bg-[#12192B] text-[11px] text-gray-500 dark:text-slate-400 uppercase">
                      <th className="py-3 px-4">Factura</th>
                      <th className="py-3 px-3">Fecha</th>
                      <th className="py-3 px-3">Cliente Mayorista</th>
                      <th className="py-3 px-3">Vendedor</th>
                      <th className="py-3 px-3 text-right">Monto Venta ($)</th>
                      <th className="py-3 px-3 text-center">% Com.</th>
                      <th className="py-3 px-3 text-right">Comisión ($)</th>
                      <th className="py-3 px-3 text-center">Estado Cobranza</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-[#1E293B]">
                    {invoices
                      .filter(
                        inv =>
                          (commissionFilterSeller === 'Todos' || inv.sellerId === commissionFilterSeller) &&
                          (commissionFilterStatus === 'Todas' || inv.status === commissionFilterStatus)
                      )
                      .map(inv => (
                        <tr key={inv.id} className="hover:bg-gray-50 dark:hover:bg-[#161F33]/40 transition">
                          <td className="py-3 px-4 font-mono font-bold text-[#FF5C1B]">{inv.id}</td>
                          <td className="py-3 px-3 text-gray-500 dark:text-slate-400">{inv.date}</td>
                          <td className="py-3 px-3 font-medium text-gray-800 dark:text-slate-200">{inv.clientName}</td>
                          <td className="py-3 px-3 font-semibold text-gray-900 dark:text-white">{inv.sellerName}</td>
                          <td className="py-3 px-3 text-right font-semibold text-gray-900 dark:text-white">
                            ${inv.totalUsd.toFixed(2)}
                          </td>
                          <td className="py-3 px-3 text-center">
                            <span className="bg-gray-100 dark:bg-[#161F33] text-gray-700 dark:text-slate-300 border border-transparent dark:border-[#28354D] px-2 py-0.5 rounded font-mono">
                              {inv.commissionRate}%
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right font-bold text-[#FF5C1B]">
                            ${inv.commissionUsd.toFixed(2)}
                          </td>
                          <td className="py-3 px-3 text-center">
                            <button
                              onClick={() => {
                                setInvoices(prev =>
                                  prev.map(item =>
                                    item.id === inv.id
                                      ? {
                                          ...item,
                                          status: item.status === 'Cobrada' ? 'Pendiente' : 'Cobrada'
                                        }
                                      : item
                                  )
                                );
                                showToast(`Estado de factura ${inv.id} actualizado`);
                              }}
                              title="Haz clic para alternar entre Cobrada / Pendiente"
                              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold cursor-pointer transition ${
                                inv.status === 'Cobrada'
                                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40'
                                  : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/40'
                              }`}
                            >
                              {inv.status === 'Cobrada' ? '✓ Cobrada (Liquidable)' : '⏳ Crédito Pendiente'}
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        )}

        {/* ============================================================
            MÓDULO: ESTADÍSTICAS Y ANALÍTICA COMERCIAL (BUSINESS INTELLIGENCE)
        ============================================================ */}
        {activeModule === 'analytics' && (
          <main className="flex-1 px-8 py-6 overflow-y-auto bg-[#F8F9FA] dark:bg-[#0B0F17] transition-colors">
            {/* Header del módulo con selector de rango de fechas y moneda */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#FF5C1B]/10 dark:bg-[#FF5C1B]/20 flex items-center justify-center text-[#FF5C1B]">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <h1 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                    Estadísticas y Analítica Comercial
                  </h1>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40">
                    En Vivo
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                  Métricas ejecutivas de rentabilidad real, facturación mayorista, rotación de repuestos y cartera.
                </p>
              </div>

              {/* Controles de Rango de Fechas y Moneda */}
              <div className="flex items-center gap-3 flex-wrap">
                {/* Selector de Rango de Fecha */}
                <div className="flex items-center bg-white dark:bg-[#161F33] border border-gray-200 dark:border-[#28354D] rounded-xl p-1 shadow-2xs">
                  <button
                    onClick={() => setAnalyticsTimeRange('today')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      analyticsTimeRange === 'today'
                        ? 'bg-[#FF5C1B] text-white shadow-xs'
                        : 'text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    Hoy
                  </button>
                  <button
                    onClick={() => setAnalyticsTimeRange('7days')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      analyticsTimeRange === '7days'
                        ? 'bg-[#FF5C1B] text-white shadow-xs'
                        : 'text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    Últimos 7 Días
                  </button>
                  <button
                    onClick={() => setAnalyticsTimeRange('month')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      analyticsTimeRange === 'month'
                        ? 'bg-[#FF5C1B] text-white shadow-xs'
                        : 'text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    Este Mes
                  </button>
                  <button
                    onClick={() => setAnalyticsTimeRange('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      analyticsTimeRange === 'all'
                        ? 'bg-[#FF5C1B] text-white shadow-xs'
                        : 'text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    Todo el Histórico
                  </button>
                </div>

                {/* Selector de Moneda */}
                <div className="flex items-center bg-white dark:bg-[#161F33] border border-gray-200 dark:border-[#28354D] rounded-xl p-1 shadow-2xs">
                  <button
                    onClick={() => setAnalyticsCurrency('USD')}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                      analyticsCurrency === 'USD'
                        ? 'bg-[#1E293B] dark:bg-white text-white dark:text-gray-900 shadow-xs'
                        : 'text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>USD</span>
                  </button>
                  <button
                    onClick={() => setAnalyticsCurrency('VED')}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                      analyticsCurrency === 'VED'
                        ? 'bg-[#1E293B] dark:bg-white text-white dark:text-gray-900 shadow-xs'
                        : 'text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <span>Bs.</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 4 TARJETAS KPI EJECUTIVAS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* KPI 1: Facturación Total */}
              <div className="bg-white dark:bg-[#161F33] border border-gray-200 dark:border-[#28354D] rounded-2xl p-4 shadow-2xs relative overflow-hidden group hover:border-[#10B981]/50 transition">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-500 dark:text-slate-400">
                    Facturación Total
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <DollarSign className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                  {analyticsCurrency === 'USD'
                    ? `$ ${analyticsData.totalBilledUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                    : `Bs. ${analyticsData.totalBilledBs.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                </div>
                <div className="text-[11px] font-medium text-gray-400 dark:text-slate-400 mt-1">
                  {analyticsCurrency === 'USD'
                    ? `≈ Bs. ${analyticsData.totalBilledBs.toLocaleString('es-VE', { minimumFractionDigits: 2 })}`
                    : `≈ $ ${analyticsData.totalBilledUsd.toFixed(2)} USD`}
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-[#1E293B] flex items-center justify-between text-[11px] text-gray-500 dark:text-slate-400">
                  <span>{analyticsData.filteredInvoices.length} facturas</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    {analyticsData.totalUnitsSold} repuestos
                  </span>
                </div>
              </div>

              {/* KPI 2: Margen Bruto de Ganancia Real */}
              <div className="bg-white dark:bg-[#161F33] border border-gray-200 dark:border-[#28354D] rounded-2xl p-4 shadow-2xs relative overflow-hidden group hover:border-[#FF5C1B]/50 transition">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-500 dark:text-slate-400">
                    Margen Bruto de Ganancia Real
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-orange-50 dark:bg-orange-950/50 text-[#FF5C1B] flex items-center justify-center">
                    <Percent className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <div className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                    {analyticsCurrency === 'USD'
                      ? `$ ${analyticsData.totalGrossProfitUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                      : `Bs. ${(analyticsData.totalGrossProfitUsd * bcvRate).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                  </div>
                  <span className="text-xs font-extrabold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                    {analyticsData.grossMarginPct.toFixed(1)}%
                  </span>
                </div>
                <div className="text-[11px] font-medium text-gray-400 dark:text-slate-400 mt-1">
                  Ganancia sobre costo de adquisición
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-[#1E293B] flex items-center justify-between text-[11px] text-gray-500 dark:text-slate-400">
                  <span>Costo Mercancía (COGS):</span>
                  <span className="font-semibold text-gray-700 dark:text-slate-200">
                    ${analyticsData.totalCostUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* KPI 3: Ticket Promedio por Factura */}
              <div className="bg-white dark:bg-[#161F33] border border-gray-200 dark:border-[#28354D] rounded-2xl p-4 shadow-2xs relative overflow-hidden group hover:border-blue-500/50 transition">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-500 dark:text-slate-400">
                    Ticket Promedio
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <Target className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                  {analyticsCurrency === 'USD'
                    ? `$ ${analyticsData.avgTicketUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                    : `Bs. ${(analyticsData.avgTicketUsd * bcvRate).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                </div>
                <div className="text-[11px] font-medium text-gray-400 dark:text-slate-400 mt-1">
                  {analyticsCurrency === 'USD'
                    ? `≈ Bs. ${(analyticsData.avgTicketUsd * bcvRate).toLocaleString('es-VE', { minimumFractionDigits: 2 })}`
                    : `≈ $ ${analyticsData.avgTicketUsd.toFixed(2)} USD`}
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-[#1E293B] flex items-center justify-between text-[11px] text-gray-500 dark:text-slate-400">
                  <span>Promedio por factura:</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    {analyticsData.filteredInvoices.length > 0 ? (analyticsData.totalUnitsSold / analyticsData.filteredInvoices.length).toFixed(1) : 0} unds
                  </span>
                </div>
              </div>

              {/* KPI 4: Valoración del Almacén Mayorista */}
              <div className="bg-white dark:bg-[#161F33] border border-gray-200 dark:border-[#28354D] rounded-2xl p-4 shadow-2xs relative overflow-hidden group hover:border-purple-500/50 transition">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-500 dark:text-slate-400">
                    Almacén Mayorista (Venta)
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                    <Boxes className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                  {analyticsCurrency === 'USD'
                    ? `$ ${analyticsData.inventoryValSale.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                    : `Bs. ${(analyticsData.inventoryValSale * bcvRate).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                </div>
                <div className="text-[11px] font-medium text-gray-400 dark:text-slate-400 mt-1">
                  A Costo: $ {analyticsData.inventoryValCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-[#1E293B] flex items-center justify-between text-[11px] text-gray-500 dark:text-slate-400">
                  <span>Stock disponible:</span>
                  <span className="font-semibold text-purple-600 dark:text-purple-400">
                    {analyticsData.totalWholesaleUnits} unds ({analyticsData.wholesaleActiveCount} SKUs)
                  </span>
                </div>
              </div>
            </div>

            {/* FILA 1: Top Repuestos Más Vendidos + Ventas por Categoría */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-6">
              {/* TOP REPUESTOS MÁS VENDIDOS (7 COLS) */}
              <div className="lg:col-span-7 bg-white dark:bg-[#161F33] border border-gray-200 dark:border-[#28354D] rounded-2xl p-5 shadow-2xs">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#FF5C1B]" />
                      <span>Top Repuestos con Mayor Rotación y Ganancia</span>
                    </h2>
                    <p className="text-[11px] text-gray-500 dark:text-slate-400">
                      Unidades despachadas, facturación e impacto en margen bruto en el período
                    </p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-[#1E293B] text-gray-600 dark:text-slate-300">
                    Top {analyticsData.topProducts.length}
                  </span>
                </div>

                {analyticsData.topProducts.length === 0 ? (
                  <div className="py-12 text-center text-gray-400 dark:text-slate-500 text-xs">
                    No se registran ventas de repuestos en este rango de fechas.
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    {analyticsData.topProducts.map((p, idx) => {
                      const barPct = Math.max(8, (p.units / analyticsData.maxUnitsSold) * 100);
                      const marginPct = p.revenue > 0 ? (p.profit / p.revenue) * 100 : 0;
                      return (
                        <div key={p.sku || idx} className="group p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-[#1a253c] transition border border-transparent hover:border-gray-100 dark:hover:border-[#28354D]">
                          <div className="flex items-center justify-between text-xs mb-1.5 gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <span className={`w-5 h-5 rounded-md flex items-center justify-center font-extrabold text-[10px] shrink-0 ${
                                idx === 0
                                  ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-700'
                                  : idx === 1
                                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600'
                                  : idx === 2
                                  ? 'bg-orange-100 dark:bg-orange-950/80 text-orange-700 dark:text-orange-400 border border-orange-300 dark:border-orange-700'
                                  : 'bg-gray-100 dark:bg-[#1E293B] text-gray-600 dark:text-slate-400'
                              }`}>
                                #{idx + 1}
                              </span>
                              <span className="font-mono text-[11px] font-bold text-[#FF5C1B] shrink-0">
                                {p.sku}
                              </span>
                              <span className="font-semibold text-gray-900 dark:text-white truncate" title={p.name}>
                                {p.name}
                              </span>
                            </div>
                            <div className="text-right shrink-0 flex items-center gap-3">
                              <div className="text-right">
                                <div className="font-black text-gray-900 dark:text-white text-xs">
                                  ${p.revenue.toFixed(2)}
                                </div>
                                <div className="text-[10px] text-gray-400 dark:text-slate-400">
                                  {p.units} unds
                                </div>
                              </div>
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40">
                                +${p.profit.toFixed(0)} ({marginPct.toFixed(0)}%)
                              </span>
                            </div>
                          </div>

                          {/* Barra visual de unidades vendidas */}
                          <div className="w-full h-2 bg-gray-100 dark:bg-[#1E293B] rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-[#FF5C1B] to-amber-400 transition-all duration-500"
                              style={{ width: `${barPct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* DESGLOSE POR CATEGORÍA DE REPUESTOS (5 COLS) */}
              <div className="lg:col-span-5 bg-white dark:bg-[#161F33] border border-gray-200 dark:border-[#28354D] rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <PieChart className="w-4 h-4 text-blue-500" />
                        <span>Ventas por Categoría de Repuesto</span>
                      </h2>
                      <p className="text-[11px] text-gray-500 dark:text-slate-400">
                        Distribución porcentual de facturación por línea técnica
                      </p>
                    </div>
                  </div>

                  {analyticsData.categorySales.length === 0 ? (
                    <div className="py-12 text-center text-gray-400 dark:text-slate-500 text-xs">
                      Sin datos para mostrar en este período.
                    </div>
                  ) : (
                    <>
                      {/* Gráfico Donut SVG Nativo */}
                      <div className="flex items-center justify-center my-3 relative">
                        <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 120 120">
                          {(() => {
                            const radius = 45;
                            const circumference = 2 * Math.PI * radius;
                            let currentOffset = 0;
                            return analyticsData.categorySales.map((cat) => {
                              const strokeLength = (cat.percentage / 100) * circumference;
                              const strokeDasharray = `${strokeLength} ${circumference - strokeLength}`;
                              const strokeDashoffset = -currentOffset;
                              currentOffset += strokeLength;
                              return (
                                <circle
                                  key={cat.name}
                                  cx="60"
                                  cy="60"
                                  r={radius}
                                  fill="transparent"
                                  stroke={cat.color}
                                  strokeWidth="16"
                                  strokeDasharray={strokeDasharray}
                                  strokeDashoffset={strokeDashoffset}
                                  className="transition-all duration-500 hover:opacity-80"
                                />
                              );
                            });
                          })()}
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                          <span className="text-[10px] text-gray-400 dark:text-slate-400 font-medium">Líder</span>
                          <span className="text-xs font-black text-gray-900 dark:text-white">
                            {analyticsData.categorySales[0]?.percentage.toFixed(0)}%
                          </span>
                        </div>
                      </div>

                      {/* Leyenda interactiva */}
                      <div className="space-y-2 mt-4">
                        {analyticsData.categorySales.map((cat) => (
                          <div key={cat.name} className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2 min-w-0">
                              <span
                                className="w-2.5 h-2.5 rounded-full shrink-0"
                                style={{ backgroundColor: cat.color }}
                              />
                              <span className="font-semibold text-gray-700 dark:text-slate-300 truncate">
                                {cat.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="font-bold text-gray-900 dark:text-white">
                                ${cat.amount.toFixed(2)}
                              </span>
                              <span className="text-[10px] font-mono text-gray-400 dark:text-slate-400 w-10 text-right">
                                {cat.percentage.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* FILA 2: Rendimiento por Vendedor + Salud de Cobranza & Top Clientes */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-6">
              {/* RENDIMIENTO POR VENDEDOR (6 COLS) */}
              <div className="lg:col-span-6 bg-white dark:bg-[#161F33] border border-gray-200 dark:border-[#28354D] rounded-2xl p-5 shadow-2xs">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <BarChart2 className="w-4 h-4 text-emerald-500" />
                      <span>Rendimiento Comercial por Asesor</span>
                    </h2>
                    <p className="text-[11px] text-gray-500 dark:text-slate-400">
                      Facturación alcanzada, comisiones y efectividad de cobro
                    </p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40">
                    {sellers.filter(s => !s.isDeleted).length} Asesores
                  </span>
                </div>

                <div className="space-y-3.5">
                  {analyticsData.sellersRanking.map((s) => {
                    const sellerObj = sellers.find(item => item.id === s.id);
                    const barPct = Math.max(8, (s.totalUsd / analyticsData.maxSellerSales) * 100);
                    const collectionRate = s.totalUsd > 0 ? (s.paidUsd / s.totalUsd) * 100 : 0;
                    return (
                      <div key={s.id} className="p-3 rounded-xl bg-gray-50/70 dark:bg-[#1a253c]/70 border border-gray-100 dark:border-[#28354D]">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                              {s.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold text-xs text-gray-900 dark:text-white flex items-center gap-1.5">
                                <span>{s.name}</span>
                                <span className="text-[10px] font-normal text-gray-400 dark:text-slate-400">
                                  ({sellerObj?.zone || 'Nacional'})
                                </span>
                              </div>
                              <div className="text-[10px] text-gray-500 dark:text-slate-400">
                                {s.invoicesCount} facturas emitidas
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-black text-sm text-gray-900 dark:text-white">
                              ${s.totalUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </div>
                            <div className="text-[10px] text-[#FF5C1B] font-semibold">
                              Comisión: ${s.commissionUsd.toFixed(2)}
                            </div>
                          </div>
                        </div>

                        {/* Barra de progreso de facturación */}
                        <div className="w-full h-1.5 bg-gray-200 dark:bg-[#161F33] rounded-full overflow-hidden mb-2">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                            style={{ width: `${barPct}%` }}
                          />
                        </div>

                        {/* Micro-métrica de Cobranza */}
                        <div className="flex items-center justify-between text-[10px] text-gray-500 dark:text-slate-400">
                          <span>Efectividad Cobranza:</span>
                          <span className={`font-semibold ${collectionRate >= 80 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                            {collectionRate.toFixed(0)}% cobrado (${s.pendingUsd.toFixed(0)} pend.)
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SALUD DE COBRANZA & CARTERA DE CLIENTES (6 COLS) */}
              <div className="lg:col-span-6 space-y-5">
                {/* SALUD DE COBRANZA */}
                <div className="bg-white dark:bg-[#161F33] border border-gray-200 dark:border-[#28354D] rounded-2xl p-5 shadow-2xs">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Wallet className="w-4 h-4 text-[#FF5C1B]" />
                        <span>Salud de Cobranza (Cartera CxC)</span>
                      </h2>
                      <p className="text-[11px] text-gray-500 dark:text-slate-400">
                        Estado del flujo de caja sobre el monto facturado
                      </p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400">
                      {analyticsData.totalBilledUsd > 0
                        ? `${((analyticsData.totalCollectedUsd / analyticsData.totalBilledUsd) * 100).toFixed(0)}% Efectivo`
                        : '0%'}
                    </span>
                  </div>

                  {/* Barra segmentada */}
                  <div className="w-full h-3 bg-gray-100 dark:bg-[#1E293B] rounded-full overflow-hidden flex mb-3">
                    <div
                      title={`Cobrado: $${analyticsData.totalCollectedUsd.toFixed(2)}`}
                      className="bg-emerald-500 h-full transition-all duration-500"
                      style={{
                        width: `${analyticsData.totalBilledUsd > 0 ? (analyticsData.totalCollectedUsd / analyticsData.totalBilledUsd) * 100 : 0}%`
                      }}
                    />
                    <div
                      title={`Pendiente Corriente: $${Math.max(0, analyticsData.totalPendingUsd - analyticsData.totalOverdueUsd).toFixed(2)}`}
                      className="bg-amber-400 h-full transition-all duration-500"
                      style={{
                        width: `${analyticsData.totalBilledUsd > 0 ? (Math.max(0, analyticsData.totalPendingUsd - analyticsData.totalOverdueUsd) / analyticsData.totalBilledUsd) * 100 : 0}%`
                      }}
                    />
                    <div
                      title={`Vencido: $${analyticsData.totalOverdueUsd.toFixed(2)}`}
                      className="bg-red-500 h-full transition-all duration-500"
                      style={{
                        width: `${analyticsData.totalBilledUsd > 0 ? (analyticsData.totalOverdueUsd / analyticsData.totalBilledUsd) * 100 : 0}%`
                      }}
                    />
                  </div>

                  {/* Tres bloques numéricos */}
                  <div className="grid grid-cols-3 gap-2 text-center pt-2">
                    <div className="p-2 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
                      <div className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">Cobrado Real</div>
                      <div className="text-xs font-black text-emerald-900 dark:text-emerald-200 mt-0.5">
                        ${analyticsData.totalCollectedUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-amber-50/60 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40">
                      <div className="text-[10px] text-amber-700 dark:text-amber-400 font-semibold">Crédito Vigente</div>
                      <div className="text-xs font-black text-amber-900 dark:text-amber-200 mt-0.5">
                        ${Math.max(0, analyticsData.totalPendingUsd - analyticsData.totalOverdueUsd).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-red-50/60 dark:bg-red-950/30 border border-red-100 dark:border-red-900/40">
                      <div className="text-[10px] text-red-700 dark:text-red-400 font-semibold">Saldo Vencido</div>
                      <div className="text-xs font-black text-red-900 dark:text-red-200 mt-0.5">
                        ${analyticsData.totalOverdueUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* CONCENTRACIÓN DE VENTAS POR CLIENTE */}
                <div className="bg-white dark:bg-[#161F33] border border-gray-200 dark:border-[#28354D] rounded-2xl p-5 shadow-2xs">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-500" />
                        <span>Top Clientes Mayoristas</span>
                      </h2>
                      <p className="text-[11px] text-gray-500 dark:text-slate-400">
                        Concentración de compras y volumen por cliente aliado
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {analyticsData.topClients.map((cli, idx) => {
                      const sharePct = analyticsData.totalBilledUsd > 0 ? (cli.totalUsd / analyticsData.totalBilledUsd) * 100 : 0;
                      return (
                        <div key={cli.rif || idx} className="flex items-center justify-between text-xs p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-[#1a253c] transition">
                          <div className="min-w-0 pr-2">
                            <div className="font-semibold text-gray-900 dark:text-white truncate">
                              {cli.name}
                            </div>
                            <div className="text-[10px] text-gray-400 dark:text-slate-400 font-mono">
                              {cli.rif} · {cli.invoicesCount} facturas
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="font-bold text-gray-900 dark:text-white">
                              ${cli.totalUsd.toFixed(2)}
                            </div>
                            <span className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold">
                              {sharePct.toFixed(1)}% total
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* FILA 3: Evolución Cronológica de Ventas (Interactive SVG Daily Bar Chart) */}
            <div className="bg-white dark:bg-[#161F33] border border-gray-200 dark:border-[#28354D] rounded-2xl p-5 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                <div>
                  <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#FF5C1B]" />
                    <span>Evolución Cronológica de Facturación</span>
                  </h2>
                  <p className="text-[11px] text-gray-500 dark:text-slate-400">
                    Histórico diario interactivo de ventas mayoristas emitidas
                  </p>
                </div>
                {hoveredTrendIdx !== null && analyticsData.dailyTrend[hoveredTrendIdx] && (
                  <div className="text-xs px-3 py-1 rounded-lg bg-orange-50 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800/40 text-gray-900 dark:text-white flex items-center gap-2 animate-fadeIn">
                    <span className="font-mono text-[#FF5C1B] font-bold">
                      {analyticsData.dailyTrend[hoveredTrendIdx].date}
                    </span>
                    <span>·</span>
                    <span className="font-black text-emerald-600 dark:text-emerald-400">
                      ${analyticsData.dailyTrend[hoveredTrendIdx].amount.toFixed(2)} USD
                    </span>
                    <span className="text-[10px] text-gray-400 dark:text-slate-400">
                      (Bs. {(analyticsData.dailyTrend[hoveredTrendIdx].amount * bcvRate).toLocaleString('es-VE', { minimumFractionDigits: 2 })})
                    </span>
                  </div>
                )}
              </div>

              {analyticsData.dailyTrend.length === 0 ? (
                <div className="py-12 text-center text-gray-400 dark:text-slate-500 text-xs">
                  Sin facturas emitidas en el rango seleccionado.
                </div>
              ) : (
                <div className="w-full overflow-x-auto">
                  <div className="min-w-[500px] h-44 relative flex items-end justify-between gap-2 pt-6 pb-6 px-4">
                    {/* Líneas guía sutiles horizontales */}
                    <div className="absolute inset-x-4 top-6 border-b border-gray-100 dark:border-[#1E293B] pointer-events-none" />
                    <div className="absolute inset-x-4 top-20 border-b border-gray-100 dark:border-[#1E293B] pointer-events-none" />
                    <div className="absolute inset-x-4 bottom-6 border-b border-gray-200 dark:border-[#28354D] pointer-events-none" />

                    {analyticsData.dailyTrend.map((d, i) => {
                      const heightPct = Math.max(12, (d.amount / analyticsData.maxDailyAmount) * 100);
                      const isHovered = hoveredTrendIdx === i;
                      return (
                        <div
                          key={d.date}
                          className="flex-1 flex flex-col items-center h-full justify-end relative group cursor-pointer"
                          onMouseEnter={() => setHoveredTrendIdx(i)}
                          onMouseLeave={() => setHoveredTrendIdx(null)}
                        >
                          {/* Monto flotante en hover */}
                          {isHovered && (
                            <div className="absolute -top-7 bg-gray-900 text-white dark:bg-white dark:text-gray-900 text-[10px] font-bold px-2 py-0.5 rounded shadow-md whitespace-nowrap z-10 animate-fadeIn">
                              ${d.amount.toFixed(0)}
                            </div>
                          )}

                          {/* Barra de altura proporcional */}
                          <div
                            className={`w-full max-w-[42px] rounded-t-lg transition-all duration-300 ${
                              isHovered
                                ? 'bg-gradient-to-t from-[#FF5C1B] to-amber-300 shadow-md scale-105'
                                : 'bg-gradient-to-t from-[#FF5C1B] to-orange-400 hover:opacity-90'
                            }`}
                            style={{ height: `${heightPct}%` }}
                          />

                          {/* Etiqueta de fecha */}
                          <div className="text-[10px] font-mono text-gray-500 dark:text-slate-400 mt-2 truncate">
                            {d.label}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </main>
        )}

        {/* ============================================================
            MÓDULO 5: CARTERA DE CLIENTES MAYORISTAS
        ============================================================ */}
        {activeModule === 'clients' && (
          <main className="flex-1 px-8 py-6 overflow-y-auto bg-[#F8F9FA] dark:bg-[#0B0F17] transition-colors">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Cartera de Clientes y Aliados Comerciales
                </h1>
                <p className="text-xs text-gray-500 dark:text-slate-400">
                  Talleres, distribuidores y casas de repuestos afiliadas a Repuestos Sotomayor, C.A.
                </p>
              </div>
              <button
                onClick={() => setNewClientModalOpen(true)}
                className="bg-[#FF5C1B] hover:bg-[#ff4600] text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs group transition"
              >
                <UseAnimations
                  animation={plusToXAnimation}
                  size={16}
                  strokeColor="#FFFFFF"
                  interaction="hover-replay"
                />
                <span>Nuevo Cliente Mayorista</span>
              </button>
            </div>

            {clients.filter(c => !c.isDeleted).length === 0 ? (
              <div className="bg-white dark:bg-[#0E1422] p-12 rounded-2xl border border-dashed border-gray-300 dark:border-[#28354D] text-center max-w-lg mx-auto my-12 shadow-2xs">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 dark:bg-orange-950/40 text-[#FF5C1B] flex items-center justify-center mx-auto mb-4 border border-orange-200 dark:border-orange-800/40">
                  <Users className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-base text-gray-900 dark:text-white mb-1">
                  Cartera de Clientes Lista y Limpia
                </h3>
                <p className="text-xs text-gray-500 dark:text-slate-400 mb-6 max-w-sm mx-auto">
                  La base de datos en Supabase está preparada. Comienza registrando tu primer cliente o aliado comercial mayorista.
                </p>
                <button
                  type="button"
                  onClick={() => setNewClientModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-[#FF5C1B] hover:bg-[#ff4600] text-white text-xs font-bold transition shadow-xs cursor-pointer inline-flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Registrar Primer Cliente Mayorista</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {clients.filter(c => !c.isDeleted).map(c => {
                  const clientInvoices = invoices.filter(inv =>
                    inv.clientId === c.id ||
                    inv.clientRif.toLowerCase().trim() === c.rif.toLowerCase().trim() ||
                    inv.clientName.toLowerCase().trim() === c.name.toLowerCase().trim()
                  );
                  const totalPending = clientInvoices.reduce((sum, inv) => {
                    const p = inv.balancePendingUsd !== undefined ? inv.balancePendingUsd : (inv.status === 'Cobrada' ? 0 : inv.totalUsd);
                    return sum + p;
                  }, 0);

                  return (
                    <div
                      key={c.id}
                      className="bg-white dark:bg-[#0E1422] p-5 rounded-xl border border-gray-200 dark:border-[#1E293B] shadow-2xs hover:border-gray-300 dark:hover:border-[#28354D] transition flex flex-col justify-between gap-4 group"
                    >
                      {/* Header de la tarjeta con nombre, datos y botón eliminar */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <h3 className="font-bold text-sm text-gray-900 dark:text-white truncate" title={c.name}>
                            {c.name}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-slate-400 font-mono mt-0.5">
                            RIF: {c.rif} • {c.city}
                          </p>
                          {c.phone && (
                            <p className="text-[11px] text-gray-400 dark:text-slate-500 font-mono mt-0.5">
                              Tel: {c.phone}
                            </p>
                          )}
                        </div>

                        {/* Botón de Papelera Roja para eliminar cliente */}
                        <button
                          type="button"
                          onClick={() => handleRequestDeleteClient(c)}
                          title="Eliminar cliente"
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition cursor-pointer shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Resumen de facturación del cliente y botones de acción */}
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs pt-3 border-t border-gray-100 dark:border-[#1E293B]">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 text-[11px] border border-blue-200 dark:border-blue-900/40">
                            {clientInvoices.length} {clientInvoices.length === 1 ? 'Factura emitida' : 'Facturas emitidas'}
                          </span>
                          {totalPending > 0.009 ? (
                            <span className="text-[11px] font-semibold text-red-600 dark:text-red-400">
                              Deuda: ${totalPending.toFixed(2)}
                            </span>
                          ) : (
                            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                              Solvente
                            </span>
                          )}
                        </div>

                        {/* Botones de Acción */}
                        <div className="flex items-center gap-2">
                          {/* Botón Ver Historial */}
                          <button
                            type="button"
                            onClick={() => setClientHistoryModal(c)}
                            className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-[#28354D] text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-[#161F33] text-xs font-semibold cursor-pointer transition flex items-center gap-1.5"
                            title="Ver expediente e historial de facturas emitidas"
                          >
                            <History className="w-3.5 h-3.5 text-[#FF5C1B]" />
                            <span>Historial ({clientInvoices.length})</span>
                          </button>

                          {/* Botón Facturar a Cliente */}
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedClientId(c.id);
                              setActiveModule('invoicing');
                            }}
                            className="px-3 py-1.5 rounded-lg bg-[#FF5C1B] hover:bg-[#ff4600] text-white text-xs font-semibold cursor-pointer transition shadow-xs flex items-center gap-1.5"
                          >
                            <UseAnimations
                              animation={fileTextAnimation}
                              size={14}
                              strokeColor="#FFFFFF"
                              interaction="hover-replay"
                            />
                            <span>Facturar</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        )}
      </div>

      {/* ============================================================
          MODAL DE CREAR NUEVO CLIENTE
      ============================================================ */}
      {newClientModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0E1422] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 dark:border-[#1E293B]">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-[#1E293B] mb-4">
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                Registrar Nuevo Cliente Mayorista
              </h3>
              <button
                onClick={() => setNewClientModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateClient} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 dark:text-slate-300 mb-1">
                  Razón Social / Nombre Comercial
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Distribuidora Automotriz Michelena, C.A."
                  value={newClientForm.name}
                  onChange={(e) => setNewClientForm({ ...newClientForm, name: e.target.value })}
                  className="w-full border border-gray-300 dark:border-[#28354D] rounded-lg px-3 py-2 bg-white dark:bg-[#161F33] text-gray-900 dark:text-white focus:outline-none focus:border-[#FF5C1B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 dark:text-slate-300 mb-1">
                    RIF de la Empresa
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. J-12345678-9"
                    value={newClientForm.rif}
                    onChange={(e) => setNewClientForm({ ...newClientForm, rif: e.target.value })}
                    className="w-full border border-gray-300 dark:border-[#28354D] rounded-lg px-3 py-2 font-mono uppercase bg-white dark:bg-[#161F33] text-gray-900 dark:text-white focus:outline-none focus:border-[#FF5C1B]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 dark:text-slate-300 mb-1">
                    Ciudad / Estado
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Valencia, Carabobo"
                    value={newClientForm.city}
                    onChange={(e) => setNewClientForm({ ...newClientForm, city: e.target.value })}
                    className="w-full border border-gray-300 dark:border-[#28354D] rounded-lg px-3 py-2 bg-white dark:bg-[#161F33] text-gray-900 dark:text-white focus:outline-none focus:border-[#FF5C1B]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100 dark:border-[#1E293B]">
                <button
                  type="button"
                  onClick={() => setNewClientModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-200 dark:border-[#28354D] text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-[#161F33] font-semibold cursor-pointer transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#FF5C1B] hover:bg-[#ff4600] text-white font-bold cursor-pointer transition shadow-xs"
                >
                  Guardar Cliente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================
          MODAL DE CREAR NUEVO VENDEDOR / ASESOR COMERCIAL
      ============================================================ */}
      {newSellerModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-[#0E1422] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 dark:border-[#1E293B]">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-[#1E293B] mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#FF5C1B]/10 text-[#FF5C1B] flex items-center justify-center font-bold">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                    Registrar Nuevo Asesor Comercial
                  </h3>
                  <p className="text-[11px] text-gray-400 dark:text-slate-400">
                    Equipo de ventas y distribución mayorista
                  </p>
                </div>
              </div>
              <button
                onClick={() => setNewSellerModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSeller} className="space-y-3.5 text-xs">
              {/* Preview Dinámico del Avatar */}
              <div className="flex items-center gap-3 bg-gray-50 dark:bg-[#161F33] p-3 rounded-xl border border-gray-100 dark:border-[#28354D]">
                <div className="w-11 h-11 rounded-full bg-orange-100 dark:bg-orange-950/70 text-[#FF5C1B] font-extrabold text-sm flex items-center justify-center shadow-xs border border-orange-200 dark:border-orange-900/60 shrink-0">
                  {getAvatarInitials(newSellerForm.name || 'Nuevo Asesor')}
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] text-gray-400 dark:text-slate-400 uppercase font-bold block">
                    Previsualización de Avatar
                  </span>
                  <div className="font-bold text-gray-800 dark:text-white truncate">
                    {newSellerForm.name || 'Nombre del Asesor'}
                  </div>
                  <div className="text-[11px] text-gray-500 dark:text-slate-400 truncate">
                    {newSellerForm.zone || 'Zona comercial no asignada'}
                  </div>
                </div>
              </div>

              {/* Nombre Completo */}
              <div>
                <label className="block font-semibold text-gray-700 dark:text-slate-300 mb-1">
                  Nombre Completo del Asesor *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Pedro Pérez"
                  value={newSellerForm.name}
                  onChange={(e) => setNewSellerForm({ ...newSellerForm, name: e.target.value })}
                  className="w-full border border-gray-300 dark:border-[#28354D] rounded-lg px-3 py-2 bg-white dark:bg-[#161F33] text-gray-900 dark:text-white focus:outline-none focus:border-[#FF5C1B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Cédula */}
                <div>
                  <label className="block font-semibold text-gray-700 dark:text-slate-300 mb-1">
                    Cédula / Identificación
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. V-14.892.120"
                    value={newSellerForm.cedula}
                    onChange={(e) => setNewSellerForm({ ...newSellerForm, cedula: e.target.value })}
                    className="w-full border border-gray-300 dark:border-[#28354D] rounded-lg px-3 py-2 font-mono uppercase bg-white dark:bg-[#161F33] text-gray-900 dark:text-white focus:outline-none focus:border-[#FF5C1B]"
                  />
                </div>

                {/* Teléfono / WhatsApp */}
                <div>
                  <label className="block font-semibold text-gray-700 dark:text-slate-300 mb-1">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. 0414-1234567"
                    value={newSellerForm.phone}
                    onChange={(e) => setNewSellerForm({ ...newSellerForm, phone: e.target.value })}
                    className="w-full border border-gray-300 dark:border-[#28354D] rounded-lg px-3 py-2 font-mono bg-white dark:bg-[#161F33] text-gray-900 dark:text-white focus:outline-none focus:border-[#FF5C1B]"
                  />
                </div>
              </div>

              {/* Zona Comercial a Ancho Completo */}
              <div>
                <label className="block font-semibold text-gray-700 dark:text-slate-300 mb-1">
                  Zona / Ruta Comercial *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Valencia / Naguanagua"
                  value={newSellerForm.zone}
                  onChange={(e) => setNewSellerForm({ ...newSellerForm, zone: e.target.value })}
                  className="w-full border border-gray-300 dark:border-[#28354D] rounded-lg px-3 py-2 bg-white dark:bg-[#161F33] text-gray-900 dark:text-white focus:outline-none focus:border-[#FF5C1B]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100 dark:border-[#1E293B]">
                <button
                  type="button"
                  onClick={() => setNewSellerModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-200 dark:border-[#28354D] text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-[#161F33] font-semibold cursor-pointer transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#FF5C1B] hover:bg-[#ff4600] text-white font-bold cursor-pointer transition shadow-xs flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Guardar Vendedor</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================
          MODAL DE CONFIRMACIÓN PARA ELIMINAR VENDEDOR
      ============================================================ */}
      {sellerToDelete && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-[#0E1422] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 dark:border-[#1E293B]">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-[#1E293B] mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center font-bold">
                  <Trash2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                    ¿Eliminar Asesor Comercial?
                  </h3>
                  <p className="text-[11px] text-gray-400 dark:text-slate-400">
                    Confirmación de eliminación de vendedor
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSellerToDelete(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#161F33] border border-gray-100 dark:border-[#28354D] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 dark:text-slate-400 font-medium">Nombre:</span>
                  <span className="font-bold text-gray-900 dark:text-white">{sellerToDelete.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 dark:text-slate-400 font-medium">Zona asignada:</span>
                  <span className="text-gray-800 dark:text-slate-200 font-semibold">{sellerToDelete.zone}</span>
                </div>
                {sellerToDelete.cedula && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-slate-400 font-medium">Cédula:</span>
                    <span className="font-mono text-gray-800 dark:text-slate-200">{sellerToDelete.cedula}</span>
                  </div>
                )}
                {sellerToDelete.phone && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-slate-400 font-medium">Teléfono:</span>
                    <span className="font-mono text-gray-800 dark:text-slate-200">{sellerToDelete.phone}</span>
                  </div>
                )}
              </div>

              <p className="text-xs text-gray-600 dark:text-slate-300">
                ¿Estás seguro de que deseas eliminar al asesor <strong>{sellerToDelete.name}</strong>? Esta acción lo removerá de la lista activa del sistema y de los selectores de facturación.
              </p>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100 dark:border-[#1E293B]">
                <button
                  type="button"
                  onClick={() => setSellerToDelete(null)}
                  className="px-4 py-2 rounded-lg border border-gray-200 dark:border-[#28354D] text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-[#161F33] font-semibold cursor-pointer transition"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDeleteSeller}
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold cursor-pointer transition shadow-xs flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Sí, eliminar asesor</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          MODAL DE ADVERTENCIA: CLIENTE BLOQUEADO PARA ELIMINACIÓN
      ============================================================ */}
      {clientBlockedWarning && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-[#0E1422] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 dark:border-[#1E293B]">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-[#1E293B] mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold border border-amber-200 dark:border-amber-900/40">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                    Eliminación Bloqueada por Seguridad
                  </h3>
                  <span className="text-[11px] text-gray-500 dark:text-slate-400">
                    Integridad contable estricta
                  </span>
                </div>
              </div>
              <button
                onClick={() => setClientBlockedWarning(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs mb-4">
              <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
                No es posible eliminar al cliente <strong className="text-gray-900 dark:text-white">{clientBlockedWarning.client.name}</strong> ({clientBlockedWarning.client.rif}) porque tiene <strong className="text-amber-600 dark:text-amber-400">{clientBlockedWarning.count} {clientBlockedWarning.count === 1 ? 'factura registrada' : 'facturas registradas'}</strong> en el sistema.
              </p>

              <div className="p-3 bg-amber-50/60 dark:bg-[#161F33] rounded-xl border border-amber-200 dark:border-[#28354D] space-y-2">
                <div className="flex justify-between text-gray-600 dark:text-slate-300">
                  <span>Total Facturado Histórico:</span>
                  <span className="font-mono font-bold text-gray-900 dark:text-white">
                    ${clientBlockedWarning.totalBilled.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-slate-300">
                  <span>Saldo Pendiente por Cobrar:</span>
                  <span className={`font-mono font-bold ${clientBlockedWarning.pendingDebt > 0 ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                    ${clientBlockedWarning.pendingDebt.toFixed(2)}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-gray-500 dark:text-slate-400 leading-relaxed">
                Para garantizar la trazabilidad contable, fiscal y de auditoría de Repuestos Sotomayor, C.A., los clientes con facturas emitidas no pueden eliminarse físicamente del sistema.
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-gray-100 dark:border-[#1E293B]">
              <button
                type="button"
                onClick={() => {
                  const targetClient = clientBlockedWarning.client;
                  setClientBlockedWarning(null);
                  setClientHistoryModal(targetClient);
                }}
                className="px-3.5 py-2 rounded-lg bg-[#FF5C1B] hover:bg-[#ff4600] text-white font-semibold text-xs cursor-pointer transition shadow-xs flex items-center gap-1.5"
              >
                <History className="w-3.5 h-3.5" />
                <span>Ver Expediente de Facturas</span>
              </button>
              <button
                type="button"
                onClick={() => setClientBlockedWarning(null)}
                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-[#28354D] text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-[#161F33] font-semibold text-xs cursor-pointer transition"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          MODAL DE CONFIRMACIÓN: ELIMINAR CLIENTE SIN FACTURAS
      ============================================================ */}
      {clientToDelete && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-[#0E1422] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 dark:border-[#1E293B]">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-[#1E293B] mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center font-bold border border-red-200 dark:border-red-900/40">
                  <Trash2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                    Confirmar Eliminación de Cliente
                  </h3>
                  <span className="text-[11px] text-gray-500 dark:text-slate-400">
                    Acción permanente
                  </span>
                </div>
              </div>
              <button
                onClick={() => setClientToDelete(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs mb-4">
              <p className="text-gray-700 dark:text-slate-300">
                ¿Estás seguro de que deseas eliminar a <strong className="text-gray-900 dark:text-white">{clientToDelete.name}</strong> de la cartera de clientes?
              </p>

              <div className="p-3 bg-gray-50 dark:bg-[#161F33] rounded-xl border border-gray-200 dark:border-[#28354D] space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-slate-400">RIF:</span>
                  <span className="font-mono font-semibold text-gray-800 dark:text-slate-200">{clientToDelete.rif}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-slate-400">Ciudad:</span>
                  <span className="font-medium text-gray-800 dark:text-slate-200">{clientToDelete.city}</span>
                </div>
                {clientToDelete.phone && (
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-slate-400">Teléfono:</span>
                    <span className="font-mono text-gray-800 dark:text-slate-200">{clientToDelete.phone}</span>
                  </div>
                )}
              </div>

              <p className="text-[11px] text-gray-500 dark:text-slate-400">
                Este cliente no registra facturas emitidas. Será removido de forma segura de los selectores de facturación y de la base de datos.
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-gray-100 dark:border-[#1E293B]">
              <button
                type="button"
                onClick={() => setClientToDelete(null)}
                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-[#28354D] text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-[#161F33] font-semibold cursor-pointer transition"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteClient}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold cursor-pointer transition shadow-xs flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Sí, eliminar cliente</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          MODAL EXPEDIENTE & HISTORIAL DE FACTURAS POR CLIENTE
      ============================================================ */}
      {clientHistoryModal && (() => {
        const c = clientHistoryModal;
        const clientInvoices = invoices.filter(inv =>
          inv.clientId === c.id ||
          inv.clientRif.toLowerCase().trim() === c.rif.toLowerCase().trim() ||
          inv.clientName.toLowerCase().trim() === c.name.toLowerCase().trim()
        );

        const totalBilled = clientInvoices.reduce((sum, inv) => sum + (inv.totalUsd || 0), 0);
        const totalPaid = clientInvoices.reduce((sum, inv) => sum + (inv.amountPaidUsd || 0), 0);
        const totalPending = clientInvoices.reduce((sum, inv) => {
          const p = inv.balancePendingUsd !== undefined ? inv.balancePendingUsd : (inv.status === 'Cobrada' ? 0 : inv.totalUsd);
          return sum + p;
        }, 0);
        const overdueCount = clientInvoices.filter(inv => {
          const pend = inv.balancePendingUsd !== undefined ? inv.balancePendingUsd : (inv.status === 'Cobrada' ? 0 : inv.totalUsd);
          return pend > 0 && (inv.status === 'Vencida' || (inv.dueDate && new Date(inv.dueDate) < new Date('2026-10-24')));
        }).length;

        return (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white dark:bg-[#0E1422] rounded-2xl max-w-4xl w-full p-6 shadow-2xl border border-gray-200 dark:border-[#1E293B] flex flex-col max-h-[90vh]">
              {/* Header del Expediente */}
              <div className="flex items-start justify-between pb-4 border-b border-gray-100 dark:border-[#1E293B] mb-4 shrink-0">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/50 text-[#FF5C1B] flex items-center justify-center shrink-0 border border-orange-200 dark:border-orange-900/40 font-bold">
                    <History className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base text-gray-900 dark:text-white">
                        Expediente de Cliente: {c.name}
                      </h3>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-gray-100 dark:bg-[#1E293B] text-gray-600 dark:text-slate-300 font-semibold border border-gray-200 dark:border-[#28354D]">
                        {c.rif}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">
                      {c.city} • {c.phone || '0414-0000000'} • <span className="text-gray-600 dark:text-slate-300">{c.address || 'Dirección de despacho registrada'}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedClientId(c.id);
                      setClientHistoryModal(null);
                      setActiveModule('invoicing');
                    }}
                    className="px-3 py-1.5 bg-[#FF5C1B] hover:bg-[#ff4600] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition shadow-xs cursor-pointer"
                  >
                    <Plus size={13} />
                    <span>Facturar a este Cliente</span>
                  </button>
                  <button
                    onClick={() => setClientHistoryModal(null)}
                    className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-lg transition cursor-pointer"
                    title="Cerrar expediente"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* KPI Cards del Cliente */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5 shrink-0">
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#161F33] border border-gray-200 dark:border-[#28354D]">
                  <span className="text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider block">
                    Total Facturado
                  </span>
                  <div className="text-base font-bold text-gray-900 dark:text-white font-mono mt-0.5">
                    ${totalBilled.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <span className="text-[10px] text-gray-400 dark:text-slate-500 font-mono">
                    Bs. {(totalBilled * bcvRate).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#161F33] border border-gray-200 dark:border-[#28354D]">
                  <span className="text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider block">
                    Total Cobrado / Abonos
                  </span>
                  <div className="text-base font-bold text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
                    ${totalPaid.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <span className="text-[10px] text-emerald-600/80 dark:text-emerald-400/80">
                    {totalBilled > 0 ? `${((totalPaid / totalBilled) * 100).toFixed(0)}% cubierto` : '0%'}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#161F33] border border-gray-200 dark:border-[#28354D]">
                  <span className="text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider block">
                    Saldo Pendiente (CxC)
                  </span>
                  <div className={`text-base font-bold font-mono mt-0.5 ${totalPending > 0.009 ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                    ${totalPending.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <span className="text-[10px] text-gray-400 dark:text-slate-500 font-mono">
                    Bs. {(totalPending * bcvRate).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#161F33] border border-gray-200 dark:border-[#28354D]">
                  <span className="text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider block">
                    Facturas Emitidas
                  </span>
                  <div className="text-base font-bold text-gray-900 dark:text-white font-mono mt-0.5">
                    {clientInvoices.length} docs
                  </div>
                  <span className={`text-[10px] font-semibold ${overdueCount > 0 ? 'text-red-500' : 'text-gray-400 dark:text-slate-500'}`}>
                    {overdueCount > 0 ? `${overdueCount} vencidas por cobrar` : 'Todas al día'}
                  </span>
                </div>
              </div>

              {/* Título de la tabla */}
              <div className="flex items-center justify-between mb-2 shrink-0">
                <h4 className="text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                  Historial Cronológico de Facturas Emitidas
                </h4>
                <span className="text-[11px] text-gray-400 dark:text-slate-500">
                  {clientInvoices.length} {clientInvoices.length === 1 ? 'documento' : 'documentos'}
                </span>
              </div>

              {/* Tabla de Facturas del Cliente */}
              <div className="overflow-y-auto flex-1 border border-gray-200 dark:border-[#1E293B] rounded-xl">
                {clientInvoices.length === 0 ? (
                  <div className="py-12 text-center text-gray-400 dark:text-slate-500 flex flex-col items-center justify-center gap-2">
                    <FileText className="w-8 h-8 text-gray-300 dark:text-slate-600" />
                    <span className="font-semibold text-gray-700 dark:text-slate-300 text-sm">
                      Este cliente aún no registra facturas emitidas
                    </span>
                    <span className="text-xs text-gray-400 dark:text-slate-500 max-w-sm">
                      Cuando emitas una cotización, nota de entrega o factura a nombre de este cliente, se archivará y totalizará en este expediente.
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedClientId(c.id);
                        setClientHistoryModal(null);
                        setActiveModule('invoicing');
                      }}
                      className="mt-2 px-3 py-1.5 bg-[#FF5C1B] hover:bg-[#ff4600] text-white text-xs font-semibold rounded-lg transition cursor-pointer shadow-xs"
                    >
                      Facturar a {c.name}
                    </button>
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse text-xs">
                    <thead className="sticky top-0 bg-gray-50 dark:bg-[#12192B] border-b border-gray-200 dark:border-[#1E293B] text-[11px] font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                      <tr>
                        <th className="py-2.5 px-3">Documento</th>
                        <th className="py-2.5 px-2">Emisión</th>
                        <th className="py-2.5 px-2">Vencimiento</th>
                        <th className="py-2.5 px-2">Vendedor</th>
                        <th className="py-2.5 px-2">Condición</th>
                        <th className="py-2.5 px-2 text-right">Total ($)</th>
                        <th className="py-2.5 px-2 text-right">Abonado ($)</th>
                        <th className="py-2.5 px-2 text-right">Saldo ($)</th>
                        <th className="py-2.5 px-2 text-center">Estado</th>
                        <th className="py-2.5 pr-3 pl-2 text-right">Acción</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-[#1E293B]">
                      {clientInvoices.map(inv => {
                        const pendingUsd = inv.balancePendingUsd !== undefined ? inv.balancePendingUsd : (inv.status === 'Cobrada' ? 0 : inv.totalUsd);
                        const paidUsd = inv.amountPaidUsd || 0;
                        const isOverdue = pendingUsd > 0 && (inv.status === 'Vencida' || (inv.dueDate && new Date(inv.dueDate) < new Date('2026-10-24')));

                        return (
                          <tr key={inv.id} className="hover:bg-gray-50/70 dark:hover:bg-[#161F33]/40 transition group">
                            {/* Documento */}
                            <td className="py-2.5 px-3 whitespace-nowrap">
                              <div className="flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => setPreviewInvoice(inv)}
                                  className="font-bold text-[#FF5C1B] hover:underline font-mono text-left cursor-pointer flex items-center gap-1"
                                >
                                  <span>{inv.id}</span>
                                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition" />
                                </button>
                                <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-gray-100 dark:bg-[#161F33] text-gray-600 dark:text-slate-400 border border-gray-200 dark:border-[#28354D]">
                                  N° {formatInvoiceDisplayNumber(inv.id)}
                                </span>
                              </div>
                            </td>

                            {/* Emisión */}
                            <td className="py-2.5 px-2 whitespace-nowrap text-gray-700 dark:text-slate-300 font-mono text-[11px]">
                              {inv.date}
                            </td>

                            {/* Vencimiento */}
                            <td className="py-2.5 px-2 whitespace-nowrap text-[11px]">
                              {inv.dueDate ? (
                                <span className={isOverdue ? 'text-red-600 dark:text-red-400 font-semibold font-mono' : 'text-gray-500 dark:text-slate-400 font-mono'}>
                                  {inv.dueDate}
                                </span>
                              ) : (
                                <span className="text-gray-400 dark:text-slate-500">-</span>
                              )}
                            </td>

                            {/* Vendedor */}
                            <td className="py-2.5 px-2 whitespace-nowrap text-gray-800 dark:text-slate-200">
                              {inv.sellerName}
                            </td>

                            {/* Condición */}
                            <td className="py-2.5 px-2 whitespace-nowrap text-gray-600 dark:text-slate-400">
                              {inv.paymentCondition}
                            </td>

                            {/* Total $ */}
                            <td className="py-2.5 px-2 text-right font-mono font-bold text-gray-900 dark:text-white">
                              ${inv.totalUsd.toFixed(2)}
                            </td>

                            {/* Abonado $ */}
                            <td className="py-2.5 px-2 text-right font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                              ${paidUsd.toFixed(2)}
                            </td>

                            {/* Saldo $ */}
                            <td className={`py-2.5 px-2 text-right font-mono font-bold ${pendingUsd > 0.009 ? 'text-red-600 dark:text-red-400' : 'text-gray-400 dark:text-slate-500'}`}>
                              ${pendingUsd.toFixed(2)}
                            </td>

                            {/* Estado */}
                            <td className="py-2.5 px-2 text-center whitespace-nowrap">
                              <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                pendingUsd <= 0.009
                                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40'
                                  : isOverdue
                                  ? 'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800/40'
                                  : paidUsd > 0
                                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40'
                                  : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/40'
                              }`}>
                                {pendingUsd <= 0.009 ? 'Saldada' : isOverdue ? 'Vencida' : paidUsd > 0 ? 'Abono Parcial' : 'Pendiente'}
                              </span>
                            </td>

                            {/* Acción */}
                            <td className="py-2.5 pr-3 pl-2 text-right whitespace-nowrap">
                              <button
                                type="button"
                                onClick={() => setPreviewInvoice(inv)}
                                className="p-1.5 rounded-lg border border-gray-200 dark:border-[#28354D] text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-[#161F33] cursor-pointer transition"
                                title="Ver documento / Imprimir formato oficial"
                              >
                                <Printer className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-gray-100 dark:border-[#1E293B] flex items-center justify-between shrink-0 mt-4 text-xs">
                <span className="text-gray-400 dark:text-slate-500">
                  Tasa cambiaria oficial: <strong className="font-mono text-gray-700 dark:text-slate-300">Bs. {bcvRate.toFixed(2)}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setClientHistoryModal(null)}
                  className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-[#161F33] hover:bg-gray-200 dark:hover:bg-[#1e2a44] text-gray-800 dark:text-white font-semibold transition cursor-pointer"
                >
                  Cerrar Expediente
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ============================================================
          MODAL DETALLE DE VENTAS CONCRETADAS POR VENDEDOR
      ============================================================ */}
      {sellerSalesHistoryModal && (() => {
        const s = sellerSalesHistoryModal;
        const sellerInvoices = invoices.filter(inv => inv.sellerId === s.id);
        const totalSales = sellerInvoices.reduce((sum, inv) => sum + (inv.totalUsd || 0), 0);
        const paidCommissions = sellerInvoices
          .filter(inv => inv.status === 'Cobrada')
          .reduce((sum, inv) => sum + (inv.commissionUsd || 0), 0);
        const pendingCommissions = sellerInvoices
          .filter(inv => inv.status !== 'Cobrada')
          .reduce((sum, inv) => sum + (inv.commissionUsd || 0), 0);
        const averageTicket = sellerInvoices.length > 0 ? totalSales / sellerInvoices.length : 0;

        const filteredInvoices = sellerInvoices.filter(inv => {
          const matchSearch =
            !sellerSalesSearch.trim() ||
            inv.id.toLowerCase().includes(sellerSalesSearch.toLowerCase()) ||
            inv.clientName.toLowerCase().includes(sellerSalesSearch.toLowerCase()) ||
            inv.clientRif.toLowerCase().includes(sellerSalesSearch.toLowerCase());
          const matchStatus =
            sellerSalesStatusFilter === 'Todas' ||
            (sellerSalesStatusFilter === 'Cobrada' && inv.status === 'Cobrada') ||
            (sellerSalesStatusFilter === 'Pendiente' && inv.status !== 'Cobrada');
          return matchSearch && matchStatus;
        });

        const filteredTotal = filteredInvoices.reduce((sum, inv) => sum + (inv.totalUsd || 0), 0);
        const filteredCommissions = filteredInvoices.reduce((sum, inv) => sum + (inv.commissionUsd || 0), 0);

        return (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white dark:bg-[#0E1422] rounded-2xl max-w-5xl w-full p-6 shadow-2xl border border-gray-200 dark:border-[#1E293B] flex flex-col max-h-[90vh]">
              {/* Header del Modal */}
              <div className="flex items-start justify-between pb-4 border-b border-gray-100 dark:border-[#1E293B] mb-4 shrink-0">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-[#FF5C1B] flex items-center justify-center shrink-0 border border-orange-200 dark:border-orange-900/40 font-bold text-sm">
                    {s.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-base text-gray-900 dark:text-white">
                        Ventas Concretadas: {s.name}
                      </h3>
                      {s.cedula && (
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-gray-100 dark:bg-[#1E293B] text-gray-600 dark:text-slate-300 font-semibold border border-gray-200 dark:border-[#28354D]">
                          C.I. {s.cedula}
                        </span>
                      )}
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          s.isActive !== false
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40'
                            : 'bg-gray-100 dark:bg-[#1E293B] text-gray-500 dark:text-slate-400 border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        {s.isActive !== false ? '✓ Asesor Activo' : '✕ Inactivo'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">
                      Zona Comercial: <strong className="text-gray-700 dark:text-slate-300">{s.zone}</strong> • Comisión Base: <strong className="text-gray-700 dark:text-slate-300">{s.commissionRate}%</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSellerSalesHistoryModal(null)}
                    className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-lg transition cursor-pointer"
                    title="Cerrar ventana"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* KPI Cards de Ventas Concretadas (100% USD según respuesta A3) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5 shrink-0">
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#161F33] border border-gray-200 dark:border-[#28354D]">
                  <span className="text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider block">
                    Ventas Concretadas ($)
                  </span>
                  <div className="text-base font-bold text-gray-900 dark:text-white font-mono mt-0.5">
                    ${totalSales.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <span className="text-[10px] text-gray-400 dark:text-slate-500">
                    {sellerInvoices.length} {sellerInvoices.length === 1 ? 'factura emitida' : 'facturas emitidas'}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40">
                  <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider block">
                    Comisión Liquidable ($)
                  </span>
                  <div className="text-base font-bold text-emerald-700 dark:text-emerald-400 font-mono mt-0.5">
                    ${paidCommissions.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400">
                    Facturas Cobradas
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40">
                  <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider block">
                    Comisión en Créditos ($)
                  </span>
                  <div className="text-base font-bold text-amber-700 dark:text-amber-400 font-mono mt-0.5">
                    ${pendingCommissions.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <span className="text-[10px] text-amber-600 dark:text-amber-400">
                    Pendientes de cobro
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#161F33] border border-gray-200 dark:border-[#28354D]">
                  <span className="text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider block">
                    Ticket Promedio ($)
                  </span>
                  <div className="text-base font-bold text-gray-900 dark:text-white font-mono mt-0.5">
                    ${averageTicket.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <span className="text-[10px] text-gray-400 dark:text-slate-500">
                    Por venta cerrada
                  </span>
                </div>
              </div>

              {/* Filtros y Buscador dentro del modal */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3 shrink-0">
                <div className="relative flex-1 min-w-[220px]">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Buscar por nro. de factura o cliente..."
                    value={sellerSalesSearch}
                    onChange={(e) => setSellerSalesSearch(e.target.value)}
                    className="w-full text-xs pl-9 pr-7 py-2 rounded-lg border border-gray-200 dark:border-[#28354D] bg-gray-50 dark:bg-[#161F33] text-gray-900 dark:text-white focus:outline-none focus:border-[#FF5C1B] transition"
                  />
                  {sellerSalesSearch && (
                    <button
                      type="button"
                      onClick={() => setSellerSalesSearch('')}
                      className="absolute right-2.5 top-2 text-gray-400 hover:text-gray-600 dark:hover:text-white text-xs cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={sellerSalesStatusFilter}
                    onChange={(e) => setSellerSalesStatusFilter(e.target.value as any)}
                    className="text-xs border border-gray-200 dark:border-[#28354D] bg-white dark:bg-[#161F33] text-gray-800 dark:text-white rounded-lg px-2.5 py-1.5 cursor-pointer"
                  >
                    <option value="Todas" className="dark:bg-[#0E1422]">Todas las Ventas</option>
                    <option value="Cobrada" className="dark:bg-[#0E1422]">Cobradas (Liquidables)</option>
                    <option value="Pendiente" className="dark:bg-[#0E1422]">Pendientes de Cobro</option>
                  </select>
                </div>
              </div>

              {/* Tabla de Facturas del Vendedor */}
              <div className="overflow-x-auto flex-1 border border-gray-200 dark:border-[#1E293B] rounded-xl overflow-y-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="sticky top-0 z-10 bg-gray-100 dark:bg-[#12192B] text-gray-600 dark:text-slate-300 font-bold uppercase text-[10px] tracking-wider border-b border-gray-200 dark:border-[#1E293B]">
                    <tr>
                      <th className="py-2.5 px-3">Factura</th>
                      <th className="py-2.5 px-3">Fecha</th>
                      <th className="py-2.5 px-3">Cliente Mayorista</th>
                      <th className="py-2.5 px-3">Condición</th>
                      <th className="py-2.5 px-3 text-right">Monto Venta ($)</th>
                      <th className="py-2.5 px-3 text-center">% Com.</th>
                      <th className="py-2.5 px-3 text-right">Comisión ($)</th>
                      <th className="py-2.5 px-3 text-center">Estado Cobranza</th>
                      <th className="py-2.5 px-3 text-center">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-[#1E293B]">
                    {filteredInvoices.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="py-12 text-center text-gray-400 dark:text-slate-500">
                          <FileText className="w-8 h-8 mx-auto mb-2 opacity-40" />
                          <p className="font-semibold text-xs">No se encontraron ventas para este criterio</p>
                        </td>
                      </tr>
                    ) : (
                      filteredInvoices.map(inv => (
                        <tr key={inv.id} className="hover:bg-gray-50/70 dark:hover:bg-[#161F33]/40 transition">
                          <td className="py-3 px-3 font-mono font-bold text-gray-900 dark:text-white">
                            {inv.id}
                          </td>
                          <td className="py-3 px-3 text-gray-500 dark:text-slate-400 whitespace-nowrap">
                            {inv.date}
                          </td>
                          <td className="py-3 px-3">
                            <div className="font-semibold text-gray-800 dark:text-slate-200">{inv.clientName}</div>
                            <div className="text-[10px] text-gray-400 dark:text-slate-500 font-mono">{inv.clientRif}</div>
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            <span className="font-medium text-gray-700 dark:text-slate-300">{inv.paymentCondition}</span>
                            {inv.dueDate && (
                              <div className="text-[10px] text-gray-400 dark:text-slate-500">Vence: {inv.dueDate}</div>
                            )}
                          </td>
                          <td className="py-3 px-3 text-right font-bold text-gray-900 dark:text-white font-mono">
                            ${inv.totalUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </td>
                          <td className="py-3 px-3 text-center font-mono text-gray-600 dark:text-slate-400">
                            {inv.commissionRate || 5}%
                          </td>
                          <td className="py-3 px-3 text-right font-bold font-mono text-emerald-600 dark:text-emerald-400">
                            ${(inv.commissionUsd || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </td>
                          <td className="py-3 px-3 text-center whitespace-nowrap">
                            <span
                              className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                                inv.status === 'Cobrada'
                                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                                  : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400'
                              }`}
                            >
                              {inv.status === 'Cobrada' ? '✓ Cobrada (Liquidable)' : '⏳ Crédito Pendiente'}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-center whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() => setPreviewInvoice(inv)}
                              className="p-1.5 rounded-lg border border-gray-200 dark:border-[#28354D] text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-[#161F33] cursor-pointer transition"
                              title="Ver factura formal / Imprimir"
                            >
                              <Printer className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Footer del Modal */}
              <div className="pt-4 mt-4 border-t border-gray-100 dark:border-[#1E293B] flex items-center justify-between text-xs shrink-0">
                <span className="text-gray-500 dark:text-slate-400">
                  Mostrando <strong className="text-gray-900 dark:text-white font-mono">{filteredInvoices.length}</strong> de <strong className="text-gray-900 dark:text-white font-mono">{sellerInvoices.length}</strong> ventas • Subtotal en lista: <strong className="text-gray-900 dark:text-white font-mono">${filteredTotal.toFixed(2)} USD</strong> (Comisión: <strong className="text-emerald-600 dark:text-emerald-400 font-mono">${filteredCommissions.toFixed(2)} USD</strong>)
                </span>
                <button
                  type="button"
                  onClick={() => setSellerSalesHistoryModal(null)}
                  className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-[#161F33] hover:bg-gray-200 dark:hover:bg-[#1e2a44] text-gray-800 dark:text-white font-semibold transition cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ============================================================
          MODAL FLOTANTE DE REORDENAR / AUDITAR / HISTORIAL DE STOCK
      ============================================================ */}
      {stockModalProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0E1422] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 dark:border-[#1E293B]">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-[#1E293B] mb-4">
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                {stockModalProduct.mode === 'reorder' && 'Ingresar Unidades al Stock'}
                {stockModalProduct.mode === 'audit' && 'Auditar / Ajustar Stock Físico'}
                {stockModalProduct.mode === 'history' && 'Historial de Movimientos del Ítem'}
              </h3>
              <button
                onClick={() => setStockModalProduct(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {stockModalProduct.mode === 'history' ? (
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-gray-50 dark:bg-[#161F33] rounded-lg border border-gray-200/60 dark:border-[#28354D]">
                  <div className="font-bold text-gray-900 dark:text-white">{stockModalProduct.product.name}</div>
                  <div className="text-gray-500 dark:text-slate-400 font-mono mt-0.5">
                    SKU: {stockModalProduct.product.sku} • Stock Actual: {stockModalProduct.product.stock} und
                  </div>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-[#1E293B] max-h-60 overflow-y-auto">
                  {stockHistory
                    .filter(h => h.sku === stockModalProduct.product.sku)
                    .map(h => (
                      <div key={h.id} className="py-2 flex justify-between items-center">
                        <div>
                          <div className="font-semibold text-gray-800 dark:text-slate-200">{h.type}</div>
                          <div className="text-[11px] text-gray-400 dark:text-slate-500">{h.date} • {h.user}</div>
                        </div>
                        <span className="font-mono font-bold text-gray-900 dark:text-white">{h.qty} und</span>
                      </div>
                    ))}
                  {stockHistory.filter(h => h.sku === stockModalProduct.product.sku).length === 0 && (
                    <div className="py-4 text-center text-gray-400 dark:text-slate-500 italic">
                      Sin movimientos recientes registrados para este SKU
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <form onSubmit={handleConfirmStockModal} className="space-y-4 text-xs">
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-[#161F33] border border-gray-200/60 dark:border-[#28354D]">
                  <div className="font-bold text-gray-900 dark:text-white">{stockModalProduct.product.name}</div>
                  <div className="text-gray-500 dark:text-slate-400 mt-1 flex flex-wrap items-center gap-2">
                    <span>SKU: <span className="font-mono text-[#FF5C1B]">{stockModalProduct.product.sku}</span></span>
                    <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 font-bold border border-emerald-200 dark:border-emerald-800/40">
                      Stock Mayorista: {stockModalProduct.product.wholesaleStock ?? stockModalProduct.product.stock} unds
                    </span>
                    <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 font-medium border border-blue-200 dark:border-blue-800/40">
                      Stock Detal (Cotizador): {stockModalProduct.product.retailStock ?? 0} unds
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 dark:text-slate-300 mb-1">
                    {stockModalProduct.mode === 'reorder'
                      ? 'Cantidad que ingresa al Stock Mayorista (+):'
                      : 'Nuevo conteo físico de Stock Mayorista:'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={modalQtyInput}
                    onChange={(e) => setModalQtyInput(e.target.value)}
                    className="w-full border border-gray-300 dark:border-[#28354D] rounded-lg px-3 py-2 text-sm font-bold text-gray-900 dark:text-white bg-white dark:bg-[#161F33] focus:outline-none focus:border-[#FF5C1B]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 dark:text-slate-300 mb-1">
                    Costo Real Mayorista ($ USD)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={modalCostInput}
                    onChange={(e) => setModalCostInput(e.target.value)}
                    className="w-full border border-gray-300 dark:border-[#28354D] rounded-lg px-3 py-2 font-medium text-gray-900 dark:text-white bg-white dark:bg-[#161F33] focus:outline-none focus:border-[#FF5C1B]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-gray-100 dark:border-[#1E293B]">
                  <button
                    type="button"
                    onClick={() => setStockModalProduct(null)}
                    className="px-4 py-2 rounded-lg border border-gray-200 dark:border-[#28354D] text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-[#161F33] font-semibold cursor-pointer transition"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-[#FF5C1B] hover:bg-[#ff4600] text-white font-bold cursor-pointer transition shadow-xs"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ============================================================
          MODAL PARA CREAR NUEVO REPUESTO EN EL CATÁLOGO
      ============================================================ */}
      {newProductModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0E1422] rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 dark:border-[#1E293B]">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-[#1E293B] mb-4">
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                Registrar Nuevo Repuesto en Repuestos Sotomayor
              </h3>
              <button
                onClick={() => setNewProductModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateNewPart} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 dark:text-slate-300 mb-1">
                  Descripción del Repuesto / Aplicación
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Bomba de Gasolina Completa Aveo / Optra"
                  value={newPartForm.name}
                  onChange={(e) => setNewPartForm({ ...newPartForm, name: e.target.value })}
                  className="w-full border border-gray-300 dark:border-[#28354D] rounded-lg px-3 py-2 bg-white dark:bg-[#161F33] text-gray-900 dark:text-white focus:outline-none focus:border-[#FF5C1B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 dark:text-slate-300 mb-1">
                    Código SKU / OEM
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. BOS-09812"
                    value={newPartForm.sku}
                    onChange={(e) => setNewPartForm({ ...newPartForm, sku: e.target.value })}
                    className="w-full border border-gray-300 dark:border-[#28354D] rounded-lg px-3 py-2 font-mono uppercase bg-white dark:bg-[#161F33] text-gray-900 dark:text-white focus:outline-none focus:border-[#FF5C1B]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 dark:text-slate-300 mb-1">
                    Categoría
                  </label>
                  <select
                    value={newPartForm.category}
                    onChange={(e) => setNewPartForm({ ...newPartForm, category: e.target.value })}
                    className="w-full border border-gray-300 dark:border-[#28354D] rounded-lg px-3 py-2 bg-white dark:bg-[#161F33] text-gray-900 dark:text-white cursor-pointer focus:outline-none focus:border-[#FF5C1B]"
                  >
                    <option className="dark:bg-[#0E1422]">Tren Delantero</option>
                    <option className="dark:bg-[#0E1422]">Distribución</option>
                    <option className="dark:bg-[#0E1422]">Suspensión</option>
                    <option className="dark:bg-[#0E1422]">Motor y Enfriamiento</option>
                    <option className="dark:bg-[#0E1422]">Rodamientos</option>
                    <option className="dark:bg-[#0E1422]">Eléctrico</option>
                    <option className="dark:bg-[#0E1422]">Frenos</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 dark:text-slate-300 mb-1">
                    Stock Inicial
                  </label>
                  <input
                    type="number"
                    value={newPartForm.stock}
                    onChange={(e) => setNewPartForm({ ...newPartForm, stock: Number(e.target.value) })}
                    className="w-full border border-gray-300 dark:border-[#28354D] rounded-lg px-3 py-2 font-bold bg-white dark:bg-[#161F33] text-gray-900 dark:text-white focus:outline-none focus:border-[#FF5C1B]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 dark:text-slate-300 mb-1">
                    Costo Real Mayorista ($ USD)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={newPartForm.cost}
                    onChange={(e) => setNewPartForm({ ...newPartForm, cost: Number(e.target.value) })}
                    className="w-full border border-gray-300 dark:border-[#28354D] rounded-lg px-3 py-2 bg-white dark:bg-[#161F33] text-gray-900 dark:text-white focus:outline-none focus:border-[#FF5C1B]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 dark:text-slate-300 mb-1">
                    Precio Mayor ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={newPartForm.price}
                    onChange={(e) => setNewPartForm({ ...newPartForm, price: Number(e.target.value) })}
                    className="w-full border border-gray-300 dark:border-[#28354D] rounded-lg px-3 py-2 font-bold text-[#FF5C1B] bg-white dark:bg-[#161F33] focus:outline-none focus:border-[#FF5C1B]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100 dark:border-[#1E293B]">
                <button
                  type="button"
                  onClick={() => setNewProductModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-200 dark:border-[#28354D] text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-[#161F33] font-semibold cursor-pointer transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#FF5C1B] hover:bg-[#ff4600] text-white font-bold cursor-pointer transition shadow-xs"
                >
                  Crear Repuesto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================
          MODAL PARA REGISTRAR ABONO / PAGO A FACTURA EN CxC
      ============================================================ */}
      {paymentModalInvoice && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0E1422] rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 dark:border-[#1E293B] text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-[#1E293B] mb-4">
              <div>
                <h3 className="font-extrabold text-sm text-gray-900 dark:text-white">
                  Registrar Abono a Factura de Crédito
                </h3>
                <p className="text-gray-500 dark:text-slate-400 text-[11px] mt-0.5">
                  Documento: <span className="font-mono font-bold text-[#FF5C1B]">{paymentModalInvoice.id}</span> • {paymentModalInvoice.clientName}
                </p>
              </div>
              <button
                onClick={() => setPaymentModalInvoice(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Resumen del Saldo Actual */}
            <div className="bg-gray-50 dark:bg-[#161F33] p-3.5 rounded-xl border border-gray-200/80 dark:border-[#28354D] mb-4 grid grid-cols-2 gap-3">
              <div>
                <span className="text-[10px] uppercase text-gray-400 dark:text-slate-400 block font-bold">Monto Total Factura</span>
                <span className="text-sm font-bold text-gray-800 dark:text-slate-200">${paymentModalInvoice.totalUsd.toFixed(2)} USD</span>
                <span className="block text-[10px] text-gray-400 dark:text-slate-400 font-mono">
                  Abonado: ${(paymentModalInvoice.amountPaidUsd || 0).toFixed(2)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase text-gray-400 dark:text-slate-400 block font-bold">Saldo Pendiente Hoy</span>
                <span className="text-base font-black text-[#FF5C1B]">
                  ${(paymentModalInvoice.balancePendingUsd !== undefined ? paymentModalInvoice.balancePendingUsd : paymentModalInvoice.totalUsd).toFixed(2)} USD
                </span>
                <span className="block text-[11px] font-mono text-gray-600 dark:text-slate-300 font-bold">
                  Bs. {((paymentModalInvoice.balancePendingUsd !== undefined ? paymentModalInvoice.balancePendingUsd : paymentModalInvoice.totalUsd) * bcvRate).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-[9px] text-gray-400 dark:text-slate-500 block font-normal">
                  ({activeRateLabel})
                </span>
              </div>
            </div>

            <form onSubmit={handleRegisterPayment} className="space-y-3.5">
              {/* Botones de Monto Rápido */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-gray-700 dark:text-slate-300">Monto del Abono en USD ($)</label>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        const pend = paymentModalInvoice.balancePendingUsd !== undefined ? paymentModalInvoice.balancePendingUsd : paymentModalInvoice.totalUsd;
                        setPaymentAmountUsd((pend * 0.25).toFixed(2));
                      }}
                      className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-[#12192B] hover:bg-gray-200 dark:hover:bg-[#1E293B] text-gray-600 dark:text-slate-300 border border-transparent dark:border-[#28354D] text-[10px] font-bold cursor-pointer"
                    >
                      25%
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const pend = paymentModalInvoice.balancePendingUsd !== undefined ? paymentModalInvoice.balancePendingUsd : paymentModalInvoice.totalUsd;
                        setPaymentAmountUsd((pend * 0.50).toFixed(2));
                      }}
                      className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-[#12192B] hover:bg-gray-200 dark:hover:bg-[#1E293B] text-gray-600 dark:text-slate-300 border border-transparent dark:border-[#28354D] text-[10px] font-bold cursor-pointer"
                    >
                      50%
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const pend = paymentModalInvoice.balancePendingUsd !== undefined ? paymentModalInvoice.balancePendingUsd : paymentModalInvoice.totalUsd;
                        setPaymentAmountUsd(pend.toFixed(2));
                      }}
                      className="px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-950/40 hover:bg-orange-200 dark:hover:bg-orange-900/50 text-[#FF5C1B] border border-transparent dark:border-orange-900/50 text-[10px] font-bold cursor-pointer"
                    >
                      Saldar 100%
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    required
                    value={paymentAmountUsd}
                    onChange={(e) => setPaymentAmountUsd(e.target.value)}
                    placeholder="0.00"
                    className="w-full text-base font-bold text-gray-900 dark:text-white border border-gray-300 dark:border-[#28354D] bg-white dark:bg-[#161F33] rounded-lg px-3 py-2 focus:outline-none focus:border-[#FF5C1B]"
                  />
                  {Number(paymentAmountUsd) > 0 && (
                    <div className="mt-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 flex items-center justify-between">
                      <span>Equivalente ({activeRateLabel}): Bs. {(Number(paymentAmountUsd) * bcvRate).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      <span className="text-gray-400 dark:text-slate-400 font-normal">Tasa: Bs. {bcvRate.toFixed(2)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Método de Pago */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 dark:text-slate-300 mb-1">
                    Método de Pago
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="w-full border border-gray-300 dark:border-[#28354D] rounded-lg px-3 py-2 font-medium text-gray-800 dark:text-slate-200 bg-white dark:bg-[#161F33] focus:outline-none focus:border-[#FF5C1B]"
                  >
                    <option value="Divisas Efectivo">💵 Divisas Efectivo</option>
                    <option value="Zelle">💳 Zelle</option>
                    <option value="Pago Móvil BCV">📱 Pago Móvil ({activeRateLabel})</option>
                    <option value="Transferencia Bancaria">🏦 Transferencia Bancaria</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 dark:text-slate-300 mb-1">
                    N° de Referencia / Comprobante
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. REF-849201"
                    value={paymentReference}
                    onChange={(e) => setPaymentReference(e.target.value)}
                    className="w-full border border-gray-300 dark:border-[#28354D] rounded-lg px-3 py-2 font-mono text-gray-800 dark:text-slate-200 bg-white dark:bg-[#161F33] focus:outline-none focus:border-[#FF5C1B]"
                  />
                </div>
              </div>

              {/* Observaciones */}
              <div>
                <label className="block font-semibold text-gray-700 dark:text-slate-300 mb-1">
                  Notas u Observaciones del Cobro
                </label>
                <input
                  type="text"
                  placeholder="Ej. Entregado en efectivo en almacén Valencia / Pago Móvil Banesco"
                  value={paymentNotes}
                  onChange={(e) => setPaymentNotes(e.target.value)}
                  className="w-full border border-gray-300 dark:border-[#28354D] rounded-lg px-3 py-2 text-gray-700 dark:text-slate-200 bg-white dark:bg-[#161F33] focus:outline-none focus:border-[#FF5C1B]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100 dark:border-[#1E293B]">
                <button
                  type="button"
                  onClick={() => setPaymentModalInvoice(null)}
                  className="px-4 py-2 rounded-lg border border-gray-200 dark:border-[#28354D] text-gray-600 dark:text-slate-300 font-semibold cursor-pointer hover:bg-gray-50 dark:hover:bg-[#161F33] transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#FF5C1B] hover:bg-[#ff4600] text-white font-bold cursor-pointer shadow-xs transition"
                >
                  Confirmar y Registrar Abono
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================
          MODAL DE HISTORIAL DE PAGOS / ABONOS REGISTRADOS
      ============================================================ */}
      {paymentHistoryInvoice && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0E1422] rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-gray-200 dark:border-[#1E293B] text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-[#1E293B] mb-4">
              <div>
                <h3 className="font-extrabold text-sm text-gray-900 dark:text-white">
                  Historial de Abonos y Pagos
                </h3>
                <p className="text-gray-500 dark:text-slate-400 text-[11px] mt-0.5">
                  Factura: <span className="font-mono font-bold text-[#FF5C1B]">{paymentHistoryInvoice.id}</span> • {paymentHistoryInvoice.clientName}
                </p>
              </div>
              <button
                onClick={() => setPaymentHistoryInvoice(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-gray-50 dark:bg-[#161F33] p-3 rounded-lg border border-gray-200/80 dark:border-[#28354D] mb-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-400 dark:text-slate-400 block font-bold uppercase">Total Factura</span>
                <span className="font-bold text-gray-900 dark:text-white">${paymentHistoryInvoice.totalUsd.toFixed(2)} USD</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 dark:text-slate-400 block font-bold uppercase">Total Abonado</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-400">${(paymentHistoryInvoice.amountPaidUsd || 0).toFixed(2)} USD</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-gray-400 dark:text-slate-400 block font-bold uppercase">Saldo Restante</span>
                <span className="font-extrabold text-[#FF5C1B]">
                  ${(paymentHistoryInvoice.balancePendingUsd !== undefined ? paymentHistoryInvoice.balancePendingUsd : paymentHistoryInvoice.totalUsd).toFixed(2)} USD
                </span>
              </div>
            </div>

            {/* Lista de Abonos */}
            <div className="mb-4 max-h-60 overflow-y-auto">
              {!paymentHistoryInvoice.payments || paymentHistoryInvoice.payments.length === 0 ? (
                <div className="py-8 text-center text-gray-400 dark:text-slate-500 italic border border-dashed border-gray-200 dark:border-[#28354D] rounded-lg">
                  No se han registrado abonos todavía para esta factura.
                </div>
              ) : (
                <div className="divide-y divide-gray-100 dark:divide-[#1E293B] border border-gray-200 dark:border-[#1E293B] rounded-lg">
                  {paymentHistoryInvoice.payments.map((p, idx) => (
                    <div key={p.id || idx} className="p-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-[#161F33] transition">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-gray-900 dark:text-white">{p.id}</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-gray-500 dark:text-slate-400">{p.date}</span>
                          <span className="text-gray-400">•</span>
                          <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-[#12192B] border border-transparent dark:border-[#28354D] font-semibold text-[10px] text-gray-700 dark:text-slate-300">
                            {p.method}
                          </span>
                        </div>
                        <div className="text-[11px] text-gray-500 dark:text-slate-400 mt-1 font-mono">
                          Ref: <span className="font-bold text-gray-800 dark:text-slate-200">{p.reference}</span>
                          {p.notes && <span className="text-gray-400 dark:text-slate-500 ml-2 font-sans font-normal">({p.notes})</span>}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="font-bold text-emerald-700 dark:text-emerald-400 text-sm">
                            +${p.amountUsd.toFixed(2)}
                          </div>
                          <div className="text-[10px] text-gray-400 dark:text-slate-400 font-mono">
                            Bs. {p.amountVed.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </div>
                        </div>

                        {/* Botón WhatsApp Comprobante */}
                        <button
                          onClick={() => {
                            const text = buildPaymentReceiptWhatsAppText(paymentHistoryInvoice, p, bcvRate, activeRateLabel);
                            sendWhatsApp(text, paymentHistoryInvoice.clientPhone);
                            showToast('Comprobante de abono enviado por WhatsApp');
                          }}
                          className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer transition shadow-2xs"
                          title="Enviar comprobante de abono por WhatsApp"
                        >
                          <WhatsAppIcon className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100 dark:border-[#1E293B]">
              <button
                onClick={() => setPaymentHistoryInvoice(null)}
                className="px-4 py-2 rounded-lg bg-gray-900 hover:bg-black dark:bg-[#161F33] dark:hover:bg-[#1E293B] dark:border dark:border-[#28354D] text-white font-semibold cursor-pointer transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          MODAL DE VISTA PREVIA IMPRIMIBLE DE FACTURA / NOTA / COTIZACIÓN
      ============================================================ */}
      {previewInvoice && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 text-xs print-only relative my-auto">
            {/* BARRA SUPERIOR DE ACCIONES (OCULTA EN IMPRESIÓN) */}
            <div className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-gray-200 print:hidden gap-3">
              {/* Switcher de Tipo de Documento */}
              <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setPreviewInvoice({ ...previewInvoice, documentType: 'Nota de Entrega Mayorista' })}
                  className={`px-3 py-1.5 rounded-lg font-bold text-xs transition cursor-pointer ${
                    getDocumentTitle(previewInvoice.documentType) === 'Nota De Entrega'
                      ? 'bg-[#235836] text-white shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Nota de Entrega
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewInvoice({ ...previewInvoice, documentType: 'Cotización Mayorista Formal' })}
                  className={`px-3 py-1.5 rounded-lg font-bold text-xs transition cursor-pointer ${
                    getDocumentTitle(previewInvoice.documentType) === 'Cotización Mayorista'
                      ? 'bg-[#235836] text-white shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Cotización Mayorista
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewInvoice({ ...previewInvoice, documentType: 'Factura Fiscal SENIAT (+16% IVA)' })}
                  className={`px-3 py-1.5 rounded-lg font-bold text-xs transition cursor-pointer ${
                    getDocumentTitle(previewInvoice.documentType) === 'Factura'
                      ? 'bg-[#235836] text-white shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Factura
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 rounded-xl border border-gray-200 font-bold text-gray-700 flex items-center gap-1.5 hover:bg-gray-50 cursor-pointer shadow-2xs transition"
                >
                  <Printer className="w-3.5 h-3.5 text-gray-600" />
                  <span>Imprimir / Guardar PDF</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPreviewInvoice(null)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer transition"
                  title="Cerrar vista previa"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* =========================================================
                DOCUMENTO IMPRESO / IDÉNTICO AL PDF OFICIAL SOTOMAYOR
            ========================================================= */}
            <div className="bg-white text-gray-900 print:p-0">
              
              {/* 1. ENCABEZADO: 3 COLUMNAS (DATOS EMPRESA | TÍTULO Y NÚMERO | LOGO) */}
              <div className="grid grid-cols-12 items-start gap-4 pb-5 mb-5 border-b border-gray-200">
                {/* Columna Izquierda: Datos Fiscales y Contacto Repuestos Sotomayor */}
                <div className="col-span-5 space-y-0.5 text-[11px] text-gray-800 leading-tight">
                  <h1 className="text-sm font-black text-gray-950 tracking-tight mb-1">
                    Repuestos Sotomayor C.A.
                  </h1>
                  <p className="text-gray-600">
                    Calle Padre Alfonso cruce con Avenida Michelena. Sector La Candelaria
                  </p>
                  <p className="text-gray-600 font-medium">Valencia, Carabobo 2001</p>
                  <p className="text-gray-700 font-mono font-medium">4124236129</p>
                  <p className="text-gray-700">Sealproautoparts@gmail.com</p>
                  <p className="text-[#235836] font-semibold">www.repuestosotomayor.com</p>
                </div>

                {/* Columna Central: Título Verde Dinámico y Correlativo 4 Dígitos */}
                <div className="col-span-4 text-center flex flex-col items-center justify-center pt-1">
                  <span className="text-xl sm:text-2xl font-black text-[#235836] tracking-tight leading-none uppercase">
                    {getDocumentTitle(previewInvoice.documentType)}
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-[#235836] font-mono tracking-widest mt-1">
                    {formatInvoiceDisplayNumber(previewInvoice.id)}
                  </span>
                </div>

                {/* Columna Derecha: Logo Oficial Repuestos Sotomayor */}
                <div className="col-span-3 flex justify-end items-center pt-1">
                  <img
                    src="/sotomayor-logo.png"
                    alt="Repuestos Sotomayor Logo"
                    className="h-12 sm:h-14 w-auto max-w-full object-contain"
                  />
                </div>
              </div>

              {/* 2. DATOS DEL CLIENTE Y TRÍPTICO VERDE (LADO A LADO EN LA MISMA FILA) */}
              <div className="grid grid-cols-12 gap-4 items-start mb-5">
                {/* Lado Izquierdo (5 cols): FACTURAR A */}
                <div className="col-span-12 sm:col-span-5 text-[11px] leading-tight space-y-0.5">
                  <span className="text-[10px] font-black uppercase text-[#235836] tracking-wider block mb-1">
                    FACTURAR A:
                  </span>
                  <p className="text-xs font-black uppercase tracking-tight text-gray-950">
                    {previewInvoice.clientName}
                  </p>
                  <p className="font-mono font-bold text-gray-700">
                    RIF: {previewInvoice.clientRif}
                  </p>
                  <p className="text-gray-600 max-w-sm">
                    {previewInvoice.clientAddress || (activeClient && activeClient.address) || 'Valencia, Edo. Carabobo'}
                  </p>
                  {previewInvoice.clientPhone && (
                    <p className="text-gray-600 font-mono">
                      Telf: {previewInvoice.clientPhone}
                    </p>
                  )}
                  {previewInvoice.sellerName && (
                    <p className="text-[10px] text-gray-500 pt-0.5">
                      Asesor Comercial: <strong className="text-gray-700">{previewInvoice.sellerName}</strong>
                    </p>
                  )}
                </div>

                {/* Lado Derecho (7 cols): TRÍPTICO VERDE (FECHA | PAGAR | FECHA DE VENCIMIENTO) */}
                <div className="col-span-12 sm:col-span-7">
                  <div className="border-y-2 border-[#235836] grid grid-cols-3 divide-x divide-[#235836] overflow-hidden">
                    {/* Caja 1: FECHA */}
                    <div className="bg-[#DCEBDC] py-2 px-2 text-center flex flex-col items-center justify-center min-h-[58px]">
                      <span className="text-[10px] font-black tracking-wider uppercase text-[#235836]">
                        FECHA
                      </span>
                      <span className="text-xs font-bold font-mono text-gray-900 mt-0.5">
                        {formatDateMMDDYYYY(previewInvoice.date)}
                      </span>
                    </div>

                    {/* Caja 2: PAGAR */}
                    <div className="bg-[#235836] py-2 px-2 text-center flex flex-col items-center justify-center text-white min-h-[58px]">
                      <span className="text-[10px] font-black tracking-wider uppercase text-emerald-100">
                        PAGAR
                      </span>
                      <span className="text-sm font-black font-mono text-white mt-0.5">
                        ${previewInvoice.totalUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                      <span className="text-[8.5px] text-emerald-100/90 font-medium leading-tight">
                        {previewInvoice.paymentCondition.includes('Crédito') || previewInvoice.paymentCondition.includes('credito')
                          ? previewInvoice.paymentCondition
                          : 'A la recepción'}
                      </span>
                    </div>

                    {/* Caja 3: FECHA DE VENCIMIENTO */}
                    <div className="bg-[#DCEBDC] py-2 px-2 text-center flex flex-col items-center justify-center min-h-[58px]">
                      <span className="text-[9.5px] font-black tracking-wider uppercase text-[#235836] leading-tight">
                        FECHA DE VENCIMIENTO
                      </span>
                      <span className="text-xs font-bold font-mono text-gray-900 mt-0.5">
                        {formatDateMMDDYYYY(previewInvoice.dueDate || previewInvoice.date)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. TABLA DE PRODUCTOS (SKU | DESCRIPCIÓN | CANTIDAD | PRECIO UNITARIO | TOTAL) */}
              <div className="mb-5">
                <table className="w-full text-left border-collapse text-[11px]">
                  <thead>
                    <tr className="border-b-2 border-[#235836] text-[#235836]">
                      <th className="py-2 px-2 font-black uppercase tracking-wider w-[18%]">
                        SKU / CÓDIGO
                      </th>
                      <th className="py-2 px-2 font-black uppercase tracking-wider w-[46%]">
                        DESCRIPCIÓN
                      </th>
                      <th className="py-2 px-2 font-black uppercase tracking-wider text-center w-[12%]">
                        CANTIDAD
                      </th>
                      <th className="py-2 px-2 font-black uppercase tracking-wider text-right w-[12%]">
                        PRECIO UNITARIO
                      </th>
                      <th className="py-2 px-2 font-black uppercase tracking-wider text-right w-[12%]">
                        TOTAL
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {previewInvoice.lines && previewInvoice.lines.map((l, i) => (
                      <tr key={i} className="hover:bg-emerald-50/20">
                        <td className="py-2.5 px-2 font-mono font-bold text-gray-900 align-top">
                          {l.sku}
                        </td>
                        <td className="py-2.5 px-2 text-gray-800 font-medium align-top leading-tight">
                          {l.name}
                        </td>
                        <td className="py-2.5 px-2 text-center font-bold text-gray-900 align-top">
                          {l.qty}
                        </td>
                        <td className="py-2.5 px-2 text-right font-mono text-gray-900 align-top">
                          ${l.price.toFixed(2)}
                        </td>
                        <td className="py-2.5 px-2 text-right font-mono font-bold text-gray-950 align-top">
                          ${(l.qty * l.price).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 5. SECCIÓN INFERIOR: TOTAL A PAGAR Y GRACIAS (100% USD, SIN BOLÍVARES NI BCV) */}
              <div className="border-t-2 border-[#235836] pt-4 mb-4">
                <div className="flex flex-col items-end text-right">
                  <div className="space-y-1 w-full max-w-xs">
                    {previewInvoice.discountUsd > 0 && (
                      <div className="flex justify-between text-xs text-emerald-800 font-medium">
                        <span>Descuento:</span>
                        <span className="font-mono">-${previewInvoice.discountUsd.toFixed(2)}</span>
                      </div>
                    )}
                    {previewInvoice.taxUsd > 0 && (
                      <div className="flex justify-between text-xs text-gray-600 font-medium">
                        <span>IVA (16%):</span>
                        <span className="font-mono">+${previewInvoice.taxUsd.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-baseline pt-1 border-t border-gray-200">
                      <span className="text-xs font-black uppercase text-[#235836] tracking-wider">
                        TOTAL A PAGAR
                      </span>
                      <span className="text-xl font-black font-mono text-[#235836]">
                        ${previewInvoice.totalUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-[#235836] font-black text-sm tracking-widest uppercase">
                    GRACIAS.
                  </div>
                </div>
              </div>

            </div>

            {/* BOTONES INFERIORES DE ACCIÓN (OCULTOS AL IMPRIMIR) */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-gray-200 mt-4 print:hidden">
              {/* Botón WhatsApp */}
              <button
                type="button"
                onClick={() => {
                  const text = buildInvoiceWhatsAppText(
                    previewInvoice,
                    bcvRate,
                    (previewInvoice.documentType || '').includes('Cotización'),
                    activeRateLabel
                  );
                  sendWhatsApp(text, previewInvoice.clientPhone);
                  showToast('Documento enviado a WhatsApp');
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-2 cursor-pointer shadow-sm transition"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Enviar por WhatsApp</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-[#235836] hover:bg-[#1b442a] text-white font-bold flex items-center gap-1.5 cursor-pointer shadow-sm transition"
                >
                  <Printer className="w-4 h-4 text-white" />
                  <span>Imprimir / Guardar PDF</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPreviewInvoice(null)}
                  className="px-4 py-2 rounded-xl bg-gray-900 hover:bg-black text-white font-bold cursor-pointer transition shadow-2xs"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          MODAL EXPRESS: ACTIVACIÓN EN INVENTARIO MAYORISTA
      ============================================================ */}
      {expressActivationModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#0E1422] border border-gray-200 dark:border-[#1E293B] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="px-5 py-4 border-b border-gray-100 dark:border-[#1E293B] flex items-center justify-between bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <Zap size={18} className="fill-amber-500 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    Incorporar al Inventario Mayorista
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60">
                      ⚡ Modo Express
                    </span>
                  </h3>
                  <p className="text-[11px] text-gray-500 dark:text-slate-400">
                    Configura el precio al mayor y existencias antes de agregar a la factura.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setExpressActivationModalProduct(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-[#161F33] cursor-pointer transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 space-y-4 text-xs">
              {/* Tarjeta de Datos del Repuesto */}
              <div className="bg-gray-50 dark:bg-[#12192B] border border-gray-200 dark:border-[#1E293B] rounded-xl p-3.5 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono font-bold text-xs text-[#FF5C1B] mr-2">
                      {expressActivationModalProduct.sku}
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {expressActivationModalProduct.name}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400 dark:text-slate-500 uppercase tracking-wider font-semibold">
                    {expressActivationModalProduct.category}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1 border-t border-gray-200/60 dark:border-[#1E293B]">
                  <div className="bg-white dark:bg-[#0E1422] p-2 rounded-lg border border-gray-100 dark:border-[#1E293B]">
                    <span className="block text-[10px] text-gray-400 dark:text-slate-500">Costo Cotizador</span>
                    <span className="font-mono font-bold text-gray-800 dark:text-slate-200">
                      ${((expressActivationModalProduct.retailCost ?? expressActivationModalProduct.cost) || 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="bg-white dark:bg-[#0E1422] p-2 rounded-lg border border-gray-100 dark:border-[#1E293B]">
                    <span className="block text-[10px] text-gray-400 dark:text-slate-500">Precio Detal</span>
                    <span className="font-mono font-bold text-gray-800 dark:text-slate-200">
                      ${((expressActivationModalProduct.retailPrice ?? expressActivationModalProduct.price) || 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="bg-white dark:bg-[#0E1422] p-2 rounded-lg border border-gray-100 dark:border-[#1E293B]">
                    <span className="block text-[10px] text-gray-400 dark:text-slate-500">Stock Detal</span>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {expressActivationModalProduct.retailStock ?? 0} unds
                    </span>
                  </div>
                </div>
              </div>

              {/* Inputs */}
              <div className="space-y-3.5">
                {/* Precio Mayorista Sugerido */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold text-gray-700 dark:text-slate-300">
                      Precio de Venta Mayorista ($ USD)
                    </label>
                    <span className="text-[10px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800/40">
                      Fórmula B: Costo + 25% (Sugerido: ${getFormulaBPrice(expressActivationModalProduct).toFixed(2)})
                    </span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-400 font-bold">$</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={expressForm.suggestedPrice}
                      onChange={(e) => setExpressForm(prev => ({ ...prev, suggestedPrice: parseFloat(e.target.value) || 0 }))}
                      className="w-full pl-7 pr-3 py-2 border border-gray-200 dark:border-[#28354D] rounded-lg font-mono font-bold text-gray-900 dark:text-white bg-white dark:bg-[#161F33] focus:outline-none focus:border-[#FF5C1B]"
                    />
                  </div>
                  <p className="mt-1 text-[10px] text-gray-400 dark:text-slate-500">
                    Equivalente: <span className="font-mono text-gray-700 dark:text-slate-300 font-semibold">Bs. {((expressForm.suggestedPrice || 0) * bcvRate).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Cantidad a Facturar */}
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 dark:text-slate-300 mb-1">
                      Cantidad a Facturar
                    </label>
                    <div className="flex items-center border border-gray-200 dark:border-[#28354D] rounded-lg bg-white dark:bg-[#161F33] overflow-hidden">
                      <button
                        type="button"
                        onClick={() => {
                          const newQty = Math.max(1, expressForm.billQty - 1);
                          setExpressForm(prev => ({
                            ...prev,
                            billQty: newQty,
                            initialStock: prev.initialStock === prev.billQty ? newQty : Math.max(newQty, prev.initialStock)
                          }));
                        }}
                        className="px-2.5 py-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-[#1E293B] cursor-pointer"
                      >
                        <Minus size={14} />
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={expressForm.billQty}
                        onChange={(e) => {
                          const val = Math.max(1, parseInt(e.target.value) || 1);
                          setExpressForm(prev => ({
                            ...prev,
                            billQty: val,
                            initialStock: prev.initialStock === prev.billQty ? val : Math.max(val, prev.initialStock)
                          }));
                        }}
                        className="w-full text-center py-2 font-mono font-bold text-gray-900 dark:text-white bg-transparent focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newQty = expressForm.billQty + 1;
                          setExpressForm(prev => ({
                            ...prev,
                            billQty: newQty,
                            initialStock: prev.initialStock === prev.billQty ? newQty : Math.max(newQty, prev.initialStock)
                          }));
                        }}
                        className="px-2.5 py-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-[#1E293B] cursor-pointer"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Stock Mayorista Inicial */}
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 dark:text-slate-300 mb-1">
                      Stock Mayorista Inicial
                    </label>
                    <div className="flex items-center border border-gray-200 dark:border-[#28354D] rounded-lg bg-white dark:bg-[#161F33] overflow-hidden">
                      <input
                        type="number"
                        min={expressForm.billQty}
                        value={expressForm.initialStock}
                        onChange={(e) => {
                          const val = Math.max(expressForm.billQty, parseInt(e.target.value) || expressForm.billQty);
                          setExpressForm(prev => ({ ...prev, initialStock: val }));
                        }}
                        className="w-full text-center py-2 font-mono font-bold text-gray-900 dark:text-white bg-transparent focus:outline-none"
                      />
                    </div>
                    <p className="mt-1 text-[9px] text-gray-400 dark:text-slate-500">
                      {expressForm.initialStock === expressForm.billQty
                        ? `Quedarán 0 unds en stock tras facturar.`
                        : `Quedarán ${expressForm.initialStock - expressForm.billQty} unds en stock tras facturar.`}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-3.5 bg-gray-50 dark:bg-[#12192B] border-t border-gray-100 dark:border-[#1E293B] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setExpressActivationModalProduct(null)}
                className="px-3.5 py-2 rounded-lg text-xs font-semibold text-gray-600 dark:text-slate-400 hover:bg-gray-200/70 dark:hover:bg-[#1E293B] cursor-pointer transition"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmExpressActivation}
                className="px-4 py-2 rounded-lg bg-[#FF5C1B] hover:bg-[#ff4600] text-white text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer transition hover:scale-[1.01]"
              >
                <Zap size={14} className="fill-white" />
                <span>Confirmar e Incluir en Factura</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          MODAL: CONFIGURAR REPUESTO MAYORISTA
      ============================================================ */}
      {editingWholesaleProduct && (
        <WholesaleConfigModal
          product={editingWholesaleProduct}
          bcvRate={bcvRate}
          onClose={() => setEditingWholesaleProduct(null)}
          onSave={handleSaveWholesaleModal}
        />
      )}

      {/* ============================================================
          MODAL: SCRIPT SQL DE MIGRACIÓN SUPABASE
      ============================================================ */}
      {showSqlMigrationModal && (
        <SqlMigrationModal
          onClose={() => setShowSqlMigrationModal(false)}
          sqlCopied={sqlCopied}
          onCopy={handleCopySql}
        />
      )}

      {/* ============================================================
          MODAL: SELECTOR DE LOS 6 TEMAS SOTOMAYOR
      ============================================================ */}
      {themeModalOpen && (
        <ThemeSelectorModal
          isOpen={themeModalOpen}
          onClose={() => setThemeModalOpen(false)}
          currentThemeId={currentThemeId}
          onSelectTheme={(id) => {
            setCurrentThemeId(id);
            const chosen = SYSTEM_THEMES.find(t => t.id === id);
            showToast(`Tema activado: ${chosen?.name}`);
          }}
        />
      )}

      {/* ============================================================
          MODAL: CENTRO DE APRENDIZAJE & TUTORIAL INTERACTIVO DEL SISTEMA
      ============================================================ */}
      {tutorialModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-[#0E1422] rounded-2xl max-w-5xl w-full p-6 shadow-2xl border border-gray-200 dark:border-[#1E293B] flex flex-col max-h-[92vh]">
            {/* Header del Tutorial */}
            <div className="flex items-start justify-between pb-4 border-b border-gray-100 dark:border-[#1E293B] mb-4 shrink-0">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-[#FF5C1B] flex items-center justify-center shrink-0 border border-orange-200 dark:border-orange-900/40">
                  <BookOpen className="w-5 h-5 text-[#FF5C1B]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-gray-900 dark:text-white">
                      Centro de Aprendizaje & Tutorial del Sistema
                    </h3>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-orange-50 dark:bg-orange-950 text-[#FF5C1B] font-semibold border border-orange-200 dark:border-orange-900/40">
                      Mayorista Sotomayor
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">
                    Guía práctica paso a paso para dominar cada sección, flujo contable y atajo operativo de la plataforma.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setTutorialModalOpen(false);
                    setTourStep(0);
                    setIsTourActive(true);
                  }}
                  className="px-3.5 py-1.5 bg-[#FF5C1B] hover:bg-[#ff4600] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition shadow-xs cursor-pointer group"
                  title="Iniciar recorrido guiado paso a paso directamente sobre las pantallas del sistema"
                >
                  <Sparkles className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                  <span>Iniciar Tour en Pantalla</span>
                </button>

                <button
                  onClick={() => setTutorialModalOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-lg transition cursor-pointer"
                  title="Cerrar tutorial"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Cuerpo del Tutorial: Navegación por pestañas + Contenido */}
            <div className="flex flex-col md:flex-row gap-5 flex-1 overflow-hidden">
              {/* Barra lateral de secciones */}
              <div className="w-full md:w-64 shrink-0 flex md:flex-col gap-1 overflow-x-auto md:overflow-y-auto pb-2 md:pb-0 pr-1 border-b md:border-b-0 md:border-r border-gray-100 dark:border-[#1E293B]">
                {[
                  { id: 'inventory', label: '1. Inventario & Stock', icon: Boxes },
                  { id: 'invoicing', label: '2. Facturación y Ventas', icon: FileText },
                  { id: 'receiving', label: '3. Ingreso de Mercancía', icon: Download },
                  { id: 'cxc', label: '4. Cuentas por Cobrar', icon: DollarSign },
                  { id: 'commissions', label: '5. Comisiones de Asesores', icon: TrendingUp },
                  { id: 'clients', label: '6. Clientes y Aliados', icon: Users },
                  { id: 'analytics', label: '7. Analítica y Reportes', icon: BarChart2 },
                  { id: 'rates', label: '8. Tasas y Atajos Pro', icon: Zap },
                ].map(item => {
                  const Icon = item.icon;
                  const isActive = tutorialActiveTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setTutorialActiveTab(item.id as any)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition whitespace-nowrap cursor-pointer ${
                        isActive
                          ? 'bg-orange-50 dark:bg-[#161F33] text-[#FF5C1B] border border-orange-200/80 dark:border-[#28354D] font-bold shadow-2xs'
                          : 'text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-[#161F33]/60 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#FF5C1B]' : 'text-gray-400'}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Área de Detalle de la Sección Activa */}
              <div className="flex-1 overflow-y-auto pr-2 space-y-4 text-xs">
                {/* 1. INVENTARIO */}
                {tutorialActiveTab === 'inventory' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="p-4 rounded-xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200/60 dark:border-orange-900/40">
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-1.5">
                        <Boxes className="w-4 h-4 text-[#FF5C1B]" />
                        <span>Módulo de Inventario y Catálogo Mayorista</span>
                      </h4>
                      <p className="text-gray-600 dark:text-slate-300 mt-1 leading-relaxed">
                        Es el corazón operativo del almacén. Permite controlar en tiempo real las existencias físicas, precios en divisas, códigos OEM y márgenes de ganancia.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h5 className="font-bold uppercase tracking-wider text-[11px] text-gray-500 dark:text-slate-400">
                        ¿Cómo usarlo en el día a día?
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg bg-gray-50 dark:bg-[#161F33] border border-gray-200/80 dark:border-[#28354D]">
                          <strong className="text-gray-900 dark:text-white block mb-1">🔍 Búsqueda Rápida Ultraveloz</strong>
                          <p className="text-gray-600 dark:text-slate-300">
                            Presiona la tecla <kbd className="font-mono bg-gray-200 dark:bg-gray-700 px-1 rounded">/</kbd> en cualquier lugar. Busca por nombre de repuesto, SKU, marca (ej. CLO, MOOG) o número de parte OEM.
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-gray-50 dark:bg-[#161F33] border border-gray-200/80 dark:border-[#28354D]">
                          <strong className="text-gray-900 dark:text-white block mb-1">⚙️ Auditoría y Ajuste de Stock</strong>
                          <p className="text-gray-600 dark:text-slate-300">
                            Haz clic en el engranaje de cada repuesto para reordenar piezas, auditar stock físico o ver el historial de entradas y salidas de ese ítem.
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-gray-50 dark:bg-[#161F33] border border-gray-200/80 dark:border-[#28354D]">
                          <strong className="text-gray-900 dark:text-white block mb-1">🏷️ Precios Mayoristas y Márgenes</strong>
                          <p className="text-gray-600 dark:text-slate-300">
                            Configura el precio mayorista en $ USD o fija el porcentaje de margen deseado sobre el costo de adquisición. El precio en Bolívares se actualiza al instante con la tasa activa.
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-gray-50 dark:bg-[#161F33] border border-gray-200/80 dark:border-[#28354D]">
                          <strong className="text-gray-900 dark:text-white block mb-1">⚠️ Semáforo de Existencias</strong>
                          <p className="text-gray-600 dark:text-slate-300">
                            Verde para stock óptimo (&gt;10 und), amarillo para stock bajo (&le;10 und) y rojo para piezas agotadas (0 und), facilitando la reposición oportuna.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveModule('inventory');
                          setTutorialModalOpen(false);
                        }}
                        className="px-4 py-2 bg-gray-900 dark:bg-[#161F33] hover:bg-black dark:hover:bg-[#1e2a44] text-white rounded-lg font-bold flex items-center gap-1.5 transition cursor-pointer"
                      >
                        <span>Ir al Inventario Ahora</span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#FF5C1B]" />
                      </button>
                    </div>
                  </div>
                )}

                {/* 2. FACTURACIÓN */}
                {tutorialActiveTab === 'invoicing' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="p-4 rounded-xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200/60 dark:border-orange-900/40">
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-[#FF5C1B]" />
                        <span>Módulo de Facturación y Emisión de Documentos</span>
                      </h4>
                      <p className="text-gray-600 dark:text-slate-300 mt-1 leading-relaxed">
                        Genera pedidos mayoristas en segundos. Admite emisión como <strong>Factura</strong>, <strong>Nota de Entrega</strong> o <strong>Cotización</strong> con correlativos correlacionados y formato físico profesional.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h5 className="font-bold uppercase tracking-wider text-[11px] text-gray-500 dark:text-slate-400">
                        Flujo de Emisión Paso a Paso
                      </h5>
                      <div className="space-y-2">
                        <div className="p-3 rounded-lg bg-gray-50 dark:bg-[#161F33] border border-gray-200/80 dark:border-[#28354D] flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-[#FF5C1B] text-white font-bold text-[10px] flex items-center justify-center shrink-0">1</span>
                          <div>
                            <strong className="text-gray-900 dark:text-white">Selecciona Cliente y Vendedor:</strong>
                            <p className="text-gray-600 dark:text-slate-300 mt-0.5">Indica a qué aliado comercial va dirigida la venta (se carga su RIF, ciudad y dirección de despacho) y qué asesor recibirá la comisión.</p>
                          </div>
                        </div>

                        <div className="p-3 rounded-lg bg-gray-50 dark:bg-[#161F33] border border-gray-200/80 dark:border-[#28354D] flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-[#FF5C1B] text-white font-bold text-[10px] flex items-center justify-center shrink-0">2</span>
                          <div>
                            <strong className="text-gray-900 dark:text-white">Añade Repuestos al Pedido:</strong>
                            <p className="text-gray-600 dark:text-slate-300 mt-0.5">Usa el buscador rápido de ítems. Puedes modificar cantidades y aplicar descuentos mayoristas por renglón.</p>
                          </div>
                        </div>

                        <div className="p-3 rounded-lg bg-gray-50 dark:bg-[#161F33] border border-gray-200/80 dark:border-[#28354D] flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-[#FF5C1B] text-white font-bold text-[10px] flex items-center justify-center shrink-0">3</span>
                          <div>
                            <strong className="text-gray-900 dark:text-white">Condición de Pago (Contado o Crédito):</strong>
                            <p className="text-gray-600 dark:text-slate-300 mt-0.5">Si es a crédito (15, 21 o 30 días), la fecha de vencimiento se calcula automáticamente y la deuda viaja de inmediato a Cuentas por Cobrar.</p>
                          </div>
                        </div>

                        <div className="p-3 rounded-lg bg-gray-50 dark:bg-[#161F33] border border-gray-200/80 dark:border-[#28354D] flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-[#FF5C1B] text-white font-bold text-[10px] flex items-center justify-center shrink-0">4</span>
                          <div>
                            <strong className="text-gray-900 dark:text-white">Impresión y Envío por WhatsApp:</strong>
                            <p className="text-gray-600 dark:text-slate-300 mt-0.5">Visualiza el formato formal impreso con logo corporativo Sotomayor o envía el resumen estructurado al WhatsApp del cliente con un clic.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveModule('invoicing');
                          setTutorialModalOpen(false);
                        }}
                        className="px-4 py-2 bg-[#FF5C1B] hover:bg-[#ff4600] text-white rounded-lg font-bold flex items-center gap-1.5 transition cursor-pointer"
                      >
                        <span>Abrir Constructor de Facturas</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* 3. RECEPCIÓN */}
                {tutorialActiveTab === 'receiving' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="p-4 rounded-xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200/60 dark:border-orange-900/40">
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-1.5">
                        <Download className="w-4 h-4 text-[#FF5C1B]" />
                        <span>Módulo de Ingreso de Mercancía y Compras</span>
                      </h4>
                      <p className="text-gray-600 dark:text-slate-300 mt-1 leading-relaxed">
                        Control de entrada de contenedores y compras nacionales de fabricantes. Alimenta automáticamente el stock y recalcula los costos reales de adquisición.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h5 className="font-bold uppercase tracking-wider text-[11px] text-gray-500 dark:text-slate-400">
                        Puntos Clave del Proceso
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg bg-gray-50 dark:bg-[#161F33] border border-gray-200/80 dark:border-[#28354D]">
                          <strong className="text-gray-900 dark:text-white block mb-1">📦 Registro de Proveedor y Factura</strong>
                          <p className="text-gray-600 dark:text-slate-300">
                            Coloca el nombre del fabricante (ej. Cloyes, Federal-Mogul) y el número de Packing List para trazabilidad en auditorías.
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-gray-50 dark:bg-[#161F33] border border-gray-200/80 dark:border-[#28354D]">
                          <strong className="text-gray-900 dark:text-white block mb-1">💰 Costos y Nuevos Precios</strong>
                          <p className="text-gray-600 dark:text-slate-300">
                            Puedes ingresar el costo unitario de llegada y de una vez definir el nuevo precio mayorista que entrará en vigencia.
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-gray-50 dark:bg-[#161F33] border border-gray-200/80 dark:border-[#28354D]">
                          <strong className="text-gray-900 dark:text-white block mb-1">📊 Totales de Inversión en Vivo</strong>
                          <p className="text-gray-600 dark:text-slate-300">
                            La barra inferior consolida la cantidad de piezas y la inversión total del lote en dólares ($) y Bolívares (BCV).
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-gray-50 dark:bg-[#161F33] border border-gray-200/80 dark:border-[#28354D]">
                          <strong className="text-gray-900 dark:text-white block mb-1">📋 Historial de Lotes Ingresados</strong>
                          <p className="text-gray-600 dark:text-slate-300">
                            Consulta en la parte inferior todas las recepciones históricas aprobadas con fecha, piezas y monto total liquidado.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveModule('receiving');
                          setTutorialModalOpen(false);
                        }}
                        className="px-4 py-2 bg-gray-900 dark:bg-[#161F33] hover:bg-black dark:hover:bg-[#1e2a44] text-white rounded-lg font-bold flex items-center gap-1.5 transition cursor-pointer"
                      >
                        <span>Ir a Recepción de Mercancía</span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#FF5C1B]" />
                      </button>
                    </div>
                  </div>
                )}

                {/* 4. CXC */}
                {tutorialActiveTab === 'cxc' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="p-4 rounded-xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200/60 dark:border-orange-900/40">
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-1.5">
                        <DollarSign className="w-4 h-4 text-[#FF5C1B]" />
                        <span>Módulo de Cuentas por Cobrar (CxC) y Cobranzas</span>
                      </h4>
                      <p className="text-gray-600 dark:text-slate-300 mt-1 leading-relaxed">
                        Control riguroso de la cartera de crédito. Permite registrar abonos parciales multimoneda y agilizar la recuperación de liquidez.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h5 className="font-bold uppercase tracking-wider text-[11px] text-gray-500 dark:text-slate-400">
                        Operaciones de Cobranza
                      </h5>
                      <div className="space-y-2">
                        <div className="p-3 rounded-lg bg-gray-50 dark:bg-[#161F33] border border-gray-200/80 dark:border-[#28354D]">
                          <strong className="text-gray-900 dark:text-white block mb-1">💵 Registro de Abonos Multimoneda</strong>
                          <p className="text-gray-600 dark:text-slate-300">
                            Haz clic en «Abonar» en cualquier factura. Admite pagos en Divisas Efectivo, Pago Móvil (BCV), Transferencias bancarias y Zelle con su número de referencia.
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-gray-50 dark:bg-[#161F33] border border-gray-200/80 dark:border-[#28354D]">
                          <strong className="text-gray-900 dark:text-white block mb-1">⏳ Vencimientos y Alertas de Mora</strong>
                          <p className="text-gray-600 dark:text-slate-300">
                            Las facturas vencidas se destacan con un indicador rojo parpadeante. El sistema calcula los días de retraso automáticamente.
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-gray-50 dark:bg-[#161F33] border border-gray-200/80 dark:border-[#28354D]">
                          <strong className="text-gray-900 dark:text-white block mb-1">📲 Cobranza por WhatsApp con 1 Clic</strong>
                          <p className="text-gray-600 dark:text-slate-300">
                            El botón de WhatsApp genera un mensaje profesional con el total adeudado, monto abonado y saldo pendiente en dólares ($) y bolívares (BCV).
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveModule('cxc');
                          setTutorialModalOpen(false);
                        }}
                        className="px-4 py-2 bg-[#FF5C1B] hover:bg-[#ff4600] text-white rounded-lg font-bold flex items-center gap-1.5 transition cursor-pointer"
                      >
                        <span>Gestionar Cuentas por Cobrar</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* 5. COMISIONES */}
                {tutorialActiveTab === 'commissions' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="p-4 rounded-xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200/60 dark:border-orange-900/40">
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-1.5">
                        <TrendingUp className="w-4 h-4 text-[#FF5C1B]" />
                        <span>Módulo de Comisiones y Rendimiento de Vendedores</span>
                      </h4>
                      <p className="text-gray-600 dark:text-slate-300 mt-1 leading-relaxed">
                        Cálculo automatizado de comisiones según la política de cobranza efectiva: las comisiones se liberan como liquidables cuando el cliente ha pagado la factura.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h5 className="font-bold uppercase tracking-wider text-[11px] text-gray-500 dark:text-slate-400">
                        Herramientas para Asesores Comerciales
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg bg-gray-50 dark:bg-[#161F33] border border-gray-200/80 dark:border-[#28354D]">
                          <strong className="text-gray-900 dark:text-white block mb-1">🎯 Comisión Liquidable vs Crédito</strong>
                          <p className="text-gray-600 dark:text-slate-300">
                            La comisión en verde indica dinero listo para pagar al asesor. La de crédito indica comisiones en espera de cobranza del cliente.
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-gray-50 dark:bg-[#161F33] border border-gray-200/80 dark:border-[#28354D]">
                          <strong className="text-gray-900 dark:text-white block mb-1">📑 Ver Ventas Concretadas</strong>
                          <p className="text-gray-600 dark:text-slate-300">
                            Haz clic en «Ver Ventas Concretadas» en la tarjeta del asesor para abrir el expediente con todas sus facturas emitidas, ticket promedio y reimpresión.
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-gray-50 dark:bg-[#161F33] border border-gray-200/80 dark:border-[#28354D]">
                          <strong className="text-gray-900 dark:text-white block mb-1">👥 Asesores Activos e Inactivos</strong>
                          <p className="text-gray-600 dark:text-slate-300">
                            Puedes pausar temporalmente a un vendedor sin perder su historial acumulado de ventas ni sus cortes contables.
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-gray-50 dark:bg-[#161F33] border border-gray-200/80 dark:border-[#28354D]">
                          <strong className="text-gray-900 dark:text-white block mb-1">⚡ Exportación de Cortes</strong>
                          <p className="text-gray-600 dark:text-slate-300">
                            Permite cerrar cortes quincenales o mensuales consolidando los montos en divisas y su equivalente en bolívares.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveModule('commissions');
                          setTutorialModalOpen(false);
                        }}
                        className="px-4 py-2 bg-gray-900 dark:bg-[#161F33] hover:bg-black dark:hover:bg-[#1e2a44] text-white rounded-lg font-bold flex items-center gap-1.5 transition cursor-pointer"
                      >
                        <span>Ver Comisiones de Vendedores</span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#FF5C1B]" />
                      </button>
                    </div>
                  </div>
                )}

                {/* 6. CLIENTES */}
                {tutorialActiveTab === 'clients' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="p-4 rounded-xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200/60 dark:border-orange-900/40">
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-[#FF5C1B]" />
                        <span>Módulo de Clientes Mayoristas y Blindaje Contable</span>
                      </h4>
                      <p className="text-gray-600 dark:text-slate-300 mt-1 leading-relaxed">
                        Directorio de aliados comerciales con control de líneas de crédito, expediente histórico de facturación y protección contra eliminación accidental.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h5 className="font-bold uppercase tracking-wider text-[11px] text-gray-500 dark:text-slate-400">
                        Características de Seguridad y Gestión
                      </h5>
                      <div className="space-y-2">
                        <div className="p-3 rounded-lg bg-gray-50 dark:bg-[#161F33] border border-gray-200/80 dark:border-[#28354D]">
                          <strong className="text-gray-900 dark:text-white block mb-1">📂 Expediente e Historial de Facturas</strong>
                          <p className="text-gray-600 dark:text-slate-300">
                            El botón «Historial» en la tarjeta del cliente despliega todas sus facturas históricas, total facturado, total pagado y saldo pendiente auditado.
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-gray-50 dark:bg-[#161F33] border border-gray-200/80 dark:border-[#28354D]">
                          <strong className="text-gray-900 dark:text-white block mb-1">🛡️ Protección contra Eliminación Accidental</strong>
                          <p className="text-gray-600 dark:text-slate-300">
                            Si un cliente posee facturas emitidas o saldo deudor en CxC, el sistema bloquea su eliminación física para proteger la contabilidad y ofrece un acceso directo a su expediente.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveModule('clients');
                          setTutorialModalOpen(false);
                        }}
                        className="px-4 py-2 bg-[#FF5C1B] hover:bg-[#ff4600] text-white rounded-lg font-bold flex items-center gap-1.5 transition cursor-pointer"
                      >
                        <span>Ir a Clientes y Aliados</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* 7. ANALÍTICA */}
                {tutorialActiveTab === 'analytics' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="p-4 rounded-xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200/60 dark:border-orange-900/40">
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-1.5">
                        <BarChart2 className="w-4 h-4 text-[#FF5C1B]" />
                        <span>Módulo de Estadísticas y Analítica de Negocio</span>
                      </h4>
                      <p className="text-gray-600 dark:text-slate-300 mt-1 leading-relaxed">
                        Tablero ejecutivo de indicadores clave de rendimiento (KPIs), tendencias de facturación, rentabilidad y productos de mayor demanda.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h5 className="font-bold uppercase tracking-wider text-[11px] text-gray-500 dark:text-slate-400">
                        Indicadores Estratégicos
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg bg-gray-50 dark:bg-[#161F33] border border-gray-200/80 dark:border-[#28354D]">
                          <strong className="text-gray-900 dark:text-white block mb-1">📈 Tendencia de Ventas en el Tiempo</strong>
                          <p className="text-gray-600 dark:text-slate-300">
                            Gráficos interactivos de facturación con filtro de tiempo (Hoy, 7 Días, Mes Actual o Histórico Completo).
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-gray-50 dark:bg-[#161F33] border border-gray-200/80 dark:border-[#28354D]">
                          <strong className="text-gray-900 dark:text-white block mb-1">💎 Margen de Rentabilidad Real</strong>
                          <p className="text-gray-600 dark:text-slate-300">
                            Calcula la ganancia bruta restando los costos de reposición al total facturado.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveModule('analytics');
                          setTutorialModalOpen(false);
                        }}
                        className="px-4 py-2 bg-gray-900 dark:bg-[#161F33] hover:bg-black dark:hover:bg-[#1e2a44] text-white rounded-lg font-bold flex items-center gap-1.5 transition cursor-pointer"
                      >
                        <span>Ver Analítica de Negocio</span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#FF5C1B]" />
                      </button>
                    </div>
                  </div>
                )}

                {/* 8. TASAS Y ATAJOS */}
                {tutorialActiveTab === 'rates' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="p-4 rounded-xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200/60 dark:border-orange-900/40">
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-1.5">
                        <Zap className="w-4 h-4 text-[#FF5C1B]" />
                        <span>Tasas Cambiarias, Atajos de Teclado y Temas</span>
                      </h4>
                      <p className="text-gray-600 dark:text-slate-300 mt-1 leading-relaxed">
                        Herramientas de alta productividad diseñadas para acelerar el trabajo diario de los despachadores y cajeros.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h5 className="font-bold uppercase tracking-wider text-[11px] text-gray-500 dark:text-slate-400">
                        Atajos de Teclado
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div className="p-2.5 rounded-lg bg-gray-50 dark:bg-[#161F33] border border-gray-200/80 dark:border-[#28354D] flex items-center justify-between">
                          <span className="text-gray-700 dark:text-slate-300">Buscador global rápido:</span>
                          <kbd className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 font-mono text-[11px] font-bold">/</kbd>
                        </div>
                        <div className="p-2.5 rounded-lg bg-gray-50 dark:bg-[#161F33] border border-gray-200/80 dark:border-[#28354D] flex items-center justify-between">
                          <span className="text-gray-700 dark:text-slate-300">Cerrar modales o ventanas:</span>
                          <kbd className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 font-mono text-[11px] font-bold">Esc</kbd>
                        </div>
                        <div className="p-2.5 rounded-lg bg-gray-50 dark:bg-[#161F33] border border-gray-200/80 dark:border-[#28354D] flex items-center justify-between">
                          <span className="text-gray-700 dark:text-slate-300">Confirmar o añadir en listas:</span>
                          <kbd className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 font-mono text-[11px] font-bold">Enter</kbd>
                        </div>
                        <div className="p-2.5 rounded-lg bg-gray-50 dark:bg-[#161F33] border border-gray-200/80 dark:border-[#28354D] flex items-center justify-between">
                          <span className="text-gray-700 dark:text-slate-300">Cambiar esquema de color:</span>
                          <span className="text-[11px] text-[#FF5C1B] font-bold">Paleta en Sidebar</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer del Modal */}
            <div className="pt-4 mt-4 border-t border-gray-100 dark:border-[#1E293B] flex items-center justify-between text-xs shrink-0">
              <span className="text-gray-400 dark:text-slate-500">
                ¿Prefieres un tour interactivo en vivo? Presiona <strong>«Iniciar Tour en Pantalla»</strong> arriba a la derecha.
              </span>
              <button
                type="button"
                onClick={() => setTutorialModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-[#161F33] hover:bg-gray-200 dark:hover:bg-[#1e2a44] text-gray-800 dark:text-white font-semibold transition cursor-pointer"
              >
                Cerrar Guía
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          MODAL: PEDIDOS EN ESPERA Y BORRADORES DE FACTURAS
      ============================================================ */}
      {draftsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#0E1422] border border-gray-200 dark:border-[#1E293B] rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            {/* Header */}
            <div className="px-5 py-4 border-b border-gray-100 dark:border-[#1E293B] flex items-center justify-between bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <FileText size={20} className="text-amber-500" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    Pedidos en Espera y Borradores
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 font-mono">
                      {drafts.length} {drafts.length === 1 ? 'borrador' : 'borradores'}
                    </span>
                  </h3>
                  <p className="text-[11px] text-gray-500 dark:text-slate-400">
                    Facturas guardadas en progreso. No descuentan inventario hasta su emisión definitiva.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDraftsModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#161F33] cursor-pointer transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Contenido / Listado */}
            <div className="p-5 overflow-y-auto space-y-3 flex-1">
              {drafts.length === 0 ? (
                <div className="text-center py-12 px-4 border border-dashed border-gray-200 dark:border-[#1E293B] rounded-xl bg-gray-50/50 dark:bg-[#12192B]">
                  <Clock className="w-10 h-10 text-amber-400 mx-auto mb-2 opacity-60" />
                  <p className="font-bold text-sm text-gray-700 dark:text-slate-200">No hay pedidos en espera</p>
                  <p className="text-xs text-gray-500 dark:text-slate-400 max-w-sm mx-auto mt-1">
                    Puedes guardar cualquier factura en progreso presionando el botón «Borrador» en el facturador.
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {drafts.map(draft => (
                    <div
                      key={draft.id}
                      className="p-3.5 rounded-xl border border-gray-200 dark:border-[#1E293B] bg-white dark:bg-[#12192B] hover:border-amber-400 dark:hover:border-amber-600 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800/40">
                            {draft.id}
                          </span>
                          <span className="text-xs font-bold text-gray-900 dark:text-white">
                            {draft.clientName || 'Cliente no definido'}
                          </span>
                          <span className="text-[10px] text-gray-400 dark:text-slate-500 font-mono">
                            • {draft.date}
                          </span>
                        </div>
                        <div className="text-[11px] text-gray-500 dark:text-slate-400 flex flex-wrap items-center gap-x-3 gap-y-0.5">
                          <span>Vendedor: <strong className="text-gray-700 dark:text-slate-300">{draft.sellerName || 'No asignado'}</strong></span>
                          <span>•</span>
                          <span>Ítems: <strong className="text-gray-700 dark:text-slate-300">{draft.itemsCount} repuesto(s)</strong></span>
                          <span>•</span>
                          <span>Total: <strong className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">${draft.totalUsd.toFixed(2)}</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                        <button
                          type="button"
                          onClick={() => handleDeleteDraft(draft.id)}
                          className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-transparent hover:border-rose-200 dark:hover:border-rose-900/60 cursor-pointer transition"
                          title="Eliminar borrador permanentemente"
                        >
                          <Trash2 size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleResumeDraft(draft)}
                          className="px-3 py-1.5 rounded-lg bg-[#FF5C1B] hover:bg-[#ff4600] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition"
                        >
                          <span>Continuar Factura</span>
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 bg-gray-50 dark:bg-[#12192B] border-t border-gray-100 dark:border-[#1E293B] flex items-center justify-between text-xs">
              <span className="text-gray-500 dark:text-slate-400 text-[11px]">
                Sincronizado con Supabase en la nube para acceso multidispositivo
              </span>
              <button
                type="button"
                onClick={() => setDraftsModalOpen(false)}
                className="px-3.5 py-1.5 rounded-lg bg-gray-200/80 dark:bg-[#1E293B] text-gray-700 dark:text-slate-300 font-semibold cursor-pointer hover:bg-gray-300 dark:hover:bg-[#28354D] transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          MODAL: CREAR REPUESTO DIRECTO DESDE FACTURADOR
      ============================================================ */}
      {newProductFromInvoiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#0E1422] border border-gray-200 dark:border-[#1E293B] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="px-5 py-4 border-b border-gray-100 dark:border-[#1E293B] flex items-center justify-between bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#FF5C1B]/20 text-[#FF5C1B] flex items-center justify-center">
                  <Plus size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                    Crear Repuesto y Añadir a la Factura
                  </h3>
                  <p className="text-[11px] text-gray-500 dark:text-slate-400">
                    Se registrará en Supabase con canal mayorista y se sumará a esta factura.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setNewProductFromInvoiceModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#161F33] cursor-pointer transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSaveNewProductFromInvoice} className="p-5 space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* SKU */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 dark:text-slate-300 mb-1">
                    Código SKU / OEM *
                  </label>
                  <input
                    type="text"
                    required
                    value={newProductInvoiceForm.sku}
                    onChange={e => setNewProductInvoiceForm(prev => ({ ...prev, sku: e.target.value.toUpperCase() }))}
                    placeholder="Ej. MOOG-ES3456"
                    className="w-full px-3 py-2 text-xs font-mono font-bold uppercase border border-gray-200 dark:border-[#28354D] rounded-lg bg-white dark:bg-[#161F33] text-gray-900 dark:text-white focus:outline-none focus:border-[#FF5C1B]"
                  />
                </div>

                {/* Categoría */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 dark:text-slate-300 mb-1">
                    Categoría
                  </label>
                  <select
                    value={newProductInvoiceForm.category}
                    onChange={e => setNewProductInvoiceForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 text-xs border border-gray-200 dark:border-[#28354D] rounded-lg bg-white dark:bg-[#161F33] text-gray-900 dark:text-white focus:outline-none focus:border-[#FF5C1B]"
                  >
                    <option value="Tren Delantero">Tren Delantero</option>
                    <option value="Distribución">Distribución</option>
                    <option value="Motor y Enfriamiento">Motor y Enfriamiento</option>
                    <option value="Rodamientos">Rodamientos</option>
                    <option value="Eléctrico">Eléctrico</option>
                    <option value="Suspensión y Frenos">Suspensión y Frenos</option>
                  </select>
                </div>
              </div>

              {/* Nombre / Descripción */}
              <div>
                <label className="block text-[11px] font-bold text-gray-700 dark:text-slate-300 mb-1">
                  Nombre / Descripción del Repuesto *
                </label>
                <input
                  type="text"
                  required
                  value={newProductInvoiceForm.name}
                  onChange={e => setNewProductInvoiceForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ej. Terminal de Dirección Derecho Aveo"
                  className="w-full px-3 py-2 text-xs border border-gray-200 dark:border-[#28354D] rounded-lg bg-white dark:bg-[#161F33] text-gray-900 dark:text-white focus:outline-none focus:border-[#FF5C1B]"
                />
              </div>

              {/* Marca / Proveedor */}
              <div>
                <label className="block text-[11px] font-bold text-gray-700 dark:text-slate-300 mb-1">
                  Marca / Fabricante
                </label>
                <input
                  type="text"
                  value={newProductInvoiceForm.supplier}
                  onChange={e => setNewProductInvoiceForm(prev => ({ ...prev, supplier: e.target.value.toUpperCase() }))}
                  placeholder="Ej. MOOG, TRW, CORONA, GENÉRICO"
                  className="w-full px-3 py-2 text-xs uppercase border border-gray-200 dark:border-[#28354D] rounded-lg bg-white dark:bg-[#161F33] text-gray-900 dark:text-white focus:outline-none focus:border-[#FF5C1B]"
                />
              </div>

              {/* Costo y Precio de Venta Mayorista */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 dark:text-slate-300 mb-1">
                    Costo ($ USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-xs text-gray-400 font-bold">$</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={newProductInvoiceForm.cost}
                      onChange={e => setNewProductInvoiceForm(prev => ({ ...prev, cost: e.target.value }))}
                      placeholder="0.00"
                      className="w-full pl-7 pr-3 py-2 text-xs font-mono border border-gray-200 dark:border-[#28354D] rounded-lg bg-white dark:bg-[#161F33] text-gray-900 dark:text-white focus:outline-none focus:border-[#FF5C1B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 dark:text-slate-300 mb-1">
                    Precio Venta Mayor ($ USD) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-xs text-[#FF5C1B] font-bold">$</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0.01"
                      required
                      value={newProductInvoiceForm.price}
                      onChange={e => setNewProductInvoiceForm(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="0.00"
                      className="w-full pl-7 pr-3 py-2 text-xs font-mono font-bold border border-gray-200 dark:border-[#28354D] rounded-lg bg-white dark:bg-[#161F33] text-gray-900 dark:text-white focus:outline-none focus:border-[#FF5C1B]"
                    />
                  </div>
                </div>
              </div>

              {/* Stock Inicial y Cantidad a Facturar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-gray-100 dark:border-[#1E293B]">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 dark:text-slate-300 mb-1">
                    Stock Inicial en Inventario
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newProductInvoiceForm.wholesaleStock}
                    onChange={e => setNewProductInvoiceForm(prev => ({ ...prev, wholesaleStock: e.target.value }))}
                    className="w-full px-3 py-2 text-xs font-mono font-bold text-center border border-gray-200 dark:border-[#28354D] rounded-lg bg-white dark:bg-[#161F33] text-gray-900 dark:text-white focus:outline-none focus:border-[#FF5C1B]"
                  />
                  <span className="block mt-0.5 text-[10px] text-gray-400">Existencias físicas iniciales</span>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#FF5C1B] mb-1">
                    Cantidad a Facturar Ahora
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newProductInvoiceForm.quantityToInvoice}
                    onChange={e => setNewProductInvoiceForm(prev => ({ ...prev, quantityToInvoice: e.target.value }))}
                    className="w-full px-3 py-2 text-xs font-mono font-bold text-center border border-[#FF5C1B]/50 rounded-lg bg-orange-50/40 dark:bg-[#161F33] text-[#FF5C1B] focus:outline-none focus:border-[#FF5C1B]"
                  />
                  <span className="block mt-0.5 text-[10px] text-gray-400">Se agregará al carrito actual</span>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="pt-3 border-t border-gray-100 dark:border-[#1E293B] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNewProductFromInvoiceModalOpen(false)}
                  className="px-3.5 py-2 text-xs font-semibold text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-[#161F33] rounded-lg cursor-pointer transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#FF5C1B] hover:bg-[#ff4600] text-white text-xs font-bold rounded-lg cursor-pointer flex items-center gap-1.5 shadow-sm transition"
                >
                  <Plus size={14} />
                  <span>Crear y Agregar a Factura</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================
          RECORRIDO GUIADO EN VIVO (WALKTHROUGH TOUR FLOTANTE)
      ============================================================ */}
      {isTourActive && (
        <div className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4 pointer-events-none animate-fadeIn">
          <div className="bg-white dark:bg-[#0E1422] rounded-2xl max-w-xl w-full p-5 shadow-2xl border-2 border-[#FF5C1B] pointer-events-auto flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950 text-[#FF5C1B] font-bold text-[10px] uppercase tracking-wider">
                  {TOUR_STEPS[tourStep].badge}
                </span>
                <span className="text-xs text-gray-400 dark:text-slate-500 font-mono">
                  Paso {tourStep + 1} de {TOUR_STEPS.length}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsTourActive(false);
                  setTourStep(0);
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white text-xs cursor-pointer font-semibold"
                title="Cerrar recorrido guiado"
              >
                ✕ Saltar Tour
              </button>
            </div>

            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#FF5C1B]" />
                <span>{TOUR_STEPS[tourStep].title}</span>
              </h4>
              <p className="text-xs font-semibold text-[#FF5C1B] mt-0.5">
                {TOUR_STEPS[tourStep].subtitle}
              </p>
              <p className="text-xs text-gray-600 dark:text-slate-300 mt-2 leading-relaxed">
                {TOUR_STEPS[tourStep].description}
              </p>
            </div>

            {/* Barra de Progreso */}
            <div className="w-full bg-gray-100 dark:bg-[#1E293B] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#FF5C1B] h-full rounded-full transition-all duration-300"
                style={{ width: `${((tourStep + 1) / TOUR_STEPS.length) * 100}%` }}
              />
            </div>

            {/* Controles de Navegación del Tour */}
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => {
                  setIsTourActive(false);
                  setTutorialModalOpen(true);
                }}
                className="text-xs text-gray-500 dark:text-slate-400 hover:text-gray-800 dark:hover:text-white underline cursor-pointer"
              >
                Ver Manual Completo
              </button>

              <div className="flex items-center gap-2">
                {tourStep > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      const prev = tourStep - 1;
                      setTourStep(prev);
                      const mod = TOUR_STEPS[prev].targetModule;
                      if (mod) setActiveModule(mod);
                    }}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-[#28354D] text-gray-700 dark:text-slate-200 text-xs font-semibold hover:bg-gray-100 dark:hover:bg-[#161F33] cursor-pointer flex items-center gap-1 transition"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Anterior</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    if (tourStep < TOUR_STEPS.length - 1) {
                      const next = tourStep + 1;
                      setTourStep(next);
                      const mod = TOUR_STEPS[next].targetModule;
                      if (mod) setActiveModule(mod);
                    } else {
                      setIsTourActive(false);
                      setTourStep(0);
                      showToast('¡Has completado el recorrido guiado de Repuestos Sotomayor!');
                    }
                  }}
                  className="px-4 py-1.5 rounded-lg bg-[#FF5C1B] hover:bg-[#ff4600] text-white text-xs font-bold cursor-pointer flex items-center gap-1 transition shadow-xs"
                >
                  <span>{tourStep === TOUR_STEPS.length - 1 ? '¡Finalizar Tour!' : 'Siguiente'}</span>
                  {tourStep < TOUR_STEPS.length - 1 && <ChevronRight className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
