searchFormBtn.addEventListener('click', () => {
    location.hash = '#search='+ searchFormInput.value
    
});
trendingBtn.addEventListener('click', () => {
    location.hash = '#trends'
});

arrowBtn.addEventListener('click', ()=>{
   location.hash = window.history.back();
});
window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);
window.scrollTo(0, 0);

function navigator(){
    console.log({location});
    if(location.hash.startsWith('#trends')){
        trendsPage()
    }else if (location.hash.startsWith('#search=')){
        searchPage()
    }else if (location.hash.startsWith('#movie')){
        moviePage()
    }else if (location.hash.startsWith('#category')){
        categoryPage()
    }else {
        location.hash.startsWith('#home')
        homePage()
    }
    location.hash
}

function homePage(){
    headerSection.classList.remove('header-container');
    headerSection.getElementsByClassName.background = '';
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');
    arrowBtn.classList.add('inactive');
    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    getCategoriesPreview()
    getTrendingMoviesPreview()
}
function trendsPage(){
    console.log('trend');
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    getTrendingMovies()
    headerCategoryTitle.innerHTML = 'Tendencias';
}
function searchPage(){
    console.log('search!!');
    
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [_, query] = location.hash.split('=');
    getMoviesBySearch(query);
}
function moviePage(){
    console.log("movie!");
    headerSection.classList.add('header-container--long');
   // headerSection.getElementsByClassName.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');
}
function categoryPage(){
    console.log("categories");

    headerSection.classList.remove('header-container--long');
    headerSection.getElementsByClassName.background = '';
    arrowBtn.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [_, categoryData] = location.hash.split('=')
    const [categoryId, categoryName] = categoryData.split('-')
    headerCategoryTitle.innerHTML = categoryName;
    getMoviesByCategory(categoryId)
}

