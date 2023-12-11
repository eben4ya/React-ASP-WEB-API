import React from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

const Loading = () => {
  return (
    <section className="flex h-screen w-screen items-center justify-center">
      <PacmanLoader
        color={"#000000"}
        loading="true"
        //   cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </section>
  );
};

export default Loading;

// import React from "react";

// function Loading() {
//   return (
//     <div className="flex min-h-screen items-center justify-center">
//       <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
//     </div>
//   );
// }

// export default Loading;
