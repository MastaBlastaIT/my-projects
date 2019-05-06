Cool grammar is in `cool.y` and `cool.flex`.

cmd:
```
npm run jison
node cool.js null_in_code.cl.cool
node index.js

npm run jison-gho
node cool.js bad.cl 
node index.js
```
