
# Ανάπτυξη Δυναμικής Εφαρμογής Αγγελιών με Web API, Node.js: Ταυτοποίηση Χρήστη, Αγαπημένες και Φιλτράρισμα [![Static Badge](https://img.shields.io/badge/English-orange)](README.en.md)

### Στόχοι
- Επικοινωνία με το [WikiAds API](https://wiki-ads.onrender.com) για δυναμική εμφάνιση αγγελιών.
- Υλοποίηση ταυτοποίησης χρήστη, λίστας αγαπημένων και φιλτραρίσματος.

### Λειτουργικότητα

1. **ΠΧ1 – Πλοήγηση σε Κατηγορίες**  
   - Δυναμική φόρτωση αγγελιών με Fetch API και Handlebars templates.  
   - Σελίδες: `index.html`, `category.html`, `subcategory.html`.

2. **ΠΧ2 – Προσθήκη Αγαπημένων**  
   - Φόρμα ταυτοποίησης με Fetch API.  
   - Προσθήκη αγγελιών με κλήση υπηρεσιών (Login Service, Add to Favorites).

3. **Bonus – Φιλτράρισμα**  
   - Φιλτράρισμα αγγελιών βάσει υποκατηγοριών.

4. **ΠΧ3 – Προβολή Αγαπημένων**  
   - Σελίδα `favorite-ads.html` με φιλτραρισμένες αγγελίες.

---

### Τεχνολογίες

- **Πελάτης:** HTML, CSS, JavaScript (Fetch API, Handlebars)  
- **Διακομιστής:** Node.js, Express

---

## Οδηγίες Εκτέλεσης

### 1. Εγκατάσταση Εξαρτήσεων

Εκτελέστε την εντολή:

```bash
npm install
```

---

### 2. Εκκίνηση του server για το κύριο backend (`index.js`)

```bash
node index.js
```

ή με αυτόματη επανεκκίνηση κατά τις αλλαγές:

```bash
nodemon index.js
```

---

### 3. Εκκίνηση του server ταυτοποίησης και αγαπημένων (`server.js`) (Για την ΠΧ3)

Για να μπορεί ο χρήστης να κάνει login και να προσθέτει αγαπημένα:

```bash
node server.js
```

ή με nodemon:

```bash
nodemon server.js
```

Ο `server.js` τρέχει στην πόρτα `3000` και περιλαμβάνει τα εξής endpoints:

- `POST /login` – Ταυτοποίηση χρήστη και επιστροφή `sessionId`
- `POST /likeAd` – Προσθήκη αγγελίας στα αγαπημένα
- `POST /getFavoriteAds` – Λήψη των αγαπημένων αγγελιών χρήστη
- `PUT /onRefresh` – Εκκαθάριση λίστας αγαπημένων (κατά την ανανέωση)

> Για πλήρη λειτουργικότητα της εφαρμογής απαιτείται να εκτελούνται **και** τα `index.js` **και** `server.js` ταυτόχρονα.

---

## Χρήσιμες Βιβλιοθήκες

- [Handlebars](https://handlebarsjs.com/guide/): Template engine για δυναμικό HTML
- [express](https://expressjs.com/en/guide/routing.html): Web framework για Node.js
- [uuid](https://www.npmjs.com/package/uuid): Δημιουργία μοναδικών `sessionId`
- [nodemon](https://www.npmjs.com/package/nodemon): Παρακολούθηση και αυτόματη επανεκκίνηση του server

---
