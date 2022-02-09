import { Grid } from "@material-ui/core";
import MenuCard from "./MenuCard.component";

const OrgDashboard = () => {
    return (
        <div>
            <Grid container direction="row" spacing={4}>
                <Grid item>
                    <MenuCard title="Add Questions" description="Add new questions" navigateTo="/add-questions" />
                </Grid>
                <Grid item>
                    <MenuCard title="Set Exam" description="Set new exams" navigateTo="/set-exam" />
                </Grid>
                <Grid item>
                    <MenuCard title="View Results" description="Results" navigateTo="/view-result" />
                </Grid>
            </Grid>
        </div>
    )
}

export default OrgDashboard;