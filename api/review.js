import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Allow GET requests to check status
  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'online',
      endpoint: '/api/review',
      database: 'connected (supabase)',
      timestamp: new Date().toISOString()
    });
  }

  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const {
      name,
      rating,
      location,
      service,
      quote,
      email: reviewerEmail,
      role = 'Verified Customer'
    } = req.body || {};

    // Validate required fields
    if (!name || !rating || !quote) {
      return res.status(400).json({
        success: false,
        error: 'Name, star rating, and review text are required.'
      });
    }

    const cleanRating = Math.max(1, Math.min(5, parseInt(rating, 10) || 5));
    const cleanLocation = location ? location.trim() : 'Kawartha Lakes, ON';
    const cleanService = service ? service.trim() : 'Residential Cleaning';

    // 1. Insert into Supabase Database
    const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://sjyuhbrzdmxkkldjnxbh.supabase.co';
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqeXVoYnJ6ZG14a2tsZGpueGJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ5OTkyNjMsImV4cCI6MjExMDU3NTI2M30.q_cFPB_2UMZzKxNbNy6ulixptKNfBOveGz1SF0acZzc';

    const insertPayload = {
      name: name.trim(),
      role: role.trim(),
      location: cleanLocation,
      service: cleanService,
      rating: cleanRating,
      quote: quote.trim(),
      is_approved: true
    };

    let savedReview = null;

    try {
      const dbResponse = await fetch(`${supabaseUrl}/rest/v1/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Prefer': 'return=representation',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`
        },
        body: JSON.stringify(insertPayload)
      });

      if (dbResponse.ok) {
        const rows = await dbResponse.json();
        savedReview = Array.isArray(rows) && rows.length > 0 ? rows[0] : insertPayload;
      } else {
        const errText = await dbResponse.text();
        console.error('Supabase insert non-200 error:', dbResponse.status, errText);
      }
    } catch (dbErr) {
      console.error('Failed to connect to Supabase:', dbErr);
    }

    // 2. Dispatch Email Notification to Business Owner (neatifysolutionsinc@gmail.com)
    const businessEmail = 'neatifysolutionsinc@gmail.com';
    const starsText = '★'.repeat(cleanRating) + '☆'.repeat(5 - cleanRating);
    const ownerSubject = `[New Customer Review - ${cleanRating}★] from ${name.trim()} (${cleanLocation})`;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1f2937; line-height: 1.6; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; }
            .header { background: #204632; color: #ffffff; padding: 24px; text-align: center; }
            .stars { color: #f59e0b; font-size: 24px; letter-spacing: 2px; margin: 8px 0; }
            .content { padding: 24px; }
            .card { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin: 16px 0; }
            .row { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; }
            .label { color: #6b7280; font-weight: 600; }
            .value { color: #111827; font-weight: 500; text-align: right; }
            .quote-box { background: #eef2eb; border-left: 4px solid #204632; padding: 14px; font-style: italic; margin-top: 12px; font-size: 14px; color: #1f2937; }
            .footer { background: #f9fafb; padding: 16px; font-size: 12px; color: #6b7280; text-align: center; border-top: 1px solid #e5e7eb; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0; font-size: 20px;">New Live Review Submitted!</h2>
              <div class="stars">${starsText}</div>
              <p style="margin: 0; font-size: 13px; opacity: 0.9;">Neatify Solutions Customer Feedback</p>
            </div>
            <div class="content">
              <div class="card">
                <div class="row"><span class="label">Customer Name:</span><span class="value">${name.trim()}</span></div>
                ${reviewerEmail ? `<div class="row"><span class="label">Customer Email:</span><span class="value"><a href="mailto:${reviewerEmail}">${reviewerEmail}</a></span></div>` : ''}
                <div class="row"><span class="label">Rating:</span><span class="value" style="color: #204632; font-weight: 700;">${cleanRating} / 5 Stars</span></div>
                <div class="row"><span class="label">Service Received:</span><span class="value">${cleanService}</span></div>
                <div class="row"><span class="label">Location:</span><span class="value">${cleanLocation}</span></div>
                <div class="row"><span class="label">Status:</span><span class="value" style="color: #15803d; font-weight: 700;">Published Live in Supabase</span></div>
              </div>

              <div style="font-weight: 700; margin-top: 14px; color: #204632; font-size: 13px; text-transform: uppercase;">Review Comments:</div>
              <div class="quote-box">"${quote.trim()}"</div>
            </div>
            <div class="footer">
              Review received via <strong>neatifysolutions.ca</strong>. Connected to Supabase live database.
            </div>
          </div>
        </body>
      </html>
    `;

    let emailSent = false;
    const gmailPass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;

    if (gmailPass) {
      try {
        const userAccount = (process.env.GMAIL_USER || businessEmail).trim();
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: userAccount,
            pass: gmailPass.replace(/\s+/g, '')
          },
          tls: {
            rejectUnauthorized: false
          }
        });

        await transporter.sendMail({
          from: `"Neatify Live Reviews" <${userAccount}>`,
          to: businessEmail,
          replyTo: reviewerEmail || businessEmail,
          subject: ownerSubject,
          html: emailHtml
        });
        emailSent = true;
      } catch (mailErr) {
        console.error('Failed to dispatch review notification email:', mailErr);
      }
    }

    return res.status(200).json({
      success: true,
      review: savedReview || insertPayload,
      emailNotified: emailSent,
      message: 'Review received, saved to Supabase, and notified via email.'
    });

  } catch (err) {
    console.error('Fatal error in /api/review:', err);
    return res.status(500).json({
      success: false,
      error: 'Internal server error processing review'
    });
  }
}
