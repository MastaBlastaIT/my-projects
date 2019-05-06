var PlayerModel = Backbone.Model.extend({});
var player = new PlayerModel();
player.once('change:name', function(model, name) { // подписываемся на изменение свойства модели
    alert('Player name is '+name);
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
    /* template: fest['player'], */ 
    events: {
        "click .button_delete": "destroy" // jQuery delegate
    },
    initialize: function() { // Инициализация модели, которую передали
        // this - текущий View
        _.bindAll(this, "render"); // this render'а будет обращен на текущий экземпляр view
        console.log('initialize'); 
        //  this.model.on('change', this.render); // подписываемся на change у модели (у модели что-то изменилось)
        this.listenTo(this.model, "change", this.render);
    },
    destroy: function() { console.log('test'); },
    render: function() {
        // this - текущая модель, если не вызвать _bindAll()
        console.log('render'); 
        this.el.innerHTML = 'Hello, ' + this.model.get('name') + '! <span class="button_delete">click me!</span>';
        return this;
    }
});
var player_view = new PlayerView({ model: player });
player_view.el // li.score__item 
document.body.appendChild(player_view.el); // Теперь вставляем на страницу (помещаем в DOM)
player.set({name: 'Mark'});
