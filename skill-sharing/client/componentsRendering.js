function renderUserField(name, dispatch) {
    return elt("label", {}, "Your name: ", elt("input", {
        type: "text",
        value: name,
        onchange(event) {
            dispatch({type: "setUser", user: event.target.value});
        }
    }));
}

function renderTalk(talk, dispatch) {
    return elt(
        "section", 
        {className: "talk"},
        elt(
            "h2", 
            null, 
            talk.title, 
            " ", 
            elt(
                "button", 
                {type: "button",onclick() {
                    dispatch({type: "deleteTalk", talk: talk.title});
                }}, 
                "Delete"
            )
        ),
        elt(
            "div", 
            null, 
            "by ",
            elt("strong", null, talk.presenter)),
            elt("p", null, talk.summary),
            ...talk.comments.map(renderComment),
            elt("form", {
                onsubmit(event) {
                    event.preventDefault();
                    let form = event.target;
                    dispatch({type: "newComment",
                        talk: talk.title,
                        message: form.elements.comment.value
                    });
                    form.reset();
                }
            }, 
            elt("input", {type: "text", name: "comment"}), 
            " ",
            elt("button", {type: "submit"}, "Add comment")));
}

function renderComment(comment) {
     return elt("p", {className: "comment"},elt("strong", null, comment.author),": ", comment.message);
}

function renderTalkForm(dispatch) {
    let title = elt("input", {type: "text"});
    let summary = elt("input", {type: "text"});
    return elt("form", {
        onsubmit(event) {
            event.preventDefault();
            dispatch({
                type: "newTalk",
                title: title.value,
                summary: summary.value
            });
            event.target.reset();
        }
    }, 
    elt("h3", null, "Submit a Talk"),          
    elt("label", null, "Title: ", title),
    elt("label", null, "Summary: ", summary),
    elt("button", {type: "submit"}, "Submit"));
}
                