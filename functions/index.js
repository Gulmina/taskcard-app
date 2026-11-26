
const { setGlobalOptions } = require("firebase-functions");
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const { Resend } = require("resend");

setGlobalOptions({ maxInstances: 10 });

const resendApiKey = defineSecret("RESEND_API_KEY");

exports.submitFeedback = onCall(
  {
    secrets: [resendApiKey],
  },
  async (request) => {
    // Only signed-in, email-verified teachers can send feedback.
    if (
      !request.auth ||
      request.auth.token.email_verified !== true
    ) {
      throw new HttpsError(
        "unauthenticated",
        "Please sign in with a verified teacher account."
      );
    }

    const { name, email, category, message } = request.data || {};

    // Validate the feedback message.
    if (
      typeof message !== "string" ||
      !message.trim() ||
      message.length > 5000
    ) {
      throw new HttpsError(
        "invalid-argument",
        "Please enter a message of up to 5000 characters."
      );
    }

    if (
      typeof category !== "string" ||
      !category.trim() ||
      category.length > 100
    ) {
      throw new HttpsError(
        "invalid-argument",
        "Please select a feedback category."
      );
    }

    const senderEmail =
      typeof email === "string" && email.trim()
        ? email.trim()
        : request.auth.token.email;

    if (
      typeof senderEmail !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail)
    ) {
      throw new HttpsError(
        "invalid-argument",
        "Please enter a valid email address."
      );
    }

    const senderName =
      typeof name === "string" && name.trim()
        ? name.trim().slice(0, 100)
        : "TaskCard teacher";

    try {
      const resend = new Resend(resendApiKey.value());

      const result = await resend.emails.send({
        from: "TaskCard Feedback <onboarding@resend.dev>",
        to: ["gulminaayaz@hotmail.com"],
        replyTo: senderEmail,
        subject: `[TaskCard Feedback] ${category.trim().slice(0, 100)}`,
        text: `
New feedback received through TaskCard.

From: ${senderName}
Email: ${senderEmail}
Category: ${category.trim()}

Message:
${message.trim()}
        `,
      });

      if (result.error) {
        console.error("Resend error:", result.error);
        throw new Error("Email delivery failed.");
      }

      return {
        success: true,
        message: "Your feedback has been sent successfully.",
      };
    } catch (error) {
      console.error("Feedback email error:", error);

      throw new HttpsError(
        "internal",
        "We could not send your feedback. Please try again later."
      );
    }
  }
);
