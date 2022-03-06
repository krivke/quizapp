/*
localStorage - is a storage where data stays even after you close that page/browser
data is stored (its a sqllite database):    
***you can't use localStorage as a database when u have users(form) cause if your localStorage
***wil be the same no matter what acc you are on
---------
1.CHROME    
    \AppData\Local\Google\Chrome\User Data\Default\Local Storage on Windows machines 
    ~/Library/Application Support/Google/Chrome/Default/Local Storage on macOS

2.FIREFOX
    - webappsstore.sqlite

COMMANDS:
-------
setItem(): Add key and value to localStorage
getItem(): This is how you get items from localStorage
removeItem(): Remove an item by key from localStorage
clear(): Clear all localStorage
key(): Passed a number to retrieve the key of a localStorage

--window.localStorage

DO NOT:
------
Do not store sensitive user information in localStorage
It is not a substitute for a server based database as information is only stored on the browser
localStorage is limited to 5MB across all major browsers
localStorage is quite insecure as it has no form of data protection and can be accessed by any code on your web page
localStorage is synchronous, meaning each operation called would only execute one after the other

*/
//sessionStorage - also a storage but data gets deleted when page/browser is closed



/*
COOKIES:
-------
 Cookies are stored on the hosting web server. - so others cant access its
Cookies are generally used for session management, 
personalization (such as themes or similar settings), and tracking user behavior across websites.
cookie size and the number of cookies allowed for a particular domain 
(typically 4kb and 20 cookies per domain).

const cookies = document.cookie;
you can also set cookie by:
document.cookie = "hello=world; domain=example.com; Secure";
but its not very clean... 
so it would be desireable/preferable if you use js-cookie library(supports TypeScript):
Cookies.set('hello', 'world', { domain: 'example.com', secure: true });
Cookies.get('hello'); // -> world

*/

/*
HTTP -protocol:
https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview
------------
The messages sent by the client, usually a Web browser, 
are called requests and the messages sent by the server as an answer are called responses. 

Between client and a server there is a numerous number of computer(machines,modems,routers) that
perform functions like:
        1.caching
        2.filtering(antivirus)
        3.load balancing - to allow multiple servers to serve different requests
        4.authenticaion
        5.logging
HTTP relies on TCP for connections,Before a client and server can exchange an HTTP 
request/response pair, they must establish a TCP connection.
The default behavior of HTTP/1.0 is to open a separate
TCP connection for each HTTP request/response pair.In order to mitigate this flaw, 
HTTP/1.1 introduced pipelining (which proved difficult to implement) and persistent connections

HTTP/2 went a step further by multiplexing messages over a single connection, 
helping keep the connection warm and more efficient. 


CSRF TOKEN IN COOKIES:
------------
we use csrftoken in cookies becasue its dynamic,allowing ajax and fetchApi to retrieve csrf when needed
also hackers have no way of  using it because of Same-Origin Policy.They will be retreiving 
their own csrf_token not the victims




There are two MIME types:
----
MIME (Multipurpose Internet Mail Extension) je proširenje SMTP protokola koje omogućava prijenos 
non-ASCII sadržaja u e-mail poruci.

they are Content-Type headers for HTTP POST requests that user-agents(browsers) use.
1.application/x-www-form-urlencoded used for non-binary data where data is sentto the server as a
    giant query string - name/value pairs:
    MyVariableOne=ValueOne&MyVariableTwo=ValueTwo

2.multipart/form-data - -- we can choose a more efficient encoding of binary data to save bandwidth (e.g. base 64 or even raw binary).

    -used for binary data
    -can be used for all data but  its overkill because there are more efficient encoding
*/