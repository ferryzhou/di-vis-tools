//_.templateSettings.variable = "rc";
var panel_tmpl = _.template($( "script#panel_template" ).html());
var col_tmpl = _.template("<div class='col-md-3'><%= content %></div>");

var panel_contents = {
  "Raw Data": {
    "Text Files":   ["CSV", "XML", "JSON"],
	"Database":     ["RDBMS", "NoSQL", "Big Data"],
	"Binary Files": ["SAS", "SPSS"],
	"API":          ["Web API", "App API"]
  },
  "Data Integration": {
    "GUI Tools": {
	  "Free": ["Kettle", "Talend"],
	  "Commercial": ["Microsoft", "Infomatica", "IBM"]
	},
	"Programming/API": ["JAVA/JDBC", "SAS", "Python"]
  },
  "Good Data": {
    "Text Files":   ["CSV", "XML", "JSON"],
	"Database":     ["RDBMS", "NoSQL", "Big Data"],
	"Binary Files": ["SAS", "SPSS"],
	"API":          ["Web API", "App API"]
  },
  "Data Presentation": {
    "GUI Tools": {
	  "Free": ["Tableau Public", "Pentaho BI CE", "QlikView"],
	  "Commercial": ["Microstrategy", "Tableau", "Pentaho EE"]
	},
	"Programming/API": ["SAS", "R", "HTML/JS", "Web API", "JAVA"]    
  }
}

function getNestedPanelContent(o) {
  if ($.isArray(o)) return o.join("<br/>");
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
  console.log(cols.join(""));
  $('#panels_row').append(cols.join(""));
//});
