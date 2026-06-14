import { corsair } from "../corsair";

export async function getEmails() {
  try {
    const emailList = await corsair
      .withTenant("integration")
      .gmail.api.messages.list({});

    const messages = emailList.messages?.slice(0, 5) || [];

    const emails = await Promise.all(
      messages.map(async (message) => {
        const email = await corsair
          .withTenant("integration")
          .gmail.api.messages.get({
            id: message.id,
          });

        const headers = email.payload?.headers || [];

        const getHeader = (name: string) =>
          headers.find((h) => h.name === name)?.value || "";

        return {
          id: email.id,
          from: getHeader("From"),
          subject: getHeader("Subject"),
          date: getHeader("Date"),
          snippet: email.snippet,
          labels: email.labelIds,
        };
      })
    );

    console.log("Latest emails:");
    console.log(JSON.stringify(emails, null, 2));

    return emails;
  } catch (error) {
    console.error("Failed to fetch emails:", error);
    return [];
  }
}

