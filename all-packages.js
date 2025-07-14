// All Packages JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize package filtering and search
    initializePackageFilters();
    initializePackageDetails();
    initializeFavorites();
    initializeViewToggle();
    
    // Package data for detailed modals
    const packageDetails = {
        'uganda-safari': {
            title: '15-Day Ultimate Uganda Safari',
            price: 3200,
            duration: '15 Days / 14 Nights',
            maxPeople: '8 People',
            difficulty: 'Moderate',
            highlights: [
                'Gorilla trekking in Bwindi Impenetrable Forest',
                'Big 5 game viewing in Queen Elizabeth National Park',
                'Chimpanzee tracking in Kibale Forest',
                'Nile boat safari at Murchison Falls',
                'Cultural encounters with local communities'
            ],
            itinerary: [
                { day: 1, title: 'Arrival in Entebbe', description: 'Airport pickup and transfer to hotel' },
                { day: 2, title: 'Transfer to Murchison Falls', description: 'Game drive and boat safari' },
                { day: 3, title: 'Murchison Falls Exploration', description: 'Morning game drive, afternoon boat cruise' },
                // Add more days as needed
            ],
            gallery: [
                'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80'
            ],
            included: [
                'All accommodation (luxury lodges)',
                'All meals during the safari',
                'Professional safari guide',
                'Game drives and boat safaris',
                'Gorilla and chimpanzee permits',
                'All park entrance fees',
                'Airport transfers'
            ],
            notIncluded: [
                'International flights',
                'Travel insurance',
                'Personal expenses',
                'Alcoholic beverages',
                'Tips for guides',
                'Visa fees'
            ]
        },
        'gorilla-golden': {
            title: '5-Day Gorilla & Golden Monkeys',
            price: 1450,
            duration: '5 Days / 4 Nights',
            maxPeople: '6 People',
            difficulty: 'Moderate',
            highlights: [
                'Mountain gorilla trekking in Bwindi',
                'Golden monkey tracking in Mgahinga',
                'Batwa cultural experience',
                'Scenic drives through southwestern Uganda',
                'Expert primate guides'
            ],
            gallery: [
                'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1606897623479-3b51b6bb4e48?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1564760290817-d2a8e6ac0b9e?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80'
            ],
            included: [
                'Gorilla and golden monkey permits',
                'Eco-lodge accommodation',
                'All meals',
                'Professional guides',
                'Transportation',
                'Batwa cultural experience'
            ],
            notIncluded: [
                'International flights',
                'Travel insurance',
                'Personal expenses',
                'Porter services',
                'Tips',
                'Visa fees'
            ]
        },
        'kilimanjaro': {
            title: '8-Day Kilimanjaro Machame Route',
            price: 2100,
            duration: '8 Days / 7 Nights',
            maxPeople: '12 People',
            difficulty: 'Challenging',
            highlights: [
                'Summit Africa\'s highest peak (5,895m)',
                'Scenic Machame route through diverse ecosystems',
                'Professional mountain guides and porters',
                'Certificate of achievement',
                'Pre-climb briefing and equipment check'
            ],
            gallery: [
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1464822759844-d150baec955b?auto=format&fit=crop&w=800&q=80'
            ],
            included: [
                'Professional mountain guides',
                'Porters and cook',
                'All camping equipment',
                'All meals on the mountain',
                'Park fees and permits',
                'Summit certificate'
            ],
            notIncluded: [
                'International flights',
                'Travel insurance',
                'Personal climbing gear',
                'Tips for guides and porters',
                'Personal expenses',
                'Medication'
            ]
        }
        // Add more package details as needed
    };

    function initializePackageFilters() {
        const searchInput = document.getElementById('package-search');
        const durationFilter = document.getElementById('duration-filter');
        const priceFilter = document.getElementById('price-filter');
        const categoryFilter = document.getElementById('category-filter');
        const countryFilter = document.getElementById('country-filter');
        const groupFilter = document.getElementById('group-filter');
        const difficultyFilter = document.getElementById('difficulty-filter');
        const accommodationFilter = document.getElementById('accommodation-filter');
        const sortFilter = document.getElementById('sort-filter');
        const clearFiltersBtn = document.getElementById('clear-filters');

        // Add event listeners for all filters
        [searchInput, durationFilter, priceFilter, categoryFilter, countryFilter, 
         groupFilter, difficultyFilter, accommodationFilter, sortFilter].forEach(filter => {
            if (filter) {
                filter.addEventListener('change', applyFilters);
                filter.addEventListener('input', applyFilters);
            }
        });

        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', clearAllFilters);
        }
    }

    function applyFilters() {
        const packages = document.querySelectorAll('.package-card');
        const searchTerm = document.getElementById('package-search').value.toLowerCase();
        const durationFilter = document.getElementById('duration-filter').value;
        const priceFilter = document.getElementById('price-filter').value;
        const categoryFilter = document.getElementById('category-filter').value;
        const countryFilter = document.getElementById('country-filter').value;
        const groupFilter = document.getElementById('group-filter').value;
        const difficultyFilter = document.getElementById('difficulty-filter').value;
        const accommodationFilter = document.getElementById('accommodation-filter').value;
        const sortFilter = document.getElementById('sort-filter').value;

        let visiblePackages = [];

        packages.forEach(packageCard => {
            let isVisible = true;

            // Search filter
            if (searchTerm) {
                const title = packageCard.querySelector('h3').textContent.toLowerCase();
                const description = packageCard.querySelector('p').textContent.toLowerCase();
                if (!title.includes(searchTerm) && !description.includes(searchTerm)) {
                    isVisible = false;
                }
            }

            // Duration filter
            if (durationFilter && isVisible) {
                const duration = parseInt(packageCard.dataset.duration);
                switch (durationFilter) {
                    case '1-3':
                        if (duration < 1 || duration > 3) isVisible = false;
                        break;
                    case '4-7':
                        if (duration < 4 || duration > 7) isVisible = false;
                        break;
                    case '8-14':
                        if (duration < 8 || duration > 14) isVisible = false;
                        break;
                    case '15+':
                        if (duration < 15) isVisible = false;
                        break;
                }
            }

            // Price filter
            if (priceFilter && isVisible) {
                const price = parseInt(packageCard.dataset.price);
                switch (priceFilter) {
                    case '0-1000':
                        if (price >= 1000) isVisible = false;
                        break;
                    case '1000-2500':
                        if (price < 1000 || price > 2500) isVisible = false;
                        break;
                    case '2500-5000':
                        if (price < 2500 || price > 5000) isVisible = false;
                        break;
                    case '5000+':
                        if (price < 5000) isVisible = false;
                        break;
                }
            }

            // Category filter
            if (categoryFilter && isVisible) {
                if (packageCard.dataset.category !== categoryFilter) {
                    isVisible = false;
                }
            }

            // Country filter
            if (countryFilter && isVisible) {
                if (packageCard.dataset.country !== countryFilter) {
                    isVisible = false;
                }
            }

            // Group size filter
            if (groupFilter && isVisible) {
                const group = packageCard.dataset.group;
                if (group !== groupFilter) {
                    isVisible = false;
                }
            }

            // Difficulty filter
            if (difficultyFilter && isVisible) {
                if (packageCard.dataset.difficulty !== difficultyFilter) {
                    isVisible = false;
                }
            }

            // Accommodation filter
            if (accommodationFilter && isVisible) {
                if (packageCard.dataset.accommodation !== accommodationFilter) {
                    isVisible = false;
                }
            }

            // Show/hide package
            if (isVisible) {
                packageCard.style.display = 'block';
                visiblePackages.push(packageCard);
            } else {
                packageCard.style.display = 'none';
            }
        });

        // Apply sorting
        if (sortFilter && visiblePackages.length > 0) {
            sortPackages(visiblePackages, sortFilter);
        }

        // Update results count
        updateResultsCount(visiblePackages.length);
    }

    function sortPackages(packages, sortType) {
        const container = document.getElementById('packages-container');
        
        packages.sort((a, b) => {
            switch (sortType) {
                case 'price-low':
                    return parseInt(a.dataset.price) - parseInt(b.dataset.price);
                case 'price-high':
                    return parseInt(b.dataset.price) - parseInt(a.dataset.price);
                case 'duration-short':
                    return parseInt(a.dataset.duration) - parseInt(b.dataset.duration);
                case 'duration-long':
                    return parseInt(b.dataset.duration) - parseInt(a.dataset.duration);
                case 'rating':
                    // Sort by star rating (you'd need to add rating data attributes)
                    return 0; // Placeholder
                case 'popular':
                default:
                    return 0; // Keep original order
            }
        });

        // Reorder packages in DOM
        packages.forEach(package => {
            container.appendChild(package);
        });
    }

    function clearAllFilters() {
        document.getElementById('package-search').value = '';
        document.getElementById('duration-filter').value = '';
        document.getElementById('price-filter').value = '';
        document.getElementById('category-filter').value = '';
        document.getElementById('country-filter').value = '';
        document.getElementById('group-filter').value = '';
        document.getElementById('difficulty-filter').value = '';
        document.getElementById('accommodation-filter').value = '';
        document.getElementById('sort-filter').value = 'popular';
        
        applyFilters();
    }

    function updateResultsCount(count) {
        const resultsElement = document.getElementById('results-count');
        if (resultsElement) {
            resultsElement.textContent = `Showing ${count} package${count !== 1 ? 's' : ''}`;
        }
    }

    function initializePackageDetails() {
        const detailButtons = document.querySelectorAll('.package-details-btn');
        const modal = document.getElementById('package-modal');
        const modalContent = document.getElementById('modal-content');

        detailButtons.forEach(button => {
            button.addEventListener('click', function() {
                const packageId = this.dataset.package;
                const details = packageDetails[packageId];
                
                if (details) {
                    showPackageModal(details);
                }
            });
        });

        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                hidePackageModal();
            }
        });

        // Close modal with escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                hidePackageModal();
            }
        });
    }

    function showPackageModal(details) {
        const modal = document.getElementById('package-modal');
        const modalContent = document.getElementById('modal-content');
        
        modalContent.innerHTML = `
            <div class="flex justify-between items-start mb-6">
                <div>
                    <h2 class="text-3xl font-bold text-gray-900 mb-2">${details.title}</h2>
                    <div class="flex items-center text-gray-600">
                        <i class="fas fa-clock mr-2"></i>
                        <span class="mr-4">${details.duration}</span>
                        <i class="fas fa-users mr-2"></i>
                        <span class="mr-4">Max ${details.maxPeople}</span>
                        <i class="fas fa-chart-line mr-2"></i>
                        <span>${details.difficulty}</span>
                    </div>
                </div>
                <button onclick="hidePackageModal()" class="text-gray-400 hover:text-gray-600 text-2xl">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <!-- Gallery -->
            <div class="grid grid-cols-2 gap-2 mb-6">
                ${details.gallery.map(image => `
                    <div class="h-48 bg-cover bg-center rounded-lg" style="background-image: url('${image}');"></div>
                `).join('')}
            </div>

            <!-- Package Highlights -->
            <div class="mb-6">
                <h3 class="text-xl font-bold text-gray-900 mb-3">Package Highlights</h3>
                <ul class="grid md:grid-cols-2 gap-2">
                    ${details.highlights.map(highlight => `
                        <li class="flex items-center text-gray-700">
                            <i class="fas fa-check text-green-500 mr-2"></i>
                            ${highlight}
                        </li>
                    `).join('')}
                </ul>
            </div>

            <!-- What's Included/Not Included -->
            <div class="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                    <h4 class="text-lg font-semibold text-green-600 mb-3">✓ What's Included</h4>
                    <ul class="space-y-1">
                        ${details.included.map(item => `
                            <li class="text-sm text-gray-600">• ${item}</li>
                        `).join('')}
                    </ul>
                </div>
                <div>
                    <h4 class="text-lg font-semibold text-red-600 mb-3">✗ What's Not Included</h4>
                    <ul class="space-y-1">
                        ${details.notIncluded.map(item => `
                            <li class="text-sm text-gray-600">• ${item}</li>
                        `).join('')}
                    </ul>
                </div>
            </div>

            <!-- Price and Booking -->
            <div class="bg-stone-50 rounded-lg p-6">
                <div class="flex justify-between items-center mb-4">
                    <div>
                        <span class="text-3xl font-bold text-green-600">$${details.price.toLocaleString()}</span>
                        <span class="text-gray-500">/person</span>
                    </div>
                    <div class="flex items-center text-yellow-400">
                        <i class="fas fa-star text-sm"></i>
                        <i class="fas fa-star text-sm"></i>
                        <i class="fas fa-star text-sm"></i>
                        <i class="fas fa-star text-sm"></i>
                        <i class="fas fa-star text-sm"></i>
                        <span class="text-gray-600 text-sm ml-1">(4.8)</span>
                    </div>
                </div>
                <div class="flex gap-3">
                    <a href="booking.html#booking-form" class="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold transition duration-300 text-center">
                        Book Now
                    </a>
                    <a href="contact.html" class="flex-1 border border-amber-600 text-amber-600 hover:bg-amber-50 py-3 rounded-lg font-semibold transition duration-300 text-center">
                        Get Custom Quote
                    </a>
                </div>
            </div>
        `;
        
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    // Make hidePackageModal globally available
    window.hidePackageModal = function() {
        const modal = document.getElementById('package-modal');
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    };

    function initializeFavorites() {
        const favoriteButtons = document.querySelectorAll('.package-favorite');
        
        favoriteButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const icon = this.querySelector('i');
                if (icon.classList.contains('far')) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    this.classList.add('text-red-500');
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    this.classList.remove('text-red-500');
                }
            });
        });
    }

    function initializeViewToggle() {
        const gridViewBtn = document.getElementById('grid-view');
        const listViewBtn = document.getElementById('list-view');
        const packagesContainer = document.getElementById('packages-container');

        if (gridViewBtn && listViewBtn) {
            gridViewBtn.addEventListener('click', function() {
                packagesContainer.className = 'grid md:grid-cols-2 xl:grid-cols-3 gap-8';
                this.className = 'p-2 bg-amber-100 text-amber-600 rounded';
                listViewBtn.className = 'p-2 text-gray-400 hover:text-gray-600 rounded';
            });

            listViewBtn.addEventListener('click', function() {
                packagesContainer.className = 'space-y-6';
                this.className = 'p-2 bg-amber-100 text-amber-600 rounded';
                gridViewBtn.className = 'p-2 text-gray-400 hover:text-gray-600 rounded';
                
                // Update cards for list view
                const cards = packagesContainer.querySelectorAll('.package-card');
                cards.forEach(card => {
                    card.className = card.className.replace('transform hover:scale-105', '');
                });
            });
        }
    }

    // Load more packages functionality
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // This would typically load more packages from an API
            // For now, we'll just hide the button
            this.textContent = 'All packages loaded';
            this.disabled = true;
            this.classList.add('opacity-50', 'cursor-not-allowed');
        });
    }

    // Initialize with all packages visible
    updateResultsCount(document.querySelectorAll('.package-card').length);
});
