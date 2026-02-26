# Vercel Deployment Guide

To deploy this project to Vercel with Sanity.io integration, follow these steps:

## 1. Environment Variables

Add the following environment variables to your Vercel project settings:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`: Your Sanity Project ID.
- `NEXT_PUBLIC_SANITY_DATASET`: Your Sanity Dataset (usually `production`).

## 2. CORS Settings in Sanity

1. Go to [sanity.io/manage](https://sanity.io/manage).
2. Select your project.
3. Go to **API** -> **CORS Origins**.
4. Add your Vercel deployment URL (e.g., `https://your-project.vercel.app`) and
   check **Allow credentials**.

## 3. Deployment

Connect your GitHub repository to Vercel and it should automatically build and
deploy. Sanity Studio will be available at `/studio`.
