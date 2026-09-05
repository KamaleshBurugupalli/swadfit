import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cancelSubscriptionAPI } from '../services/api';

export default function CancelSubscription() {
  const navigate = useNavigate();
  const [reason, setReason] = useState('Moving out of Hyderabad');
  const [refundSummary, setRefundSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCancel = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await cancelSubscriptionAPI('SUB-77291', { reason });
      if (res.data?.data?.refundSummary) {
        setRefundSummary(res.data.data.refundSummary);
      } else {
        navigate('/dashboard/subscription');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-10 px-4">
      <div className="bg-surface-container-lowest border border-surface-container p-8 rounded-3xl shadow-soft space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-error-container text-on-error-container flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-2xl">cancel</span>
          </div>
          <h1 className="font-display font-bold text-2xl text-on-surface">Cancel Subscription</h1>
          <p className="text-xs text-outline">
            Server-side calculation of unused eligible days & net refund amount.
          </p>
        </div>

        {refundSummary ? (
          <div className="space-y-4">
            <div className="p-4 bg-tertiary-fixed/40 border border-tertiary-fixed rounded-2xl text-xs space-y-2">
              <h3 className="font-bold text-sm text-on-tertiary-fixed">Subscription Cancelled</h3>
              <div className="flex justify-between"><span>Unused Eligible Days:</span><span className="font-bold">{refundSummary.unusedDays} Days</span></div>
              <div className="flex justify-between"><span>Gross Value:</span><span className="font-bold">₹{refundSummary.grossRefund}</span></div>
              <div className="flex justify-between"><span>Processing Fee (10%):</span><span className="font-bold">-₹{refundSummary.processingFee}</span></div>
              <div className="flex justify-between border-t border-tertiary-fixed pt-1 font-bold text-sm text-primary">
                <span>Net Refund:</span>
                <span>₹{refundSummary.netRefundAmount}</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full py-3.5 px-4 bg-primary text-white font-bold text-xs rounded-full"
            >
              Return to Dashboard
            </button>
          </div>
        ) : (
          <form onSubmit={handleCancel} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-outline block mb-1">Reason for Cancellation</label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full p-3 rounded-xl border border-surface-container bg-surface text-sm text-on-surface"
              >
                <option value="Moving out of Hyderabad">Moving out of Hyderabad</option>
                <option value="Achieved macro goal">Achieved macro goal</option>
                <option value="Want to try individual meals">Want to try individual meals</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-error hover:bg-error-container text-white font-display font-bold text-sm rounded-full shadow-md transition-colors"
            >
              {loading ? 'Calculating Refund...' : 'Calculate Refund & Confirm Cancel'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
