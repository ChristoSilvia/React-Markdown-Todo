var TodoList = React.createClass({
  render: function() {
    var createItem = function(itemHtml) {
      return <li>
               <div
                 className="MarkdownEditor">
                 <div
                   className="content"
                   dangerouslySetInnerHTML={{
                     __html:itemHtml
                   }} />
               </div>
             </li>
    };
    return <ol>{this.props.items.map(createItem)}</ol>;
  }
});

var TodoApp = React.createClass({
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
      <div className="list">
        <h3>TODO</h3>
        <p>Make a todo item in the box below. <br/> <a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#headers">Markdown</a> is optional!</p>
        <TodoList items={this.state.items} />
        <form 
          className="inputForm"
          onSubmit={this.handleSubmit}>
	  <div className="preview">
	    <p id="title">Preview:</p>
            <div 
              className="content"
              dangerouslySetInnerHTML={{
                __html: converter.makeHtml(this.state.text)
              }} />
	  </div>
          <input onChange={this.onChange} 
            value={this.state.text} />
          <button>{'Add #' + (this.state.items.length + 1)}</button><br />
        </form>
        <div
          className="credits">
          <p>Made with <a href="http://facebook.github.io/react/">react.js</a> </p>
        </div>
      </div>
    );
  }
});


var converter = new Showdown.converter();

React.render(<TodoApp />, todos);
