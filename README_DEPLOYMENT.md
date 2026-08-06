# Deployment Guide for Royal Shopping

## Build & deploy locally

1. Install dependencies:
   - `cd client && npm install`
   - `cd server && npm install`

2. Build client:
   - `cd client && npm run build`

3. Start server:
   - `cd server && npm start`

4. Server will serve frontend from `client/dist` and API from `/api`.

## Environment variables

The server expects these variables:

- `PORT` (default `5000`)
- `CLIENT_URL` (frontend origin for CORS)
- `DATABASE_URL` (Postgres connection string)
- `JWT_SECRET`
- `ACCESS_EXPIRES`
- `REFRESH_EXPIRES_DAYS`
- `CLOUDINARY_URL` or Cloudinary keys

## Docker

Build and run with:

```bash
docker compose up --build
```

Then open `http://localhost:5000`.

## Notes

- `client/dist` must exist before starting the server.
- The server proxy in development is only for local dev. In production, the Express server serves the built frontend.
- Use `npm run build-client` from `server` to build the frontend from the repo root.
