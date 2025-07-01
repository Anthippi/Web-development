
# Dynamic Ads Application with Web API, Node.js: User Authentication, Favorites, and Filtering 

### Objectives
- Communicate with the [WikiAds API](https://wiki-ads.onrender.com) for dynamic ad display.
- Implement user authentication, favorites list, and filtering functionality.

### Functionality

1. **[PX1 – Navigate by Category](https://github.com/Anthippi/Web-development/tree/main/Web%20API/PX1)**  
   - Dynamically load ads using Fetch API and Handlebars templates.  
   - Pages: `index.html`, `category.html`, `subcategory.html`

2. **[PX2 – Add to Favorites](https://github.com/Anthippi/Web-development/tree/main/Web%20API/PX2)**  
   - User authentication form using Fetch API.  
   - Add ads to favorites through API calls (Login Service, Add to Favorites).

3. **[Bonus – Filtering](https://github.com/Anthippi/Web-development/tree/main/Web%20API/Bonus)**  
   - Filter ads based on subcategories.

4. **[PX3 – View Favorites](https://github.com/Anthippi/Web-development/tree/main/Web%20API/PX3)**  
   - Page `favorite-ads.html` displaying the user's filtered favorite ads.

---

### Technologies

- **Client:** HTML, CSS, JavaScript (Fetch API, Handlebars)  
- **Server:** Node.js, Express

---

## Running Instructions

### 1. Install Dependencies

Run the following command:

```bash
npm install
```

---

### 2. Start the main backend server (`index.js`)

```bash
node index.js
```

or with auto-restart on changes:

```bash
nodemon index.js
```

---

### 3. Start the authentication and favorites server (`server.js`) (For PX3)

To allow users to log in and add favorites:

```bash
node server.js
```

or with nodemon:

```bash
nodemon server.js
```

The `server.js` runs on port `3000` and exposes the following endpoints:

- `POST /login` – User authentication and return of `sessionId`
- `POST /likeAd` – Add ad to user's favorites
- `POST /getFavoriteAds` – Retrieve the user's favorite ads
- `PUT /onRefresh` – Clear all users' favorites (e.g., on refresh)

> For full application functionality, both `index.js` and `server.js` must be running simultaneously.

---

## Useful Libraries

- [Handlebars](https://handlebarsjs.com/guide/): Template engine for dynamic HTML generation
- [express](https://expressjs.com/en/guide/routing.html): Web framework for Node.js
- [uuid](https://www.npmjs.com/package/uuid): For generating unique `sessionId`
- [nodemon](https://www.npmjs.com/package/nodemon): Automatically restarts the Node.js server when files change

---
