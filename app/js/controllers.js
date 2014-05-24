/**
 * Created by dsandor on 2/6/14.
 */
var blogApp = angular.module('blogApp', ['ngSanitize', 'infinite-scroll']);

blogApp.controller('BlogListCtrl', function($scope, $http, Blog){

    $scope.blog = new Blog();

});

// Blog constructor function to encapsulate HTTP and pagination logic
blogApp.factory('Blog', function($http) {
    var Blog = function() {
        this.articles = [];
        this.busy = false;
        this.after = '';
    };

    Blog.prototype.nextPage = function() {
        if (this.busy) return;
        this.busy = true;

        var url = "http://davidsandor.com/blogapi/api/Blog/GetRecentPosts?numberToFetch=5&truncateContent=false&after=" + this.after + "&categoryId=" + $.QueryString["viewCategory"];
        //document.writeln("-=-=] " + url);

        $http.get(url).success(function(data) {
            //alert(data);
            var items = data;

            for (var i = 0; i < items.length; i++) {
                this.articles.push(data[i]);
                //document.writeln("-=-=] item: " + this.items[i]);
            }
            this.after = this.articles[this.articles.length - 1].Id;
            this.busy = false;
        }.bind(this));
    };

    return Blog;
});

blogApp.controller('BlogMainCtrl', function($scope, $http){
    /*
    $http.get('http://davidsandor.com/blogapi/api/Blog/GetRecentPosts?numberToFetch=5&truncateContent=false').success(function(data) {
        $scope.articles = data;
    });
    */
});

