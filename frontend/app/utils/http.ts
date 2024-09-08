import axios from "axios";

const Post = (url: string, requestPayload?: any, contentType: string = "application/json") => {

    return axios
        .post(url, requestPayload, {
            headers: {
                "Content-Type": contentType,
            },
        })

}

const Patch = (url: string, requestPayload: any, contentType: string = "application/json") => {

    return axios
        .patch(url, requestPayload, {
            headers: {
                "Content-Type": contentType,
            },
        })

}

const Get = (url: string, credentials: boolean = true) => {
    return axios
        .get(url)
}

const HTTP = { Post, Patch, Get };

export default HTTP;