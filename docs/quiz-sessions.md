# Kiosk quiz sessions on Vercel

Quiz requests must not depend on process-local maps: separate functions, cold starts and redeployments can lose them. Start issues an AES-256-GCM encrypted, authenticated HttpOnly cookie; submit and recovery rebuild the attempt from that cookie and the server question bank. Scores and answer keys are never trusted from the browser. One challenge is active per browser cookie jar. Starting another challenge replaces it.

Set QUIZ_SESSION_SECRET to a random secret of at least 32 characters in each environment. Never commit it. Sessions expire two hours after creation. QR result tokens contain no visitor identity or contact details, expire after 30 days, and can be verified by any instance with the same secret. Rotating the secret invalidates existing sessions and QR links. Older in-memory attempts require a new challenge after this deployment.

This is a stateless educational quiz, not a durable analytics or prize-redemption ledger. It does not prevent deliberate replay of older valid cookies, and individual QR tokens cannot be revoked without shared storage. Visitor registration/email records retain their existing in-memory limitation. A shared database remains necessary for durable registration, analytics, strict replay protection, or individual revocation.

Functions run in Mumbai via vercel.json to reduce travel time from the Kerala kiosk. Browser quiz requests have a 12-second deadline with explicit retry feedback. QR generation is loaded only for results.

Run `node --test tests/quiz-session.test.cjs` to check recovery across fresh server instances, scoring, duplicate requests, QR verification, and token validation.
