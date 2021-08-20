// Get Elements

const main = document.getElementById('main')
const doubleBtn = document.getElementById('double-money')
const millionare = document.getElementById('millionares')
const richest = document.getElementById('richest')
const addUserBtn = document.getElementById('add-user')
const totalWealth = document.getElementById('total-wealth')

getRandomUser();
getRandomUser();

let data = []
// Fetch random user and add money

async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api')
    const data = await res.json()

    let user = data.results[0]

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }

    addNewUser(newUser)

}

// Add new obj to data arr

function addNewUser(obj) {
    data.push(obj)
    updateDOM()
}

// Update DOM

function updateDOM(providedData = data) {
    // CLear Main div

    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    providedData.forEach(item => {
        const element = document.createElement('div')
        element.classList.add('person')
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`
        main.appendChild(element)
    })
}

// Double Money

function doubleMoney() {
    data = data.map(user => {
        return { ...user, money: user.money * 2 }
    });

    updateDOM()
}


// Sort By Richest

function sortByRichest() {
    data = data.sort((a, b) => b.money - a.money)
    updateDOM()
}


// Format as money
function formatMoney(money) {
    return (money).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });
}

// Filter millionares
function filterMillionare() {
    data = data.filter(user => user.money > 1000000)
    updateDOM()
}

// Calculate Entire Wealth
function calculateEntireWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0)

    const wealthElement = document.createElement('div')
    wealthElement.className = 'total'
    wealthElement.innerHTML = `<h3>Total Wealth:<strong>${formatMoney(wealth)}</strong>`
    main.appendChild(wealthElement)

}


// AddEventListeners

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney)
richest.addEventListener('click', sortByRichest)
millionare.addEventListener('click', filterMillionare)
totalWealth.addEventListener('click', calculateEntireWealth)