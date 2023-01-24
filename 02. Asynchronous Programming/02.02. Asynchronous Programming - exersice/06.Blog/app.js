function attachEvents() {

    document.getElementById('btnLoadPosts').addEventListener('click', getPost);
    document.getElementById('btnViewPost').addEventListener('click', getComments)

    async function getPost() {

        const selectOption = document.getElementById('posts')
        const postURL = 'http://localhost:3030/jsonstore/blog/posts';

        selectOption.innerHTML = '';
        const response = await fetch(postURL);
        const data = await response.json();

        Object.values(data).forEach(post => {
            const op = document.createElement('option');
            op.value = post.id;
            op.textContent = post.title;
            selectOption.appendChild(op);
        });
    };

    async function getComments() {
        const postURL = 'http://localhost:3030/jsonstore/blog/posts';
        const comentsURL = 'http://localhost:3030/jsonstore/blog/comments';

        const selectedOp = document.getElementById('posts').selectedOptions[0].value;
        const title = document.getElementById('post-title');
        const postBody = document.getElementById('post-body');
        const postComments = document.getElementById('post-comments');
        postComments.innerHTML = '';

        const postResponse = await fetch(postURL);
        const postData = await postResponse.json();

        const commentsResponse = await fetch(comentsURL);
        let commentData = await commentsResponse.json();

        const selectedPost = Object.values(postData).find(post => post.id == selectedOp);
        title.textContent = selectedPost.title;
        postBody.textContent = selectedPost.body;


        const comments = Object.values(commentData).filter(c => c.postId === selectedOp);

        comments.forEach(c => {
            const li = document.createElement('li');
            li.textContent = c.text;
            postComments.appendChild(li);
        })


    }
}

attachEvents();