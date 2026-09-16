import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CreditCard, 
  Download, 
  Send, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Printer, 
  ShieldCheck, 
  X,
  IndianRupee
} from 'lucide-react';
import { BillingInvoice } from '../../types';

export const BillingScreen: React.FC = () => {
  const { invoices, showToast } = useApp();
  const [selectedInvoice, setSelectedInvoice] = useState<BillingInvoice>(invoices[0]);
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);

  const handleDownloadInvoice = () => {
    showToast(`Invoice ${selectedInvoice.invoiceNumber} downloaded as digital PDF`, 'success');
  };

  const handleSendInvoice = () => {
    showToast(`Invoice ${selectedInvoice.invoiceNumber} sent to ${selectedInvoice.patientName} via SMS & WhatsApp payment link`, 'success');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200">
              Billing & Financial EHR
            </span>
            <span className="text-xs text-slate-400">SmileCare Accounts</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Clinic Billing & Invoices
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Clear itemized procedure codes, automated discounts, and instant patient invoice dispatch.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              setShowPreviewModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm shadow-teal-600/30 transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>Generate Invoice</span>
          </button>
        </div>
      </div>

      {/* Invoices List & Detailed Preview Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT 7 COLS: Invoice History Table */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-sm font-extrabold text-slate-900">
                Recent Invoices ({invoices.length})
              </h2>
              <span className="text-xs text-slate-400">Click to preview itemized breakdown</span>
            </div>

            <div className="divide-y divide-slate-100">
              {invoices.map((inv) => {
                const isSelected = selectedInvoice.id === inv.id;
                return (
                  <div
                    key={inv.id}
                    onClick={() => setSelectedInvoice(inv)}
                    className={`p-5 cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-teal-50/60 border-l-4 border-teal-600'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-teal-800 bg-teal-100/70 px-2 py-0.5 rounded">
                          {inv.invoiceNumber}
                        </span>
                        <h3 className="text-sm font-extrabold text-slate-900">
                          {inv.patientName}
                        </h3>
                      </div>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                        inv.status === 'Paid'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {inv.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 font-medium mb-2">
                      {inv.treatment}
                    </p>

                    <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                      <span>Date: {inv.date}</span>
                      <span>Method: <strong className="text-slate-700">{inv.paymentMethod}</strong></span>
                      <span>
                        Total: <strong className="text-slate-900 font-black">₹{inv.total.toLocaleString()}</strong>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT 5 COLS: Selected Invoice Preview Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-card space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Invoice Preview
                </h3>
                <span className="text-xs text-slate-400 font-mono">{selectedInvoice.invoiceNumber}</span>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                selectedInvoice.status === 'Paid'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}>
                {selectedInvoice.status}
              </span>
            </div>

            {/* Patient & Clinic details */}
            <div className="text-xs space-y-1 text-slate-600 bg-slate-50 p-3.5 rounded-2xl">
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold uppercase">Billed To:</span>
                <span className="font-bold text-slate-900">{selectedInvoice.patientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold uppercase">Date:</span>
                <span className="font-medium text-slate-700">{selectedInvoice.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold uppercase">Payment Mode:</span>
                <span className="font-semibold text-teal-800">{selectedInvoice.paymentMethod}</span>
              </div>
            </div>

            {/* Line items */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Itemized Dental Procedures
              </span>
              {selectedInvoice.items.map((item, idx) => (
                <div key={idx} className="p-2.5 bg-slate-50/70 rounded-xl text-xs flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-800">
                      <span className="font-mono text-teal-700 mr-1.5">{item.code}</span>
                      {item.description}
                    </div>
                    <div className="text-[11px] text-slate-400">Qty: {item.quantity} × ₹{item.unitPrice}</div>
                  </div>
                  <div className="font-black text-slate-900 text-sm">₹{item.total}</div>
                </div>
              ))}
            </div>

            {/* Financial calculations */}
            <div className="pt-3 border-t border-slate-200 space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-800">₹{selectedInvoice.subtotal}</span>
              </div>
              {selectedInvoice.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Courtesy Discount</span>
                  <span>-₹{selectedInvoice.discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Healthcare GST (5%)</span>
                <span>₹{selectedInvoice.tax}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Amount</span>
                <span>₹{selectedInvoice.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs text-teal-700 font-bold">
                <span>Paid to Date</span>
                <span>₹{selectedInvoice.paid.toLocaleString()}</span>
              </div>
              {selectedInvoice.pending > 0 && (
                <div className="flex justify-between text-xs text-amber-600 font-bold">
                  <span>Balance Due</span>
                  <span>₹{selectedInvoice.pending.toLocaleString()}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={handleDownloadInvoice}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>

              <button
                onClick={handleSendInvoice}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-sm shadow-teal-600/30 transition-all"
              >
                <Send className="w-4 h-4" />
                Send to Patient
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
