// Výběr prvků z HTML dokumentu podle tříd
let openShopping = document.querySelector('.shopping');         // Tlačítko/ikona pro otevření košíku
let closeShopping = document.querySelector('.closeShopping');   // Tlačítko pro zavření košíku
let list = document.querySelector('.list');                     // Seznam produktů (div, kam se vypisují)
let listCard = document.querySelector('.listCard');             // Seznam položek v košíku
let body = document.querySelector('body');                      // Celý HTML dokument pro přidání/odebrání třídy
let total = document.querySelector('.total');                   // Zobrazení celkové ceny
let quantity = document.querySelector('.quantity');             // Zobrazení počtu položek v košíku

// Otevření košíku – přidá třídě body class "active"
openShopping.addEventListener('click', () => {
    body.classList.add('active');
});

// Zavření košíku – odebere třídě body class "active"
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

// Pole s produkty (každý produkt má id, název, obrázek a cenu)
let products = [
    {
        id: 1,
        name: 'Pánský dres Etape COMFORT',
        image: 'dres_2.jpg',
        price: 749
    },
    {
        id: 2,
        name: 'Dětský dres Klimatex',
        image: 'dres_1.jpg',
        price: 399
    },
    {
        id: 3,
        name: 'Dětský dres Klimatex JOPPE',
        image: 'dres_3.jpg',
        price: 399
    },
    {
        id: 4,
        name: 'Pánský dres Arcore JANGO',
        image: 'dres_4.jpeg',
        price: 749
    },
    {
        id: 5,
        name: 'APO 29 žluté M',
        image: 'kolo_2.jpg',
        price: 8990
    },
    {
        id: 6,
        name: 'NIMBA 29 černá XL',
        image: 'kolo_1.jpg',
        price: 7990
    },
    {
        id: 6,
        name: 'APO LADY 27.5 AKCE fialové L',
        image: 'kolo_3.jpg',
        price: 8990
    },
    {
        id: 6,
        name: 'NIMBA LADY 29 AKCE černá M',
        image: 'kolo_4.jpg',
        price: 7990
    }
];

// Pole pro ukládání položek v košíku
let listCards = [];

// Funkce pro inicializaci produktů na stránce
function initApp(){
    // Pro každý produkt vytvoří HTML blok a vloží ho do seznamu
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');    // Nový div pro produkt
        newDiv.classList.add('item');                  // Přidání CSS třídy "item"
        newDiv.innerHTML = `
            <img src="../obrazky/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Koupit</button>`;
        list.appendChild(newDiv);                      // Vložení produktu do seznamu
    });
}

// Spuštění funkce při načtení stránky
initApp();

// Přidání produktu do košíku
function addToCard(key){
    if(listCards[key] == null){
        // Pokud produkt v košíku ještě není, přidá se (kopie objektu produktu)
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1; // Nastaví množství na 1
    }
    reloadCard(); // Aktualizace košíku
}

// Překreslení (obnovení) košíku – aktualizace položek, cen a počtu
function reloadCard(){
    listCard.innerHTML = '';        // Vyčistí starý obsah seznamu
    let count = 0;                  // Počítadlo množství
    let totalPrice = 0;            // Součet cen

    // Projde všechny položky v košíku
    listCards.forEach((value, key) => {
        totalPrice = totalPrice + value.price;     // Přičte cenu k celkové ceně
        count = count + value.quantity;            // Přičte množství

        if(value != null){
            let newDiv = document.createElement('li'); // Vytvoří nový <li> prvek pro košík
            newDiv.innerHTML = `
                <div><img src="../obrazky//${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv); // Přidá prvek do košíku
        }
    });

    total.innerText = totalPrice.toLocaleString(); // Zobrazí celkovou cenu
    quantity.innerText = count;                    // Zobrazí počet položek
}

// Funkce pro změnu množství položky v košíku
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key]; // Pokud je 0 kusů, smaže se z košíku
    } else {
        listCards[key].quantity = quantity; // Nastaví nové množství
        listCards[key].price = quantity * products[key].price; // Přepočítá cenu
    }
    reloadCard(); // Aktualizuje košík
}