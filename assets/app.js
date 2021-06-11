const createPaginationNavs = function (totalPages, currentPage) {
console.log("🚀 ~ file: app.js ~ line 2 ~ createPaginationNavs ~ currentPage", currentPage)
    var ul = document.createElement('ul');
        ul.classList.add("pagination")
        ul.classList.add("justify-content-center")
        ul.setAttribute("id", "page-list");

        document.getElementById('nav').appendChild(ul);

        for (let index = 1; index <= totalPages; index++) {
            var li = document.createElement('li');
            li.classList.add("page-item")
            if(currentPage == index) {
                li.classList.add("active")
            }
            li.setAttribute("id", "page-item");
            ul.appendChild(li);

            innerHTML = index;

            var a = document.createElement('a');
            a.classList.add("page-link")
            li.appendChild(a);
            a.innerHTML = index;
        }

        document.getElementById("page-list").addEventListener("click", function(e) {
            if (e.target && e.target.matches("a.page-link")) {
              const selectedPage = e.target.innerText;
              filter(selectedPage);
            }
          });
}
const render = function(data, totalPages, currentPage) {
    createPaginationNavs(totalPages, currentPage);
    
    // table headings
    var columnHeadings = Object.keys(data[0]);

    // Get the count of columns.
    var columnCount = columnHeadings.length;

    // The count of rows.
    var rowCount = data.length;

    // Create table.
    var table = document.createElement('table');
    table.setAttribute("id", "table");
    table.classList.add("table");
    document.getElementById("data-list").appendChild(table);

    // Add the header row.
    var header = table.createTHead();
    var row = header.insertRow(-1);

    for (var i = 0; i < columnCount; i++) {
        var headerCell = document.createElement('th');
        headerCell.setAttribute("scope", "col");
        headerCell.innerText = columnHeadings[i].toUpperCase();
        row.appendChild(headerCell);
    }

    // Create table body.
    var tBody = document.createElement('tbody');
    table.appendChild(tBody);

    // Add the data rows to the table body.
    for (var i = 0; i < rowCount; i++) { // each row
        row = tBody.insertRow(-1)
        for (var j = 0; j < columnCount; j++) { // each column
            var cell = row.insertCell(-1);
            cell.setAttribute('data-label', columnHeadings[j].toUpperCase());
            var obj = data[i];
            cell.innerText = obj[columnHeadings[j]];
        }
    }

}

const refreshUI = function() {
    // Re render table and pagination nav
    var isTableExist = document.getElementById("table");
    var isNavExist = document.getElementById("page-list");
    if(isTableExist && isNavExist) {
        isTableExist.parentNode.removeChild(isTableExist);
        isNavExist.parentNode.removeChild(isNavExist);
    }
}

function filter(page=1){
    refreshUI();
    var topic=document.getElementById("SearchText").value; 
    var limit=document.getElementById("limit").value;
    var sortBy=document.getElementById("sortBy").value; 
    var order=document.getElementById("order").value;
    const url = `http://52.16.45.178/api?page=${page}&&limit=${limit}&&topic=${topic}%&&sortBy=${sortBy}&&order=${order}`
    load(url)
}


function load(URL){
    let xhr = new XMLHttpRequest();
    const method = 'GET';
    xhr.responseType = 'json';

    xhr.open(method, URL);
    xhr.send()

    xhr.onload = function() {
        console.log(`onloadend: ${xhr.status} ${xhr.response}`);
        const res = xhr.response;
        console.log("🚀 ~ file: app.js ~ line 120 ~ load ~ res", JSON.stringify(res));
        const data = xhr.response.data;

        const totalRows = xhr.response.totalRows;
        const totalPages = xhr.response.totalPages;
        const currentPage = xhr.response.currentPage;

        console.log("🚀 ~ file: app.js ~ line 120 ~ load ~ data", JSON.stringify(data));

        if(data.length === 0) {
            refreshUI();
        } else {
            render(data, totalPages, currentPage);

        }
    };

    xhr.onerror = function() { // only triggers if the request couldn't be made at all
        console.log(`Network Error`);
    };

    xhr.onprogress = function(event) { // triggers periodically
        console.log(`Received ${event.loaded} of ${event.total}`);
    };
}