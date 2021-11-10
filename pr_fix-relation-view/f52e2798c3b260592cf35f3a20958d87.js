ace.define("ace/mode/latex_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],(function(require,exports,module){"use strict";var oop=require("../lib/oop"),TextHighlightRules=require("./text_highlight_rules").TextHighlightRules,LatexHighlightRules=function(){this.$rules={start:[{token:"comment",regex:"%.*$"},{token:["keyword","lparen","variable.parameter","rparen","lparen","storage.type","rparen"],regex:"(\\\\(?:documentclass|usepackage|input))(?:(\\[)([^\\]]*)(\\]))?({)([^}]*)(})"},{token:["keyword","lparen","variable.parameter","rparen"],regex:"(\\\\(?:label|v?ref|cite(?:[^{]*)))(?:({)([^}]*)(}))?"},{token:["storage.type","lparen","variable.parameter","rparen"],regex:"(\\\\begin)({)(verbatim)(})",next:"verbatim"},{token:["storage.type","lparen","variable.parameter","rparen"],regex:"(\\\\begin)({)(lstlisting)(})",next:"lstlisting"},{token:["storage.type","lparen","variable.parameter","rparen"],regex:"(\\\\(?:begin|end))({)([\\w*]*)(})"},{token:"storage.type",regex:/\\verb\b\*?/,next:[{token:["keyword.operator","string","keyword.operator"],regex:"(.)(.*?)(\\1|$)|",next:"start"}]},{token:"storage.type",regex:"\\\\[a-zA-Z]+"},{token:"lparen",regex:"[[({]"},{token:"rparen",regex:"[\\])}]"},{token:"constant.character.escape",regex:"\\\\[^a-zA-Z]?"},{token:"string",regex:"\\${1,2}",next:"equation"}],equation:[{token:"comment",regex:"%.*$"},{token:"string",regex:"\\${1,2}",next:"start"},{token:"constant.character.escape",regex:"\\\\(?:[^a-zA-Z]|[a-zA-Z]+)"},{token:"error",regex:"^\\s*$",next:"start"},{defaultToken:"string"}],verbatim:[{token:["storage.type","lparen","variable.parameter","rparen"],regex:"(\\\\end)({)(verbatim)(})",next:"start"},{defaultToken:"text"}],lstlisting:[{token:["storage.type","lparen","variable.parameter","rparen"],regex:"(\\\\end)({)(lstlisting)(})",next:"start"},{defaultToken:"text"}]},this.normalizeRules()};oop.inherits(LatexHighlightRules,TextHighlightRules),exports.LatexHighlightRules=LatexHighlightRules})),ace.define("ace/mode/folding/latex",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode","ace/range","ace/token_iterator"],(function(require,exports,module){"use strict";var oop=require("../../lib/oop"),BaseFoldMode=require("./fold_mode").FoldMode,Range=require("../../range").Range,TokenIterator=require("../../token_iterator").TokenIterator,keywordLevels={"\\subparagraph":1,"\\paragraph":2,"\\subsubsubsection":3,"\\subsubsection":4,"\\subsection":5,"\\section":6,"\\chapter":7,"\\part":8,"\\begin":9,"\\end":10},FoldMode=exports.FoldMode=function(){};oop.inherits(FoldMode,BaseFoldMode),function(){this.foldingStartMarker=/^\s*\\(begin)|\s*\\(part|chapter|(?:sub)*(?:section|paragraph))\b|{\s*$/,this.foldingStopMarker=/^\s*\\(end)\b|^\s*}/,this.getFoldWidgetRange=function(session,foldStyle,row){var match,line=session.doc.getLine(row);return(match=this.foldingStartMarker.exec(line))?match[1]?this.latexBlock(session,row,match[0].length-1):match[2]?this.latexSection(session,row,match[0].length-1):this.openingBracketBlock(session,"{",row,match.index):(match=this.foldingStopMarker.exec(line))?match[1]?this.latexBlock(session,row,match[0].length-1):this.closingBracketBlock(session,"}",row,match.index+match[0].length):void 0},this.latexBlock=function(session,row,column,returnRange){var keywords={"\\begin":1,"\\end":-1},stream=new TokenIterator(session,row,column),token=stream.getCurrentToken();if(token&&("storage.type"==token.type||"constant.character.escape"==token.type)){var dir=keywords[token.value],getType=function(){var type="lparen"==stream.stepForward().type?stream.stepForward().value:"";return-1===dir&&(stream.stepBackward(),type&&stream.stepBackward()),type},stack=[getType()],startColumn=-1===dir?stream.getCurrentTokenColumn():session.getLine(row).length,startRow=row;for(stream.step=-1===dir?stream.stepBackward:stream.stepForward;token=stream.step();)if(token&&("storage.type"==token.type||"constant.character.escape"==token.type)){var level=keywords[token.value];if(level){var type=getType();if(level===dir)stack.unshift(type);else if(stack.shift()!==type||!stack.length)break}}if(!stack.length){if(1==dir&&(stream.stepBackward(),stream.stepBackward()),returnRange)return stream.getCurrentTokenRange();row=stream.getCurrentTokenRow();return-1===dir?new Range(row,session.getLine(row).length,startRow,startColumn):new Range(startRow,startColumn,row,stream.getCurrentTokenColumn())}}},this.latexSection=function(session,row,column){var stream=new TokenIterator(session,row,column),token=stream.getCurrentToken();if(token&&"storage.type"==token.type){for(var startLevel=keywordLevels[token.value]||0,stackDepth=0,endRow=row;token=stream.stepForward();)if("storage.type"===token.type){var level=keywordLevels[token.value]||0;if(level>=9){if(stackDepth||(endRow=stream.getCurrentTokenRow()-1),(stackDepth+=9==level?1:-1)<0)break}else if(level>=startLevel)break}for(stackDepth||(endRow=stream.getCurrentTokenRow()-1);endRow>row&&!/\S/.test(session.getLine(endRow));)endRow--;return new Range(row,session.getLine(row).length,endRow,session.getLine(endRow).length)}}}.call(FoldMode.prototype)})),ace.define("ace/mode/latex",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/latex_highlight_rules","ace/mode/behaviour/cstyle","ace/mode/folding/latex"],(function(require,exports,module){"use strict";var oop=require("../lib/oop"),TextMode=require("./text").Mode,LatexHighlightRules=require("./latex_highlight_rules").LatexHighlightRules,CstyleBehaviour=require("./behaviour/cstyle").CstyleBehaviour,LatexFoldMode=require("./folding/latex").FoldMode,Mode=function(){this.HighlightRules=LatexHighlightRules,this.foldingRules=new LatexFoldMode,this.$behaviour=new CstyleBehaviour({braces:!0})};oop.inherits(Mode,TextMode),function(){this.type="text",this.lineCommentStart="%",this.$id="ace/mode/latex",this.getMatching=function(session,row,column){null==row&&(row=session.selection.lead),"object"==typeof row&&(column=row.column,row=row.row);var startToken=session.getTokenAt(row,column);if(startToken)return"\\begin"==startToken.value||"\\end"==startToken.value?this.foldingRules.latexBlock(session,row,column,!0):void 0}}.call(Mode.prototype),exports.Mode=Mode})),ace.require(["ace/mode/latex"],(function(m){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=m)}));