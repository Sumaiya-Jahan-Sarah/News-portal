
// first categories news load 
const loadCategoriesNews = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await res.json();
    displayCategoriesNews(data.data.news_category);
}

// first display news categories
const displayCategoriesNews = (categories) => {

    categories.forEach(category => {

        const newsContainer = document.getElementById('news-category');
        const newscategory = document.createElement('span');

        newscategory.innerHTML = `<p onclick="loadCategoryNews(${category.category_id})">
    ${category.category_name}</p>
   
    `
        newsContainer.appendChild(newscategory);
    })
}


// second category news load
const loadCategoryNews = async (category_id) => {
    toggleLoader(true)
    fetch(`https://openapi.programming-hero.com/api/news/category/0${category_id}`)
        .then(res => res.json())
        .then(data => displayCategoryNews(data.data))
}




// second category news display
const displayCategoryNews = (newses) => {
    // console.log(newses)

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
        <div class=" row align-items-center">
        <div class="col-4">
            <img class="img-fluid" src="${news.image_url}" alt="...">
        </div>
        <div class="col-8">
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
    fetch(`https://openapi.programming-hero.com/api/news/${news_id}`)
        .then(res => res.json())
        .then(data => newsDetailsDisplay(data.data[0]));
}


// display modal

const newsDetailsDisplay = (news) => {
    console.log(news)
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


document.getElementById('blog').addEventListener('click', function () {
    const blog = document.getElementById('blog-question');
    blog.innerHTML = `
    <div class="accordion" id="accordionBlog">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Different among <strong>var</strong> <strong>let</strong> <strong>const</strong> ?
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                        data-bs-parent="#accordionBlog">
                        <div class="accordion-body">
                          <p>  var: Variables declared with var are function-scoped. If a var variable is declared outside
                            of any function, it becomes globally scoped, and is available throughout the entire program.
                            Additionally, var variables can be re-declared and reassigned within their scope.</p>

                           <p> let: Variables declared with let are block-scoped.let variables can be reassigned within
                            their scope, but cannot be re-declared.</p>

                          <p>  const: Variables declared with const are also block-scoped, like let. Additionally, const
                            variables cannot be re-declared within their scope.</p>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingTwo">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Different between <strong>  Arrow function </strong>  and  <strong>  Regular function </strong>
                        </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                        data-bs-parent="#accordionBlog">
                        <div class="accordion-body">
                          <p>  1. Syntax: Arrow functions have a shorter syntax than regular functions. Instead of using
                            the function keyword, you use an arrow (=>) between the function parameters and the function
                            body.</p>
                          <p>  2.this binding: One key difference between arrow functions and regular functions is how they
                            bind the this keyword. In regular functions, the value of this is determined by how the
                            function is called.</p>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingThree">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Why do we use Template strings?
                        </button>
                    </h2>
                    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
                        data-bs-parent="#accordionBlog">
                        <div class="accordion-body"> <p>
                            1. String interpolation: One of the main benefits of using template strings is that they
                            allow for string interpolation, which means you can embed expressions or variables within a
                            string.</p>
                          <p>  2. Multi-line strings: Template strings also allow for the creation of multi-line strings.</p>
                           <p> 3.Cleaner code: Using template strings can often make code easier to read and maintain,
                            especially when you need to include variables or expressions within a string.</p>
                        </div>
                    </div>
                </div>
            </div>
    `


})



loadCategoriesNews()



