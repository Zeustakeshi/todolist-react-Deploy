import { useRef } from 'react';
import { useStore } from './store';
import { actions } from './state';
import Todos from './Todos';
import './App.css';
function App() {
    const inputRef = useRef();
    const [state, dispatch] = useStore();
    const { todoInput, theme } = state;
    const handleChangeInput = (e) => {
        const value = e.target.value;
        dispatch(actions.setInputAction(value));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const currentState = todoInput;
        if (currentState) {
            dispatch(actions.setAddAction(currentState));
            dispatch(actions.setInputAction(''));
        }
        inputRef.current.focus();
    };
    return (
        <div className={`App theme-${theme}`}>
            <form
                className={`input-todo theme-${theme}`}
                onSubmit={handleSubmit}
            >
                <input
                    ref={inputRef}
                    value={todoInput}
                    onChange={handleChangeInput}
                    placeholder="Please enter your task ..."
                ></input>
                <button
                    type="submit"
                    className={`btn btn-submit theme-${theme}`}
                >
                    Submit
                </button>
            </form>
            <Todos></Todos>
            <button
                className={`btn btn-toggle-theme is-${theme}`}
                onClick={(e) => {
                    e.target.style = 'animation: rotate 0.5s linear';
                    
                        e.target.style = '';
                    
                    const toggleTheme =
                        theme === 'light' ? 'dark' : 'light';
                    dispatch(actions.setChangeThemeAction(toggleTheme));
                }}
            >
                {theme === 'light' ? (
                    <ion-icon name="sunny-outline"></ion-icon>
                ) : (
                    <ion-icon name="moon-outline"></ion-icon>
                )}
            </button>
        </div>
    );
}

export default App;
