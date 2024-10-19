// Posts array
let posts = [
    {
        id: 1,
        title: "EXAMPLE",
        content: "EXAMPLE TEXT, POSTS COMING 1ST NOVEMBER 2024",
        author: "EXAMPLE"
    },
    {
        id: 2,
        title: "EXAMPLE",
        content: "EXAMPLE TEXT, POSTS COMING 1ST NOVEMBER 2024",
        author: "EXAMPLE"
    },
    {

        id: 3,
        title: "EXAMPLE",
        content: "EXAMPLE TEXT, POSTS COMING 1ST NOVEMBER 2024",
        author: "EXAMPLE"
   },
   {
        id: 4,
        title: "EXAMPLE",
        content: "EXAMPLE TEXT, POSTS COMING 1ST NOVEMBER 2024",
        author: "EXAMPLE"

    },
    {
        id: 5,
        title: "EXAMPLE",
        content: "EXAMPLE TEXT, POSTS COMING 1ST NOVEMBER 2024",
        author: "EXAMPLE"

    },
    {
        id: 6,
        title: "EXAMPLE",
        content: "EXAMPLE TEXT, POSTS COMING 1ST NOVEMBER 2024",
        author: "EXAMPLE"
    }
];

// Pagination variables
let currentPage = 1;
const postsPerPage = 6;

function updatePostsDisplay(postsToDisplay = posts) {
    const postsSection = document.getElementById('posts-section');
    postsSection.innerHTML = '';
    
    if (postsToDisplay.length === 0) {
        postsSection.innerHTML = '<p>No posts found.</p>';
        updatePaginationControls(postsToDisplay);
        return;
    }
    
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const paginatedPosts = postsToDisplay.slice(startIndex, endIndex);
    
    paginatedPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post-box';
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>By: ${post.author}</p>
            <p>${post.content.substring(0, 100)}...</p>
        `;
        
        postElement.onclick = () => showPostDetails(post);
        
        postsSection.appendChild(postElement);
    });

    updatePaginationControls(postsToDisplay);
}

function updatePaginationControls(postsToDisplay) {
    const totalPages = Math.ceil(postsToDisplay.length / postsPerPage);
    const prevPageLink = document.getElementById('prevPage');
    const nextPageLink = document.getElementById('nextPage');
    const pageInfo = document.getElementById('pageInfo');

    prevPageLink.style.display = currentPage > 1 ? 'inline' : 'none';
    nextPageLink.style.display = currentPage < totalPages ? 'inline' : 'none';
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
}

function changePage(direction) {
    const totalPages = Math.ceil(posts.length / postsPerPage);
    currentPage += direction;
    
    if (currentPage < 1) {
        currentPage = 1;
    } else if (currentPage > totalPages) {
        currentPage = totalPages;
    }
    
    updatePostsDisplay();
}

function showPostDetails(post) {
    document.getElementById('postPopupTitle').textContent = post.title;
    document.getElementById('postPopupAuthor').textContent = `Post Details: ${post.author}`;
    document.getElementById('postPopupContent').textContent = post.content;
    showPopup('postDetailsPopup');
}

function searchPosts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    if (searchTerm === '') {
        updatePostsDisplay(); // Show all posts if search is empty
        return;
    }
    
    const filteredPosts = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm) || 
        post.content.toLowerCase().includes(searchTerm) ||
        post.author.toLowerCase().includes(searchTerm)
    );
    currentPage = 1; // Reset to first page when searching
    updatePostsDisplay(filteredPosts);
}

function showPopup(popupId) {
    document.getElementById(popupId).style.display = 'block';
}

function hidePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('search-icon').addEventListener('click', function() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput.style.display === 'none' || searchInput.style.display === '') {
            searchInput.style.display = 'inline-block';
            searchInput.focus();
        } else {
            searchInput.style.display = 'none';
            searchInput.value = ''; // Clear search when hiding
            updatePostsDisplay(); // Show all posts when search is cleared
        }
    });

    document.getElementById('searchInput').addEventListener('input', searchPosts);

    // Initialize
    updatePostsDisplay();
});

// Function to add a new post (to be used in the code, not through the interface)
function addPost(title, content, author) {
    const newPost = {
        id: Date.now(),
        title: title,
        content: content,
        author: author
    };
    posts.unshift(newPost);
    updatePostsDisplay();
}

// Function to delete a post (to be used in the code, not through the interface)
function deletePost(postId) {
    posts = posts.filter(post => post.id !== postId);
    updatePostsDisplay();
}