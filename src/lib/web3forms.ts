const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEBSITE_DOMAIN = "https://o3xs.com/";

export type Web3FormsSubmitOptions = {
  subject: string;
  form_type: string;
  source_page: string;
  fields: Record<string, string | undefined>;
  botcheck?: string;
};

export type Web3FormsResult =
  | { ok: true }
  | { ok: false; message: string };

/** Convert FormData to a plain object (excludes honeypot). */
export function formDataToFields(formData: FormData): Record<string, string> {
  const fields: Record<string, string> = {};
  formData.forEach((value, key) => {
    if (key === "botcheck") return;
    if (typeof value === "string" && value.trim() !== "") {
      fields[key] = value;
    }
  });
  return fields;
}

export async function submitToWeb3Forms(
  options: Web3FormsSubmitOptions,
): Promise<Web3FormsResult> {
  if (options.botcheck?.trim()) {
    return { ok: true };
  }

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    return {
      ok: false,
      message:
        "Form is not configured. Please email contact@o3xs.com directly.",
    };
  }

  const fields = options.fields;
  const submitterEmail = fields.email;

  const payload: Record<string, string> = {
    access_key: accessKey,
    subject: options.subject,
    form_type: options.form_type,
    source_page: options.source_page,
    website_domain: WEBSITE_DOMAIN,
    submitted_at: new Date().toISOString(),
  };

  if (fields.name) {
    payload.from_name = fields.name;
  }

  if (submitterEmail) {
    payload.email = submitterEmail;
  }

  for (const [key, value] of Object.entries(fields)) {
    if (value !== undefined) {
      payload[key] = value;
    }
  }

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = (await response.json()) as {
      success?: boolean;
      message?: string;
    };

    if (response.ok && data.success) {
      return { ok: true };
    }

    return {
      ok: false,
      message:
        data.message ??
        "Something went wrong. Please try again or email contact@o3xs.com.",
    };
  } catch {
    return {
      ok: false,
      message: "Network error. Please check your connection and try again.",
    };
  }
}
