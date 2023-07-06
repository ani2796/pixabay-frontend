import { useLoaderData } from "react-router-dom";

const Img = () => {
    const data = useLoaderData().data.hits[0];
    console.log("Image data in img", data);

    return(
        <div>
            <img
                src={data.largeImageURL}
                alt="Full image"
            />
            <p>Original uploader: {data.user}</p>
            <img 
                src={data.userImageURL}
            />
        </div>
    );
}

export { Img };