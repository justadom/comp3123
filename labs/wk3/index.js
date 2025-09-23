const http = require("http");
const employees = require("./Employee"); 

const port = process.env.PORT || 8081;


function handleRoot(req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Welcome to Lab Exercise 03</h1>");
}

function handleAllEmployees(req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(employees));
}

function handleEmployeeNames(req, res) {
    const names = employees
        .map(emp => `${emp.firstName} ${emp.lastName}`)
        .sort();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(names));
}

function handleTotalSalary(req, res) {
    const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ total_salary: totalSalary }));
}

function handleNotFound(req, res) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: http.STATUS_CODES[404] }));
}

const server = http.createServer((req, res) => {
    if (req.method !== "GET") {
        res.writeHead(405, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: http.STATUS_CODES[405] }));
    }

    switch (req.url) {
        case "/":
            handleRoot(req, res);
            break;
        case "/employee":
            handleAllEmployees(req, res);
            break;
        case "/employee/names":
            handleEmployeeNames(req, res);
            break;
        case "/employee/totalsalary":
            handleTotalSalary(req, res);
            break;
        default:
            handleNotFound(req, res);
    }
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
