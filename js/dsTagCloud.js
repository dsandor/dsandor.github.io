/**
 * Created by dsandor on 2/20/14.
 */

$.widget("ds.tagcloud", {

    options: { getdataurl: 'http://davidsandor.com/blogapi/api/Blog/GetAllCategories' },

    _create: function() {
        // build out the initial state / html of the widget
        this.element
            .addClass("tagcloud")
            .text("Bitch please: " + this.options.getdataurl);
    },

    getdataurl: function(value) {
        if ( value === undefined )
        {
            alert('ttt');
            return this.options.getdataurl;
        }

        alert('new value:' + value);
        this.options.getdataurl = value;
        this.element.text("Updated to: " + value);
    }
});
