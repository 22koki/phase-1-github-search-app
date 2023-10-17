javascript
document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const searchInput = document.getElementById('search-input').value;
    fetch(`https://api.github.com/search/users?q=${searchInput}`, {
        headers: {
            'Accept': 'application/vnd.github.v3+json'
        }
    })
    .then(response => response.json())
    .then(data => {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';
        data.items.forEach(user => {
            const userDiv = document.createElement('div');
            userDiv.innerHTML = `
                <h3>${user.login}</h3>
                <img src="${user.avatar_url}" alt="${user.login}'s avatar">
                <a href="${user.html_url}" target="_blank">View Profile</a>
                <button onclick="fetchRepos('${user.login}')">View Repos</button>
            `;
            resultsDiv.appendChild(userDiv);
        });
    })
    .catch(error => console.error('Error:', error));
});

javascript
function fetchRepos(username) {
    fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
            'Accept': 'application/vnd.github.v3+json'
        }
    })
    .then(response => response.json())
    .then(data => {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';
        data.forEach(repo => {
            const repoDiv = document.createElement('div');
            repoDiv.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description}</p>
                <a href="${repo.html_url}" target="_blank">View Repo</a>
            `;
            resultsDiv.appendChild(repoDiv);
        });
    })
    .catch(error => console.error('Error:', error));
}