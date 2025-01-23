// Global variables
let selectedPlan = null;
let currentProgress = 0;

// Utility functions
function showElement(elementId) {
    document.getElementById(elementId).classList.remove('hidden');
}

function hideElement(elementId) {
    document.getElementById(elementId).classList.add('hidden');
}

function showLoading() {
    const overlay = document.getElementById('loading-overlay');
    overlay.classList.remove('hidden');
    setTimeout(() => {
        overlay.classList.add('hidden');
    }, 1500);
}

// Plan selection handling
function showNutritionPlanOptions() {
    const mainContent = document.querySelector('.hero');
    const planOptions = document.getElementById('plan-options');
    
    if (mainContent && planOptions) {
        mainContent.style.display = 'none';
        planOptions.classList.remove('hidden');
        document.querySelector('.features-section').style.display = 'none';
    }
}

function selectPlan(planType) {
    selectedPlan = planType;
    
    // Visually indicate selected plan
    document.querySelectorAll('.plan-card').forEach(card => {
        if (card.getAttribute('data-plan') === planType) {
            card.classList.add('selected');
        } else {
            card.classList.remove('selected');
        }
    });

    // Show customization form
    const customizationForm = document.getElementById('plan-customization');
    if (customizationForm) {
        customizationForm.classList.remove('hidden');
        customizationForm.scrollIntoView({ behavior: 'smooth' });
    }
}

function generatePlan() {
    const duration = document.getElementById('duration').value;
    const dietType = document.getElementById('diet-type').value;
    const goal = document.getElementById('goal').value;

    if (!duration || !dietType || !goal) {
        alert('Please fill in all fields before generating your plan.');
        return;
    }

    showLoading();

    setTimeout(() => {
        // Hide plan selection and show generated plan
        document.getElementById('plan-options').classList.add('hidden');
        const generatedPlan = document.getElementById('generated-plan');
        generatedPlan.classList.remove('hidden');

        // Update plan details
        document.getElementById('plan-type-display').textContent = `Plan Type: ${selectedPlan}`;
        document.getElementById('plan-duration-display').textContent = `Duration: ${duration} days`;
        document.getElementById('plan-goal-display').textContent = `Goal: ${goal.replace('-', ' ')}`;

        // Generate plan content
        generatePlanContent(duration, dietType, goal);
        initializeProgressTracking(parseInt(duration));
        
        // Scroll to generated plan
        generatedPlan.scrollIntoView({ behavior: 'smooth' });
    }, 1500);
}

function generatePlanContent(duration, dietType, goal) {
    const planDetails = document.getElementById('plan-details');
    const daysPerPhase = 30;
    const phases = Math.ceil(duration / daysPerPhase);

    let planHTML = `
        <div class="plan-overview">
            <h3>Your Personalized ${duration}-Day ${dietType} Plan</h3>
            <p>Focused on: ${goal.replace('-', ' ')}</p>
        </div>
    `;

    for (let i = 0; i < phases; i++) {
        const phaseStart = i * daysPerPhase + 1;
        const phaseEnd = Math.min((i + 1) * daysPerPhase, duration);

        planHTML += `
            <div class="plan-phase">
                <h4>Phase ${i + 1} (Days ${phaseStart}-${phaseEnd})</h4>
                <div class="meal-plan">
                    <h5>Daily Meal Structure</h5>
                    <ul>
                        <li>
                            <strong>Breakfast:</strong> ${getMealSuggestion(dietType, 'breakfast', goal)}
                        </li>
                        <li>
                            <strong>Lunch:</strong> ${getMealSuggestion(dietType, 'lunch', goal)}
                        </li>
                        <li>
                            <strong>Dinner:</strong> ${getMealSuggestion(dietType, 'dinner', goal)}
                        </li>
                        <li>
                            <strong>Snacks:</strong> ${getMealSuggestion(dietType, 'snacks', goal)}
                        </li>
                    </ul>
                </div>
            </div>
        `;
    }

    planDetails.innerHTML = planHTML;
}

function getMealSuggestion(dietType, mealType, goal) {
    const mealSuggestions = {
        vegan: {
            breakfast: ['Oatmeal with fruits and nuts', 'Smoothie bowl with chia seeds', 'Tofu scramble'],
            lunch: ['Buddha bowl with quinoa', 'Lentil soup with vegetables', 'Chickpea salad'],
            dinner: ['Stir-fried tempeh', 'Black bean curry', 'Grilled vegetables with couscous'],
            snacks: ['Mixed nuts', 'Fresh fruit', 'Hummus with vegetables']
        },
        vegetarian: {
            breakfast: ['Greek yogurt parfait', 'Vegetable omelette', 'Cottage cheese with fruit'],
            lunch: ['Mediterranean salad', 'Veggie wrap', 'Quinoa bowl'],
            dinner: ['Vegetable stir-fry', 'Bean burrito', 'Eggplant parmesan'],
            snacks: ['Cheese and crackers', 'Trail mix', 'Yogurt with granola']
        },
        balanced: {
            breakfast: ['Eggs with whole grain toast', 'Protein smoothie', 'Overnight oats'],
            lunch: ['Grilled chicken salad', 'Tuna sandwich', 'Turkey wrap'],
            dinner: ['Salmon with vegetables', 'Lean beef stir-fry', 'Baked chicken'],
            snacks: ['Protein bar', 'Apple with peanut butter', 'Greek yogurt']
        },
        keto: {
            breakfast: ['Bacon and eggs', 'Keto smoothie', 'Avocado and eggs'],
            lunch: ['Chicken Caesar salad', 'Tuna salad', 'Beef and vegetables'],
            dinner: ['Grilled salmon', 'Chicken with cauliflower rice', 'Steak with vegetables'],
            snacks: ['Cheese cubes', 'Almonds', 'Pork rinds']
        },
        paleo: {
            breakfast: ['Eggs with sweet potato', 'Turkey breakfast hash', 'Fruit and nuts'],
            lunch: ['Chicken and vegetable soup', 'Tuna lettuce wraps', 'Grilled meat skewers'],
            dinner: ['Grilled fish', 'Roasted chicken', 'Beef stir-fry'],
            snacks: ['Mixed nuts', 'Beef jerky', 'Fresh fruit']
        }
    };

    const suggestions = mealSuggestions[dietType]?.[mealType] || ['Customized meal based on your preferences'];
    return suggestions[Math.floor(Math.random() * suggestions.length)];
}

function initializeProgressTracking(duration) {
    const progressBar = document.querySelector('.progress');
    if (progressBar) {
        progressBar.style.width = '0%';
        
        // Simulate progress for demo purposes
        let progress = 0;
        const interval = setInterval(() => {
            progress += 1;
            progressBar.style.width = `${(progress / duration) * 100}%`;
            
            if (progress >= duration) {
                clearInterval(interval);
            }
        }, 50);
    }
}

function downloadPlan() {
    const planContent = document.getElementById('plan-details').innerText;
    const blob = new Blob([planContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-nutrition-plan.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

function resetPlan() {
    // Reset all selections and forms
    selectedPlan = null;
    document.getElementById('duration').value = '';
    document.getElementById('diet-type').value = '';
    document.getElementById('goal').value = '';

    // Show initial content
    document.querySelector('.hero').style.display = 'flex';
    document.querySelector('.features-section').style.display = 'block';
    document.getElementById('plan-options').classList.add('hidden');
    document.getElementById('generated-plan').classList.add('hidden');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add click handlers for plan cards
    document.querySelectorAll('.plan-card').forEach(card => {
        card.addEventListener('click', () => {
            const planType = card.getAttribute('data-plan');
            selectPlan(planType);
        });
    });
});