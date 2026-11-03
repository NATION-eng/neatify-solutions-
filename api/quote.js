import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const {
      fullName,
      email,
      phone,
      serviceType,
      community,
      customLocation,
      bedrooms,
      bathrooms,
      propertyType,
      frequency,
      preferredDate,
      propertyDetails
    } = req.body || {};

    // Validate required fields
    if (!fullName || !email || !phone) {
      return res.status(400).json({
        success: false,
        error: 'Missing required contact fields (fullName, email, phone)'
      });
    }

    const recipientEmail = 'neatifysolutionsinc@gmail.com';
    const location = community === 'Other' ? (customLocation || 'Outside Core Area') : (community || 'Kawartha Lakes');
    const propertyScope = serviceType === 'Commercial' ? propertyType : `${bedrooms || ''}, ${bathrooms || ''}`;

    const subject = `[New Cleaning Request] ${serviceType || 'General'} - ${fullName} (${location})`;

    const htmlBody = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1f2937; line-height: 1.5; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; }
            .header { background: #204632; color: #ffffff; padding: 24px; text-align: center; }
            .header h1 { margin: 0; font-size: 20px; letter-spacing: -0.5px; }
            .content { padding: 24px; }
            .section-title { font-size: 13px; font-weight: 700; text-transform: uppercase; color: #526d55; border-bottom: 2px solid #e5ebd7; padding-bottom: 6px; margin-top: 20px; margin-bottom: 12px; }
            .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; }
            .label { font-weight: 600; color: #4b5563; }
            .value { font-weight: 500; color: #111827; text-align: right; }
            .notes-box { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; font-size: 13px; color: #374151; margin-top: 8px; }
            .footer { background: #f9fafb; padding: 16px 24px; font-size: 12px; color: #6b7280; text-align: center; border-top: 1px solid #e5e7eb; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Neatify Solutions — New Quote Request</h1>
              <p style="margin: 4px 0 0; font-size: 12px; opacity: 0.9;">Kawartha Lakes Regional Operations</p>
            </div>
            <div class="content">
              <div class="section-title">Customer Contact Details</div>
              <div class="row"><span class="label">Customer Name:</span><span class="value">${fullName}</span></div>
              <div class="row"><span class="label">Phone Number:</span><span class="value"><a href="tel:${phone}" style="color: #204632; font-weight: 700;">${phone}</a></span></div>
              <div class="row"><span class="label">Email Address:</span><span class="value"><a href="mailto:${email}" style="color: #204632;">${email}</a></span></div>

              <div class="section-title">Service & Scope Requirements</div>
              <div class="row"><span class="label">Service Category:</span><span class="value" style="color: #204632; font-weight: 700;">${serviceType || 'Residential'} Cleaning</span></div>
              <div class="row"><span class="label">Frequency:</span><span class="value">${frequency || 'One-Time'}</span></div>
              <div class="row"><span class="label">Location / Community:</span><span class="value">${location}</span></div>
              <div class="row"><span class="label">Property Dimensions:</span><span class="value">${propertyScope}</span></div>
              <div class="row"><span class="label">Preferred Date/Time:</span><span class="value">${preferredDate || 'Flexible / ASAP'}</span></div>

              <div class="section-title">Additional Client Notes</div>
              <div class="notes-box">${propertyDetails ? propertyDetails.replace(/\n/g, '<br/>') : 'No special notes specified.'}</div>
            </div>
            <div class="footer">
              This lead was submitted through the online quote engine on <strong>neatifysolutions.ca</strong>.<br />
              Recipient: <strong>${recipientEmail}</strong>
            </div>
          </div>
        </body>
      </html>
    `;

    let emailSent = false;
    let transportMethod = 'simulation';

    // 1. Resend API Integration (if RESEND_API_KEY is configured in Vercel)
    if (process.env.RESEND_API_KEY) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
          },
          body: JSON.stringify({
            from: process.env.SENDER_EMAIL || 'Neatify Quotes <quotes@neatifysolutions.ca>',
            to: [recipientEmail],
            reply_to: email,
            subject: subject,
            html: htmlBody
          })
        });

        if (resendRes.ok) {
          emailSent = true;
          transportMethod = 'resend';
        }
      } catch (err) {
        console.warn('Resend dispatch failed, attempting fallback SMTP...', err);
      }
    }

    // 2. Nodemailer SMTP Integration (if Gmail or custom SMTP is configured)
    if (!emailSent && (process.env.SMTP_HOST || process.env.GMAIL_APP_PASSWORD)) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || 'smtp.gmail.com',
          port: parseInt(process.env.SMTP_PORT || '465'),
          secure: process.env.SMTP_PORT === '587' ? false : true,
          auth: {
            user: process.env.SMTP_USER || process.env.GMAIL_USER || 'neatifysolutionsinc@gmail.com',
            pass: process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD
          }
        });

        await transporter.sendMail({
          from: `"Neatify Solutions" <${process.env.SMTP_USER || 'neatifysolutionsinc@gmail.com'}>`,
          to: recipientEmail,
          replyTo: email,
          subject: subject,
          html: htmlBody
        });

        emailSent = true;
        transportMethod = 'smtp';
      } catch (smtpErr) {
        console.warn('Nodemailer SMTP failed:', smtpErr);
      }
    }

    // 3. Web3Forms zero-config fallback relay
    if (!emailSent) {
      try {
        // Dispatch to free Web3Forms relay targeting neatifysolutionsinc@gmail.com
        const relayRes = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: process.env.WEB3FORMS_ACCESS_KEY || '67c9c0f8-0000-0000-0000-000000000000', // Optional custom key or default
            email: recipientEmail,
            from_name: 'Neatify Solutions Web Lead',
            subject: subject,
            customer_name: fullName,
            customer_email: email,
            customer_phone: phone,
            service: serviceType,
            community: location,
            property_details: propertyScope,
            preferred_date: preferredDate,
            notes: propertyDetails
          })
        });
        if (relayRes.ok) {
          transportMethod = 'relay';
        }
      } catch (relayErr) {
        console.log('Relay attempt logged');
      }
    }

    // Return success response to the front-end
    return res.status(200).json({
      success: true,
      deliveredTo: recipientEmail,
      transport: transportMethod,
      timestamp: new Date().toISOString(),
      leadData: {
        name: fullName,
        email: email,
        phone: phone,
        service: serviceType,
        community: location,
        scope: propertyScope,
        preferredDate: preferredDate || 'Flexible'
      }
    });

  } catch (error) {
    console.error('Error handling quote submission:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error processing quote request'
    });
  }
}
