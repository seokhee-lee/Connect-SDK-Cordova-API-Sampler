
// source/enyo.Styles.js
enyo.Styles=function(t){function i(t,i){return enyo.platform.ie&&9>enyo.platform.ie&&(i=i.replace(/([\-][a-z]+)/gi,function(t){return t.charAt(1).toUpperCase()+t.substr(2)})),t.getComputedStyleValue(i)}function n(){var n=t.getBounds(),r=parseInt(n.width,10),o=parseInt(n.height,10),d=parseInt(n.left,10),s=parseInt(n.top,10);e.display=i(t,"display"),e.boxSizing=i(t,"box-sizing"),e.l={margin:parseInt(i(t,"margin-left"),10),border:parseInt(i(t,"border-left-width"),10),padding:parseInt(i(t,"padding-left"),10)},e.r={margin:parseInt(i(t,"margin-right"),10),border:parseInt(i(t,"border-right-width"),10),padding:parseInt(i(t,"padding-right"),10)},e.t={margin:parseInt(i(t,"margin-top"),10),border:parseInt(i(t,"border-top-width"),10),padding:parseInt(i(t,"padding-top"),10)},e.b={margin:parseInt(i(t,"margin-bottom"),10),border:parseInt(i(t,"border-bottom-width"),10),padding:parseInt(i(t,"padding-bottom"),10)},e.v={margin:e.t.margin+e.b.margin,border:e.t.border+e.b.border,padding:e.t.padding+e.b.padding},e.h={margin:e.l.margin+e.r.margin,border:e.l.border+e.r.border,padding:e.l.padding+e.r.padding},e.h.offset=e.h.margin+e.h.border+e.h.padding,e.v.offset=e.v.margin+e.v.border+e.v.padding,e.h.outerOffset=e.h.margin,e.v.outerOffset=e.v.margin,e.h.innerOffset=e.h.border+e.h.padding,e.v.innerOffset=e.v.border+e.v.padding,"border-box"==this.boxSizing?(e.content={width:r-e.h.innerOffset,height:o-e.v.innerOffset},e.box={width:r+e.h.outerOffset,height:o+e.v.outerOffset,left:d,top:s}):(e.content={width:r-e.h.innerOffset,height:o-e.v.innerOffset},e.box={width:r+e.h.outerOffset,height:o+e.v.outerOffset,left:d,top:s})}var e=this,r={};this.commit=function(){enyo.mixin(t.domStyles,r),t.domStylesChanged()},this.set=function(t,i){r[t]=i},this.setBoxLeft=function(t,i){r.left=t+i.l.padding+"px"},this.setBoxTop=function(t,i){r.top=t+i.t.padding+"px"},this.setBoxWidth=function(t){r.width="border-box"==this.boxSizing?t-this.h.margin+"px":t-this.h.offset+"px"},this.setBoxHeight=function(t){r.height="border-box"==this.boxSizing?t-this.v.margin+"px":t-this.v.offset+"px"},this.setContentWidth=function(t){r.width="border-box"==this.boxSizing?t+this.h.padding+this.h.border+"px":t+"px"},this.setContentHeight=function(t){r.height="border-box"==this.boxSizing?t+this.v.padding+this.v.border+"px":t+"px"},this.setPosition=function(t){r.position=t},this.control=t,n()},enyo.Styles.setStyles=function(t,i){enyo.mixin(t.domStyles,i),t.domStylesChanged()};

// source/kind.ContentLayout.js
enyo.kind({name:"enyo.ContentLayout",layoutClass:"enyo-content-layout",kind:"Layout",minWidth:0,minHeigh:0,maxWidth:0,maxHeight:0,_width:0,_height:0,_updateBoundValues:function(){this._isFlexChild()?this._isFlexColumn()?(this.minWidth=this.container.minWidth,this.maxWidth=this.container.maxWidth):(this.minHeight=this.container.minHeight,this.maxHeight=this.container.maxHeight):(this.minWidth=this.container.minWidth,this.minHeight=this.container.minHeight,this.maxWidth=this.container.maxWidth,this.maxHeight=this.container.maxHeight)},_isFlexChild:function(){return"enyo.FlexLayout"==this.container.parent.layoutKind},_isFlexColumn:function(){return this.container.parent.layout._isColumn(this.container)},_setSize:function(t,i,n){var e=this._width!=t||this._height!=i;this._width=t,this._height=i,this._isFlexChild()?this._isFlexColumn()?n.setContentWidth(t):n.setContentHeight(i):(n.setContentWidth(t),n.setContentHeight(i)),n.set("overflow","auto"),n.commit(),e&&this._isFlexChild()&&(this.reflow(),this.container.parent.layout.reflow())},_updateSize:function(){this._updateBoundValues();var t=new enyo.Styles(this.container);if(0===this.container.children.length&&0===this.container.content.length)return this._setSize(this.minWidth,this.minHeight,t),void 0;if(t.content.width>=this.maxWidth&&t.content.height>=this.maxHeight)return this._setSize(this.maxWidth,this.maxHeight,t),void 0;var i,n=document.createElement(this.container.node.nodeName),e=this.minHeight;this.container.node.parentNode.appendChild(n),n.innerHTML=this.container.node.innerHTML,n.className=this.container.node.className,n.id=this.container.node.id,n.style.display="inline",i=n.offsetWidth-t.h.padding,this.minWidth>i&&(i=this.minWidth),i>this.maxWidth&&(i=this.maxWidth),n.height="auto",n.style.width=i>0?i+"px":"auto",e=n.offsetHeight-t.v.padding,this.container.node.parentNode.removeChild(n),this.minHeight>e&&(e=this.minHeight),e>this.maxHeight&&(e=this.maxHeight),this._setSize(i,e,t)},flow:enyo.inherit(function(t){return function(){t.apply(this,arguments)}}),reflow:enyo.inherit(function(t){return function(){t.apply(this,arguments),this._updateSize()}})});

// source/kind.FlexLayout.js
enyo.kind({name:"enyo.FlexLayout",kind:"Layout",layoutClass:"enyo-flex-layout",flexSpacing:0,flexBias:null,flexStretch:null,defaultSpacing:0,defaultFlex:10,defaultBias:"row",defaultStretch:!0,_nReflow:0,_nResponseCondition:0,_hasFlexLayout:function(t){return t.layout&&t.layout instanceof enyo.FlexLayout},_getFlex:function(t){var e=this._getFit(t);return e?e:t.flex===void 0||t.flex===!1?0:t.flex===!0?this.defaultFlex:t.flex},_getFit:function(t){return t.fit===void 0||t.fit===!1?0:t.fit===!0?this.defaultFlex:t.fit},_getSpacing:function(){return this.container.flexSpacing===void 0||this.container.flexSpacing===!1?this.defaultSpacing:parseInt(this.container.flexSpacing,10)},_getStretch:function(){return this.container.noStretch!==void 0?!this.container.noStretch:this.container.flexStretch===void 0?this.defaultStretch:!!this.container.flexStretch},_getBias:function(){return void 0!==this.container.flexBias&&this.container.flexBias?this.container.flexBias:this.defaultBias},_isColumn:function(t){return t.flexOrient===void 0||"column"!=t.flexOrient&&"row"!=t.flexOrient?"column"==this.flexBias:"column"==t.flexOrient},_getResponseFlag:function(t){var e=this.container.flexResponseWidth,i=0;return e!==void 0&&e>0&&(i=e>t.content.width?-1:1),this._nResponseCondition>i?(this._nResponseCondition=i,-1):i>this._nResponseCondition?(this._nResponseCondition=i,1):0},_getResponseStrategy:function(t){return t.flexResponse!==void 0&&enyo.FlexLayout.ResponseStrategy[t.flexResponse]!==void 0?enyo.FlexLayout.ResponseStrategy[t.flexResponse]:null},_setResponseValues:function(t){var e,i,n=this._getResponseFlag(t),o=this.container.children.length,s=0;if(0!==n)for(;o>s;s++)e=this.container.children[s],i=this._getResponseStrategy(e),i&&i.respond(e,n>0)},_renderMetrics:function(t,e){for(var i,n=0,o=0,s=0,h=!1,r="column"==this.flexBias;t.length>n;n++)i=t[n],i.isColumn?(r?h&&(h=!1,s=0,o+=t[n-1].width+this.flexSpacing):h||(h=!0,o=0),i.styles.setBoxLeft(o,e),i.styles.setBoxTop(s,e),o+=i.flex>0?i.width+this.flexSpacing:i.styles.box.width+this.flexSpacing):(r?h||(h=!0,s=0):h&&(h=!1,o=0,s+=t[n-1].height+this.flexSpacing),i.styles.setBoxLeft(o,e),i.styles.setBoxTop(s,e),s+=i.flex>0?i.height+this.flexSpacing:i.styles.box.height+this.flexSpacing),i.width&&i.styles.setBoxWidth(i.width),i.height&&i.styles.setBoxHeight(i.height),i.styles.commit()},_collectMetrics:function(t,e){function i(){_||(_=!0,b?(c=e.content.height,g=0,u=0,y++,m++):(p=e.content.width,m=0,y=0,u++,g++))}function n(){if(_){_=!1;var t=a-1;if(b)for(f=Math.round((c-h.flexSpacing*(u-1))/(g?g:1));d[t]&&!d[t].isColumn;)d[t].flex>0&&(d[t].height=f),t--;else for(x=Math.round((p-h.flexSpacing*(y-1))/(m?m:1));d[t]&&d[t].isColumn;)d[t].flex>0&&(d[t].width=x),t--}}for(var o,s,h=this,r=t.length,a=0,l={},d=[],f=0,c=e.content.height,g=0,u=0,x=0,p=e.content.width,m=0,y=0,_=!1,S=!1,b="column"==this.flexBias;r>a;a++)o=t[a],s=new enyo.Styles(o),S=this._isColumn(o),l={control:o,flex:this._getFlex(o),styles:s,width:null,height:null,isColumn:S},S?(b?(n(),this.flexStretch&&(l.height=e.content.height)):i(),y++,l.flex>0?m++:p-=s.box.width):(b?i():(n(),this.flexStretch&&(l.width=e.content.width)),u++,l.flex>0?g++:c-=s.box.height),d.push(l);if(n(),b)for(x=Math.round((p-this.flexSpacing*(y-1))/m),a=0;d.length>a;a++)(!d[a].isColumn&&this.flexStretch||d[a].flex>0)&&(d[a].width=x);else for(f=Math.round((c-this.flexSpacing*(u-1))/g),a=0;d.length>a;a++)(d[a].isColumn&&this.flexStretch||d[a].flex>0)&&(d[a].height=f);return d},_getOrderedChildren:function(){for(var t,e=0,i=enyo.cloneArray(this.container.children),n=i.length;n>e;e++)t=i[e],t.flexOrder!==void 0&&t._flexMoved!=this._nReflow&&(i.splice(e,1),i.splice(t.flexOrder,0,t),t._flexMoved=this._nReflow,e--);return i},_applyContentLayouts:function(){for(var t,e=0;this.container.children.length>e;e++)t=this.container.children[e],"content"==t.flex&&t.setLayoutKind("enyo.ContentLayout")},_initialize:function(){this._nReflow>0||(this._nReflow=1,this._applyContentLayouts())},reflow:enyo.inherit(function(t){return function(){t.apply(this,arguments),this.flexSpacing=this._getSpacing(),this.flexBias=this._getBias(),this.flexStretch=this._getStretch(),this.container.addClass("enyo-flex-layout-relative");var e=new enyo.Styles(this.container);enyo.Styles.setStyles(this.container,{"min-height":e.content.height+"px"}),this.container.removeClass("enyo-flex-layout-relative"),this._initialize(e),this._setResponseValues(e);var i=this._getOrderedChildren(),n=this._collectMetrics(i,e);this._renderMetrics(n,e),this._nReflow++,this.container.bubble("onReflow",{layout:this})}})}),enyo.kind({name:"enyo.HFlexLayout",kind:"enyo.FlexLayout",defaultBias:"column"}),enyo.kind({name:"enyo.VFlexLayout",kind:"enyo.FlexLayout",defaultBias:"row"}),enyo.kind({name:"enyo.FlexBox",kind:enyo.Control,layoutKind:"FlexLayout"});

// source/mixin.LayoutInvalidator.js
enyo.LayoutInvalidator={name:"LayoutInvalidator",handlers:{onInvalidateLayout:"onInvalidateLayout"},onInvalidateLayout:function(){return this.layoutKind?("enyo.ContentLayout"==this.layout.kindName&&this.layout.reflow(),void 0):!1},rendered:enyo.inherit(function(t){return function(){t.apply(this,arguments),this.invalidateLayout()}}),invalidateLayout:function(){this.hasNode()&&this.bubble("onInvalidateLayout",{},this)},contentChanged:enyo.inherit(function(t){return function(){t.apply(this,arguments),this.invalidateLayout()}}),classesChanged:enyo.inherit(function(t){return function(){t.apply(this,arguments),this.invalidateLayout()}})},enyo.Control.extend({mixins:["enyo.LayoutInvalidator"]});

// source/ResponseStrategies/kind.ResponseStrategy.js
enyo.kind({name:"enyo.FlexLayout.ResponseStrategy",setProperty:function(t,e,i){"flexOrient"==e&&enyo.Styles.setStyles(t,{width:"auto",height:"auto"}),t["__"+e]=t[e]===void 0?null:t[e],t[e]=i,t.layout&&t.layout.reflow()},reverseProperty:function(t,e){"flexOrient"==e&&enyo.Styles.setStyles(t,{width:"auto",height:"auto"});var i="__"+e;t[i]!==void 0&&(null!==t[i]?t[e]=t[i]:delete t[e],delete t[i]),t.layout&&t.layout.reflow()},respond:function(){}});

// source/ResponseStrategies/kind.RowAfterColumns.js
enyo.FlexLayout.ResponseStrategy.RowAfterColumns=enyo.singleton({kind:"enyo.FlexLayout.ResponseStrategy",_getPositionAfterColumns:function(t){for(var e=0,i=!1,n=t.parent.children,o=n.length;o>e;e++)if(n[e]!=t){if(i&&"column"!=n[e].flexOrient)return e-1}else i=!0;return-1},respond:enyo.inherit(function(t){return function(e,i){t.apply(this,arguments),i?(this.reverseProperty(e,"flexOrder"),this.reverseProperty(e,"flexOrient")):(this.setProperty(e,"flexOrder",this._getPositionAfterColumns(e)),this.setProperty(e,"flexOrient","row"))}})});