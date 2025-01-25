# CS 260 Notes

[My startup - Simon](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## Github
When it comes to github, I need to commit the changes I make, very frequently. 

## AWS
The collection of technologies that you use to create or deliver your web application is called a technology stack. Generally at the top of the stack is your web framework.

an IP address can be referenced by a domain name

The Amazon Web services EC2 has a ton of useful info about the server.

IP address of my server: http://44.211.203.75/

Command to remote shell into my server - ➜  ssh -i [key pair file] ubuntu@[ip address]

Domain names are broken up into a root domain, with one or more possible subdomain prefixes

## HTML
HTML is almost completely about structure, not so much about visual appearance
Elements are represented with enclosing tags. Ex: <body> </body>
HTML defines a header (<!DOCTYPE html>) that tells the browser the type and version of the document. You should always include this at the top of the HTML file.
Always start with the html element Ex:<!DOCTYPE html>
                                      <html lang = "en"> 
                                          <head>
                                          </head>
                                          <body>
                                          </body>
                                       </html>
Every element can have attributes
Attributes describe the specific details of the element Ex: class = "opener"
Hyperlinks are represented with an anchor element with href as an attribute. Ex: <a href = "faecbook.com/bobgrader">My Facebook</a>
You can include comments in your HTML files by starting the comment with <!-- and ending it with -->
There are special characters that you have to escape using the entity syntax:
Character	Entity
    &	    &amp;
    <	    &lt;
    >	    &gt;
    "	    &quot;
    '	    &apos;
    😀	  &#128512;
A block element is meant to be a distinct block in the flow of the content structure
An inline element is meant to be inline with the content flow of a block element


## CSS

This took a couple hours to get it how I wanted. It was important to make it responsive and Bootstrap helped with that. It looks great on all kinds of screen sizes.

Bootstrap seems a bit like magic. It styles things nicely, but is very opinionated. You either do, or you do not. There doesn't seem to be much in between.

I did like the navbar it made it super easy to build a responsive header.

```html
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand">
            <img src="logo.svg" width="30" height="30" class="d-inline-block align-top" alt="" />
            Calmer
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" href="play.html">Play</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="about.html">About</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="index.html">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
```

I also used SVG to make the icon and logo for the app. This turned out to be a piece of cake.

```html
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" fill="#0066aa" rx="10" ry="10" />
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="72" font-family="Arial" fill="white">C</text>
</svg>
```

## React Part 1: Routing

Setting up Vite and React was pretty simple. I had a bit of trouble because of conflicting CSS. This isn't as straight forward as you would find with Svelte or Vue, but I made it work in the end. If there was a ton of CSS it would be a real problem. It sure was nice to have the code structured in a more usable way.

## React Part 2: Reactivity

This was a lot of fun to see it all come together. I had to keep remembering to use React state instead of just manipulating the DOM directly.

Handling the toggling of the checkboxes was particularly interesting.

```jsx
<div className="input-group sound-button-container">
  {calmSoundTypes.map((sound, index) => (
    <div key={index} className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        value={sound}
        id={sound}
        onChange={() => togglePlay(sound)}
        checked={selectedSounds.includes(sound)}
      ></input>
      <label className="form-check-label" htmlFor={sound}>
        {sound}
      </label>
    </div>
  ))}
</div>
```
