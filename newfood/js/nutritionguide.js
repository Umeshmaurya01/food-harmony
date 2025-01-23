// Add this JavaScript to handle the expandable content
document.addEventListener('DOMContentLoaded', function() {
    const expandButtons = document.querySelectorAll('.nutriee-card-btn');
    
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            
            // Toggle active class on button and content
            this.classList.toggle('active');
            targetContent.classList.toggle('active');
            
            // Close other expanded sections
            expandButtons.forEach(otherButton => {
                if (otherButton !== this) {
                    const otherId = otherButton.getAttribute('data-target');
                    const otherContent = document.getElementById(otherId);
                    otherButton.classList.remove('active');
                    otherContent.classList.remove('active');
                }
            });
        });
    });

    // Hydration tracker functionality
    const glasses = document.querySelectorAll('.nutriee-glass');
    glasses.forEach((glass, index) => {
        glass.addEventListener('click', () => {
            glasses.forEach((g, i) => {
                if (i <= index) {
                    g.classList.add('active');
                } else {
                    g.classList.remove('active');
                }
            });
            updateWaterIntake(index + 1);
        });
    });

    function updateWaterIntake(count) {
        const tracker = document.querySelector('.nutriee-hydration-tracker p');
        tracker.textContent = `Track your daily water intake: ${count}/8 glasses`;
    }
});




















document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });

    // Plate Interaction
    const plateSegments = document.querySelectorAll('.nutriee-plate-segment');
    const infoPanels = document.querySelectorAll('.nutriee-info-content');
    const defaultInfo = document.querySelector('.nutriee-info-default');

    plateSegments.forEach(segment => {
        segment.addEventListener('click', function() {
            // Get category from data attribute
            const category = this.classList[1];
            const targetPanel = document.getElementById(`${category}-info`);

            // Remove active class from all segments
            plateSegments.forEach(seg => {
                seg.classList.remove('active');
                seg.style.filter = 'brightness(1)';
            });

            // Add active class to clicked segment
            this.classList.add('active');
            this.style.filter = 'brightness(1.2)';

            // Hide default info
            defaultInfo.style.display = 'none';

            // Hide all panels and show target panel with animation
            infoPanels.forEach(panel => {
                panel.classList.remove('active');
            });
            
            if (targetPanel) {
                targetPanel.classList.add('active');
                targetPanel.style.animation = 'fadeIn 0.3s ease-in-out';
            }
        });
    });


    // Add scroll animation with AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Add hover effect for info cards
    const infoCards = document.querySelectorAll('.nutriee-info-card');
    infoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Reinitialize tooltip positions
            tooltipList.forEach(tooltip => tooltip.update());
        }, 250);
    });
});

















document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Initialize Bootstrap tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });

    // Myth Card Interactions
    const mythCards = document.querySelectorAll('.nutriee-myth-card');
    
    mythCards.forEach(card => {
        const btn = card.querySelector('.nutriee-myth-btn');
        const expandedContent = card.querySelector('.nutriee-myth-expanded');
        
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });

        // Handle button click animation
        if (btn) {
            btn.addEventListener('click', function() {
                const icon = this.querySelector('i');
                icon.style.transform = this.getAttribute('aria-expanded') === 'true' 
                    ? 'rotate(0deg)' 
                    : 'rotate(180deg)';
            });
        }

        // Add animation to expanded content
        if (expandedContent) {
            expandedContent.addEventListener('show.bs.collapse', function() {
                this.style.animation = 'slideDown 0.3s ease-out forwards';
            });

            expandedContent.addEventListener('hide.bs.collapse', function() {
                this.style.animation = 'slideUp 0.3s ease-out forwards';
            });
        }
    });

    // Intersection Observer for animation triggers
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.nutriee-myth-card').forEach(card => {
        observer.observe(card);
    });
});

// Add these animations to your CSS
document.head.insertAdjacentHTML('beforeend', `
    <style>
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes slideUp {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(-20px);
            }
        }
    </style>
`);


















document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Initialize BMI Calculator
    const bmiForm = document.getElementById('bmiForm');
    const bmiGaugeCtx = document.getElementById('bmiGauge');
    let bmiGauge;

    if (bmiGaugeCtx) {
        bmiGauge = new Chart(bmiGaugeCtx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [0, 100],
                    backgroundColor: [
                        'rgba(46, 204, 113, 0.2)',
                        'rgba(236, 240, 241, 0.5)'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                cutout: '80%',
                rotation: -90,
                circumference: 180,
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false }
                }
            }
        });
    }

    // BMI Calculator Event Handlers
    if (bmiForm) {
        bmiForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateBMI();
        });

        // Real-time unit conversion
        const heightInput = document.getElementById('height');
        const heightUnit = document.getElementById('heightUnit');
        const weightInput = document.getElementById('weight');
        const weightUnit = document.getElementById('weightUnit');

        heightUnit.addEventListener('change', function() {
            if (heightInput.value) {
                heightInput.value = convertHeight(
                    parseFloat(heightInput.value),
                    this.value === 'cm' ? 'ft' : 'cm',
                    this.value
                );
            }
        });

        weightUnit.addEventListener('change', function() {
            if (weightInput.value) {
                weightInput.value = convertWeight(
                    parseFloat(weightInput.value),
                    this.value === 'kg' ? 'lb' : 'kg',
                    this.value
                );
            }
        });
    }

    // Calorie Calculator
    const calorieForm = document.getElementById('calorieForm');
    if (calorieForm) {
        calorieForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateCalories();
        });
    }

    // Nutrient Tracker
    const addFoodBtns = document.querySelectorAll('.nutriii-add-food-btn');
    addFoodBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            showFoodModal(this.dataset.meal);
        });
    });

    // BMI Calculation Functions
    function calculateBMI() {
        try {
            const height = parseFloat(document.getElementById('height').value);
            const weight = parseFloat(document.getElementById('weight').value);
            const heightUnit = document.getElementById('heightUnit').value;
            const weightUnit = document.getElementById('weightUnit').value;

            if (!height || !weight) {
                throw new Error('Please enter both height and weight');
            }

            // Convert to metric if needed
            let heightInMeters = heightUnit === 'cm' ? height / 100 : height * 0.3048;
            let weightInKg = weightUnit === 'kg' ? weight : weight * 0.453592;

            // Calculate BMI
            const bmi = weightInKg / (heightInMeters * heightInMeters);
            updateBMIDisplay(bmi);

        } catch (error) {
            showError(error.message);
        }
    }

    function updateBMIDisplay(bmi) {
        const bmiValue = document.getElementById('bmiValue');
        const bmiCategory = document.getElementById('bmiCategory');

        // Determine category and color
        let category, color;
        if (bmi < 18.5) {
            category = 'Underweight';
            color = '#f1c40f';
        } else if (bmi < 25) {
            category = 'Normal';
            color = '#2ecc71';
        } else if (bmi < 30) {
            category = 'Overweight';
            color = '#e67e22';
        } else {
            category = 'Obese';
            color = '#e74c3c';
        }

        // Update displays with animation
        animateValue(bmiValue, parseFloat(bmiValue.textContent) || 0, bmi, 1000);
        bmiCategory.textContent = category;
        bmiCategory.style.color = color;

        // Update gauge
        if (bmiGauge) {
            bmiGauge.data.datasets[0].data[0] = Math.min(bmi, 40);
            bmiGauge.data.datasets[0].data[1] = Math.max(40 - bmi, 0);
            bmiGauge.data.datasets[0].backgroundColor[0] = color;
            bmiGauge.update();
        }
    }

    // Calorie Calculation Functions
    function calculateCalories() {
        try {
            const age = parseInt(document.getElementById('age').value);
            const gender = document.querySelector('input[name="gender"]:checked').value;
            const weight = parseFloat(document.getElementById('weight').value);
            const height = parseFloat(document.getElementById('height').value);
            const activity = parseFloat(document.getElementById('activityLevel').value);
            const goal = document.getElementById('goal').value;

            // Calculate BMR using Mifflin-St Jeor Equation
            let bmr;
            if (gender === 'male') {
                bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
            } else {
                bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
            }

            // Calculate TDEE
            let tdee = bmr * activity;

            // Adjust for goal
            let calories;
            switch(goal) {
                case 'lose':
                    calories = tdee - 500;
                    break;
                case 'gain':
                    calories = tdee + 500;
                    break;
                default:
                    calories = tdee;
            }

            updateCalorieDisplay(calories);

        } catch (error) {
            showError(error.message);
        }
    }

    function updateCalorieDisplay(calories) {
        const calorieValue = document.getElementById('calorieValue');
        
        // Calculate macros
        const protein = Math.round((calories * 0.3) / 4);
        const carbs = Math.round((calories * 0.45) / 4);
        const fats = Math.round((calories * 0.25) / 9);

        // Update displays with animation
        animateValue(calorieValue, parseInt(calorieValue.textContent) || 0, Math.round(calories), 1000);
        document.getElementById('proteinGrams').textContent = `${protein}g`;
        document.getElementById('carbsGrams').textContent = `${carbs}g`;
        document.getElementById('fatsGrams').textContent = `${fats}g`;
    }

    // Utility Functions
    function convertHeight(value, fromUnit, toUnit) {
        if (fromUnit === 'cm' && toUnit === 'ft') {
            return (value / 30.48).toFixed(2);
        } else if (fromUnit === 'ft' && toUnit === 'cm') {
            return (value * 30.48).toFixed(1);
        }
        return value;
    }

    function convertWeight(value, fromUnit, toUnit) {
        if (fromUnit === 'kg' && toUnit === 'lb') {
            return (value * 2.20462).toFixed(1);
        } else if (fromUnit === 'lb' && toUnit === 'kg') {
            return (value / 2.20462).toFixed(1);
        }
        return value;
    }

    function animateValue(element, start, end, duration) {
        if (start === end) return;
        const range = end - start;
        const increment = end > start ? 1 : -1;
        const stepTime = Math.abs(Math.floor(duration / range));
        let current = start;
        const timer = setInterval(function() {
            current += increment;
            element.textContent = current.toFixed(1);
            if (current === end) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    function showError(message) {
        // Create and show error toast
        const toast = document.createElement('div');
        toast.className = 'nutriii-toast error';
        toast.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(toast);

        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    // Food Modal Functions
    function showFoodModal(meal) {
        const modalHtml = `
            <div class="modal fade" id="foodModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Add Food to ${meal.charAt(0).toUpperCase() + meal.slice(1)}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <form id="foodEntryForm">
                                <div class="nutriii-input-group">
                                    <label>Food Item</label>
                                    <input type="text" class="form-control" required>
                                </div>
                                <div class="nutriii-input-group">
                                    <label>Portion Size</label>
                                    <input type="number" class="form-control" required>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" form="foodEntryForm" class="btn btn-primary">Add Food</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);
        const modal = new bootstrap.Modal(document.getElementById('foodModal'));
        modal.show();

        // Clean up modal after hiding
        document.getElementById('foodModal').addEventListener('hidden.bs.modal', function() {
            this.remove();
        });
    }
});





















document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Resource configurations
    const resources = {
        'meal-planner': {
            title: 'Weekly Meal Planner',
            filename: 'weekly-meal-planner.pdf',
            size: '2.4 MB',
            type: 'application/pdf'
        },
        'recipes': {
            title: 'Healthy Recipe Collection',
            filename: 'healthy-recipe-collection.pdf',
            size: '5.1 MB',
            type: 'application/pdf'
        },
        'calculator': {
            title: 'Nutrition Calculator',
            filename: 'nutrition-calculator.xlsx',
            size: '1.8 MB',
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        },
        'shopping-guide': {
            title: 'Smart Shopping Guide',
            filename: 'smart-shopping-guide.pdf',
            size: '3.2 MB',
            type: 'application/pdf'
        }
    };

    // Initialize download buttons
    const downloadButtons = document.querySelectorAll('.nutrrrr-download-btn');
    downloadButtons.forEach(button => {
        button.addEventListener('click', handleDownloadClick);
    });

    // Handle download button click
    function handleDownloadClick(e) {
        const resourceId = this.dataset.resource;
        const resource = resources[resourceId];

        if (!resource) {
            showNotification('Resource not found', 'error');
            return;
        }

        // Create and show download modal
        showDownloadModal(resource);
        simulateDownload(resource);
    }

    // Show download modal
    function showDownloadModal(resource) {
        const modal = document.getElementById('downloadModal');
        if (!modal) return;

        // Reset progress
        const progressPath = modal.querySelector('.progress');
        const percentage = modal.querySelector('.percentage');
        const statusText = modal.querySelector('.status-text');

        progressPath.style.strokeDashoffset = '100';
        percentage.textContent = '0%';
        statusText.textContent = 'Preparing download...';

        // Show modal
        modal.style.display = 'block';
        setTimeout(() => modal.classList.add('active'), 10);

        // Initialize close button
        const closeBtn = modal.querySelector('.nutrrrr-modal-close');
        closeBtn.addEventListener('click', () => hideDownloadModal(modal));
    }

    // Hide download modal
    function hideDownloadModal(modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    // Simulate download progress
    function simulateDownload(resource) {
        const modal = document.getElementById('downloadModal');
        const progressPath = modal.querySelector('.progress');
        const percentage = modal.querySelector('.percentage');
        const statusText = modal.querySelector('.status-text');

        let progress = 0;
        const interval = setInterval(() => {
            progress += 1;
            
            // Update progress circle
            const offset = 100 - progress;
            progressPath.style.strokeDashoffset = offset;
            percentage.textContent = `${progress}%`;

            // Update status text
            if (progress === 30) {
                statusText.textContent = 'Downloading...';
            } else if (progress === 60) {
                statusText.textContent = 'Almost there...';
            } else if (progress === 100) {
                statusText.textContent = 'Download complete!';
                clearInterval(interval);
                
                // Create dummy file and trigger download
                createAndDownloadFile(resource);
                
                // Close modal after download
                setTimeout(() => {
                    hideDownloadModal(modal);
                    showNotification('Download completed successfully!', 'success');
                }, 1000);
            }
        }, 50);
    }

    // Create and trigger file download
    function createAndDownloadFile(resource) {
        // Create dummy content based on resource type
        let content = '';
        if (resource.type.includes('pdf')) {
            content = `%PDF-1.5\n${resource.title} - Dummy PDF content`;
        } else if (resource.type.includes('sheet')) {
            content = `${resource.title} - Dummy Excel content`;
        }

        // Create blob and download
        const blob = new Blob([content], { type: resource.type });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = resource.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    }

    // Show notification
    function showNotification(message, type = 'success') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.nutrrrr-notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `nutrrrr-notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .nutrrrr-notification {
                position: fixed;
                bottom: 20px;
                right: 20px;
                padding: 15px 25px;
                border-radius: 50px;
                background: white;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                display: flex;
                align-items: center;
                gap: 10px;
                z-index: 1000;
                animation: slideIn 0.3s ease forwards;
            }

            .nutrrrr-notification.success {
                border-left: 4px solid var(--nutrrrr-primary);
            }

            .nutrrrr-notification.error {
                border-left: 4px solid #e74c3c;
            }

            .nutrrrr-notification i {
                font-size: 1.2rem;
            }

            .nutrrrr-notification.success i {
                color: var(--nutrrrr-primary);
            }

            .nutrrrr-notification.error i {
                color: #e74c3c;
            }

            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;

        // Add to document
        document.head.appendChild(style);
        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => {
                notification.remove();
                style.remove();
            }, 300);
        }, 3000);
    }
});









