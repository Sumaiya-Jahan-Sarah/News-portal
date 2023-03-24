
// first: categories news load 
const loadCategoriesNews = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
        const data = await res.json();
        displayCategoriesNews(data.data.news_category);
    }
    catch (error) { console.log(error) }
}

// first: display news categories
const displayCategoriesNews = (categories) => {

    categories.forEach(category => {

        const newsContainer = document.getElementById('news-category');
        const newscategory = document.createElement('span');
        // newscategory.classList.add('btn')
        // newscategory.classList.add('btn-light')
        newscategory.innerHTML = `<p onclick="loadCategoryNews(${category.category_id})">
    ${category.category_name}</p>
   
    `
        newsContainer.appendChild(newscategory);
    })
}


// second: category news load
const loadCategoryNews = async (category_id) => {
    toggleLoader(true)
    try {
        fetch(`https://openapi.programming-hero.com/api/news/category/0${category_id}`)

            .then(res => res.json())
            .then(data => displayCategoryNews(data.data))
            .catch(error => console.error('Error:', error));
    }
    catch (error) { console.log(error) }
}




// second: category news display
const displayCategoryNews = (newses) => {


    const newsAmount = document.getElementById('news-amount');
    if (newses.length === 0) {
        newsAmount.innerText = `There no news found`
    }
    else {

        newsAmount.innerText = `${newses.length} items found for the category news`
    }
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ` `
    const mostviewers = newses.sort(function (a, b) { return b.total_view - a.total_view })
    mostviewers.forEach(news => {



        if (news.details.length > 200) {
            news.details = `${news.details.slice(0, 300)}...`
        }


        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');
        newsDiv.classList.add('my-5');
        newsDiv.classList.add('shadow');
        newsDiv.classList.add('p-3');
        newsDiv.classList.add('bg-body-tertiary');
        newsDiv.classList.add('rounded');

        newsDiv.innerHTML = `
        <div class=" row row-cols-1  rows-cols-sm-1 rows-cols-md-2 align-items-center">
        <div class="col-12 col-sm-12 col-md-4">
            <img class="img-fluid" src="${news.image_url}" alt="...">
        </div>
        <div class="col-12 col-sm-12 col-md-8">
            <div>
                <h5 class="">${news.title}</h5>
                <p class="text-muted">${news.details}.</p>
            </div>

            <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                    <div><img class="img-thumbnail " style="width: 50px; border-radius: 50%;" src="${news.author.img}" alt=""></div>
                    <div class="d-flex flex-column">
                        <span>${news.author.name ? news.author.name : 'No Author name found'}</span>
                        <span>${news.published_date ? news.published_date : 'No Date found'}</span>
                    </div>
                </div>

                <div>
                    <i class="fa-regular fa-eye"></i>
                    <span>${news.total_view ? news.total_view : 'No Viewers found'
            }</span>
                </div>

                <div>
                    <i class="fa-regular fa-star-half-stroke"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                </div>

                <div class="text-primary" onclick="loadNewsData('${news._id}')"data-bs-toggle="modal" data-bs-target="#newsDetailsModal">
                <i class="fa-solid fa-arrow-right"></i></div>

            </div>

        </div>
    </div>
        `;
        newsContainer.appendChild(newsDiv);

    })
    toggleLoader(false)
}

// modal load
const loadNewsData = (news_id) => {
    try {
        fetch(`https://openapi.programming-hero.com/api/news/${news_id}`)
            .then(res => res.json())
            .then(data => newsDetailsDisplay(data.data[0]));
    }
    catch (error) { console.log(error) }

}


// display modal

const newsDetailsDisplay = (news) => {

    const modalDiv = document.getElementById('newsDetailsModal');
    modalDiv.innerHTML = `
    <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="newsDetailsModalLabel">${news.title}</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                          <p> Author Name: ${news.author.name ? news.author.name : 'No Author name found'}.</p>
                         <p>  Published Date: ${news.published_date ? news.published_date : 'No Date found'}.</p>
                         <p>  Viewers: ${news.total_view ? news.total_view : 'No Viewers found'}</p>
                         <p>Rating: ${news.rating ? news.rating.number : 'No rating found'}  ${news.rating ? news.rating.badge : 'No rating found'}


                        </div >
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

    </div>
                    </div >
                </div >
    `


}


// spinner

const toggleLoader = (res) => {
    const loader = document.getElementById('loader');
    if (res === true) {
        loader.classList.remove('d-none');
    }

    else { loader.classList.add('d-none') }
}






loadCategoriesNews()



