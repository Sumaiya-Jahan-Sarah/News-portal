// sample list of news articles and their views
let newsList = [
    { title: "Article 1", views: 100 },
    { title: "Article 2", views: 200 },
    { title: "Article 3", views: 50 },
    { title: "Article 4", views: 300 },
    { title: "Article 5", views: 150 }
];

// sort the news list in descending order of views
newsList.sort((a, b) => b.views - a.views);

// display the top few articles
//   const numArticles = 3; // change this to display a different number of articles
for (let i = 0; i < newsList.length && i < newsList.length; i++) {
    console.log(newsList[i].title + " - " + newsList[i].views + " views");
}
