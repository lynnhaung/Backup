YUI.add("moodle-mod_hsuforum-article",function(e,t){function s(){s.superclass.constructor.apply(this,arguments)}function u(){u.superclass.constructor.apply(this,arguments)}function a(){a.superclass.constructor.apply(this,arguments)}var n={DISCUSSION_EDIT:"hsuforum-thread-edit",DISCUSSION_EXPANDED:"hsuforum-thread-article-expanded",POST_EDIT:"hsuforum-post-edit"},r={ADD_DISCUSSION:"#newdiscussionform",ADD_DISCUSSION_TARGET:".hsuforum-add-discussion-target",ALL_FORMS:".hsuforum-reply-wrapper form",CONTAINER:".mod_hsuforum_posts_container",CONTAINER_LINKS:".mod_hsuforum_posts_container a",DISCUSSION:".hsuforum-thread-article",DISCUSSIONS:".hsuforum-threads-wrapper",DISCUSSION_EDIT:"."+n.DISCUSSION_EDIT,DISCUSSION_BY_ID:'.hsuforum-thread-article[data-discussionid="%d"]',DISCUSSION_CLOSE:".hsuforum-thread-nav .close",DISCUSSION_COUNT:".hsuforum-discussion-count",DISCUSSION_NAV_LINKS:".hsuforum-thread-nav a",DISCUSSION_NEXT:".hsuforum-thread-nav .next",DISCUSSION_PREV:".hsuforum-thread-nav .prev",DISCUSSION_TARGET:".hsuforum-new-discussion-target",DISCUSSION_TEMPLATE:"#hsuforum-discussion-template",DISCUSSION_VIEW:".hsuforum-thread-view",EDITABLE_MESSAGE:"[contenteditable]",FORM:".hsuforum-form",FORM_ADVANCED:".hsuforum-use-advanced",FORM_REPLY_WRAPPER:".hsuforum-reply-wrapper",INPUT_FORUM:'input[name="forum"]',INPUT_MESSAGE:'textarea[name="message"]',INPUT_REPLY:'input[name="reply"]',INPUT_SUBJECT:'input[name="subject"]',LINK_CANCEL:".hsuforum-cancel",LOAD_MORE:".hsuforum-threads-load-more",LOAD_TARGET:".hsuforum-threads-load-target",NO_DISCUSSIONS:".forumnodiscuss",NOTIFICATION:".hsuforum-notification",OPTIONS_TO_PROCESS:".hsuforum-options-menu.unprocessed",PLACEHOLDER:".thread-replies-placeholder",POSTS:".hsuforum-thread-replies",POST_BY_ID:'.hsuforum-post-target[data-postid="%d"]',POST_EDIT:"."+n.POST_EDIT,POST_TARGET:".hsuforum-post-target",RATE:".forum-post-rating",RATE_POPUP:".forum-post-rating a",REPLY_TEMPLATE:"#hsuforum-reply-template",SEARCH_PAGE:"#page-mod-hsuforum-search",VALIDATION_ERRORS:".hsuforum-validation-errors",VIEW_POSTS:".hsuforum-view-posts"},i={DISCUSSION_CREATED:"discussion:created",DISCUSSION_DELETED:"discussion:deleted",FORM_CANCELED:"form:canceled",POST_CREATED:"post:created",POST_DELETED:"post:deleted",POST_UPDATED:"post:updated"};M.mod_hsuforum=M.mod_hsuforum||{},s.NAME="moodle-mod_hsuforum-dom",s.ATTRS={io:{value:null}},e.extend(s,e.Base,{initializer:function(){e.all(r.RATE).addClass("processed"),this.initOptionMenus();var t=e.one(r.LOAD_MORE);t!==null&&t.setStyle("display","block")},_forceNavLinks:function(t){var n=e.one(r.DISCUSSION_BY_ID.replace("%d",t)),i=n.previous(r.DISCUSSION),s=n.next(r.DISCUSSION),o=function(e,t){var n=e.getAttribute("href").replace(/d=\d+/,"d="+t.getData("discussionid"));e.setAttribute("href",n).removeClass("hidden").show()};i!==null?(o(i.one(r.DISCUSSION_NEXT),n),o(n.one(r.DISCUSSION_PREV),i)):n.one(r.DISCUSSION_PREV).hide(),s!==null?(o(s.one(r.DISCUSSION_PREV),n),o(n.one(r.DISCUSSION_NEXT),s)):n.one(r.DISCUSSION_NEXT).hide()},initFeatures:function(){this.initOptionMenus(),this.initRatings()},initRatings:function(){e.all(r.RATE).each(function(t){if(t.hasClass("processed"))return;M.core_rating.Y=e,t.all("select.postratingmenu").each(M.core_rating.attach_rating_events,M.core_rating),t.all("input.postratingmenusubmit").setStyle("display","none"),t.addClass("processed")})},initOptionMenus:function(){e.all(r.OPTIONS_TO_PROCESS).each(function(t){t.removeClass("unprocessed");var n=new e.YUI2.widget.Menu(t.generateID(),{lazyLoad:!0});n.render(e.one(r.CONTAINER).generateID()),e.one("#"+t.getData("controller")).on("click",function(e){e.preventDefault(),n.cfg.setProperty("y",e.currentTarget.getY()+e.currentTarget.get("offsetHeight")),n.cfg.setProperty("x",e.currentTarget.getX()),n.show()})})},handleViewRating:function(e){if(e.currentTarget.ancestor(".helplink")!==null)return;e.preventDefault(),openpopup(e,{url:e.currentTarget.get("href")+"&popup=1",name:"ratings",options:"height=400,width=600,top=0,left=0,menubar=0,location=0,scrollbars,resizable,toolbar,status,directories=0,fullscreen=0,dependent"})},markPostAsRead:function(e,t,n){this.get("io").send({postid:e,action:"markread"},t,n)},ensurePostsExist:function(e,t,n){var i=e.hasAttribute("data-isunread");i&&e.removeAttribute("data-isunread");var s=e.one(r.PLACEHOLDER);if(s===null){this.initFeatures(),i?this.markPostAsRead(e.getData("postid"),t,n):t.call(n);return}this.get("io").send({discussionid:e.getData("discussionid"),action:"posts_html"},function(e){s.replace(e.html),this.initFeatures(),t.call(n)},this)},incrementDiscussionCount:function(t){var n=e.one(r.DISCUSSION_COUNT);n!==null&&(n.setData("count",parseInt(n.getData("count"),10)+t),n.setHTML(M.util.get_string("xdiscussions","mod_hsuforum",n.getData("count"))))},displayNotification:function(t){var n=e.Node.create(t);e.one(r.NOTIFICATION).append(n),setTimeout(function(){n.remove(!0)},1e4)},handleNotification:function(t){e.Lang.isString(t.notificationhtml)&&t.notificationhtml.trim().length>0&&this.displayNotification(t.notificationhtml)},handleUpdateDiscussion:function(t){var n=e.one(r.DISCUSSION_BY_ID.replace("%d",t.discussionid));n?n.replace(t.html):e.one(r.DISCUSSION_TARGET).insert(t.html,"after"),this._forceNavLinks(t.discussionid)},handleDiscussionCreated:function(){e.one(r.NO_DISCUSSIONS)&&e.one(r.NO_DISCUSSIONS).remove(),this.incrementDiscussionCount(1)},handleDiscussionDeleted:function(t){var n=e.one(r.POST_BY_ID.replace("%d",t.postid));if(n===null||!n.hasAttribute("data-isdiscussion"))return;if(e.one(r.DISCUSSIONS)){var i=n.previous(r.DISCUSSION),s=n.next(r.DISCUSSION);n.remove(!0),this.incrementDiscussionCount(-1),e.one(r.DISCUSSION_COUNT).focus(),i&&this._forceNavLinks(i.getData("discussionid")),s&&this._forceNavLinks(s.getData("discussionid"))}else window.location.href=t.redirecturl},loadMoreDiscussions:function(t,n,i,s){var o=e.one(r.LOAD_TARGET);if(!(o instanceof e.Node))return;this.get("io").send({page:t,perpage:n,action:"discussions_html"
},function(e){o.insert(e.html,"before"),i.call(s)},this)}}),M.mod_hsuforum.Dom=s;var o=e.Base.create("hsuforumRouter",e.Router,[],{initializer:function(){e.one(r.DISCUSSIONS)===null&&e.all(r.DISCUSSION_NAV_LINKS).addClass("disable-router")},view:function(t){this.get("article").collapseAllDiscussions(),e.Lang.isUndefined(t.query.page)?this.get("article").loadPage(0):this.get("article").loadPage(parseInt(t.query.page,10))},discussion:function(e){this.get("article").viewDiscussion(e.query.d,e.query.postid)},post:function(t){e.Lang.isUndefined(t.query.reply)?e.Lang.isUndefined(t.query.forum)?e.Lang.isUndefined(t.query["delete"])?e.Lang.isUndefined(t.query.edit)?e.Lang.isUndefined(t.query.prune)||(window.location.href=t.url):this.get("article").get("form").showEditForm(t.query.edit):this.get("article").confirmDeletePost(t.query["delete"]):this.get("article").get("form").showAddDiscussionForm(t.query.forum):this.get("article").get("form").showReplyToForm(t.query.reply)},handleRoute:function(e){if(e.button!==1||e.ctrlKey||e.metaKey||e.currentTarget.hasClass("disable-router"))return;this.routeUrl(e.currentTarget.get("href"))&&e.preventDefault()},routeUrl:function(e){return this.hasRoute(e)?(this.save(this.removeRoot(e)),!0):!1},handleAddDiscussionRoute:function(e){e.preventDefault();var t=e.currentTarget,n=t.one(r.INPUT_FORUM).get("value");this.save(t.get("action")+"?forum="+n)},handleViewDiscussion:function(t){var n="/discuss.php?d="+t.discussionid;e.Lang.isUndefined(t.postid)||(n=n+"&postid="+t.postid),this.save(n)},hideForms:function(e,t,n){this.get("article").get("form").removeAllForms(),n()}},{ATTRS:{article:{value:null},root:{value:"/mod/hsuforum"},routes:{value:[{path:"/view.php",callbacks:["hideForms","view"]},{path:"/discuss.php",callbacks:["hideForms","discussion"]},{path:"/post.php",callbacks:["hideForms","post"]}]}}});M.mod_hsuforum.Router=o,u.NAME="moodle-mod_hsuforum-form",u.ATTRS={io:{value:null}},e.extend(u,e.Base,{_displayReplyForm:function(t){var n=e.one(r.REPLY_TEMPLATE).getHTML(),i=t.one(r.FORM_REPLY_WRAPPER);i instanceof e.Node?i.replace(n):t.append(n),i=t.one(r.FORM_REPLY_WRAPPER),this.attachFormWarnings(),i.one(r.INPUT_REPLY).setAttribute("value",t.getData("postid"));var s=i.one(r.FORM_ADVANCED);s.setAttribute("href",s.getAttribute("href").replace(/reply=\d+/,"reply="+t.getData("postid"))),t.hasAttribute("data-ispost")&&i.one("legend").setHTML(M.util.get_string("replytox","mod_hsuforum",t.getData("author")))},_copyMessage:function(e){var t=e.one(r.EDITABLE_MESSAGE).get("innerHTML");e.one(r.INPUT_MESSAGE).set("value",t)},_submitReplyForm:function(e,t){e.all("button").setAttribute("disabled","disabled"),this._copyMessage(e),this.get("io").submitForm(e.one("form"),function(n){n.errors===!0?(e.one(r.VALIDATION_ERRORS).setHTML(n.html).addClass("notifyproblem"),e.all("button").removeAttribute("disabled")):t.call(this,n)},this,!0)},attachFormWarnings:function(){e.all(r.ALL_FORMS).each(function(e){if(!e.hasClass("form-checker-added")){var t=M.core_formchangechecker.init({formid:e.generateID()});e.addClass("form-checker-added"),e.one(r.EDITABLE_MESSAGE).on("keypress",M.core_formchangechecker.set_form_changed,t)}})},removeAllForms:function(){e.all(r.POSTS+" "+r.FORM_REPLY_WRAPPER).each(function(e){!e.ancestor(r.DISCUSSION_EDIT)&&!e.ancestor(r.POST_EDIT)&&e.remove(!0)});var t=e.one(r.ADD_DISCUSSION_TARGET);t!==null&&t.empty()},handleCancelForm:function(e){e.preventDefault();var t=e.target.ancestor(r.POST_TARGET);t&&t.removeClass(n.POST_EDIT).removeClass(n.DISCUSSION_EDIT),e.target.ancestor(r.FORM_REPLY_WRAPPER).remove(!0),this.fire(i.FORM_CANCELED,{discussionid:t.getData("discussionid"),postid:t.getData("postid")})},handleFormSubmit:function(e){e.preventDefault();var t=e.currentTarget.ancestor(r.FORM_REPLY_WRAPPER);this._submitReplyForm(t,function(e){switch(e.eventaction){case"postupdated":this.fire(i.POST_UPDATED,e);break;case"postcreated":this.fire(i.POST_UPDATED,e);break;case"discussioncreated":this.fire(i.DISCUSSION_CREATED,e)}})},showReplyToForm:function(t){var n=e.one(r.POST_BY_ID.replace("%d",t));try {n.hasAttribute("data-ispost")&&this._displayReplyForm(n),n.one(r.EDITABLE_MESSAGE).focus()}catch(e){}},showAddDiscussionForm:function(){e.one(r.ADD_DISCUSSION_TARGET).setHTML(e.one(r.DISCUSSION_TEMPLATE).getHTML()).one(r.INPUT_SUBJECT).focus(),this.attachFormWarnings()},showEditForm:function(t){var i=e.one(r.POST_BY_ID.replace("%d",t));if(i.hasClass(n.DISCUSSION_EDIT)||i.hasClass(n.POST_EDIT)){i.one(r.EDITABLE_MESSAGE).focus();return}this.get("io").send({discussionid:i.getData("discussionid"),postid:i.getData("postid"),action:"edit_post_form"},function(e){i.prepend(e.html),i.hasAttribute("data-isdiscussion")?i.addClass(n.DISCUSSION_EDIT):i.addClass(n.POST_EDIT),i.one(r.EDITABLE_MESSAGE).focus(),this.attachFormWarnings()},this)}}),M.mod_hsuforum.Form=u,a.NAME=t,a.ATTRS={contextId:{value:undefined},io:{readOnly:!0},dom:{readOnly:!0},router:{readOnly:!0},form:{readOnly:!0},liveLog:{readOnly:!0}},e.extend(a,e.Base,{initializer:function(){this._set("router",new M.mod_hsuforum.Router({article:this,html5:!1})),this._set("io",new M.mod_hsuforum.Io({contextId:this.get("contextId")})),this._set("dom",new M.mod_hsuforum.Dom({io:this.get("io")})),this._set("form",new M.mod_hsuforum.Form({io:this.get("io")})),this._set("liveLog",M.mod_hsuforum.init_livelog()),this.bind()},bind:function(){if(e.one(r.SEARCH_PAGE)!==null)return;var t=e.one(r.CONTAINER);if(t===null)return;var n=this.get("dom"),s=this.get("form"),o=this.get("router"),u=e.one(r.ADD_DISCUSSION);e.delegate("click",this.handleViewNextDiscussion,document,r.DISCUSSION_NEXT,this),e.delegate("click",s.handleCancelForm,document,r.LINK_CANCEL,s),e.delegate("click",o.handleRoute,document,r.CONTAINER_LINKS,o),e.delegate("click",n.handleViewRating,document,r.RATE_POPUP,n),e.delegate("click",function(e){e.target.ancestor(r.DISCUSSION).focus(),this.get("liveLog").logText(M.str.mod_hsuforum.discussionclosed)},document,r.DISCUSSION_CLOSE,this),e.delegate("click",function(
){this.get("liveLog").logText(M.str.mod_hsuforum.discussionloaded)},document,[r.DISCUSSION_VIEW,r.DISCUSSION_NEXT,r.DISCUSSION_PREV].join(", "),this),t.delegate("submit",s.handleFormSubmit,r.FORM,s),u instanceof e.Node&&u.on("submit",o.handleAddDiscussionRoute,o),s.on(i.POST_CREATED,n.handleUpdateDiscussion,n),s.on(i.POST_CREATED,o.handleViewDiscussion,o),s.on(i.POST_CREATED,this.handleLiveLog,this),s.on(i.POST_UPDATED,n.handleUpdateDiscussion,n),s.on(i.POST_UPDATED,o.handleViewDiscussion,o),s.on(i.POST_UPDATED,this.handleLiveLog,this),s.on(i.DISCUSSION_CREATED,n.handleUpdateDiscussion,n),s.on(i.DISCUSSION_CREATED,n.handleDiscussionCreated,n),s.on(i.DISCUSSION_CREATED,n.handleNotification,n),s.on(i.DISCUSSION_CREATED,o.handleViewDiscussion,o),s.on(i.DISCUSSION_CREATED,this.handleLiveLog,this),this.on(i.DISCUSSION_DELETED,n.handleDiscussionDeleted,n),this.on(i.DISCUSSION_DELETED,n.handleNotification,n),this.on(i.DISCUSSION_DELETED,this.handleLiveLog,this),this.on(i.POST_DELETED,n.handleUpdateDiscussion,n),this.on(i.POST_DELETED,o.handleViewDiscussion,o),this.on(i.POST_DELETED,this.handleLiveLog,this),s.on(i.FORM_CANCELED,o.handleViewDiscussion,o)},handleLiveLog:function(t){e.Lang.isString(t.livelog)&&this.get("liveLog").logText(t.livelog)},viewDiscussion:function(t,i){var s=e.one(r.DISCUSSION_BY_ID.replace("%d",t));if(!(s instanceof e.Node))return;this.get("dom").ensurePostsExist(s,function(){s.hasClass(n.DISCUSSION_EXPANDED)||(this.collapseAllDiscussions(),this.expandDiscussion(s));if(!e.Lang.isUndefined(i)){var t=e.one(r.POST_BY_ID.replace("%d",i));t===null||t.hasAttribute("data-isdiscussion")?s.focus():t.get("parentNode").focus()}else s.focus()},this)},handleViewNextDiscussion:function(t){var n=t.currentTarget.ancestor(r.DISCUSSION);if(!n.next().test(r.DISCUSSION)&&this.canLoadMoreDiscussions()){var i=e.one(r.LOAD_MORE);if(i===null)return;t.preventDefault(),t.stopImmediatePropagation();var s=e.QueryString.parse(i.get("href").split("?")[1]);this.loadPage(s.page,function(){this.get("router").routeUrl(t.currentTarget.get("href"))},this)}},loadPage:function(t,n,i){var s=e.one(r.LOAD_MORE);if(s===null)return;var o=e.all(r.DISCUSSION),u=parseInt(s.getData("total"),10),a=parseInt(s.getData("perpage"),10),f=t*a+a;f>u&&(f=u);if(f>o.size()){var l=Math.ceil((f-o.size())/a);l--,l>=0&&this._loadAllPages(t,a,l,function(){var o=s.getAttribute("href").replace(/page=\d+/,"page="+(t+1));s.setAttribute("href",o),f>=u?s.hide():s.setStyle("display","block"),n?n.call(i):e.all(r.DISCUSSION).item(f+1-a).scrollIntoView(!0).focus()},this)}else n&&n.call(i)},_loadAllPages:function(e,t,n,r,i){this.get("dom").loadMoreDiscussions(e-n,t,function(){var s=n-1;s>=0?this._loadAllPages(e,t,s,r,i):r.call(i)},this)},expandDiscussion:function(t){e.one(r.CONTAINER).all(r.DISCUSSION).setAttribute("aria-hidden","true").setAttribute("aria-expanded","false"),t.addClass(n.DISCUSSION_EXPANDED).setAttribute("aria-hidden","false").setAttribute("aria-expanded","true").scrollIntoView(!0),this.get("form").attachFormWarnings()},collapseAllDiscussions:function(){e.one(r.CONTAINER).all(r.DISCUSSION).removeClass(n.DISCUSSION_EXPANDED).setAttribute("aria-hidden","false").setAttribute("aria-expanded","false")},canLoadMoreDiscussions:function(){var t=e.one(r.LOAD_MORE);return t===null?!1:t.getStyle("display")!=="none"},confirmDeletePost:function(t){var n=e.one(r.POST_BY_ID.replace("%d",t));if(n===null)return;window.confirm(M.str.mod_hsuforum.deletesure)===!0&&this.deletePost(t)},deletePost:function(t){var n=e.one(r.POST_BY_ID.replace("%d",t));if(n===null)return;this.get("io").send({postid:t,sesskey:M.cfg.sesskey,action:"delete_post"},function(e){n.hasAttribute("data-isdiscussion")?this.fire(i.DISCUSSION_DELETED,e):this.fire(i.POST_DELETED,e)},this)}}),M.mod_hsuforum.Article=a,M.mod_hsuforum.init_article=function(e){new a(e)}},"@VERSION@",{requires:["base","node","event","router","yui2-menu","core_rating","querystring","moodle-mod_hsuforum-io","moodle-mod_hsuforum-livelog","moodle-core-formchangechecker"]});