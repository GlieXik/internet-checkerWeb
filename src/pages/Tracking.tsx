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
import moment, { Moment } from "moment";
import { getToggleTracking, getTracking, postToggleTracking } from "../api/api";
import { SelectorContext } from "../context/selector.context";
import { DatePicker } from "@mui/x-date-pickers";

type TrackingIP = {
  date: string;
  isActive: boolean;
};

export const Tracking = () => {
  const [data, setData] = useState<TrackingIP[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [loadingTracking, setLoadingTracking] = useState<boolean>(true);

  const { lastSelected: value } = useContext(SelectorContext);

  const [dateTo, setDateTo] = useState<Moment>(moment());

  const handleDateChange = (date: Moment) => {
    setDateTo(date);
    fetchTrackingData(); // Trigger data fetch on date change
  };

  const fetchTrackingData = useCallback(async () => {
    if (!value?.label) return; // Early return if no value is selected

    setLoading(true);
    try {
      const from = dateTo.startOf("day").toISOString(); // Start of the selected day
      const to = dateTo.endOf("day").toISOString();

      const response = await getTracking({
        ip: value.label,
        to,
        from,
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

      setData(filteredData);
    } catch (error) {
      console.error(error);
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }, [dateTo, value?.label]);

  const fetchTrackingStatus = useCallback(async () => {
    if (!value?.label) return; // Early return if no value is selected

    try {
      const response = await getToggleTracking({ address: value.label });
      setIsTracking(response.data.trackingStatus.isTracking);
    } catch (error) {
      console.error(error);
      setError((error as Error).message);
    } finally {
      setLoadingTracking(false);
    }
  }, [value?.label]);

  const handleChangeTracking = async () => {
    if (!value?.label) return; // Early return if no value is selected

    setLoadingTracking(true);
    try {
      const response = await postToggleTracking({
        address: value.label,
        isTracking: !isTracking,
      });
      setIsTracking(response.data.isTracking);
    } catch (error) {
      console.error(error);
      setError((error as Error).message);
    } finally {
      setLoadingTracking(false);
    }
  };

  useEffect(() => {
    fetchTrackingData();
    fetchTrackingStatus();
  }, [fetchTrackingData, fetchTrackingStatus]);

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
      <Box mt={10} position={"relative"}>
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
        <Box position={"relative"}>
          {!loading && data.length === 0 && <Typography>No data</Typography>}
          {data.length > 0 && (
            <>
              <ChartTracking dataRender={data} />
            </>
          )}
          <DatePicker
            label="Date"
            value={dateTo}
            onChange={(date) => handleDateChange(date as Moment)}
            sx={{}}
          />
        </Box>
        {error && <Typography>Error {JSON.stringify(error)}</Typography>}
      </Box>
    </>
  );
};
