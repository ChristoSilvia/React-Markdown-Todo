var TodoList = React.createClass({displayName: 'TodoList',
  render: function() {
    var createItem = function(itemHtml) {
      return React.createElement("li", null, 
               React.createElement("div", {
                 className: "MarkdownEditor"}, 
                 React.createElement("div", {
                   className: "content", 
                   dangerouslySetInnerHTML: {
                     __html:itemHtml
                   }})
               )
             )
    };
    return React.createElement("ol", null, this.props.items.map(createItem));
  }
});

var TodoApp = React.createClass({displayName: 'TodoApp',
  getInitialState: function() {
    return {items: ["Select the box and press enter or click 'Add'"], text: 'Type some _markdown_'};
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var text = this.state.text;
    if(text !== ""){
      var nextItems = this.state.items.concat([converter.makeHtml(text)]);
      this.setState({items: nextItems, text: ''});
    }
  },
  render: function () {
    return (
      React.createElement("div", {className: "list"}, 
        React.createElement("h3", null, "TODO"), 
        React.createElement("p", null, "Make a todo item in the box below. ", React.createElement("br", null), " ", React.createElement("a", {href: "https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#headers"}, "Markdown"), " is optional!"), 
        React.createElement(TodoList, {items: this.state.items}), 
        React.createElement("form", {
          className: "inputForm", 
          onSubmit: this.handleSubmit}, 
	  React.createElement("div", {className: "preview"}, 
	    React.createElement("p", {id: "title"}, "Preview:"), 
            React.createElement("div", {
              className: "content", 
              dangerouslySetInnerHTML: {
                __html: converter.makeHtml(this.state.text)
              }})
	  ), 
          React.createElement("input", {onChange: this.onChange, 
            value: this.state.text}), 
          React.createElement("button", null, 'Add #' + (this.state.items.length + 1)), React.createElement("br", null)
        ), 
        React.createElement("div", {
          className: "credits"}, 
          React.createElement("p", null, "Made with ", React.createElement("a", {href: "http://facebook.github.io/react/"}, "react.js"), " ")
        )
      )
    );
  }
});


var converter = new Showdown.converter();

React.render(React.createElement(TodoApp, null), todos);
