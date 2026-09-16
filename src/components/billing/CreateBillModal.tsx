import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  CreditCard, 
  Receipt, 
  DollarSign, 
  Printer, 
  CheckCircle2, 
  QrCode,
  Sparkles,
  Search
} from 'lucide-react';
import { DENTAL_TREATMENTS, BillingInvoice } from '../../types';
import { HospitalDentalReceiptModal } from './HospitalDentalReceiptModal';

export const CreateBillModal: React.FC = () => {
  const { 
    isCreateBillModalOpen, 
    closeCreateBillModal, 
    billModalPrefill, 
    patients, 
    doctors, 
    createBill,
    showToast 
  } = useApp();

  const [patientSearch, setPatientSearch] = useState<string>('');
  const [patientId, setPatientId] = useState<string>('P-1001');
  const [treatment, setTreatment] = useState<string>('Tooth Filing (Composite Posterior)');
  const [doctorName, setDoctorName] = useState<string>('Dr. Sarah Johnson');
  const [cost, setCost] = useState<number>(1500);
  const [discount, setDiscount] = useState<number>(0);
  const [taxPercent, setTaxPercent] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'UPI' | 'Card' | 'Other'>('UPI');
  const [paymentStatus, setPaymentStatus] = useState<'Paid' | 'Partial' | 'Pending'>('Paid');
  const [customPaidAmount, setCustomPaidAmount] = useState<number>(1500);
  const [createdInvoiceForReceipt, setCreatedInvoiceForReceipt] = useState<BillingInvoice | null>(null);

  useEffect(() => {
    if (billModalPrefill) {
      if (billModalPrefill.patientId) setPatientId(billModalPrefill.patientId);
      if (billModalPrefill.treatment) setTreatment(billModalPrefill.treatment);
      if (billModalPrefill.doctorName) setDoctorName(billModalPrefill.doctorName);
    }
  }, [billModalPrefill]);

  if (!isCreateBillModalOpen) return null;

  const filteredPatients = patients.filter(p => {
    if (!patientSearch.trim()) return true;
    const q = patientSearch.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.phone.includes(q);
  });

  const currentPatient = patients.find(p => p.id === patientId) || patients[0];
  const subtotal = cost;
  const discountAmount = discount;
  const taxable = Math.max(0, subtotal - discountAmount);
  const taxAmount = Math.round((taxable * taxPercent) / 100);
  const grandTotal = taxable + taxAmount;

  const initialPaid = 
    paymentStatus === 'Paid' ? grandTotal : 
    paymentStatus === 'Partial' ? Math.min(grandTotal, customPaidAmount) : 0;
  const pendingAmount = Math.max(0, grandTotal - initialPaid);

  const handleSelectTreatmentPreset = (tName: string, tPrice: number) => {
    setTreatment(tName);
    setCost(tPrice);
    if (paymentStatus === 'Paid') {
      setCustomPaidAmount(tPrice);
    }
  };

  const handleSave = (shouldPrint = false) => {
    const inv = createBill({
      patientId: currentPatient.id,
      patientName: currentPatient.name,
      treatment,
      date: 'Sep 13, 2026',
      subtotal,
      discount: discountAmount,
      tax: taxAmount,
      total: grandTotal,
      paid: initialPaid,
      pending: pendingAmount,
      paymentMethod: (paymentStatus === 'Pending' ? 'Pending' : paymentMethod === 'Card' ? 'Credit Card' : 'UPI / Cash') as any,
      items: [
        {
          code: 'D2391',
          description: treatment,
          quantity: 1,
          unitPrice: cost,
          total: cost
        }
      ]
    });

    if (shouldPrint) {
      setCreatedInvoiceForReceipt(inv);
    } else {
      closeCreateBillModal();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-sky-100 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/20">
              <Receipt className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight">Generate Dental Bill</h2>
              <p className="text-xs text-emerald-100">Standard clinic pricing & counter receipts (Section 14)</p>
            </div>
          </div>
          <button
            onClick={closeCreateBillModal}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Patient and Doctor */}
          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1 uppercase tracking-wider">
                Select Patient
              </label>
              <div className="space-y-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search patient by name or phone..."
                    value={patientSearch}
                    onChange={e => setPatientSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-sky-400"
                  />
                </div>
                <select
                  value={patientId}
                  onChange={e => setPatientId(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-sky-500 font-bold"
                >
                  {filteredPatients.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.phone})</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1 uppercase tracking-wider">
                Attending Doctor
              </label>
              <select
                value={doctorName}
                onChange={e => setDoctorName(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-sky-500 font-bold"
              >
                {doctors.map(d => (
                  <option key={d.id} value={d.name}>{d.name} ({d.specialty})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Treatment Preset Selection with default prices */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Standard Dental Treatment
              </label>
              <span className="text-[11px] text-sky-600 font-bold">Auto-fills standard clinic fee</span>
            </div>

            <select
              value={treatment}
              onChange={e => {
                const found = DENTAL_TREATMENTS.find(t => t.name === e.target.value);
                if (found) {
                  handleSelectTreatmentPreset(found.name, found.defaultPrice);
                } else {
                  setTreatment(e.target.value);
                }
              }}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-sky-500 font-bold text-slate-800"
            >
              {DENTAL_TREATMENTS.map(t => (
                <option key={t.name} value={t.name}>
                  {t.name} — ₹{t.defaultPrice.toLocaleString()} ({t.specialty})
                </option>
              ))}
            </select>

            {/* Quick treatment pills */}
            <div className="flex items-center gap-1.5 flex-wrap mt-2">
              {DENTAL_TREATMENTS.slice(0, 5).map(t => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => handleSelectTreatmentPreset(t.name, t.defaultPrice)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all ${
                    treatment === t.name
                      ? 'bg-sky-50 text-sky-700 border-sky-300'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {t.name} (₹{t.defaultPrice.toLocaleString()})
                </button>
              ))}
            </div>
          </div>

          {/* Pricing Math */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Cost (₹)</label>
              <input
                type="number"
                value={cost}
                onChange={e => setCost(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-sm font-bold bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Discount (₹)</label>
              <input
                type="number"
                value={discount}
                onChange={e => setDiscount(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-sm font-bold bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Tax (GST %)</label>
              <input
                type="number"
                value={taxPercent}
                onChange={e => setTaxPercent(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-sm font-bold bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 font-mono"
              />
            </div>
          </div>

          {/* Grand Total Highlight */}
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider block">
                Total Invoice Payable
              </span>
              <span className="text-[11px] text-emerald-600">
                Subtotal ₹{subtotal} {discount > 0 && `- Disc ₹${discount}`} {taxAmount > 0 && `+ Tax ₹${taxAmount}`}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono">
              ₹{grandTotal.toLocaleString()}
            </div>
          </div>

          {/* Payment Status & Collection */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Payment Status
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  setPaymentStatus('Paid');
                  setCustomPaidAmount(grandTotal);
                }}
                className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
                  paymentStatus === 'Paid'
                    ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                ✓ Paid in Full
              </button>
              <button
                type="button"
                onClick={() => {
                  setPaymentStatus('Partial');
                  if (customPaidAmount === grandTotal || customPaidAmount === 0) {
                    setCustomPaidAmount(Math.round(grandTotal / 2));
                  }
                }}
                className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
                  paymentStatus === 'Partial'
                    ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                ◐ Partial Payment
              </button>
              <button
                type="button"
                onClick={() => setPaymentStatus('Pending')}
                className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
                  paymentStatus === 'Pending'
                    ? 'bg-rose-500 text-white border-rose-600 shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                ✕ Pending (Unpaid)
              </button>
            </div>

            {paymentStatus === 'Partial' && (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between gap-3 text-xs">
                <span className="font-bold text-amber-900">Amount Paid Now (₹):</span>
                <input
                  type="number"
                  value={customPaidAmount}
                  onChange={e => setCustomPaidAmount(Number(e.target.value))}
                  className="w-32 px-3 py-1 bg-white font-bold border border-amber-300 rounded-lg text-amber-950 font-mono text-sm"
                />
                <span className="text-amber-800 text-[11px] font-semibold">
                  Due: ₹{pendingAmount.toLocaleString()}
                </span>
              </div>
            )}

            {paymentStatus !== 'Pending' && (
              <div>
                <span className="text-xs font-bold text-slate-600 block mb-1.5">Payment Method:</span>
                <div className="grid grid-cols-3 gap-2">
                  {(['UPI', 'Cash', 'Card'] as const).map(method => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`py-1.5 px-3 text-xs font-bold rounded-xl border transition-all ${
                        paymentMethod === method
                          ? 'bg-sky-500 text-white border-sky-600 shadow-xs'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={closeCreateBillModal}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-xl"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => handleSave(true)}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold text-xs rounded-xl shadow-xs transition-all"
            >
              <Printer className="w-4 h-4 text-sky-600" />
              <span>Save & Print</span>
            </button>

            <button
              type="button"
              onClick={() => handleSave(false)}
              className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-emerald-600/30 transition-all active:scale-98"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{paymentStatus === 'Paid' ? 'Collect & Save Bill' : paymentStatus === 'Partial' ? 'Collect Partial & Save' : 'Save as Pending'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Official Printable Hospital Receipt */}
      {createdInvoiceForReceipt && (
        <HospitalDentalReceiptModal
          invoice={createdInvoiceForReceipt}
          onClose={() => {
            setCreatedInvoiceForReceipt(null);
            closeCreateBillModal();
          }}
          patient={currentPatient}
        />
      )}
    </div>
  );
};
