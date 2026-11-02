// 
const carsList = document.getElementById('carsList');
const carDialog = document.getElementById('carDialog');
const carDetails = document.getElementById('carDetails');
let allCars = [];

async function loadCars() {
    try {
        const response = await fetch('cars.json');
        if (!response.ok) throw new Error('Ошибка HTTP: ' + response.status);
        allCars = await response.json();
        renderCars(allCars);
    } catch (error) {
        carsList.textContent = 'Не удалось загрузить cars.json. Откройте сайт через Live Server.';
        console.error(error);
    }
}

// List
function renderCars(cars) {
    carsList.replaceChildren();
    cars.forEach(car => {
        const card = document.createElement('article');
        card.className = 'car-card';
        const photo = document.createElement('img');
        photo.src = car.image;
        photo.alt = car.name;
        photo.loading = 'lazy';
        const title = document.createElement('h3');
        title.textContent = car.name;
        const info = document.createElement('p');
        info.textContent = `${car.year} год · ${car.body}`;
        const price = document.createElement('p');
price.className = 'car-price';
price.textContent = car.price != null
    ? `Цена: ${car.price.toLocaleString('ru-RU')} $`
    : 'Цена не указана';        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = 'Подробнее';
        button.addEventListener('click', () => showDetail(car.id));
card.append(photo, title, info, price, button);

card.addEventListener('mouseenter', () => {
    card.classList.add('car-hover');
});

card.addEventListener('mouseleave', () => {
    card.classList.remove('car-hover');
});

card.addEventListener('click', (event) => {
    if (event.target.closest('button')) return;

    card.classList.remove('car-click');
    void card.offsetWidth;
    card.classList.add('car-click');
});

card.addEventListener('dblclick', () => {
    card.classList.toggle('car-selected');
});
        carsList.append(card);
    });
}

// Detail
function showDetail(id) {
    const car = allCars.find(item => item.id === id);
    if (!car) return;
    carDetails.replaceChildren();
    const title = document.createElement('h2');
    title.id = 'carDialogTitle';
    title.textContent = car.name;
    const photo = document.createElement('img');
    photo.src = car.image;
    photo.alt = car.name;
    photo.className = 'detail-image';
    const description = document.createElement('p');
    description.textContent = car.description;
    const details = document.createElement('ul');
  const fields = [
    ['Марка', car.brand],
    ['Год', car.year],
    ['Кузов', car.body],
    ['Двигатель', car.engine],
    ['Мощность', car.power_hp + ' л.с.'],
    ['Коробка', car.transmission],
    ['Привод', car.drive],
['Цена', car.price != null ? car.price.toLocaleString('ru-RU') + ' $' : 'Не указана']];
    fields.forEach(([label, value]) => {
        const item = document.createElement('li');
        item.textContent = `${label}: ${value}`;
        details.append(item);
    });
    carDetails.append(title, photo, description, details);
    carDialog.showModal();
}

document.getElementById('closeCarDialog').addEventListener('click', () => carDialog.close());
carDialog.addEventListener('click', event => {
    if (event.target === carDialog) carDialog.close();
});
loadCars();
