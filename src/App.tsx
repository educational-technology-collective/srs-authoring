import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { AUTH0_AUDIENCE, makeGetReqWithParam } from "./utils";
import { Lm } from "./types";

import { LandingPage, LogoutButton, PreviewPane } from "./components";
import { LmPane } from "./components/lm";
import { FcPane } from "./components/fc";
import "./styles/App.css";

function App() {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  if (isAuthenticated) {
    try {
      // Get access token from Auth0 so that we can access protected API routes.
      getAccessTokenSilently({
        authorizationParams: {
          audience: AUTH0_AUDIENCE,
        },
      }).then((accessToken) => {
        chrome.storage.session.set({ accessToken: accessToken });
      });
    } catch (e) {
      console.log(e);
    }
  }

  // State definitions hold LM and FC data for the current Coursera video.
  const [lmArray, setLmArray] = useState([] as Lm[]);
  const [lmIndex, setLmIndex] = useState(0);
  const [fcIndex, setFcIndex] = useState(0);

  // Listens to subsequent URL change info sent by the service worker.
  const [url, setUrl] = useState("");
  const listener = (request: any) => {
    setUrl(request.message);
    return true;
  };

  chrome.runtime.onMessage.addListener(listener);

  // On URL change, get new LMs and associated FCs.
  useEffect(() => {
    setLmArray([]);
    setLmIndex(0);
    setFcIndex(0);
    // Grab URL when the extension first loads.
    chrome.tabs
      .query({ active: true, lastFocusedWindow: true })
      .then(([tab]) => {
        if (tab.url) setUrl(tab.url);
      })
      .catch((err) => {
        console.log("Error while initially fetching URL", err);
      });

    const learnVideoUrlRegex =
      /^https:\/\/www.coursera.org\/learn\/siads505\/lecture\/.*$/;
    const teachVideoUrlRegex =
      /^https:\/\/www.coursera.org\/teach\/siads505\/.*\/lecture\/.*$/;

    // Check if url is valid.
    if (url && (learnVideoUrlRegex.test(url) || teachVideoUrlRegex.test(url))) {
      (async () => {
        const lms: Lm[] = await makeGetReqWithParam("/lms/search", [
          ["videoUrl", url],
        ]);

        for (let i = 0; i < lms.length; ++i) {
          const fcs = await makeGetReqWithParam("/fcs/search", [
            ["lm_id", lms[i]._id],
          ]);

          lms[i].flashcards = fcs;
        }

        setLmArray(lms);
      })();
    }
  }, [url]);

  return (
    <>
      {!isAuthenticated ? (
        <div id="landingPage">
          <LandingPage />
        </div>
      ) : (
        <>
          <div id="leftEditor">
            <div id="lmPane">
              <LmPane
                lmArray={lmArray}
                setLmArray={setLmArray}
                lmIndex={lmIndex}
                setLmIndex={setLmIndex}
                setFcIndex={setFcIndex}
                url={url}
              />
            </div>
            <div id="fcPane">
              <FcPane
                lmArray={lmArray}
                setLmArray={setLmArray}
                lmIndex={lmIndex}
                fcIndex={fcIndex}
                setFcIndex={setFcIndex}
              />
            </div>
            <div id="authPane">
              <p>Welcome, {user?.name}.</p>
              <div id="spacer"></div>
              <LogoutButton />
            </div>
          </div>
          <div id="rightPreview">
            {lmArray.length > 0 && lmArray[lmIndex].flashcards != undefined && (
              <PreviewPane
                lmArray={lmArray}
                lmIndex={lmIndex}
                fcIndex={fcIndex}
              />
            )}
          </div>
        </>
      )}
    </>
  );
}

export default App;
