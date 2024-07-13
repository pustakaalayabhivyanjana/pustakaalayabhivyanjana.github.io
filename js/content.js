document.addEventListener('DOMContentLoaded', () => {
    const searchParams = new URLSearchParams(window.location.search);
    const contentType = searchParams.get('type');
    const contentTitle = document.getElementById('content-title');
    const contentList = document.querySelector('.content-list');
    const searchInput = document.getElementById('search-input');
    const contentMap = {
        'books': { title: 'पुस्तकें', file: '../json/books.json' },
        'stories': { title: 'कहानियाँ', file: '../json/stories.json' },
        'poems': { title: 'कविताएँ', file: '../json/poems.json' },
        'novels': { title: 'उपन्यास', file: '../json/novels.json' }
    };

    if (contentType && contentMap[contentType]) {
        contentTitle.textContent = contentMap[contentType].title;
        fetchData(contentMap[contentType].file).then(items => {
            displayItems(contentList, items);

            window.searchItems = function() {
                const searchQuery = searchInput.value.toLowerCase();
                const filteredItems = items.filter(item =>
                    item.title.toLowerCase().includes(searchQuery) ||
                    item.author.toLowerCase().includes(searchQuery)
                );
                displayItems(contentList, filteredItems);
            };
        });
    } else {
        contentTitle.textContent = 'सामग्री नहीं मिली';
        contentList.innerHTML = '<p>कोई सामग्री नहीं मिली।</p>';
    }

    function fetchData(file) {
        return fetch(file)
            .then(response => response.json())
            .catch(error => console.error('Error fetching data:', error));
    }

    function displayItems(list, items) {
        list.innerHTML = '';
        items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('item');
            
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="item-content">
                    <h3>${item.title}</h3>
                    <p>द्वारा ${item.author}</p>
                    <a href="${item.pdf}" target="_blank">PDF डाउनलोड करें</a>
                </div>
            `;
            
            list.appendChild(itemElement);
        });
    }

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    }); 
});
