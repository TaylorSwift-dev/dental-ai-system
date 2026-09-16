import React, { useRef } from 'react';
import { BillingInvoice, Patient } from '../../types';
import { Printer, X, Download, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface HospitalDentalReceiptModalProps {
  invoice: BillingInvoice;
  onClose: () => void;
  patient?: Patient;
}

// Crisp Vector Barcode Generator
const BarcodeGraphic: React.FC<{ code: string }> = ({ code }) => {
  // Deterministic bar widths based on char codes
  const bars = [];
  let x = 0;
  for (let i = 0; i < code.length; i++) {
    const val = code.charCodeAt(i) % 4;
    const w1 = val === 0 ? 1.5 : val === 1 ? 2.5 : val === 2 ? 1 : 3;
    const w2 = 1.5;
    bars.push(<rect key={`b-${i}-1`} x={x} y="0" width={w1} height="40" fill="#111827" />);
    x += w1 + 1.5;
    bars.push(<rect key={`b-${i}-2`} x={x} y="0" width={w2} height="40" fill="#111827" />);
    x += w2 + 2;
  }
  return (
    <div className="flex flex-col items-center">
      <svg width={Math.max(160, x)} height="42" className="overflow-visible">
        {bars}
      </svg>
      <span className="text-[11px] font-mono tracking-wider text-slate-800 font-semibold mt-0.5">
        {code}
      </span>
    </div>
  );
};

export const HospitalDentalReceiptModal: React.FC<HospitalDentalReceiptModalProps> = ({
  invoice,
  onClose,
  patient: propPatient
}) => {
  const { patients } = useApp();
  const receiptRef = useRef<HTMLDivElement>(null);

  const patient = propPatient || patients.find(p => p.id === invoice.patientId || p.name === invoice.patientName);

  // Format dates e.g. 13/09/2026
  const todayStr = '13/09/2026';
  const printTimeStr = '02:38pm';
  const staffName = 'Ajay Dhanger';

  // Numeric amounts formatted with two decimals
  const grossAmt = invoice.subtotal || invoice.total;
  const discAmt = invoice.discount || 0;
  const netAmt = invoice.total;
  const paidAmt = invoice.paid;
  const balanceAmt = invoice.pending;

  const handlePrint = () => {
    window.print();
  };

  const invoiceNumberClean = invoice.invoiceNumber.replace(/[^0-9]/g, '') || '2023021370076';
  const crNumber = `202302${invoice.patientId.replace(/[^0-9]/g, '') || '12937'}`;
  const receiptNo = `202302${invoiceNumberClean.slice(-5) || '1350079'}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
      {/* Container */}
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-300 my-6 overflow-hidden flex flex-col">
        
        {/* Modal Action Bar (Hidden on print) */}
        <div className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between print:hidden shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="text-xs font-bold tracking-wide uppercase text-slate-200">
              Official Hospital Tax Receipt
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black rounded-xl text-xs shadow-md transition-all active:scale-95"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Document</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Paper Sheet */}
        <div 
          ref={receiptRef}
          className="p-8 sm:p-12 text-slate-900 bg-white font-sans text-xs leading-relaxed select-text overflow-x-auto print:p-0 print:m-0 print:text-black"
          id="hospital-print-receipt"
        >
          {/* 1. Header with Circular Seal & Institution Details */}
          <div className="flex items-start justify-between gap-4 border-b border-slate-900/80 pb-3">
            {/* Logo Crest */}
            <div className="w-20 h-20 rounded-full border-2 border-slate-800 p-1 flex items-center justify-center shrink-0 shadow-2xs">
              <div className="w-full h-full rounded-full border border-slate-700 flex flex-col items-center justify-center text-center p-1">
                <svg className="w-6 h-6 fill-slate-800" viewBox="0 0 24 24">
                  <path d="M12 2C9.5 2 7.8 3.5 7.4 5.3C6.7 8.3 7 12 7.5 15.5C8 19 9.5 22 10.5 22C11.5 22 11.5 19.5 12 19.5C12.5 19.5 12.5 22 13.5 22C14.5 22 16 19 16.5 15.5C17 12 17.3 8.3 16.6 5.3C16.2 3.5 14.5 2 12 2Z" />
                </svg>
                <span className="text-[6px] font-black uppercase tracking-tighter leading-none mt-0.5">
                  SEEMA DENTAL
                </span>
                <span className="text-[5px] font-bold uppercase tracking-tighter text-slate-600">
                  RISHIKESH
                </span>
              </div>
            </div>

            {/* Hospital Centered Name & Address */}
            <div className="flex-1 text-center px-2">
              <h1 className="text-base sm:text-lg font-black text-slate-950 uppercase tracking-tight font-serif">
                Seema Dental College and Hospital
              </h1>
              <p className="text-[11px] text-slate-700 font-medium mt-0.5">
                Virbhadra Road, Post Office: Pashulok, Rishikesh,
              </p>
              <p className="text-[11px] text-slate-700 font-medium">
                Uttarakhand, Tel - 0135-2453465, 2453725
              </p>
              <p className="text-[11px] text-slate-700 font-medium">
                Website: <span className="underline">www.seemadentalcollege.org</span>
              </p>
            </div>

            {/* Empty balance spacer matching reference */}
            <div className="w-16 shrink-0 hidden sm:block"></div>
          </div>

          {/* Printed On Meta Line */}
          <div className="text-right text-[10px] text-slate-600 font-mono py-1 border-b border-slate-300">
            Printed On : {todayStr} {printTimeStr} By : {staffName}
          </div>

          {/* 2. Title & Barcode Header */}
          <div className="flex items-center justify-between my-3">
            {/* Boxed Original Receipt */}
            <div className="border border-slate-900 px-3 py-1 text-[11px] font-bold text-slate-900 uppercase">
              Original Receipt
            </div>

            {/* Receipt Detail Centered Title */}
            <h2 className="text-sm font-black text-slate-900 tracking-wide uppercase">
              Receipt Detail
            </h2>

            {/* Barcode Graphic on Right */}
            <div className="shrink-0">
              <BarcodeGraphic code={invoiceNumberClean} />
            </div>
          </div>

          {/* 3. Patient & Invoice Demographics Grid (Two Column) */}
          <div className="grid grid-cols-12 gap-y-1 gap-x-4 border-t border-b border-slate-900/80 py-2 my-2 text-[11px]">
            {/* Left Col: Invoice #, Patient Name, Father, CR Number, Address */}
            <div className="col-span-8 space-y-1">
              <div className="grid grid-cols-4">
                <span className="font-semibold text-slate-700">Invoice Number</span>
                <span className="col-span-3 font-mono font-bold text-slate-950">: {invoiceNumberClean}</span>
              </div>
              <div className="grid grid-cols-4">
                <span className="font-semibold text-slate-700">Patient Name</span>
                <span className="col-span-3 font-bold text-slate-950">: {invoice.patientName}</span>
              </div>
              <div className="grid grid-cols-4">
                <span className="font-semibold text-slate-700">Father</span>
                <span className="col-span-3 text-slate-800">: —</span>
              </div>
              <div className="grid grid-cols-4">
                <span className="font-semibold text-slate-700">CR Number</span>
                <span className="col-span-3 font-mono font-semibold text-slate-950">: {crNumber}</span>
              </div>
              <div className="grid grid-cols-4">
                <span className="font-semibold text-slate-700">Address</span>
                <span className="col-span-3 text-slate-800">: Tapovan, Rishikesh, Dehradun, Uttarakhand, India</span>
              </div>
            </div>

            {/* Right Col: Sex/Age */}
            <div className="col-span-4 space-y-1 text-right sm:text-left">
              <div className="grid grid-cols-3">
                <span className="font-semibold text-slate-700">Sex/Age</span>
                <span className="col-span-2 font-semibold text-slate-950">: {patient?.gender?.[0] || 'F'} / {patient?.age || 51} yrs</span>
              </div>
            </div>
          </div>

          {/* 4. Billable Services Table */}
          <div className="mt-4">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="border-t border-b border-slate-900 text-slate-950 font-bold">
                  <th className="py-1.5 px-2 w-24">Date</th>
                  <th className="py-1.5 px-2">Particulars</th>
                  <th className="py-1.5 px-2 text-right">Rate (Rs.)</th>
                  <th className="py-1.5 px-2 text-center w-12">Unit</th>
                  <th className="py-1.5 px-2 text-right">Gross Amt (Rs)</th>
                  <th className="py-1.5 px-2 text-right">Disc Amt (Rs)</th>
                  <th className="py-1.5 px-2 text-right">Net Amt (Rs)</th>
                </tr>
              </thead>
              <tbody>
                {/* Section Subheading */}
                <tr>
                  <td colSpan={7} className="pt-2 pb-1 px-2 font-black text-slate-950 underline italic">
                    Billable Services
                  </td>
                </tr>

                {/* Items */}
                {invoice.items && invoice.items.length > 0 ? (
                  invoice.items.map((item, idx) => (
                    <tr key={idx} className="align-top font-medium">
                      <td className="py-1 px-2 font-mono text-slate-700">{todayStr}</td>
                      <td className="py-1 px-2 font-mono text-slate-900">
                        {item.code || `${invoiceNumberClean.slice(-6)}-${item.description.slice(0, 3).toUpperCase()}`} {item.description}
                      </td>
                      <td className="py-1 px-2 text-right font-mono">{item.unitPrice.toFixed(2)}</td>
                      <td className="py-1 px-2 text-center font-mono">{item.quantity}</td>
                      <td className="py-1 px-2 text-right font-mono">{item.total.toFixed(2)}</td>
                      <td className="py-1 px-2 text-right font-mono">0.00</td>
                      <td className="py-1 px-2 text-right font-mono">{item.total.toFixed(2)}</td>
                    </tr>
                  ))
                ) : (
                  <tr className="align-top font-medium">
                    <td className="py-1 px-2 font-mono text-slate-700">{todayStr}</td>
                    <td className="py-1 px-2 font-mono text-slate-900">
                      {invoiceNumberClean.slice(-6)}-{invoice.treatment}
                    </td>
                    <td className="py-1 px-2 text-right font-mono">{grossAmt.toFixed(2)}</td>
                    <td className="py-1 px-2 text-center font-mono">1</td>
                    <td className="py-1 px-2 text-right font-mono">{grossAmt.toFixed(2)}</td>
                    <td className="py-1 px-2 text-right font-mono">{discAmt.toFixed(2)}</td>
                    <td className="py-1 px-2 text-right font-mono">{netAmt.toFixed(2)}</td>
                  </tr>
                )}

                {/* Subtotal Row Under Table */}
                <tr className="border-t border-slate-300 font-bold font-mono">
                  <td colSpan={4} className="py-1"></td>
                  <td className="py-1 px-2 text-right">{grossAmt.toFixed(2)}</td>
                  <td className="py-1 px-2 text-right">{discAmt.toFixed(2)}</td>
                  <td className="py-1 px-2 text-right">{netAmt.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>

            {/* Financial Summary Block (Right Aligned) */}
            <div className="flex justify-end mt-2">
              <div className="w-64 space-y-0.5 text-[11px] font-semibold">
                <div className="flex justify-between">
                  <span className="font-bold text-slate-900">Total Bill Amount</span>
                  <span className="font-mono font-bold text-slate-950">{grossAmt.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-900">Total Discount</span>
                  <span className="font-mono font-bold text-slate-950">{discAmt.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-900">Net Bill Amount</span>
                  <span className="font-mono font-bold text-slate-950">{netAmt.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-900">Balance Amount</span>
                  <span className="font-mono font-bold text-slate-950">{balanceAmt.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 5. Payment Detail Section */}
          <div className="mt-5 border-t border-slate-900/80 pt-2">
            <h3 className="text-center text-xs font-black text-slate-900 uppercase tracking-wide mb-1.5">
              Payment Detail
            </h3>

            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="border-t border-b border-slate-900 text-slate-950 font-bold">
                  <th className="py-1.5 px-2">Date</th>
                  <th className="py-1.5 px-2">Receipt No.</th>
                  <th className="py-1.5 px-2">Mode</th>
                  <th className="py-1.5 px-2">Type</th>
                  <th className="py-1.5 px-2">Status:</th>
                  <th className="py-1.5 px-2">Settled</th>
                  <th className="py-1.5 px-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="font-medium font-mono">
                  <td className="py-1 px-2">{todayStr}</td>
                  <td className="py-1 px-2 font-bold">{receiptNo}</td>
                  <td className="py-1 px-2">{invoice.paymentMethod === 'Credit Card' ? 'Card' : invoice.paymentMethod?.includes('UPI') ? 'UPI' : 'Cash'}</td>
                  <td className="py-1 px-2">Receive</td>
                  <td className="py-1 px-2">Received</td>
                  <td className="py-1 px-2">{paidAmt > 0 ? 'Yes' : 'No'}</td>
                  <td className="py-1 px-2 text-right font-bold">{paidAmt.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>

            {/* Payment Summary Block */}
            <div className="flex justify-end mt-2">
              <div className="w-64 space-y-0.5 text-[11px] font-semibold">
                <div className="flex justify-between">
                  <span className="font-bold text-slate-900">Total Received Amount</span>
                  <span className="font-mono font-bold text-slate-950">{paidAmt.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-900">Total Refunded Amount(-)</span>
                  <span className="font-mono font-bold text-slate-950">0.00</span>
                </div>
                <div className="flex justify-between border-t border-slate-400 pt-0.5">
                  <span className="font-bold text-slate-900">Net Payment</span>
                  <span className="font-mono font-bold text-slate-950">{paidAmt.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 6. Signatures */}
          <div className="flex items-end justify-between pt-12 mt-6">
            <div>
              <span className="text-[11px] font-bold text-slate-900 block">Prepared By</span>
              <span className="text-[10px] text-slate-600 block mt-0.5">Front Desk Counter Staff</span>
            </div>

            <div className="text-right">
              <span className="text-[11px] font-bold text-slate-950 block">{staffName}</span>
              <div className="border-t border-slate-900 mt-1 pt-0.5 w-40 inline-block">
                <span className="text-[11px] font-black text-slate-900 block">Authorized Signatory</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Controls (Hidden on print) */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between print:hidden shrink-0">
          <span className="text-xs text-slate-500">
            Form is formatted strictly for official A4 laser & thermal receipt printing.
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-xl"
            >
              Close
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-98"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Receipt Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
