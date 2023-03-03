const homeTemplate = () => `
<h1>Home</h1>
<p>loremloremloremlorem loremloremloremlorem loremloremloremlorem loremloremloremlorem</p>
`

const articlesTemplate = () => `
<h1>Articles</h1>
<p>loremloremloremlorem loremloremloremlorem loremloremloremlorem loremloremloremlorem</p>
<p>loremloremloremlorem loremloremloremlorem loremloremloremlorem loremloremloremlorem</p>
<p>loremloremloremlorem loremloremloremlorem loremloremloremlorem loremloremloremlorem</p>
`

const aboutTemplate = () => `
<h1>About</h1>
<p>loremloremloremlorem loremloremloremlorem loremloremloremlorem loremloremloremlorem</p>
`
const notFoundTemplate = () => `
<h1>NOT FOUND</h1>
`
const routes = {
    "/": homeTemplate,
    "/home": homeTemplate,
    "/articles": articlesTemplate,
    "/about": aboutTemplate
}

const root = document.getElementById('root');

const navigate = (pathname, pushState = true) => {
  
    if(pushState){

        history.pushState({}, '', pathname);
    }
    // console.log(url.pathname);
    
    let template = routes[pathname];

    if(!template){
        template = notFoundTemplate;
    }
    root.innerHTML = template();
}

document.body.addEventListener('click', (e) => {
    if(e.target.tagName == 'A'){
        e.preventDefault();
        let url = new URL(e.target.href);
        navigate(url.pathname);
    }
})

window.addEventListener('popstate', (e) => {
    // console.log('popstate');
    // console.log(location.pathname);

    navigate(location.pathname, false)
});

navigate(location.pathname, false);