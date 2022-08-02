# DonDra Frontend
This is the repository for the frontend of DonDra. This website is deployed on Vercel. Visit <a>dondra.vercel.app</a> to see it in action.

# How to run this project
## Requirements
- Node.js installed
## Steps
1. Clone the repository
2. Open terminal from this project directory
3. Run `npm install`
4. Run `npm run build`
5. Run `npm run start`
6. Open the browser and navigate to <a>http://localhost:3000</a>

# Techstacks used
1. Next.js (12.2.2)
2. React (18.2.0)
3. ioredis (^5.2.2)
4. TailwindCSS
6. Flowbite (^1.5.1)
7. Redis (using Upstash)

# How to use system
## As Admin
1. Login using the admin account. username: admin, password: admin
2. You can view all the users in the system from the homepage and you can search users
3. You can verify user from the Verify page
4. You can approve or reject add or substract balance request from user in the Verify Transaction page

## As User
1. Register a new account.
2. Login to the account.
3. You can view your balance and profile from the homepage.
4. You can transfer to other user from Transfer page. You have to verify the user id to which you want to transfer. After that, you can choose the currency you want and type in the amount you want to transfer. You cannot transfer to yourself or when the user is not valid or you don't have enough balance.
5. You can request to add or substract balance from Request page. Select the request type. Then, choose the currency and type in the amount you want. You cannot send request if you don't have enough balance when you want to substract.
6. You can view all your transaction history, including moneytory and transfer, from History page. The maximum number of history in one page is 5.

# Author
- <a href = "https://github.com/Adityapnn811">Aditya Prawira Nugroho (13520049)</a>