# Fullstack Nextjs App | Radius

Nextjs full-stack web application that enables users to create, view, edit, and delete AI prompts. This platform serves as a community hub where users can share their creative prompts and explore prompts from others, facilitating inspiration and collaboration.

## ⚙️Tech Stack
- Next.js
- Node.js
- Javascript
- MongoDB
- Next Auth (Auth.js)
- TailwindCSS
- React Hook Form

## 🚀 Project Features

👉 **Responsive Design:** Optimized for various screen sizes, ensuring an accessible experience across devices.

👉 **Next-Auth Integration:** Secure user authentication and session management enabling users to manage their profiles and prompts effortlessly.

👉 **Secure API Endpoints:** Robust API endpoints for creating prompts, fetching prompts, retrieving user details, and accessing user posts, featuring structured responses and informative error messages for a smooth developer experience.

👉 **Prompt Discovery & Sharing:** Users can easily discover and share AI prompts within the community.

👉 **Effortless Prompt Editing:** Update and edit prompts using user-friendly forms built with React Hook Form, featuring robust state management and validation.

👉 **Personalized Profile Page:** Users can view their latest prompts, inspirations, and contributions on their dedicated profile.

👉 **User Details Page:** Explore other users’ accounts and view their latest posts in a streamlined feed.

👉 **Copy to Clipboard:** Easily copy favorite AI prompts for quick access with a single button click.

👉 **Dynamic Search & Filter:** Search prompts by tags, usernames, or content for enhanced discoverability and convenience.

## Project Setup

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [NPM](https://npmjs.com/) (Node Package Manager)

**Cloning the Repository**

First, clone the repository to your local machine:

```bash
git clone https://github.com/your-username/your-repository-name.git
cd your-repository-name
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env.local` in the root of your project and add the following content:

```env
#NEXT
NEXT_PUBLIC_SERVER_URL=

#GOOGLE AUTH CREDENTIALS
GOOGLE_AUTH_CLIENT_ID=
GOOGLE_AUTH_CLIENT_SECRET=

#MONGODB
MONGODB_URI=

#NEXT AUTH
NEXTAUTH_URL=
NEXTAUTH_URL_INTERNAL=
NEXTAUTH_SECRET=
```
Populate the env varaibles with your own keys from the relevant platforms. For imeplementing google auth with next auth configure your app with the google developer cloud console which will provide the google auth secrets and configure callback urls

**Run the Development Server**

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

**Build for Production**

To build the project for production, run:

```bash
npm run build
```

**Deploy the Project**

For deploying the project, use the following command:

```bash
npm run deploy
```
