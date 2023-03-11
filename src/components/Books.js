import React from "react"
import { observer, inject } from "mobx-react"

/** inject向当前组件注入store */
const Books = inject("shop")(
  /**
   * observer将react组件转换成一个监听者，这样在被监听的应用状态变量(Observable)有更新时，
   * react组件就会重新渲染。当 render 中的 state发生改变时，mobx-react会重新调用 render
   * 方法，重新渲染这个组件
   */
    observer(({ shop }) => (
        <section className="Page-books">
            <h1>Available books</h1>
            <ol>
                {shop.sortedAvailableBooks.map((book) => (
                    <BookEntry key={book.id} book={book} />
                ))}
            </ol>
        </section>
    ))
)

const BookEntry = inject("shop")(
    observer(({ book, shop }) => (
        <li>
            <a
                href={`/book/${book.id}`}
                onClick={(e) => {
                    e.preventDefault()
                    shop.view.openBookPage(book)
                    return false
                }}
            >
                {book.name}
            </a>
        </li>
    ))
)

export default Books
