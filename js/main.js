const cursor = document.querySelector('.cursor');

// Двигаем круг за курсором
document.addEventListener('mousemove', (event) => {
    cursor.style.top = `${event.pageY - cursor.offsetHeight / 2}px`;
    cursor.style.left = `${event.pageX - cursor.offsetWidth / 2}px`;
});

// Скрываем круг, когда курсор покидает сайт
document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
});

// Показываем круг, когда курсор возвращается на сайт
document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
});


const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resultCount = document.getElementById('resultCount');
const items = document.querySelectorAll('.item');
const header = document.getElementById('header');

// Динамическое обновление количества результатов
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    let foundCount = 0;

    items.forEach(item => {
        const keywords = item.getAttribute('data-keywords').toLowerCase();
        if (keywords.includes(query)) {
            item.style.display = 'block'; // Показываем совпадающие элементы
            item.classList.add('highlight'); // Добавляем класс для подсветки
            foundCount++;
        } else {
            item.style.display = 'none'; // Скрываем остальные элементы
            item.classList.remove('highlight'); // Убираем класс, если элемент не соответствует запросу
        }
    });

    // Обновляем количество найденных результатов
    resultCount.textContent = `Найдено: ${foundCount} ${getResultsText(foundCount)}`;
});

// Переход к результатам после нажатия кнопки
searchButton.addEventListener('click', () => {
    const query = searchInput.value.toLowerCase();
    let firstMatch = null;

    items.forEach(item => {
        const keywords = item.getAttribute('data-keywords').toLowerCase();
        if (keywords.includes(query) && !firstMatch) {
            firstMatch = item; // Сохраняем первый найденный элемент
        }
    });

    if (firstMatch) {
        const headerHeight = header.offsetHeight;
        const headerPosition = header.getBoundingClientRect().top; // Положение заголовка
        const isHeaderFixed = header.classList.contains('fixed') || headerPosition < 0; // Проверяем, зафиксирован ли заголовок
        const offset = isHeaderFixed ? headerHeight : 0; // Если не зафиксирован, отступ не нужен

        const elementPosition = firstMatch.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset - 10; // Корректируем позицию прокрутки
        
        console.log(offset);
        if (offset == 0) {
            window.scrollTo({
            top: offsetPosition - 256,
            behavior: 'smooth',
        });
        } else {
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
        });
        }
    }
});

// Функция для правильного склонения слова "результат"
function getResultsText(count) {
    if (count % 10 === 1 && count % 100 !== 11) {
        return 'результат';
    } else if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
        return 'результата';
    } else {
        return 'результатов';
    }
}

const headers = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) { // Условие: прокрутка больше 50 пикселей
        headers.classList.add('fixed'); // Добавляем класс для фиксации
    } else {
        headers.classList.remove('fixed'); // Убираем класс, если вернулись вверх
    }
});

function getLastWordClean(str) {
    let words = str.value.trim().split(/\s+/);
    return words.length ? words[words.length - 1].replace(/[.,!?;]$/, '') : '';
}

document.getElementById("searchInput").addEventListener("input", function() {
    let input = this.value.toLowerCase().trim();
    let response = document.getElementById("resultCount");
    let answers = {
        "привет": "Здравствуйте! Вы нашли фишку сайта, если вы угадаете, что сюда можно вводить, то вам будет ответ",
        "размер экрана": "Размер экрана: " + screen.width + " на " + screen.height,
        "кто самый лучший учитель по биологии?": "Анастасия Владиславовна конечно же!",
        "кто самый лучший учитель по истории?": "Алексей Эдуардович конечно же!",
        "кто самый лучший учитель по информатике?": "Павел Александрович конечно же!",
        "кто самый лучший учитель по физике?": "Наталья Николаевна конечно же!",
        "кто самый лучший учитель по химии?": "Анджела Рудольфовна конечно же!"
    };

    if (answers[input]) {
        response.textContent = answers[input];

        // Через 2 секунды изменяем текст
        setTimeout(() => {
            response.textContent = "Шутка! Это не вы!";
        }, 3000);
        setTimeout(() => {
            response.textContent = `Ладно, это шутка! Конечно же лучший учитель по ${getLastWordClean(searchInput)} — это вы!`;
        }, 5000);
    }
});

function createBubble() {
    let bubble = document.createElement("div");
    bubble.classList.add("bubble");

    // Пузыри появляются в пределах документа, а не фиксируются на экране
    let x = Math.random() * (document.documentElement.clientWidth - 80);
    let y = window.scrollY + Math.random() * window.innerHeight;

    bubble.style.left = `${x}px`;
    bubble.style.top = `${y}px`;

    document.body.appendChild(bubble);

    setTimeout(() => {
        bubble.remove();
    }, 6000);
}

setInterval(createBubble, 1500);
