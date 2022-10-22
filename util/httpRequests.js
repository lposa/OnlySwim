import axios from "axios";

const BACKEND_URL =
    "https://onlyswim-434eb-default-rtdb.europe-west1.firebasedatabase.app";

export const storePractices = async(practiceData) => {
    const response = await axios.post(
        BACKEND_URL + "/practices.json",
        practiceData
    );
    const id = response.data.name; //name is ID in firebase
    return id;
};

export const fetchPractices = async() => {
    const response = await axios.get(BACKEND_URL + "/practices.json");

    const practices = [];

    for (const key in response.data) {
        const practicesObject = {
            id: key,
            title: response.data[key].title,
            date: response.data[key].date,
            description: response.data[key].description,
            author: response.data[key].author,
            cumulativeRating: response.data[key].cumulativeRating,
            ratings: response.data[key].ratings,
        };
        practices.push(practicesObject);
    }

    return practices;
};

export const updatePractice = (id, practiceData) => {
    return axios.put(BACKEND_URL + `/practices/${id}.json`, practiceData);
};

export const deletePractice = (id) => {
    return axios.delete(BACKEND_URL + `/practices/${id}.json`);
};

export const updatePracticeRating = (id, cumulativeRating) => {
    return axios.put(
        BACKEND_URL + `/practices/${id}/cumulativeRating.json`,
        cumulativeRating
    );
};

export const updatePracticeRatingList = (id, list) => {
    return axios.put(BACKEND_URL + `/practices/${id}/ratings.json`, list);
};

export const storeUsers = async(userData) => {
    const response = await axios.post(BACKEND_URL + "/users.json", userData);
    const id = response.data.name;
    return id;
};

export const updateUser = async(id, userData) => {
    return axios.put(BACKEND_URL + `/users/${id}.json`, userData);
};

export const fetchUserById = async(id) => {
    const response = await axios.get(BACKEND_URL + `/users/${id}.json`);

    //    const users = [];

    /*   for (const key in response.data) {
                                                        const usersObject = {
                                                            id: key,
                                                            fullName: response.data[key].fullName,
                                                            birthday: response.data[key].birthday,
                                                            description: response.data[key].description,
                                                            email: response.data[key].email,
                                                            phone: response.data[key].phone,
                                                            role: response.data[key].role,
                                                            profilePic: response.data[key].profilePic,
                                                        };
                                                        users.push(usersObject);
                                                    } */

    return response.data;
};

export const fetchAllUsers = async() => {
    const response = await axios.get(BACKEND_URL + "/users.json");

    const users = [];

    for (const key in response.data) {
        const usersObject = {
            id: key,
            fullName: response.data[key].fullName,
            birthday: response.data[key].birthday,
            description: response.data[key].description,
            email: response.data[key].email,
            phone: response.data[key].phone,
            role: response.data[key].role,
            profilePic: response.data[key].profilePic,
        };
        users.push(usersObject);
    }

    return users;
};