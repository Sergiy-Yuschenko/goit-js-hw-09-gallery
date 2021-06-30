import './sass/main.scss';
const galleryItems = [
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
        description: 'Hokkaido Flower',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
        description: 'Container Haulage Freight',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
        description: 'Aerial Beach View',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
        description: 'Flower Blooms',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
        description: 'Alpine Mountains',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
        description: 'Mountain Lake Sailing',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
        description: 'Alpine Spring Meadows',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
        description: 'Nature Landscape',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
        description: 'Lighthouse Coast Sea',
    },
];

//Знаходимо потрібний елемент-список (ul) на який треба почепити його елементи створені скріптом
const imagesGaleryListEl = document.querySelector('ul.js-gallery');

            /*РОЗМІТКА ГАЛЕРЕЇ*/

//Функція в яка отримує данні із масиву по конкретному зображенню, створює та повертає розмітку елемента списку
const imagesGaleryListCreate = ({preview, original,  description}) => {
    //Створюємо елемент списку "li" та додаємо йому необхідний клас
    const galeryListItemEl = document.createElement('li');
    galeryListItemEl.classList.add('gallery__item');

    //Створюємо елемент посилання "a" та додаємо йому необхідний клас s і атрибут
    const galeryListLinkEl = document.createElement('a');
    galeryListLinkEl.classList.add('gallery__link');
    galeryListLinkEl.href = original;

    //Створюємо елемент зображення "img" та додаємо йому необхідний клас s і атрибути
    const galeryListImageEl = document.createElement('img');
    galeryListImageEl.classList.add('gallery__image');
    galeryListImageEl.src = preview;
    galeryListImageEl.setAttribute('data-source', original);
    galeryListImageEl.alt = description;

    //Додаємо створений елемент зображення в середину створеного елемента посилання
    galeryListLinkEl.append(galeryListImageEl);

    //Додаємо створений елемент посилання в середину створеного елемента списку
    galeryListItemEl.append(galeryListLinkEl);
    
    //Повертаємо результат роботи функції
    return galeryListItemEl;
}

//створення масиву з розміткою елементів галереї за рахунок перебору масиву з даними
//методом месивів "map", який по кожному елементу масиву виконує функцію imagesGaleryListCreate
//та повертає масив з результатами її виконання
const listItems = galleryItems.map(imagesGaleryListCreate);

//Додаємо створеі елементи списку в знайдений елемент список "ul" за рахунок 
//функції append в яку розпилюємо масив з розміткою
imagesGaleryListEl.append(...listItems);

            /*МОДАЛЬНЕ ВІКНО*/
 
//Змінна для зберігання поточного елементу зображення
let curentImage;
          
//Знаходимо елемент бекдропу модального вікна
const modalWindowEl = document.querySelector('.js-lightbox');
//Знаходимо елемент зображення модального вікна
const modalImageEl = document.querySelector('.lightbox__image');
//Знаходимо елемент кнопки закривання модального вікна
const modalCloseButtonEl = document.querySelector('button[data-action="close-lightbox"]');
//Знаходимо елемент заднього фону модалки
const modalOverlayEl = document.querySelector('div.lightbox__overlay');

//Слухач, який при кліку на елемент-список виконує функцію modalOpen
imagesGaleryListEl.addEventListener('click', modalOpen);

// Функція, яка передає елементу зображення модального вікна значення url великого зображення
//із об'єкту dataset та ключа source  та передає значенню елементу значення src з обраного елементу зображення
//галереї
function gettingImageData(imgEl) {
    
    //отримання url великого зображення та передача його в src елемента зображення модалки
    modalImageEl.src = imgEl.dataset.source;
    //отримання значення атрибута alt та передача його в src елемента зображення модалки
    modalImageEl.alt = imgEl.alt;
}

//Функція яка відкриває модальне вікно та, елементу зображення, по якому відбувся клік, зображення, по якому відбувся клік
function modalOpen(event) {
    //Гардклоуз, що спрацьовує якщо клік відбувся по галереї, але не потрапив на жлдну з картинок
    if (event.target.nodeName !== 'IMG') return;
    //блокування переходу за посиланням
    event.preventDefault();
    //відкривання модалки
    modalWindowEl.classList.add('is-open');

    curentImage = event.target;

    gettingImageData(curentImage);

    //Слухач, який при кліці на елемент кнопки закриття модального вікна виконує функцію modalClose
    modalCloseButtonEl.addEventListener('click', modalClose);
    //Слухач, який при кліці на елемент modalOverlayEl виконує функцію modalClose
    modalOverlayEl.addEventListener('click', modalClose);
    window.addEventListener('keydown', keydownAct);
}

//Функція, яка закриває модальне вікно та обнуляє авраметри src та alt
// зображення модалки при кліці на кнопку 
function modalClose() {
    modalWindowEl.classList.remove('is-open');
    modalImageEl.src = "";
    modalImageEl.alt = "";

    modalOverlayEl.removeEventListener('click', modalClose);
    modalOverlayEl.removeEventListener('click', modalClose);
    window.removeEventListener('keydown', keydownAct);
}

//функція, в яку передається код натиснутої клавіші і яка виконує певні дії з модалкою при натисканні деяких
//із них
function keydownAct({code}) {
    switch (code) {
        //Закриваємо модалку при натисканні клавіші "Esc"
        case 'Escape':
            modalClose();
            break;
        //Пролистуємо зображення у відкритому модальному вікні вправо при натисканні кнопки "стрілка вправо"
        case 'ArrowRight':
            if (curentImage.parentNode.parentNode === imagesGaleryListEl.lastElementChild) {
                curentImage = imagesGaleryListEl.firstElementChild.firstChild.firstChild;
                gettingImageData(curentImage);
            } else {
                curentImage = curentImage.parentNode.parentNode.nextElementSibling.firstChild.firstChild;
                gettingImageData(curentImage);
            }
            break;
        //Пролистуємо зображення у відкритому модальному вікні вліво при натисканні кнопки "стрілка вліво"
        case 'ArrowLeft':
            if (curentImage.parentNode.parentNode === imagesGaleryListEl.firstElementChild) {
                curentImage = imagesGaleryListEl.lastElementChild.firstChild.firstChild;
                gettingImageData(curentImage);
            } else {
                curentImage = curentImage.parentNode.parentNode.previousElementSibling.firstChild.firstChild;
                gettingImageData(curentImage);
            }
            break;
        //Завершуємо роботу фенкції при натисканні інших клавіш
        default:
            return;
    }
}










