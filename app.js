var Backbone    = require('backbone');
var $           = require('jquery');
var _           = require('underscore');
var Handlebars  = require('handlebars');

var Model = Backbone.Model.extend({});

var Collection = Backbone.Collection.extend({

    model: Model,
    url: '/api/v1/test'
})

var View = Backbone.View.extend({

    template: Handlebars.compile('<a href="#" route="/test">Test</a><ul>{{#each items}}<li>Name: {{name}}, Age: {{age}}</li>{{/each}}</ul><a href="https://example.com">Example.com</a>'),

    initialize: function() {
        this.collection = new Collection;
        var self = this;
        this.collection.fetch({
            success: function() {
                self.render();
            }
        })
    },

    render: function(){
        var test = this.collection.toJSON();
        var template = this.template({items: test});
        this.$el.html(template);
    }
});

var Router = Backbone.Router.extend({

    routes: {
        '': 'home',
        'test': 'test',
        '*notFound': 'notFound'
    },

    initialize: function() {

        Backbone.history.start({pushState: true, root: '/'});

        // routing a hrefs with attribute 'route'
        $(document).on('click', 'a[route^="/"]', function (event) {
            event.preventDefault();
            Backbone.history.navigate( $(this).attr('route'), true);
        });
    },

    home: function() {
        console.log("home route");
        new View({el: '#main'});
    },

    test: function() {
        console.log("test route");
        $('#main').html('Its the test route!!');
    },

    notFound: function() {
        console.log(404);
        $('#main').html('404, site not found!');
    }
});

router = new Router;
