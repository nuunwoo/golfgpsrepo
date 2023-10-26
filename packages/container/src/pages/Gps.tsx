import { GpsPage } from "@pkg/page";
import { GpsProps } from "@pkg/types";

const Gps = ({ url, ws, isSide, setIsSide, loop }: GpsProps) => {
  return (
    <GpsPage
      url={url}
      ws={ws}
      isSide={isSide}
      setIsSide={setIsSide}
      loop={loop}
    />
  );
};

export default Gps;
