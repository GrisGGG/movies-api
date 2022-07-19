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
async function getInfoApi(path, parentContainer, config){
    const { data } = await api(path, config)
    const movies = data.results;

    parentContainer.innerHTML = "";
    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container')  
        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute(
            'src',
            'https://image.tmdb.org/t/p/w300/' + movie.poster_path
        )
        movieContainer.appendChild(movieImg);
        parentContainer.appendChild(movieContainer)
    });
}

//Llamados a la API
async function getCategoriesPreview(){
    const {data} = await api('genre/movie/list');
    const categories = data.genres;
    console.log({data, categories})
    
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
        categoriesPreviewList.appendChild(categoryContainer)
    });
}


async function getTrendingMovies(){
    getInfoApi('trending/movie/day', trendingMoviesPreviewList)
}


async function getMoviesByCategory(id){
    getInfoApi('discover/movie',  genericSection, {params:{ with_genres: id,}})

}
async function getMoviesBySearch(query){
    getInfoApi('search/movie',  genericSection, {params:{ query}})

}


