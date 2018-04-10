var DashboardItem = Backbone.View.extend({
	className: 'item',
	template: _.template('<label><%= val %>%</label>'),
	initialize: function(options) {
		this.listenTo(this.model, 'change', this.render);
	},
	render: function() {
		var attr = this.model.attributes;
		this.$el.html(this.template(attr)).css('backgroundColor', attr.color);
		return this;
	},
});

var Dashboard = Backbone.View.extend({
	el: '#dashboard',
	initialize: function(options) {
		this.factory = options.factory;
		this.collection = new Backbone.Collection(this.factory.data);
		this.items = this.collection.map(function(model) {
			return new DashboardItem({model: model});
		});
		this.render();
	},
	update: function() {
		this.collection.set(this.factory.update().data);
	},
	render: function() {
		var $el = this.$el.empty();
		_.each(this.items, function(item) {
			$el.append(item.render().el);
		}, this);
	},
});
