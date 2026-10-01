# Fix: Website data not loading

## Root cause

Your Vercel site was calling Render API:
`https://era-global-it-systems-1.onrender.com`

Render free servers **sleep** → API returns **503** → Dashboard stuck on **Loading...**

## Code fix (already pushed)

API now runs on **Vercel** at the same URL: `/api/...`

## YOU MUST DO THIS IN VERCEL (5 minutes)

### A) Environment Variable

1. https://vercel.com/dashboard → your project
2. **Settings → Environment Variables**
3. Add:

**Name:** `MONGODB_URI`  

**Value:** (copy from your `backend/.env` — must include database name `era_it_assets`)

Example:

```text
mongodb://USER:PASS@host1:27017,host2:27017,host3:27017/era_it_assets?ssl=true&replicaSet=atlas-kkjn2m-shard-0&authSource=admin&appName=Cluster0
```

4. Enable for **Production** (+ Preview)
5. Save

### B) Remove old Render URL

If `VITE_API_URL` exists pointing to `onrender.com` → **Delete it**

### C) Root Directory

**Settings → General → Root Directory**

- If set to `frontend` → that is OK with the new `frontend/api` setup
- If empty (repo root) → also OK with root `api/` + `vercel.json`

### D) MongoDB Atlas → Network Access

Allow `0.0.0.0/0` (Anywhere) so Vercel can connect

### E) Redeploy

**Deployments → ⋯ → Redeploy** (uncheck “Use existing Build Cache” if available)

### F) Test

Open: https://era-global-it-systems.vercel.app/api/health  

Expected:

```json
{ "success": true, "message": "ERA IT AMS API is running" }
```

Then refresh the homepage — data should load.
