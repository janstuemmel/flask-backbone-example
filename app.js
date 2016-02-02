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

    template: Handlebars.compile('<ul>{{#each items}}<li>Name: {{name}}, Age: {{age}}</li>{{/each}}</ul>'),

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
        var template = this.template({items: test})
        this.$el.html(template)
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
    },

    home: function() {
        new View({el: '#main'})
    },

    test: function() {
        document.write('Its the test route!')
    },

    notFound: function() {
        document.write('404, site not found!')
    }
});

new Router;
