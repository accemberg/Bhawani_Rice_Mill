interface CareerData {
  name: string;
  email: string;
  phone: string;
  role: string;
  resumeUrl: string;
}

export function careersNotification({ name, email, phone, role, resumeUrl }: CareerData) {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1B4332;">New Job Application Received</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px; font-weight: bold;">Name:</td><td style="padding: 8px;">${name}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;">${email}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Phone:</td><td style="padding: 8px;">${phone}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Role Applied:</td><td style="padding: 8px;">${role}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Resume:</td>
        <td style="padding: 8px;">
          <a href="${resumeUrl}" style="color: #1B4332;">Download Resume</a>
        </td></tr>
      </table>
    </div>
  `;
}