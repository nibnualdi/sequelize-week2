## SETTING UP APP

> 1. install all the packages run this code :
>    `npm install`

> 2. set up your database config on [src/config/config.json](src/config/config.json).

> 3. make the database based on config.json :
>    `npx sequelize db:create`

> 4. generate the tables :
>    `npx sequelize db:migrate`

> 5. run the app :
>    `npm run dev`

## API Doc

> base url `http://localhost:3000`

> create 5 users at the same time :
>   `POST` `/users`

> get total users :
>   `GET` `/total`

> get paginated users :
>   `GET` `/paginate`
>   **`body`**
>   **`page :`** `(integer) get page. Default value 1`
>   `example : { "page": 2 }`
>   **`limit :`** `(integer) the data that shown in a page. Default value 2`
>   `example : { "limit": 4 }`

> get relations users to profile (LEFT, INNER, RIGHT JOIN) :
>   `GET` `/details`
>   **`body`**
>   **`join :`** `(string) enum "LEFT" || "INNER" || "RIGHT". Default value "INNER"`
>   `example : { "join": "RIGHT" }`
