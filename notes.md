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

Inputs:
Form-The main purpose of the form element is to submit the values of the inputs it contains. 
Input element-represents many different input types. You set the type of input with the type attribute. 

To upload to production environment:
./deployFiles.sh -k <yourpemkey> -h <yourdomain> -s startup 

This was not too bad, I just had to make sure I got the footer where I wanted it to. I created an image for the character and iamges for the pong balls. These still don't show since I have not made the background black yet.

## CSS
CSS is primarily concerned with defining rulesets, or simply rules. A rule is comprised of a selector that selects the elements to apply the rule to, and one or more declarations that represent the property to style with the given property value

The rules cascade down from the highest nodes in the DOM tree to the lowest level. Any declaration property defined at a lower level will override the higher declaration.

![alt text](image.png)

CSS treats every element as a series of nested rectangular boxes. The innermost box contains the actual content (like text or images). Surrounding that is the padding, which inherits styling such as background color. Next is the border, which can have specific properties like color and thickness. Finally, the margin wraps the element, providing whitespace without affecting the styling.

You can change the box-sizing CSS property from the default value of content-box to border-box in order to redefine the width and height to also include the padding and the border. This often makes it easier to style elements when their visual size matches their actual size.


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
