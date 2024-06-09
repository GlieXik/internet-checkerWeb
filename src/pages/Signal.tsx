import { useCallback, useContext, useEffect, useState } from "react";
import { postSignal } from "../api/api";
import { Loader } from "../components/ui/Loader";
import { SignalPulse } from "../components/Signal/SignalPulse";
import { SelectorContext } from "../context/selector.context";

export const Signal = () => {
  const [loading, setLoading] = useState(true);
  const [isSignal, setIsSignal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { lastSelected } = useContext(SelectorContext);

  const checkSignal = useCallback(async (ipAddress: string) => {
    try {
      setLoading(true);
      const response = await postSignal(ipAddress);
      setIsSignal(response.data.status);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      setIsSignal(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!lastSelected) {
      return;
    }
    checkSignal(lastSelected.value);
  }, [checkSignal, lastSelected]);

  if (loading) {
    return (
      <div
        style={{
          height: "100dvh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          height: "100dvh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Error : {error}
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          height: "100dvh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SignalPulse status={isSignal} />
      </div>
    </>
  );
};
