import { corsair } from "../../integrations/corsair";

function createRawEmail(
  to: string,
  subject: string,
  body: string
) {
  const email = [
    `To: ${to}`,
    "Content-Type: text/plain; charset=utf-8",
    `Subject: ${subject}`,
    "",
    body,
  ].join("\r\n");

  return Buffer.from(email)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}


export async function sendEmail({
  to,
  subject,
  body,
}: {
  to: string;
  subject: string;
  body: string;
}) {
  try {
    const raw = createRawEmail(
      to,
      subject,
      body
    );

    const result = await corsair
      .withTenant("integration")
      .gmail.api.messages.send({
        raw,
      });

    console.log("Email sent successfully!");

    return {
      success: true,
      id: result.id,
      threadId: result.threadId,
      snippet: result.snippet,
    };

  } catch (error) {
    console.error("Failed to send email:", error);

    return {
      success: false,
      error: String(error),
    };
  }
}

// sendEmail({
//   to: "YOUR_TEST_EMAIL@gmail.com",
//   subject: "Testing Corsair AI Agent",
//   body: "Hello! This email was sent by my AI Gmail agent.",
// });