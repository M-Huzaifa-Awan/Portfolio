type SubmitResult = { success?: boolean; error?: string };

/** Validate locally, then deliver from the browser as Web3Forms requires. */
export async function submitForm(body: Record<string, unknown>): Promise<SubmitResult> {
  try {
    const validation = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(20_000),
    });
    const prepared = (await validation.json()) as SubmitResult & {
      delivery?: Record<string, string>;
    };
    if (!validation.ok) {
      return { error: prepared.error ?? "Couldn't verify this submission. Please try again." };
    }
    // Honeypot submissions intentionally stop without contacting the provider.
    if (prepared.success === true) return { success: true };
    if (!prepared.delivery?.access_key) return { error: "Form delivery isn't configured." };

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(prepared.delivery),
      signal: AbortSignal.timeout(20_000),
    });
    const result = (await response.json()) as { success?: boolean };
    if (response.ok && result.success === true) return { success: true };
    return { error: "The delivery service didn't accept your message. Please try again or use email." };
  } catch {
    return { error: "We couldn't confirm delivery. Please try again or use email." };
  }
}
