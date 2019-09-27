# Point Of Sales App Restful API NodeJs
Restful API for simple store application using Express.js

# How to use it ?

1. Install Despendencies
    - [Install Node Js](https://nodejs.org/en/)
2. Go to the project root directory 
3. Run npm install
4. Start using npm
5. Import master_product.sql
6. Open postman for Get, Post, Path, Delete data

# Features
 - CRUD Products
 - CRUD Categories
 - Add/Reduce Products (Quantity)
 - Search product by name
 - Sort product by name, category, date updated
 - Pagination
 - Cannot reduce Order below 0 (-1, -5, etc)
 - Allowed CORS
 - Push to GitHub repository with good README
 - Optional: Login/Register with JWT
 
 # Data Requirements
 - Product name
 - Product description
 - Product Image
 - Product category
 - Product price
 - Date added
 - Date updated

 # Dependencies
 - body-parser ```bash npm i body-parser  ```

 # API List

 ## Product
 
 - **/products**                : for get all data products  
 - **/products/add**            : for add data products  
 - **/products/update/:id**     : for update data products  
 - **/products/delete/:id**     : for delete data products  
 - **/products/sort/:data**     : for sort data products  
 - **/products/search/:name**   : for sort search products  
 - **/products/reduce/:name**   : for sort reduce products
 
 ## Categories

 - **/categories**              : for get all data categories
 - **/categories/add**          : for add data categories
 - **/categories/:id**          : for update data categories
 - **/categories/:id**          : for delete data categories

## User

 - **/users**                   : for get all data users              
 - **/users/login**             : for login data users              
 - **/users/add**               : for add data users              
