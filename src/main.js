const api = axios.create({
    baseURL : 'https://api.themoviedb.org/3/',
    headers:{
        'Content-Type': 'application/json;charsert=utf-8'
    },
    params:{
        'api_key': API_KEY,
    }
})

async function getTrendingMovies(){
    const {data} = await api('trending/movie/day');
    const movies = data.results;
    console.log({data, movies})

    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        const trendingPreviewContainer = document.querySelector('#trendingPreview .trendingPreview-movieList')
        movieContainer.classList.add('movie-container')
        
        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute(
            'src',
            'https://image.tmdb.org/t/p/w300/' + movie.poster_path
        )
        movieContainer.appendChild(movieImg);
        trendingPreviewContainer.appendChild(movieContainer)
    });
}

async function getCategoriesPreview(){
    const {data} = await api('genre/movie/list');
    const categories = data.genres;
    console.log({data, categories})

    categories.forEach(category => {
        const previewCategoriesContainer = document.querySelector('#categoriesPreview .categoriesPreview-list')
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container')
        
        const categoryTitle = document.createElement('h3');
        categoryTitle.setAttribute('id', 'id' + category.id)
        categoryTitle.classList.add('category-title')
        
        
        const categoryTitleText = document.createTextNode(category.name);
        
        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        previewCategoriesContainer.appendChild(categoryContainer)
    });
}
