import React from "react";

const ReportPopUp = ({ showReport, setShowReport, reportReason, setReportReason, reportMutation }) => {
  return (
    <div>
      {showReport && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#0f172a] p-6 rounded-2xl w-full max-w-sm border border-white/20">
            <h3 className="text-lg font-semibold mb-3">Report Lesson</h3>

            <select
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              className="w-full bg-black/40 p-2 rounded-lg text-white mb-4"
            >
              <option value="">Select reason</option>
              <option>Inappropriate Content</option>
              <option>Hate Speech or Harassment</option>
              <option>Misleading or False Information</option>
              <option>Spam or Promotional Content</option>
              <option>Sensitive or Disturbing Content</option>
              <option>Other</option>
            </select>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowReport(false)}
                className="btn btn-sm btn-outline"
              >
                Cancel
              </button>

              <button
                disabled={!reportReason}
                onClick={() => reportMutation.mutate()}
                className="btn btn-sm btn-error"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportPopUp;
