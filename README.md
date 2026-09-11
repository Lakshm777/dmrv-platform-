# Agri-dMRV Platform

A high-fidelity digital Measurement, Reporting, and Verification (dMRV) interface designed for agricultural climate projects and carbon market integrity.

- **Live Demo**: [https://dmrv-platform-five.vercel.app](https://dmrv-platform-five.vercel.app)
- **Repository**: [https://github.com/Lakshm777/dmrv-platform-](https://github.com/Lakshm777/dmrv-platform-)

---

## Core Capabilities

* **ODK-Style Field Onboarding**: Mobile-optimized registration flow for farmer identification, KYC, and land tenure data.
* **GIS Polygon Mapping**: Boundary delineation with real-time geodesic area calculation (Hectares/Acres) via Turf.js.
* **Ground-Truth Corner Proofs**: EXIF-stamped photo attestation at boundary vertices for audit readiness.
* **Multi-Layer Base Maps**: Seamless switching between high-resolution Satellite, Street, and Terrain views.

---

## Tech Stack

* **Frontend**: React, TypeScript, Vite
* **Styling**: Tailwind CSS
* **Geospatial & Mapping**: Leaflet, Turf.js
* **State Management**: Zustand
* **Deployment**: Vercel CI/CD

---

## Local Development

```bash
# Clone the repository
git clone [https://github.com/Lakshm777/dmrv-platform-.git](https://github.com/Lakshm777/dmrv-platform-.git)

# Navigate to app directory
cd dmrv-platform-/dmrv-app

# Install dependencies
npm install

# Start local dev server
npm run dev

# Build for production
npm run build