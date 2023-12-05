document.getElementById("fundTransferForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    fetch(form.action, {
        method: form.method,
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.bankStatus === "ACCEPTED") {
            const amountTransferred = data.transferTransactionInformation.instructedAmount.amount;
            const beneficiaryAccount = data.transferTransactionInformation.counterpartyAccount.identification.identification;

            // Create a success message with color and animation
            const successMessage = document.getElementById("successMessage");
            successMessage.style.backgroundColor = "#4CAF50"; // Green color
            successMessage.style.display = "block";
            successMessage.innerHTML = `Transfer of ${amountTransferred} to account ${beneficiaryAccount} was successful.`;

            // Animate the success message
            setTimeout(() => {
                successMessage.style.animation = "slideOut 1s ease-in";
                setTimeout(() => {
                    successMessage.style.display = "none";
                }, 1000);
            }, 2000);

            // Optionally, you can clear the form or perform any other actions here.
            form.reset();
        } else {
            // Handle other status responses or errors here.
            console.error(data.reasonText);
            // You can display an error message to the user if needed.
        }
    })
    .catch(error => {
        // Handle errors here (e.g., display an error message to the user).
        console.error(error);
    });
});
