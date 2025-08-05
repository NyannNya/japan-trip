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

            if (day.day_map_link) {
                const dayMapLink = document.createElement('p');
                dayMapLink.innerHTML = `<a href="${day.day_map_link}" target="_blank" style="font-size: 0.9em; color: #007bff;">查看當日綜合路線圖</a>`;
                dayCard.appendChild(dayMapLink);
            }

            const accommodationInfo = document.createElement('h3');
            accommodationInfo.textContent = `住宿: ${day.accommodation || '無'}`;
            dayCard.appendChild(accommodationInfo);

            const activitiesList = document.createElement('ul');

            const renderActivities = (activities, title) => {
                if (activities && activities.length > 0) {
                    const timeHeader = document.createElement('h4');
                    timeHeader.textContent = title;
                    activitiesList.appendChild(timeHeader);
                    activities.forEach(activity => {
                        const listItem = document.createElement('li');
                        let descriptionHtml = `<span>${activity.description} (${activity.location})</span>`;
                        if (activity.link) {
                            descriptionHtml = `<a href="${activity.link}" target="_blank">${descriptionHtml}</a>`;
                        }
                        if (activity.image_link) {
                            descriptionHtml += `<br><a href="${activity.image_link}" target="_blank" style="margin-top: 5px; display: inline-block;">查看地圖/路線</a>`;
                        }
                        listItem.innerHTML = `<strong>${activity.time}</strong> ${descriptionHtml}`;
                        activitiesList.appendChild(listItem);
                    });
                }
            };

            renderActivities(day.morning, '早上');
            renderActivities(day.afternoon, '下午');
            renderActivities(day.evening, '晚上');

            dayCard.appendChild(activitiesList);

            container.appendChild(dayCard);
        });
    }
});