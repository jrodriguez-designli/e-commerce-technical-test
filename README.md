
1. Create a .env file 

# Database credentials
DB_HOST=ep-morning-tree-a6hefljg.us-west-2.retooldb.com
DB_USER="retool"
DB_PASSWORD="gjRqSiDd1tA0"
DB_NAME="retool"
DB_PORT=5432
DB_SSLMODE=require

# jwt
JWT_SECRET=secret
JWT_EXPIRATION=1h
AUTH_SECRET_KEY=secret1234567


2. run docker rabbitMq locally =>  docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:management

2. Run => npm run start or npm run start:dev

3. We are using sequalize as ORM, so Sequelize is more complex and less intuitive for strict typing and relationships. Prisma simplifies complex queries and migrations, which can be more tedious in Sequelize. And also don't have Connect feature, to make relationships easier.

4. Postman Collection: 
https://www.postman.com/bloodknot/workspace/public/collection/33876739-60a04e9e-e368-44f6-ae73-f9697f6ca3bf?action=share&creator=33876739&active-environment=33876739-eb0a91f0-56b4-44a0-be7a-a9ac31865b79

5. If another db is used, Executes all pending migrations to update the database schema: *** npm run migrate ***, 
to run seeds: ***npm run seed:all ****

***Instructions for Running the Application***
1. Register a User:

  - Use the POST /auth/register-local endpoint to create a new user.
  - Provide the necessary data (e.g., email and password) in the request body.

2. Authenticate and Get Access Token:

- Log in using the POST /auth/login-local endpoint.
- Provide the credentials you used during registration (e.g., email and password).
- The response will include an access token.

3. Set the Access Token:

- Copy the access_token from the login response.
- Go to Postman Environment Variables and set the token as a variable. This will allow it to be automatically used in authenticated requests.

4. Get User  Information:

- Use the GET /user/get-one endpoint to retrieve your user profile.
- Alternatively, check the sub (subject) field in your access token payload to identify your user ID.

5. Create a Profile:

- Use the POST /profile/create-profile endpoint to create a profile.
- Provide the necessary information, such as first_name, last_name, and any other required fields.

6. Manage Products:

 - Create a Product:
  - Use the POST /products/create-product endpoint.
  - Provide the product details like name, description, price, and stock.
 - Get All Products:
   - Use the GET /products/find-all-product endpoint to list all products.
 - Update a Product:
   - Use the PATCH /products/update-product endpoint and provide the product ID in the request.
 - Delete a Product:
   - Use the DELETE /products/delete-product endpoint with the product ID.

7. Create and Manage Orders:

- Create an Order:
  - Use the POST /orders/create-order endpoint.
  - Provide details like the product ID, quantity, and any other required fields.
  - Note: The payment process is simulated with a 50% chance of failure and includes retries.
- Get a Single Order:
  - Use the GET /orders/get-one-order endpoint with the order ID.
- Get All Orders:
  - Use the GET /orders/get-all-order endpoint to list all orders.

