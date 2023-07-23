import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { makeGetReqWithParam } from "./utils";
import { Flashcard, Lm, LmFcs } from "./types";

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
          audience: "https://auth0-jwt-authorizer",
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
  const [fcArray, setFcArray] = useState([] as Flashcard[]);
  const [fcIndex, setFcIndex] = useState(0);
  const [lmFcs, setLmFcs] = useState({} as LmFcs);

  // Listens to subsequent URL change info sent by the service worker.
  const [url, setUrl] = useState("");
  const listener = (request: any) => {
    setUrl(request.message);
    return true;
  };

  chrome.runtime.onMessage.addListener(listener);

  // On URL change, get new LMs and associated FCs.
  useEffect(() => {
    // Grab URL when the extension first loads.
    chrome.tabs
      .query({ active: true, lastFocusedWindow: true })
      .then(([tab]) => {
        if (tab.url) setUrl(tab.url);
      })
      .catch((err) => {
        console.log("Error while initially fetching URL", err);
      });

    const videoUrlRegex =
      /^https:\/\/www.coursera.org\/learn\/.*\/lecture\/.*$/;

    // Check if url is valid video.
    if (url && videoUrlRegex.test(url)) {
      (async () => {
        const lms: Lm[] = await makeGetReqWithParam("/lms/search", [
          ["videoUrl", url],
        ]);

        setLmArray(lms);
        for (let i = 0; i < lms.length; ++i) {
          const fcs = await makeGetReqWithParam("/flashcards/search", [
            ["lmId", lms[i]._id],
          ]);

          if (fcs) {
            lmFcs[lms[i]._id] = fcs;
          } else {
            lmFcs[lms[i]._id] = [];
          }

          setLmFcs(lmFcs);
          setFcArray(lmFcs[lms[lmIndex]._id]);
        }
      })();
    }
  }, [url]);

  // On updates to lmArray, lmIndex, lmFcs, or url, update fcArray.
  useEffect(() => {
    // Sync current LM and corresponding FCs.
    if (lmArray.length > 0) {
      setFcArray(lmFcs[lmArray[lmIndex]._id]);
    } else {
      setFcArray([]);
    }

    console.log("fcArray:", fcArray);
  }, [lmArray, lmIndex, lmFcs, url]);

  // const [loaded, setLoaded] = useState(false);
  // useEffect(() => {
  //   document.getElementById("rightPreview") ? setLoaded(true) : setLoaded(false);
  // }, [document.getElementById("rightPreview")]);

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
                lmFcs={lmFcs}
                setLmFcs={setLmFcs}
                url={url}
              />
            </div>
            <div id="fcPane">
              <FcPane
                fcArray={fcArray}
                setFcArray={setFcArray}
                fcIndex={fcIndex}
                setFcIndex={setFcIndex}
                lmFcs={lmFcs}
                setLmFcs={setLmFcs}
                lmId={lmArray.length > 0 ? lmArray[lmIndex]._id : ""}
              />
            </div>
            <div id="authPane">
              <p>Welcone, {user?.name}.</p>
              <div id="spacer"></div>
              <LogoutButton />
            </div>
          </div>
          <div id="rightPreview">
            {fcArray && fcArray.length > 0 && (
              <PreviewPane flashcard={fcArray[fcIndex]} flashcards={fcArray} />
            )}
          </div>
        </>
      )}
    </>
  );
}

export default App;
