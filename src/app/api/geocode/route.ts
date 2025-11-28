import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  // Reverse geocoding (coordinates to location name)
  if (lat && lon) {
    try {
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lon);

      // Use OpenStreetMap Nominatim for reverse geocoding (free, no API key needed)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'CementerioVirtualAnimales/1.0'
          }
        }
      );

      if (!response.ok) {
        return NextResponse.json(
          { success: false, location: 'España' },
          { status: 200 }
        );
      }

      const data = await response.json();

      // Extract city name from the address
      const address = data.address || {};
      
      // Priority: city > town > village > county > state
      const city = address.city || address.town || address.village || address.county || address.state || 'España';
      const country = address.country || 'España';

      const location = `${city}, ${country}`;

      return NextResponse.json({
        success: true,
        location: location,
        address: data.address,
        displayName: data.display_name
      });
    } catch (error) {
      console.error('Reverse geocode error:', error);
      return NextResponse.json(
        { success: false, location: 'España' },
        { status: 200 }
      );
    }
  }

  // Forward geocoding (search for locations)
  if (!query) {
    return Response.json({ error: 'Missing query, lat, or lon' }, { status: 400 });
  }

  try {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    
    if (!token) {
      return Response.json({ error: 'Mapbox token not configured' }, { status: 500 });
    }

    // Usar Mapbox Geocoding API
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${token}&limit=1`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      }
    );

    const data = await response.json();

    if (!data.features || data.features.length === 0) {
      return Response.json({ error: 'Location not found' }, { status: 404 });
    }

    const match = data.features[0];
    const [lng, latVal] = match.center;

    return Response.json({
      text: match.place_name,
      lat: latVal,
      lng,
      success: true
    });
  } catch (error) {
    console.error('Geocoding error:', error);
    return Response.json({ error: 'Geocoding failed', success: false }, { status: 500 });
  }
}
