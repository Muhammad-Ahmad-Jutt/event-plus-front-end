/*
  REFERENCE:
  - NPM, Author, (2026) react-idle-timer. Available at: https://www.npmjs.com/package/react-idle-timer
  - NPM, Author, (2026) react-idle-timer. Available at: https://idletimer.dev/docs/features/idle-detection
*/

import { useContext } from "react";
import { useIdleTimer } from "react-idle-timer";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const MS_IDLETIMEOUT = 10 * 60 * 1000;

export default function InactivityLogout() {
  const { token, authLoading, logout } = useContext(AuthContext);

  useIdleTimer({
    timeout: MS_IDLETIMEOUT,
    events: ["mousemove", "keydown", "scroll", "touchstart"],
    onIdle: () => {
      if (!token) {
        return;
      }

      toast.info("You were logged out due to inactivity");
      logout();
    },
    disabled: authLoading || !token,
    debounce: 500,
    crossTab: true,
  });

  return null;
}
