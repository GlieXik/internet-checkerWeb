import {
  AppBar,
  Box,
  CircularProgress,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { ChartTracking } from "../components/ChartTracking/ChartTracking";
import { useContext, useEffect, useState, useCallback } from "react";
import moment from "moment";
import { getToggleTracking, getTracking, postToggleTracking } from "../api/api";
import { SelectorContext } from "../context/selector.context";

type TrackingIP = {
  date: string;
  isActive: boolean;
};

export const Tracking = () => {
  const [data, setData] = useState<TrackingIP[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [loadingTracking, setLoadingTracking] = useState<boolean>(false);

  const { lastSelected: value } = useContext(SelectorContext);

  const fetchTrackingData = useCallback(async () => {
    try {
      const response = await getTracking({
        ip: value?.label || "",
        from: moment().startOf("day").toISOString(),
        to: moment().toISOString(),
      });
      const trackingIPs = response.data.trackingIPs;
      const filteredData = trackingIPs.filter(
        (item: TrackingIP, index: number, array: TrackingIP[]) =>
          index === 0 || item.isActive !== array[index - 1].isActive
      );
      const lastItem = trackingIPs[trackingIPs.length - 1];

      if (lastItem) {
        filteredData.push(lastItem);
      }
      console.log(lastItem);

      setData(filteredData);
    } catch (error) {
      console.error(error);
      setError(error as string);
    } finally {
      setLoading(false);
    }
  }, [value?.label]);

  const fetchTrackingStatus = useCallback(async () => {
    try {
      setLoadingTracking(true);
      const response = await getToggleTracking({ address: value?.label || "" });
      setIsTracking(response.data.trackingStatus.isTracking);
    } finally {
      setLoadingTracking(false);
    }
  }, [value?.label]);

  const handleChangeTracking = async () => {
    try {
      setLoadingTracking(true);
      const response = await postToggleTracking({
        address: value?.label || "",
        isTracking: !isTracking,
      });
      setIsTracking(response.data.isTracking);
    } finally {
      setLoadingTracking(false);
    }
  };

  useEffect(() => {
    fetchTrackingData();
  }, [fetchTrackingData]);

  useEffect(() => {
    fetchTrackingStatus();
  }, [fetchTrackingStatus]);

  return (
    <>
      <AppBar
        position="absolute"
        sx={{ bgcolor: "#232D3F", left: 0, top: 0, width: "100%" }}
        color="transparent"
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Tracking Mode
          </Typography>
          <Switch
            checked={isTracking}
            disabled={loadingTracking}
            onChange={handleChangeTracking}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Toolbar>
      </AppBar>
      <Box mt={10}>
        {loading && data.length === 0 && (
          <CircularProgress
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-20px",
              marginLeft: "-20px",
            }}
          />
        )}
        {!loading && data.length === 0 && <Typography>No data</Typography>}
        {data.length > 0 && <ChartTracking dataRender={data} />}
        {error && <Typography>Error {JSON.stringify(error)}</Typography>}
      </Box>
    </>
  );
};
