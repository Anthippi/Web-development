// Κάνει split το οποιο χαρακτήρα του δώσεις.
Handlebars.registerHelper('split', function (string, separator) {
    return string.split(separator);
});

// fetch για τις κατηγορίες.
document.addEventListener('DOMContentLoaded', function () {

    fetch('https://wiki-ads.onrender.com/categories')
        .then(response => response.json())
        .then(data => {
            console.log('JSON categories:', data);
            return data;
        })
        .then(categories => {
            Promise.all(categories.map(category => fetchSubcategoriesList(category.id)))
                .then(subcategories => {
                    categories.forEach((category, index) => {
                        category.subcategories = subcategories[index];
                    });
                    displayCategoriesWithHandlebars(categories);
                })
                .catch(error => console.error('Error fetching subcategories:', error));
        })
        .catch(error => console.error('Error fetching categories:', error));
});



// fetch για τη λίστα με τις υποκατηγορίες.
function fetchSubcategoriesList(categoryId) {
    return fetch(`https://wiki-ads.onrender.com/categories/${categoryId}/subcategories`)
        .then(response => response.json())
        .then(data => {
            console.log('JSON subcategories:', data);
            return data;
        })
        .catch(error => {
            console.error(`Error fetching subcategories for category ${categoryId}:`, error);
            return [];
        });
}

document.addEventListener('DOMContentLoaded', function () {
    // Χρησιμοποιήστε το Handlebars template
    const subcategoriesTemplateSource = document.getElementById('subcategories-template').innerHTML;
    const subcategoriesTemplate = Handlebars.compile(subcategoriesTemplateSource);


    // Καλέστε τη συνάρτηση fetchSubcategoriesList για να πάρετε τα δεδομένα
    fetchSubcategoriesList(getIdFromUrl())
        .then(subcategoriesData => {
            // Προσθέστε τα δεδομένα στο HTML
            const subcategoriesListContainer = document.getElementById('subcategories-list');
            subcategoriesListContainer.innerHTML = subcategoriesTemplate({ subcategoriesData });
        })
        .catch(error => console.error('Error fetching subcategories:', error));
});

// Handlebars για τις κατηγορίες και τι λίστα με τις υποκατηγορίες.
function displayCategoriesWithHandlebars(categories) {
    const categoriesListElement = document.getElementById('categoriesList');

    if (categoriesListElement) {
        // Παίρνουμε το template από τον HTML
        const source = document.getElementById('category-template').innerHTML;
        const template = Handlebars.compile(source);

        // Εφαρμόζουμε τα δεδομένα στο template
        const html = template({ categories });

        // Ενσωμάτωση του HTML στο στοιχείο της σελίδας
        categoriesListElement.innerHTML = html;
    }
}


// Παίρνει τα id από το URL
function getIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

document.addEventListener('DOMContentLoaded', function () {
    const categoryId = getIdFromUrl();
    if (categoryId) {
        fetchAds(categoryId)
            .then(ads => {
                displayAdsWithHandlebars(ads);
            })
            .catch(error => console.error('Error fetching ads:', error));
    }
});

// Δημιουργία παγκόσμιας μεταβλητής για αποθήκευση των δεδομένων
let cachedAdsData = null;

function fetchAds(categoryId) {
    // Έλεγχος αν τα δεδομένα υπάρχουν ήδη στην cachedAdsData
    if (cachedAdsData) {
        // Χρήση των αποθηκευμένων δεδομένων χωρίς νέο αίτημα προς τον διακομιστή
        return Promise.resolve(cachedAdsData);
    } else {
        // Κάνετε το αίτημα fetch όπως πριν
        return fetch(`https://wiki-ads.onrender.com/ads?category=${categoryId}`)
            .then(response => response.json())
            .then(data => {
                // Αποθηκεύστε τα δεδομένα στην cachedAdsData για μελλοντική χρήση
                cachedAdsData = data;
                console.log('JSON all ads:', data);
                return data;
            })
            .catch(error => {
                // Εκτύπωση σφάλματος στο console
                console.error(`Error fetching ads for category ${categoryId}:`, error);

                // Επιστροφή κενού πίνακα
                return [];
            });
    }
}

//display για τις αγγελίες των κατηγοριών
function displayAdsWithHandlebars(ads) {
    // Έλεγχος για refresh.
    const isRefreshing = performance.navigation.type === 1;
    if (isRefreshing) {
        clearLists();
    }

    const adsListElement = document.getElementById('adsList');

    // Προσθήκη ελέγχου για το αν βρισκόμαστε στη σελίδα subcategory.html
    const isSubcategoryPage = window.location.pathname.includes('subcategory.html');
    if (adsListElement && !isSubcategoryPage) {
        const source = document.getElementById('ad-template').innerHTML;
        const template = Handlebars.compile(source);
        const html = template({ ads });
        adsListElement.innerHTML = html;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const subcategoriesId = getIdFromUrl();
    if (subcategoriesId) {
        fetchSubcategories(subcategoriesId)
            .then(subcategories => {
                displaySubcategoriesWithHandlebars(subcategories);
            })
            .catch(error => console.error('Error fetching and displaying subcategories:', error));
    }
});

// Συνάρτηση για την ανάκτηση των υποκατηγοριών μέσω δικτύου
function fetchSubcategories(subcategoriesId) {
    return fetch(`https://wiki-ads.onrender.com/ads?subcategory=${subcategoriesId}`)
        .then(response => response.json())
        .then(data => {
            console.log('JSON ads from a sub:', data);
            return data;
        })
        .catch(error => {
            console.error(`Error fetching and displaying subcategories: ${subcategoriesId}:`, error);
            return [];
        });
}


// Συνάρτηση για την εμφάνιση των υποκατηγοριών με χρήση του Handlebars
function displaySubcategoriesWithHandlebars(subcategories) {
    const subcategoryDataElement = document.getElementById('subcategoryData');

    if (subcategoryDataElement) {
        const source = document.getElementById('subcategory-data-template').innerHTML;
        const template = Handlebars.compile(source);
        const html = template({ ads: subcategories });
        subcategoryDataElement.innerHTML = html;
    }
}

let Gusername;
let GsessionId;

function submitForm() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessageElement = document.getElementById('errorMessage');
    const successMessageElement = document.getElementById('successMessage');

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
        .then(response => {
            if (response.status === 401) {
                throw new Error('Unauthorized: Invalid username or password');
            } else if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            } else {
                console.log(`${response.status}`)
            }
            return response.json();
        })
        .then(data => {
            Gusername = username;
            GsessionId = data.sessionId;
            // Επιπλέον έλεγχος
            if (Gusername && GsessionId) {
                console.log('Login successful. Session ID:', data.sessionId);
                errorMessageElement.textContent = '';
                successMessageElement.textContent = 'Login successful!';
            } else {
                throw new Error('Failed to set global variables');
            }
        })
        .catch(error => {
            console.error('Login failed:', error.message);
            errorMessageElement.textContent = error.message;
            successMessageElement.textContent = '';
        });
}

function likedAd(id, title, description, cost, img) {
    const ad = { id, title, description, cost, img };

    if (!Gusername || !GsessionId) {
        // Αν δεν έχει συνδεθεί ο χρήστης, εμφάνισε ένα alert
        alert('Παρακαλώ συνδεθείτε για προσθήκη στη λίστα αγαπημένων');
        return;
    }

    console.log('Liking ad. Username:', Gusername, 'Session ID:', GsessionId);

    fetch("http://localhost:3000/likeAd", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ad, Gusername, GsessionId }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('LikeAd response:', data);

            // Εάν η απάντηση είναι επιτυχής, αλλάξτε την εμφάνιση του κουμπιού
            const likeButton = document.querySelector(`button[onclick="likedAd('${id}', '${title}', '${description}', '${cost}', '${img}')"]`);
            if (likeButton) {
                likeButton.classList.add('liked');
            }
        })
        .catch(error => {
            console.error('Error liking ad:', error.message);
        });
}



function clearLists() {
    // Κλήση του endpoint onRefresh για καθαρίσει τις λίστες με τις αγγελίες.
    fetch("http://localhost:3000/onRefresh", {
        method: 'PUT',
    })
}

function goToFavoriteAds() {
    // Εάν έχετε ήδη κάνει login μπορεί να μεταφερθεί.
    if (Gusername && GsessionId) {
        window.location.href = `favorite-ads.html?username=${encodeURIComponent(Gusername)}&sessionId=${encodeURIComponent(GsessionId)}`;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    const sessionId = urlParams.get('sessionId');

    // Εάν τα username και sessionId βρίσκονται στο URL, τότε κάνε το αίτημα
    if (username && sessionId) {
        getFavoriteAds(username, sessionId)
            .then(favoriteAds => {
                console.log("favoriteAds", favoriteAds)
                displayFavoriteAdsWithHandlebars(favoriteAds);
            })
            .catch(error => {
                console.error('Error:', error.message);
            });
    }
});

// Κώδικας για την αίτηση προς τον διακομιστή παραμένει όπως είχε προηγουμένως
function getFavoriteAds(username, sessionId) {
    const requestData = {
        username: username,
        sessionId: sessionId,
    };

    return fetch('http://localhost:3000/getFavoriteAds', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            throw new Error(`Error fetching favorite ads: ${error.message}`);
        });
}


function displayFavoriteAdsWithHandlebars(response) {
    const favoriteAds = response.favoriteAds;
    const templateData = { favoriteAds };

    const adTemplateSource = document.getElementById('ad-template').innerHTML;
    const adTemplate = Handlebars.compile(adTemplateSource);

    const adsContainer = document.getElementById('ads-container');
    const adHtml = adTemplate(templateData);
    adsContainer.insertAdjacentHTML('beforeend', adHtml);
}


document.addEventListener('DOMContentLoaded', function () {
    const subcategoriesListContainer = document.getElementById('subcategories-list');

    // Προσθήκη event listener για την αλλαγή της επιλεγμένης υποκατηγορίας
    subcategoriesListContainer.addEventListener('change', function (event) {
        const selectedSubcategoryId = event.target.value;

        // Κλήση της συνάρτησης για φιλτράρισμα των αγγελιών με βάση το επιλεγμένο ID
        filterAdsBySubcategoryId(selectedSubcategoryId);
    });
});

function filterAdsBySubcategoryId(subcategoryId) {
    const allAds = cachedAdsData;

    // Εάν η επιλεγμένη υποκατηγορία είναι "subcategory-all", εμφανίστε όλες τις αγγελίες
    if (subcategoryId === 'all') {
        displayAdsWithHandlebars(allAds);
    } else {
        // Φιλτράρισμα των αγγελιών με βάση το επιλεγμένο ID
        const filteredAds = allAds.filter(ad => ad.subcategory_id == subcategoryId);

        // Προβολή των φιλτραρισμένων αγγελιών
        displayAdsWithHandlebars(filteredAds);
    }
}
