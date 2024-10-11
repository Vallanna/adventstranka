document.getElementById('submitAnswerBtn').addEventListener('click', function() {
    const answer = document.getElementById('answerInput').value;

    // Process the answer (send to the server or handle it locally)
    console.log("Submitted Answer:", answer);

    // Example: Send the answer to the server
    fetch('https://matuslibak.pythonanywhere.com/submit_answer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ answer: answer })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Answer submitted:", data);
        // Handle response (show message, redirect, etc.)
    })
    .catch(error => {
        console.error("Error:", error);
    });
});
