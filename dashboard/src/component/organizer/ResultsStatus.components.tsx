import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Button, Card, CardActions, CardContent, createStyles, FormControl, Grid, InputLabel, makeStyles, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextareaAutosize, Theme } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CREATE_QUAS_ANS } from "../../apis/mutations";
import { GET_QUESTIONS, GET_RESULT_ORG, GET_SUBJECTS } from "../../apis/queries";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


const ResultStatus = () => {
    const classes = useStyles();
    const user_id = localStorage.getItem("user_id")

    const navigate = useNavigate();
    const [result, setResult] = useState<any>([]);
    const { loading, error, data, refetch } = useQuery(GET_RESULT_ORG,
        {
            variables: {
                "input": {
                    "organizer_id": user_id
                }
            }
        })


    useEffect(() => {
        refetch();
    }, [])

    useEffect(() => {
        if (data) {
            console.log("result:", data)
            setResult(data.getResultByOrgId)
        }
        if (error) {
            if (error.networkError?.message.split("<")[0].trim() == "Unexpected token") {
                localStorage.removeItem("accessToken");
                navigate("/")
            }
        }


    }, [data, error])


    return (
        <>
        <br />
            <Grid container justifyContent="center">
                <Grid item xs={6}>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell ><b>Subject</b></TableCell>
                                    <TableCell ><b>Exam ID</b></TableCell>
                                    <TableCell ><b>Candidate ID</b></TableCell>
                                    <TableCell ><b>Result</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {result.map((res: any) => (
                                    <TableRow key={res.candidate_id + res.exam_id} style={{ backgroundColor: res.status === "Pass" ? "rgba(0,255,0,0.3)" : "rgba(255,0,0,0.3)" }}>
                                        <TableCell >{res.subject}</TableCell>
                                        <TableCell >{res.exam_id}</TableCell>
                                        <TableCell >{res.candidate_id}</TableCell>
                                        <TableCell >{res.status}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>

        </>
    )
}

export default ResultStatus;