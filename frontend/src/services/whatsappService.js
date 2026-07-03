/**
 * WhatsApp Lead Alert Notification Service
 *
 * Opens WhatsApp with the lead details pre-filled via wa.me link.
 * User just taps "Send" — message is ready to go.
 */

const TARGET_NUMBER = '919921968968'; // +91 9921968968

/**
 * Formats the lead data into a clean, left-aligned WhatsApp message matching exact screenshot:
 * 
 * NEW LEAD - ADVAIT DIGITAL
 * Name: Vaibhav Mhamane
 * Mobile: 9022687887
 * Email: mhamanevaibhav15@gmail.com
 * Service: WhatsApp Marketing Services
 */
function buildLeadMessage({ name, phone, email, service }) {
  return (
    `NEW LEAD - ADVAIT DIGITAL\n` +
    `Name: ${name}\n` +
    `Mobile: ${phone}\n` +
    `Email: ${email || 'Not provided'}\n` +
    `Service: ${service}`
  );
}

/**
 * Opens WhatsApp (App or Web) with the lead alert pre-filled to +91 9921968968.
 * Guarantees redirection by falling back to location.href if popup is blocked.
 */
export const sendWhatsAppLeadAlert = (leadData) => {
  try {
    const message = buildLeadMessage(leadData);
    const waUrl = `https://wa.me/${TARGET_NUMBER}?text=${encodeURIComponent(message)}`;
    
    // Try opening in new window/tab first
    const newWin = window.open(waUrl, '_blank');

    // If browser popup blocker blocked window.open, fallback to direct redirect
    if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
      window.location.href = waUrl;
    }
    console.log('[WhatsApp] Lead alert redirected for:', leadData.name);
  } catch (err) {
    console.warn('[WhatsApp] Could not redirect to wa.me link:', err.message);
  }
};
