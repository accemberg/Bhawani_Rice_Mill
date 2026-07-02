export function careersAutoReply({ name, role }: { name: string; role: string }) {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1B4332;">Thank you for applying, ${name}!</h2>
      <p>We've received your application for the <strong>${role}</strong> position.</p>
      <p>Our team will review your resume and get back to you within 3-5 business days.</p>
      <br/>
      <p>— Shri Shyam Bhog HR Team</p>
    </div>
  `;
}