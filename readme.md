# OTM System

The application includes features like email notifications for task assignments and updates, ensuring efficient communication and workflow management. The authentication and authorization are managed through JWT-based secure APIs.


## Installation

1. **Clone the repository:**

   ```bash
   git clone <https://github.com/simran1002/OTM-System.git>
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following variables:

   ```bash
   PORT=5000
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   EMAIL_SERVICE=<your-email-service>
   EMAIL_USERNAME=<your-email-address>
   EMAIL_PASSWORD=<your-email-password>
   ```

## Running the Application

1. **Start the server:**

   ```bash
   npm start
   ```

2. **Verify the server is running:**

   - Open your browser and navigate to `http://localhost:5000`.
   - You should see a message indicating that the server is up and running.

## Testing the Application

### Using Postman

1. **Authentication:**

   - Register a new user via the `/api/auth/register` endpoint.
   - Login using the `/api/auth/login` endpoint to receive a JWT token.

2. **Creating a Task:**

   - Use the `/api/tasks` endpoint to create a task.
   - Make sure to include the JWT token in the Authorization header: `Bearer <your-token>`.

3. **Fetching the assigned Tasks:**

   - Use the `/api/tasks/` endpoint to see tasks of users. Only users with the 'Assigned User' role can see the assigned tasks.

4. **Sending Test Email:**

   - Use the `/api/tasks/send-reminder` endpoint to send a test email.

5. **Update the task:**

   - Use the `/api/tasks/:id` to update the any particular already assigned task.

## API Documentation

OTM-System.postman_collection.json
