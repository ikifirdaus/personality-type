"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
    lineHeight: 1.6,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tableHeader: {
    flexDirection: "row",
    borderBottom: "1 solid #000",
    backgroundColor: "#f0f0f0",
    paddingVertical: 4,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1 solid #ccc",
    paddingVertical: 4,
  },
  cell: {
    paddingHorizontal: 4,
    flex: 1,
  },
  cellRight: {
    textAlign: "right",
  },
  total: {
    marginTop: 10,
    textAlign: "right",
    fontWeight: "bold",
  },
  businessInfo: {
    marginTop: 30,
  },
});

export function InvoicePDF({ transaction }: { transaction: any }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Logo di atas tengah */}
        <View style={styles.logoContainer}>
          <Image
            src="/invoice.png" // Ganti dengan path logo asli
            style={styles.logo}
          />
        </View>

        {/* Title & Info */}
        <View style={styles.section}>
          <Text style={styles.title}>INVOICE</Text>
          <View style={styles.infoRow}>
            <View>
              <Text>Untuk:</Text>
              <Text>{transaction.user.name}</Text>
              <Text>{transaction.user.email}</Text>
            </View>
            <View>
              <Text>No. Invoice: {transaction.invoice?.invoiceNumber}</Text>
              <Text>
                Tanggal:{" "}
                {new Date(transaction.createdAt).toLocaleDateString("id-ID")}
              </Text>
              <Text>Metode: Transfer Bank</Text>
              <Text>Status: Lunas</Text>
            </View>
          </View>
        </View>

        {/* Table */}
        <View>
          <View style={styles.tableHeader}>
            <Text style={styles.cell}>Produk</Text>
            <Text style={[styles.cell, styles.cellRight]}>Qty</Text>
            <Text style={[styles.cell, styles.cellRight]}>Harga</Text>
            <Text style={[styles.cell, styles.cellRight]}>Subtotal</Text>
          </View>

          {transaction.transactionItem.map((item: any) => (
            <View key={item.id} style={styles.tableRow}>
              <Text style={styles.cell}>{item.product.productName}</Text>
              <Text style={[styles.cell, styles.cellRight]}>
                {item.quantity}
              </Text>
              <Text style={[styles.cell, styles.cellRight]}>
                Rp {item.price.toLocaleString("id-ID")}
              </Text>
              <Text style={[styles.cell, styles.cellRight]}>
                Rp {(item.price * item.quantity).toLocaleString("id-ID")}
              </Text>
            </View>
          ))}
        </View>

        {/* Total */}
        <Text style={styles.total}>
          Total: Rp {transaction.totalPrice.toLocaleString("id-ID")}
        </Text>

        {/* Informasi bisnis di bawah total, sebelah kiri */}
        <View style={styles.businessInfo}>
          <Text>Nama Bisnis Anda</Text>
          <Text>Alamat Bisnis</Text>
          <Text>Email: kontak@bisnisanda.com</Text>
          <Text>Telepon: +62 812-3456-7890</Text>
        </View>
      </Page>
    </Document>
  );
}
