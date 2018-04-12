var DashboardItem = Backbone.View.extend({
	className: 'item',
	initialize: function(options) {
		this.$el.$label = $('<label>').appendTo(this.el);
		this.listenTo(this.model, 'change', this.render);
	},
	render: function() {
		var attr = this.model.attributes;
		this.$el.css('backgroundColor', attr.color).$label.text(attr.val + '%');
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
