import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { LandingPage, LogoutButton, LmPane, FcPane } from "./components";
import { VideoLm } from "./types";
import { makeGetReqWithParam } from "./utils";
import "./styles/App.css";

// sorts LMs by their start time.
const compareLm = (lm1: VideoLm, lm2: VideoLm) => {
  // convert time string to time
  const lm1TimeStrs = lm1.content.startTime.split(":");

  let lm1StartTime = 0;
  if (lm1TimeStrs.length === 1) {
    // SS
    lm1StartTime = +lm1TimeStrs[0];
  } else if (lm1TimeStrs.length === 2) {
    // MM:SS
    lm1StartTime = +lm1TimeStrs[0] * 60 + +lm1TimeStrs[1];
  } else {
    // HH:MM:SS
    lm1StartTime = +lm1TimeStrs[0] * 60 * 60 + +lm1TimeStrs[1] * 60 + +lm1TimeStrs[2];
  }

  // convert time string to time
  const lm2TimeStrs = lm2.content.startTime.split(":");

  let lm2StartTime = 0;
  if (lm2TimeStrs.length === 1) {
    // SS
    lm2StartTime = +lm2TimeStrs[0];
  } else if (lm2TimeStrs.length === 2) {
    // MM:SS
    lm2StartTime = +lm2TimeStrs[0] * 60 + +lm2TimeStrs[1];
  } else {
    // HH:MM:SS
    lm2StartTime = +lm2TimeStrs[0] * 60 * 60 + +lm2TimeStrs[1] * 60 + +lm2TimeStrs[2];
  }

  return lm1StartTime - lm2StartTime;
};

function App() {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  if (isAuthenticated) {
    try {
      // get access token from Auth0 so that we can access protected API routes.
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

  const lmArray: VideoLm[] = [];
  const [arr, setArr] = useState(lmArray);

  const updateArr = (value: VideoLm[]) => {
    // order of LMs is not guaranteed to be sorted, so we sort it.
    value.sort(compareLm);
    setArr(value);
  };

  const getLmPosition = (vlmArr: VideoLm[], value: VideoLm) => {
    return vlmArr.indexOf(value);
  };

  // listens to subsequent URL change info sent by the service worker.
  const [url, setUrl] = useState("");
  const listener = (request: any) => {
    setUrl(request.message);
    return true;
  };

  chrome.runtime.onMessage.addListener(listener);

  useEffect(() => {
    // grab URL when the extension first loads.
    chrome.tabs
      .query({ active: true, lastFocusedWindow: true })
      .then(([tab]) => {
        if (tab.url) setUrl(tab.url);
      })
      .catch((err) => {
        console.log("Error while initially fetching URL", err);
      });

    const videoUrlRegex = /^https:\/\/www.coursera.org\/learn\/.*\/lecture\/.*$/;

    // check if url is valid video.
    if (url && videoUrlRegex.test(url)) {
      makeGetReqWithParam("/lms/search", [["videoUrl", url]])
        .then((res) => {
          updateArr(res);
          if (res.length >= 1) {
            setIndex(0);
          } else {
            setIndex(-1);
          }
        })
        .catch((err) => {
          console.log("Error while fetching videoLM:", err);
        });
    }
  }, [url]);

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    document.getElementById("rightPreview") ? setLoaded(true) : setLoaded(false);
  }, [document.getElementById("rightPreview")]);

  // lmArray index handling.
  // this index is used to access specific elements of the lmArray.
  const [index, setIndex] = useState(-1);
  const handleIndex = (value: number) => {
    setIndex(value);
  };

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
                lmArray={arr}
                updateArr={updateArr}
                handleIndex={handleIndex}
                index={index}
                getLmPosition={getLmPosition}
                url={url}
              />
            </div>
            <div id="fcPane">
              <FcPane lmArray={arr} lmIndex={index} updateArr={updateArr} loaded={loaded} />
            </div>
            <div id="authPane">
              <p>Welcone, {user?.name}.</p>
              <div id="spacer"></div>
              <LogoutButton />
            </div>
          </div>
          <div id="rightPreview"></div>
        </>
      )}
    </>
  );
}

export default App;
