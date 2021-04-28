class SkillShareApp {

    constructor(state, dispatch) {
        this.dispatch = dispatch;
        this.talkDOM = elt("div", {className: "talks"});
        this.dom = elt(
            "div", null,
            renderUserField(state.user, dispatch),
            this.talkDOM,
            renderTalkForm(dispatch)
        );
        this.syncState(state);
    }

    syncState(state) {
        if (state.talks != this.talks) {
            this.talkDOM.textContent = "";
            for (let talk of state.talks) {
                this.talkDOM.appendChild(
                    renderTalk(talk, this.dispatch));
            }
            this.talks = state.talks;
        }
    }
}

function runApp() {
    let user = localStorage.getItem("userName") || "Anon";
    let state, app;

    function dispatch(action) {
        state = handleAction(state, action);
        app.syncState(state);
    }

    pollTalks(talks => {
        if (!app) {
            state = {user, talks};
            app = new SkillShareApp(state, dispatch);
            document.body.appendChild(app.dom);
        } else {
            dispatch({type: "setTalks", talks});
        }
    }).catch(reportError);
}

runApp();
        