Announcing Marko v3: From HTML to HTML-JS
==============================

Marko is one of the fastest, lightest and most powerful HTML templating engines for Node.js and the browser, and we are very pleased to see a healthy and growing community. Marko has been [downloaded over 100k times](http://npm-stat.com/charts.html?package=marko) in the first few months of 2016, and the project has a very active [Gitter chat room](https://gitter.im/marko-js/marko). We are excited to announce some huge improvements to the Marko templating engine as part of the v3 release.

First off, a huge thanks to all of the contributors who have provided code and feedback for the amazing Marko v3 release (see [#90](https://github.com/marko-js/marko/issues/90), [#211](https://github.com/marko-js/marko/issues/211), especially [Adam McArthur](https://github.com/adammcarth), [Achim Vedam](https://github.com/vedam), [Bryce Watson](https://github.com/BryceEWatson), [Dan Cech](https://github.com/DanCech), [Dan Richman](https://github.com/danrichman), [Kristian Mandrup](https://github.com/kristianmandrup), [@onemrkarthik](https://github.com/onemrkarthik), [Phillip Gates-Idem](https://github.com/philidem), [Sathish Pottavathini](https://github.com/pswar), [Sandeep Raveesh](https://github.com/crsandeep), [Scott Davis](https://github.com/scttdavs), [Sean Gates](https://github.com/seangates), [Sunny Gurnani](https://github.com/SunnyGurnani), [@tindli](https://github.com/tindli) and [Yoni Medoff](https://github.com/yomed))! Extra thanks to [Phillip Gates-Idem](https://github.com/philidem) for taking on the arduous task of building the new [htmljs-parser](https://github.com/philidem/htmljs-parser) used by Marko v3.

For Marko v2 users, you can use the [marko-migrate](https://github.com/marko-js/marko-migrate) tool to automatically migrate your Marko v2 templates to use the new Marko v3 syntax.

For a complete list of what changed in Marko v3, please read [What's New in Marko v3](http://markojs.com/docs/marko/what-is-new-marko-v3/).

# A quick intro to Marko

Marko has been shown to be one of the [fastest](https://github.com/marko-js/templating-benchmarks) templating engines with almost 2x the speed of Handlebars and 5x the speed of Jade and nunjucks. In addition, in a [real-world benchmark](https://github.com/patrick-steele-idem/marko-vs-react), Marko (paired with [Marko Widgets](http://markojs.com/docs/marko-widgets/)) was shown to be 10x faster than React when rendering a search results page on the server using a very similar UI components architecture. An _order of magnitude_ difference is _very significant_ and this performance gap translated to the React app only being able to handle ~72 requests per second, while the Marko app achieved ~820 requests per second. Marko offers streaming and asynchronous rendering, and these features make it easy to create pages that load near instantaneously when rendered on the server (see [KnowThen: Episode 8 – Serving Content in Koajs with Marko](http://knowthen.com/episode-8-serving-content-in-koajs-with-marko/)). The Marko compiler produces minimal and readable CommonJS modules as output and the runtime is only about `3.5KB` gzipped.

While performance of Marko is best-in-class, usability is also very important. Marko v3 introduces a new HTML-JS syntax and a new parser that makes Marko more intuitive.

Rendering a Marko template is incredibly simple. For example, to render a template to an HTTP response stream:

```javascript
var template = require('./template.marko');

app.get('/', function(req, res) {
    template.render({
            name: 'Frank',
            colors: ['red', 'green', 'blue']
        }, res);
});
```

Marko has always been designed to have strong support for building UI components that encapsulate rendering logic, client-side behavior and styling. [Marko Widgets](http://markojs.com/docs/marko-widgets/) is a UI component building library that uses Marko templates as the view. Marko Widgets offers advanced features like DOM diffing/patching, batched updates, stateful & stateless widgets, declarative event binding, and efficient event delegation. Marko, combined with Marko Widgets, is a very compelling solution for building high performance web applications with a universal/isomorphic UI components-based architecture. Marko Widgets adopted many of the great ideas promoted by the React team.

Finally, Marko is well-supported in all major web frameworks (including [Express](/docs/marko/express/), [Koa](/docs/marko/koa/) and [Hapi](/docs/marko/hapi/)). Since the Marko compiler produces CommonJS modules as output, Marko templates can easily be rendered in all web browsers using a JavaScript module bundler such as [Lasso.js](https://github.com/lasso-js/lasso), [Browserify](http://browserify.org/) and [Webpack](https://webpack.github.io/).

## HTML-JS syntax

Marko's clean HTML-based syntax has been a strength, but over time it became clear that utilizing a strict HTML parser was actually putting unnecessary constraints on the Marko language that negatively impacted code readability and usability. The new HTML-JS syntax that ships with Marko v3 breaks away from the limitations associated with the standard HTML syntax while still maintaining the look and feel of HTML.

The previous release of Marko utilized an off-the-shelf HTML parser that parsed all HTML attribute values as strings. Separate tag schema files were required to associate type information with an attribute value for custom tags. To make this more clear, let's take a look at a simple template.

_Marko v2 HTML template:_

```xml
<my-component name="Frank" message-count="30" visible="true"/>
```

In the example above we are including a custom tag and passing some _data_ to the custom tag using attributes. Because it is HTML, the HTML parser always provides attribute values as string values (regardless of whether or not the value was enclosed in quotes or not). To work around this limitation, the old Marko supported tag schema files in the following format:

```json
{
    "<my-component>": {
        "@name": "string",
        "@message-count": "number",
        "@visible": "boolean"
    }
}
```

The information provided in the schema instructed Marko on how to interpret string attribute values. The schema approach worked, and it was simple, but the necessity for a schema was an annoyance and it degraded template readability.

The new HTML-JS parser solves this issue by parsing all attribute values as JavaScript expressions.

_Marko v3 HTML-JS template:_

```xml
<my-component name="Frank" message-count=30 visible=true/>

<my-component number=1/>
<my-component string="Hello"/>
<my-component template-string="Hello ${name}"/>
<my-component boolean=true/>
<my-component array=[1, 2, 3]/>
<my-component object={hello: 'world'}/>
<my-component variable=name/>
<my-component function-call=data.foo()/>
<my-component complex-expression=1+2/>
<my-component super-complex-expression=(data.foo() + data.bar(['a', 'b', 'c']))/>
```


The move from HTML to HTML-JS is analogous to moving from XML to JSON to store human readable data. With XML, all attribute values are parsed as strings and a separate schema file is needed to associate type information with attributes. JSON, on the other hand, supports types (namely, strings, numbers, booleans, objects and arrays). JSON is far superior to XML in most cases because it has a clean syntax that supports types.



### Tag and attribute arguments

In addition to introducing attribute types, the new HTML-JS syntax supports tag and attribute arguments as shown below:

```xml
<ul>
    <for(color in colors)>`
        <li>
            ${color}
        </li>
    </for>
</ul>

<ul>
    <li for(color in colors)>
        ${color}
    </li>
</ul>
```

Tag and attribute arguments allow special Marko directives to be more cleanly separated from the standard HTML grammar as shown below:

```xml
<!-- Old: -->
<div for="color in colors">

<!-- New: -->
<div for(color in colors)>
```

In addition, the special Marko directives `if()`, `for()`, etc. are now very similar to their JavaScript counterparts.

The sample code below illustrates what a Marko template now looks like with the new HTML-JS syntax:

```xml
<!-- Basic JavaScript constructs -->
<var colors=['red', 'green', 'blue']/>

<!-- Placeholders, looping and conditionals -->
<ul if(notEmpty(colors))>
    <li for(color in colors)>
        ${color}
    </li>
</ul>
<div else>
    No colors!
</div>

<!-- Custom tags -->
<greeting name="Frank" message-count=10/>

<!-- Macros -->
<macro navLink(href, title, isActive)>
    <li class=(isActive ? 'active' : null)>
        <a href=href>${title}</a>
    </li>
</macro>

<ul>
    <navLink href="/" title="Home" isActive=true/>
    <navLink('/about', 'About', false) />
</ul>
```

### Concise syntax

Another exciting improvement to Marko is that the new HTML-JS syntax supports both a familiar HTML syntax and a concise, indentation-based syntax as shown below:

```xml
// Basic JavaScript constructs
var colors=["red", "green", "blue"]

// Placeholders, looping and conditionals
ul if(notEmpty(colors))
    li for(color in colors)
        - ${color}
div else
    - No colors!

// Custom tags
greeting name="Frank" message-count=10

// Macros
macro navLink(href, title, isActive)
    li class=(isActive ? "active" : null)
        a href=href - ${title}
ul
    navLink href="/" title="Home" isActive=true
    navLink('/about', 'About', false)
```

The concise syntax removes a lot of the noise associated with the traditional HTML syntax and makes it much easier to modify a template without having to worry about matching opening and closing tags.

The HTML syntax and the concise syntax can even be combined within the same document:

```xml
// Basic JavaScript constructs
var colors=["red", "green", "blue"]

// Placeholders, looping and conditionals
ul if(notEmpty(colors))
    li for(color in colors)
        - ${color}
div else
    - No colors!

// Custom tags
<greeting name="Frank" message-count=10/>

// Macros
macro navLink(href, title, isActive)
    <li class=(isActive ? "active" : null)>
        <a href=href>${title}</a>
    </li>
ul
    navLink href="/" title="Home" isActive=true
    navLink('/about', 'About', false)
```

In addition, the [marko-prettyprint](https://github.com/marko-js/marko-prettyprint) tool can be used to convert between the two syntaxes at any point.

The new concise syntax for Marko was heavily inspired by Jade/Pug. However, we reduced the number of grammar rules with Marko to make the concise syntax easier to grasp and closer to HTML.

# A note on Marko versus JSX/React

[Marko Widgets](http://markojs.com/docs/marko-widgets/) is a UI component building library that uses Marko templates as the view. Marko Widgets has a lot in common with React, but Marko Widgets uses Marko templates to define the view and React typically uses JSX to define the view.

Both Marko and JSX aim to blend JavaScript and HTML. Marko and JSX may seem very similar on the surface:

> Marko makes HTML more like JavaScript.<br>
> JSX makes JavaScript more like HTML.

However, there are some very subtle but important differences:

## Compile-time optimizations

JSX is sugar on top of JavaScript and the JSX transform is required to translate embedded XML code into JavaScript code that produces a tree of virtual DOM nodes that _directly_ corresponds to the declared XML structure. In addition, React is purely a runtime engine. The strict transformation expected of JSX and the design of React leaves very little room for compile-time optimizations.

In contrast, Marko was designed to allow template authors to describe the intent while giving the compiler and runtime much greater flexibility in determining the _how_. Marko allows compile-time transformations and custom code generators for custom tags and custom attributes for further optimizing compiled templates. Among other things, the Marko compiler concatenates all static blocks of HTML into a single string and it removes extra whitespace. While not fully exploited, the architecture of Marko allows different compiled code based on custom output modes. For example, the Marko compiler can either produce a program that, when executed, streams HTML (for use on the server) or creates a DOM tree (for use in the browser).

A very large portion of Marko Widgets is implemented as compile-time code transformations and code generators. As a result, the runtime for Marko Widgets is fairly minimal.

## Runtime performance

Marko has chosen to focus on rendering HTML while React has chosen to focus on rendering virtual DOM nodes.

Once JSX is used to render a tree of nodes on the server, it is then necessary to walk the entire tree to serialize it to HTML for sending to the browser. Building _and_ traversing a tree requires more memory and CPU than just running a program that renders HTML in a single pass (especially as the complexity of the DOM increases).

The Marko compiler produces a program that renders a template to a stream in a single pass. On the server, writing HTML strings to an output stream is extremely efficient.

## Overall performance

A smart compiler paired with a runtime that supports streaming and asynchronous rendering allows Marko to excel on the server.

These characteristics have resulted in Marko (combined with Marko Widgets) being _10x_ faster than React on the server in a real-world benchmark. An _order of magnitude_ difference is very significant as shown in the following graph:

![Average Requests per Second](https://raw.githubusercontent.com/patrick-steele-idem/marko-vs-react/master/charts/requestsPerSecond.png)

Source: [Marko vs React: Performance Benchmark](https://github.com/patrick-steele-idem/marko-vs-react)

In the browser, our benchmark showed no significant difference in performance when comparing Marko Widgets and React (although Marko Widgets seemed to have an edge in the mobile iOS browser).

## Usability

Despite differences in the design of Marko Widgets and React, both support building UI components with rich features such as transclusion, container components, parent/child relationships, efficient event delegation and views based on state. On the client, web browsers can very quickly translate an HTML string into a DOM tree and it turns out that a virtual DOM is not needed to achieve the benefits of DOM diffing/patching. The [morphdom](https://github.com/patrick-steele-idem/morphdom) module was created to enable DOM diffing/patching using only the _real_ DOM. Marko Widgets has adopted [morphdom](https://github.com/patrick-steele-idem/morphdom) and offers a very simple approach to building UI components with views that automatically and efficiently update when state changes. Marko Widgets is compatible with application state containers such as [Redux](https://github.com/reactjs/redux).

Unlike other templating engines, Marko was designed to fully leverage the power of JavaScript. Marko is a very powerful HTML templating engine that happens to start with HTML, but it is no less powerful than JSX.

## Readability

While readability can be subjective, let's compare a Marko template with a JSX program. In both examples, the Marko template and the JSX program will produce the same HTML output, but as you can see below, the readability of the code is very different:

___React JSX:___

```javascript
function renderColors(colors) {
    if (colors.length) {
        return <ul>
            {colors.map(renderColor)}
        </ul>;
    } else {
        return <div>No colors!</div>;        
    }
}

function renderColor(color) {
    var style = {
        backgroundColor: color
    };

    return <li className="color" style={style}>
            {color}
        </li>
}
```

___Marko:___

```xml
<ul if(notEmpty(colors))>
    <li class="color" style="background-color: ${color};" for(color in colors)>
        ${color}
    </li>
</ul>
<div else>
    No colors!
</div>
```

The differences becomes even more striking if you consider the new concise syntax for Marko:

```xml
ul if(notEmpty(colors))
    li.color style="background-color: ${color};" for(color in colors)>
        ${color}
div else
    - No colors!
```

# Summary

We have found it very rewarding to see the Marko community growing, and [eBay](http://www.ebay.com/) has continued to be a major contributor to this open source project. It is exciting to see more teams outside eBay adopting Marko, and, as this project has matured, we are seeing more and more outside contributions (including documentation, tools, code improvements and ideas).

With the Marko v3 release we have also improved tooling support:

- Atom: [language-marko](https://atom.io/packages/language-marko)
- Sublime Text: [marko-sublime](https://github.com/merwan7/sublime-marko)
- WebStorm: [marko.tmbundle](https://github.com/marko-js/marko-tmbundle) (See: [Importing TextMate Bundles](https://www.jetbrains.com/phpstorm/help/importing-textmate-bundles.html))
- TextMate: [marko.tmbundle](https://github.com/marko-js/marko-tmbundle)
- CodeMirror/Brackets: [codemirror-atom-modes](https://github.com/patrick-steele-idem/codemirror-atom-modes)
- Prettyprint: [marko-prettyprint](https://github.com/marko-js/marko-prettyprint)

We also released a [marko-migrate](https://github.com/marko-js/marko-migrate) tool that will automatically migrate your Marko v2 templates to use the new Marko v3 syntax.

For a complete list of what changed in Marko v3, please read [What's New in Marko v3](http://markojs.com/docs/marko/what-is-new-marko-v3/).

Marko is heavily tested with over 600 individual tests for Marko and its new parser. eBay is far along in transitioning to the Node.js stack for the website front-end and Marko and Marko Widgets has been the technology of choice for almost all teams. As a result, Marko and Marko Widgets have been battle tested in production.

If you have ideas on how to improve Marko please let us know. We welcome new contributors so if you would like to help out please join us in the [Gitter chat room for Marko](gitter.im/marko-js/marko), [file an issue on Github](https://github.com/marko-js/marko) or send us a pull request.