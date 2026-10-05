const categories = document.querySelectorAll(".category");

const selectionContent = document.getElementById("selectionContent");
const selectionTitle = document.getElementById("selectionTitle");
const selectionType = document.getElementById("selectionType");
const selectionPath = document.getElementById("selectionPath");

const selectedCar = document.getElementById("selectedCar");

const power = document.getElementById("power");
const weight = document.getElementById("weight");

const statPower = document.getElementById("statPower");
const statTorque = document.getElementById("statTorque");
const statWeight = document.getElementById("statWeight");
const statDrive = document.getElementById("statDrive");

const garageTitle = document.getElementById("garageTitle");
const garageDescription = document.getElementById("garageDescription");


/* =========================
   CATEGORÍAS
========================= */

categories.forEach(button => {

    button.addEventListener("click", () => {

        categories.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const category = button.dataset.category;

        loadCategory(category);
    });

});


/* =========================
   CARGAR CATEGORÍA
========================= */

function loadCategory(category) {

    selectionContent.innerHTML = "";

    if (category === "car") {

        selectionType.textContent = "VEHICLE";
        selectionTitle.textContent = "SELECT CAR";
        selectionPath.textContent = "Manufacturer → Model";

        loadCars();

        return;
    }

    selectionType.textContent = "COMPONENT";
    selectionTitle.textContent = category.toUpperCase();

    selectionPath.textContent =
        "Manufacturer → Product";

    if (!parts[category]) {

        selectionContent.innerHTML = `
            <div class="option">
                <div class="option-brand">COMING SOON</div>
                <div class="option-name">No parts yet</div>
                <div class="option-info">
                    Database empty
                </div>
            </div>
        `;

        return;
    }

    parts[category].forEach((part, index) => {

        const card = document.createElement("div");

        card.className = "option";

        card.innerHTML = `
            <div class="option-brand">
                ${part.brand}
            </div>

            <div class="option-name">
                ${part.model}
            </div>

            <div class="option-info">
                ${part.info}
            </div>
        `;

        card.addEventListener("click", () => {

            document
                .querySelectorAll(".option")
                .forEach(option => {
                    option.classList.remove("selected");
                });

            card.classList.add("selected");

            selectionPath.textContent =
                `${category.toUpperCase()} → ${part.brand} → ${part.model}`;

        });

        selectionContent.appendChild(card);

    });
}


/* =========================
   AUTOS
========================= */

function loadCars() {

    cars.forEach(car => {

        const card = document.createElement("div");

        card.className = "option";

        card.innerHTML = `
            <div class="option-brand">
                ${car.brand} · ${car.year}
            </div>

            <div class="option-name">
                ${car.model}
            </div>

            <div class="option-info">
                ${car.engine} · ${car.drivetrain}
            </div>
        `;

        card.addEventListener("click", () => {

            document
                .querySelectorAll(".option")
                .forEach(option => {
                    option.classList.remove("selected");
                });

            card.classList.add("selected");

            selectCar(car);

        });

        selectionContent.appendChild(card);

    });

}


/* =========================
   SELECCIONAR AUTO
========================= */

function selectCar(car) {

    selectedCar.textContent =
        `${car.brand} ${car.model}`;

    power.textContent =
        `${car.power} HP`;

    weight.textContent =
        `${car.weight} KG`;

    statPower.textContent =
        `${car.power} HP`;

    statTorque.textContent =
        `${car.torque} NM`;

    statWeight.textContent =
        `${car.weight} KG`;

    statDrive.textContent =
        car.drivetrain;

    garageTitle.textContent =
        car.model.toUpperCase();

    garageDescription.textContent =
        `${car.brand} · ${car.year} · ${car.engine}`;

    selectionPath.textContent =
        `${car.brand} → ${car.model}`;

}


/* =========================
   INICIO
========================= */

loadCategory("car");
