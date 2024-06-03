class Activity {
    constructor({ id, title, description, imgUrl }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imgUrl = imgUrl;
    }
}

class Repository {
    constructor() {
        this.activities = [];
        this.id = 0;
    }

    getAllActivities() {
        return this.activities;
    }

    createActivity(actividadIngresada) {
        const activity = new Activity({ ...actividadIngresada, id: this.id++ });
        this.activities.push(activity);
    }

    deleteActivity(id) {
        this.activities = this.activities.filter(activity => activity.id !== id);
    }
}

// Crear una instancia de la clase Repository
const repository = new Repository();

// Obtener referencias a los elementos HTML
const title = document.getElementById("title");
const description = document.getElementById("description");
const imgUrl = document.getElementById("imgUrl");
const submit = document.getElementById("submit");

// Crear tarjeta HTML dinámicamente
function createCardElement(activity) {
    const { id, title, description, imgUrl } = activity;

    const card = document.createElement("div");
    card.className = "card";
    card.dataset.activityId = id;  // Almacenar el id como atributo de datos

    const cardTitle = document.createElement("h4");
    const cardImg = document.createElement("img");
    const cardDescription = document.createElement("p");

    card.appendChild(cardTitle);
    card.appendChild(cardImg);
    card.appendChild(cardDescription);

    cardTitle.innerText = title;
    cardImg.src = imgUrl;
    cardDescription.innerText = description;

    // Agregar evento para eliminar la actividad al hacer clic en la tarjeta
    card.addEventListener("click", function () {
        const activityId = parseInt(this.dataset.activityId, 10);
        repository.deleteActivity(activityId);
        renderAllActivities();  // Volver a renderizar después de eliminar
    });

    // Asignar clases CSS
    cardTitle.classList.add("card-title");
    cardImg.classList.add("card-img");
    cardDescription.classList.add("card-description");
    card.classList.add("card-container");

    return card;  // Devuelve la tarjeta recién creada
}

// Renderizar todas las actividades en el contenedor
function renderAllActivities() {
    const container = document.getElementById("actividadesContainer");
    container.innerHTML = ""; // Vaciar el contenido del contenedor

    const allActivities = repository.getAllActivities();
    const activityElements = allActivities.map(createCardElement);

    activityElements.forEach((element) => {
        container.appendChild(element);  // Agrega la tarjeta al contenedor
    });
}


function handleAddActivityClick(event) {
    event.preventDefault();

    const titleValue = title.value;
    const descriptionValue = description.value;
    const imgUrlValue = imgUrl.value;

    if (!titleValue || !descriptionValue || !imgUrlValue) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    const actividadIngresada = {
        title: titleValue,
        description: descriptionValue,
        imgUrl: imgUrlValue,
    };

    repository.createActivity(actividadIngresada);
    renderAllActivities();

    title.value = "";
    description.value = "";
    imgUrl.value = "";
}

// Agregar Event Listener al botón para manejar la creación de actividades
submit.addEventListener("click", handleAddActivityClick);

// Inicializar renderización de actividades al cargar la página
renderAllActivities();
