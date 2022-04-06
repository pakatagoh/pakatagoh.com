import { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { CgSpinner } from "react-icons/cg";
import { useTransition } from "remix";
import { useSpinDelay } from "spin-delay";

const NavNotification = () => {
  const [isDismissNavNotification, setIsDismissNavNotification] =
    useState(false);
  const transitionToRef = useRef<undefined | string>();
  const transition = useTransition();

  useEffect(() => {
    if (transition.location?.pathname) {
      transitionToRef.current = transition.location.pathname;
    }
  }, [transition.location?.pathname]);

  useEffect(() => {
    if (!transition.location?.pathname) {
      setIsDismissNavNotification(false);
    }
  }, [transition.location?.pathname]);

  const isNavigating =
    transition.state === "loading" && transition.type === "normalLoad";

  const isSpinDelayActive = useSpinDelay(isNavigating, {
    delay: 1000,
    minDuration: 2000,
  });

  const isShowNavSpinner = !isDismissNavNotification && isSpinDelayActive;

  return (
    <>
      {isShowNavSpinner ? (
        <div className="fixed bottom-8 z-50 w-full px-4">
          <div className="flex w-full justify-end sm:ml-auto sm:max-w-sm">
            <div className="w-full rounded-lg bg-gray-100 p-4 shadow-lg shadow-gray-500/50 dark:prose-invert dark:bg-gray-700 dark:shadow-gray-900/80 sm:max-w-sm ">
              <div className="flex justify-end">
                <button
                  aria-label="close"
                  className="text-xs"
                  onClick={() => setIsDismissNavNotification(true)}
                >
                  <AiOutlineClose />
                </button>
              </div>
              <div className="mb-3 text-xs text-gray-500 dark:text-gray-400">
                <div>
                  Thanks for visiting and helping to populate the cache 🙏🏼
                </div>
              </div>
              <div className="flex items-center gap-2 text-base">
                <div className="flex animate-spin items-center justify-center">
                  <CgSpinner title="loading" />
                </div>
                Loading
                <span className="truncate text-sm font-bold">
                  {transitionToRef.current ?? "..."}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default NavNotification;
