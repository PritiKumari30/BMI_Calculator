
const form = document.querySelector("form");
const result = document.querySelector("#results");
const historyDiv = document.querySelector("#history");
const clearBtn = document.querySelector("#clearHistory");


window.addEventListener("load", function () {
    showHistory();
});


form.addEventListener("submit", function (e) {
    e.preventDefault();

    const height = parseInt(document.querySelector("#height").value);
    const weight = parseInt(document.querySelector("#weight").value);

    // Validation
    if (isNaN(height) || height <= 0) {
        result.innerHTML = "Please enter a valid height";
        return;
    }

    if (isNaN(weight) || weight <= 0) {
        result.innerHTML = "Please enter a valid weight";
        return;
    }

    // Calculate BMI
    const bmi = weight / ((height * height) / 10000);

    // Remove previous color classes
    result.classList.remove("under", "normal", "over");

    let category = "";

    if (bmi < 18.6) {
        category = "Under Weight";
        result.classList.add("under");
    }
    else if (bmi <= 24.9) {
        category = "Normal";
        result.classList.add("normal");
    }
    else {
        category = "Over Weight";
        result.classList.add("over");
    }

    // Show Result
    result.innerHTML = `
        <h3>Your BMI is ${bmi.toFixed(2)}</h3>
        <p>${category}</p>
    `;

    // Save to History
    saveHistory(bmi.toFixed(2), category);

    // Refresh History UI
    showHistory();

    // Reset Form
    form.reset();
});


function saveHistory(bmi, category) {

    let historyData = JSON.parse(localStorage.getItem("bmiHistory")) || [];

    historyData.push({
        bmi: bmi,
        category: category
    });

    localStorage.setItem("bmiHistory", JSON.stringify(historyData));
}

function showHistory() {

    historyDiv.innerHTML = "";

    let historyData = JSON.parse(localStorage.getItem("bmiHistory")) || [];

    historyData.forEach(function (item) {
        historyDiv.innerHTML += `
            <p>BMI: ${item.bmi} (${item.category})</p>
        `;
    });
}


// Clear History Button

clearBtn.addEventListener("click", function () {
    localStorage.removeItem("bmiHistory");
    historyDiv.innerHTML = "";
});