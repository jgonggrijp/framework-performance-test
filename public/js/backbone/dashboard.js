var DashboardItem = Backbone.View.extend({
	className: 'item',
	template: _.template('<label><%= val %>%</label>'),
	initialize: function(options) {
		this.listenTo(this.model, 'change', this.render);
	},
	render: function() {
		this.$el.html(this.template(this.model.attributes));
		this.$el.css('backgroundColor', this.model.get('color'));
		return this;
	},
});

var Dashboard = Backbone.View.extend({
	el: '#dashboard',
	initialize: function(options) {
		this.factory = options.factory;
		this.collection = new Backbone.Collection();
		this.setData(this.factory.data);
		this.items = this.collection.map(function(model) {
			return new DashboardItem({model: model});
		});
		this.render();
	},
	update: function() {
		this.setData(this.factory.update().data);
	},
	setData: function(data) {
		var indexedData = _.zip(data, _.range(data.length));
		var extendedData = _.map(indexedData, function(pair) {
			return _.defaults({id: pair[1]}, pair[0]);
		});
		this.collection.set(extendedData);
	},
	render: function() {
		_.each(this.items, function(item) {
			this.$el.append(item.render().el);
		}, this);
	},
});
