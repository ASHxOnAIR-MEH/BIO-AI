// Bound waits on weak kiosk connections; retries remain an explicit visitor action.
export async function quizFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(input, { ...init, cache: "no-store", signal: controller.signal });
    // Consume the body within the timeout too, rather than waiting forever for JSON.
    const body = await response.text();
    return new Response(body, { status: response.status, statusText: response.statusText, headers: response.headers });
  } catch (error) {
    if (controller.signal.aborted) throw new Error("The connection is taking too long. Please try again.");
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
