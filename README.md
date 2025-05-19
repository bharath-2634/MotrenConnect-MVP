# Motren Connect 

A tech-driven platform aimed at connecting freelancers, volunteers, orphaned children, and senior citizens to work collaboratively on projects and social causes. It blends social impact with productivity, providing a structured, rewarding ecosystem for contributors.The main goal is to build a community-focused freelance/volunteer platform that empowers underrepresented groups while encouraging skilled individuals to contribute meaningfully and get recognized/rewarded.

## 🚀 Project Vision

The goal of Motren Connect is to create a **collaborative social-tech ecosystem** where users from various backgrounds can:

- Contribute to impactful projects
- Get recognized and rewarded
- Build social capital
- Support underserved communities
- Skilled professionals contribute to real-world problems  
- Underserved communities receive mentorship and opportunities  
- Contributors are rewarded with points, badges, and recognition  
- Organizations and NGOs can easily onboard and manage impact-based projects 

Motren Connect blends productivity and purpose, enabling a ***freelance-style model with a heart***

## 🧭 SDG Goals Aligned

Motren Connect contributes toward the UN Sustainable Development Goals:

- 🧓 **SDG 1**: No Poverty  
- 📘 **SDG 4**: Quality Education  
- 🧑‍💼 **SDG 8**: Decent Work and Economic Growth  
- ♿ **SDG 10**: Reduced Inequalities  
- 🤝 **SDG 17**: Partnerships for the Goals

## 🔧 Features

### 👤 User Roles
- **Person**: Contributors including freelancers, volunteers, orphans, and senior citizens
- **Team Members**: MC Controllers, Volunteers
- **General Users**: Visitors, Investors, Organizers

### 🧠 Key Modules
- 🧑‍💻 **Freelance Marketplace** for Developers, Designers, Marketers, and more
- 🔐 **Role-Based Authentication** (Contributors, Clients, Admins)
- 🎯 **AI-Based Project Matching** for contributors
- 📣 **Notification System** (Person, General, Team)
- 🏆 **Gamification & Rewards**: Points, Fund Grades, Redeemables
- 🎓 **Mentorship Module** for connecting freelancers to underprivileged learners
- 📅 **Events & Accelerators** for hackathons, meetups, and project launches
- 🔁 **Contribution Tracker** to visualize social impact
- 🎯 **AI-Based Poverty Detection** to mark the event Place
- 🧠 **Power BI Dashboard** Visual analytics for contributors & team admins
- 👤 **AI-Based Developer Suggestion** to avoid fraud assolts

## 🛠 Tech Stack

| Layer        | Tech Used                          |
|--------------|------------------------------------|
| **Frontend** | React, Tailwind CSS, Redux         |
| **Backend**  | Node.js, Express.js                |
| **Utilites**  | Cloudinary , Passportjs , plupetter (Web Scraping)|
| **Database** | MongoDB                            |
| **Auth**     | Firebase, Google OAuth             |
| **AI/ML**    | LLMs for project matching, poverty detection , Freelancer's validation |
| **Analytics**| Power BI (via data exports or APIs)|
| **DevOps**   | Vercel / Render / AWS (for MVP hosting)  |


## 👨‍💻 Getting Started
```bash
# Clone the repo
git clone https://github.com/bharath-2634/MotrenConnect-MVP.git
```
## Environment Variables
*Create a **.env** file in the server folder and provide the following variables:*

   GOOGLE_CLIENT_SECRET = your-secret-id;
   GOOGLE_OAUTH = your-oauth-id;
   CONNECTION_URL = your-mongoDb-connection-url;

   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret

   RAZORPAY_KEY_ID = your-razorpay-key-id
   RAZORPAY_SECRET = your-razorpay-secret-id


# Install dependencies
```bash
cd client && npm install
cd ../server && npm install
```
Run Client Side
```bash
npm run dev
```
Run Server side
```bash
npm run dev
``` 
**NOTE** : *change the port on server.js file on server side on your own interest*

## Working Prototype and Screenshots

1. Authentication Module
   
   ![Authentication Module (2)](https://github.com/user-attachments/assets/c6124f57-f2c6-4988-ba81-29bd189be733)
   
2. Home Module
   
   ![Authentication Module](https://github.com/user-attachments/assets/09e8e75b-df22-4ef6-843a-c0f641155965)

3. Acceleration Module

   ![Authentication Module (1)](https://github.com/user-attachments/assets/bf48e5f8-71e7-447c-b55c-a99870d5a4b2)

 




![GitHub repo size](https://img.shields.io/github/repo-size/bharath-2634/MotrenConnect-MVP)
![GitHub issues](https://img.shields.io/github/issues/bharath-2634/MotrenConnect-MVP)
![GitHub forks](https://img.shields.io/github/forks/bharath-2634/MotrenConnect-MVP)
![GitHub stars](https://img.shields.io/github/stars/bharath-2634/MotrenConnect-MVP)
