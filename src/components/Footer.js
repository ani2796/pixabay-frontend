const Footer = ({ currentPage, toDisplay, onLeftClick, onRightClick }) => {

    if(!toDisplay) return null;
  
    return (
      <div className="flex flex-row justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onLeftClick}>Left</button>
         <div className="m-1">{"" + currentPage + ""}</div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onRightClick}>Right</button>
      </div>
    );
  }

export default Footer;