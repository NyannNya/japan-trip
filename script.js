document.addEventListener('DOMContentLoaded', () => {
    fetch('itinerary.json')
        .then(response => response.json())
        .then(data => {
            renderItinerary(data.itinerary);
        })
        .catch(error => {
            console.error('Error fetching or parsing YAML:', error);
            document.getElementById('itinerary-container').innerHTML = '<p>無法載入行程資料。</p>';
        });

    function renderItinerary(itinerary) {
        const container = document.getElementById('itinerary-container');
        container.innerHTML = ''; // Clear existing content

        itinerary.forEach(day => {
            const dayCard = document.createElement('div');
            dayCard.classList.add('day-card');

            const dateHeader = document.createElement('h2');
            dateHeader.textContent = `Day ${day.day}: ${day.date} - ${day.theme}`;
            dayCard.appendChild(dateHeader);

            const accommodationInfo = document.createElement('h3');
            accommodationInfo.textContent = `住宿: ${day.accommodation || '無'}`;
            dayCard.appendChild(accommodationInfo);

            const activitiesList = document.createElement('ul');
            day.activities.forEach(activity => {
                const listItem = document.createElement('li');
                let descriptionHtml = `<span>${activity.description} (${activity.location})</span>`;
                if (activity.link) {
                    descriptionHtml = `<a href="${activity.link}" target="_blank">${descriptionHtml}</a>`;
                }
                if (activity.image_link) {
                    descriptionHtml += `<br><img src="${activity.image_link}" alt="${activity.description}" style="max-width: 100px; max-height: 100px; margin-top: 5px; border-radius: 4px;">`;
                }
                listItem.innerHTML = `<strong>${activity.time}</strong> ${descriptionHtml}`;
                activitiesList.appendChild(listItem);
            });
            dayCard.appendChild(activitiesList);

            container.appendChild(dayCard);
        });
    }
});