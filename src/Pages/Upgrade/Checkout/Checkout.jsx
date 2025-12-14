import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { CheckCircle, Loader2 } from "lucide-react";

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  const [paymentInfo, setPaymentInfo] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/checkout-success/${sessionId}`)
        .then((res) => {
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => setLoading(false));
    }
  }, [axiosSecure, sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-black to-gray-900 px-5">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl bg-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/10"
      >
        {/* Title */}
        <div className="text-center mb-6">
          {loading ? (
            <Loader2 className="w-14 h-14 text-purple-400 mx-auto animate-spin" />
          ) : (
            <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto" />
          )}

          <h1 className="text-4xl font-bold text-white mt-4">
            {loading ? "Verifying Payment..." : "Payment Successful!"}
          </h1>
          <p className="text-gray-300 mt-2">
            Thank you for upgrading to{" "}
            <span className="text-purple-400">Premium</span>
          </p>
        </div>

        {/* Payment Details */}
        {!loading && paymentInfo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-black/30 p-6 rounded-2xl border border-white/10"
          >
            <p className="text-lg text-gray-300 mb-2">Your details:</p>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-400">Transaction ID</p>
                <p className="text-xl text-white font-semibold">
                  {paymentInfo.transactionId}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-400">Tracking ID</p>
                <p className="text-xl text-purple-300 font-semibold">
                  {paymentInfo.trackingId}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Bottom button */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-8"
          >
            <a
              href="/dashboard/user"
              className="inline-block px-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition text-white text-lg font-medium shadow-lg shadow-purple-600/30"
            >
              Go to Dashboard
            </a>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Checkout;
