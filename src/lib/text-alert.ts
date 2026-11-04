/**
 * Texts Emily through Twilio. Does nothing until these are set in Vercel:
 * TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM, and ALERT_PHONE, with both
 * phone numbers in +13175551234 format. Best-effort: the email alert is the
 * record, so a failed text is logged and never fails the caller.
 */
export async function sendTextAlert(body: string): Promise<void> {
  const sid = process.env.TWILIO_ACCOUNT_SID
  const token = process.env.TWILIO_AUTH_TOKEN
  const from = process.env.TWILIO_FROM
  const to = process.env.ALERT_PHONE
  if (!sid || !token || !from || !to) return

  try {
    const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ From: from, To: to, Body: body }).toString(),
    })
    if (!res.ok) console.error(`Text alert failed: ${res.status}`)
  } catch {
    console.error('Text alert failed to send')
  }
}
