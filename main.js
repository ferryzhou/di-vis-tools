//_.templateSettings.variable = "rc";
var panel_tmpl = _.template($( "script#panel_template" ).html());
var col_tmpl = _.template("<div class='col-md-3'><%= content %></div>");

function getNestedPanelContent(o) {
  if ($.isArray(o)) return '<div class="tools">' + o.join("<br/>") + '</div>';
  else {
    var panel_content = '';
	$.each(o, function(k, v) {
	  panel_content = panel_content + panel_tmpl({title: k, content: getNestedPanelContent(v)});
	});
    return panel_content;    
  }
}

//$.getJSON("data.json", function( data ) {
  var cols = [];
  $.each( panel_contents, function( key, val ) {
    cols.push(col_tmpl({content: panel_tmpl({title: key, content: getNestedPanelContent(val)})}) );
  });
  //console.log(cols.join(""));
  $('#panels_row').append(cols.join(""));
  
  $.each($('#panels_row').children().children().children('.panel-heading'), function(index, el) {
    //console.log(el.select);
	if (index == 3) return;
    $(el).append('<div class="goright pull-right"><span class="glyphicon glyphicon-chevron-right"></span></div>');
  });
  
$('.tools').readmore({
  speed: 500,
  maxHeight: 82,
  moreLink: '<a href="#">More &gt&gt </a>',
  lessLink: '<a href="#">Less &lt&lt</a>'
});
//});
