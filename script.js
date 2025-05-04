// script.js for Bryan's Café Project

// Update the footer with the current year and form handler
document.addEventListener("DOMContentLoaded", () => {
    const yearElement = document.getElementById("year");
    const currentYear = new Date().getFullYear();
    if (yearElement) {
        yearElement.textContent = currentYear;
    }

    // Handle form submission
    const form = document.querySelector("#contact form");
    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault(); // Prevent actual form submission

            // Simple notification of submission
            alert("Thank you! Your message has been sent.");

            // Reset the form fields
            form.reset();
        });
    }

    // Load both XMLs when DOM is ready
    loadBranches();
    loadMenu();
});

async function loadBranches() {
    const response = await fetch('branches.xml');
    const xml = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, 'application/xml');

    const branches = xmlDoc.querySelectorAll('branch');
    const branchList = document.getElementById('branch-list');
    if (!branchList) return;

    branches.forEach(branch => {
        const name = branch.querySelector('name').textContent;
        const phone = branch.querySelector('phone').textContent;
        const hours = branch.querySelector('hours').textContent;
        const mapLink = branch.querySelector('mapLink').textContent;

        const branchItem = `
            <li>
                <strong>${name}</strong><br>
                Phone: ${phone}<br>
                Hours: ${hours}<br>
                <a href="${mapLink}" target="_blank">View on Google Maps</a>
            </li>
        `;
        branchList.innerHTML += branchItem;
    });
}

async function loadMenu() {
    const response = await fetch('menu.xml');
    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'application/xml');

    const meals = xmlDoc.querySelectorAll('meal');
    const hotBeverages = xmlDoc.querySelectorAll('hotBeverages > beverage');
    const otherBeverages = xmlDoc.querySelectorAll('otherBeverages > beverage');

    const mealsList = document.getElementById('meals-list');
    const beveragesList = document.getElementById('beverages-list');
    if (!mealsList || !beveragesList) return;

    // Meals (with image)
    meals.forEach(meal => {
        const name = meal.querySelector('name').textContent;
        const price = meal.querySelector('price').textContent;
        const desc = meal.querySelector('description').textContent;
        const image = meal.querySelector('image')?.textContent || '';

        const li = document.createElement('li');
        li.innerHTML = `
            <img src="images/${image}" alt="${name}" width="200"><br>
            <strong>${name}</strong><br>
            Price: $${price}<br>
            ${desc}
        `;
        mealsList.appendChild(li);
    });

    // Hot Beverages
    hotBeverages.forEach(bev => {
        const size = bev.querySelector('size').textContent;
        const price = bev.querySelector('price').textContent;
        const desc = bev.querySelector('description').textContent;

        const li = document.createElement('li');
        li.innerHTML = `<strong>${size} Coffee</strong><br>Price: $${price}<br>${desc}`;
        beveragesList.appendChild(li);
    });

    // Other Beverages
    otherBeverages.forEach(bev => {
        const name = bev.querySelector('name').textContent;
        const price = bev.querySelector('price').textContent;

        const li = document.createElement('li');
        li.innerHTML = `<strong>${name}</strong><br>Price: $${price}`;
        beveragesList.appendChild(li);
    });
}
