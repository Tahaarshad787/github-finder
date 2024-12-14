const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const profileContainer = document.getElementById('profileContainer');

const fetchGitHubUser = async (username) => {
    try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        if (!res.ok) throw new Error('User not found');
        const user = await res.json();

        displayProfile(user);
    } catch (error) {
        profileContainer.innerHTML = `<div class="text-danger text-center mt-3">${error.message}</div>`;
    }
};

const displayProfile = (user) => {
    profileContainer.innerHTML = `
        <div class="profile-card text-center">
            <img src="${user.avatar_url}" alt="Profile Picture" class="img-thumbnail rounded-circle mb-3" style="width: 120px;">
            <h3>${user.name || 'No Name'}</h3>
            <p>@${user.login}</p>
            <p>${user.bio || 'No bio available.'}</p>
            <a href="${user.html_url}" target="_blank" class="btn btn-primary mt-2">View Profile</a>
            <div class="mt-3">
               <span class="badge" style="background-color: rgb(128, 0, 128); color: white;">Public Repos: ${user.public_repos}</span>
                <span class="badge" style="background-color: rgb(255, 105, 180); color: white;">Followers: ${user.followers}</span>
                <span class="badge" style="background-color: rgb(173, 216, 230); color: black;">Following: ${user.following}</span>
            </div>
        </div>
    `;
};

searchBtn.addEventListener('click', () => {
    const username = searchInput.value.trim();
    if (username) {
        profileContainer.innerHTML = '<p class="text-center">Loading...</p>';
        fetchGitHubUser(username);
    }
});