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
    });
});



function createMovie(movies, parentContainer, {lazyLoad = false, clean = true} = {}){
    if (clean){
        parentContainer.innerHTML = "";
    }
 
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
        lazyLoad ? 'data-img': 'src',
            'https://image.tmdb.org/t/p/w300/' + movie.poster_path
        );
        movieImg.addEventListener('error', () => {
            movieImg.setAttribute(
            'src', '../assets/images/broken.jpg');
        });
            if(lazyLoad){
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
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', 'id' + category.id)
        categoryTitle.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`
        })
        const categoryTitleText = document.createTextNode(category.name);
        
        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        parentContainer.appendChild(categoryContainer)

})}

//Llamados a la API
async function getTrendingMoviesPreview(){
    const { data } = await api('trending/movie/day');
    const movies = data.results;

    createMovie(movies, trendingMoviesPreviewList, true);
}
async function getCategoriesPreview(){
    const {data} = await api('genre/movie/list');
    const categories = data.genres;
    
    createCategories(categories, categoriesPreviewList)
}

async function getMoviesByCategory(id){
    const { data } = await api('discover/movie', {
        params: {
          with_genres: id,
        },
      });
      const movies = data.results;
    
      createMovie(movies, genericSection, true);
}
async function getMoviesBySearch(query){
    const { data } = await api('search/movie', {
        params: {
        query,
        },
    });
    const movies = data.results;
    
    createMovie(movies, genericSection);
}
async function getTrendingMovies(){
    const { data } = await api('trending/movie/day');
    const movies = data.results;

    createMovie(movies, genericSection, { lazyLoad: true, clean: true });

    const btnLoadMore = document.createElement('button');
    btnLoadMore.innerText = 'Cargar más';
    btnLoadMore.addEventListener('click', getPaginatedTrendingMovies);
    genericSection.appendChild(btnLoadMore);
}
let page = 1;

async function getPaginatedTrendingMovies() {
  page++;
  const { data } = await api('trending/movie/day', {
    params: {
      page,
    },
  });
  const movies = data.results;

  createMovie(
    movies,
    genericSection,
    { lazyLoad: true, clean: false },
  );

  const btnLoadMore = document.createElement('button');
  btnLoadMore.innerText = 'Cargar más';
  btnLoadMore.addEventListener('click', getPaginatedTrendingMovies);
  genericSection.appendChild(btnLoadMore);
}

async function getMovieById(id){
    const { data: movie } = await api('movie/' + id);

    const movieUrl = 'https://image.tmdb.org/t/p/w500/' + movie.poster_path;
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
    const { data } = await api(`movie/${id}/similar`);
    const relatedMovies = data.results;
 
    createMovie(relatedMovies, relatedMoviesContainer);

}

