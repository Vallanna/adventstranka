// Navigácia medzi úvodnou stránkou a formulármi
document.getElementById('registerBtn').addEventListener('click', function() {
    document.getElementById('startPage').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
});

document.getElementById('loginBtn').addEventListener('click', function() {
    document.getElementById('startPage').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
});

// Registrácia/Prihlásenie
document.getElementById('teamForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const teamName = document.getElementById('teamName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Vygenerovanie 6-miestneho kódu (klientská časť - pre produkciu treba server-side)
    const teamCode = Math.random().toString(36).substr(2, 6).toUpperCase();

    document.getElementById('teamCode').innerText = `Váš unikátny kód tímu: ${teamCode}`;
    document.getElementById('teamCode').classList.remove('hidden');

    // Skrytie prihlasovacieho formulára a zobrazenie dashboardu
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    document.getElementById('homePage').style.display = 'block';
});

// Navigácia medzi podstránkami
document.getElementById('homeLink').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('homePage').style.display = 'block';
    document.getElementById('taskForm').style.display = 'none';
    document.getElementById('rules').style.display = 'none';
    document.getElementById('taskList').style.display = 'none';
    document.getElementById('scoreTable').style.display = 'none';
});

document.getElementById('uploadTasksLink').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('taskForm').style.display = 'block';
    document.getElementById('rules').style.display = 'none';
    document.getElementById('taskList').style.display = 'none';
    document.getElementById('scoreTable').style.display = 'none';
});

document.getElementById('rulesLink').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('taskForm').style.display = 'none';
    document.getElementById('rules').style.display = 'block';
    document.getElementById('taskList').style.display = 'none';
    document.getElementById('scoreTable').style.display = 'none';
});

document.getElementById('tasksLink').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('taskForm').style.display = 'none';
    document.getElementById('rules').style.display = 'none';
    document.getElementById('taskList').style.display = 'block';
    document.getElementById('scoreTable').style.display = 'none';
});

document.getElementById('scoreTableLink').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('taskForm').style.display = 'none';
    document.getElementById('rules').style.display = 'none';
    document.getElementById('taskList').style.display = 'none';
    document.getElementById('scoreTable').style.display = 'block';
});