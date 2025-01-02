export function updateStateField(state, stateFunc, field, value) {
    let update = { ...state }
    update[field] = value
    stateFunc(update)
};

export async function callAPIAsync(controller, endpoint, method, params) {

    // REPLACE WITH ENVIRONMENT VARIABLES
    let APIURI = `https://localhost:7152/${controller}/${endpoint}`;
    method = method.toUpperCase();

    

    let data;
    switch (method) {
        case "GET":
            try {
                APIURI += params ? `/${params}` : "";
                const response = await fetch(APIURI, {
                    method: "GET",
                });

                // Check if the response is successful (status code 200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                // Parse the response data as JSON
                const data = await response.json();

                // Return the fulfilled data
                return data;

            } catch (error) {
                console.error("Caught error", error.message)
            }
            break;

        case "POST":
            try {
                const response = await fetch(APIURI, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(params),
                });
                if (!response.ok) {
                    console.error(response)
                    throw new Error(` Error Response status ${response.status}`)

                }
                data = await response.json();
                return data;
            } catch (error) {
                console.error("Caught error", error.message)
            }
            break;

        case "PUT":
            try {
                const response = await fetch(APIURI, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(params),
                });
                if (!response.ok) {
                    throw new Error(` Error Response status ${response.status}`)
                }
                data = await response.json();
            } catch (error) {
                console.error("Caught error", error.message)
            }
            return data;

        case "DELETE":
            try {
                APIURI += params ? `/${params}` : "";
                const response = await fetch(APIURI, {
                    method: "DELETE",
                });
                if (!response.ok) {
                    throw new Error(` Error Response status ${response.status}`)
                }
                data = await response.json();

            } catch (error) {
                console.error("Caught error", error.message)
            }
            return data;
        default:
            console.log("No method provided");
            break;
    }
};


/*
try {
        const response = await fetch(`https://localhost:7152/${controller}/${endpoint}`, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(todo),
        })
        if (!response.ok) {
            throw new Error(` Response status ${response.status}`)
        }
        const data = await response.json();
        console.log(data)
    } catch (error) {
        console.error("Caught error", error.message)
    }
*/