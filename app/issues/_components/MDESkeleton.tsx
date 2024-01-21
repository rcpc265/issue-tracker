import { Card } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";

const MDESkeleton = () => (
  <Card style={{ height: "370px", marginBottom: "35px" }}>
    <Skeleton count={14} />
  </Card>
);

export default MDESkeleton;
