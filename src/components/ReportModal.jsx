import React, { useState, useEffect } from 'react';
import { X, Flag, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { submitReport } from '../services/api';

export default function ReportModal({ isOpen, onClose, initialIdentifier = '', initialCategory = '' }) {
  const [identifier, setIdentifier] = useState(initialIdentifier || '');
  const [category, setCategory] = useState(initialCategory || 'Suspected Counterfeit ISI Mark');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');
  const [loading, setLoading] = useState(false);
  const [submittedReport, setSubmittedReport] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (initialIdentifier) setIdentifier(initialIdentifier);
    if (initialCategory) setCategory(initialCategory);
    setSubmittedReport(null);
    setErrorMessage('');
  }, [initialIdentifier, initialCategory, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!identifier.trim() || !description.trim()) {
      setErrorMessage('Please fill in both the product/license identifier and description.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const res = await submitReport({
        identifier: identifier.trim(),
        category,
        description: description.trim(),
        contact: contact.trim()
      });

      if (res && res.status === 'SUCCESS') {
        setSubmittedReport(res);
      } else {
        setErrorMessage(res?.message || 'Submission failed. Please try again.');
      }
    } catch (err) {
      setErrorMessage('Failed to connect to the reporting server. Please check your network.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-modal border border-neutral-200 animate-in zoom-in-95 text-left overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center">
              <Flag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900">
                Report Non-Compliant Product / Mark
              </h3>
              <p className="text-xs text-neutral-500">
                Log suspected fake ISI marks, illegal HUIDs, or substandard goods.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {submittedReport ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-neutral-900">Report Submitted Successfully</h4>
              <p className="text-xs text-neutral-600 max-w-sm mx-auto leading-relaxed">
                Your report has been logged in the prototype surveillance registry under tracking code:
              </p>
              <div className="inline-block bg-neutral-100 font-mono font-bold text-sm px-3 py-1 rounded-lg border border-neutral-300">
                {submittedReport.id}
              </div>
              <p className="text-[11px] text-neutral-400 pt-2">
                Reports are forwarded for administrative scrutiny as per BIS Act conformity assessment guidelines.
              </p>
              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {errorMessage && (
                <div className="p-3 bg-red-50 rounded-xl border border-red-200 text-red-700 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div>
                <label className="font-bold text-neutral-700 block mb-1">
                  Product / License Identifier <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. CM/L-8400192, HUID AK79B2, or Brand & Product name"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 font-medium text-neutral-900"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-neutral-700 block mb-1">
                  Violation Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 font-medium text-neutral-900"
                >
                  <option value="Suspected Counterfeit ISI Mark">Suspected Counterfeit ISI Mark</option>
                  <option value="Fake or Unregistered Gold HUID">Fake or Unregistered Gold HUID</option>
                  <option value="Substandard Quality / Safety Hazard">Substandard Quality / Safety Hazard</option>
                  <option value="Mandatory QCO Violation (Selling Unmarked Product)">Mandatory QCO Violation (Selling Unmarked Product)</option>
                  <option value="Misleading Certification Claims">Misleading Certification Claims</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-neutral-700 block mb-1">
                  Description of Violation <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide context: vendor name, retail shop / e-commerce link, batch number, or reason for suspicion..."
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 font-medium text-neutral-900"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-neutral-700 block mb-1">
                  Reporter Contact (Optional / Anonymous)
                </label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Email, phone number, or leave blank to report anonymously"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 font-medium text-neutral-900"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-xl font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-colors disabled:opacity-50 flex items-center gap-1.5 shadow-xs"
                >
                  {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Submit Violation Report</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
