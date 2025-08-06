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

            const mapCard = document.createElement('div');
            mapCard.classList.add('map-card');
            mapCard.innerHTML = `<h2>Day ${day.day} 地圖</h2>`;
            if (day.day_map_link) {
                // 檢查地圖連結是否為 Google Maps 嵌入連結
                if (day.day_map_link.startsWith('https://www.google.com/maps/embed')) {
                    mapCard.innerHTML += `<iframe src="${day.day_map_link}" width="100%" height="400px" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>`;
                } else {
                    mapCard.innerHTML += `<p>地圖連結無效或不支援嵌入。請提供有效的 Google Maps 嵌入連結。</p>`;
                }
            } else {
                mapCard.innerHTML += `<p>無地圖資訊</p>`;
            }

            const dateHeader = document.createElement('h2');
            dateHeader.textContent = `Day ${day.day}: ${day.date} - ${day.theme}`;
            dayCard.appendChild(dateHeader);

            // Remove the old day map link container as map is now separate
            // if (day.day_map_link) {
            //     const dayMapLinkContainer = document.createElement('div');
            //     dayMapLinkContainer.classList.add('day-map-link-container');
            //     dayMapLinkContainer.innerHTML = `<a href="${day.day_map_link}" target="_blank">查看當日綜合路線圖</a>`;
            //     dayCard.appendChild(dayMapLinkContainer);
            // }

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
                        let linkHtml = '';
                        if (activity.link) {
                            linkHtml = `<a href="${activity.link}" target="_blank">${activity.description} (${activity.location})</a>`;
                        } else {
                            linkHtml = `<span>${activity.description} (${activity.location})</span>`;
                        }

                        let mapLinkHtml = '';
                        if (activity.map_url) {
                            mapLinkHtml = `<a href="${activity.map_url}" target="_blank">MAP</a>`;
                        }

                        let noteHtml = '';
                        if (activity.note) {
                            noteHtml = `<div class="activity-note">${activity.note}</div>`;
                        }

                        listItem.innerHTML = `
                            <div class="activity-content">
                                <div class="activity-link-group">
                                    <div><strong>${activity.time}</strong> ${linkHtml}</div>
                                    ${noteHtml}
                                </div>
                                ${mapLinkHtml ? `<div class="map-link-wrapper">${mapLinkHtml}</div>` : ''}
                            </div>
                        `;
                        activitiesList.appendChild(listItem);

                        if (activity.options && activity.options.length > 0) {
                            const optionsList = document.createElement('ul');
                            optionsList.style.marginLeft = '20px'; // Indent options
                            activity.options.forEach(option => {
                                const optionItem = document.createElement('li');
                                let optionLinkHtml = '';
                                if (option.link) {
                                    optionLinkHtml = `<a href="${option.link}" target="_blank">${option.type === 'restaurant' ? '餐廳' : '景點'}: ${option.name}</a>`;
                                } else {
                                    optionLinkHtml = `<span>${option.type === 'restaurant' ? '餐廳' : '景點'}: ${option.name}</span>`;
                                }

                                let optionMapLinkHtml = '';
                                if (option.map_url) {
                                    optionMapLinkHtml = `<a href="${option.map_url}" target="_blank">MAP</a>`;
                                }

                                optionItem.innerHTML = `
                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <div>${optionLinkHtml}</div>
                                        ${optionMapLinkHtml ? `<div>${optionMapLinkHtml}</div>` : ''}
                                    </div>
                                `;
                                optionsList.appendChild(optionItem);
                            });
                            activitiesList.appendChild(optionsList);
                        }
                    });
                }
            };

            // Render morning activities for all days, including Day 6
            renderActivities(day.morning, '早上');

            // Special handling for Day 6 split activities for afternoon and evening
            if (day.day === 6 && (day.afternoon || day.evening)) {
                const splitContainer = document.createElement('div');
                splitContainer.classList.add('split-container'); // Add class for styling

                const sSaitamaGroup = document.createElement('div');
                sSaitamaGroup.classList.add('split-group'); // Add class for styling
                sSaitamaGroup.innerHTML = '<h4>A組</h4><ul></ul>';
                const sSaitamaList = sSaitamaGroup.querySelector('ul');

                const sDateGroup = document.createElement('div');
                sDateGroup.classList.add('split-group'); // Add class for styling
                sDateGroup.innerHTML = '<h4>B組</h4><ul></ul>';
                const sDateList = sDateGroup.querySelector('ul');

                const processSplitActivities = (activities, targetSaitamaList, targetDateList) => {
                    if (activities) {
                        activities.forEach(activity => {
                            const listItem = document.createElement('li');
                            let linkHtml = '';
                            if (activity.link) {
                                linkHtml = `<a href="${activity.link}" target="_blank">${activity.description} (${activity.location})</a>`;
                            } else {
                                linkHtml = `<span>${activity.description} (${activity.location})</span>`;
                            }

                            let mapLinkHtml = '';
                            if (activity.map_url) {
                                mapLinkHtml = `<a href="${activity.map_url}" target="_blank">MAP</a>`;
                            }

                            let noteHtml = '';
                            if (activity.note) {
                                noteHtml = `<div class="activity-note">${activity.note}</div>`;
                            }

                            listItem.innerHTML = `
                                <div class="activity-content">
                                    <div class="activity-link-group">
                                        <div><strong>${activity.time}</strong> ${linkHtml}</div>
                                        ${noteHtml}
                                    </div>
                                    ${mapLinkHtml ? `<div>${mapLinkHtml}</div>` : ''}
                                </div>
                            `;

                            if (activity.description.includes('A組')) {
                                targetSaitamaList.appendChild(listItem);
                            } else if (activity.description.includes('B組')) {
                                targetDateList.appendChild(listItem);
                            } else {
                                // For the "分開行動" activity itself, add it to the main list or handle as needed
                                activitiesList.appendChild(listItem);
                            }

                            if (activity.options && activity.options.length > 0) {
                                const optionsList = document.createElement('ul');
                                optionsList.classList.add('activity-options-list'); // Add class for styling
                                activity.options.forEach(option => {
                                    const optionItem = document.createElement('li');
                                    let optionLinkHtml = '';
                                    if (option.link) {
                                        optionLinkHtml = `<a href="${option.link}" target="_blank">${option.type === 'restaurant' ? '餐廳' : '景點'}: ${option.name}</a>`;
                                    } else {
                                        optionLinkHtml = `<span>${option.type === 'restaurant' ? '餐廳' : '景點'}: ${option.name}</span>`;
                                    }

                                    let optionMapLinkHtml = '';
                                    if (option.map_url) {
                                        optionMapLinkHtml = `<a href="${option.map_url}" target="_blank">MAP</a>`;
                                    }

                                    optionItem.innerHTML = `
                                        <div style="display: flex; justify-content: space-between; align-items: center;">
                                            <div>${optionLinkHtml}</div>
                                            ${optionMapLinkHtml ? `<div class="map-link-wrapper">${optionMapLinkHtml}</div>` : ''}
                                        </div>
                                    `;
                                    optionsList.appendChild(optionItem);
                                });
                                if (activity.description.includes('A組')) {
                                    targetSaitamaList.appendChild(optionsList);
                                } else if (activity.description.includes('B組')) {
                                    targetDateList.appendChild(optionsList);
                                }
                            }
                        });
                    }
                };

                // Process afternoon and evening activities for Day 6
                processSplitActivities(day.afternoon, sSaitamaList, sDateList);
                processSplitActivities(day.evening, sSaitamaList, sDateList);

                splitContainer.appendChild(sSaitamaGroup);
                splitContainer.appendChild(sDateGroup);
                activitiesList.appendChild(splitContainer);
            } else {
                // Normal rendering for other days or if no split activities on Day 6
                renderActivities(day.afternoon, '下午');
                renderActivities(day.evening, '晚上');
            }

            dayCard.appendChild(activitiesList);

            container.appendChild(dayCard);
            dayCard.appendChild(mapCard); // Append map card to day card
        });
    }
});