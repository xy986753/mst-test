import React from "react"
import { observer, inject } from "mobx-react"
import logo from "../logo.svg"
import "./App.css"

import Books from "./Books"

const App = inject("shop")(
    observer(({ shop }) => (
        <div>
            <div className="App">
                <AppHeader />
                <AppMenu>
                    <AppMenuItem onClick={() => shop.view.openBooksPage()}>
                        Available books
                    </AppMenuItem>
                    <AppMenuItem onClick={() => shop.view.openCartPage()}>Your cart</AppMenuItem>
                </AppMenu>
                {shop.isLoading ? <h1>Loading...</h1> : renderPage(shop.view)}
            </div>
        </div>
    ))
)

function renderPage(viewStore) {
    switch (viewStore.page) {
        case "books":
            return <Books />
        case "book":
            const book = viewStore.selectedBook
            if (book) return "Sry, not found"
            else return <h1>Book ${viewStore.selectedBookId} not found!</h1>
        case "cart":
            return "Sry, not found"
        default:
            return "Sry, not found"
    }
}

const AppHeader = () => (
    <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to the React MobX Book shop!</h2>
    </div>
)

const AppMenu = ({ children }) => <ul className="App-menu">{children}</ul>

const AppMenuItem = ({ onClick, children }) => (
    <li>
        {/* eslint-disable-next-line */}
        <a onClick={onClick}>{children}</a>
    </li>
)

export default App
