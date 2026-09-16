import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BillingInvoice } from '../../types';
import { 
  CreditCard, 
  Receipt, 
  Plus, 
  Search, 
  Printer, 
  CheckCircle2, 
  AlertCircle, 
  DollarSign, 
  QrCode, 
  FileText,
  X,
  Sparkles,
  PhoneCall,
  Send,
  Eye
} from 'lucide-react';
import { ActionMenu } from '../common/ActionMenu';
import { HospitalDentalReceiptModal } from './HospitalDentalReceiptModal';

export const ReceptionistBillingScreen: React.FC = () => {
  const { 
    invoices, 
    collectPayment, 
    openCreateBillModal, 
    startCall,
    setSelectedPatientId,
    setCurrentNav,
    showToast 
  } = useApp();

  const [filterStatus, setFilterStatus] = useState<'all' | 'Unpaid' | 'Partially Paid' | 'Paid'>('all');
  const [search, setSearch] = useState<string>('');
  const [activeCollectInvoice, setActiveCollectInvoice] = useState<BillingInvoice | null>(null);
  const [collectAmount, setCollectAmount] = useState<number>(0);
  const [collectMethod, setCollectMethod] = useState<BillingInvoice['paymentMethod']>('UPI / Cash');
  const [printInvoice, setPrintInvoice] = useState<BillingInvoice | null>(null);

  const totalInvoiced = invoices.reduce((sum, i) => sum + i.total, 0);
  const totalPaid = invoices.reduce((sum, i) => sum + i.paid, 0);
  const totalPending = invoices.reduce((sum, i) => sum + i.pending, 0);

  const filteredInvoices = invoices.filter(inv => {
    if (filterStatus !== 'all' && inv.status !== filterStatus) return false;
    if (search) {
      const q = search.toLowerCase();
      const matchInv = inv.invoiceNumber.toLowerCase().includes(q);
      const matchName = inv.patientName.toLowerCase().includes(q);
      const matchTreatment = inv.treatment.toLowerCase().includes(q);
      if (!matchInv && !matchName && !matchTreatment) return false;
    }
    return true;
  });

  const handleOpenCollect = (inv: BillingInvoice) => {
    setActiveCollectInvoice(inv);
    setCollectAmount(inv.pending);
    setCollectMethod('UPI / Cash');
  };

  const handleProcessCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCollectInvoice) return;
    collectPayment(activeCollectInvoice.id, collectAmount, collectMethod);
    setActiveCollectInvoice(null);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header (Section 13) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-sky-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200">
              Section 13 & 14 • Billing & Payments
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Front Desk Billing & Invoices
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Collect counter payments, generate itemized tax bills, track pending clinic balances, and print receipts.
          </p>
        </div>

        <button
          onClick={() => openCreateBillModal()}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/25 transition-all active:scale-98 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create Bill</span>
        </button>
      </div>

      {/* Financial Overview KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-3xl border border-sky-100 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Billed</span>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 font-mono">
            ₹{totalInvoiced.toLocaleString()}
          </div>
          <span className="text-xs text-sky-600 font-semibold">{invoices.length} invoices generated</span>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-emerald-100 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Collected</span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1 font-mono">
            ₹{totalPaid.toLocaleString()}
          </div>
          <span className="text-xs text-emerald-600 font-semibold">Cash, UPI & Cards cleared</span>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-rose-100 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Pending Dues</span>
          <div className="text-2xl sm:text-3xl font-black text-rose-600 mt-1 font-mono">
            ₹{totalPending.toLocaleString()}
          </div>
          <span className="text-xs text-rose-600 font-semibold">{invoices.filter(i => i.pending > 0).length} bills awaiting payment</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-sky-100 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search invoice #, patient name, treatment..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold">
          {(['all', 'Unpaid', 'Partially Paid', 'Paid'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setFilterStatus(tab)}
              className={`px-3 py-1.5 rounded-lg transition-all capitalize ${
                filterStatus === tab ? 'bg-white text-sky-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              {tab === 'all' ? `All (${invoices.length})` : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Invoices List Table (Section 13 Fields) */}
      <div className="bg-white rounded-3xl border border-sky-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-sky-50/50 border-b border-sky-100 text-[11px] font-black text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-6">Invoice #</th>
                <th className="py-3.5 px-4">Patient</th>
                <th className="py-3.5 px-4">Treatment</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Total</th>
                <th className="py-3.5 px-4">Paid</th>
                <th className="py-3.5 px-4">Pending</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredInvoices.map(inv => (
                <tr key={inv.id} className="hover:bg-sky-50/40 transition-colors">
                  <td className="py-3.5 px-6 font-mono font-black text-sky-800">
                    {inv.invoiceNumber}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {inv.patientName}
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">
                    {inv.treatment}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {inv.date}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-black text-slate-900">
                    ₹{inv.total.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-600">
                    ₹{inv.paid.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-rose-600">
                    ₹{inv.pending.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      inv.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' :
                      inv.status === 'Partially Paid' ? 'bg-amber-100 text-amber-800' :
                      'bg-rose-100 text-rose-800'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  {/* Action Column: Single Contextual Primary Action + ActionMenu (...) */}
                  <td className="py-3.5 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {inv.pending > 0 ? (
                        <button
                          onClick={() => handleOpenCollect(inv)}
                          className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
                        >
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>Collect</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => setPrintInvoice(inv)}
                          className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Receipt</span>
                        </button>
                      )}

                      <ActionMenu
                        buttonTitle={`Billing actions for ${inv.invoiceNumber}`}
                        items={[
                          {
                            label: 'Print / View Invoice',
                            icon: Printer,
                            onClick: () => setPrintInvoice(inv)
                          },
                          {
                            label: 'Call Patient',
                            icon: PhoneCall,
                            onClick: () => startCall({
                              name: inv.patientName,
                              phone: '+91 98201 44521',
                              treatment: inv.treatment,
                              patientId: inv.patientId
                            })
                          },
                          ...(inv.pending > 0 ? [{
                            label: 'Send Due Reminder',
                            icon: Send,
                            onClick: () => showToast(`Payment due reminder sent to ${inv.patientName} for ₹${inv.pending.toLocaleString()}`, 'success')
                          }] : []),
                          {
                            label: 'View Patient File',
                            icon: Eye,
                            divider: true,
                            onClick: () => {
                              setSelectedPatientId(inv.patientId);
                              setCurrentNav('patients');
                            }
                          }
                        ]}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Collect Payment Modal */}
      {activeCollectInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-sky-100 overflow-hidden">
            <div className="bg-gradient-to-r from-sky-600 to-cyan-600 p-6 text-white flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black tracking-tight">Collect Counter Payment</h3>
                <p className="text-xs text-sky-100">{activeCollectInvoice.invoiceNumber} • {activeCollectInvoice.patientName}</p>
              </div>
              <button
                onClick={() => setActiveCollectInvoice(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleProcessCollection} className="p-6 space-y-4">
              <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 flex items-center justify-between">
                <span className="text-xs font-bold text-rose-800">Remaining Balance:</span>
                <span className="text-2xl font-black text-rose-700 font-mono">₹{activeCollectInvoice.pending.toLocaleString()}</span>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1 uppercase tracking-wider">
                  Amount to Collect (₹)
                </label>
                <input
                  type="number"
                  max={activeCollectInvoice.pending}
                  min={1}
                  value={collectAmount}
                  onChange={e => setCollectAmount(Number(e.target.value))}
                  className="w-full px-3.5 py-2 text-base font-bold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-sky-500 font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1 uppercase tracking-wider">
                  Payment Mode
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['UPI / Cash', 'Credit Card', 'Debit Card', 'Insurance'] as const).map(m => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setCollectMethod(m)}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                        collectMethod === m
                          ? 'bg-sky-500 text-white border-sky-600 shadow-xs'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveCollectInvoice(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-98"
                >
                  Confirm Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Official Hospital & Dental Clinic Receipt Print Modal matching Seema Dental College Reference */}
      {printInvoice && (
        <HospitalDentalReceiptModal
          invoice={printInvoice}
          onClose={() => setPrintInvoice(null)}
        />
      )}
    </div>
  );
};
