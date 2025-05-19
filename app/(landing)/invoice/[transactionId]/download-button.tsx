"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { InvoicePDF } from "./pdf-document";

export function DownloadPdfButton({ transaction }: { transaction: any }) {
  return (
    <PDFDownloadLink
      document={<InvoicePDF transaction={transaction} />}
      fileName={`invoice-${transaction.id}.pdf`}
    >
      {({ loading }) =>
        loading ? (
          <button className="bg-gray-400 text-white px-4 py-2 rounded" disabled>
            Loading PDF...
          </button>
        ) : (
          <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
            Download PDF
          </button>
        )
      }
    </PDFDownloadLink>
  );
}
