'use client';

import { useRef, useState } from 'react';
import { DocumentFormValues } from '@/src/lib/schemas';
import { CalculationEngine, LineItemResult } from '@/src/services/CalculationEngine';
import { Button } from '@/src/components/ui';
import { Download, Printer, Loader2 } from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export const DocumentPreview = ({ data, items }: { data: DocumentFormValues, items: LineItemResult[] }) => {
  const summary = CalculationEngine.calculateDocumentSummary(items);
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    if (!invoiceRef.current) return;
    setIsDownloading(true);
    try {
      // Temporarily hide UI elements not meant for PDF (already handled by no-print or we can just capture the ref)
      const canvas = await html2canvas(invoiceRef.current, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${data.documentNumber || 'document'}.pdf`);
    } catch (error) {
      console.error('Failed to generate PDF', error);
      alert('Failed to generate PDF. Please try again or use the Print option.');
    } finally {
      setIsDownloading(false);
    }
  };
  
  return (
    <div>
      <div className="flex justify-end gap-3 mb-6 no-print">
        <Button variant="outline" className="gap-2" onClick={handlePrint} disabled={isDownloading}>
          <Printer className="w-4 h-4" /> Print
        </Button>
        <Button variant="primary" className="gap-2 bg-blue-600 hover:bg-blue-700 text-white" onClick={handleDownloadPDF} disabled={isDownloading}>
          {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />} 
          {isDownloading ? 'Generating...' : 'Download PDF'}
        </Button>
      </div>

      <div ref={invoiceRef} className="invoice-a4 flex flex-col relative text-black bg-white rounded-md p-10 shadow-2xl overflow-hidden min-h-[1122px] w-[794px] mx-auto scale-[0.8] md:scale-100 origin-top">
        {/* SaaS Watermark for Free Tier */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 -rotate-12 opacity-[0.03] pointer-events-none select-none">
          <p className="text-8xl font-black whitespace-nowrap uppercase">CREATED WITH EASE ME UP</p>
        </div>

        {/* Header */}
        <div className="flex justify-between items-start mb-12 relative z-10">
          <div>
            {data.sellerLogo ? (
              <img src={data.sellerLogo} alt="Logo" className="max-h-20 mb-4 object-contain" />
            ) : null}
            <h1 className="text-4xl font-light text-neutral-800 tracking-tight">
              {data.documentType === 'RECEIPT' ? 'RECEIPT' : data.documentType === 'PROPOSAL' ? 'PROPOSAL' : data.documentType === 'QUOTATION' ? 'QUOTATION' : 'INVOICE'}
            </h1>
            <p className="text-neutral-500 mt-1 font-mono">{data.documentNumber}</p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold">{data.sellerName || 'Your Business Name'}</h2>
            <p className="text-neutral-500 whitespace-pre-line mt-1">{data.sellerAddress}</p>
            {data.sellerTaxId && <p className="text-neutral-500 mt-1">Tax ID: {data.sellerTaxId}</p>}
            {data.businessNumber && <p className="text-neutral-500">Reg No: {data.businessNumber}</p>}
          </div>
        </div>

        {/* Meta & Client */}
        <div className="flex justify-between mb-12 border-t border-b border-neutral-100 py-6 relative z-10">
          <div>
            <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-2">Billed To</h3>
            <p className="font-bold text-lg">{data.buyerName || 'Client Name'}</p>
            <p className="text-neutral-600 whitespace-pre-line">{data.buyerAddress}</p>
            {data.buyerTaxId && <p className="text-neutral-600 mt-1">Tax ID: {data.buyerTaxId}</p>}
          </div>
          <div className="text-right">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-1">Date of Issue</h3>
              <p className="font-medium">{new Date(data.issueDate).toLocaleDateString()}</p>
            </div>
            {data.dueDate && (
              <div>
                <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-1">Due Date</h3>
                <p className="font-medium">{new Date(data.dueDate).toLocaleDateString()}</p>
              </div>
            )}
          </div>
        </div>

        {/* Optional Project Logic (Scope, Introduction, Timeline) */}
        {(data.documentType === 'PROPOSAL' || data.documentType === 'QUOTATION') && (
          <div className="mb-10 space-y-8 relative z-10">
            {data.introduction && (
              <div className="text-neutral-700 whitespace-pre-wrap leading-relaxed border-l-4 border-blue-600 pl-4 py-1">
                {data.introduction}
              </div>
            )}
            
            {(data.scopeOfWork || data.projectTimeline) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 pt-6 border-t border-neutral-100">
                {data.scopeOfWork && (
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-3">Scope of Work</h3>
                    <p className="text-neutral-600 whitespace-pre-wrap text-sm leading-relaxed">{data.scopeOfWork}</p>
                  </div>
                )}
                {data.projectTimeline && (
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-3">Project Timeline</h3>
                    <p className="text-neutral-600 whitespace-pre-wrap text-sm leading-relaxed">{data.projectTimeline}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Items Table */}
        <div className="mb-12 flex-1 relative z-10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-neutral-800 text-sm">
                <th className="py-3 font-semibold text-neutral-600">Description</th>
                <th className="py-3 font-semibold text-neutral-600 text-right">Qty</th>
                <th className="py-3 font-semibold text-neutral-600 text-right">Price</th>
                <th className="py-3 font-semibold text-neutral-600 text-right">Tax</th>
                <th className="py-3 font-semibold text-neutral-600 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={idx} className="border-b border-neutral-100">
                  <td className="py-4">
                    <p className="font-medium text-neutral-900">{item.name}</p>
                    {item.description && <p className="text-sm text-neutral-500 mt-1">{item.description}</p>}
                  </td>
                  <td className="py-4 text-right text-neutral-700">{item.quantity}</td>
                  <td className="py-4 text-right text-neutral-700">{CalculationEngine.formatCurrency(item.unitPrice, data.currency)}</td>
                  <td className="py-4 text-right text-neutral-700">{item.taxRate}%</td>
                  <td className="py-4 text-right font-medium text-neutral-900">{CalculationEngine.formatCurrency(item.netTotal, data.currency)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals & Notes */}
        <div className="flex justify-between items-end mt-auto pt-8 border-t border-neutral-800 relative z-10">
          <div className="max-w-md pr-8">
            {data.termsAndConditions && (
              <div className="mb-6">
                <h4 className="text-sm font-bold text-neutral-900">Terms & Conditions</h4>
                <p className="text-xs text-neutral-600 mt-2 whitespace-pre-wrap leading-relaxed">{data.termsAndConditions}</p>
              </div>
            )}
            {data.paymentTerms && (
              <div className="mb-4">
                <h4 className="text-sm font-bold text-neutral-900">Payment Terms</h4>
                <p className="text-sm text-neutral-600 mt-1">{data.paymentTerms}</p>
              </div>
            )}
            {data.notes && (
              <div>
                <h4 className="text-sm font-bold text-neutral-900">Notes</h4>
                <p className="text-sm text-neutral-600 mt-1">{data.notes}</p>
              </div>
            )}
            {data.documentType !== 'PROPOSAL' && (data.bankDetails || data.upiDetails) && (
              <div className="mt-4 pt-4 border-t border-neutral-200">
                <h4 className="text-sm font-bold text-neutral-900">Payment Link / Bank Details</h4>
                {data.bankDetails && <p className="text-xs text-neutral-600 mt-1 whitespace-pre-line">{data.bankDetails}</p>}
                {data.upiDetails && <p className="text-xs text-neutral-600 mt-1">UPI: {data.upiDetails}</p>}
              </div>
            )}
            {data.sellerSignature && (
              <div className="mt-8">
                <img src={data.sellerSignature} alt="Signature" className="h-16 object-contain" />
                <div className="w-48 border-t border-neutral-300 mt-2 text-xs text-neutral-400 pt-1">Authorized Signature</div>
              </div>
            )}
          </div>
          <div className="w-80 p-6 bg-neutral-50 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <span className="text-neutral-600">Subtotal</span>
              <span className="font-medium">{CalculationEngine.formatCurrency(summary.subTotal, data.currency)}</span>
            </div>
            {summary.discountTotal > 0 && (
              <div className="flex justify-between items-center mb-3 text-emerald-600">
                <span>Discount</span>
                <span>-{CalculationEngine.formatCurrency(summary.discountTotal, data.currency)}</span>
              </div>
            )}
            <div className="flex justify-between items-center mb-3">
              <span className="text-neutral-600">Tax</span>
              <span className="font-medium">{CalculationEngine.formatCurrency(summary.taxTotal, data.currency)}</span>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-neutral-200">
              <span className="text-lg font-bold text-neutral-900">Total</span>
              <span className="text-xl font-bold text-blue-600">{CalculationEngine.formatCurrency(summary.grandTotal, data.currency)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
