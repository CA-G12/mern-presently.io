# Presently.io

## Description:

A web app that helps you quickly make slides for your next presentation and get live comments as you're presenting. 
It converts ` .md` files into slides instantly! It also supports presenting live with the ability to share the slides you're presenting with your audience. Your audience will be able to share with you their feedback and comments as you're presenting.

---

## [Live Demo](https://presentlyio.netlify.app/)

---

## User Stories:

As a presenter:

- I want to be able to create an account.
- I want to be able to upload `md` files and get them as slides.
- I want to be able to upload as many `md` files as possible.
- I want to be able to mark presentations as live/not live.
- I want to be able to mark presentations as Public/Private.
- I want to be able to create a shortened share link to the slides.
- I want to be able to copy the share link when clicking on the share icon.
- I want to be able to receive notifications when a viewer comments on my slides.
- I want to be able to view all of the comments on my slides.

As a viewer:

 - I want to be able to access slides through a link.
 - I want to be able to comment on slides as the presentation is going.
 - I want to be able to swipe between slides using the left/right arrow keys.
 
---
##  Prepare your `Readme.md`/`md` file to be compatible with our app.

  - Separate the content of slides by adding `---`
  - Leave `one space` after the end of the content of one slide.
  
---
##  Install Presently.io locally

- Clone this repo.
- Run `npm run init`.
- Configure your environment variables by adding: 
  -  `DATABASE_URL`: database link.
  -  `PORT`
  -  `CLOUD_NAME`: your cloud name on Cloudinary.
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`
  - `REBRANDLY_API_KEY`: Rebrandly is a service for link shortening.
  - `ORIGIN`: frontend link.

- Run `npm run seed-db` for seeding.
- Start the server by running `npm run dev` and the client by running `cd client && npm run start`.

---
##  Used Technologies

- ReactJs
- Nodejs
- Express
- MongoDB
- Tailwind
- Cloudinary
- JWT
- Rebrandly

---
## Team Lead:

- [Ahmed Safi](https://github.com/AhmedSafi97)

---
## Team Members:

- [Fadi H. Zaqout](https://github.com/fadezak100)
- [Zayan Al-Aaraishy](https://github.com/Zayan-Alaraishy)
- [Nada S. Ayesh](https://github.com/nadasuhailAyesh12)
