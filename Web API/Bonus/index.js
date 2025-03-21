const express = require('express')
const path = require('path')
const uuid = require('uuid');
const app = express()
const port = 3000

app.listen(port)

/* 
    Serve static content from directory "public",
    it will be accessible under path /, 
    e.g. http://localhost:3000/index.html
*/
app.use(express.static('public'))

// parse url-encoded content from body
app.use(express.urlencoded({ extended: false }))

// parse application/json content from body
app.use(express.json())

// serve index.html as content root
app.get('/', function(req, res){

    var options = {
        root: path.join(__dirname, 'public')
    }

    res.sendFile('index.html', options, function(err){
        console.log(err)
    })
})



class UserDAO {
    constructor() {
        this.users = [
            { username: 'user1', password: 'pass1', favorites: [], sessionId: null },
            { username: 'user2', password: 'pass2', favorites: [], sessionId: null },
            { username: 'user3', password: 'pass3', favorites: [], sessionId: null },
        ];
    }

    getUser(username, password) {
        return this.users.find(u => u.username === username && u.password === password);
    }

    getUserBySessionId(sessionId) {
        return this.users.find(u => u.sessionId === sessionId);
    }
}

class AdDAO {
    constructor() {
        this.ads = [];
    }

    isAdInFavorites(user, adId) {
        return user.favorites.some(fav => fav.id === adId);
    }

    addAdToFavorites(user, ad) {
        user.favorites.push(ad);
    }
}

const userDAO = new UserDAO();
const adDAO = new AdDAO();


// Παραλαβή username, password, ταυτοποίηση και δημιουργία sessionid. Αποστολή sessionid.
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log('Λαμβανόμενα στοιχεία:', username, password);

    const user = userDAO.getUser(username, password);

    if (user) {
        console.log('Επιτυχής ταυτοποίηση.');
        const sessionId = uuid.v4();
        user.sessionId = sessionId;
        res.status(200).json({ success: true, message: 'Επιτυχής ταυτοποίηση.', sessionId });
    } else {
        console.log('Ανεπιτυχής ταυτοποίηση.');
        res.status(401).json({ error: 'Λάθος όνομα χρήστη ή κωδικός πρόσβασης' });
    }
});

// Αν υπάρχει ο user προσθέτει τα αγαπημένα του την διαφημηση.
app.post('/likeAd', (req, res) => {
    const { ad, Gusername, GsessionId } = req.body;
    console.log('Received likeAd request. Username:', Gusername, 'Session ID:', GsessionId);

    const user = userDAO.getUserBySessionId(GsessionId);

    if (!user) {
        return res.status(401).json({ error: 'Unauthorized: Invalid username or session ID' });
    }

    if (!adDAO.isAdInFavorites(user, ad.id)) {
        adDAO.addAdToFavorites(user, ad);
        console.log(user.favorites.length);
    }

    res.status(200).json({ success: true, message: 'Ad liked successfully' });
});

app.put('/onRefresh', (req, res) => {
    // Καθαρισμός των λιστών κάθε χρήστη
    userDAO.users.forEach(user => {
        user.favorites = [];
    });
});

// Επιστρεφει την λίστα με τα αγαπημένα για τον συγκεκριμένο χρήστη.
app.post('/getFavoriteAds', (req, res) => {
    const { username, sessionId } = req.body;

    const user = userDAO.getUserBySessionId(sessionId);

    if (!user || user.username !== username) {
        return res.status(401).json({ error: 'Unauthorized: Invalid username or session ID' });
    }
    const favoriteAds = user.favorites;

    res.status(200).json({ success: true, favoriteAds });
});





