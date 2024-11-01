
const accessKey = 'KIFJow7qbNoe-AkxlJEvCpyN_Fk1j59jxpd96PLD0hU';

const search = document.querySelector('.search');
const searchInput = document.querySelector('.search__input');
const resultsSearch = document.querySelector('.results');
const clearBtn = document.querySelector('.clear');
const header = document.querySelector('.header');
 
let page = 1;
const perPage = 12;

// Случайный запрос из заданного массива строк.
function getRandomQuery() {
	const randomQueries = [
		'nature', 
    'city', 
    'technology', 
    'abstract', 
    'world', 
    'cocktail', 
    'chapel', 
    'foreign language', 
    'groomed', 
    'toast',
    'sunset', 
    'animals', 
    'food', 
    'landscape', 
    'music', 
    'travel', 
    'people', 
    'art', 
    'sports', 
    'architecture', 
    'vintage'];
	const randomIndex = Math.floor(Math.random() * randomQueries.length);
		return randomQueries[randomIndex];
}


// Поиск картинок.
async function searchImages(){
    const getData = searchInput.value || getRandomQuery();
    const url = `https://api.unsplash.com/search/photos?query=${getData}&page=${page}&per_page=${perPage}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;
        if(page === 1) {
            resultsSearch.innerHTML = '';
        };
   
    results.forEach((result) => {
        const imageWrapper = document.createElement('div');
				imageWrapper.classList.add ('results__search');
        resultsSearch.appendChild(imageWrapper);

        const image = document.createElement('img');
        image.classList.add ('results__search-img');
        imageWrapper.appendChild(image);
        image.src = result.urls.small;

        const downloadLink = document.createElement('a');
        downloadLink.classList.add('download')
        downloadLink.target = '_blank';
        downloadLink.href = result.links.download;
        imageWrapper.appendChild(downloadLink);
        
        const numberLikes = document.createElement('div');
        numberLikes.classList.add('likes')
        numberLikes.textContent = result.likes;
        imageWrapper.appendChild(numberLikes);

        const authorPhoto  = document.createElement('span');
        authorPhoto.classList.add('author__photo')
        const firstName = result.user.first_name ? result.user.first_name : '';
        const lastName = result.user.last_name ? result.user.last_name : '';
        function capitalizeFirstLetter(name) {
          if (!name) return ''; 
          return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
      }
        authorPhoto.textContent = (firstName || lastName) ? `${capitalizeFirstLetter(firstName)} ${capitalizeFirstLetter(lastName)}`.trim() : ''
        imageWrapper.appendChild(authorPhoto);
    });

}

search.addEventListener('submit',(event) => {
    event.preventDefault();
    if (!searchInput.value.trim()) {
      return;
    }
    searchImages();
});

searchImages();

// Устанавливаем фокус на поле ввода.
window.onload = function() {
    searchInput.focus();
};

// Показываем кнопку очистки, когда есть текст в поле ввода.
searchInput.addEventListener('input', () => {
    if (searchInput.value) {
        clearBtn.style.display = 'block';
    } else {
        clearBtn.style.display = 'none';
    }
});

// Очистка поля ввода при клике на кнопку clear.
clearBtn.addEventListener('click', () => {
    searchInput.value = ''; 
    clearBtn.style.display = 'none';
    searchInput.focus(); 
});

// Скрывает заголовок при прокрутке вниз и показывает его при прокрутке вверх.
const defaultOffset = 150;
let lastScroll = 0;
let isScrolling;

const scrollPosition = () =>  window.scrollY || document.documentElement.scrollTop;
const containHide = () => header.classList.contains('hide');

window.addEventListener("scroll", () => {
	clearTimeout(isScrolling)
	if (
		scrollPosition() > lastScroll &&
		!containHide() &&
		scrollPosition() > defaultOffset
	) {
		header.classList.add("hide")
	} else if (scrollPosition() < lastScroll && containHide()) {
		header.classList.remove("hide")
	}

	lastScroll = scrollPosition()

  // Таймер для открытия header через 2с, если он скрыт.
	isScrolling = setTimeout(() => {
		if (containHide()) {
			header.classList.remove("hide")
		}
	}, 2000)
});

console.log(`
  1. Вёрстка +10
    - на странице есть несколько фото и строка поиска +5
    - в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
  2. При загрузке приложения на странице отображаются полученные от API изображения +10
  3. Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся изображения соответствующей тематики, если такие данные предоставляет API +10
  4. Поиск +30
    - при открытии приложения курсор находится в поле ввода +5
    - есть placeholder +5
    - автозаполнение поля ввода отключено (нет выпадающего списка с предыдущими запросами) +5
    - поисковый запрос можно отправить нажатием клавиши Enter +5
    - после отправки поискового запроса и отображения результатов поиска, поисковый запрос продолжает отображаться в поле ввода +5
    - в поле ввода есть крестик, при клике по которому поисковый запрос из поля ввода удаляется и отображается placeholder +5
  5. Очень высокое качество оформления приложения и/или дополнительный, не предусмотренный в задании функционал, улучшающий качество приложения +10
    - добавлен адаптивный header, который исчезает при скроле и появляется при бездействии через 2 секунты
    - добавил ссылку на скачивание картинки
    - количество лайков
    - имя и фамилию автора`)
