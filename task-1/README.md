## Top Investors
#### Pre-requisites
- NodeJS 18.x
- PostgreSQL 15.x
- .env file
#### Run the following commands in order to start
- `npm i`
- `npx prisma migrate dev`
- `npm run start:dev`
- The server should be up and running on port 4000 by default
- Paste this URL [http://localhost:4000/investors/top-investors](http://localhost:4000/investors/top-investors) in the browser and you should get the top 5 investors
- The API endpoints are not authenticated for now. But it should be authenticated using middleware, preferably with JWT token for security