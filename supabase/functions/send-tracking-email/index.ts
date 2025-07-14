import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.5';
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface TrackingEmailRequest {
  packageId: string;
  recipientEmail: string;
  recipientName: string;
  trackingNumber: string;
}

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { packageId, recipientEmail, recipientName, trackingNumber }: TrackingEmailRequest = await req.json();

    if (!recipientEmail || !recipientName || !trackingNumber) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Get package details
    const { data: packageData, error: packageError } = await supabase
      .from('packages')
      .select('*')
      .eq('id', packageId)
      .single();

    if (packageError) {
      console.error('Error fetching package:', packageError);
      return new Response(
        JSON.stringify({ error: "Package not found" }),
        { status: 404, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const trackingUrl = `https://yxppflscazhgoikzzxha.supabase.co/track?number=${trackingNumber}`;

    const emailHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Package is on its way!</title>
        <style>
            body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
            .header { background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 40px 30px; text-align: center; }
            .header h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: 600; }
            .header p { color: #e0e7ff; margin: 10px 0 0 0; font-size: 16px; }
            .content { padding: 40px 30px; }
            .tracking-card { background: linear-gradient(135deg, #f8fafc, #f1f5f9); border: 1px solid #e2e8f0; border-radius: 12px; padding: 30px; text-align: center; margin: 30px 0; }
            .tracking-number { font-size: 24px; font-weight: 700; color: #1e293b; margin: 10px 0; letter-spacing: 2px; }
            .track-button { display: inline-block; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; transition: transform 0.2s; }
            .track-button:hover { transform: translateY(-2px); }
            .package-details { background: #f8fafc; border-radius: 8px; padding: 20px; margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e2e8f0; }
            .detail-row:last-child { border-bottom: none; }
            .detail-label { font-weight: 600; color: #64748b; }
            .detail-value { color: #1e293b; }
            .footer { background: #1e293b; color: #94a3b8; padding: 30px; text-align: center; font-size: 14px; }
            .footer a { color: #6366f1; text-decoration: none; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>📦 Your Package is on its way!</h1>
                <p>GL Express - Fast, Reliable, Secure</p>
            </div>
            
            <div class="content">
                <h2 style="color: #1e293b; margin-bottom: 20px;">Hello ${recipientName}!</h2>
                
                <p style="color: #64748b; font-size: 16px; line-height: 1.6;">
                    Great news! Your package has been registered with GL Express and is now being processed for delivery. 
                    You can track your package in real-time using the tracking number below.
                </p>
                
                <div class="tracking-card">
                    <h3 style="color: #1e293b; margin: 0 0 15px 0;">Your Tracking Number</h3>
                    <div class="tracking-number">${trackingNumber}</div>
                    <a href="${trackingUrl}" class="track-button">Track Your Package</a>
                </div>
                
                <div class="package-details">
                    <h3 style="color: #1e293b; margin: 0 0 20px 0;">Package Details</h3>
                    <div class="detail-row">
                        <span class="detail-label">Recipient:</span>
                        <span class="detail-value">${packageData.recipient_name}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Delivery Address:</span>
                        <span class="detail-value">${packageData.recipient_address}</span>
                    </div>
                    ${packageData.service_type ? `
                    <div class="detail-row">
                        <span class="detail-label">Service Type:</span>
                        <span class="detail-value">${packageData.service_type}</span>
                    </div>
                    ` : ''}
                    <div class="detail-row">
                        <span class="detail-label">Current Status:</span>
                        <span class="detail-value" style="color: #059669; font-weight: 600;">Registered</span>
                    </div>
                </div>
                
                <div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 30px 0; border-radius: 0 8px 8px 0;">
                    <h4 style="color: #1e40af; margin: 0 0 10px 0;">💡 Pro Tip</h4>
                    <p style="margin: 0; color: #1e40af;">Bookmark the tracking link or save this email to easily check your package status anytime!</p>
                </div>
                
                <p style="color: #64748b; font-size: 14px; line-height: 1.6;">
                    If you have any questions about your delivery, feel free to contact our customer support team. 
                    We're here to help make your delivery experience as smooth as possible.
                </p>
            </div>
            
            <div class="footer">
                <p><strong>GL Express</strong> - Your trusted delivery partner</p>
                <p>Questions? Contact us at <a href="mailto:support@glexpress.com">support@glexpress.com</a></p>
                <p style="margin-top: 20px; font-size: 12px;">
                    This email was sent because a package was registered for delivery to your address. 
                    If you weren't expecting this package, please contact us immediately.
                </p>
            </div>
        </div>
    </body>
    </html>
    `;

    const emailResponse = await resend.emails.send({
      from: "GL Express <notifications@gl-express.eu>",
      to: [recipientEmail],
      subject: `📦 Your GL Express package ${trackingNumber} is on its way!`,
      html: emailHtml,
    });

    console.log("Tracking email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Tracking email sent successfully",
      emailId: emailResponse.data?.id 
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (error: any) {
    console.error("Error in send-tracking-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);