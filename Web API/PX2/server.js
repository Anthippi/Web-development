const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const cors = require('cors');

const app = express();
const port = 3000;

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

app.use(cors());
app.use(bodyParser.json());


app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log('Λαμβανόμενα στοιχεία:', username, password);

    const user = userDAO.getUser(username, password);

    if (user) {
        console.log('Επιτυχής ταυτοποίηση.');
        const sessionId = uuid.v4();
        user.sessionId = sessionId;
        res.json({ sessionId });
    } else {
        console.log('Ανεπιτυχής ταυτοποίηση.');
        res.status(401).json({ error: 'Λάθος όνομα χρήστη ή κωδικός πρόσβασης' });
    }
});

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

    res.json({ success: true, message: 'Ad liked successfully' });
});

app.get('/onRefresh', (req, res) => {
    console.log(`Είμαι καθαρός!`);

    // Καθαρισμός των λιστών κάθε χρήστη
    userDAO.users.forEach(user => {
        user.favorites = [];
    });

    res.json({ success: true, message: 'Είμαι καθαρός! Οι λίστες έχουν καθαριστεί.' });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});