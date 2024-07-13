document.addEventListener('DOMContentLoaded', () => {
    const videosList = document.querySelector('.videos-list');
    const searchInput = document.getElementById('search-input');

    fetch('../json/others.json')
        .then(response => response.json())
        .then(videos => {
            displayItems(videosList, videos);

            window.searchVideos = function() {
                const searchQuery = searchInput.value.toLowerCase();
                const filteredVideos = videos.filter(video =>
                    video.title.toLowerCase().includes(searchQuery) ||
                    video.description.toLowerCase().includes(searchQuery)
                );
                displayItems(videosList, filteredVideos);
            };
        })
        .catch(error => console.error('Error fetching videos:', error));

    function displayItems(list, items) {
        list.innerHTML = '';
        items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('item');
            
            itemElement.innerHTML = `
                <iframe src="${item.link}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <div class="item-content">
                    <h3>${item.title}</h3>
                   
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
