import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {NoDataPlaceholder} from "../../NoDataPlaceholder";
import {Advertisement} from "./Advertisement";

export const AdvertisementsTable = ({items}) => {

    const chunkArray = (arr, chunk) => {
        let i, j, tmp = [];
        for (i = 0, j = arr.length; i < j; i += chunk) {
            tmp.push(arr.slice(i, i + chunk));
        }
        return tmp;
    };
    const sliced = chunkArray(items, 3);
    let content;

    if (items && items.length) {
        content = (
            <TableBody>
                {sliced.map((row) => (
                    <TableRow key={row.id}>
                        {row.map((advertisement) => (
                            <TableCell align="center">
                                <Advertisement advertisement={advertisement}/>
                            </TableCell>
                        ))
                        }
                    </TableRow>
                ))
                }
            </TableBody>);
    } else {
        content = (
            <TableBody>
                <TableRow>
                    <NoDataPlaceholder colSpan={5}/>
                </TableRow>
            </TableBody>
        )
    }

    return (
        <TableContainer>
            <Table>
                {content}
            </Table>
        </TableContainer>
    );
}