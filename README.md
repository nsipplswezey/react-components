# react-components
A Repository for Storing, Testing and Demoing My React Components

# Rendering
Uses webpack and react-hotloader to bundle and watch the project repository.
To bundle and start hotloading use

```npm start```

Then go to localhost:3000
Hotloading is fickle with this setup; some changes are hotloadable, others aren't. TODO: figure out why. Hotloading is dreamy cool, worth using where possible and I hope we robustly get there some day. For now automatic rebundling on changes works just fine, and a 'command-R' isn't a big deal

# Testing
Testing with karma because it's mature, and it works well with webpack and react. Tried jest and it was all pain and little gain with its automocking and other hassles.
Karma works beautifully.

```karma start``` or ```npm test```

# Inspiration and Styling

One is a **static chart** react component using paths-js and inline styling. This is inspired by a [blog post](https://viget.com/extend/visualization-is-for-sharing-using-react-for-portable-data-visualization) on isomorphic react plots that are intended to arrive to the client pre-rendered, with a server route for downloading the plot, so that it can easily be included in a report. Great idea, great blogpost.

One is a set of **click-based** react components using bootstrap css, vaguely inspired by the react-bootstrap library. Uses the flux pattern to manage component state. Uses immutable js for undo-redo. TODO: Bring over the immutable stuff from the other project.

Another is a set of **scroll-based** interactions, based on a refactoring of Mike Bostock's scroll driven interface for image, video and text conent + nyt page styling. This one is interesting because as a user, I percieve the react onScroll synthetic event to be slower/jankier than Mike's d3 event loop implementation. TODO: figure out why. I'm sure there's a great interesting reason for this that will lead to a beautiful react optoimization. 

The last are **hover-based** react components inspired by Bret Victor's ~2010-2011 interaction design demos like Ladder of Abstraction and 10 Brighter Ideas. These things are timeless.
