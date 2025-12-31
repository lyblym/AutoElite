// Функция для показа сайдбара
function showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
}

// Функция для скрытия сайдбара
function hideSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
}

// Добавляем обработчики событий для всех ссылок в сайдбаре
document.addEventListener('DOMContentLoaded', function() {
    // Получаем все ссылки внутри сайдбара
    const sidebarLinks = document.querySelectorAll('.sidebar li a');
    
    // Добавляем обработчик клика для каждой ссылки
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Закрываем сайдбар при клике на ссылку
            hideSidebar();
        });
    });

    // Инициализация слайдера
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.nav-prev');
    const nextBtn = document.querySelector('.nav-next');
    let currentSlide = 0;

    // Функция для показа слайда
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        if (slides[index]) {
            slides[index].classList.add('active');
            currentSlide = index;
        }
    }

    // ОБРАБОТЧИК ДЛЯ КНОПКИ РАСКРЫТЬ/ЗАКРЫТЬ (ПЛЮС/МИНУС)
    const addButtons = document.querySelectorAll('.add-button');
    
    addButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Останавливаем всплытие события
            
            const slide = this.closest('.slide');
            
            // Если слайд активный - закрываем его (убираем active)
            if (slide.classList.contains('active')) {
                slide.classList.remove('active');
                console.log('Слайд закрыт');
            } 
            // Если слайд не активный - открываем его (добавляем active)
            else {
                // Закрываем все другие слайды
                slides.forEach(s => s.classList.remove('active'));
                // Открываем этот слайд
                slide.classList.add('active');
                currentSlide = index;
                console.log('Слайд открыт');
            }
        });
    });

    // Клик по слайду (открывает его)
    slides.forEach((slide, index) => {
        slide.addEventListener('click', (e) => {
            // Проверяем, что клик не по кнопке add-button
            if (!e.target.closest('.add-button')) {
                showSlide(index);
            }
        });
    });

    // Предыдущий слайд
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });
    }

    // Следующий слайд
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });
    }

    // Закрытие сайдбара при клике вне его области
    document.addEventListener('click', function(event) {
        const sidebar = document.querySelector('.sidebar');
        const menuButton = document.querySelector('.navbar li img');
        
        // Проверяем, что клик был не по сайдбару и не по кнопке меню
        if (sidebar && menuButton && sidebar.style.display === 'flex' && 
            !sidebar.contains(event.target) && 
            !menuButton.contains(event.target)) {
            hideSidebar();
        }
    });
});