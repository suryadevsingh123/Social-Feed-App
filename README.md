# Social Feed App

The Social Feed App is a React-based application that enables users to create and share posts with text, images, and videos. It leverages Firebase for authentication, Firestore for data storage, and Firebase Cloud Storage for media file management.

## Features

- **User Authentication**: Sign up and log in using email/password or Google authentication.
- **Create Posts**: Compose new posts containing text, images, and videos.
- **Media Upload**: Upload images and videos, which are stored in Firebase Cloud Storage.
- **Real-time Updates**: Posts are displayed in real-time using Firestore's real-time capabilities.
- **Responsive Design**: Optimized for both desktop and mobile viewing.

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/suryadevsingh123/Social-Feed-App.git
   cd Social-Feed-App
   ```

2. **Install Dependencies**:

   Ensure you have [Node.js](https://nodejs.org/) installed, then run:

   ```bash
   npm install
   ```

3. **Firebase Configuration**:

   - Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
   - Add a web app to your project and obtain the Firebase configuration object.
   - Replace the configuration in `src/config/firebaseConfig.js` with your Firebase project's details.
   - Enable Firestore, Authentication (Email/Password and Google), and Cloud Storage in the Firebase Console.

4. **Start the Development Server**:

   ```bash
   npm start
   ```

   The app should now be running at `http://localhost:3000/`.

## Usage

### Authentication

- **Sign Up**: Create a new account using an email and password.
- **Log In**: Access your account with existing credentials or use Google authentication.
- **Log Out**: Sign out from your account.

### Creating a Post

1. **Compose**: Navigate to the "New Post" page and enter your content.
2. **Add Media**: Upload images or videos using the "Photos" or "Camera" buttons.
3. **Submit**: Click "Post" to share your content.

### Viewing Posts

- Posts are displayed in real-time in the feed.
- Each post shows the creator's username, profile picture, text, images, and videos.

## Folder Structure

- `src/components`: Contains reusable UI components.
- `src/config`: Includes Firebase configuration.
- `src/pages`: Defines main pages like Home, Login, and New Post.
- `src/utils`: Helper functions for the app.

## Technologies Used

- **Frontend**: React.js, TailwindCSS
- **Backend**: Firebase Authentication, Firestore, Cloud Storage
- **Icons**: Lucide React

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Firebase](https://firebase.google.com/) for providing backend services.
- [Lucide React](https://lucide.dev/) for icons.
- [React](https://reactjs.org/) for the frontend framework.
