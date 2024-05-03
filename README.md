## Setup

1. cd into client and install the package manager:
```
npm install
```
2. Start the client:
```
npm run dev
```

2. cd into backend. Remember to set up following .env variables:
DB_HOST
DB_USER
DB_PASS
RESEND_API_KEY
SESSION_SECRET

3. Setup the package manager in backend:
```
npm install
```
4. Create database:
```
npm run database-create
```
If you want it without dummy data:
```
npm run database-update
```
5. Start the server:
```
node app.js
```

