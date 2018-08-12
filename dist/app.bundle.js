!function(t){var e={};function i(s){if(e[s])return e[s].exports;var o=e[s]={i:s,l:!1,exports:{}};return t[s].call(o.exports,o,o.exports,i),o.l=!0,o.exports}i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)i.d(s,o,function(e){return t[e]}.bind(null,o));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){"use strict";i.r(e);const s=30,o=10,h=20,l=30,r=30,c={o:"#FBC02D",i:"#0097A7",s:"#4CAF50",z:"#F44336",l:"#FF9800",j:"#2196F3",t:"#9C27B0"},a={o:[[[1,1],[1,1]]],i:[[[1,1,1,1]],[[1],[1],[1],[1]]],s:[[[0,1],[1,1],[1]],[[1,1],[0,1,1]]],z:[[[1],[1,1],[0,1]],[[0,1,1],[1,1]]],l:[[[1,1,1],[0,0,1]],[[1,1],[1],[1]],[[1],[1,1,1]],[[0,1],[0,1],[1,1]]],j:[[[0,0,1],[1,1,1]],[[1,1],[0,1],[0,1]],[[1,1,1],[1]],[[1],[1],[1,1]]],t:[[[1,0],[1,1],[1]],[[0,1],[1,1,1]],[[0,1],[1,1],[0,1]],[[1,1,1],[0,1]]]};class n{constructor(t,e,i=1){this.score=0,this.lineCleared=0,this.startLevel=i,this.level=i,this.velocity=.05*this.level,this.gameOver=!1,this.tetris=!1,this.x=t,this.y=e,this.width=s*o,this.height=s*h,this.color="#333",this.board=[];for(let t=0;t<h;t++){this.board.push([]);for(let e=0;e<o;e++)this.board[t].push(new u(this,e,t,"empty"))}this.spawnNewBlock()}draw(t,e=!1){t.strokeStyle=this.color,t.strokeRect(this.x,this.y,this.width,this.height),t.fillStyle="#333",t.font="24px monospace";let i=2*this.x+this.width;t.fillText("Level: ",i,2*this.y),t.fillText(this.level,i,3*this.y),t.fillText("Score: ",i,5*this.y),t.fillText(this.score,i,7*this.y),t.fillText("Lines:",i,9*this.y),t.fillText(this.lineCleared,i,11*this.y),t.fillText("Next: ",i,13*this.y),this.board.forEach(e=>{e.forEach(e=>{e.draw(t)})}),e||(this.nextBlock.draw(t),this.activeBlock.draw(t))}handleAction(t){if(!this.gameOver){if(Object.keys(t).forEach(e=>{if(t[e]){if(this.activeBlock.collideCounter>0&&"down"===e)"down"===e&&(this.activeBlock.collideCounter=l);else{let t=this.activeBlock.move(e);t.blocks.every(t=>this.isValid(t))&&(this.activeBlock=t)}t[e]=!1}}),this.activeBlock.blocks.some(t=>this.collide(t)))this.activeBlock.collideCounter++,this.activeBlock.collideCounter>=l&&(this.activeBlock.blocks.forEach(t=>{let e=Math.round(t.y);t.y=e,this.board[t.y][t.x]=t}),this.spawnNewBlock());else{let t=this.activeBlock.move();t.blocks.every(t=>this.isValid(t))&&(this.activeBlock=t)}this.clearLine()}}clearLine(){let t=0;this.board.forEach((e,i)=>{if(e.every(t=>"empty"!==t.type)){t++;let e=[];for(let t=0;t<o;t++)e.push(new u(this,t,0,"empty"));for(let t=i;t>0;t--){let e=this.board[t-1];e.forEach(t=>{t.y=t.y+1}),this.board[t]=e}this.board[0]=e}}),t>0&&(this.tetris&&4===t&&(this.score+=400),this.tetris=4===t,this.score+=100*Math.pow(2,t-1)),this.lineCleared+=t,this.level=this.startLevel+Math.floor(this.lineCleared/r),this.velocity=.05*this.level}isValid(t){let e=Math.round(t.y),i=t.x;return i>=0&&i<=o-1&&e<h&&e>=0&&"empty"===this.board[e][i].type}collide(t){let e=Math.floor(t.y),i=t.x;return e>=h-1||this.board[e+1][i]&&"empty"!==this.board[e+1][i].type}spawnNewBlock(){let t=Object.keys(a),e=t[Math.floor(Math.random()*t.length)];this.activeBlock?this.activeBlock=new d(this,this.nextBlock.shape):(this.activeBlock=new d(this,e),e=t[Math.floor(Math.random()*t.length)]);const i={x:2*this.x+this.width,y:14*this.y,velocity:0};this.nextBlock=new d(i,e,0,1,0),this.activeBlock.blocks.some(t=>this.collide(t))&&(this.gameOver=!0)}}class d{constructor(t,e,i=0,s=4,o=0){this.board=t,this.shape=e,this.blocks=[],this.shapeIndex=i,this.collideCounter=0;let h=a[this.shape][i];h.forEach((e,i)=>{e.forEach((e,l)=>{1===h[i][l]&&this.blocks.push(new u(t,s+i,o+l,this.shape))})})}move(t=""){if("rotate"===t){let t=this.blocks[0].x,e=this.blocks[0].y,i=this.shapeIndex===a[this.shape].length-1?0:this.shapeIndex+1;return new d(this.board,this.shape,i,t,e)}if("drop"===t){let t=this.move();return t.collideCounter=l,t}let e=Object.assign(Object.create(this),this);return e.blocks=e.blocks.map(e=>e.move(t)),e}draw(t){this.blocks.forEach(e=>e.draw(t))}}class u{constructor(t,e=4,i=0,o="block"){this.board=t,this.x=e,this.y=i,this.width=s,this.height=s,this.type=o,this.color="empty"===this.type?"#ccc":c[o]}move(t){let e=Object.assign(Object.create(this),this);switch(t){case"left":e.x--;break;case"right":e.x++;break;case"down":e.y+=this.board.velocity+.2;break;default:e.y+=this.board.velocity}return e}draw(t){let e=this.board.x+this.x*s,i=this.board.y+this.y*s;t.fillStyle=this.color,t.fillRect(e,i,this.width,this.height),t.strokeStyle="#eee",t.strokeRect(e,i,this.width,this.height)}}const f={32:"drop",37:"left",38:"rotate",39:"right",40:"down",72:"left",74:"down",75:"rotate",76:"right"},y=document.querySelector("#main"),b=y.getContext("2d");let p=new n(20,20);p.draw(b,!0);const v=document.querySelector("#start"),k=document.querySelector("#host"),w=document.querySelector("#connect");v.addEventListener("click",()=>{!function(){const t={};p=new n(20,20),document.addEventListener("keydown",e=>{let i=f[e.which];""!==i&&(e.preventDefault(),e.stopPropagation()),t[i]=!0}),function e(){p.gameOver?(v.disabled=!1,k.disabled=!1,w.disabled=!1):(window.requestAnimationFrame(e),p.handleAction(t),function(t,e,i){e.clearRect(0,0,t.width,t.height),i.draw(e)}(y,b,p))}()}(),v.disabled=!0,k.disabled=!0,w.disabled=!0})}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JvYXJkLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJpbnN0YWxsZWRNb2R1bGVzIiwiX193ZWJwYWNrX3JlcXVpcmVfXyIsIm1vZHVsZUlkIiwiZXhwb3J0cyIsIm1vZHVsZSIsImkiLCJsIiwibW9kdWxlcyIsImNhbGwiLCJtIiwiYyIsImQiLCJuYW1lIiwiZ2V0dGVyIiwibyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsImdldCIsInIiLCJTeW1ib2wiLCJ0b1N0cmluZ1RhZyIsInZhbHVlIiwidCIsIm1vZGUiLCJfX2VzTW9kdWxlIiwibnMiLCJjcmVhdGUiLCJrZXkiLCJiaW5kIiwibiIsIm9iamVjdCIsInByb3BlcnR5IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJwIiwicyIsIkJBU0VfQkxPQ0tfV0lEVEgiLCJXSURUSCIsIkhFSUdIVCIsIkNPTExJREVfTElNSVQiLCJMRVZFTF9VUF9DT1VOVEVSIiwiQkxPQ0tfQ09MT1JTIiwieiIsImoiLCJTSEFQRVMiLCJCb2FyZCIsIltvYmplY3QgT2JqZWN0XSIsIngiLCJ5IiwibGV2ZWwiLCJ0aGlzIiwic2NvcmUiLCJsaW5lQ2xlYXJlZCIsInN0YXJ0TGV2ZWwiLCJ2ZWxvY2l0eSIsImdhbWVPdmVyIiwidGV0cmlzIiwid2lkdGgiLCJoZWlnaHQiLCJjb2xvciIsImJvYXJkIiwicHVzaCIsIkJhc2VCbG9jayIsInNwYXduTmV3QmxvY2siLCJjdHgiLCJpbml0aWFsIiwic3Ryb2tlU3R5bGUiLCJzdHJva2VSZWN0IiwiZmlsbFN0eWxlIiwiZm9udCIsInJpZ2h0WCIsImZpbGxUZXh0IiwiZm9yRWFjaCIsInJvdyIsImIiLCJkcmF3IiwibmV4dEJsb2NrIiwiYWN0aXZlQmxvY2siLCJrZXlQcmVzc2VkIiwia2V5cyIsImNvbGxpZGVDb3VudGVyIiwibmV3QmxvY2siLCJtb3ZlIiwiYmxvY2tzIiwiZXZlcnkiLCJpc1ZhbGlkIiwic29tZSIsImNvbGxpZGUiLCJNYXRoIiwicm91bmQiLCJjbGVhckxpbmUiLCJpbmRleCIsInR5cGUiLCJlbXB0eVJvdyIsInJvd0Fib3ZlIiwicG93IiwiZmxvb3IiLCJibG9jayIsInNoYXBlcyIsInJhbmRvbVNoYXBlIiwicmFuZG9tIiwibGVuZ3RoIiwiQ29tcGxleEJsb2NrIiwic2hhcGUiLCJheGlzIiwic2hhcGVJbmRleCIsInNoYXBlTWF0cml4IiwiY29sIiwiYWN0aW9uIiwiYXNzaWduIiwibWFwIiwiZmlsbFJlY3QiLCJhY3Rpb25LZXlNYXAiLCIzMiIsIjM3IiwiMzgiLCIzOSIsIjQwIiwiNzIiLCI3NCIsIjc1IiwiNzYiLCJjYW52YXMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJnZXRDb250ZXh0Iiwic3RhcnRCdXR0b24iLCJob3N0QnV0dG9uIiwiY29ubmVjdEJ1dHRvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJldnQiLCJ3aGljaCIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwiZ2FtZUxvb3AiLCJkaXNhYmxlZCIsIndpbmRvdyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImhhbmRsZUFjdGlvbiIsImNsZWFyUmVjdCIsIm1haW4iXSwibWFwcGluZ3MiOiJhQUNBLElBQUFBLEtBR0EsU0FBQUMsRUFBQUMsR0FHQSxHQUFBRixFQUFBRSxHQUNBLE9BQUFGLEVBQUFFLEdBQUFDLFFBR0EsSUFBQUMsRUFBQUosRUFBQUUsSUFDQUcsRUFBQUgsRUFDQUksR0FBQSxFQUNBSCxZQVVBLE9BTkFJLEVBQUFMLEdBQUFNLEtBQUFKLEVBQUFELFFBQUFDLElBQUFELFFBQUFGLEdBR0FHLEVBQUFFLEdBQUEsRUFHQUYsRUFBQUQsUUFLQUYsRUFBQVEsRUFBQUYsRUFHQU4sRUFBQVMsRUFBQVYsRUFHQUMsRUFBQVUsRUFBQSxTQUFBUixFQUFBUyxFQUFBQyxHQUNBWixFQUFBYSxFQUFBWCxF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LEtBQUtRLFNDdFU5QyxNQUFNc0QsR0FDRkMsR0FBSSxPQUNKQyxHQUFJLE9BQ0pDLEdBQUksU0FDSkMsR0FBSSxRQUNKQyxHQUFJLE9BQ0pDLEdBQUksT0FDSkMsR0FBSSxPQUNKQyxHQUFJLFNBQ0pDLEdBQUksU0FHRkMsRUFBNkJDLFNBQVNDLGNBQWMsU0FDcEQ1RCxFQUFNMEQsRUFBT0csV0FBVyxNQUM5QixJQUFJakUsRUFBUSxJQUFJZixFQUFNLEdBQUksSUFDMUJlLEVBQU1lLEtBQUtYLEdBQUssR0FFaEIsTUFBTThELEVBQWtDSCxTQUFTQyxjQUFjLFVBQ3pERyxFQUFpQ0osU0FBU0MsY0FBYyxTQUN4REksRUFBb0NMLFNBQVNDLGNBQWMsWUFFakVFLEVBQWFHLGlCQUFpQixRQUFTLE1BT3ZDLFdBQ0ksTUFBTW5ELEtBRU5sQixFQUFRLElBQUlmLEVBQU0sR0FBSSxJQUd0QjhFLFNBQVNNLGlCQUFpQixVQUFXQyxJQUNqQyxJQUFJdEIsRUFBU0ksRUFBYWtCLEVBQUlDLE9BQ2YsS0FBWHZCLElBQ0FzQixFQUFJRSxpQkFDSkYsRUFBSUcsbUJBRVJ2RCxFQUFXOEIsSUFBVSxJQUt6QixTQUFTMEIsSUFDQTFFLEVBQU1MLFVBS1B1RSxFQUFZUyxVQUFXLEVBQ3ZCUixFQUFXUSxVQUFXLEVBQ3RCUCxFQUFjTyxVQUFXLElBTnpCQyxPQUFPQyxzQkFBc0JILEdBQzdCMUUsRUFBTThFLGFBQWE1RCxHQVUvQixTQUFlNEMsRUFBYTFELEVBQVVKLEdBRWxDSSxFQUFJMkUsVUFBVSxFQUFHLEVBQUdqQixFQUFPakUsTUFBT2lFLEVBQU9oRSxRQUV6Q0UsRUFBTWUsS0FBS1gsR0FiSFcsQ0FBSytDLEVBQVExRCxFQUFLSixJQU4xQjBFLEdBckJBTSxHQUNBZCxFQUFhUyxVQUFXLEVBQ3hCUixFQUFZUSxVQUFXLEVBQ3ZCUCxFQUFlTyxVQUFXIiwiZmlsZSI6Ii4vYXBwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsImNvbnN0IEJBU0VfQkxPQ0tfV0lEVEggPSAzMDtcbmNvbnN0IFdJRFRIID0gMTA7XG5jb25zdCBIRUlHSFQgPSAyMDtcbmNvbnN0IENPTExJREVfTElNSVQgPSAzMDtcbmNvbnN0IExFVkVMX1VQX0NPVU5URVIgPSAzMDtcblxuaW50ZXJmYWNlIEF4aXMge1xuICAgIHg6IG51bWJlcjtcbiAgICB5OiBudW1iZXI7XG4gICAgdmVsb2NpdHk6IG51bWJlcjtcbn1cblxuY29uc3QgQkxPQ0tfQ09MT1JTOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge1xuICAgIFwib1wiOiBcIiNGQkMwMkRcIixcbiAgICBcImlcIjogXCIjMDA5N0E3XCIsXG4gICAgXCJzXCI6IFwiIzRDQUY1MFwiLFxuICAgIFwielwiOiBcIiNGNDQzMzZcIixcbiAgICBcImxcIjogXCIjRkY5ODAwXCIsXG4gICAgXCJqXCI6IFwiIzIxOTZGM1wiLFxuICAgIFwidFwiOiBcIiM5QzI3QjBcIlxufTtcbmNvbnN0IFNIQVBFUzogeyBba2V5OiBzdHJpbmddOiBudW1iZXJbXVtdW10gfSA9IHtcbiAgICBcIm9cIjogW1xuICAgICAgICBbWzEsIDFdLCBbMSwgMV1dXG4gICAgXSxcbiAgICBcImlcIjogW1xuICAgICAgICBbWzEsIDEsIDEsIDFdXSxcbiAgICAgICAgW1sxXSwgWzFdLCBbMV0sIFsxXV1cbiAgICBdLFxuICAgIFwic1wiOiBbXG4gICAgICAgIFtbMCwgMV0sIFsxLCAxXSwgWzFdXSxcbiAgICAgICAgW1sxLCAxXSwgWzAsIDEsIDFdXVxuICAgIF0sXG4gICAgXCJ6XCI6IFtcbiAgICAgICAgW1sxXSwgWzEsIDFdLCBbMCwgMV1dLFxuICAgICAgICBbWzAsIDEsIDFdLCBbMSwgMV1dXG4gICAgXSxcbiAgICBcImxcIjogW1xuICAgICAgICBbWzEsIDEsIDFdLCBbMCwgMCwgMV1dLFxuICAgICAgICBbWzEsIDFdLCBbMV0sIFsxXV0sXG4gICAgICAgIFtbMV0sIFsxLCAxLCAxXV0sXG4gICAgICAgIFtbMCwgMV0sIFswLCAxXSwgWzEsIDFdXVxuICAgIF0sXG4gICAgXCJqXCI6IFtcbiAgICAgICAgW1swLCAwLCAxXSwgWzEsIDEsIDFdXSxcbiAgICAgICAgW1sxLCAxXSwgWzAsIDFdLCBbMCwgMV1dLFxuICAgICAgICBbWzEsIDEsIDFdLCBbMV1dLFxuICAgICAgICBbWzFdLCBbMV0sIFsxLCAxXV1cbiAgICBdLFxuICAgIFwidFwiOiBbXG4gICAgICAgIFtbMSwgMF0sIFsxLCAxXSwgWzFdXSxcbiAgICAgICAgW1swLCAxXSwgWzEsIDEsIDFdXSxcbiAgICAgICAgW1swLCAxXSwgWzEsIDFdLCBbMCwgMV1dLFxuICAgICAgICBbWzEsIDEsIDFdLCBbMCwgMV1dXG4gICAgXVxufTtcblxuY2xhc3MgQm9hcmQgaW1wbGVtZW50cyBBeGlzIHtcbiAgICBwcml2YXRlIHNjb3JlOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBsaW5lQ2xlYXJlZDogbnVtYmVyO1xuICAgIHByaXZhdGUgc3RhcnRMZXZlbDogbnVtYmVyO1xuICAgIHByaXZhdGUgbGV2ZWw6IG51bWJlcjtcbiAgICBwdWJsaWMgdmVsb2NpdHk6IG51bWJlcjtcbiAgICBwdWJsaWMgZ2FtZU92ZXI6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSB0ZXRyaXM6IGJvb2xlYW47XG4gICAgcHVibGljIHg6IG51bWJlcjtcbiAgICBwdWJsaWMgeTogbnVtYmVyO1xuICAgIHByaXZhdGUgd2lkdGg6IG51bWJlcjtcbiAgICBwcml2YXRlIGhlaWdodDogbnVtYmVyO1xuICAgIHByaXZhdGUgY29sb3I6IHN0cmluZztcbiAgICBwcml2YXRlIGJvYXJkOiBCYXNlQmxvY2tbXVtdO1xuICAgIHByaXZhdGUgbmV4dEJsb2NrOiBDb21wbGV4QmxvY2s7XG4gICAgcHJpdmF0ZSBhY3RpdmVCbG9jazogQ29tcGxleEJsb2NrO1xuXG4gICAgY29uc3RydWN0b3IgKHg6IG51bWJlciwgeTogbnVtYmVyLCBsZXZlbDogbnVtYmVyID0gMSkge1xuICAgICAgICB0aGlzLnNjb3JlID0gMDtcbiAgICAgICAgdGhpcy5saW5lQ2xlYXJlZCA9IDA7XG4gICAgICAgIHRoaXMuc3RhcnRMZXZlbCA9IGxldmVsO1xuICAgICAgICB0aGlzLmxldmVsID0gbGV2ZWw7XG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSAwLjA1ICogdGhpcy5sZXZlbDtcbiAgICAgICAgdGhpcy5nYW1lT3ZlciA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRldHJpcyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLndpZHRoID0gQkFTRV9CTE9DS19XSURUSCAqIFdJRFRIO1xuICAgICAgICB0aGlzLmhlaWdodCA9IEJBU0VfQkxPQ0tfV0lEVEggKiBIRUlHSFQ7XG4gICAgICAgIHRoaXMuY29sb3IgPSBcIiMzMzNcIjtcbiAgICAgICAgdGhpcy5ib2FyZCA9IFtdO1xuICAgICAgICAvLyBpbml0aWFsaXplIHN0YXJ0aW5nIGJvYXJkIHBvc2l0aW9uIGJhc2VkIG9uIHRoZSB3aWR0aCBhbmQgaGVpZ2h0XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgSEVJR0hUOyBpICsrKSB7XG4gICAgICAgICAgICB0aGlzLmJvYXJkLnB1c2goW10pO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBXSURUSDsgaiArKykge1xuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbaV0ucHVzaChuZXcgQmFzZUJsb2NrKHRoaXMsIGosIGksIFwiZW1wdHlcIikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3Bhd25OZXdCbG9jaygpO1xuICAgIH1cblxuICAgIGRyYXcgKGN0eDogYW55LCBpbml0aWFsID0gZmFsc2UpIHtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgY3R4LnN0cm9rZVJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiIzMzM1wiO1xuICAgICAgICBjdHguZm9udCA9IFwiMjRweCBtb25vc3BhY2VcIjtcbiAgICAgICAgbGV0IHJpZ2h0WCA9IHRoaXMueCAqIDIgKyB0aGlzLndpZHRoO1xuICAgICAgICBjdHguZmlsbFRleHQoXCJMZXZlbDogXCIsIHJpZ2h0WCwgdGhpcy55ICogMik7XG4gICAgICAgIGN0eC5maWxsVGV4dCh0aGlzLmxldmVsLCByaWdodFgsIHRoaXMueSAqIDMpO1xuICAgICAgICBjdHguZmlsbFRleHQoXCJTY29yZTogXCIsIHJpZ2h0WCwgdGhpcy55ICogNSk7XG4gICAgICAgIGN0eC5maWxsVGV4dCh0aGlzLnNjb3JlLCByaWdodFgsIHRoaXMueSAqIDcpO1xuICAgICAgICBjdHguZmlsbFRleHQoXCJMaW5lczpcIiwgcmlnaHRYLCB0aGlzLnkgKiA5KTtcbiAgICAgICAgY3R4LmZpbGxUZXh0KHRoaXMubGluZUNsZWFyZWQsIHJpZ2h0WCwgdGhpcy55ICogMTEpO1xuICAgICAgICBjdHguZmlsbFRleHQoXCJOZXh0OiBcIiwgcmlnaHRYLCB0aGlzLnkgKiAxMyk7XG5cbiAgICAgICAgdGhpcy5ib2FyZC5mb3JFYWNoKHJvdyA9PiB7XG4gICAgICAgICAgICByb3cuZm9yRWFjaChiID0+IHtcbiAgICAgICAgICAgICAgICBiLmRyYXcoY3R4KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFpbml0aWFsKSB7XG4gICAgICAgICAgICB0aGlzLm5leHRCbG9jay5kcmF3KGN0eCk7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUJsb2NrLmRyYXcoY3R4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUFjdGlvbiAoa2V5UHJlc3NlZDogeyBba2V5OiBzdHJpbmddOiBib29sZWFuIH0pIHtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZU92ZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyB2YWxpZGF0ZSBpbnB1dCAoYm91bmRhcnkpXG4gICAgICAgIE9iamVjdC5rZXlzKGtleVByZXNzZWQpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgIGlmIChrZXlQcmVzc2VkW2tleV0pIHtcbiAgICAgICAgICAgICAgICBpZiAoISh0aGlzLmFjdGl2ZUJsb2NrLmNvbGxpZGVDb3VudGVyID4gMCAmJiBrZXkgPT09IFwiZG93blwiKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3QmxvY2sgPSB0aGlzLmFjdGl2ZUJsb2NrLm1vdmUoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ld0Jsb2NrLmJsb2Nrcy5ldmVyeShiID0+IHRoaXMuaXNWYWxpZChiKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlQmxvY2sgPSBuZXdCbG9jaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcImRvd25cIikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUJsb2NrLmNvbGxpZGVDb3VudGVyID0gQ09MTElERV9MSU1JVDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAga2V5UHJlc3NlZFtrZXldID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBjaGVjayBpZiB0aGUgY3VycmVudCBhY3RpdmUgYmxvY2sgaXMgY29sbGlkaW5nIGlmIHNvLCBzcGF3biBhIG5ldyBibG9ja1xuICAgICAgICBpZiAodGhpcy5hY3RpdmVCbG9jay5ibG9ja3Muc29tZShiID0+IHRoaXMuY29sbGlkZShiKSkpIHtcbiAgICAgICAgICAgIC8vIGNvbGxpZGVcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlQmxvY2suY29sbGlkZUNvdW50ZXIgKys7XG4gICAgICAgICAgICBpZiAodGhpcy5hY3RpdmVCbG9jay5jb2xsaWRlQ291bnRlciA+PSBDT0xMSURFX0xJTUlUKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVCbG9jay5ibG9ja3MuZm9yRWFjaChiID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHkgPSBNYXRoLnJvdW5kKGIueSk7XG4gICAgICAgICAgICAgICAgICAgIGIueSA9IHk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbYi55XVtiLnhdID0gYjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLnNwYXduTmV3QmxvY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBuZXdCbG9jayA9IHRoaXMuYWN0aXZlQmxvY2subW92ZSgpO1xuICAgICAgICAgICAgaWYgKG5ld0Jsb2NrLmJsb2Nrcy5ldmVyeShiID0+IHRoaXMuaXNWYWxpZChiKSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUJsb2NrID0gbmV3QmxvY2s7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jbGVhckxpbmUoKTtcbiAgICB9XG5cbiAgICBjbGVhckxpbmUgKCkge1xuICAgICAgICBsZXQgbGluZUNsZWFyZWQgPSAwO1xuICAgICAgICB0aGlzLmJvYXJkLmZvckVhY2goKHJvdywgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChyb3cuZXZlcnkoYiA9PiBiLnR5cGUgIT09IFwiZW1wdHlcIikpIHtcbiAgICAgICAgICAgICAgICBsaW5lQ2xlYXJlZCArKztcbiAgICAgICAgICAgICAgICBsZXQgZW1wdHlSb3cgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IFdJRFRIOyBqICsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGVtcHR5Um93LnB1c2gobmV3IEJhc2VCbG9jayh0aGlzLCBqLCAwLCBcImVtcHR5XCIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IGluZGV4OyBpID4gMDsgaSAtLSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcm93QWJvdmUgPSB0aGlzLmJvYXJkW2kgLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgcm93QWJvdmUuZm9yRWFjaChiID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGIueSA9IGIueSArIDE7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJvYXJkW2ldID0gcm93QWJvdmU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbMF0gPSBlbXB0eVJvdztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChsaW5lQ2xlYXJlZCA+IDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRldHJpcyAmJiBsaW5lQ2xlYXJlZCA9PT0gNCkge1xuICAgICAgICAgICAgICAgIC8vIGJhY2sgdG8gYmFjayB0ZXRyaXMhXG4gICAgICAgICAgICAgICAgdGhpcy5zY29yZSArPSA0MDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnRldHJpcyA9IGxpbmVDbGVhcmVkID09PSA0O1xuICAgICAgICAgICAgdGhpcy5zY29yZSArPSAxMDAgKiBNYXRoLnBvdygyLCBsaW5lQ2xlYXJlZCAtIDEpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGluZUNsZWFyZWQgKz0gbGluZUNsZWFyZWQ7XG4gICAgICAgIHRoaXMubGV2ZWwgPSB0aGlzLnN0YXJ0TGV2ZWwgKyBNYXRoLmZsb29yKHRoaXMubGluZUNsZWFyZWQgLyBMRVZFTF9VUF9DT1VOVEVSKTtcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IDAuMDUgKiB0aGlzLmxldmVsO1xuICAgIH1cblxuICAgIGlzVmFsaWQgKGJsb2NrOiBCYXNlQmxvY2spIHtcbiAgICAgICAgbGV0IHkgPSBNYXRoLnJvdW5kKGJsb2NrLnkpO1xuICAgICAgICBsZXQgeCA9IGJsb2NrLng7XG5cbiAgICAgICAgcmV0dXJuIHggPj0gMCAmJlxuICAgICAgICAgICAgeCA8PSBXSURUSCAtIDEgJiZcbiAgICAgICAgICAgIHkgPCBIRUlHSFQgJiZcbiAgICAgICAgICAgIHkgPj0gMCAmJlxuICAgICAgICAgICAgdGhpcy5ib2FyZFt5XVt4XS50eXBlID09PSBcImVtcHR5XCI7XG4gICAgfVxuXG4gICAgY29sbGlkZSAoYmxvY2s6IEJhc2VCbG9jayk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgeSA9IE1hdGguZmxvb3IoYmxvY2sueSk7XG4gICAgICAgIGxldCB4ID0gYmxvY2sueDtcbiAgICAgICAgcmV0dXJuIHkgPj0gKEhFSUdIVCAtIDEpIHx8XG4gICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZFt5ICsgMV1beF0gJiZcbiAgICAgICAgICAgICAgICB0aGlzLmJvYXJkW3kgKyAxXVt4XS50eXBlICE9PSBcImVtcHR5XCJcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgc3Bhd25OZXdCbG9jayAoKSB7XG4gICAgICAgIGxldCBzaGFwZXMgPSBPYmplY3Qua2V5cyhTSEFQRVMpO1xuICAgICAgICBsZXQgcmFuZG9tU2hhcGUgPSBzaGFwZXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogc2hhcGVzLmxlbmd0aCldO1xuXG4gICAgICAgIGlmICghdGhpcy5hY3RpdmVCbG9jaykge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVCbG9jayA9IG5ldyBDb21wbGV4QmxvY2sodGhpcywgcmFuZG9tU2hhcGUpO1xuICAgICAgICAgICAgcmFuZG9tU2hhcGUgPSBzaGFwZXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogc2hhcGVzLmxlbmd0aCldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVCbG9jayA9IG5ldyBDb21wbGV4QmxvY2sodGhpcywgdGhpcy5uZXh0QmxvY2suc2hhcGUpO1xuICAgICAgICB9XG4gICAgICAgIGxldCB4ID0gdGhpcy54ICogMiArIHRoaXMud2lkdGg7XG4gICAgICAgIGxldCB5ID0gdGhpcy55ICogMTQ7XG4gICAgICAgIGNvbnN0IGF4aXMgPSB7eCwgeSwgdmVsb2NpdHk6IDB9O1xuICAgICAgICB0aGlzLm5leHRCbG9jayA9IG5ldyBDb21wbGV4QmxvY2soYXhpcywgcmFuZG9tU2hhcGUsIDAsIDEsIDApO1xuXG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZUJsb2NrLmJsb2Nrcy5zb21lKGIgPT4gdGhpcy5jb2xsaWRlKGIpKSkge1xuICAgICAgICAgICAgdGhpcy5nYW1lT3ZlciA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNsYXNzIENvbXBsZXhCbG9jayB7XG4gICAgcHJpdmF0ZSBib2FyZDogQXhpcztcbiAgICBwcml2YXRlIHNoYXBlSW5kZXg6IG51bWJlcjtcbiAgICBwcml2YXRlIHg6IG51bWJlcjtcbiAgICBwcml2YXRlIHk6IG51bWJlcjtcbiAgICBwdWJsaWMgc2hhcGU6IHN0cmluZztcbiAgICBwdWJsaWMgYmxvY2tzOiBCYXNlQmxvY2tbXTtcbiAgICBwdWJsaWMgY29sbGlkZUNvdW50ZXI6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKGJvYXJkOiBBeGlzLCBzaGFwZTogc3RyaW5nLCBzaGFwZUluZGV4ID0gMCwgeCA9IDQsIHkgPSAwKSB7XG4gICAgICAgIHRoaXMuYm9hcmQgPSBib2FyZDtcbiAgICAgICAgdGhpcy5zaGFwZSA9IHNoYXBlO1xuICAgICAgICB0aGlzLmJsb2NrcyA9IFtdO1xuICAgICAgICB0aGlzLnNoYXBlSW5kZXggPSBzaGFwZUluZGV4O1xuICAgICAgICB0aGlzLmNvbGxpZGVDb3VudGVyID0gMDtcbiAgICAgICAgbGV0IHNoYXBlTWF0cml4ID0gU0hBUEVTW3RoaXMuc2hhcGVdW3NoYXBlSW5kZXhdO1xuICAgICAgICBzaGFwZU1hdHJpeC5mb3JFYWNoKChyb3csIGkpID0+IHtcbiAgICAgICAgICAgIHJvdy5mb3JFYWNoKChjb2wsIGopID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoc2hhcGVNYXRyaXhbaV1bal0gPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ibG9ja3MucHVzaChuZXcgQmFzZUJsb2NrKGJvYXJkLCB4ICsgaSwgeSArIGosIHRoaXMuc2hhcGUpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbW92ZSAoYWN0aW9uOiBzdHJpbmcgPSBcIlwiKTogQ29tcGxleEJsb2NrIHtcbiAgICAgICAgaWYgKGFjdGlvbiA9PT0gXCJyb3RhdGVcIikge1xuICAgICAgICAgICAgbGV0IHggPSB0aGlzLmJsb2Nrc1swXS54O1xuICAgICAgICAgICAgbGV0IHkgPSB0aGlzLmJsb2Nrc1swXS55O1xuICAgICAgICAgICAgbGV0IHNoYXBlSW5kZXggPSAodGhpcy5zaGFwZUluZGV4ID09PSBTSEFQRVNbdGhpcy5zaGFwZV0ubGVuZ3RoIC0gMSkgP1xuICAgICAgICAgICAgICAgIDAgOiB0aGlzLnNoYXBlSW5kZXggKyAxO1xuICAgICAgICAgICAgbGV0IG5ld0Jsb2NrID0gbmV3IENvbXBsZXhCbG9jayh0aGlzLmJvYXJkLCB0aGlzLnNoYXBlLCBzaGFwZUluZGV4LCB4LCB5KTtcbiAgICAgICAgICAgIHJldHVybiBuZXdCbG9jaztcbiAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24gPT09IFwiZHJvcFwiKSB7XG4gICAgICAgICAgICBsZXQgbmV3QmxvY2sgPSB0aGlzLm1vdmUoKTtcbiAgICAgICAgICAgIG5ld0Jsb2NrLmNvbGxpZGVDb3VudGVyID0gQ09MTElERV9MSU1JVDtcbiAgICAgICAgICAgIHJldHVybiBuZXdCbG9jaztcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBuZXdCbG9jazogQ29tcGxleEJsb2NrID0gT2JqZWN0LmFzc2lnbihPYmplY3QuY3JlYXRlKHRoaXMpLCB0aGlzKTtcbiAgICAgICAgbmV3QmxvY2suYmxvY2tzID0gbmV3QmxvY2suYmxvY2tzLm1hcChiID0+IGIubW92ZShhY3Rpb24pKTtcbiAgICAgICAgcmV0dXJuIG5ld0Jsb2NrO1xuICAgIH1cblxuICAgIGRyYXcgKGN0eDogYW55KSB7XG4gICAgICAgIHRoaXMuYmxvY2tzLmZvckVhY2goYiA9PiBiLmRyYXcoY3R4KSk7XG4gICAgfVxufVxuXG5jbGFzcyBCYXNlQmxvY2sge1xuICAgIHB1YmxpYyB4OiBudW1iZXI7XG4gICAgcHVibGljIHk6IG51bWJlcjtcbiAgICBwdWJsaWMgdHlwZTogc3RyaW5nO1xuICAgIHByaXZhdGUgYm9hcmQ6IEF4aXM7XG4gICAgcHJpdmF0ZSB3aWR0aDogbnVtYmVyO1xuICAgIHByaXZhdGUgaGVpZ2h0OiBudW1iZXI7XG4gICAgcHJpdmF0ZSBjb2xvcjogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IoYm9hcmQ6IEF4aXMsIHg6IG51bWJlciA9IDQsIHk6IG51bWJlciA9IDAsIHR5cGU6IHN0cmluZyA9IFwiYmxvY2tcIikge1xuICAgICAgICB0aGlzLmJvYXJkID0gYm9hcmQ7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMud2lkdGggPSBCQVNFX0JMT0NLX1dJRFRIO1xuICAgICAgICB0aGlzLmhlaWdodCA9IEJBU0VfQkxPQ0tfV0lEVEg7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMuY29sb3IgPSB0aGlzLnR5cGUgPT09IFwiZW1wdHlcIiA/IFwiI2NjY1wiIDogQkxPQ0tfQ09MT1JTW3R5cGVdO1xuICAgIH1cblxuICAgIG1vdmUgKGFjdGlvbjogc3RyaW5nKSB7XG4gICAgICAgIGxldCBuZXdCbG9jayA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmNyZWF0ZSh0aGlzKSwgdGhpcyk7XG4gICAgICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIFwibGVmdFwiOlxuICAgICAgICAgICAgICAgIG5ld0Jsb2NrLngtLTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgICAgICAgICAgIG5ld0Jsb2NrLngrKztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJkb3duXCI6XG4gICAgICAgICAgICAgICAgbmV3QmxvY2sueSArPSB0aGlzLmJvYXJkLnZlbG9jaXR5ICsgMC4yO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBuZXdCbG9jay55ICs9IHRoaXMuYm9hcmQudmVsb2NpdHk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld0Jsb2NrO1xuICAgIH1cblxuICAgIGRyYXcgKGN0eDogYW55KSB7XG4gICAgICAgIGxldCB4ID0gdGhpcy5ib2FyZC54ICsgdGhpcy54ICogQkFTRV9CTE9DS19XSURUSDtcbiAgICAgICAgbGV0IHkgPSB0aGlzLmJvYXJkLnkgKyB0aGlzLnkgKiBCQVNFX0JMT0NLX1dJRFRIO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgY3R4LmZpbGxSZWN0KHgsIHksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjZWVlXCI7XG4gICAgICAgIGN0eC5zdHJva2VSZWN0KHgsIHksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICB9XG59XG5cbmV4cG9ydCB7XG4gICAgQm9hcmQsXG4gICAgQmFzZUJsb2NrXG59XG4iLCJpbXBvcnQge0JvYXJkLCBCYXNlQmxvY2t9IGZyb20gXCIuL2JvYXJkXCI7XG5cbmNvbnN0IGFjdGlvbktleU1hcDogeyBba2V5OiBudW1iZXJdOiBzdHJpbmc7IH0gPSB7XG4gICAgMzI6IFwiZHJvcFwiLFxuICAgIDM3OiBcImxlZnRcIixcbiAgICAzODogXCJyb3RhdGVcIixcbiAgICAzOTogXCJyaWdodFwiLFxuICAgIDQwOiBcImRvd25cIixcbiAgICA3MjogXCJsZWZ0XCIsXG4gICAgNzQ6IFwiZG93blwiLFxuICAgIDc1OiBcInJvdGF0ZVwiLFxuICAgIDc2OiBcInJpZ2h0XCIsXG59O1xuXG5jb25zdCBjYW52YXMgPSA8SFRNTENhbnZhc0VsZW1lbnQ+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFpblwiKTtcbmNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5sZXQgYm9hcmQgPSBuZXcgQm9hcmQoMjAsIDIwKTtcbmJvYXJkLmRyYXcoY3R4LCB0cnVlKTtcblxuY29uc3Qgc3RhcnRCdXR0b24gPSA8SFRNTEJ1dHRvbkVsZW1lbnQ+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3RhcnRcIik7XG5jb25zdCBob3N0QnV0dG9uID0gPEhUTUxCdXR0b25FbGVtZW50PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hvc3RcIik7XG5jb25zdCBjb25uZWN0QnV0dG9uID0gPEhUTUxCdXR0b25FbGVtZW50PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Nvbm5lY3RcIik7XG5cbnN0YXJ0QnV0dG9uIS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIG1haW4oKTtcbiAgICBzdGFydEJ1dHRvbiEuZGlzYWJsZWQgPSB0cnVlO1xuICAgIGhvc3RCdXR0b24hLmRpc2FibGVkID0gdHJ1ZTtcbiAgICBjb25uZWN0QnV0dG9uIS5kaXNhYmxlZCA9IHRydWU7XG59KTtcblxuZnVuY3Rpb24gbWFpbiAoKSB7XG4gICAgY29uc3Qga2V5UHJlc3NlZDogeyBba2V5OiBzdHJpbmddOiBib29sZWFuIH0gPSB7fTtcblxuICAgIGJvYXJkID0gbmV3IEJvYXJkKDIwLCAyMCk7XG5cbiAgICAvLyBoYW5kbGUgYW5kIHRyYW5zbGF0ZSBrZXlib2FyZCBpbnRvIGFjdGlvblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGV2dCA9PiB7XG4gICAgICAgIGxldCBhY3Rpb24gPSBhY3Rpb25LZXlNYXBbZXZ0LndoaWNoXTtcbiAgICAgICAgaWYgKGFjdGlvbiAhPT0gXCJcIikge1xuICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAga2V5UHJlc3NlZFthY3Rpb25dID0gdHJ1ZTtcbiAgICB9KTtcblxuICAgIGdhbWVMb29wKCk7XG5cbiAgICBmdW5jdGlvbiBnYW1lTG9vcCAoKSB7XG4gICAgICAgIGlmICghYm9hcmQuZ2FtZU92ZXIpIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZ2FtZUxvb3ApO1xuICAgICAgICAgICAgYm9hcmQuaGFuZGxlQWN0aW9uKGtleVByZXNzZWQpO1xuICAgICAgICAgICAgZHJhdyhjYW52YXMsIGN0eCwgYm9hcmQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RhcnRCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGhvc3RCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbm5lY3RCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhdyAoY2FudmFzOiBhbnksIGN0eDogYW55LCBib2FyZDogQm9hcmQpIHtcbiAgICAvLyByZWRyYXcgZW50aXJlIGNhbnZhcyB0byBiZSBibGFuayBiZWZvcmUgbmV4dCByZW5kZXJcbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cbiAgICBib2FyZC5kcmF3KGN0eCk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9