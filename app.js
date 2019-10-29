//Listen for submit
document.querySelector('form').addEventListener('submit', calculateResults);

// Calculate Function
function calculateResults(e){
    //Show Progress Ring
    showLoading();

    //UI Vats
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalinterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Compute monthly payment
    const x = Math.pow( 1 + calculatedInterest, calculatedPayments );
    const monthly = ( principal * x * calculatedInterest) / ( x - 1 );

    setTimeout(function () {
        
        if (isFinite(monthly)) {
            monthlyPayment.value = monthly.toFixed(2);
            totalPayment.value = (monthly * calculatedPayments).toFixed(2);
            totalinterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
            loading.style.display = 'none';
            results.style.display = 'block';
        } else {
            loading.style.display = 'none';
            showError('Please check your numbers');
        }
    }, 3000)

    

    e.preventDefault();
}

//Show Loading
function showLoading(){
    //UI Vars
    const loading = document.getElementById('loading');
    const results = document.getElementById('results');

    //Hide Results
    results.style.display = 'none';
    //Show Loading Ring
    loading.style.display = 'block';
}

//Show errors
function showError(error){
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    const errorDiv = document.createElement('div');
    
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));

    // insert alert
    card.prepend(errorDiv)
    // card.insertBefore(errorDiv, heading);

    // clear error after 3 sec
    setTimeout(clearError, 3000);
}

//Clear Error
function clearError(){
    document.querySelector('.alert').remove();
}