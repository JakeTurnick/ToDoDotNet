import axios from 'axios';

export function updateStateField(state, stateFunc, field, value) {
    let update = { ...state }
    update[field] = value
    stateFunc(update)
};

export async function callAPIAsync(method, controller, endpoint, params) {

    // REPLACE WITH ENVIRONMENT VARIABLES
    let APIURI = `https://localhost:7152/${controller}/${endpoint}`;
    method = method.toUpperCase();

    let data;
    switch (method) {
        case "GET":
            try {
                // Might have to update APIURI if using id in URI instead of data
                // TODO - Test this
                if (typeof (params?.id) == "number") {
                    APIURI += `/${params.id}`
                }

                const response = await axios({
                    method: "GET",
                    url: APIURI,
                    //data: params,
                    validateStatus: function (status) {
                        return status >= 200 && status < 500;
                    }
                });
                return response;
            } catch (error) {
                console.log("axios error: ", error);
                return error;
            }

        case "POST":
            try {
                const response = await axios({
                    method: "POST",
                    url: APIURI,
                    data: params,
                    validateStatus: function (status) {
                        return status >= 200 && status < 500;
                    }
                });
                return response;
            } catch (error) {
                console.log("axios error: ", error);
                return error;
            }

        case "PUT":
            try {
                const response = await axios({
                    method: "PUT",
                    url: APIURI,
                    data: params,
                    body: JSON.stringify(params),
                    validateStatus: function (status) {
                        return status >= 200 && status < 500;
                    }
                });
                return response;
            } catch (error) {
                console.log("axios error: ", error);
                return error;
            }

        case "DELETE":
            // Might have to update APIURI if using id in URI instead of data
            try {
                const response = await axios({
                    method: "DELETE",
                    url: APIURI,
                    validateStatus: function (status) {
                        return status >= 200 && status < 500;
                    }
                });
                return response;
            } catch (error) {
                console.log("axios error: ", error);
                return error;
            }

        default:
            console.log("No method provided");
            break;
    }
};


/*
OG Way - before axios
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
*/