## MoviesApp

A modern web application for browsing and reviewing movies. Built with React, Typescript, and Vite, and styled using Tailwind CSS. The app is deployed to AWS S3 with Cloudfront for fast and secure global delivery.

## Live Demo

[https://d1uhhremj97atw.cloudfront.net]

## Features

- List of movies with detailed views
- Movie details page with similar movie suggestions
- List of users' selected favourite movies
- List of upcoming movies
- User can create "My fantasy movies"
- Popular actors and their biography
- Add and view user reviews
- Fast SPA performance with Vite
- Deployed on AWS S3 with CloudFront CDN
- Efficient data fetching with React Query
- Responsive design using Tailwind CSS

## App Routes

- `/` – Home page (list of movies)
- `/movies/:id` – Movie details page
- `/reviews/form` – Add review page
- `/reviews/:id` - Movie Review Page
- `/movies/favourites` - Favourite Movies Page
- `/movies/upcoming` - Upcoming Movies page
- `/mustwatch` - Must watch page
- `/fantasy/create` - Fantasy movie page form
- `/fantasy` - Fantasy movie page
- `/actors` - Popular Actors list page
- `/actors/:id` - Actors' biography page
- `*` – Not Found (fallback route)

## Tech Stack

| Layer        | Technology                |
| ------------ | ------------------------- |
| Frontend     | React + TypeScript + Vite |
| Styling      | Tailwind CSS              |
| API Fetching | Axios + React Query       |
| Deployment   | AWS S3 + CloudFront       |

## Getting Started

Prerequisites:
 - Node.js
 - npm or yarn

Installation:
 - git clone https://github.com/tanjim-ahmed12/moviesApp
 - cd moviesApp
 - npm install
 - npm run dev (To run locally)

Build for production:
- npm run build

Deployment to AWS:
- aws s3 sync dist/ s3://bucket name


