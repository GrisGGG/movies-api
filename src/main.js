const api = axios.create({
    baseURL : 'https://api.themoviedb.org/3/',
    headers:{
        'Content-Type': 'application/json;charsert=utf-8'
    },
    params:{
        'api_key': API_KEY,
    }
})
//helpers
const lazyLoading = new IntersectionObserver((entries) =>{
    entries.forEach((entry) =>{
        if(entry.isIntersecting){ //Si el usuario lo puede ver
            const url = entry.target.getAttribute('data-img')
            entry.target.setAttribute('src', url)
        }
    })
})
async function getInfoApi(path, parentContainer, config, lazyLoad){
    const { data } = await api(path, config)
    const movies = data.results;

    parentContainer.innerHTML = "";
    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container')  
        movieContainer.addEventListener('click', () =>{
            location.hash = '#movie=' + movie.id +'-'+ movie.title
        })
        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);    
        movieImg.setAttribute(
           !lazyLoad ? 'data-img': 'src',
            'https://image.tmdb.org/t/p/w300/' + movie.poster_path
        );
        movieImg.addEventListener('error', () => {
           movieImg.setAttribute(
            'src', '../assets/images/broken.jpg'
           );
          });
            if(!lazyLoad){
                lazyLoading.observe(movieImg)
            }
           
       

        movieContainer.appendChild(movieImg);
        parentContainer.appendChild(movieContainer)
    });
}



function createCategories(categories, parentContainer){
    parentContainer.innerHTML = "";
    categories.forEach(category => {
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container')
        
        const categoryTitle = document.createElement('h3');
        categoryTitle.setAttribute('id', 'id' + category.id)
        categoryTitle.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`
        })
        categoryTitle.classList.add('category-title')
        const categoryTitleText = document.createTextNode(category.name);
        
        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        parentContainer.appendChild(categoryContainer)

})}

//Llamados a la API
async function getCategoriesPreview(){
    const {data} = await api('genre/movie/list');
    const categories = data.genres;
    createCategories(categories, categoriesPreviewList)
}
function getTrendingMoviesPreview(){
   getInfoApi('trending/movie/day', trendingMoviesPreviewList, false)
}
function getMoviesByCategory(id){
    getInfoApi('discover/movie',  genericSection, {params:{ with_genres: id,}}, true)
}
function getMoviesBySearch(query){
    getInfoApi('search/movie',  genericSection, {params:{ query}})
}
function getTrendingMovies(){
    getInfoApi('trending/movie/day', genericSection)
}
async function getMovieById(id){
    const { data: movie } = await api('movie/' + id);

    const movieUrl = 'https://image.tmdb.org/t/p/w300/' + movie.poster_path;
    console.log(movieUrl);
    headerSection.style.background = `
    linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%), 
    url(${movieUrl})`

    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;

    createCategories(movie.genres, movieDetailCategoriesList);
    getRelatedMoviesById(id)
}

async function getRelatedMoviesById(id){
    getInfoApi(`movie/${id}/similar`, relatedMoviesContainer)
}

