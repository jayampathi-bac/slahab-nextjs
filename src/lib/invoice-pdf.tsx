import { Document, Page, View, Text, StyleSheet, renderToBuffer } from '@react-pdf/renderer'

export interface InvoicePdfData {
  orderId: string
  firstName: string
  lastName: string
  email: string
  organization?: string | null
  invoiceDate: string
  paymentMethod: string
  paymentId?: string | null
  eventTitle: string
  eventDateRange: string
  eventVenue: string
  packageName: string
  amount: number
  currency: string
}

const GOLD = '#c29b57'
const DARK = '#0a0a0a'
const INK = '#111111'

const styles = StyleSheet.create({
  page: { backgroundColor: '#ffffff', fontFamily: 'Helvetica', fontSize: 10, color: INK },

  header: {
    backgroundColor: DARK,
    paddingVertical: 26,
    paddingHorizontal: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  brandName: { color: GOLD, fontFamily: 'Times-Bold', fontSize: 20, letterSpacing: 4 },
  brandSub: { color: '#777777', fontSize: 7, letterSpacing: 1, marginTop: 4, textTransform: 'uppercase' },
  invoiceWord: { color: GOLD, fontSize: 9, fontFamily: 'Helvetica-Bold', letterSpacing: 3, textAlign: 'right', textTransform: 'uppercase' },
  invoiceNumber: { color: '#ffffff', fontSize: 14, marginTop: 4, textAlign: 'right', fontFamily: 'Courier' },

  stripe: { backgroundColor: GOLD, height: 3 },

  body: { paddingHorizontal: 40, paddingVertical: 32 },

  metaRow: { flexDirection: 'row', marginBottom: 28, paddingBottom: 22, borderBottomWidth: 1, borderBottomColor: '#ebebeb' },
  metaCol: { flexGrow: 1, flexBasis: 0, paddingRight: 16 },
  metaLabel: { fontSize: 7, fontFamily: 'Helvetica-Bold', letterSpacing: 2, color: '#999999', textTransform: 'uppercase', marginBottom: 5 },
  metaValue: { fontSize: 10, color: INK, lineHeight: 1.5 },

  tableHead: { flexDirection: 'row', borderBottomWidth: 2, borderBottomColor: INK, paddingBottom: 8 },
  thDesc: { flexGrow: 1, flexBasis: 0, fontSize: 7, fontFamily: 'Helvetica-Bold', letterSpacing: 2, color: '#999999', textTransform: 'uppercase' },
  thQty: { width: 40, fontSize: 7, fontFamily: 'Helvetica-Bold', letterSpacing: 2, color: '#999999', textTransform: 'uppercase' },
  thAmount: { width: 90, textAlign: 'right', fontSize: 7, fontFamily: 'Helvetica-Bold', letterSpacing: 2, color: '#999999', textTransform: 'uppercase' },

  row: { flexDirection: 'row', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  itemName: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: INK, marginBottom: 3 },
  itemDesc: { fontSize: 9, color: '#888888', lineHeight: 1.4 },
  cellDesc: { flexGrow: 1, flexBasis: 0 },
  cellQty: { width: 40, fontSize: 10 },
  cellAmount: { width: 90, textAlign: 'right', fontSize: 10 },

  totalRow: { flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 18 },
  totalBox: { alignItems: 'flex-end' },
  totalLabel: { fontSize: 7, fontFamily: 'Helvetica-Bold', letterSpacing: 2, color: '#999999', textTransform: 'uppercase', marginBottom: 5 },
  totalAmount: { fontSize: 22, fontFamily: 'Helvetica-Bold', color: GOLD },

  statusRow: { marginTop: 30, paddingTop: 22, borderTopWidth: 1, borderTopColor: '#ebebeb', flexDirection: 'row', alignItems: 'center' },
  statusBadge: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#f7f1e6', borderWidth: 1, borderColor: '#e3d3af',
    paddingVertical: 6, paddingHorizontal: 12,
  },
  statusDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: GOLD, marginRight: 7 },
  statusText: { fontSize: 8, fontFamily: 'Helvetica-Bold', letterSpacing: 2, color: GOLD, textTransform: 'uppercase' },
  txnId: { fontSize: 9, color: '#aaaaaa', fontFamily: 'Courier', marginLeft: 12 },

  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: DARK, paddingVertical: 22, paddingHorizontal: 40,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  footerBrand: { color: GOLD, fontSize: 8, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 },
  footerDetail: { color: '#777777', fontSize: 8, lineHeight: 1.5 },
  footerRight: { color: '#888888', fontSize: 8, textAlign: 'right', lineHeight: 1.6 },
})

function InvoiceDocument({ data }: { data: InvoicePdfData }) {
  const amountFormatted = data.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })
  const fullName = `${data.firstName} ${data.lastName}`.trim()

  return (
    <Document
      title={`Invoice ${data.orderId} — SLAHAB`}
      author="SLAHAB"
      subject={`Invoice for ${data.eventTitle}`}
    >
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.brandName}>SLAHAB</Text>
            <Text style={styles.brandSub}>Sri Lanka Association of Hairdressers & Beauticians</Text>
          </View>
          <View>
            <Text style={styles.invoiceWord}>Invoice</Text>
            <Text style={styles.invoiceNumber}>{data.orderId}</Text>
          </View>
        </View>
        <View style={styles.stripe} />

        {/* Body */}
        <View style={styles.body}>
          <View style={styles.metaRow}>
            <View style={styles.metaCol}>
              <Text style={styles.metaLabel}>Bill To</Text>
              <Text style={styles.metaValue}>{fullName}</Text>
              <Text style={styles.metaValue}>{data.email}</Text>
              {data.organization ? <Text style={styles.metaValue}>{data.organization}</Text> : null}
            </View>
            <View style={styles.metaCol}>
              <Text style={styles.metaLabel}>Invoice Date</Text>
              <Text style={styles.metaValue}>{data.invoiceDate}</Text>
            </View>
            <View style={styles.metaCol}>
              <Text style={styles.metaLabel}>Payment Method</Text>
              <Text style={styles.metaValue}>{data.paymentMethod}</Text>
            </View>
          </View>

          {/* Line items */}
          <View style={styles.tableHead}>
            <Text style={styles.thDesc}>Description</Text>
            <Text style={styles.thQty}>Qty</Text>
            <Text style={styles.thAmount}>Amount</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.cellDesc}>
              <Text style={styles.itemName}>{data.eventTitle}</Text>
              <Text style={styles.itemDesc}>{data.packageName}</Text>
              <Text style={styles.itemDesc}>{data.eventDateRange} · {data.eventVenue}</Text>
            </View>
            <Text style={styles.cellQty}>1</Text>
            <Text style={styles.cellAmount}>{data.currency} {amountFormatted}</Text>
          </View>

          {/* Total */}
          <View style={styles.totalRow}>
            <View style={styles.totalBox}>
              <Text style={styles.totalLabel}>Total Paid</Text>
              <Text style={styles.totalAmount}>{data.currency} {amountFormatted}</Text>
            </View>
          </View>

          {/* Status */}
          <View style={styles.statusRow}>
            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Payment Confirmed</Text>
            </View>
            {data.paymentId ? <Text style={styles.txnId}>Txn: {data.paymentId}</Text> : null}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <View>
            <Text style={styles.footerBrand}>SLAHAB</Text>
            <Text style={styles.footerDetail}>No 646, Galle Road, Colombo 3, Sri Lanka</Text>
            <Text style={styles.footerDetail}>Official OMC Representative · ICD Sri Lanka Chapter · Est. 1996</Text>
          </View>
          <View>
            <Text style={styles.footerRight}>slahab1996@gmail.com</Text>
            <Text style={styles.footerRight}>+94 770567359</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}

export async function generateInvoicePdf(data: InvoicePdfData): Promise<Buffer> {
  return renderToBuffer(<InvoiceDocument data={data} />)
}
