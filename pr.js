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