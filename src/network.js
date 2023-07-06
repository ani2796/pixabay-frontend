import axios from 'axios';
// Build URLs to hit the API with

const buildUrl = (params = {}) => {
    let url = `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}`;
    
    for(const key in params) {
        url = url.concat(`&${key}=${params[key]}`);
    }

    console.log("built query: ", url);
    return(url);
}

const filterImgData = (imgData) => {
    console.log("imgData: ", imgData);
    return ({ 
        data: imgData.data, 
        status: imgData.status, 
        headers: imgData.headers,
    });

}

const getImgData = (url) => {
    // let filteredImgData = {}
    return axios.get(url)
    .then(result => filterImgData(result))
    .catch(error => {
        console.log("Could not get img data...", error);
        return {};
    });
}

export { buildUrl, getImgData };