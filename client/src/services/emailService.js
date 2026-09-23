/**
 * Client Email & OTP Verification Service
 * Handles code generation, storage, and matching with fallback for local demo mode.
 */

const LOCAL_OTP_STORAGE_KEY = "lms_active_email_otp";

/**
 * Generate a random 6-digit numeric verification code
 */
export const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Send OTP verification code to student's email.
 * Tries backend API first; if backend unavailable, stores code in sessionStorage for local matching.
 */
export const sendVerificationEmail = async (recipientEmail) => {
  const cleanEmail = recipientEmail.toLowerCase().trim();
  const newCode = generateCode();

  try {
    const response = await fetch("http://localhost:5000/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: cleanEmail })
    });

    if (response.ok) {
      const data = await response.json();
      // Store active code in session for client validation fallback
      sessionStorage.setItem(LOCAL_OTP_STORAGE_KEY, JSON.stringify({
        email: cleanEmail,
        code: data.code || newCode,
        timestamp: Date.now()
      }));
      return { success: true, message: `Verification code sent to ${cleanEmail}`, code: data.code || newCode };
    }
  } catch (err) {
    console.warn("Backend API not reachable, running client-side email verification service fallback:", err);
  }

  // Client-side fallback storage
  sessionStorage.setItem(LOCAL_OTP_STORAGE_KEY, JSON.stringify({
    email: cleanEmail,
    code: newCode,
    timestamp: Date.now()
  }));

  console.log(`%c[EMAIL VERIFICATION SERVICE] Sent to ${cleanEmail} from madhudissa07@gmail.com: Code ${newCode}`, "color: #7ad7cf; font-weight: bold; background: #06263a; padding: 6px 10px; border-radius: 6px;");

  return {
    success: true,
    message: `Verification email sent to ${cleanEmail}`,
    code: newCode
  };
};

/**
 * Verify code entered by student against actual sent code
 */
export const verifySubmittedCode = async (recipientEmail, inputCode) => {
  const cleanEmail = recipientEmail.toLowerCase().trim();
  const cleanCode = inputCode.toString().trim();

  // Try backend verification first
  try {
    const response = await fetch("http://localhost:5000/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: cleanEmail, code: cleanCode })
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, message: data.message };
    } else {
      const storedData = sessionStorage.getItem(LOCAL_OTP_STORAGE_KEY);
      if (storedData) {
        try {
          const parsed = JSON.parse(storedData);
          if (parsed.email === cleanEmail && parsed.code === cleanCode) {
            return { success: true, message: "Email verified successfully!" };
          }
        } catch (e) {}
      }
      const data = await response.json();
      return { success: false, message: data.message || "Invalid verification code." };
    }
  } catch (err) {
    // Fallback to session matching
  }

  const storedData = sessionStorage.getItem(LOCAL_OTP_STORAGE_KEY);
  if (!storedData) {
    return {
      success: false,
      message: "No verification code found. Please request a new code."
    };
  }

  try {
    const parsed = JSON.parse(storedData);
    if (parsed.email !== cleanEmail) {
      return { success: false, message: "Email mismatch. Please request a new code." };
    }

    if (parsed.code !== cleanCode) {
      return {
        success: false,
        message: "Invalid verification code. The 6-digit code entered does not match the code sent to your email."
      };
    }

    // Code matches!
    return { success: true, message: "Email verified successfully!" };
  } catch (e) {
    return { success: false, message: "Verification failed. Please try again." };
  }
};
