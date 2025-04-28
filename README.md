# Gym Tracker Frontend

The Gym Tracker Frontend is a built with React and TypeScript, designed to help users log their gym workouts and track their progress. This app allows users to add custom exercises, view their exercise history, and track progress in terms of sets and weights lifted.

## Features
- **Exercise Library:** A default library of exercises.
- **Add Custom Exercises**: Users can create new exercises and track them.
- **Responsive Design**: Built with Bootstrap for a mobile-first, responsive UI.
- **Authentication**: Secure authentication to ensure only authorized users can add or view exercises.
- **Exercise History:** View your workout history showing the amount of sets, reps, and weight.
- **Custom Exercises:** Add and track your own custom exercises to your workout routine.
- **User Progress Tracker:**
- Shows the average amount of weight per reps 

## Coming Soon / Upcoming Features
I am currently working on these features. Stay tuned for updates!

- **User Progress Tracker:**
- Show a score for each workout day based on the users average workout
- **Import/Export:** Import and Export .csv files with all sets and exercise names
- **Social Sharing:** Share your achievements with friends and the community.
- **Progressive Overload Calculator:** A tool to help you progressively increase your weights.
- **Personal Bests:**: Show the users personal bests for all their favorite exercises
- **Nutrition Integration:** Sync with nutrition apps to track your calorie intake and macros.
- **Weekly Challenges:** Participate in weekly challenges and compete with others.

*Estimated release dates for these features are coming soon. Stay tuned for updates!*


## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A superset of JavaScript for improved type safety and scalability.
- **Axios**: Promise-based HTTP client for making API requests.
- **Bootstrap**: Frontend framework for fast and responsive design.
- **React Router**: For managing navigation between different views in the app.
- **JWT Authentication**: Used for securely authenticating users.

## Project Structure

- `src/`: Contains all the source code for the frontend.
  - `components/`: Reusable React components.
  - `pages/`: React components that represent different pages in the app (e.g., Home, Exercises, etc.).
  - `types/`: TypeScript types and interfaces for better type safety.
  - `services/`: Functions for interacting with the backend API (e.g., axios functions).
  - `App.tsx`: Main entry point of the application, managing routing and global state.
  
## Installation

To run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/KeoniHan2024/Gym-Tracker-Frontend.git
   cd Gym-Tracker-Frontend

2. Create .env Variables:
   Create .env file and set the following parameters:
    REACT_APP_API_URL=http://localhost:8080

3. Run using npm run dev

