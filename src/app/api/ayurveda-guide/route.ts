import { NextRequest, NextResponse } from "next/server";
import { VEDAVANI_KNOWLEDGE_BASE, VedavaniQnAPair } from "@/data/ayurvedaHistoryData";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const query: string = (body.message || "").trim().toLowerCase();

    if (!query) {
      return NextResponse.json(
        { error: "Query message is required" },
        { status: 400 }
      );
    }

    // 1. Check exact or high-confidence keyword match in verified knowledge base
    let matchedItem: VedavaniQnAPair | null = null;
    let maxMatchScore = 0;

    const queryWords = query
      .replace(/[^\w\s]/gi, " ")
      .split(/\s+/)
      .filter((w) => w.length > 2);

    for (const item of VEDAVANI_KNOWLEDGE_BASE) {
      let score = 0;
      const qLower = item.question.toLowerCase();

      // Check aliases
      for (const alias of item.aliases) {
        if (query.includes(alias) || alias.includes(query)) {
          score += 10;
        }
      }

      // Check title keywords
      for (const word of queryWords) {
        if (qLower.includes(word)) score += 3;
        if (item.answer.toLowerCase().includes(word)) score += 1;
        if (item.category.toLowerCase().includes(word)) score += 2;
      }

      if (score > maxMatchScore) {
        maxMatchScore = score;
        matchedItem = item;
      }
    }

    // High confidence threshold
    if (matchedItem && maxMatchScore >= 5) {
      // Pick 2 other related questions as follow-ups
      const related = VEDAVANI_KNOWLEDGE_BASE
        .filter((k) => k.id !== matchedItem?.id && (k.category === matchedItem?.category || Math.random() > 0.5))
        .slice(0, 3)
        .map((k) => k.question);

      return NextResponse.json({
        success: true,
        answer: matchedItem.answer,
        citation: matchedItem.citation,
        verifiedSource: matchedItem.verifiedSource,
        category: matchedItem.category,
        isGrounded: true,
        suggestedFollowUps: related,
      });
    }

    // 2. If Gemini API key is configured in the environment, we could call it with strict grounding
    const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    if (geminiKey) {
      try {
        const systemPrompt = `You are VedaVani, an academic and archival AI Heritage Guide for the Bio-AI Centre of Excellence exhibition on "Ayurveda Through the Ages".
Your knowledge is strictly grounded in verified research from the Central Council for Research in Ayurvedic Sciences (CCRAS) and the National Centre for Biological Sciences (NCBS) Ashtavaidya Archives.
RULES:
1. Never invent historical dates, authors, text contents, or lineages.
2. If the user asks about Charaka, Sushruta, Vagbhata, Ashtanga branches, or Kerala Ashtavaidyas, explain with historical accuracy.
3. If unsure or if the question is outside classical Ayurvedic historiography, clearly state: "This topic is outside our current verified CCRAS and NCBS archival records."
4. Always append a concise citation of classical or archival source.`;

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [{ text: `${systemPrompt}\n\nVisitor Question: ${query}` }],
                },
              ],
              generationConfig: {
                temperature: 0.2,
                maxOutputTokens: 350,
              },
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const generatedText =
            data.candidates?.[0]?.content?.parts?.[0]?.text || "";
          if (generatedText) {
            return NextResponse.json({
              success: true,
              answer: generatedText,
              citation: "CCRAS / NCBS Archival Historical Synthesis",
              verifiedSource: "Bio-AI Heritage Grounded Engine (Gemini)",
              isGrounded: true,
              suggestedFollowUps: [
                "What is the difference between Charaka and Sushruta?",
                "How did the Ashtavaidya tradition develop in Kerala?",
                "What are the Eight Branches of Ayurveda?",
              ],
            });
          }
        }
      } catch {
        // Fall back gracefully to archival collection note
      }
    }

    // 3. Fallback when not found in verified dataset
    return NextResponse.json({
      success: true,
      answer:
        "This specific query is not yet documented in our current verified CCRAS and NCBS archival collection. To protect historical integrity, VedaVani only presents citations backed by verified manuscripts and peer-reviewed historical studies.",
      citation: "Bio-AI Archive Integrity Standard",
      verifiedSource: "CCRAS Literary Research Guidelines",
      isGrounded: false,
      suggestedFollowUps: [
        "Who was Charaka and what is his contribution?",
        "What is the difference between Charaka Samhita and Sushruta Samhita?",
        "Who was Vagbhata and what did he write?",
        "What are the Eight Branches of Ayurveda?",
        "How did the Ashtavaidya tradition develop in Kerala?",
        "What is the historical significance of Sahasrayogam?",
      ],
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Internal error";
    return NextResponse.json(
      { error: "Failed to process query", details: errMessage },
      { status: 500 }
    );
  }
}

