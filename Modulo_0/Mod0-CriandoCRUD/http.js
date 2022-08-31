function fetchJson(url, options) {
    return fetch(url, options).then((r) => {
        if (r.ok) {
            return r.json();
        } else {
            throw new Error(r.statusText)
        }
    });
}

function listEmployees() {
    return fetchJson("http://localhost:3000/employees");
}

function listRoles() {
    return fetchJson("http://localhost:3000/roles");
}

function updateEmployee(id, employee) {
    return fetchJson(`http://localhost:3000/employees/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
    });
}

function createEmployee(employee) {
    return fetchJson(`http://localhost:3000/employees`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
    });
}

function deleteEmployee(id) {
    return fetchJson(`http://localhost:3000/employees/${id}`, {
        method: "DELETE"
    });
}