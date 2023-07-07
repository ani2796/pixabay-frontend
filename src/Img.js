import { Link, useLoaderData, useLocation } from "react-router-dom";

const Img = () => {
    const data = useLoaderData().data.hits[0];
    // console.log("Image data in img", data);
    // const navigate = useNavigate();
    const searchParams = useLocation();
    // console.log("url states: ", searchParams);

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
            <Link
                to={"/"}
                state={ searchParams }
            >
                <button>
                    Back
                </button>
            </Link>
        </div>
    );
}

export { Img };