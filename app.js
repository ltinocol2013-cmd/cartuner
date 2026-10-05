/* =====================================================
   CAR BUILDER
   MAIN APPLICATION
===================================================== */


/* =====================================================
   STATE
===================================================== */

const state = {

    selectedCarId: null,

    selectedCategory: "car",

    selectedBrand: null,

    installed: {

        engine: null,
        turbo: null,
        intake: null,
        exhaust: null,
        intercooler: null,
        radiator: null,
        clutch: null,
        differential: null,
        wheels: null,
        tires: null,
        brakes: null,
        suspension: null,
        body: null,
        interior: null,
        paint: null

    },

    paint: "#222222"

};


/* =====================================================
   DOM ELEMENTS
===================================================== */

const brandContainer =
    document.getElementById("brandContainer");

const productContainer =
    document.getElementById("productContainer");

const panelCategory =
    document.getElementById("panelCategory");

const panelSubtitle =
    document.getElementById("panelSubtitle");

const backToBrands =
    document.getElementById("backToBrands");

const currentCarName =
    document.getElementById("currentCarName");

const carPlaceholder =
    document.getElementById("carPlaceholder");

const powerValue =
    document.getElementById("powerValue");

const torqueValue =
    document.getElementById("torqueValue");

const weightValue =
    document.getElementById("weightValue");

const drivetrainValue =
    document.getElementById("drivetrainValue");

const notification =
    document.getElementById("notification");

const notificationText =
    document.getElementById("notificationText");


/* =====================================================
   CATEGORY NAMES
===================================================== */

const CATEGORY_NAMES = {

    car: "CAR",

    engine: "ENGINE",

    turbo: "TURBO",

    intake: "INTAKE",

    exhaust: "EXHAUST",

    intercooler: "INTERCOOLER",

    radiator: "RADIATOR",

    clutch: "CLUTCH",

    differential: "DIFFERENTIAL",

    wheels: "WHEELS",

    tires: "TIRES",

    brakes: "BRAKES",

    suspension: "SUSPENSION",

    body: "BODY KIT",

    interior: "INTERIOR",

    paint: "PAINT"

};


/* =====================================================
   CATEGORY BUTTONS
===================================================== */

document
    .querySelectorAll(".category-button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const category =
                    button.dataset.category;

                selectCategory(category);

            }
        );

    });


/* =====================================================
   SELECT CATEGORY
===================================================== */

function selectCategory(category) {

    state.selectedCategory =
        category;

    state.selectedBrand =
        null;


    /* Update active button */

    document
        .querySelectorAll(".category-button")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.category === category
            );

        });


    /* Update panel title */

    panelCategory.textContent =
        CATEGORY_NAMES[category];

    panelSubtitle.textContent =
        "SELECT MANUFACTURER";


    /* Show brands */

    productContainer
        .classList
        .add("hidden");

    brandContainer
        .classList
        .remove("hidden");

    backToBrands
        .classList
        .add("hidden");


    renderBrands();

}


/* =====================================================
   GET CURRENT CAR
===================================================== */

function getCurrentCar() {

    return CARS.find(
        car =>
            car.id ===
            state.selectedCarId
    );

}


/* =====================================================
   GET COMPATIBLE PARTS
===================================================== */

function getCompatibleParts(category) {

    if (!state.selectedCarId) {

        return [];

    }


    return PARTS.filter(part => {

        if (
            part.category !==
            category
        ) {

            return false;

        }


        return part.compatibleCars.includes(
            state.selectedCarId
        );

    });

}


/* =====================================================
   GET BRANDS
===================================================== */

function getBrands(category) {

    /* Cars */

    if (category === "car") {

        return [
            ...new Set(
                CARS.map(
                    car => car.brand
                )
            )
        ];

    }


    /* Paint */

    if (category === "paint") {

        return [
            "PAINT"
        ];

    }


    /* Parts */

    const parts =
        getCompatibleParts(category);


    return [
        ...new Set(
            parts.map(
                part => part.brand
            )
        )
    ];

}


/* =====================================================
   RENDER BRANDS
===================================================== */

function renderBrands() {

    brandContainer.innerHTML = "";


    const category =
        state.selectedCategory;


    const brands =
        getBrands(category);


    /* No car selected */

    if (
        category !== "car" &&
        !state.selectedCarId
    ) {

        brandContainer.innerHTML = `

            <div class="stock-card">

                <strong>
                    SELECT A CAR
                </strong>

                <span>
                    Choose a vehicle first
                </span>

            </div>

        `;

        return;

    }


    /* No compatible options */

    if (
        brands.length === 0
    ) {

        brandContainer.innerHTML = `

            <div class="stock-card">

                <strong>
                    NO OPTIONS
                </strong>

                <span>
                    No compatible parts
                </span>

            </div>

        `;

        return;

    }


    /* Create brand cards */

    brands.forEach(
        brand => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "brand-card";


            let count = 0;


            if (
                category === "car"
            ) {

                count =
                    CARS.filter(
                        car =>
                            car.brand ===
                            brand
                    ).length;

            } else {

                count =
                    getCompatibleParts(
                        category
                    )
                    .filter(
                        part =>
                            part.brand ===
                            brand
                    )
                    .length;

            }


            card.innerHTML = `

                <div class="brand-name">
                    ${brand}
                </div>

                <div class="brand-count">
                    ${count} OPTIONS
                </div>

            `;


            card.addEventListener(
                "click",
                () => {

                    selectBrand(
                        brand
                    );

                }
            );


            brandContainer.appendChild(
                card
            );

        }
    );

}


/* =====================================================
   SELECT BRAND
===================================================== */

function selectBrand(brand) {

    state.selectedBrand =
        brand;


    brandContainer
        .classList
        .add("hidden");


    productContainer
        .classList
        .remove("hidden");


    backToBrands
        .classList
        .remove("hidden");


    panelSubtitle.textContent =
        brand.toUpperCase();


    renderProducts();

}


/* =====================================================
   RENDER PRODUCTS
===================================================== */

function renderProducts() {

    productContainer.innerHTML = "";


    const category =
        state.selectedCategory;


    const brand =
        state.selectedBrand;


    /* =================================================
       CARS
    ================================================= */

    if (
        category === "car"
    ) {

        const cars =
            CARS.filter(
                car =>
                    car.brand ===
                    brand
            );


        cars.forEach(
            car => {

                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "product-card";


                if (
                    car.id ===
                    state.selectedCarId
                ) {

                    card.classList.add(
                        "selected"
                    );

                }


                card.innerHTML = `

                    <div class="product-brand">
                        ${car.brand}
                    </div>

                    <div class="product-name">
                        ${car.model}
                        ${car.generation}
                    </div>

                    <div class="product-material">
                        ${car.year}
                    </div>

                    <div class="product-effects">

                        <span>
                            ${car.power} HP
                        </span>

                        <span>
                            ${car.drivetrain}
                        </span>

                    </div>

                `;


                card.addEventListener(
                    "click",
                    () => {

                        selectCar(
                            car.id
                        );

                    }
                );


                productContainer.appendChild(
                    card
                );

            }
        );


        return;

    }


    /* =================================================
       PAINT
    ================================================= */

    if (
        category === "paint"
    ) {

        renderPaintOptions();

        return;

    }


    /* =================================================
       PARTS
    ================================================= */

    const parts =
        getCompatibleParts(
            category
        )
        .filter(
            part =>
                part.brand ===
                brand
        );


    /* =================================================
       STOCK
    ================================================= */

    const stock =
        document.createElement(
            "div"
        );


    stock.className =
        "stock-card";


    stock.innerHTML = `

        <strong>
            STOCK
        </strong>

        <span>
            REMOVE MODIFICATION
        </span>

    `;


    stock.addEventListener(
        "click",
        () => {

            installStock(
                category
            );

        }
    );


    productContainer.appendChild(
        stock
    );


    /* =================================================
       PRODUCTS
    ================================================= */

    parts.forEach(
        part => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "product-card";


            if (
                state.installed[
                    category
                ] === part.id
            ) {

                card.classList.add(
                    "selected"
                );

            }


            const effects =
                part.effects ||
                {};


            let effectHTML = "";


            if (
                effects.power
            ) {

                effectHTML += `

                    <span class="${
                        effects.power > 0
                            ? "effect-positive"
                            : "effect-negative"
                    }">

                        ${formatEffect(
                            effects.power
                        )} HP

                    </span>

                `;

            }


            if (
                effects.torque
            ) {

                effectHTML += `

                    <span class="${
                        effects.torque > 0
                            ? "effect-positive"
                            : "effect-negative"
                    }">

                        ${formatEffect(
                            effects.torque
                        )} Nm

                    </span>

                `;

            }


            if (
                effects.weight
            ) {

                effectHTML += `

                    <span>

                        ${formatEffect(
                            effects.weight
                        )} kg

                    </span>

                `;

            }


            card.innerHTML = `

                <div class="product-brand">
                    ${part.brand}
                </div>

                <div class="product-name">
                    ${part.model}
                </div>

                <div class="product-material">
                    ${part.material || ""}
                </div>

                <div class="product-effects">

                    ${effectHTML}

                </div>

            `;


            card.addEventListener(
                "click",
                () => {

                    installPart(
                        part
                    );

                }
            );


            productContainer.appendChild(
                card
            );

        }
    );

}


/* =====================================================
   PAINT OPTIONS
===================================================== */

function renderPaintOptions() {

    const colors = [

        {
            name: "Gloss Black",
            value: "#080808"
        },

        {
            name: "White",
            value: "#eeeeee"
        },

        {
            name: "Silver",
            value: "#8c8c8c"
        },

        {
            name: "Red",
            value: "#b00000"
        },

        {
            name: "Blue",
            value: "#174ea6"
        },

        {
            name: "Green",
            value: "#176b3a"
        },

        {
            name: "Yellow",
            value: "#d6b300"
        },

        {
            name: "Orange",
            value: "#d65a00"
        },

        {
            name: "Purple",
            value: "#642d91"
        }

    ];


    colors.forEach(
        color => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "product-card";


            card.innerHTML = `

                <div
                    style="
                        width:100%;
                        height:45px;
                        background:${color.value};
                        border:1px solid #444;
                        margin-bottom:10px;
                    "
                ></div>

                <div class="product-name">
                    ${color.name}
                </div>

            `;


            card.addEventListener(
                "click",
                () => {

                    setPaint(
                        color.value
                    );

                }
            );


            productContainer.appendChild(
                card
            );

        }
    );

}


/* =====================================================
   SET PAINT
===================================================== */

function setPaint(color) {

    state.paint =
        color;


    showNotification(
        "Paint changed"
    );


    /*
       Later this will also change
       the material of the 3D car.
    */

}


/* =====================================================
   SELECT CAR
===================================================== */

function selectCar(carId) {

    const car =
        CARS.find(
            car =>
                car.id ===
                carId
        );


    if (!car) {

        return;

    }


    state.selectedCarId =
        carId;


    currentCarName.textContent =
        `${car.brand} ${car.model} ${car.generation}`;


    /* =================================================
       REMOVE INCOMPATIBLE PARTS
    ================================================= */

    let removedParts = 0;


    Object.keys(
        state.installed
    )
    .forEach(
        category => {

            const partId =
                state.installed[
                    category
                ];


            if (!partId) {

                return;

            }


            const part =
                PARTS.find(
                    p =>
                        p.id ===
                        partId
                );


            if (!part) {

                return;

            }


            if (
                !part.compatibleCars.includes(
                    carId
                )
            ) {

                state.installed[
                    category
                ] = null;


                removedParts++;

            }

        }
    );


    /* Update */

    updateStats();

    renderCarPlaceholder();

    renderBrands();


    productContainer
        .classList
        .add("hidden");


    brandContainer
        .classList
        .remove("hidden");


    backToBrands
        .classList
        .add("hidden");


    panelSubtitle.textContent =
        "SELECT MANUFACTURER";


    if (
        removedParts > 0
    ) {

        showNotification(
            `${removedParts} incompatible part(s) removed`
        );

    } else {

        showNotification(
            `${car.brand} ${car.model} selected`
        );

    }

}


/* =====================================================
   INSTALL PART
===================================================== */

function installPart(part) {

    if (
        !state.selectedCarId
    ) {

        showNotification(
            "Select a car first"
        );

        return;

    }


    if (
        !part.compatibleCars.includes(
            state.selectedCarId
        )
    ) {

        showNotification(
            "This part is not compatible with this car"
        );

        return;

    }


    state.installed[
        part.category
    ] = part.id;


    updateStats();

    renderProducts();

    renderCarPlaceholder();


    showNotification(
        `${part.brand} ${part.model} installed`
    );

}


/* =====================================================
   INSTALL STOCK
===================================================== */

function installStock(category) {

    state.installed[
        category
    ] = null;


    updateStats();

    renderProducts();

    renderCarPlaceholder();


    showNotification(
        `${CATEGORY_NAMES[category]} returned to stock`
    );

}


/* =====================================================
   CALCULATE STATS
===================================================== */

function calculateStats() {

    const car =
        getCurrentCar();


    if (!car) {

        return {

            power: 0,

            torque: 0,

            weight: 0,

            drivetrain: "---"

        };

    }


    let power =
        car.power;


    let torque =
        car.torque;


    let weight =
        car.weight;


    Object.keys(
        state.installed
    )
    .forEach(
        category => {

            const partId =
                state.installed[
                    category
                ];


            if (!partId) {

                return;

            }


            const part =
                PARTS.find(
                    p =>
                        p.id ===
                        partId
                );


            if (!part) {

                return;

            }


            const effects =
                part.effects ||
                {};


            power +=
                effects.power ||
                0;


            torque +=
                effects.torque ||
                0;


            weight +=
                effects.weight ||
                0;

        }
    );


    return {

        power,

        torque,

        weight,

        drivetrain:
            car.drivetrain

    };

}


/* =====================================================
   UPDATE STATS
===================================================== */

function updateStats() {

    const stats =
        calculateStats();


    powerValue.textContent =
        Math.round(
            stats.power
        );


    torqueValue.textContent =
        Math.round(
            stats.torque
        );


    weightValue.textContent =
        Math.round(
            stats.weight
        );


    drivetrainValue.textContent =
        stats.drivetrain;

}


/* =====================================================
   CAR PLACEHOLDER
===================================================== */

function renderCarPlaceholder() {

    const car =
        getCurrentCar();


    if (!car) {

        carPlaceholder.innerHTML = `

            <div class="placeholder-icon">
                🚗
            </div>

            <h1>
                SELECT A CAR
            </h1>

            <p>
                Choose a vehicle from the CAR category.
            </p>

        `;

        return;

    }


    carPlaceholder.innerHTML = `

        <div class="placeholder-icon">
            🚗
        </div>

        <h1>
            ${car.brand}
            ${car.model}
        </h1>

        <p>
            ${car.generation}
            ·
            ${car.year}
            ·
            ${car.engine}
        </p>

    `;

}


/* =====================================================
   FORMAT EFFECT
===================================================== */

function formatEffect(value) {

    if (value > 0) {

        return `+${value}`;

    }


    return value;

}


/* =====================================================
   NOTIFICATION
===================================================== */

let notificationTimeout;


function showNotification(message) {

    notificationText.textContent =
        message;


    notification.classList.add(
        "show"
    );


    clearTimeout(
        notificationTimeout
    );


    notificationTimeout =
        setTimeout(
            () => {

                notification.classList.remove(
                    "show"
                );

            },
            1800
        );

}


/* =====================================================
   BACK TO BRANDS
===================================================== */

backToBrands.addEventListener(
    "click",
    () => {

        state.selectedBrand =
            null;


        productContainer
            .classList
            .add("hidden");


        brandContainer
            .classList
            .remove("hidden");


        backToBrands
            .classList
            .add("hidden");


        panelSubtitle.textContent =
            "SELECT MANUFACTURER";

    }
);


/* =====================================================
   RESET BUILD
===================================================== */

document
    .getElementById("resetBuild")
    .addEventListener(
        "click",
        () => {

            Object.keys(
                state.installed
            )
            .forEach(
                category => {

                    state.installed[
                        category
                    ] = null;

                }
            );


            state.paint =
                "#222222";


            updateStats();

            renderCarPlaceholder();


            if (
                state.selectedBrand
            ) {

                renderProducts();

            }


            showNotification(
                "Build reset"
            );

        }
    );


/* =====================================================
   INITIALIZE
===================================================== */

selectCategory(
    "car"
);


updateStats();


renderCarPlaceholder();
