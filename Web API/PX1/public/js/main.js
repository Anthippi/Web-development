
// Προσθέστε τον custom helper split στο Handlebars
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

//fetch για τις αγγελίες των κατηγοριών
function fetchAds(categoryId) {
    return fetch(`https://wiki-ads.onrender.com/ads?category=${categoryId}`)
        .then(response => response.json())
        .then(data => {
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
//display για τις αγγελίες των κατηγοριών
function displayAdsWithHandlebars(ads) {
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