import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const position = [51.5008, -0.1949]; // Elder Street, Kensington (prototype coordinates)

/* A divIcon inline-SVG dot, coloured from the design tokens, replaces
   Leaflet's default blue marker (which also needs its own asset-path fix
   under Vite — this sidesteps that entirely). The svg is sized larger than
   the dot itself so the pulsing ring has room to expand without clipping. */
const pinIcon = L.divIcon({
  className: 'marigold-pin',
  html: `
    <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <circle class="marigold-pin-ring" cx="20" cy="20" r="6" fill="var(--color-accent-700)" />
      <circle cx="20" cy="20" r="6" fill="var(--color-accent-700)" stroke="var(--paper)" stroke-width="2" />
    </svg>`,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -18],
});

export default function LocationMap({ style }) {
  useEffect(() => {
    // Leaflet measures its container on mount; our entrance animation can
    // still be resizing the card at that point, so re-measure once settled.
    const id = setTimeout(() => window.dispatchEvent(new Event('resize')), 350);
    return () => clearTimeout(id);
  }, []);

  return (
    <MapContainer
      center={position}
      zoom={16}
      scrollWheelZoom
      dragging={!L.Browser.mobile}
      attributionControl={false}
      className="marigold-map"
      style={{ height: 300, borderRadius: 'var(--radius-md)', ...style }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position} icon={pinIcon}>
        <Popup>
          The Marigold Arms<br />14 Elder Street, W8 4QT
        </Popup>
      </Marker>
    </MapContainer>
  );
}
