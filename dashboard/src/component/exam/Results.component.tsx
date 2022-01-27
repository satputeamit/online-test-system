import { useLazyQuery, useQuery } from "@apollo/client"
import { Button, Grid } from "@material-ui/core"
import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { GET_RESULT } from "../../apis/queries"
import CircularProgress from '@material-ui/core/CircularProgress';
import store from "../../store"
import { Link } from "react-router-dom"

const Results = observer(() => {
    const examId = store.examId
    const user_id = localStorage.getItem("user_id")
    console.log("??", examId, user_id)
    const [result, setResult] = useState({ subject: "", result_status: "" })
    // const [getResult, { loading, error, data }] = useLazyQuery(GET_RESULT)
    const { loading, error, data ,refetch} = useQuery(GET_RESULT,{
        variables: { exam_id: examId, candidate_id: user_id },
    })

    useEffect(()=>{
        console.log("called............")
        refetch()
        // getResult({
        //     variables: { exam_id: examId, candidate_id: user_id },
        // })
    },[])


    useEffect(() => {
        if (data) {
            console.log("rData:", data)
            setResult(data.getResult)
        }

        if (error) {
            console.log("rErr:", error)
        }
    }, [data, error])

    return (
        <div style={{ padding: "50px" }} >
            {loading?<CircularProgress size={200}/>:<Grid container justifyContent="center" direction="column" spacing={2}>               
               <Grid item style={{ color: "white" }}>
                    <span ><b>Exam Name:</b></span>&nbsp;&nbsp;<span>{result.subject}</span>
                </Grid>
                <Grid item style={{ color: "white" }}>
                    <h2><b>Result:</b></h2><h1>{result.result_status}</h1>                    
                </Grid>   
                      
                <Grid item>
                <span style={{ color: "white" }}>Go to the <Link to="/dashboard" style={{ color: "skyblue" }}>Dashboard</Link>.</span>    
                </Grid>         
            </Grid>}
        </div>
    )
}
)
export default Results;