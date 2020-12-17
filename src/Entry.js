import React, { useState } from "react";
import { Redirect } from "react-router-dom";

function Entry(prop) {
  const [redirectTo, setRedirectTo] = useState();
  let log = prop.log;
  const handleClick=() => {
    let redirectCopy = {...redirectTo};
    redirectCopy = "/post/" + log.time;
    setRedirectTo(redirectCopy);
  }

  if (redirectTo !== undefined) {
    return ( 
      <Redirect push to={redirectTo} log={log}/>
    )
  }

  return (
    <div className="clickable card mb-4" onClick={handleClick}>
      <div className={"card-header color " + log.moodRating}>
        <img className="today album-test" src={log.artwork} alt="album cover" />
        <h2 className="entry-title">{log.postTitle}</h2>
        <p className="date">{log.date}</p>
        <img className="trash-can m-1" src="./img/trashcan.png" alt="trash can" />
      </div>
    </div>
  )
}

export default Entry;



// import { Expand } from './Expand';
// import React, { useState } from "react";
// import { Redirect } from "react-router-dom";

// function Entry(prop) {
//   const [redirectTo, setRedirectTo] = useState();
//   let log = prop.log;
//   // console.log(log);
//   const handleClick=() => {
//     // console.log("you clicked on,", log.postTitle);
//     let redirectCopy = {...redirectTo};
//     redirectCopy = "/post/" + log.time;
//     console.log(redirectCopy);
//     setRedirectTo(redirectCopy);
//   }

//   if (redirectTo !== undefined) {
//     return ( 
//       <Redirect push to={redirectTo} />
//     )
//   }

//   return (
//     <div className="clickable card mb-4" onClick={handleClick}>
//       <div className={"card-header color " + log.moodRating}>
//         <img className="today album-test" src={log.artwork} alt="album cover" />
//         <h2 className="entry-title">{log.postTitle}</h2>
//         <p className="date">{log.date}</p>
//         {/* <p>{log.dayDescription}</p> */}
//         {/* <Test></Test> */}

//       </div>
//     </div>
//   )
// }

// export default Entry;