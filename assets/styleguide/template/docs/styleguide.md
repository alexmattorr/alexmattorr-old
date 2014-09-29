CSS Style Guide
============

This guide outlines the style and naming guidelines when writing CSS/Sass.  These rules follow a [Convention over configuration](http://en.wikipedia.org/wiki/Convention_over_configuration) paradigm, as such they are fairly strict.  These conventions are meant to ease in long term maintence, but they usually result in more reuseable code. 


Modules
-----------

The module is a similar concept to namespaces. The basic idea, coming from [Modular Programming](http://en.wikipedia.org/wiki/Modular_programming), is to seperate different functionality into modules.  These can be generally seperated into two categories, components (visual) and layout (logical).

###Components 

Most modules defined are components. They can range from simple links, headers, and buttons to more complex, user defined modules like a dialog or user badge.  Components can contain other components, but if you find yourself heavily modifying a module it should probably be seperated into it's own component.

Components can be nested inside each other to create more complex modules.  If you find yourself modifying child components heavily, it may be appropriate to create a new sub component specific to your module.l

All compenents that modify base html tags should be located in 'sass/base' while any user defined components should be located in 'sass/components'

#####Button Example

    <a class="button">Click Me</a>

#####Dialog Example

    <div class="dialog">
        <div class="dialog-content">Hello World</div>
        <a class="dialog-button button">OK</a>
    </div>


###Layout

Layout modules define modules that layout muiltiple child components.  These often define diferent logical sections like the header or footer on the page, but can also define layout functions like a column or wrapper module.  They can be a bit more 

Layout modules should be located in 'sass/layouts'

#####Section Example

    <section class="layout-section hero">
        <h2 class="hero-header header">The Comedians of Comedy</h2>
        <ul class="hero-list list">
            <li class="list-item">Patton Oswalt</li>
            <li class="list-item">Brian Posehn</li>
            <li class="list-item">Maria Bamford</li>
        </ul>
    </div>

#####Side-by-side Container Example

    <div class="slice">
        <div class="slice-item">
            <div class="usercard"> ... </div>
            <div class="usercard"> ... </div>
            <div class="usercard"> ... </div>
        </div>

        <div class="slice-item">
            <div class="profile"> ... </div>
        </div>
    </div>



Naming
------------

The naming scheme used follows a strict convention.  While a bit heavier on html markup, the trade-off for ease of maintence and scale is worth it.  The payoff is huge longterm.  

###Classes

A class should be created for every module.  The module or module container should recieve the base class.  Classes are hyphenated using a namespaced naming scheme.  The first part of the class should always be the module name, and then any necessary sub-classes.

#####Hero Example

    .hero {}
    .hero-header {}
    .hero-list {}


###Base



###IDs

Ids are used to denote major layout sections of the webpage and connection points for a module's javascript.  This encourages writing javascript that is similarly namespaced as css; a huge win for maintainability and once again that code is probably more reuseable.


#####Simple Example

    <div id="app">
        <header id="header"></header>
        <div id="contentArea"></div>
        <footer id="footer"></footer>
    </div>

#####Complex Example

    <div class="login" id="userLogin">
        <h3 class="login-header header">Login</h3>
        <form class="login-form">
            <input class="input input-text" type="text" value="username" />
            <input class="input input-password" type="password" value="password" />

            <input class="button" value="Login" />
        </form>
    </div>










