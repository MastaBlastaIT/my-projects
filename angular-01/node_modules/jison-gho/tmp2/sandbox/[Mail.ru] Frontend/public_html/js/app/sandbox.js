var PlayerModel = Backbone.Model.extend({});
var player = new PlayerModel();
player.once('change:name', function(model, name) { // подписываемся на изменение свойства модели
	console.log('Player name is '+name);
}); // 'all' - подписаться на все эвенты
player.set({name: 'Mark'}); // ИЛИ player.set('name', 'Mark'); // player.name = 'Mark' - плохо, поскольку не создает событие
player.set({name: 'Mark'}, {silent: true});  
player.get('name');
player.set({name: ''}, {silent: false});  
player.toJSON(); // вернуть объект модели (без экстендов эвентов и т.п.)
player.off('change:name');

var PlayerView = Backbone.View.extend({
    tagName: "li",
    className: "score__item",
    template: playerTmpl,  // from global context: sandbox_tmpl/player.js is loaded in index.html
    events: {
        "click .sandbox__click": "onClick", // jQuery delegate
		"change .sandbox__name": "onChange"
    },
    initialize: function() { // Инициализация модели, которую передали
        // this - текущий View
        _.bindAll(this, "render"); // this render'а будет обращен на текущий экземпляр view
        console.log('initialize'); 
        //  this.model.on('change', this.render); // подписываемся на change у модели (у модели что-то изменилось)
        this.listenTo(this.model, "change", this.render);
    },
    render: function() {
        // this - текущая модель, если не вызвать _bindAll()
        console.log('render'); 
//         this.el.innerHTML = 'Hello, ' + this.model.get('name') + '! <a href="#" class="button_delete">click me</a>.';
		this.$el.html(this.template(this.model.attributes));
        return this;
    },
    onClick: function() { console.log('test'); },
	onChange: function(event) { this.model.set('name', event.currentTarget.value); }
});
var player_view = new PlayerView({ model: player });
player_view.el // li.score__item 
document.getElementById("sandbox").appendChild(player_view.el); // Теперь вставляем на страницу (помещаем в DOM)
player.set({name: 'Mark'});
