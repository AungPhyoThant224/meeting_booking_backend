# Meeting Booking Backend

## Tech Stack

- Runtime: Node.js
- Framework: Express.js
- ORM: Prisma 7
- Database: PostgreSQL (Supabase)

## Setup

1.  **Prerequisites**
    - Node.js
    - PostgreSQL

2.  **Installation**
    - Clone the repository and install dependencies:
    
    <br>
    
    ```bash
    git clone https://github.com/AungPhyoThant224/meeting_booking_backend.git
    cd meeting_booking_backend
    npm install

3.  **Environment Configuration**
    - Create a .env file in the the root directory:

    <br>

    ```sh
    DATABASE_URL="postgresql://postgres:password@localhost:5432/your_db_name?schema=public"
    ALLOWED_ORIGINS="http://localhost:5173"
    PORT=3000
    NODE_ENV=development

4.  **Database Setup**
    - Sync your database schema and generate the Prisma Client:

    <br>

    ```
    npx prisma generate
    npx prisma db push
    npx prisma db seed

5.  **Running Locally**
    - The API will be available at http://localhost:3000:

    <br>

    ```bash
    npm run dev

## Default Credentials (Seeded)

After running the seed command, use these to test:
- Admin Email: ```admin@system.com```
- Admin Password: ```admin123```

## API Endpoints

1.  **Authentication**
    - POST ```/api/auth/login```: Authenticate users.

2.  **Users (Admin Only)**
    - GET ```/api/users``` : Get all users.
    - POST ```/api/users``` : Create new user.
    - DELETE ```/api/users/:id``` : Delete user.
    - PATCH ```/api/users/:id/role``` : Update user's role.

3.  **Bookings**
    - GET ```/api/bookings``` : Get all bookings.
    - POST ```/api/bookings``` : Create new booking.
    - DELETE ```/api/bookings/:id``` : Delete booking.
    - PUT ```/api/bookings/:id``` : Update booking.
    - GET ``/api/bookings/summary``` : Get bookings summary (Admin, Owner).