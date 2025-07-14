import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.5';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface WooCommerceOrder {
  id: number;
  status: string;
  currency: string;
  total: string;
  billing: {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    email: string;
    phone: string;
  };
  shipping: {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
  line_items: Array<{
    id: number;
    name: string;
    quantity: number;
    total: string;
  }>;
}

function generateTrackingNumber(): string {
  const prefix = 'WC';
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}${timestamp}${random}`;
}

function formatAddress(address: any): string {
  const parts = [
    address.address_1,
    address.address_2,
    address.city,
    address.state,
    address.postcode,
    address.country
  ].filter(Boolean);
  return parts.join(', ');
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  try {
    const body = await req.text();
    console.log('Received webhook body:', body);
    
    if (!body) {
      throw new Error('Empty request body');
    }

    let order: WooCommerceOrder;
    try {
      order = JSON.parse(body);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      throw new Error('Invalid JSON in request body');
    }

    console.log('Parsed WooCommerce order:', order.id);

    // Generate tracking number
    const trackingNumber = generateTrackingNumber();

    // Prepare package data
    const packageData = {
      tracking_number: trackingNumber,
      woocommerce_order_id: order.id.toString(),
      sender_name: 'Your Store', // You can customize this
      sender_address: 'Your Store Address', // You can customize this
      sender_phone: 'Your Store Phone', // You can customize this
      recipient_name: `${order.billing.first_name} ${order.billing.last_name}`.trim(),
      recipient_address: formatAddress(order.shipping.first_name ? order.shipping : order.billing),
      recipient_phone: order.billing.phone || null,
      service_type: 'standard',
      current_status: 'registered',
      // You can add weight and dimensions if available in WooCommerce
      weight: null,
      dimensions: null
    };

    // Insert package into database
    const { data: packageResult, error: packageError } = await supabase
      .from('packages')
      .insert(packageData)
      .select()
      .single();

    if (packageError) {
      console.error('Error creating package:', packageError);
      throw packageError;
    }

    console.log('Package created:', packageResult.id);

    // Create initial status history entry
    const { error: historyError } = await supabase
      .from('package_status_history')
      .insert({
        package_id: packageResult.id,
        status: 'registered',
        notes: `Order #${order.id} received from WooCommerce`,
        location: 'Warehouse'
      });

    if (historyError) {
      console.error('Error creating status history:', historyError);
      // Don't throw here as the package was created successfully
    }

    return new Response(
      JSON.stringify({
        success: true,
        tracking_number: trackingNumber,
        package_id: packageResult.id,
        message: 'Package tracking created successfully'
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );

  } catch (error: any) {
    console.error('Error in WooCommerce webhook:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Internal server error'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }
};

serve(handler);