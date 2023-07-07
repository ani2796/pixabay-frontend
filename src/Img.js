import { Link, useLoaderData, useLocation } from "react-router-dom";

const Img = () => {
    const data = useLoaderData().data.hits[0];
    // console.log("Image data in img", data);
    // const navigate = useNavigate();
    const searchParams = useLocation();
    // console.log("url states: ", searchParams);

    return(
        <div className="imageDisplay">
            <img 
                className="imageDiv"
                src={data.largeImageURL}
                alt="Full image"
            />
            <div className="userProfile">
                <div>{data.user}</div>
                <img 
                    className="userProfilePic"
                    src={data.userImageURL}
                />
                <div>Original uploader</div>
            </div>
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