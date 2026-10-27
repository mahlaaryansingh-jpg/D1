import { useState } from "react";
import { Link } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";
import "./Pricing.css";

function Pricing() {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleUpgradeRequest(event) {
    event.preventDefault();
    setMessage("");
    const user = auth.currentUser;

    if (!user) {
      setMessage("Please log in before requesting an upgrade.");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "upgradeRequests"), {
        userId: user.uid,
        email: user.email || "",
        displayName: user.displayName || "",
        requestedPlan: "Paid",
        status: "pending",
        createdAt: serverTimestamp()
      });
      setShowModal(false);
      setMessage("Your upgrade request has been submitted. Your account remains on the Free plan until an upgrade is approved and any required payment is completed.");
    } catch (error) {
      console.error("Upgrade request failed:", error);
      setMessage("Could not submit your request. Please check your connection and Firestore rules, then try again.");
    } finally {
      setLoading(false);
    }
  }

  function openUpgradeModal() {
    setMessage("");
    if (!auth.currentUser) {
      setMessage("Please log in before requesting an upgrade.");
      return;
    }
    setShowModal(true);
  }

  return (
    <main className="pricing-page">
      <section className="pricing-hero">
        <span className="pricing-label">SIMPLE PRICING</span>
        <h1>Choose Your Plan</h1>
        <p>Find the right plan to learn, share ideas, and connect with the DEV@Deakin community.</p>
      </section>

      <section className="pricing-plans">
        <article className="pricing-card">
          <div className="plan-icon" aria-hidden="true">🌱</div>
          <h2>Free Plan</h2>
          <p className="plan-description">A great place to start your journey.</p>
          <div className="plan-price"><span className="price">$0</span><span className="price-period">/ forever</span></div>
          <ul className="plan-features">
            <li>✓ Browse articles and tutorials</li>
            <li>✓ Explore developer content</li>
            <li>✓ Learn new skills</li>
            <li>✓ Join the community</li>
          </ul>
          <button className="plan-button free-button" type="button" disabled>Free plan</button>
        </article>

        <article className="pricing-card featured-plan">
          <span className="popular-badge">RECOMMENDED</span>
          <div className="plan-icon" aria-hidden="true">🚀</div>
          <h2>Paid Plan</h2>
          <p className="plan-description">Get more from your developer journey.</p>
          <div className="plan-price"><span className="price">Paid</span><span className="price-period">plan</span></div>
          <ul className="plan-features">
            <li>✓ Everything in the Free Plan</li>
            <li>✓ Additional member features</li>
            <li>✓ Enhanced learning experience</li>
            <li>✓ More ways to engage</li>
          </ul>
          <button className="plan-button upgrade-button" type="button" onClick={openUpgradeModal}>Request Upgrade</button>
        </article>
      </section>

      {message && <p className="pricing-message" role="status">{message}</p>}
      <p className="pricing-note">Have questions? Contact the DEV@Deakin community for help.</p>

      {showModal && (
        <div className="upgrade-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget && !loading) setShowModal(false); }}>
          <section className="upgrade-modal" role="dialog" aria-modal="true" aria-labelledby="upgrade-title">
            <button className="modal-close" type="button" aria-label="Close upgrade request" onClick={() => setShowModal(false)} disabled={loading}>×</button>
            <h2 id="upgrade-title">Request the Paid Plan</h2>
            <p>Submit a request for your account. This demo does not process payments or activate a paid subscription automatically.</p>
            <p className="signed-in-email">Signed in as: {auth.currentUser?.email}</p>
            <form onSubmit={handleUpgradeRequest}>
              <button className="plan-button upgrade-button" type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit Upgrade Request"}</button>
              <button className="modal-cancel" type="button" onClick={() => setShowModal(false)} disabled={loading}>Cancel</button>
            </form>
            {!auth.currentUser && <p>Please <Link to="/login">log in</Link> first.</p>}
          </section>
        </div>
      )}
    </main>
  );
}

export default Pricing;
