function makeBookService() {
    const baseUrl = '/api/services';
    const headers = {
        'Content-Type': 'application/json',
    }

    async function getBooks(searchtext, page, id) {
        const limit = 8
        let url = `${baseUrl}?name=${searchtext}&page=${page}&limit=${limit}&typeid=${id}`;
        if(searchtext!="") {
            url = `${baseUrl}?name=${searchtext}&typeid=${id}`;
        }  
        return await fetch(url).then((res) => res.json());
    };

    async function addBook(book) {
        return await fetch(baseUrl, {
            method: 'POST',
            headers,
            body: JSON.stringify(book),
        }).then((res) => res.json());
    }

    async function getBook(id) {
        return await fetch(`${baseUrl}/${id}`).then((res) => res.json());
    }

    async function updateBook(book) {

        return await fetch(`${baseUrl}/${book.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(book),
        }).then((res) => res.json());
    }

    async function deleteBook(id) {
        return await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
        }).then((res) => res.json());
    }

    // deete all books
    async function deleteAllBooks() {
        return await fetch(baseUrl, {
        method: 'DELETE',
        }).then((res) => res.json());
    }




    return {
        getBooks,
        getBook,
        addBook,
        updateBook,
        deleteBook,
        deleteAllBooks,
    };
};

export default makeBookService();