import { GLTFLoader } from '../libs/GLTFLoader.mjs';

class State {
    screenManager;
    enter() {};
    update() {};
    exit() {};
}

class ScreenManager {
    current = new State();
    screen;
    overlay;

    constructor() {
        this.add(...arguments);
    }

    update = () => {
        this.current.update();
    }

    set(screenManagerClass, parameters) {
        let state = this.states.get(screenManagerClass);

        if (!state) {
            // console.warn('Такого State не существует', this.current );
            return;
        }

        if (this.current === state) return;

        this.current.exit();
        this.current = state;
        this.current.enter( parameters );
    }

    add() {
        for (let state of arguments) {
            if (state instanceof State) {
                state.screenManager = this;
                this.states.set( state.constructor, state );
            }
        }        
    }
}