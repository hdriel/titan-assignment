
# Senior Full Stack Home Assignment

## Description

This project was developed as part of the Senior Full Stack role recruitment process at TITAN. It consists of three key features:

1. **Photo URL Generator**: An endpoint that accepts a number and returns a list of photo URLs from the Pixabay API.
2. **Order Creation**: An endpoint that accepts order details and stores them in the database.
3. **Order Retrieval**: An endpoint that fetches all orders for a specific user.

The application uses **Node.js**, **Express**, **TypeScript**, and **Mongoose** for handling requests and interacting with the database. The application also caches API responses to manage the Pixabay rate limit and includes a Docker configuration for easy deployment.

## Installation and Setup

To get the project up and running, follow these steps:

1. Clone the repository.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the project:

   ```bash
   npm run build
   ```

4. Start the server:

   ```bash
   npm start
   ```

### Environment Variables

Ensure you have a `.env` file with the following variables:

```bash
PIXABAY_API_KEY=45640711-3b2c9c3e0dd9ac6e6a5b798be
MONGODB_URI=<your-mongodb-uri>
```

### Docker Deployment

To run the application in Docker, use the provided Docker configuration:

```bash
docker-compose up -d
```

## API Endpoints

### 1. Fetch Photo URLs

- **Endpoint**: `/images`
- **Method**: `GET`
- **Description**: Returns a list of photo URLs from the Pixabay API based on the provided number.
- **Parameters**:
    - `number` (param) - The number of photo URLs to return.

- **Response**:
  ```json
  {
    "photos": ["url1", "url2", "..."]
  }
  ```

### 2. Create an Order

- **Endpoint**: `/orders`
- **Method**: `POST`
- **Description**: Creates a new order with the provided details and stores it in the database.
- **Request Body**:
  ```json
  {
    "email": "example@example.com",
    "fullName": "John Doe",
    "fullAddress": "123 Main St, City, Country",
    "imageUrls": ["url1", "url2"],
    "frameColor": "black",
    "user": "userId"
  }
  ```

- **Response**:
  ```json
  {
    "_id": "orderId",
    "email": "example@example.com",
    "fullName": "John Doe",
    "fullAddress": "123 Main St, City, Country",
    "imageUrls": ["url1", "url2"],
    "frameColor": "black",
    "user": "userId",
    "createdAt": "2024-09-28T12:34:56Z"
  }
  ```

### 3. Fetch Orders by User

- **Endpoint**: `/orders/:userId`
- **Method**: `GET`
- **Description**: Returns a list of all orders associated with a specific user.
- **Response**:
  ```json
  [
    {
      "_id": "orderId",
      "email": "example@example.com",
      "fullName": "John Doe",
      "fullAddress": "123 Main St, City, Country",
      "imageUrls": ["url1", "url2"],
      "frameColor": "black",
      "user": "userId",
      "createdAt": "2024-09-28T12:34:56Z"
    },
    ...
  ]
  ```

## Technologies Used

- **Node.js**
- **Express**
- **TypeScript**
- **Mongoose** (MongoDB ORM)
- **Axios** (for handling API requests)
- **Winston** (for logging)
- **dotenv** (for environment variable management)

## Caching Strategy

To handle Pixabay’s rate limits, the application implements local caching. Responses from the Pixabay API are cached for 60 seconds by default. If the same request is made within this period, the cached data is returned instead of querying the API again.

## Database

The project uses **MongoDB** with Mongoose for managing users and orders. The order schema includes fields like `email`, `fullName`, `fullAddress`, `imageUrls`, `frameColor`, and `user`.

## Edge Cases

Edge cases were not fully implemented due to time constraints. Future improvements may include better validation for inputs and handling potential errors such as invalid API responses or database issues.

## Future Improvements

- **Edge case handling**: Implement better error handling and validation.
- **Testing**: Add unit and integration tests to ensure code robustness.
- **Swagger**: Add swagger to test the server api in easy way
- **Migration**: Add mongo-migrate to init the db with some initial dats

