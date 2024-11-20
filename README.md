
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
