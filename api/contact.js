// Kontaktní formulář (náhrada za contact.php z hostingu Wedos).
// Posílá přes SMTP schránky info@jmlmont.eu, údaje jsou v env proměnných na Vercelu:
// SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS (+ volitelně MAIL_TO).
import nodemailer from "nodemailer";

const json = (status, data) => Response.json(data, { status });

export async function POST(request) {
  let form;
  try {
    form = await request.formData();
  } catch {
    return json(400, { status: "invalid", message: "Neplatný formulář." });
  }

  // 1) HONEYPOT (proti spamu)
  if (form.get("hp-check")) {
    return json(400, { status: "spam", message: "Spam detekován." });
  }

  // 2) VALIDACE VSTUPŮ (posíláme prostý text, takže stačí oříznout)
  const name = String(form.get("name") ?? "").trim().slice(0, 200);
  const email = String(form.get("email") ?? "").trim();
  const message = String(form.get("message") ?? "").trim().slice(0, 5000);

  if (!name || !message || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)) {
    return json(400, { status: "invalid", message: "Prosím vyplňte správně všechna pole." });
  }

  // 3) ODESLÁNÍ EMAILU
  const { SMTP_HOST, SMTP_PORT = "465", SMTP_USER, SMTP_PASS, MAIL_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("[contact] chybí SMTP_HOST / SMTP_USER / SMTP_PASS");
    return json(500, { status: "error", message: "Chyba na serveru při odesílání e-mailu." });
  }

  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    await transport.sendMail({
      from: `JML Web <${SMTP_USER}>`,
      to: MAIL_TO || "info@jmlmont.eu",
      replyTo: email,
      subject: "Nova zprava z webu JML mont",
      text: `Jméno: ${name}\nE-mail: ${email}\n\nZpráva:\n${message}\n`,
    });
    return json(200, { status: "success" });
  } catch (err) {
    console.error("[contact] odeslání selhalo:", err);
    return json(500, { status: "error", message: "Chyba na serveru při odesílání e-mailu." });
  }
}
