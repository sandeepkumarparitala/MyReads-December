# MyReads Project
This app is working version of MY-reads project designed by udacity to understand the lifecycle and environment of react World

My-Reads app allows user to categorize the books as 'currently Reading', 'want to read', 'read'. The backend server stores the details of books in the shelf and returns updated information on making API calls.  
The user can also search books in the market place and can add them to the shelf's

## TL;DR

To get started developing right away:

* install all project dependencies with `npm install`
* start the development server with `npm start`


Remember that good React design practice is to create new JS files for each component and use import/require statements to include them where they are needed.

## Backend Server

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Contributing

This repository contains all my personnel projects developed for practice and exploration of concepts so, anyone wants to update techniques and algorithms etc.. can work on it and update pull request.


