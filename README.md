# Serenity Support: A Mental Health Assistance App

Serenity Support is a web application designed to assist individuals facing mental health challenges. Developed for a health charity, the app offers features like secure authentication, email integration, appointment booking, interactive tables, and data export. It also incorporates AI-driven support through the Gemini API and provides essential tools such as a geo-location map and a user-friendly admin dashboard. The app aims to provide valuable resources and improve the well-being of underrepresented communities through innovative technology solutions.

---

## Features and Business Requirements

### Core Features

**External Authentication**  
Implemented Firebase Authentication to enable secure login and registration.

**Email**  
Integrated SendGrid API for sending emails with attachments.

**Interactive Table Data**  
- Displayed two interactive tables.
- Features include sorting, column-specific searching, and pagination (10 rows per page).

**Deployment to the Cloud**  
Deployed the fully functional web application on Cloudflare Pages.

### Additional Features

**Cloud Functions**  
Utilized Firebase Cloud Functions for executing server-side logic.

**Geo Location**  
Integrated a map with the following features:
- Search for places of interest.
- Navigate between locations with route and trip information.

**Export**  
Implemented functionality to export data in CSV and PDF formats.

### Innovation Features

1. **Appointment Booking (using Calendar)**  
   - Integrated FullCalendar.io API to handle booking constraints and conflict management.

2. **Bulk Email**  
   - Enabled the system to send bulk emails to selected users via SendGrid API.

3. **Provide API Access**  
   - Exposed two RESTful API routes for third-party data access.

4. **Interactive Charts**  
   - Displayed dynamic charts and graphs using data from Firestore.

5. **Incorporate GenAI**  
   - Leveraged Gemini API to provide conversational support and content generation for users.

6. **Admin Dashboard**  
   - Developed a dedicated dashboard for the system admin to monitor website metrics, including user statistics and types.

7. **Offline Features**  
   - Enabled checking of user online/offline status.
   - Enhanced the use of Local Storage for offline functionality.

---

## Deployment
The application has been deployed on **Cloudflare Pages**, ensuring a highly available, fast, and secure online presence.

---

## Recommendations for Future Enhancements
1. **AI-Driven Personalization**  
   - Utilize AI to provide personalized content and recommendations for users.

2. **Scalability Improvements**  
   - Migrate to a scalable backend service to handle a growing user base.

3. **Enhanced Security**  
   - Implement advanced security measures like two-factor authentication.

4. **Mobile Optimization**  
   - Develop a native mobile app version for better accessibility.

---

## Technologies Used
- **Frontend:** Vue.js, Bootstrap
- **Authentication:** Firebase Auth
- **Serverless Functions:** Firebase Cloud Functions
- **Email:** SendGrid API
- **Data Export:** CSV and PDF generation libraries
- **Geo Location:** MapBox API
- **Calendar:** FullCalendar.io API
- **Charts:** Chart.js and Firestore integration
- **GenAI:** Gemini API
- **Hosting:** Cloudflare Pages

---

## Conclusion
Serenity Support aligns with the health charity's mission to support individuals facing mental health challenges. By integrating advanced features and innovative solutions, it aims to make a significant impact in the community.
