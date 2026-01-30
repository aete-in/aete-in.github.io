
const CACHE_KEY = 'geo_cache_v1';
const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org/search';

const getCache = () => {
    try {
        return JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    } catch {
        return {};
    }
};

const setCache = (cache) => {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    } catch (e) {
        console.warn('Failed to save geo cache', e);
    }
};

/**
 * Geocodes a location string (e.g. "Pune, India") to {lat, lon}.
 * Uses caching to avoid hitting API limits.
 */
export const geocodeLocation = async (location) => {
    if (!location) return null;

    // Normalize format
    const query = location.trim();
    const cache = getCache();

    if (cache[query]) {
        return cache[query]; // Return cached coords
    }

    try {
        // Rate limiting check could go here, but for now relying on browser fetch
        const response = await fetch(`${NOMINATIM_BASE_URL}?format=json&q=${encodeURIComponent(query)}&limit=1`, {
            headers: {
                'User-Agent': 'AETE-Resource-Network/1.0'
            }
        });

        const data = await response.json();

        if (data && data.length > 0) {
            const result = {
                lat: parseFloat(data[0].lat),
                lon: parseFloat(data[0].lon)
            };

            // Update cache
            cache[query] = result;
            setCache(cache);

            return result;
        }
    } catch (error) {
        console.error("Geocoding error:", error);
    }

    return null;
};
