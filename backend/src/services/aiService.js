const client = require("./groqService");
const knowledgeBase = require("./knowledgeBase");

const analyzeTicket = async ({ subject, description, author, book }) => {
  try {
    const prompt = `
${knowledgeBase}

Analyze this support ticket.

Return ONLY valid JSON.

{
  "category": "",
  "priority": "",
  "draftResponse": ""
}

Allowed categories:
ROYALTY_PAYMENTS
ISBN_METADATA
PRINTING_QUALITY
DISTRIBUTION
BOOK_STATUS
GENERAL

Allowed priorities:
CRITICAL
HIGH
MEDIUM
LOW

Author:
${author?.name || ""}

Book:
${book?.title || "General inquiry"}

Subject:
${subject}

Description:
${description}
`;

        const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3
    });

    const text = response.choices[0].message.content;

    return JSON.parse(text);

  } catch (error) {
    console.error("Groq Error:", error.message);

    const text = `${subject} ${description}`.toLowerCase();

    let category = "GENERAL";
    let priority = "LOW";

    if (
      text.includes("royalty") ||
      text.includes("payment") ||
      text.includes("payout")
    ) {
      category = "ROYALTY_PAYMENTS";
      priority = "HIGH";
    }

    else if (
      text.includes("isbn") ||
      text.includes("metadata")
    ) {
      category = "ISBN_METADATA";
      priority = "HIGH";
    }

    else if (
      text.includes("print") ||
      text.includes("damaged") ||
      text.includes("quality")
    ) {
      category = "PRINTING_QUALITY";
      priority = "HIGH";
    }

    else if (
      text.includes("distribution") ||
      text.includes("amazon") ||
      text.includes("flipkart")
    ) {
      category = "DISTRIBUTION";
      priority = "MEDIUM";
    }

    else if (
      text.includes("published") ||
      text.includes("status")
    ) {
      category = "BOOK_STATUS";
      priority = "MEDIUM";
    }

    return {
      category,
      priority,
      draftResponse:
        "We have received your request and our support team will review it shortly."
    };
  }
};

const regenerateDraft = async ({ ticket, author, book }) => {
  try {
    const prompt = `
${knowledgeBase}

Draft a professional BookLeaf support response.

Return ONLY the response text.

Ticket:
${ticket.subject}

Description:
${ticket.description}

Author:
${author.name}

Book:
${book ? book.title : "General inquiry"}
`;

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.5
    });

    return response.choices[0].message.content;

  } catch (error) {
    console.error("Groq Error:", error.message);

  return "AI unavailable. Please draft manually.";
}
};

module.exports = {
  analyzeTicket,
  regenerateDraft
};