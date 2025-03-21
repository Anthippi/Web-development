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

3. **ΠΧ3 – Προβολή Αγαπημένων**  
   - Σελίδα `favorite-ads.html` με φιλτραρισμένες αγγελίες.

4. **Bonus – Φιλτράρισμα**  
   - Φιλτράρισμα αγγελιών βάσει υποκατηγοριών.

### Τεχνολογίες
- **Πελάτης:** HTML, CSS, JavaScript (Fetch API, Handlebars).
- **Διακομιστής:** Node.js, Express, MongoDB (προαιρετικά).
