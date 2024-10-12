// Check if the browser supports notifications
if ("Notification" in window) {
    // Ask for permission on page load
    if (Notification.permission !== "granted") {
        Notification.requestPermission().then(permission => {
            if (permission !== "granted") {
                alert("You have denied notifications. You won't get a push notification for answers.");
            }
        });
    }
}

function showNotification(title, body) {
    if (Notification.permission === "granted") {
        new Notification(title, { body });
    }
}

// Retrieve the logged-in team from localStorage
const loggedInTeam = JSON.parse(localStorage.getItem('loggedInTeam'));

if (loggedInTeam) {
    console.log('Submitting answer for team:', loggedInTeam.name);
    
    document.getElementById('submitAnswerBtn').addEventListener('click', function() {
        const answer = document.getElementById('answerInput').value;

        fetch('https://matuslibak.pythonanywhere.com/submit_answer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: loggedInTeam.name,  // Send the team name
                answer: answer,               // The submitted answer
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                if (data.isCorrect) {
                    alert('Correct answer! 🎉');
                    showNotification('Congratulations!', 'Your answer was correct!');
                } else {
                    alert('Wrong answer. Try again!');
                    showNotification('Oops!', 'Your answer was incorrect.');
                }
            } else {
                alert('Error submitting answer: ' + data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    });
} else {
    console.log('No team is logged in.');
    // Redirect to login page if no team is logged in
    window.location.href = 'login.html';
}

function getCompetitionDay() {
    const startDate = new Date('2024-10-12T06:00:00'); // tu sa nastavuje zaciatok
    const currentDate = new Date();
    const timeDifference = currentDate - startDate;
    const millisecondsInOneDay = 24 * 60 * 60 * 1000;
    const currentDay = Math.floor(timeDifference / millisecondsInOneDay) + 1;
    return currentDay > 0 ? currentDay : 0;  // If it's before the start date, return 0
}

// Example usage:
let competitionDay = getCompetitionDay()
console.log("Current competition day:", competitionDay);

document.getElementById('downloadProblemBtn').addEventListener('click', function() {
    const competitionDay = getCompetitionDay(); // Assuming this function returns the correct day
    const fileName = `problem_${competitionDay}.pdf`; // Modify the extension based on your file type
    const filePath = `problems/${fileName}`; // Path to the file in the problems folder

    // Create an anchor element to trigger the download
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName; // This sets the name of the file to be downloaded
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up
});

document.getElementById('backToIndexBtn').addEventListener('click', function() {
    window.location.href = 'index.html';
});
