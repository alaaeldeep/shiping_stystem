/* axios utils */
import { request } from "../../lib/axios.utls";

/* react query */
import { useQuery } from "react-query";

const fetch = (endpoint: string) => {
    return request({ url: endpoint });
};
const UseReportQuery = (
    pageNumber: number,
    startdateTime: string | undefined,
    enddateTime: string | undefined,
    status: number
) => {
    return useQuery(
        ["GetAllReportAsNoTrakingAsync", pageNumber],
        () =>
            fetch(
                enddateTime && startdateTime
                    ? `/Orders/GetAllReportAsNoTrakingAsync?pageNumber=${pageNumber}&status=${status}&startdateTime=${startdateTime}&enddateTime=${enddateTime}`
                    : `/Orders/GetAllReportAsNoTrakingAsync?pageNumber=${pageNumber}&status=${status}`
            ),
        {
            refetchOnMount: true,
            enabled: false,
        }
    );
};

export default UseReportQuery;
/* const { data, isLoading, isError } = UseQuery(
    date.enddateTime && date.startdateTime
        ? `/Orders/GetAllReportAsNoTrakingAsync?pageNumber=${pageNumber}&status=${status}&startdateTime=${date.startdateTime}&enddateTime=${date.enddateTime}`
        : `/Orders/GetAllReportAsNoTrakingAsync?pageNumber=${pageNumber}&status=${status}`
); */

// old fetch
/*   return useQuery(
        ["GetAllReportAsNoTrakingAsync", pageNumber],
        () =>
            fetch(
                `/Orders/GetAllReportAsNoTrakingAsync?pageNumber=${pageNumber}`
            ),
        {
            enabled: false,
        }
    ); */
