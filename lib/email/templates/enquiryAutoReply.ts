export function enquiryAutoReply({ name }: { name: string }) {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1B4332;">Thank you, ${name}!</h2>
      <p>We've received your enquiry and will get back to you within 24 hours.</p>
      <p>If your matter is urgent, feel free to call us directly.</p>
      <br/>
      <p>— Shri Shyam Bhog Team</p>
    </div>
  `;
}