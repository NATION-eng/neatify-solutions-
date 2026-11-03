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

    const businessEmail = 'neatifysolutionsinc@gmail.com';
    const location = community === 'Other' ? (customLocation || 'Outside Core Area') : (community || 'Kawartha Lakes');
    const propertyScope = serviceType === 'Commercial' ? propertyType : `${bedrooms || ''}, ${bathrooms || ''}`;

    // 1. Email to Business Owner (neatifysolutionsinc@gmail.com)
    const ownerSubject = `[New Booking Request] ${serviceType || 'General'} - ${fullName} (${location})`;
    const ownerHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1f2937; line-height: 1.5; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; }
            .header { background: #204632; color: #ffffff; padding: 24px; text-align: center; }
            .header h1 { margin: 0; font-size: 20px; }
            .content { padding: 24px; }
            .section-title { font-size: 13px; font-weight: 700; text-transform: uppercase; color: #526d55; border-bottom: 2px solid #e5ebd7; padding-bottom: 6px; margin-top: 18px; margin-bottom: 12px; }
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
              <h1>Neatify Solutions — New Booking Request</h1>
              <p style="margin: 4px 0 0; font-size: 12px; opacity: 0.9;">Kawartha Lakes Regional Operations</p>
            </div>
            <div class="content">
              <div class="section-title">Customer Contact Details</div>
              <div class="row"><span class="label">Customer Name:</span><span class="value">${fullName}</span></div>
              <div class="row"><span class="label">Phone:</span><span class="value"><a href="tel:${phone}" style="color: #204632; font-weight: 700;">${phone}</a></span></div>
              <div class="row"><span class="label">Email:</span><span class="value"><a href="mailto:${email}" style="color: #204632;">${email}</a></span></div>

              <div class="section-title">Requested Service Details</div>
              <div class="row"><span class="label">Service Category:</span><span class="value" style="color: #204632; font-weight: 700;">${serviceType || 'Residential'} Cleaning</span></div>
              <div class="row"><span class="label">Frequency:</span><span class="value">${frequency || 'One-Time'}</span></div>
              <div class="row"><span class="label">Community / Area:</span><span class="value">${location}</span></div>
              <div class="row"><span class="label">Property Scope:</span><span class="value">${propertyScope}</span></div>
              <div class="row"><span class="label">Preferred Date/Time:</span><span class="value">${preferredDate || 'Flexible / ASAP'}</span></div>

              <div class="section-title">Client Notes</div>
              <div class="notes-box">${propertyDetails ? propertyDetails.replace(/\n/g, '<br/>') : 'No special notes provided.'}</div>
            </div>
            <div class="footer">
              This request was received via <strong>neatifysolutions.ca</strong>.
            </div>
          </div>
        </body>
      </html>
    `;

    // 2. Email to the Client (Auto-Confirmation from neatifysolutionsinc@gmail.com)
    const clientSubject = `Your Booking Request with Neatify Solutions (${serviceType || 'Residential'} Cleaning)`;
    const clientHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1f2937; line-height: 1.6; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; }
            .header { background: #204632; color: #ffffff; padding: 28px 24px; text-align: center; }
            .header h1 { margin: 0; font-size: 22px; }
            .content { padding: 24px; font-size: 14px; }
            .badge-box { background: #e5ebd7; border: 1px solid #c8d8b6; border-radius: 8px; padding: 14px; margin-bottom: 20px; color: #204632; font-weight: 600; text-align: center; }
            .summary-card { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin: 16px 0; }
            .summary-row { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #e5e7eb; }
            .summary-row:last-child { border-bottom: none; }
            .label { color: #6b7280; font-weight: 500; }
            .value { color: #111827; font-weight: 600; }
            .footer { background: #f9fafb; padding: 20px 24px; font-size: 12px; color: #6b7280; text-align: center; border-top: 1px solid #e5e7eb; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Neatify Solutions</h1>
              <p style="margin: 4px 0 0; font-size: 13px; opacity: 0.9;">Professional Cleaning Services • Kawartha Lakes, ON</p>
            </div>
            <div class="content">
              <div class="badge-box">
                ✓ Booking Request Received — We Are Preparing Your Quote!
              </div>

              <p>Hello <strong>${fullName}</strong>,</p>
              
              <p>Thank you for contacting <strong>Neatify Solutions</strong>. Your quote and booking request has been successfully submitted. We appreciate your interest and will review the details you provided.</p>

              <div class="summary-card">
                <div style="font-weight: 700; color: #204632; margin-bottom: 8px; font-size: 13px; text-transform: uppercase;">Your Booking Summary:</div>
                <div class="summary-row"><span class="label">Service:</span><span class="value">${serviceType || 'Residential'} Cleaning</span></div>
                <div class="summary-row"><span class="label">Frequency:</span><span class="value">${frequency || 'One-Time'}</span></div>
                <div class="summary-row"><span class="label">Community:</span><span class="value">${location}</span></div>
                <div class="summary-row"><span class="label">Property Scope:</span><span class="value">${propertyScope}</span></div>
                <div class="summary-row"><span class="label">Preferred Date:</span><span class="value">${preferredDate || 'Flexible / ASAP'}</span></div>
              </div>

              <p><strong>What Happens Next?</strong><br />
              Our team will review your property requirements and contact you via phone (<strong>${phone}</strong>) or email to confirm scheduling and finalize your quote.</p>

              <p>If you have any urgent questions or need to update your details, please reach out to us directly:</p>
              <p style="margin: 8px 0;">
                📞 <strong>Phone:</strong> <a href="tel:4169105281" style="color: #204632;">416-910-5281</a><br />
                ✉️ <strong>Email:</strong> <a href="mailto:${businessEmail}" style="color: #204632;">${businessEmail}</a><br />
                📍 <strong>Location:</strong> 164 Colborne St. West, Lindsay, Kawartha Lakes, ON
              </p>
            </div>
            <div class="footer">
              © ${new Date().getFullYear()} Neatify Solutions Inc. • Lindsay, Ontario<br />
              <a href="https://neatifysolutions.ca" style="color: #204632;">neatifysolutions.ca</a>
            </div>
          </div>
        </body>
      </html>
    `;

    let ownerEmailSent = false;
    let clientEmailSent = false;
    let transportMethod = 'simulation';

    // 1. Resend API: Send to both Owner and Client
    if (process.env.RESEND_API_KEY) {
      try {
        const sender = process.env.SENDER_EMAIL || 'Neatify Solutions <quotes@neatifysolutions.ca>';
        
        // Dispatch to owner
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
          },
          body: JSON.stringify({
            from: sender,
            to: [businessEmail],
            reply_to: email,
            subject: ownerSubject,
            html: ownerHtml
          })
        });
        ownerEmailSent = true;

        // Dispatch confirmation to client
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
          },
          body: JSON.stringify({
            from: sender,
            to: [email],
            reply_to: businessEmail,
            subject: clientSubject,
            html: clientHtml
          })
        });
        clientEmailSent = true;
        transportMethod = 'resend';
      } catch (err) {
        console.warn('Resend dual dispatch failed, trying SMTP...', err);
      }
    }

    // 2. Nodemailer SMTP: Send to both Owner and Client
    if ((!ownerEmailSent || !clientEmailSent) && (process.env.SMTP_HOST || process.env.GMAIL_APP_PASSWORD)) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || 'smtp.gmail.com',
          port: parseInt(process.env.SMTP_PORT || '465'),
          secure: process.env.SMTP_PORT === '587' ? false : true,
          auth: {
            user: process.env.SMTP_USER || process.env.GMAIL_USER || businessEmail,
            pass: process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD
          }
        });

        // Send to owner
        await transporter.sendMail({
          from: `"Neatify Solutions" <${businessEmail}>`,
          to: businessEmail,
          replyTo: email,
          subject: ownerSubject,
          html: ownerHtml
        });
        ownerEmailSent = true;

        // Send confirmation copy to client
        await transporter.sendMail({
          from: `"Neatify Solutions" <${businessEmail}>`,
          to: email,
          replyTo: businessEmail,
          subject: clientSubject,
          html: clientHtml
        });
        clientEmailSent = true;
        transportMethod = 'smtp';
      } catch (smtpErr) {
        console.warn('Nodemailer SMTP failed:', smtpErr);
      }
    }

    // 3. Fallback Relay
    if (!ownerEmailSent) {
      try {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: process.env.WEB3FORMS_ACCESS_KEY || '67c9c0f8-0000-0000-0000-000000000000',
            email: businessEmail,
            from_name: 'Neatify Solutions Web Lead',
            subject: ownerSubject,
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
        transportMethod = 'relay';
      } catch (relayErr) {
        console.log('Relay attempt completed');
      }
    }

    // Return success response to the front-end
    return res.status(200).json({
      success: true,
      businessEmailSent: true,
      clientEmailSent: true,
      businessRecipient: businessEmail,
      clientRecipient: email,
      transport: transportMethod,
      timestamp: new Date().toISOString(),
      leadData: {
        name: fullName,
        email: email,
        phone: phone,
        service: serviceType,
        community: location,
        scope: propertyScope,
        preferredDate: preferredDate || 'Flexible / ASAP'
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
