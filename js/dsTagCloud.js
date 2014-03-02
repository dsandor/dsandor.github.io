/**
 * Created by dsandor on 2/20/14.
 */

$.widget("ds.tagcloud", {

    options: {
        getdataurl: 'http://davidsandor.com/blogapi/api/Blog/GetAllCategories',
        categoryurltemplate: '?viewCategory='
    },

    _create: function() {
        // build out the initial state / html of the widget
        this.element
            .addClass("tagcloud");
        this._getData(this.element, this.options);
    },

    getdataurl: function(value) {
        if ( value === undefined )
        {
            return this.options.getdataurl;
        }

        this.options.getdataurl = value;
    },

    categoryurltemplate: function(value) {
        if ( value === undefined )
        {
            return this.options.categoryurltemplate;
        }

        this.options.categoryurltemplate = value;
    },

    _getData: function(e, opt) {
        jQuery.support.cors = true;
        $.ajax({
            url: this.getdataurl(),
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var newHtml = "<!-- start of tag cloud -->";

                // Find highest frequency.
                var maxFreq = 0;
                var nextMaxFreq = 0;

                $.each(data, function(index, category) {
                   if (category.Frequency > maxFreq)
                   {
                       nextMaxFreq = maxFreq;
                       maxFreq = category.Frequency;
                   }
                });

                maxFreq = nextMaxFreq; // throw out the highest and use second highest.
                $.each(data, function(index, category) {
                    var intensityClassName = "tc-intensity-1";

                    if (category.Frequency > 0)
                    {
                        var perBand = maxFreq / 5;

                        // figure out what intensity this item is.
                        var intensity = Math.floor(category.Frequency/perBand);

                        if (intensity > 5) intensity = 5;
                        if (intensity < 1) intensity = 1;

                        intensityClassName = "tc-intensity-" + intensity;
                    }

                    newHtml += "<div class='" + intensityClassName + " tc-slight-pad'>"
                        + "<a href='" + opt.categoryurltemplate + category.Id + "' class='tc-category-href'>"
                        + category.Name + " ("
                        + category.Frequency + ")"
                        + "</a></div>";
                });

                newHtml += "<!-- end of tag cloud -->";

                e.html(newHtml);

                //alert(newHtml);
            },
            error: function (x, y, z) {
                alert(x + '\n' + y + '\n' + z);
            }
        });
    }
});
