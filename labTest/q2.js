function resolvedPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const successMessage = { message: "delayed success!" };
            resolve(successMessage);
        }, 500);
    });
}

function rejectedPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const errorMessage = { error: "delayed exception!" };
            reject(errorMessage);
        }, 500);
    });
}

resolvedPromise()
    .then(response => console.log("Way 1 Resolved:", response))
    .catch(error => console.error("Way 1 Error:", error));

rejectedPromise()
    .then(response => console.log("Way 1 Resolved:", response))
    .catch(error => console.error("Way 1 Error:", error));
